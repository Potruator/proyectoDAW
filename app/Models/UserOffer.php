<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Models\User;
use App\Models\Offer;

class UserOffer extends Model {
    use HasFactory;

    protected $fillable = [
        'user_id',
        'offer_id',
        'redeemed_at',
        'uuid',
    ];

    protected $dates = ['redeemed_at'];

    // Relaciones
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function offer() {
        return $this->belongsTo(Offer::class);
    }

    // Scopes
    public function scopeReedemed($query) {
        return $query->whereNotNull('redeemed_at');
    }

    public function scopePending($query) {
        return $query->whereNull('redeemed_at');
    }
}