<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Event;

class EventFactory extends Factory {

    protected $model = Event::class;

    public function definition() {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'date' => $this->faker->dateTimeBetween('now', '+30 days'),
            'image_path' => $this->faker->url(),
            'location' => $this->faker->city(),
            'is_public' => $this->faker->boolean(80), // 80% de probabilidad de ser público
        ];
    }
}