<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;
use Carbon\Carbon;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ============================================
        // EVENTOS DE ESTA SEMANA
        // ============================================

        // 1. Evento hoy por la noche
        Event::create([
            'title' => 'Noche de Jazz en Vivo',
            'description' => 'Disfruta de una velada única con el trío de jazz "Blue Notes". Música en directo desde las 21:00. Reserva tu mesa con antelación. Entrada libre consumiendo.',
            'date' => now()->setTime(21, 0, 0),
            'location' => 'Sala Principal',
            'is_public' => true,
        ]);

        // 2. Evento mañana
        Event::create([
            'title' => 'Torneo de Trivial',
            'description' => 'Demuestra tus conocimientos en nuestro torneo semanal. Premios para los 3 primeros equipos. Inscripción de equipos (máximo 4 personas) desde las 19:00. Comienza a las 20:30.',
            'date' => now()->addDay()->setTime(20, 30, 0),
            'location' => 'Bar Principal',
            'is_public' => true,
        ]);

        // 3. Evento viernes de esta semana
        Event::create([
            'title' => 'DJ Set - Música Electrónica',
            'description' => 'Los mejores DJs de la ciudad presentan una sesión inolvidable de electrónica y house. Desde las 23:00 hasta el cierre. Cover: 5€ incluye primera consumición.',
            'date' => now()->next(Carbon::FRIDAY)->setTime(23, 0, 0),
            'location' => 'Terraza',
            'is_public' => true,
        ]);

        // ============================================
        // EVENTOS DEL FIN DE SEMANA
        // ============================================

        // 4. Sábado - Showcooking
        Event::create([
            'title' => 'Showcooking con Chef Invitado',
            'description' => 'El chef Martín García presenta su nuevo menú degustación. Aprende técnicas culinarias mientras disfrutas de una experiencia gastronómica única. Plazas limitadas: 20 personas. Precio: 45€ por persona.',
            'date' => now()->next(Carbon::SATURDAY)->setTime(13, 0, 0),
            'location' => 'Salón VIP',
            'is_public' => true,
        ]);

        // 5. Sábado noche - Karaoke
        Event::create([
            'title' => 'Noche de Karaoke',
            'description' => 'Canta tus canciones favoritas en nuestra noche de karaoke. Sistema profesional de sonido y más de 10,000 canciones disponibles. Premios para las mejores actuaciones.',
            'date' => now()->next(Carbon::SATURDAY)->setTime(22, 0, 0),
            'location' => 'Bar Principal',
            'is_public' => true,
        ]);

        // 6. Domingo - Brunch musical
        Event::create([
            'title' => 'Brunch Musical Dominical',
            'description' => 'Desayuno-almuerzo ilimitado con música en vivo. Artistas acústicos locales amenizarán tu domingo. Reserva mesa de 11:00 a 15:00. Precio: 28€ por persona.',
            'date' => now()->next(Carbon::SUNDAY)->setTime(12, 0, 0),
            'location' => 'Terraza',
            'is_public' => true,
        ]);

        // ============================================
        // EVENTOS PRÓXIMOS (Siguiente semana)
        // ============================================

        // 7. Semana que viene - Degustación de vinos
        Event::create([
            'title' => 'Cata de Vinos Españoles',
            'description' => 'Nuestro sommelier te guiará por una selección de 6 vinos de diferentes regiones de España. Incluye maridaje con quesos artesanales. Duración: 2 horas. Precio: 35€.',
            'date' => now()->addDays(9)->setTime(19, 30, 0),
            'location' => 'Sala Principal',
            'is_public' => true,
        ]);

        // 8. Dentro de 2 semanas - Concierto
        Event::create([
            'title' => 'Concierto Acústico: The Wanderers',
            'description' => 'La banda local The Wanderers presenta su nuevo álbum en versión acústica. Entrada anticipada: 8€. En taquilla: 10€. Apertura de puertas: 20:00. Concierto: 21:00.',
            'date' => now()->addDays(15)->setTime(21, 0, 0),
            'location' => 'Sala Principal',
            'is_public' => true,
        ]);

        // ============================================
        // EVENTOS MÁS LEJANOS
        // ============================================

        // 9. Evento mensual - Open Mic
        Event::create([
            'title' => 'Open Mic Night',
            'description' => 'Micrófono abierto para todos. Comparte tu talento: música, poesía, monólogos. Inscripción en el momento (10 min por artista). Comienza a las 20:00. ¡Anima a tus amigos!',
            'date' => now()->addDays(21)->setTime(20, 0, 0),
            'location' => 'Bar Principal',
            'is_public' => true,
        ]);

        // 10. Evento temático
        Event::create([
            'title' => 'Fiesta Temática: Años 80',
            'description' => 'Vuelve a los 80 con la mejor música de la década. Dress code: estilo ochentero. Premios al mejor disfraz. DJ especializado en éxitos de los 80. Entrada: 5€ con consumición.',
            'date' => now()->addDays(30)->setTime(22, 30, 0),
            'location' => 'Sala Principal y Terraza',
            'is_public' => true,
        ]);

        // ============================================
        // EVENTO PRIVADO (No público)
        // ============================================

        // 11. Evento privado
        Event::create([
            'title' => 'Reservado: Evento Corporativo',
            'description' => 'Evento privado reservado para empresa. No disponible para público general.',
            'date' => now()->addDays(12)->setTime(19, 0, 0),
            'location' => 'Salón VIP',
            'is_public' => false,
        ]);

        // ============================================
        // EVENTOS ADICIONALES ALEATORIOS
        // ============================================

        // Generar 5 eventos adicionales usando factory
        Event::factory(3)->thisWeek()->create(); // 3 eventos esta semana
        Event::factory(2)->thisWeekend()->create(); // 2 eventos para este fin de semana
        Event::factory(2)->past()->create(); // 2 eventos pasados

        $this->command->info('✅ ' . Event::count() . ' eventos creados correctamente');
    }
}
