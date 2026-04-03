<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\UserOffer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RedemptionController extends Controller
{
    /**
     * Muestra la pantalla del escáner de cámara
     */
    public function scan() {
        return Inertia::render('Staff/Scan');
    }

    /**
     * Procesa el código QR escaneado y canjea la oferta
     */
    public function redeem(Request $request, $uuid) {
        
        // Búsqueda de oferta
        $userOffer = UserOffer::with(['offer', 'user'])->where('uuid', $uuid)->first();

        // Comprobamos la existencia del código
        if (!$userOffer) {
            return back()
                ->with('error', 'Código QR no reconocido');
        }

        // Comprobamos si ha sido canjeada previamente
        if ($userOffer->isRedeemed()) {
            $date = $userOffer->redeemed_at->format('d/m/Y \a \l\a\s H:i');
            return back()
                ->with('error', 'Esta oferta ya fue canjeada el {$date}');
        }

        if (!$userOffer->isValid()) {
            if($userOffer->isExpired()) {
                return back()
                    ->with('error', 'Esta oferta ha caducado');
            }
            return back()
                ->with('error', 'Esta oferta aún no está activa o no es válida');
        }

        // Pasa los filtros -> se canjea la oferta
        try {
            $userOffer->markAsRedeemed(auth()->id());

            return back()->with('success', `Éxito. {$userOffer->user->name} ha canjeado {$userOffer->offer->title}`);
        }
        catch (\Exception $e) {
            \Log::error('Error al canjear oferta UUID: ' . $uuid, [
                'error' => $e->getMessage()
            ]);

            return back()->with('error', 'Hubo un error interno al guardar el canjeo. Inténtelo de nuevo');
        }
    }
}
