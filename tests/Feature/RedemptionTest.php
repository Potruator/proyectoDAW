<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Offer;
use App\Models\UserOffer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RedemptionTest extends TestCase
{
    // Nos aseguramos de que la base de datos de pruebas se borre y se vuelva a crear en cada test
    use RefreshDatabase;


    /**
     * Prueba de Integración: Un camarero puede canjear un código válido
     */
    public function test_staff_can_redeem_valid_qr(): void
    {
        // Preparación de entrada de datos
        $staff = User::factory()->create(['role' => 'staff']);
        $client = User::factory()->create(['role' => 'client']);
        $offer = Offer::factory()->create(['title' => 'Café Gratis']);

        // Creamos la oferta asignada al cliente, con un UUID conocido y SIN canjear
        $userOffer = UserOffer::create([
            'user_id' => $client->id,
            'offer_id' => $offer->id,
            'uuid' => 'CODIGO-SECRETO-123',
            'redeemed_at' => null // No canjeada
        ]);

        // Simulación del staff haciendo POST a la ruta del escáner
        $response = $this->actingAs($staff)->post('/app/staff/scan/CODIGO-SECRETO-123');

        // Comprobaciones:

        // Redirige de vuelta con un mensaje de texto
        $response->assertSessionHas('success', 'Éxito. ' . $userOffer->user->name . 'ha canjeado ' . $userOffer->offer->title);

        // La base de datos DEBE haber cambiado
        $this->assertDatabaseHas('user_offers', [
            'uuid' => 'CODIGO-SECRETO-123',
            'redeemed_by' => $staff->id
        ]);

        // Verificamos que redeemed_at ya no es nulo
        $this->assertNotNull($userOffer->fresh()->redeemed_at);
    }

    /**
     * Prueba de Integración: Intentar escanear un código que NO existe.
     */
    public function test_scan_invalid_qr(): void
    {
        $staff = User::factory()->create(['role' => 'staff']);

        $response = $this->actingAs($staff)->post('/app/staff/scan/CODIGO-FALSO-999');

        $response->assertSessionHas('error', 'Código QR no reconocido');
    }
}
