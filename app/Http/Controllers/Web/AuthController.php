<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function authenticate(Request $request) {
        // Validación de datos
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        // Intento login
        if (Auth::attempt($credentials)) {
            // Regeneramos la sesión para evitar ataque por "session fixation"
            $request->session()->regenerate();

            // Redirigir según rol
            $user = Auth::user();

            if ($user->isAdmin()) {
                return redirect()
                    ->intended('/app/admin')
                    ->with('success', 'Bienvenido, ' . $user->name);
            }

            if ($user->isStaff()) {
                return redirect()
                    ->intended('/')
                    ->with('success', 'Bienvenido, ' . $user->name);
            }

            // Cliente por defecto
            return redirect()
                ->intended('/')
                ->with('success', 'Bienvenido, ' . $user->name);
        }

        // Login fallido
        return back()->with('error', 'Credenciales incorrectas');

        /*
        // Login fallido
        throw ValidationException::withMessages([
            'email' => 'Credenciales incorrectas'
        ]);*/
    }

    public function logout(Request $request) {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/')
            ->with('success', 'Sesión cerrada correctamente');
    }
}
