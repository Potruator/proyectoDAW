<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

use App\Models\User;
use App\Models\Offer;

class UserOffer extends Model {
    use HasFactory;

    protected $fillable = [
        'user_id',
        'offer_id',
        'uuid',
        'assigned_at',
        'redeemed_at',
        'redeemed_by',
        'redemption_notes'
    ];

    protected $casts = [
        'assigned_at' => 'datetime',
        'redeemed_at' => 'datetime'
    ];

    // Boot del modelo - Generar UUID automáticamente
    protected static function boot() {
        parent::boot();

        static::creating(function ($userOffer) {
            if (empty($userOffer->uuid)) {
                $userOffer->uuid = (string) Str::uuid();
            }

            if (empty($userOffer->assigned_at)) {
                $userOffer->assigned_at = now();
            }
        });
    }

    // Relaciones---------------//

    // Usuario que posee la oferta
    public function user() {
        return $this->belongsTo(User::class);
    }

    // Oferta asignada
    public function offer() {
        return $this->belongsTo(Offer::class);
    }

    // Staff que canjeó la oferta (si está canjeada)
    public function redeemedBy() {
        return $this->belongsTo(User::class, 'redeemed_by');
    }

    // Scopes---------------- //

    // Ofertas canjeadas
    public function scopeRedeemed($query) {
        return $query->whereNotNull('redeemed_at');
    }

    // Ofertas pendientes (no canjeadas)
    public function scopePending($query) {
        return $query->whereNull('redeemed_at');
    }

    // Ofertas válidas (pendientes y oferta activa)
    public function scopeValid($query) {
        return $query->whereNull('redeemed_at')
            ->whereHas('offer', function ($q) {
                $q->where('starts_at', '<=', now())
                ->where(function ($q2) {
                    $q2->whereNull('expires_at')
                    ->orWhere('expires_at', '>=', now());
                });
            });
    }

    // Ofertas expiradas (no canjeadas pero oferta expirada)
    public function scopeExpired($query) {
        return $query->whereNull('redeemed_at')
            ->whereHas('offer', function ($q) {
                $q->where('expires_at', '<', now());
            });
    }

    // Métodos helper ---------------- //

    // Verificar si la oferta está canjeada
    public function isRedeemed(): bool {
        return !is_null($this->redeemed_at);
    }

    // Verificar si la oferta está pendiente
    public function isPending():bool {
        return is_null($this->redeemed_at);
    }

    // Verificar si la oferta es válida (pendiente y oferta activa)
    public function isValid(): bool {
        if ($this->isRedeemed()) {
            return false;
        }

        return $this->offer->starts_at <= now() &&
            ($this->offer->expires_at === null || $this->offer->expires_at >= now());
    }

    // Verificar si la oferta ha expirado
    public function isExpired(): bool {
        if ($this->isRedeemed()) {
            return false;
        }

        return $this->offer->expires_at && $this->offer->expires_at < now();
    }

    // Marcar como canjeada
    public function markAsRedeemed(?int $staffId = null, ?string $notes = null): bool {
        $this->redeemed_at = now();

        if ($staffId) {
            $this->redeemedBy = $staffId;
        }
        if ($notes) {
            $this->redemption_notes = $notes;
        }

        return $this->save();
    }

    // Obtener URL del QR
    public function getQrUrlAttribute(): string {
        return route('client.offers.qr', $this->uuid);
    }

    // Obtener días restantes antes de expirar
    public function getDaysUntilExpirationAttribute(): ?int {
        if(!$this->offer->expires_at) {
            return null;
        }

        return now()->diffInDays($this->offer->expires_at, false);
    }
}