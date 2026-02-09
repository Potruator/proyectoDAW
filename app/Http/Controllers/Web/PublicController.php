<?php

namespace App\Http\Controllers\Web;

use Illuminate\Http\Request;

use App\Http\Controllers\Controller;

use App\Models\Offer;
use App\Models\Event;
use Inertia\Inertia;

class PublicController extends Controller
{

    // Landing page
    public function __invoke() {
        return Inertia::render('Public/Home', [
            'featuredOffers' => Offer::active()->limit(3)->get(),
            'upcomingEvents' => Event::upcoming()->limit(5)->get(),
        ]);
    }

    // Listado de eventos públicos
    public function events() {
        return Inertia::render('Public/Events', [
            'events' => Event::upcoming()
                //->public()
                ->get(),
        ]);
    }

    // Listado de ofertas públicas
    public function offers () {
        return Inertia::render('Public/Offers', [
            'offers' => Offer::active()->get(),
        ]);
    }

}
