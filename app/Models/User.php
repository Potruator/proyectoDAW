<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use App\Enums\UserRole;

/**
 * Representa a un usuario registrado en el sistema (Cliente, Staff o Administrador).
 *
 * @property int $id Identificador autoincremental del usuario.
 * @property string $name Nombre completo o de perfil del usuario.
 * @property string $email Correo electrónico único utilizado para el inicio de sesión.
 * @property \Illuminate\Support\Carbon|null $email_verified_at Fecha y hora en la que se verificó el email.
 * @property string $password Contraseña cifrada (hashed) del usuario.
 * @property \App\Enums\UserRole $role Rol de acceso y permisos del usuario en el sistema.
 * @property string|null $remember_token Token de sesión para la funcionalidad "Recuérdame".
 * @property \Illuminate\Support\Carbon|null $created_at Fecha de registro del usuario en la plataforma.
 * @property \Illuminate\Support\Carbon|null $updated_at Fecha de la última actualización del perfil.
 * * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Offer[] $offers Colección de ofertas asignadas o canjeadas por el usuario.
 */
class User extends Authenticatable {
    use HasApiTokens, Notifiable, HasFactory;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token'    
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'role' => UserRole::class
    ];

    /**
     * Relación N:M con Offer.
     * Obtiene el historial o la cartera de ofertas asignadas a este usuario concreto.
     * Utiliza el modelo UserOffer para gestionar la tabla pivote personalizada.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function offers() {
        return $this->belongsToMany(Offer::class, 'user_offers')
                    ->using(UserOffer::class)
                    ->withPivot(['uuid', 'assigned_at', 'redeemed_at'])
                    ->withTimestamps();
    }

    // Métodos helper para roles
    /**
     * Comprueba si el usuario tiene privilegios de Administrador.
     *
     * @return bool
     */
    public function isAdmin(): bool {
        return $this->role === UserRole::ADMIN;
    }

    /**
     * Comprueba si el usuario pertenece a la plantilla de empleados (Staff).
     *
     * @return bool
     */
    public function isStaff(): bool {
        return $this->role === UserRole::STAFF;
    }
    
    /**
     * Comprueba si el usuario es un cliente final.
     *
     * @return bool
     */
    public function isClient(): bool {
        return $this->role === UserRole::CLIENT;
    }

    /**
     * Valida de forma dinámica si el usuario posee uno o varios de los roles especificados.
     *
     * @param \App\Enums\UserRole ...$roles Uno o más Enums representando los roles aceptados.
     * @return bool
     */
    public function hasRole(UserRole ...$roles): bool {
        return in_array($this->role, $roles);
    }
}