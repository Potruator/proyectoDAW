<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Web\PasswordResetController;
use App\Http\Controllers\Web\PublicController;
use App\Http\Controllers\Web\RedemptionController;
use App\Http\Controllers\Web\AuthController;
use App\Http\Controllers\Web\ProfileController;

// ADMIN
use App\Http\Controllers\Web\Admin\AdminDashboardController;
use App\Http\Controllers\Web\Admin\AdminOfferController;
use App\Http\Controllers\Web\Admin\AdminEventController;
use App\Http\Controllers\Web\Admin\AdminUserController;
use App\Http\Controllers\Web\Admin\AdminProductController;
// STAFF
use App\Http\Controllers\Web\Staff\StaffDashboardController;
// CLIENT
use App\Http\Controllers\Web\Client\ClientDashboardController;


// RUTAS PÚBLICAS -------------------------------------------------------
Route::get('/', PublicController::class)->name('home');
Route::get('/events', [PublicController::class, 'events'])->name('events.public');
Route::get('/offers', [PublicController::class, 'offers'])->name('offers.public');
Route::get('/help', [PublicController::class, 'help'])->name('help');

/**
 * AUTENTICACIÓN --------------------------------------------------------
 */
Route::middleware(['guest'])->group(function () {
    // Formulario login
    Route::get('/login', [PublicController::class, 'login'])->name('login');

    // Procesado login
    Route::post('/login', [AuthController::class, 'authenticate'])->name('login.authenticate');

    // -- RECUPERACIÓN DE CONTRASEÑA --
    
    // 1. Vista para solicitar email de recuperación
    Route::get('/forgot-password', [PasswordResetController::class, 'create'])->name('password.request');

    // 2. Recibir el email y enviar el correo con el link de recuperación
    Route::post('/forgot-password', [PasswordResetController::class, 'store'])->name('password.email');

    // 3. Vista para escribir la nueva contraseña (el usuario aquí haciendo clic en el correo)
    Route::get('/reset-password/{token}', [PasswordResetController::class, 'edit'])->name('password.reset');

    // 4. Actualizar base de datos con la nueva contraseña
    Route::post('/reset-password', [PasswordResetController::class, 'update'])->name('password.update');
});

// LOGOUT ---------------------------------------------------------------
Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware(['auth'])
    ->name('logout');


/**
 * RUTAS PROTEGIDAS -----------------------------------------------------
 */

Route::middleware(['auth'])->prefix('app')->group(function() {

    // Rutas de perfil compartidas (para cambiar información de usuario)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile', [ProfileController::class, 'update'])->name('profile.update');

    // Cliente
    Route::middleware(['role:client'])->prefix('client')->group(function() {
        // Dashboard
        Route::get('/', [ClientDashboardController::class, 'index'])->name('client.dashboard');
        // Mostrar QR - con {userOffer:uuid} hacemos que Laravel busque en la tabla user_offers el registro que coincide con el UUID
        Route::get('/offers/{userOffer:uuid}', [ClientDashboardController::class, 'show'])->name('client.show');
    });

    // Staff
    Route::middleware(['role:staff'])->prefix('staff')->group(function () {
        // Dashboard
        Route::get('/', StaffDashboardController::class)->name('staff.dashboard');
        // Escanear
        Route::get('/scan', [RedemptionController::class, 'scan'])->name('staff.scan');
        // Envío del código QR
        Route::post('/scan/{uuid}', [RedemptionController::class, 'redeem'])->name('staff.redeem');
        // Introducción manual del código
        Route::get('/scan/manual', [RedemptionController::class, 'manual'])->name('staff.scan.manual');
    });

    // Admin
    Route::middleware(['role:admin'])->prefix('admin')->group(function () {
        // Dashboard
        Route::get('/', AdminDashboardController::class)->name('admin.dashboard');

        // CRUDs
        Route::resource('offers', AdminOfferController::class);
        Route::resource('users', AdminUserController::class);
        Route::resource('events', AdminEventController::class);
        Route::resource('products', AdminProductController::class);

        // Escanear
        Route::get('/scan', [RedemptionController::class, 'scan'])->name('admin.scan');
        // Envío del código QR
        Route::post('/scan/{uuid}', [RedemptionController::class, 'redeem'])->name('admin.redeem');
        // Introducción manual del código
        Route::get('/scan/manual', [RedemptionController::class, 'manual'])->name('admin.scan.manual');
    });
});