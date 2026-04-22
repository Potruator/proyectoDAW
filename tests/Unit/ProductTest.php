<?php

namespace Tests\Unit;

use App\Models\Product;
use App\Models\Offer;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProductTest extends TestCase
{
    use RefreshDatabase;
    /**
     * Verificar la relación N:M con Offer
     */
    public function test_product_can_be_attached_to_multiple_offers(): void
    {
        // Creamos un producto
        $product = Product::create([
            'name' => 'Tostada de Aguacate',
            'description' => 'Pan de masa madre con aguacate',
            'price' => 4.50,
            'is_active' => true
        ]);

        // Creamos una oferta
        $offer = Offer::create([
            'title' => 'Desayuno Saludable',
            'description' => 'Tostada + Café con 15% de descuento',
            'discount_percentage' => 15,
            'starts_at' => now()->subDay(),
            'is_public' => true
        ]);

        // Asociamos producto a la oferta mediante la tabla pivote
        $product->offers()->attach($offer->id);

        // Refrescamos el producto en la BD para asegurarnos de que la relación se guardó
        $product->refresh();

        // Comprobamos que el producto tiene 1 oferta y que es exactamente la que hemos creado
        $this->assertCount(1, $product->offers);
        $this->assertTrue($product->offers->contains('title', 'Desayuno Saludable'));
    }
}
