<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureUserHasRole {
    public function handle(Request $request, Closure $next, ...$roles) {
        if (!auth()->check()) {
            abortu(401);
        }

        if (!in_array(auth()->user()->role, $roles)) {
            abort(403);
        }

        return $next($request);
    }
}