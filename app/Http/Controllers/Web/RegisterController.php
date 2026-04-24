<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

/**
 * Controlador encargado de gestionar el registro público de nuevos usuarios
 */
class RegisterController extends Controller
{
    /**
     * Muestra el formulario de registro
     */
    public function create() 
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Procesa el registro de un nuevo cliente
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|confirmed|min:8'
        ]);

        try {
            $user = User::create(array_merge(
                $validated, 
                // Para los usuarios que se registran mediante la web, les asignamos automáticamente el rol cliente
                ['role' => 'client']
            ));

            // Redirigir al login
            return redirect()->route('login')
                ->with('success', '¡Cuenta creada con éxito! Bienvenido a ' . config('app.name') . '!');
        }
        catch(\Exception $e) {
            \Log::error('Error al crear nuevo usuario', [
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString()
            ]);

            return back()
                ->with('error', 'Ocurrió un error al crear un nuevo usuario. Contacte con soporte.');
        }
    }
}
