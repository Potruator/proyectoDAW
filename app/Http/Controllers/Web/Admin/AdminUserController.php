<?php

namespace App\Http\Controllers\Web\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Offer;
use App\Models\UserOffer;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminUserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = User::query()
            // Filtro por término de búsqueda (nombre o email)
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                });
            })
            ->when($request->role, function ($query, $role) {
                $query->where('role', $role);
            })
            ->latest()
            ->paginate(10)
            ->withQueryString() // Mantiene los parámetros de búsqueda en la paginación
            ->through(fn ($user) => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $user->created_at->format('d/m/Y'),
                'role' => $user->role->label()
            ]);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            // Pasamos los filtros actuales de vuelta a React para mantener el estado de los inputs
            'filters' => $request->only(['search', 'role'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Users/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'role' => 'required|in:client,staff,admin'
        ]);

        try {
            // Creamos el nuevo usuario
            $newUser = User::create($validated);
            // Colleccionamos todas las ofertas activas
            $activeOffers = Offer::active()->get();
            // Se las asignamos
            if ($activeOffers->isNotEmpty()) {
                foreach ($activeOffers as $offer) {
                    UserOffer::create([
                        'user_id' => $newUser->id,
                        'offer_id' => $offer->id
                    ]);
                }
            }

            return redirect()
                ->route('users.index')
                ->with('success', 'Usuario creado exitosamente');
        }
        catch(\Exception $e) {
            // Registramos el error para depuración
            \Log::error('Error al crear oferta', [
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString()
            ]);

            return back()
                ->with('error', 'Ocurrió un error al crear el usuario. Contacte con soporte.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('Admin/Users/Show', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'created_at' => $user->created_at->format('d/m/Y'),
                'role' => $user->role->label()
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('Admin/Users/Edit', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role
            ]
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'password' => 'nullable|string|min:8|nullable',
            'role' => 'nullable|in:client,staff,admin'
        ]);

        // Limpiamos campos vacíos para no sobrescribir nada con nulos
        $dataToUpdate = array_filter($validated, function ($value) {
            return $value !== null && $value !== '';
        });

        // Hasheamos la contraseña si se ha proporcionado una nueva
        if (isset($dataToUpdate['password'])) {
            $dataToUpdate['password'] = bcrypt($dataToUpdate['password']);
        }

        try {
            $user->update($dataToUpdate);
            
            return redirect()
                ->route('users.index')
                ->with('success', 'Usuario actualizado exitosamente');
        }
        catch(\Exception $e) {
            \Log::error('Error al actualizar usuario ID: ' . $user->id, [
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString()
            ]);

            return back()
                ->with('error', 'Ocurrió un error al actualizar el usuario. Contacte con soporte.');
        }
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        try {
            $user->delete();
            return redirect()
                ->route('users.index')
                ->with('success', 'Usuario eliminado exitosamente');
        }
        catch(\Exception $e) {
            \Log::error('Error al eliminar usuario ID: ' . $user->id, [
                'error' => $e->getMessage(),
                'stack' => $e->getTraceAsString()
            ]);

            return back()
                ->with('error', 'Ocurrió un error al eliminar el usuario. Contacte con soporte.');
        }
    }
}
