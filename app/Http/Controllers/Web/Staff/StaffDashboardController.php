<?php

namespace App\Http\Controllers\Web\Staff;

use App\Http\Controllers\Controller;
use App\Models\UserOffer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class StaffDashboardController extends Controller
{
    public function __invoke(Request $request)
    {
        // ID del camarero
        $staffId = $request->user()->id;

        // Contamos las ofertas canjeadas por el camarero hoy
        $todayCount = UserOffer::where('redeemed_by', $staffId)
            ->whereDate('redeemed_at', Carbon::today())
            ->count();

        // Obtenemos sus últimos 5 canjeos con los datos del cliente y la oferta
        $recentScans = UserOffer::with(['user', 'offer'])
            ->redeemed() //scopeRedeemed - Filtra las ya canjeadas
            ->where('redeemed_by', $staffId)
            ->orderBy('redeemed_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($scan) {
                // Formateamos los datos para enviarlos limpios a React
                return [
                    'id' => $scan->id,
                    'client_name' => $scan->user->name,
                    'offer_title' => $scan->offer->title,
                    'time' => $scan->redeemed_at->diffForHumans()
                ];
            });

        return Inertia::render('Staff/Dashboard', [
            'stats' => ['today' => $todayCount],
            'recentScans' => $recentScans
        ]);
    }
}
