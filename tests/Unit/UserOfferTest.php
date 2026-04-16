<?php

namespace Tests\Unit;

use App\Models\UserOffer;
use App\Models\Offer;
use Carbon\Carbon;
use Tests\TestCase;

class UserOfferTest extends TestCase
{
    /**
     * Prueba Unitaria: Comprobar que el método isExpired funciona
     */
    public function test_check_isExpired(): void
    {
        // Creamos una oferta en memoria con fecha de ayer
        $parentOfferExpired = new Offer();
        $parentOfferExpired->expires_at = Carbon::yesterday();

        $expiredOffer = new UserOffer();
        $expiredOffer->setRelation('offer', $parentOfferExpired);

        // El método isExpired() debe devolver true
        $this->assertTrue($expiredOffer->isExpired(), 'La oferta debería detectarse como caducada.');

        // Entrada 2: Una oferta que caduca mañana
        $parentOfferActive = new Offer();
        $parentOfferActive->expires_at = Carbon::tomorrow();

        $activeOffer = new UserOffer();
        $activeOffer->setRelation('offer', $parentOfferActive);

        // isExpired() debe devolver false
        $this->assertFalse($activeOffer->isExpired(), 'La oferta NO debería detectarse como caducada.');
    }
}
