<?php

namespace App\Domain\Users\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable {
    use Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = ['password'];

    public function offers() {
        return $this->hasMany(UserOffer::class);
    }
}