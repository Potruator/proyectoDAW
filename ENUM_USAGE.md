# UserRole Enum - Guía de Uso

## 📍 Ubicación
`app/Enums/UserRole.php`

## 🎯 Casos de Uso

### 1. **Crear un usuario con rol específico**

```php
use App\Enums\UserRole;
use App\Models\User;

// Crear usuario admin
$admin = User::create([
    'name' => 'Juan Pérez',
    'email' => 'juan@example.com',
    'password' => Hash::make('password'),
    'role' => UserRole::ADMIN,
]);

// Crear cliente
$cliente = User::create([
    'name' => 'María López',
    'email' => 'maria@example.com',
    'password' => Hash::make('password'),
    'role' => UserRole::CLIENT,
]);
```

### 2. **Verificar el rol de un usuario**

```php
// Opción 1: Comparación directa
if ($user->role === UserRole::ADMIN) {
    // El usuario es admin
}

// Opción 2: Métodos helper del modelo
if ($user->isAdmin()) {
    // El usuario es admin
}

if ($user->isStaff()) {
    // El usuario es staff
}

if ($user->isClient()) {
    // El usuario es cliente
}

// Opción 3: Verificar múltiples roles
if ($user->hasRole(UserRole::ADMIN, UserRole::STAFF)) {
    // El usuario es admin O staff
}
```

### 3. **En Rutas con Middleware**

```php
// routes/web.php o routes/api.php

// Una sola rol
Route::middleware('role:admin')->group(function () {
    // Solo admins
});

// Múltiples roles
Route::middleware('role:admin,staff')->group(function () {
    // Admins y Staff
});
```

### 4. **En Controladores**

```php
use App\Enums\UserRole;

class OfferController extends Controller
{
    public function store(Request $request)
    {
        // Verificar rol antes de proceder
        if (auth()->user()->role !== UserRole::ADMIN) {
            abort(403);
        }
        
        // Lógica...
    }
}
```

### 5. **En Validaciones**

```php
use App\Enums\UserRole;
use Illuminate\Validation\Rule;

$request->validate([
    'role' => ['required', Rule::enum(UserRole::class)],
]);

// O usando los valores directos
$request->validate([
    'role' => ['required', 'in:' . implode(',', UserRole::values())],
]);
```

### 6. **En Formularios (Blade/React)**

```php
// Obtener opciones para un select
$roles = UserRole::options();
// Retorna: ['admin' => 'Administrador', 'staff' => 'Personal', 'client' => 'Cliente']

// En un componente Blade
<select name="role">
    @foreach(UserRole::cases() as $role)
        <option value="{{ $role->value }}">{{ $role->label() }}</option>
    @endforeach
</select>
```

```jsx
// En React/Inertia
import { useForm } from '@inertiajs/react';

const roles = {
    admin: 'Administrador',
    staff: 'Personal',
    client: 'Cliente'
};

<select name="role" value={data.role} onChange={handleChange}>
    {Object.entries(roles).map(([value, label]) => (
        <option key={value} value={value}>{label}</option>
    ))}
</select>
```

### 7. **En Queries**

```php
use App\Enums\UserRole;

// Obtener todos los admins
$admins = User::where('role', UserRole::ADMIN)->get();

// Obtener staff y admins
$team = User::whereIn('role', [UserRole::ADMIN, UserRole::STAFF])->get();
```

### 8. **En Factories**

```php
// Ya configurado en UserFactory.php
$admin = User::factory()->admin()->create();
$staff = User::factory()->staff()->create();
$client = User::factory()->client()->create();

// Crear 10 clientes
User::factory(10)->client()->create();
```

### 9. **En API Resources**

```php
use App\Http\Resources\UserResource;

class UserResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'role' => $this->role->value,  // 'admin', 'staff', 'client'
            'role_label' => $this->role->label(), // 'Administrador', etc.
            'is_admin' => $this->isAdmin(),
        ];
    }
}
```

### 10. **Métodos Disponibles en el Enum**

```php
use App\Enums\UserRole;

// Obtener etiqueta legible
UserRole::ADMIN->label(); // 'Administrador'

// Obtener todos los valores
UserRole::values(); // ['admin', 'staff', 'client']

// Obtener opciones para select
UserRole::options(); 
// ['admin' => 'Administrador', 'staff' => 'Personal', 'client' => 'Cliente']

// Métodos de verificación
UserRole::ADMIN->isAdmin(); // true
UserRole::STAFF->isStaff(); // true
UserRole::CLIENT->isClient(); // true

// Obtener todos los casos
UserRole::cases(); // [UserRole::ADMIN, UserRole::STAFF, UserRole::CLIENT]

// Crear desde string
UserRole::from('admin'); // UserRole::ADMIN
UserRole::tryFrom('invalid'); // null (no lanza excepción)
```

## ⚠️ Ventajas de usar Enum

✅ **Type-safety**: El IDE te ayudará con autocompletado
✅ **Menos errores**: No puedes poner 'aadmin' por error
✅ **Código más limpio**: `UserRole::ADMIN` es más claro que `'admin'`
✅ **Fácil refactorización**: Cambiar valores en un solo lugar
✅ **Métodos helper**: Lógica centralizada

## 🔄 Migrar código antiguo

```php
// ❌ Antes (strings)
if ($user->role === 'admin') { }

// ✅ Ahora (Enum)
if ($user->role === UserRole::ADMIN) { }
// o mejor aún:
if ($user->isAdmin()) { }
```