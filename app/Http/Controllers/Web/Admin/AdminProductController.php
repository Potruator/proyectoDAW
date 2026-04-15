<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class AdminProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response 
    {
        $search = $request->input('search');
        $sortField= $request->input('sortField', 'created_at');
        $sortDirection = $request->input('sortDirection', 'desc');

        // Columnas permitidas para ordenar
        $allowedSorts = ['name', 'price', 'is_active', 'created_at'];
        if (!in_array($sortField, $allowedSorts)) {
            $sortField = 'created_at';
        }

        $products = Product::query()
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->withQueryString()
            ->through(fn ($product) => [
                'id' => $product->id,
                'name' => $product->name,
                'price' => number_format($product->price, 2) . ' €',
                'is_active' => $product->is_active,
                'created_at' => $product->created_at->format('d/m/Y')
            ]);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'filters' => $request->only(['search', 'sortField', 'sortDirection'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Products/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validación del formulario
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0|max:999',
            'image_url' => 'nullable|url|max:255',
            'is_active' => 'boolean'
        ]);

        // Guardamos en la base de datos
        try {
            Product::create($validated);

            return redirect()
                ->route('products.index')
                ->with('success', 'Producto añadido al menú correctamente.');
        }
        catch (\Exception $e) {
            \Log::error('Error al crear el producto', [
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString()
            ]);

            return back()
                ->with('error', 'Ocurrió un error al crear el producto. Contacte con soporte.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return Inertia::render('Admin/Products/Show', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => number_format($product->price, 2) . ' €',
                'image_url' => $product->image_url,
                'is_active' => $product->is_active,
                'created_at' => $product->created_at->format('d/m/Y'),
                'offers' => $product->offers()->get(['offers.id', 'offers.title', 'offers.discount_percentage'])
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'price' => 'nullable|numeric|min:0|max:999',
            'image_url' => 'nullable|url|max:255',
            'is_active' => 'nullable|boolean'
        ]);

        // Limpiamos campos vacíos (mantenemos los 0 y false para el precio y el is_active)
        $dataToUpdate = array_filter($validated, function ($value) {
            return $value !== null && $value !== '';
        });

        try {
            $product->update($dataToUpdate);

            return redirect()
                ->route('products.index')
                ->with('success', 'Producto actualizado correctamente.');
        }
        catch (\Exception $e) {
            \Log::error('Error al actualizar producto (' . $product->id . '): ' . $e->getMessage());

            return back()
                ->with('error', 'Hubo un problema al actualizar el producto. Contacte con soporte.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        try {
            $product->delete();

            return redirect()
                ->route('products.index')
                ->with('success', 'Producto eliminado correctamente.');
        }
        catch (\Exception $e) {
            // Registramos el error en el log del servidor
            \Log::error('Error al eliminar producto: ' . $e->getMessage());

            return redirect()
                ->route('products.index')
                ->with('error', 'No se pudo eliminar el producto. Contacte con soporte.');
        }
    }
}
