<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\PublicController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\RedemptionController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminOfferController;
use App\Http\Controllers\Admin\AdminEventController;
use App\Http\Controllers\Admin\AdminUserController;

Route::get('/', PublicController::class)->name('home');

Route::get('/eventos', [PublicController::class, 'events'])
    ->name('events.index');

Route::get('/ofertas', [PublicController::class, 'offers'])
    ->name('offers.public');


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
});