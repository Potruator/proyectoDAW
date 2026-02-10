<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Offer;

class OfferFactory extends Factory {
    protected $model = Offer::class;

    public function definition(): array {

        $startsAt = $this->faker->dateTimeBetween('-7 days', 'now');
        $expiresAt = $this->faker->dateTimeBetween('now', '+30 days');

        return [
            'title' => $this->faker->randomElement([
                '2x1 en Bebidas',
                'Descuento en Tapas',
                'Happy Hour Especial',
                'Menú del Día',
                'Cóctel de la Casa',
                'Descuento Estudiantes',
                'Brunch Weekend',
                'Noche de Gin Tonic'
            ]),
            'description' => $this->faker->randomElement([
                'Disfruta de nuestra promoción especial en todas las bebidas.',
                'Aprovecha este descuento exclusivo en nuestra carta de tapas.',
                'Happy hour todos los días de 18:00 a 21:00.',
                'Menú completo con entrante, principal y postre.',
                'Prueba nuestro cóctel especial de la casa con descuento.',
                'Presentando tu carnet de estudiante obtienes descuento.',
                'Sábados y domingos brunch especial hasta las 14:00.',
                'Todas las variedades de gin tonic con precio especial.',
            ]),
            'discount_percentage' => $this->faker->randomElement([
                10, 15, 20, 25, 30, 50
            ]),
            'starts_at' => $startsAt,
            'expires_at' => $expiresAt,
            'is_public' => $this->faker->boolean(80),
            'is_featured' => $this->faker->boolean(30)
        ];
    }

    /**
     * Oferta activa (ya comenzó y no ha expirado)
     */
    public function active(): static {
        return $this->state(fn (array $attributes) => [
            'starts_at' => now()->subDays(rand(1, 7)),
            'expires_at' => now()->addDays(rand(7, 30)),
            'is_public' => true
        ]);
    }

    /**
     * Oferta destacada
     */
    public function featured(): static {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
            'is_public' => true
        ]);
    }

    /**
     * Oferta expirada
     */
    public function expired(): static {
        return $this->state(fn (array $attributes) => [
            'starts_at' => now()->addDays(rand(1, 7)),
            'expires_at' => now()->addDays(rand(14, 60)),
        ]);
    }

    /**
     * Oferta privada (no pública)
     */
    public function private(): static {
        return $this->state(fn (array $attributes) => [
            'is_public' => false
        ]);
    }
}