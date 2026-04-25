<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Offer;
use App\Models\UserOffer;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
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

        // Comenzamos transacción por seguridad
        DB::beginTransaction();

        try {
            // Creamos el usuario
            $user = User::create(array_merge(
                $validated, 
                // Para los usuarios que se registran mediante la web, les asignamos automáticamente el rol cliente
                ['role' => 'client']
            ));

            // Obtenemos las ofertas activas
            $offers = Offer::active()->get();

            // Preparamos los datos
            if ($offers->isNotEmpty()) {
                $assignments = $offers->map(function ($offer) use ($user) {
                    return [
                        'user_id' => $user->id,
                        'offer_id' => $offer->id,
                        'uuid' => Str::uuid()->toString(), // Se crea un UUID real válido
                        'assigned_at' => now(),
                        'created_at' => now(),
                        'updated_at' => now()
                    ];
                })->toArray();

                // Los insertamos
                UserOffer::insert($assignments);
            }

            // Confirmamos los cambios en la DB
            DB::commit();

            // Redirigir al login
            return redirect()->route('login')
                ->with('success', '¡Cuenta creada con éxito! Bienvenido a ' . config('app.name') . '!');
        }
        catch(\Exception $e) {
            // Cancelamos los cambios
            DB::rollBack();

            // Registramos en el log la excepción
            \Log::error('Error al crear nuevo usuario', [
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString()
            ]);

            return back()
                ->with('error', 'Ocurrió un error al crear un nuevo usuario. Contacte con soporte.');
        }
    }
}
