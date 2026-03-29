<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\UserOffer;

class Offer extends Model {

    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        // 'discount_code',
        'discount_percentage',
        'starts_at',
        'expires_at',
        'is_public',
        'is_featured'
    ];

    protected $casts = [
        'starts_at' => 'date',
        'expires_at' => 'date',
        'is_featured' => 'boolean',
        'is_public' => 'boolean'
    ];

    // Scope para ofertas activas
    public function scopeActive($query) {
        return $query
            ->where('starts_at', '<=', now())
            ->whereNull('expires_at')
            ->orWhere('expires_at', '>=', now())
            ->where('is_public', true);
    }

    public function scopeFeatured($query) {
        return $query
            ->where('is_featured', true)
            ->where('starts_at', '<=', now())
            ->where('expires_at', '>=', now());
    }

    // Relaciones
    public function userOffers() {
        return $this->hasMany(UserOffer::class);
    }
}