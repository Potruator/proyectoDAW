<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Lista de productos típicos de cafetería
        $cafeProducts =[
            'Café Espresso', 'Café Latte', 'Capuccino', 'Flat White', 'Americano',
            'Té Matcha', 'Té Chai', 'Infusión de Frutos Rojos',
            'Tostada con Aguacate', 'Tostada Francesa', 'Croissant de Mantequilla',
            'Tarta de Zanahoria', 'Brownie de Chocolate', 'Cookie Clásica', 'Batido de Fresa'
        ];


        return [
            'name' => fake()->randomElement($cafeProducts),
            'description' => fake()->sentence(8),
            'price' => fake()->randomFloat(2, 1.50, 8.50),
            // Servicio gratuito de imágenes placeholder
            'image_url' => 'https://picsum.photos/seed' . fake()->word() . '/400/300',
            'is_active' => fake()->boolean(90)
        ];
    }
}
