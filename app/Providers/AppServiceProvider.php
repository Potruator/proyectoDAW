<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Notifications\Messages\MailMessage;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Personalización del correo de recuperación de contraseña

        // Documentación extraída de -> https://laravel.com/docs/13.x/passwords#reset-link-customization
        ResetPassword::toMailUsing(function (object $notifiable, string $token) {
            
            // Construcción de la URL de React para recuperar la contraseña
            $url = url(route('password.reset', [
                'token' => $token,
                'email' => $notifiable->getEmailForPasswordReset(),
            ], false));

            // Personalización del mensaje de correo
            return (new MailMessage)
                ->subject('Recupera tu contraseña - Proyecto DAW') // Asunto del correo
                ->greeting('¡Hola, ' . $notifiable->name . '!') // Saludo con el nombre del usuario
                ->line('¡Hemos recibido una petición para restablecer la contraseña de tu cuenta') // Línea de introducción
                ->action('Recuperar Contraseña', $url) // Botón central
                ->line('Este enlace de recuperación caducará en 5 minutos.') // Expiración del enlace
                ->line('Si no has solicitado un restablecimiento de contraseña, no tienes que hacer nada.') 
                ->salutation('¡Un saludo de nuestro equipo!'); // Cierre del correo
        });
    }
}
