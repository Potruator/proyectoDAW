<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Enums\UserRole;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Usuario Admin
        User::create([
            'name' => 'Administrador',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => UserRole::ADMIN,
            'email_verified_at' => now(),
        ]);

        // Usuario Staff
        User::create([
            'name' => 'Camarero Principal',
            'email' => 'staff@example.com',
            'password' => Hash::make('password'),
            'role' => UserRole::STAFF,
            'email_verified_at' => now(),
        ]);

        // Usuario Cliente
        User::create([
            'name' => 'Cliente Demo',
            'email' => 'cliente@example.com',
            'password' => Hash::make('password'),
            'role' => UserRole::CLIENT,
            'email_verified_at' => now(),
        ]);

        // Generación nuevos usuarios aleatorios usando Factory
        User::factory(5)->client()->create(); // 5 clientes
        User::factory(2)->staff()->create(); // 2 staff
    }
}
