<?php

namespace App\Http\Controllers\Web\Client;

use App\Http\Controllers\Controller;
use App\Models\UserOffer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientDashboardController extends Controller
{
    public function index() {
        $offers = UserOffer::with('offer')
            ->where('user_id', auth()->id())
            ->whereNull('redeemed_at') // Solo las no canjeadas
            ->get()
            ->map(function ($item) {
                return [
                    'uuid' => $item->uuid, // ID único del qr
                    'title' => $item->offer->title, // Viene de la relación
                    'description' => $item->offer->description, // También viene de la relación
                    'assigned_at' => $item->assigned_at->diffForHumans()
                ];
            });

        return Inertia::render('Client/Dashboard', [
            'offers' => $offers
        ]);
    }

    public function show(UserOffer $userOffer) {

        // Nos aseguramos e que no se roben QRs ajenos
        if ($userOffer->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Client/Offers/Show', [
            'userOffer' => [
                'uuid' => $userOffer->uuid,
                'title' => $userOffer->offer->title
            ]
        ]);
    }
}
