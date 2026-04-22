<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Representa un evento o actividad programada.
 * 
 * @property int $id Identificador autoincremental del evento.
 * @property string $title Título o nombre del evento.
 * @property string|null $description Descripción detallada del evento
 * @property \Illuminate\Support\Carbon $date Fecha programada para el evento ("Cast" automáticamente)
 * @property string $location Ubicación o lugar donde se realizará el evento.
 * @property bool $is_public Indica si el evento es visible para el público general.
 * @property \Illuminate\Support\Carbon|null $created_at Fecha de creación del registro.
 * @property \Illuminate\Support\Carbon|null $updated_at Fecha de la última actualización del registro.
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Event upcoming()
 * @method static \Illuminate\Database\Eloquent\Builder|Event public()
 */
class Event extends Model {
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'date',
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