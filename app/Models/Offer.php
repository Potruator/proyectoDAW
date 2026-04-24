<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\UserOffer;

/**
 * Representa una oferta, promoción o descuento aplicable en el sistema.
 *
 * @property int $id Identificador autoincremental de la oferta.
 * @property string $title Título o nombre comercial de la oferta.
 * @property string $description Descripción detallada de las condiciones de la oferta.
 * @property int $discount_percentage Porcentaje numérico de descuento a aplicar.
 * @property \Illuminate\Support\Carbon $starts_at Fecha y hora en la que la oferta entra en vigor.
 * @property \Illuminate\Support\Carbon|null $expires_at Fecha y hora de caducidad (nulo si es una oferta indefinida).
 * @property bool $is_public Indica si la oferta es visible de forma general para los clientes.
 * @property bool $is_featured Indica si la promoción debe destacarse visualmente (ej. en la página principal).
 * @property \Illuminate\Support\Carbon|null $created_at Fecha de creación del registro.
 * @property \Illuminate\Support\Carbon|null $updated_at Fecha de la última modificación.
 *
 * @method static \Illuminate\Database\Eloquent\Builder|Offer active()
 * @method static \Illuminate\Database\Eloquent\Builder|Offer featured()
 */
class Offer extends Model {

    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'discount_percentage',
        'starts_at',
        'expires_at',
        'is_public',
        'is_featured'
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'expires_at' => 'datetime',
        'is_featured' => 'boolean',
        'is_public' => 'boolean'
    ];

    // Scope para ofertas activas
    public function scopeActive($query) {
        return $query
            ->where('starts_at', '<=', now())
            ->where(function ($q) {
                $q->whereNull('expires_at')->orWhere('expires_at', '>=', now());
            })
            ->where('is_public', true);
    }

    public function scopeFeatured($query) {
        return $query
            ->where('is_featured', true)
            ->where('starts_at', '<=', now())
            ->where(function ($q) {
                $q->whereNull('expires_at')->orWhere('expires_at', '>=', now());
            });
    }

    // Relaciones
    public function userOffers() {
        return $this->hasMany(UserOffer::class);
    }

    public function products() {
        return $this
            ->belongsToMany(Product::class)
            ->withTimestamps();
    }

    /**
     * Devuelve el estado actual de la oferta conforme a sus fechas
     * 
     * @return string Puede ser 'Activa, 'Próxima' o 'Expirada'
     */
    public function getStatus(): string
    {
        $now = now();

        if ($this->starts_at > $now){
            return 'Próxima';
        }

        if ($this->expires_at && $this->expires_at < $now) {
            return 'Expirada';
        }

        return 'Activa';
    }
}