<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use App\Models\User;
use App\Models\UserOffer;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class AdminOfferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $offers = Offer::query()
            // Filtro de búsqueda por texto (Título o Descripción)
            ->when($request->input('search'), function ($q, $search) {
                $q->where(function ($subQuery) use ($search) {
                    $subQuery
                        ->where('title', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($request->input('status'), function($q, $status) {
                $now = now();

                if ($status === 'Activa') {
                    $q->where('starts_at', '<=', $now)
                      ->where(function ($sub) use ($now) {
                            $sub->whereNull('expires_at')->orWhere('expires_at', '>=', $now);
                        });
                }
                else if ($status === 'Próxima') {
                    $q->where('starts_at', '>', $now);
                }
                else if ($status === 'Expirada') {
                    $q->whereNotNull('expires_at')->where('expires_at', '<', $now);
                }
            })
            ->orderBy('created_at', 'desc')
            ->paginate(10)
            ->withQueryString() // Para que la paginación no borre los filtros
            ->through(fn ($offer) => [
                'id' => $offer->id,
                'title' => $offer->title,
                'description' => $offer->description,
                'discount_percentage' => $offer->discount_percentage,
                'starts_at' => $offer->starts_at->format('d/m/Y H:i'),
                'expires_at' => $offer->expires_at ? $offer->expires_at->format('d/m/Y H:i') : null,
                'is_featured' => $offer->is_featured,
                'is_public' => $offer->is_public,
                'status' => $offer->getStatus()
            ]);

        return Inertia::render('Admin/Offers/Index', [
            'offers' => $offers,
            'filters' => $request->only(['search', 'status'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Tomamos todos los productos activos para mostrar en checkboxes
        $products = Product::where('is_active', true)
            ->get(['id', 'name', 'price']);

        return Inertia::render('Admin/Offers/Create', [
            'products' => $products
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'discount_percentage' => 'required|integer|min:1|max:100',
            'starts_at' => 'required|date',
            'expires_at' => 'nullable|date|after:starts_at',
            'is_featured' => 'boolean',
            'is_public' => 'boolean',
            'product_ids' => 'nullable|array',
            'product_ids.*' => 'exists:products,id' // Validar que los IDs existan
        ]);

        // Iniciamos transacción por seguridad
        DB::beginTransaction();

        try {
            // Extraemos product_ids antes de crear la oferta
            $offerData = collect($validated)->except('product_ids')->toArray();

            $offer = Offer::create($offerData);

            // Sincronizamos los productos seleccionados en la tabla pivote
            if (!empty($validated['product_ids'])) {
                $offer->products()->sync($validated['product_ids']);
            }

            // Obtenemos todos los usuarios que son clientes para asignarles la nueva oferta
            $clients = User::where('role', 'client')->get();

            // Ejecutamos la asignación masiva
            if($clients->isNotEmpty()) {
                $assignments = $clients->map(function ($client) use($offer) {
                    return [
                        'user_id' => $client->id,
                        'offer_id' => $offer->id,
                        'uuid' => Str::uuid()->toString(),
                        'assigned_at' => now(),
                        'created_at' => now(),
                        'updated_at' => now()
                    ];
                })->toArray();

                UserOffer::insert($assignments);
            }

            // Si todo ha ido bien, confirmamos los cambios
            DB::commit();

            return redirect()
                ->route('offers.index')
                ->with('success', 'Oferta creada exitosamente');
        }
        catch(\Exception $e) {
            // Si algo falla, deshacemos los cambios
            DB::rollBack();
            
            // Registramos el error para depuración
            \Log::error('Error al crear oferta', [
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString()
            ]);

            return redirect()
                ->back()
                ->with('error', 'Ocurrió un error al crear la oferta. Contacte con soporte.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Offer $offer)
    {
        return Inertia::render('Admin/Offers/Show', [
            'offer' => [
                'id' => $offer->id,
                'title' => $offer->title,
                'description' => $offer->description,
                'discount_percentage' => $offer->discount_percentage,
                'starts_at' => $offer->starts_at->format('d/m/Y'),
                'expires_at' => $offer->expires_at?->format('d/m/Y'),
                'is_featured' => $offer->is_featured,
                'is_public' => $offer->is_public,
                'created_at' => $offer->created_at->diffForHumans(),
                'total_assignments' => $offer->userOffers()->count(),
                'total_redemptions' => $offer->userOffers()->whereNotNull('redeemed_at')->count(),
                'products' => $offer->products()->get(['products.id', 'products.name'])
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Offer $offer)
    {
        // Obtenemos productos activos
        $products = Product::where('is_active', true)->get(['id', 'name', 'price']);

        // Obtenemos los IDs de los productos vinculados a esta oferta
        $offerProductIds = $offer->products()->pluck('products.id')->toArray();

        return Inertia::render('Admin/Offers/Edit', [
            'offer' => [
                'id' => $offer->id,
                'title' => $offer->title,
                'description' => $offer->description,
                'discount_percentage' => $offer->discount_percentage,
                'starts_at' => $offer->starts_at->format('Y-m-d'),
                'expires_at' => $offer->expires_at?->format('Y-m-d'),
                'is_featured' => $offer->is_featured,
                'is_public' => $offer->is_public
            ],
            'products' => $products,
            'offerProductIds' => $offerProductIds
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Offer $offer)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'discount_percentage' => 'nullable|integer|min:1|max:100',
            'starts_at' => 'nullable|date',
            'expires_at' => 'nullable|date|after:starts_at',
            'is_featured' => 'nullable|boolean',
            'is_public' => 'nullable|boolean',
            'product_ids' => 'nullable|array',
            'product_ids.*' => 'exists:products,id'
        ]);

        // Limpiamos campos vacíos para no sobrescribir nada con nulos
        $dataToUpdate = array_filter($validated, function ($value) {
            return $value !== null && $value !== '';
        });

        try {
            // Separamos datos de oferta y productos
            $offerData = collect($dataToUpdate)->except('product_ids')->toArray();

            if (!empty($offerData)) {
                $offer->update($offerData);
            }

            /* Sincronizamos productos (Solo sincronizamos si la request realmente incluye la clave 'product_ids').
            Si el frontend no manda la clave, no toca los productos.
            Si manda la clave como un array vacío [], borra todos los productos */
            if ($request->has('product_ids')) {
                $offer->products()->sync($validated['product_ids'] ?? []);
            }

            return redirect()
                ->route('offers.index')
                ->with('success', 'Oferta actualizada correctamente');
        }
        catch(\Exception $e) {
            \Log::error('Error al actualizar oferta ID: ' . $offer->id, [
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString()
            ]);

            return redirect()
                ->back()
                ->with('error', 'Ocurrió un error al actualizar la oferta. Contacte con soporte.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Offer $offer)
    {
        try {
            $offer->delete();
            return redirect()
                ->route('offers.index')
                ->with('success', 'Oferta eliminada correctamente');
        }
        catch(\Exception $e) {
            \Log::error('Error al eliminar oferta ID: ' . $offer->id, [
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString()
            ]);

            return redirect()
                ->back()
                ->with('error', 'Ocurrió un error al eliminar la oferta. Contacte con soporte.');
        }
    }
}
