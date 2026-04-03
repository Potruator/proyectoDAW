<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Event extends Model {
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'date',
        // 'image_path', // ¿?¿?
        'location',
        'is_public',
    ];

    protected $casts = [
        'date' => 'date',
        'is_public' => 'boolean'
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