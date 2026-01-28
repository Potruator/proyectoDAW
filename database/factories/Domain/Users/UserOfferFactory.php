<?php

namespace Database\Factories\Domain\Users;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Users\Models\UserOffer;
use App\Domain\Users\Models\User;
use App\Domain\Offers\Models\Offer;
use Illuminate\Support\Str;

class UserOfferFactory extends Factory {
    protected $model = UserOffer::class;

    public function definition() {
        return [
            'user_id' => User::factory(), // crea usuario si no existe
            'offer_id' => Offer::factory(), // crea oferta si no existe
            'redeemed_at' => null,
            'uuid' => Str::uuid(),
        ];
    }


    // Estado: canjeada
    public function redeemed() {
        return $this->state(fn() => [
            'redeemed_at' => now(),
        ]);
    }
}