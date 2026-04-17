<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Offer;
use App\Models\UserOffer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ClientSecurityTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Un cliente no puede ver el QR de otro cliente
     */
    public function test_client_cannot_redeem_other_client_qr_code(): void
    {
        // Creamos dos clientes distintos
        $clientA = User::factory()->create(['role' => 'client', 'name' => 'Cliente A']);
        $clientB = User::factory()->create(['role' => 'client', 'name' => 'Cliente B']);

        // Creamos oferta genérica
        $offer = Offer::factory()->create(['title' => 'Tarta de Queso']);

        // Asignamos la oferta EXCLUSIVAMENTE al Cliente A
        $userOfferClientA = UserOffer::create([
            'user_id' => $clientA->id,
            'offer_id' => $offer->id,
            'uuid' => 'QR-SECRETO-DEL-CLIENTE-A',
            'redeemed_at' => null
        ]);

        // El Cliente B inicia sesión e intenta acceder al QR del Cliente A
        $response = $this->actingAs($clientB)->get('/app/client/offers/QR-SECRETO-DEL-CLIENTE-A');

        // El sistema DEBE bloquearlo con un error 403
        $response->assertStatus(403);
    }

    /**
     * El cliente puede ver su propio QR.
     */
    public function test_client_can_redeem_its_own_qr_code(): void
    {
        // Creamos los datos
        $clientA = User::factory()->create(['role' => 'client']);
        $offer = Offer::factory()->create();

        // Asignamos la oferta al cliente
        $userOffer = UserOffer::create([
            'user_id' => $clientA->id,
            'offer_id' => $offer->id,
            'uuid' => 'MI-PROPIO-QR-123',
            'redeemed_at' => null
        ]);

        // El cliente accede a su QR
        $response = $this->actingAs($clientA)->get('/app/client/offers/MI-PROPIO-QR-123');

        // El sistema le permite acceder
        $response->assertStatus(200);
    }
}
