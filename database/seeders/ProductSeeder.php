<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Offer;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ============================================
        // PRODUCTOS DE CAFETERÍA (Datos fijos)
        // ============================================

        Product::create([
            'name' => 'Café Latte Especial',
            'description' => 'Nuestro café insignia con doble shot de espresso, leche texturizada y un toque de vainilla.',
            'price' => 3.50,
            'image_url' => 'https://picsum.photos/seed/latte/400/300',
            'is_active' => true,
        ]);

        Product::create([
            'name' => 'Té Matcha Japonés',
            'description' => 'Auténtico té verde matcha batido a mano, servido caliente o con hielo.',
            'price' => 4.20,
            'image_url' => 'https://picsum.photos/seed/matcha/400/300',
            'is_active' => true,
        ]);

        // ============================================
        // COMIDA Y MERIENDAS (Datos fijos)
        // ============================================

        Product::create([
            'name' => 'Tostada Golden',
            'description' => 'Pan rústico de masa madre con aguacate fresco, huevo poché y mix de semillas.',
            'price' => 6.50,
            'image_url' => 'https://picsum.photos/seed/tostada/400/300',
            'is_active' => true,
        ]);

        Product::create([
            'name' => 'Tarta de Queso Horneada',
            'description' => 'Porción de nuestra famosa tarta de queso cremosa con base de galleta y sirope de frutos rojos.',
            'price' => 5.00,
            'image_url' => 'https://picsum.photos/seed/cheesecake/400/300',
            'is_active' => true,
        ]);

        // ============================================
        // PRODUCTOS ADICIONALES ALEATORIOS
        // ============================================

        Product::factory(12)->create();

        // ============================================
        // VINCULACIÓN CON OFERTAS (Tabla Pivote)
        // ============================================

        // Obtención de todas las ofertas existentes
        $offers = Offer::all();

        if ($offers->count() > 0) {
            foreach ($offers as $offer) {
                // Cogemos entre 1 y 3 IDs de productos al azar
                $randomProductIds = Product::inRandomOrder()->take(rand(1,3))->pluck('id');

                // Insertamos los registros en la tabla 'offer_product'
                $offer->products()->attach($randomProductIds);
            }
            $this->command->info('✅ Productos enlazados a las ofertas correctamente.');        
        }

        $this->command->info('✅ ' . Product::count() . ' productos creados correctamente en el menú.');    
    } 
}