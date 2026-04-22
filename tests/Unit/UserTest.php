<?php

namespace Tests\Unit;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Enums\UserRole;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;
    /**
     * Verificar que los atributos básicos se asignan correctamente
     */
    public function test_user_has_correct_attributes(): void
    {
        $user = new User([
            'name' => 'Fran',
            'email' => 'fran@example.com',
            'role' => 'admin'
        ]);

        $this->assertEquals('Fran', $user->name);
        $this->assertEquals('fran@example.com', $user->email);
        $this->assertEquals(UserRole::ADMIN, $user->role);
    }

    /**
     * Validar los métodos helper de roles
     */
    public function test_user_role_helpers_return_correct_boolean(): void
    {
        $admin = new User(['role' => UserRole::ADMIN]);
        $staff = new User(['role' => UserRole::STAFF]);
        $client = new User(['role' => UserRole::CLIENT]);

        $this->assertTrue($admin->isAdmin());
        $this->assertTrue($staff->isStaff());
        $this->assertTrue($client->isClient());

        $this->assertFalse($client->isAdmin());
    }

    /**
     * Verificar que la contraseña se guarda cifrada
     */
    public function test_password_is_correctly_hashed(): void
    {
        $password = 'password123';
        $user = new User([
            'password' => $password
        ]);

        $this->assertNotEquals($password, $user->password);
        $this->assertTrue(Hash::check($password, $user->password));
    }
}
