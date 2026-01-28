<?php
namespace Database\Factories\Domain\Events;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Events\Models\Event;

class EventFactory extends Factory {

    protected $model = Event::class;

    public function definition() {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'date' => $this->faker->dateTimeBetween('now', '+30 days'),
            'location' => $this->faker->city(),
            'is_public' => $this->faker->boolean(80), // 80% de probabilidad de ser público
        ];
    }
}