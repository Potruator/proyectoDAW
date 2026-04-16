<?php

namespace App\Http\Controllers\Web\Client;

use App\Http\Controllers\Controller;
use App\Models\UserOffer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ClientDashboardController extends Controller
{
    public function index(Request $request) {
        $userId = $request->user()->id;

        // Estadísticas históricas
        $stats = [
            'total_saved' => UserOffer::where('user_id', $userId)->whereNull('redeemed_at')->count(),
            'total_redeemed' => UserOffer::where('user_id', $userId)->whereNotNull('redeemed_at')->count()
        ];

        // Historial de canjeos (últimos 5)
        $history = UserOffer::with('offer')
            ->where('user_id', $userId)
            ->whereNotNull('redeemed_at') // Solo las ya canjeadas
            ->orderBy('redeemed_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item-id,
                    'title' => $item->offer->title ?? 'Oferta Eliminada',
                    'discount' => $item->offer->discount_percentage ?? 0,
                    'redeemed_date' => Carbon::parse($item->redeemed_at)->format('d/m/Y H:i')
                ];
            });

        $offers = UserOffer::with('offer')
            ->where('user_id', $userId)
            ->whereNull('redeemed_at') // Solo las no canjeadas
            ->latest()
            ->get()
            ->map(function ($item) {
                return [
                    'uuid' => $item->uuid, // ID único del qr
                    'title' => $item->offer->title, // Viene de la relación
                    'description' => $item->offer->description ?? '', // También viene de la relación
                    'discount_percentage' => $item->offer->discount_percentage ?? 0,
                    'assigned_at' => $item->assigned_at ? Carbon::parse($item->assigned_at)->diffForHumans() : 'Reciente'
                ];
            });

        return Inertia::render('Client/Dashboard', [
            'stats' => $stats,
            'history' => $history,
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
