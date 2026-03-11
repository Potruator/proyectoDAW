<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Golden Café') }}</title>

        <!-- Favicon -->
        <link rel='icon' type='image/svg+xml' href='/favicon.svg'>

{{--    <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png'>
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png'>
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon-png'> --}}

        <!-- Scripts -->
        @viteReactRefresh
        @vite(['resources/js/app.jsx', 'resources/css/app.css'])
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>