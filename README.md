# 🍺 Gestión Bar - Proyecto Final DAW 2025/26

Sistema integral para la gestión de bares y fidelización de clientes. Esta plataforma permite la administración de inventario, gestión de usuarios, sistema de ofertas mediante escaneo de códigos QR y una interfaz de usuario moderna y adaptativa.

---

## 🚀 Características Principales

- **Panel de Administración:** Control total de usuarios, productos y ofertas.
- **Sistema de Fidelización:** Escaneo de códigos QR para canje de promociones en tiempo real.
- **Perfil de Usuario:** Gestión de datos personales y seguridad.
- **Diseño Responsive:** Optimizado para dispositivos móviles y escritorio.
- **Seguridad:** Protección contra ataques XSS, CSRF y gestión de roles mediante Middleware.

## 🛠️ Tecnologías Utilizadas

- **Backend:** [Laravel 12](https://laravel.com/)
- **Frontend:** [React](https://reactjs.org/) con [Inertia.js](https://inertiajs.com/)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/)
- **Base de Datos:** MySQL / MariaDB
- **Gestión de Estado:** Hooks de React y formularios de Inertia.

---

## 📦 Instalación y Configuración

Sigue estos pasos para desplegar el proyecto en tu entorno local:

### 1. Requisitos previos
- PHP >= 8.2
- Composer
- Node.js & NPM
- Servidor de base de datos (XAMPP, Laragon o Docker)

### 2. Clonar y preparar el entorno
```bash
# Instalar dependencias de PHP
composer install

# Instalar dependencias de JS
npm install

# Copiar el archivo de entorno
cp .env.example .env