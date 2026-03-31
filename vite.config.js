import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
        react({
            include: /\.(j|t)sx?$/,
        }),
        tailwindcss(),
    ],
    resolve: {
        alias: {
            // Alias por defecto de Laravel para React
            '@': resolve(__dirname, 'resources/js'),
            // Alias específico para CSS
            '@css': resolve(__dirname, 'resources/css')
        }
    },
    server: {
        host: '0.0.0.0',
        cors: true,
        hmr: {
            host: '192.168.1.77'
        },
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
