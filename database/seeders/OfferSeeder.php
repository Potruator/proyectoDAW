<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Offer;

class OfferSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // ============================================
        // OFERTAS ACTIVAS Y DESTACADAS
        // ============================================

        // 1. Oferta 2x1 en bebidas - DESTACADA
        Offer::create([
            'title' => '2x1 en Todas las Bebidas',
            'description' => 'Disfruta de dos bebidas por el precio de una. Válido de lunes a jueves de 18:00 a 21:00. Incluye cervezas, refrescos, vinos y cócteles seleccionados.',
            'discount_percentage' => 50,
            'starts_at' => now()->subDays(3),
            'expires_at' => now()->addDays(27),
            'is_public' => true,
            'is_featured' => true,
        ]);

        // 2. Happy Hour - DESTACADA
        Offer::create([
            'title' => 'Happy Hour Diario',
            'description' => 'De 17:00 a 20:00 todos los días. Descuento del 30% en toda la carta de cócteles y bebidas premium. ¡El momento perfecto para relajarte después del trabajo!',
            'discount_percentage' => 30,
            'starts_at' => now()->subDays(7),
            'expires_at' => now()->addDays(60),
            'is_public' => true,
            'is_featured' => true,
        ]);

        // 3. Menú del día - DESTACADA
        Offer::create([
            'title' => 'Menú del Día Completo',
            'description' => 'Menú de lunes a viernes: primero, segundo, postre, pan y bebida incluidos. Opciones vegetarianas disponibles. Horario: 13:00 a 16:00.',
            'discount_percentage' => 25,
            'starts_at' => now()->subDays(1),
            'expires_at' => now()->addDays(90),
            'is_public' => true,
            'is_featured' => true,
        ]);

        // ============================================
        // OFERTAS ACTIVAS NORMALES
        // ============================================

        // 4. Descuento estudiantes
        Offer::create([
            'title' => 'Descuento para Estudiantes',
            'description' => 'Presenta tu carnet de estudiante vigente y obtén un 15% de descuento en toda la carta. No acumulable con otras promociones.',
            'discount_percentage' => 15,
            'starts_at' => now()->subDays(14),
            'expires_at' => now()->addDays(180),
            'is_public' => true,
            'is_featured' => false,
        ]);

        // 5. Tapas especiales
        Offer::create([
            'title' => 'Ruta de Tapas',
            'description' => '3 tapas + bebida por precio especial. Elige entre nuestras 12 tapas gourmet. Disponible todos los días a partir de las 19:00.',
            'discount_percentage' => 20,
            'starts_at' => now()->subDays(5),
            'expires_at' => now()->addDays(45),
            'is_public' => true,
            'is_featured' => false,
        ]);

        // 6. Brunch weekend
        Offer::create([
            'title' => 'Brunch de Fin de Semana',
            'description' => 'Sábados y domingos de 11:00 a 15:00. Brunch ilimitado con mimosas, zumos naturales, bollería artesanal y platos calientes. Reserva previa recomendada.',
            'discount_percentage' => 10,
            'starts_at' => now()->subDays(2),
            'expires_at' => now()->addDays(30),
            'is_public' => true,
            'is_featured' => false,
        ]);

        // ============================================
        // OFERTAS FUTURAS (Próximamente)
        // ============================================

        // 7. Oferta futura - San Valentín
        Offer::create([
            'title' => 'Cena Romántica San Valentín',
            'description' => 'Menú especial para dos personas. Incluye entrante, principal, postre y botella de vino o cava. Ambiente íntimo con música en vivo.',
            'discount_percentage' => 15,
            'starts_at' => now()->addDays(5),
            'expires_at' => now()->addDays(20),
            'is_public' => true,
            'is_featured' => true,
        ]);

        // ============================================
        // OFERTAS PRIVADAS (Solo usuarios VIP)
        // ============================================

        // 8. Oferta exclusiva VIP
        Offer::create([
            'title' => 'Acceso VIP Eventos Privados',
            'description' => 'Acceso exclusivo a eventos privados, degustaciones y lanzamientos de productos. Solo para miembros VIP del club.',
            'discount_percentage' => 40,
            'starts_at' => now()->subDays(10),
            'expires_at' => now()->addDays(365),
            'is_public' => false,
            'is_featured' => false,
        ]);

        // ============================================
        // OFERTAS ADICIONALES ALEATORIAS
        // ============================================

        // Generar 7 ofertas adicionales variadas usando factory
        Offer::factory(3)->active()->create(); // 3 ofertas activas
        Offer::factory(2)->featured()->create(); // 2 ofertas destacadas
        Offer::factory(1)->expired()->create(); // 1 oferta expirada
        Offer::factory(1)->private()->create(); // 1 oferta privada

        $this->command->info('✅ ' . Offer::count() . ' ofertas creadas correctamente');
    }
}
