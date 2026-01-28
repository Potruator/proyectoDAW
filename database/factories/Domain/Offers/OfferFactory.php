<?php

namespace Database\Factories\Domain\Offers;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Offers\Models\Offer;

class OfferFactory extends Factory {
    protected $model = Offer::class;

    public function definition() {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph,
            'starts_at' => now()->subDays(),
            'ends_at' => now()->addDays(5),
            'is_public' => true,
            'discount_percentage' => $this->faker->numberBetween(5, 50),
        ];
    }
}