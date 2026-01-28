<?php

namespace App\Domain\Events\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model {
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'date',
        'location',
        'is_public',
    ];

    // Scope para eventos futuros
    public function scopeUpcoming($query) {
        return $query
            ->where('date', '>=', now())
            ->orderBy('date', 'asc');
    }

    public function scopePublic($query) {
        return $query->where('is_public', true);
    }
}