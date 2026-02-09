<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Offer;

class OfferFactory extends Factory {
    protected $model = Offer::class;

    public function definition() {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'discount_percentage' => $this->faker->numberBetween(5, 50),
            'starts_at' => now()->subDays(),
            'expires_at' => now()->addDays(5),
            'is_public' => true,
            'is_featured' => true
        ];
    }
}