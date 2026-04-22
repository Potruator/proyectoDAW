<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\Offer;
use App\Models\Event;
use App\Models\UserOffer;
use App\Enums\UserRole;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    /**
     * Dashboard del administrador
     */
    public function __invoke(Request $request)
    {
        // Estadísticas generales
        $stats = [
            'total_users' => User::count(),
            'total_clients' => User::where('role', UserRole::CLIENT)->count(),
            'total_staff' => User::where('role', UserRole::STAFF)->count(),
            'total_admin' => User::where('role', UserRole::ADMIN)->count(),
            'total_offers' => Offer::count(),
            'active_offers' => Offer::where('starts_at', '<=', now())
                ->where(function ($query) {
                    $query->whereNull('expires_at')
                        ->orWhere('expires_at', '>=', now());
                })
                ->count(),
            'total_events' => Event::count(),
            'upcoming_events' => Event::where('date', '>=', now())->count(),
            'total_redemptions' => UserOffer::whereNotNull('redeemed_at')->count(),
            'pending_redemptions' => UserOffer::whereNull('redeemed_at')->count()
        ];

        // Ofertas más canjeadas (Top 5)
        $topOffers = Offer::withCount(['userOffers as redemptions_count' => function ($query) {
            $query->whereNotNull('redeemed_at');
        }])
            ->orderByDesc('redemptions_count')
            ->limit(5)
            ->get();

        // Canjeos recientes (últimos 10)
        $recentRedemptions = UserOffer::with(['user', 'offer', 'redeemedBy'])
            ->whereNotNull('redeemed_at')
            ->orderByDesc('redeemed_at')
            ->limit(10)
            ->get()
            ->map(function ($redemption) {
                return [
                    'id' => $redemption->id,
                    'offer_tittle' => $redemption->offer->title,
                    'client_name' => $redemption->user->name,
                    'staff_name' => $redemption->redeemedBy?->name,
                    'redeemed_at' => $redemption->redeemed_at->diffForHumans() // Método de la librería Carbon - hereda de la clase DateTime
                ];
            });
            
        // Usuarios recientes (últimos 5)
        $recentUsers = User::latest()
            ->limit(5)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role->label(),
                    'created_at' => $user->created_at->diffForHumans(),
                ];
            });

        // Eventos siguientes (próximos 5)
        $upcomingEvents = Event::where('date', '>=', now())
            ->orderBy('date', 'asc')
            ->limit(5)
            ->get()
            ->map(function ($event) {
                return [
                    'id' => $event->id,
                    'title' => $event->title,
                    'date' => $event->date->format('d/m/Y'),
                    'time' => $event->date->format('H:i'),
                    'location' => $event->location
                ];
            });

        // Datos para gráficos de canjeos por mes (últimos 6 meses)
        $redemptionsByMonth = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = now()->subMonth($i);
            $count = UserOffer::whereNotNull('redeemed_at')
                ->whereYear('redeemed_at', $month->year)
                ->whereMonth('redeemed_at', $month->month)
                ->count();
                
            $redemptionsByMonth[] = [
                'month' => $month->format('M'),
                'count' => $count
            ];
        }

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'topOffers' => $topOffers,
            'recentRedemptions' => $recentRedemptions,
            'recentUsers' => $recentUsers,
            'upcomingEvents' => $upcomingEvents,
            'redemptionsByMonth' => $redemptionsByMonth
        ]);
    }
}
