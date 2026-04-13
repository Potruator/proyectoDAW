<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product): RedirectResponse
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
