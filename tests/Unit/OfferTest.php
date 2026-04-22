<?php

namespace Tests\Unit;

use App\Models\Offer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class OfferTest extends TestCase
{
    use RefreshDatabase;
    /**
     * Verificar que el scope active() solo debe devolver ofertas que hayan empezado,
     * no hayan caducado y sean públicas
     */
    public function test_active_scope_filters_correctly(): void
    {
        // Datos base para no repetir (cumpliendo con todos los campos obligatorios)
        $baseData = ['description' => 'Test', 'discount_percentage' => 10];

        // 1. Oferta Válida (Pública, empezó ayer, sin fecha de caducidad)
        Offer::create(array_merge($baseData, [
            'title' => 'Válida Infinita', 
            'starts_at' => now()->subDay(), 
            'is_public' => true
            ]));
        
        // 2. Oferta Válida (Pública, empezó ayer, caduca mañana)
        Offer::create(array_merge($baseData, [
            'title' => 'Válida Temporal', 
            'starts_at' => now()->subDay(), 
            'expires_at' => now()->addDay(), 
            'is_public' => true
            ]));

        // 3. Oferta Inválida: Aún no ha empezado (Empieza mañana)
        Offer::create(array_merge($baseData, [
            'title' => 'Futura', 
            'starts_at' => now()->addDay(), 
            'is_public' => true
            ]));

        // 4. Oferta Inválida: Ya caducó (Caducó ayer)
        Offer::create(array_merge($baseData, [
            'title' => 'Caducada', 
            'starts_at' => now()->subDays(5), 
            'expires_at' => now()->subDay(), 
            'is_public' => true
            ]));

        // 5. Oferta Inválida: Es privada
        Offer::create(array_merge($baseData, [
            'title' => 'Privada', 
            'starts_at' => now()->subDay(), 
            'is_public' => false
            ]));

        // Ejecutamos el scope
        $activeOffers = Offer::active()->get();

        // Verificamos que solo nos devuelve las 2 válidas y descarta las otras 3
        $this->assertCount(2, $activeOffers);
        $this->assertTrue($activeOffers->contains('title', 'Válida Infinita'));
        $this->assertTrue($activeOffers->contains('title', 'Válida Temporal'));
        $this->assertFalse($activeOffers->contains('title', 'Caducada'));
    }

    public function test_featured_scope_filters_correctly(): void
    {
        // Datos base para no repetir (cumpliendo con todos los campos obligatorios)
        $baseData = ['description' => 'Test', 'discount_percentage' => 10];

        // 1. Oferta Destacada y Vigente (Debería ser la única devuelta)
        Offer::create(array_merge($baseData, [
            'title' => 'Destacada Activa', 
            'starts_at' => now()->subDay(), 
            'is_featured' => true
            ]));
        
        // 2. Oferta Destacada pero Caducada (No debería devolverse)
        Offer::create(array_merge($baseData, [
            'title' => 'Destacada Caducada', 
            'starts_at' => now()->subDay(5), 
            'expires_at' => now()->subDay(), 
            'is_featured' => true
            ]));

        // 3. Oferta Vigente pero NO Destacada (No debería devolverse)
        Offer::create(array_merge($baseData, [
            'title' => 'Normal Activa', 
            'starts_at' => now()->subDay(), 
            'is_featured' => false
            ]));

        // Ejecutamos el scope
        $featuredOffers = Offer::featured()->get();

        // Verificamos que solo devuelve 1 oferta y es la correcta
        $this->assertCount(1, $featuredOffers);
        $this->assertEquals('Destacada Activa', $featuredOffers->first()->title);
    }
}
