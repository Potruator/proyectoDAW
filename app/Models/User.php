<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Laravel\Sanctum\HasApiTokens;
use App\Enums\UserRole;
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

    public function offers() {
        return $this->hasMany(UserOffer::class);
    }

    // Métodos helper para roles
    public function isAdmin(): bool {
        return $this->role === UserRole::ADMIN;
    }

    public function isStaff(): bool {
        return $this->role === UserRole::STAFF;
    }

    public function isClient(): bool {
        return $this->role === UserRole::CLIENT;
    }

    public function hasRole(UserRole ...$roles): bool {
        return in_array($this->role, $roles);
    }
}