<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Event;

class EventFactory extends Factory {

    protected $model = Event::class;

    public function definition(): array {
        return [
            'title' => $this->faker->randomElement([
                'Noche de Jazz en Vivo',
                'Torneo de Trivial',
                'Degustación de Vinos',
                'Concierto Acústico',
                'Noche de Karaoke',
                'DJ Set Electrónica',
                'Open Mic Night',
                'Fiesta Temática Años 80',
                'Showcooking con Chef',
                'Festival de Cerveza Artesanal',
            ]),
            'description' => $this->faker->randomElement([
                'Únete a nosotros para una velada inolvidable con música en directo.',
                'Demuestra tus conocimientos en nuestro torneo semanal de trivial.',
                'Descubre los mejores vinos seleccionados por nuestro sommelier.',
                'Artistas locales presentan sus mejores temas en versión acústica.',
                'Canta tus canciones favoritas en una noche llena de diversión.',
                'Los mejores DJs de la ciudad pinchando en nuestro local.',
                'Muestra tu talento en nuestro escenario abierto para todos.',
                'Vuelve a los 80 con la mejor música de la época.',
                'Aprende técnicas culinarias con nuestro chef mientras cocina.',
                'Prueba las mejores cervezas artesanales de cervecerías locales.',
            ]),
            'date' => $this->faker->dateTimeBetween('now', '+90 days'),
            'image_path' => null,
            'location' => $this->faker->randomElement([
                'Sala Principal',
                'Terraza',
                'Salón VIP',
                'Patio Exterior',
                'Bar Principal',
                'Zona Lounge'
            ]),
            'is_public' => $this->faker->boolean(90),
        ];
    }

    /**
     * Evento próximo (esta semana)
     */
    public function thisWeek(): static {
        return $this->state(fn (array $attributes) => [
            'date' => $this->faker->dateTimeBetween('now', '+7 days'),
            'is_public' => true
        ]);
    }

    /**
     * Evento este fin de semana
     */
    public function thisWeekend(): static {
        return $this->state(fn (array $attributes) => [
            'is_public' => false
        ]);
    }

    /**
     * Evento pasado
     */
    public function past(): static {
        return $this->state(fn (array $attributes) => [
            'date' => $this->faker->dateTimeBetween('-60 days', '-1 day')
        ]);
    }
}