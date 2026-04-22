<?php

namespace Tests\Unit;

use App\Models\Event;
use Illuminate\Support\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class EventTest extends TestCase
{
    use RefreshDatabase;
    /**
     * Verificar que el scopeUpcoming() oculta los eventos que ya han pasado
     */
    public function test_upcoming_scope_only_returns_future_events(): void
    {
        // Creamos un evento caducado
        Event::create([
            'title' => 'Concierto Pasado',
            'description' => 'Test',
            'date' => now()->subDays(5),
            'location' => 'Cafertería',
            'is_public' => true
        ]);

        // Creamos un evento futuro
        Event::create([
            'title' => 'Concierto Futuro',
            'description' => 'Test',
            'date' => now()->addDays(5),
            'location' => 'Terraza',
            'is_public' => true
        ]);

        // Llamamos al Scope
        $upcomingEvents = Event::upcoming()->get();

        // Verificamos que solo devuelve el evento futuro
        $this->assertCount(1, $upcomingEvents);
        $this->assertEquals('Concierto Futuro', $upcomingEvents->first()->title);
    }

    /**
     * Verificar que el scopePublic() oculta los eventos privados del staff
     */
    public function test_public_scope_only_returns_public_events(): void
    {
        // Evento Privado
        Event::create([
            'title' => 'Reunión de Staff',
            'description' => 'Test',
            'date' => now()->addDays(5),
            'location' => 'Almacén',
            'is_public' => false
        ]);

        // Evento Público
        Event::create([
            'title' => 'Concurso de Trivial',
            'description' => 'Test',
            'date' => now()->addDays(5),
            'location' => 'Salón Principal',
            'is_public' => true
        ]);

        // Llamamos al Scope
        $publicEvents = Event::public()->get();

        // Comprobamos que ignora el evento privado
        $this->assertCount(1, $publicEvents);
        $this->assertEquals('Concurso de Trivial', $publicEvents->first()->title);
    }
}
