import { Head, Link } from '@inertiajs/react';

export default function Error({ status }) {
    // Diccionario de títulos según el código de error
    const title = {
        401: 'Sesión Expirada',
        403: 'Acceso Denegado',
        404: 'Página no encontrada',
        500: 'Error del Servidor',
        503: 'Servicio no disponible',
    }[status] || 'Ocurrió un error';

    // Diccionario de descripciones según el código de error
    const description = {
        401: 'Por favor, inicia sesión de nuevo para continuar',
        403: 'No tienes los permisos necesarios para ver esta página. Este área está restringida',
        404: 'Ups, parece que te has perdido. La página que buscas no existe',
        500: 'Vaya, algo se ha roto en nuestros servidores. Inténtalo de nuevo más tarde',
        503: 'Estamos realizando tareas de mantenimiento. Vuelve más tarde'
    }[status] || 'Ha ocurrido un error inesperado';

    return (
        <div className='bg-gray-950 flex flex-col items-center justify-center p-4'>
            <Head title={title} />

            <div className='text-center max-w-xl flex flex-col items-center justify-center p-4'>
                {/* El número de error gigante y semitransparente detrás */}
                <h1 className='text-9xl font-black text-gray-800/50 mb-4 select-none'>
                    {status}
                </h1>

                <div className='-mt-16 relative z-10'>
                    <h2 className='text-3xl font-bold text-amber-400 mb-4 uppercase tracking-wider'>
                        {title}
                    </h2>

                    <p className='text-gray-400 text-lg mb-8'>
                        {description}
                    </p>

                    <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
                        {/* Botón 1: Volver a la página anterior usando el historial del navegador */}
                        <button
                            onClick={() => window.history.back()}
                            className='w-full sm:w-auto px-6 py-3 bg-gray-800 hover:bg-gray-800 active:bg-gray-800 text-white rounded-lg font-medium transition-colors border border-gray-700 flex items-center justify-center cursor-pointer'
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver atrás
                        </button>

                        {/* Botón 2: Ir directo al inicio (Por si abrieron la URL directamente) */}
                        <Link
                            href='/'
                            className='w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-gray-900 rounded-lg font-bold transition-colors cursor-pointer'
                        >
                            Ir a la página principal
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}