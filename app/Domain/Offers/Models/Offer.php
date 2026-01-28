<?php

namespace App\Domain\Offers\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Domain\Users\Models\UserOffer;

class Offer extends Model {

    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'starts_at',
        'ends_at',
        'is_public',
        'discount_percentage',
    ];

    // Scope para ofertas activas
    public function scopeActive($query) {
        return $query
            ->where('starts_at', '<=', now())
            ->where('ends_at', '>=', now())
            ->where('is_public', true);
    }

    public function scopeFeatured($query) {
        return $query
            ->where('is_featured', true)
            ->where('starts_at', '<=', now())
            ->where('ends_at', '>=', now());
    }

    // Relaciones
    public function userOffers() {
        return $this->hasMany(UserOffer::class);
    }
}