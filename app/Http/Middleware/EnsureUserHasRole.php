<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Enums\UserRole;

class EnsureUserHasRole {
    /**
     * Handle an incoming request
     */
    public function handle(Request $request, Closure $next, string ...$roles): mixed {
        if (!auth()->check()) {
            abort(401, 'Unauthenticated');
        }

        // Convertimos strings a Enums
        $allowedRoles = collect($roles)->map(fn($role) => UserRole::from($role));

        if (!$allowedRoles->contains(auth()->user()->role)) {
            abort(403, 'Forbidden - Insufficient permissions');
        }

        return $next($request);
    }
}