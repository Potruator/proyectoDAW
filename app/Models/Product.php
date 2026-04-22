<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * Representa un artículo o producto disponible en el catálogo.
 *
 * @property int $id Identificador autoincremental del producto.
 * @property string $name Nombre comercial del producto.
 * @property string|null $description Descripción detallada de las características del producto.
 * @property string $price Precio base del producto (casteado automáticamente a string con 2 decimales para evitar errores de precisión).
 * @property string|null $image_url Ruta o URL de la fotografía principal del producto.
 * @property bool $is_active Indica si el producto está disponible para su venta (true) o si está retirado/agotado (false).
 * @property \Illuminate\Support\Carbon|null $created_at Fecha de creación del registro.
 * @property \Illuminate\Support\Carbon|null $updated_at Fecha de la última modificación.
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Offer[] $offers Colección de ofertas asociadas a este producto.
 */
class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'image_url',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'price' => 'decimal:2', // String que evita problemas de coma flotante en PHP
    ];

    /**
     * Relación N:M con Offer
     * Obtiene todas las ofertas o promociones en las que este producto está incluido
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function offers() {
        return $this->belongsToMany(Offer::class)->withTimestamps();
    }
}
