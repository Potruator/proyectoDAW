<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\OfferController as ApiOfferController;
use App\Http\Controllers\Api\RedemptionController as ApiRedemptionController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/me', [AuthController::class, 'me']);

    // Cliente
    Route::middleware('role:client')->group(function () {
        Route::get('/offers', [ApiOfferController::class, 'index']);
        Route::get('/offers/{userOffer:uuid}', [ApiOfferController::class, 'show']);
    });

    // Staff
    Route::middleware('role:staff')->group(function () {
        Route::post('/redeem/{userOffer:uuid}', [ApiRedemptionController::class, 'redeem']);
    });
    
});