<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Offer;
use App\Models\UserOffer;
use App\Enums\UserRole;

class UserOfferSeeder extends Seeder {
    /**
     * Run the database seeds.
     */
    public function run(): void {
        // Verificar que existan usuarios y ofertas
        if (User::count() === 0) {
            $this->command->warn('⚠️ No hay usuarios. Ejecuta UserSeeder primero.');
            return;
        }

        if (Offer::count() === 0) {
            $this->command->warn('⚠️ No hay ofertas. Ejecuta OfferSeeder primero.');
            return;
        }

        $this->command->info('🔄 Asignando ofertas a usuarios...');

        // Obtener usuarios clientes y ofertas activas
        $clients = User::where('role', UserRole::CLIENT)->get();
        $activeOffers = Offer::active()->get();

        if ($clients->isEmpty()) {
            $this->command->warn('⚠️ No hay clientes disponibles.');
            return;
        }

        if ($activeOffers->isEmpty()) {
            $this->command->warn('⚠️ No hay ofertas activas.');
            $activeOffers = Offer::all(); // Usar todas si no hay activas
        }

        // ============================================
        // ASIGNAR OFERTAS A CADA CLIENTE
        // ============================================

        foreach ($clients as $client) {
            // Cada cliente recibe entre 2 y 5 ofertas
            $numOffers = rand(2, 5);
            $selectedOffers = $activeOffers->random(min($numOffers, $activeOffers->count()));

            foreach ($selectedOffers as $offer) {
                // 70% pendientes, 30% canjeadas
                $isRedeemed = rand(1, 100) <= 30;

                if ($isRedeemed) {
                    // Crear oferta canjeada
                    UserOffer::factory()
                        ->forUser($client)
                        ->forOffer($offer)
                        ->redeemed()
                        ->create();
                } else {
                    // Crear oferta pendiente
                    UserOffer::factory()
                        ->forUser($client)
                        ->forOffer($offer)
                        ->pending()
                        ->create();
                }
            }
        }

        // ============================================
        // CASOS ESPECIALES
        // ============================================

        // Buscar usuario demo/test si existe
        $demoClient = User::where('email', 'cliente@example.com')->first();

        if ($demoClient) {
            $this->command->info('📱 Asignando ofertas especiales al cliente demo...');

            // Asignar todas las ofertas destacadas al cliente demo
            $featuredOffers = Offer::where('is_featured', true)->get();

            foreach ($featuredOffers as $offer) {
                // Evitar duplicados
                $exists = UserOffer::where('user_id', $demoClient->id)
                    ->where('offer_id', $offer->id)
                    ->exists();

                if (!$exists) {
                    UserOffer::factory()
                        ->forUser($demoClient)
                        ->forOffer($offer)
                        ->pending()
                        ->recent() // Asignadas recientemente
                        ->create();
                }
            }

            // Crear algunas ofertas canjeadas para el demo
            $someOffers = Offer::active()->limit(2)->get();
            foreach ($someOffers as $offer) {
                $exists = UserOffer::where('user_id', $demoClient->id)
                    ->where('offer_id', $offer->id)
                    ->exists();

                if (!$exists) {
                    UserOffer::factory()
                        ->forUser($demoClient)
                        ->forOffer($offer)
                        ->redeemed()
                        ->create();
                }
            }
        }

        // ============================================
        // ESTADÍSTICAS
        // ============================================

        $total = UserOffer::count();
        $pending = UserOffer::pending()->count();
        $redeemed = UserOffer::redeemed()->count();
        $valid = UserOffer::valid()->count();

        $this->command->info('✅ Asignación de ofertas completada!');
        $this->command->info("📊 Total: {$total} asignaciones");
        $this->command->info("⏳ Pendientes: {$pending}");
        $this->command->info("✓ Canjeadas: {$redeemed}");
        $this->command->info("✅ Válidas: {$valid}");
    }
}