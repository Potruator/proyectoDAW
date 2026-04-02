<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Web\PasswordResetController;
use App\Http\Controllers\Web\PublicController;
use App\Http\Controllers\Web\OfferController;
use App\Http\Controllers\Web\RedemptionController;
use App\Http\Controllers\Web\AuthController;

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminOfferController;
use App\Http\Controllers\Admin\AdminEventController;
use App\Http\Controllers\Admin\AdminUserController;


// Rutas públicas
Route::get('/', PublicController::class)->name('home');
Route::get('/eventos', [PublicController::class, 'events'])->name('events.index');
Route::get('/offers', [PublicController::class, 'offers'])->name('offers.public');

/**
 * AUTENTICACIÓN
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

// LOGOUT
Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware(['auth'])
    ->name('logout');


/**
 * RUTAS PROTEGIDAS
 */

Route::middleware(['auth'])->prefix('app')->group(function() {

    // Cliente
    Route::middleware(['role:client'])->group(function() {
        Route::get('/offers', [OfferController::class, 'index'])->name('client.offers.index');
    });

    // Staff
    Route::middleware(['role:staff'])->group(function () {
        Route::get('/redeem', [RedemptionController::class, 'scan'])->name('staff.scan');
    });

    // Admin
    Route::middleware(['role:admin'])->prefix('admin')->group(function () {
        Route::get('/', AdminDashboardController::class)->name('admin.dashboard');

        // CRUD de Ofertas
        Route::resource('offers', AdminOfferController::class);

        // CRUD de Usuarios
        Route::resource('users', AdminUserController::class);

        // CRUD de Eventos
        Route::resource('events', AdminEventController::class);
    });
});




/*
Route::middleware(['auth', 'verified'])->group(function () {
    
    Route::prefix('app')->group(function () {

        // Cliente
        Route::middleware('role:client')->group(function () {
            Route::get('/ofertas', [OfferController::class, 'index'])
            ->name('offers.index');

            Route::get('/ofertas/{userOffer:uuid}', [OfferController::class, 'show'])
            ->name('client.offers.show');

            Route::get('/qr/{userOffer:uuid}', [OfferController::class, 'qr'])
            ->name('client.offers.qr');
        });

        // Camarero
        Route::middleware('role:staff')->group(function () {
            Route::get('/canjear', [RedemptionController::class, 'scan'])
            ->name('staff.scan');

            Route::post('/canjear/{userOffer:uuid}', [RedemptionController::class, 'redeem'])
            ->name('staff.redeem');
        });

        // Admin
        Route::middleware('role:admin')->prefix('/admin')->group(function () {
            Route::get('/', AdminDashboardController::class)
            ->name('admin.dashboard');

            Route::resource('/ofertas', AdminOfferController::class);
            Route::resource('/eventos', AdminEventController::class);
            Route::resource('/usuarios', AdminUserController::class);
        });
    });
}); */