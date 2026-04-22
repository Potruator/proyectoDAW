<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class ProfileController extends Controller
{
    /**
     * Muestra el formulario del perfil
     */
    public function edit(Request $request) 
    {
        return Inertia::render('Shared/EditProfile', [
            'user' => $request->user()
        ]);
    }

    /** 
     * Actualiza la información básica del perfil (por ahora solo el nombre)
     */
    public function update(Request $request)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            // Validación para la contraseña antigua: solo requerida si se envía una nueva contraseña, y debe coincidir con la actual
            'oldPassword' => 'required_with:password|current_password', 
            'password' => 'nullable|string|min:8|confirmed'
        ]);

        // Limpiamos campos vacíos para no sobrescribir nada con nulos
        $dataToUpdate = array_filter($validated, function ($value) {
            return $value !== null && $value !== '';
        });

        // Eliminamos 'oldPassword' de los datos a actualizar porque la columna no existe y no queremos guardarla
        unset($dataToUpdate['oldPassword']);

        $request->user()->fill($dataToUpdate);

        try {
            $request->user()->save();

            return back()->with('success', 'Perfil actualizado correctamente.');
        }
        catch(\Exception $e) {
            \Log::error('Error al actualizar usuario ID: ' . $request->user()->id, [
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString()
            ]);

            return back()
                ->with('error', 'Ocurrió un error al actualizar sus datos. Contacte con soporte.');
        }
    }
}
