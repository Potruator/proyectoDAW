<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOfferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $offers = Offer::latest()
            ->paginate(10)
            ->through(fn ($offer) => [
                'id' => $offer->id,
                'title' => $offer->title,
                'description' => $offer->description,
                'discount_percentage' => $offer->discount_percentage,
                'starts_at' => $offer->starts_at->format('d/m/Y'),
                'expires_at' => $offer->expires_at?->format('d/m/Y'),
                'is_featured' => $offer->is_featured,
                'is_public' => $offer->is_public,
                'status' => $offer->starts_at > now() 
                            ? 'Próxima'
                            : ($offer->expires_at && $offer->expires_at < now() 
                                ? 'Expirada'
                                : 'Activa')
            ]);

        return Inertia::render('Admin/Offers/Index', [
            'offers' => $offers
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Offers/Create');
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
            'is_public' => 'boolean'
        ]);

        Offer::create($validated);

        return redirect()
            ->route('ofertas.index')
            ->with('success', 'Oferta creada exitosamente');
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
                'total_redemptions' => $offer->userOffers()->whereNotNull('redeemed_at')->count()
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Offer $offer)
    {
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
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Offer $offer)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'discount_percentage' => 'required|integer|min:1|max:100',
            'starts_at' => 'required|date',
            'expires_at' => 'nullable|date|after:starts_at',
            'is_featured' => 'boolean',
            'is_public' => 'boolean'
        ]);

        $offer->update($validated);

        return redirect()
            ->route('ofertas.index')
            ->with('success', 'Oferta actualizada correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Offer $offer)
    {
        $offer->delete();

        return redirect()
            ->route('ofertas.index')
            ->with('success', 'Oferta eliminada correctamente');
    }
}
