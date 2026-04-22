<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

use App\Models\Offer;
use App\Models\Event;
use Inertia\Inertia;
use Inertia\Response;

class PublicController extends Controller
{
    // Landing page
    public function __invoke(): Response {
        return Inertia::render('Public/Home', [
            'featuredOffers' => Offer::active()->limit(3)->get(),
            'upcomingEvents' => Event::upcoming()->limit(5)->get(),
        ]);
    }

    // Login page
    public function login(): Response {
        return Inertia::render('Auth/Login');
    }

    // Listado de eventos públicos
    public function events(): Response {
        return Inertia::render('Public/Events', [
            'events' => Event::upcoming()
                ->public()
                ->get(),
        ]);
    }

    // Listado de ofertas públicas
    public function offers(): Response {
        return Inertia::render('Public/Offers', [
            'offers' => Offer::active()->get(),
        ]);
    }

    // Página de ayuda
    public function help(): Response {
        return Inertia::render('Public/Help');
    }
}
