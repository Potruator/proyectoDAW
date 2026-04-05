<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use App\Http\Middleware\HandleInertiaRequests;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->web(append: [
            HandleInertiaRequests::class
        ]);
        $middleware->alias([
            'role' => \App\Http\Middleware\EnsureUserHasRole::class,
        ]);
        $middleware->trustProxies(at: ['127.0.0.1', 'localhost']); // Confía en Nginx para manejar las cabeceras HTTPS

        $middleware->redirectGuestsTo(function (Request $request) {
            session()->flash('error', 'Debes iniciar sesión para acceder');
            return route('login');
        });
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        
        $exceptions->respond(function (Response $response, \Throwable $exception, Request $request) {
            $statusCode = $response->getStatusCode();

            if (in_array($statusCode, [401, 403, 404, 500, 503])) {
                return Inertia::render('Error', [
                    'status' => $statusCode
                ])->toResponse($request)->setStatusCode($statusCode);
            }

            return $response;
        });

    })->create();
