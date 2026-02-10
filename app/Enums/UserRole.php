<?php

namespace App\Enums;

enum UserRole: string {
    case ADMIN = 'admin';
    case STAFF = 'staff';
    case CLIENT = 'client';

    // Etiqueta legible del rol
    public function label(): string {
        return match($this) {
            self::ADMIN => 'Administrador',
            self::STAFF => 'Personal',
            self::CLIENT => 'Cliente'
        };
    }

    // Todos los valores posibles como array
    public static function values(): array {
        return array_column(self::cases(), 'value');
    }

    // Almacenar todos los valores posibles como colección (value -> label)
    public static function options(): array {
        return collect(self::cases())
            ->mapWithKeys(fn($role) => [$role->value => $role->label()])
            ->toArray();
    }

    // Verificar si es admin
    public function isAdmin(): bool {
        return $this === self::ADMIN;
    }

    // Verificar si es staff
    public function isStaff(): bool {
        return $this === self::STAFF;
    }

    // Verificar si es cliente
    public function isClient(): bool {
        return $this === self::CLIENT;
    }
}