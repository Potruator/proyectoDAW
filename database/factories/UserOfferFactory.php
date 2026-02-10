<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\UserOffer;
use App\Models\User;
use App\Models\Offer;
use App\Enums\UserRole;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserOffer>
 */
class UserOfferFactory extends Factory {
    protected $model = UserOffer::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory()->client(), // Cliente por defecto
            'offer_id' => Offer::factory()->active(),
            'uuid' => (string) Str::uuid(),
            'assigned_at' => now()->subDays(rand(0, 7)),
            'redeemed_at' => null,
            'redeemed_by' => null,
            'redemption_notes' => null,
        ];
    }

    /**
     * Oferta canjeada
     */
    public function redeemed(): static {
        return $this->state(function (array $attributes) {
            $staff = User::where('role', UserRole::STAFF)->first() 
                ?? User::factory()->staff()->create();

            return [
                'redeemed_at' => now()->subDays(rand(0, 30)),
                'redeemed_by' => $staff->id,
                'redemption_notes' => $this->faker->randomElement([
                    'Canje sin problemas',
                    'Cliente satisfecho',
                    null,
                    'Verificado correctamente',
                ]),
            ];
        });
    }

    /**
     * Oferta pendiente (sin canjear)
     */
    public function pending(): static {
        return $this->state(fn (array $attributes) => [
            'redeemed_at' => null,
            'redeemed_by' => null,
            'redemption_notes' => null,
        ]);
    }

    /**
     * Asignada recientemente
     */
    public function recent(): static {
        return $this->state(fn (array $attributes) => [
            'assigned_at' => now()->subHours(rand(1, 24)),
        ]);
    }

    /**
     * Asignada hace tiempo
     */
    public function old(): static {
        return $this->state(fn (array $attributes) => [
            'assigned_at' => now()->subDays(rand(30, 90)),
        ]);
    }

    /**
     * Para un usuario específico
     */
    public function forUser(User $user): static {
        return $this->state(fn (array $attributes) => [
            'user_id' => $user->id,
        ]);
    }

    /**
     * Para una oferta específica
     */
    public function forOffer(Offer $offer): static {
        return $this->state(fn (array $attributes) => [
            'offer_id' => $offer->id,
        ]);
    }
}