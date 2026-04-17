<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class RoleSecurityTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Un cliente NO puede acceder al panel de administrador
     */
    public function test_client_cannot_access_admin_panel(): void
    {
        // Creamos un usuario cliente
        $client = User::factory()->create([
            'role' => 'client'
        ]);

        // El cliente intenta entrar a la URL del admin
        $response = $this->actingAs($client)->get('/app/admin');

        // Comprobación Esperada: el sistema DEBE bloquearle el paso
        $response->assertStatus(403);
    }


    /**
     * Un administrador SÍ puede acceder a su panel
     */
    public function test_admin_can_access_admin_panel(): void
    {
        // Creamos un usuario admin
        $admin = User::factory()->create([
            'role' => 'admin'
        ]);

        // Intenta entrar a la URL del admin
        $response = $this->actingAs($admin)->get('/app/admin');

        // El sistema lo admite
        $response->assertStatus(200);
    }
}
