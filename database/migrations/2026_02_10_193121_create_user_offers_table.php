<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_offers', function (Blueprint $table) {
            $table->id();

            // Relaciones
            $table->foreignId('user_id')
                ->constrained()
                ->onDelete('cascade');

            $table->foreignId('offer_id')
                ->constrained()
                ->onDelete('cascade');

            // UUID único para QR y validación
            $table->uuid('uuid')->unique();

            // Fecha de asignación y canje
            $table->timestamp('assigned_at')->default(now());
            $table->timestamp('redeemed_at')->nullable();

            $table->foreignId('redeemed_by')->nullable()
                ->comment('ID del staff que canjeó la oferta')
                ->constrained('users')
                ->onDelete('set null');

            $table->text('redemption_notes')->nullable()
                ->comment('Notas opcionales del canje');

            $table->timestamps();

            // Índices para mejorar rendimiento
            $table->index(['user_id', 'offer_id']);
            $table->index('uuid');
            $table->index('redeemed_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_offers');
    }
};
