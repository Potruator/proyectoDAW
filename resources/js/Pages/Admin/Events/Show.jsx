import AppLayout from '@/Layouts/AppLayout';
import { Link, Head } from '@inertiajs/react';

export default function Show({ event }) {
    return (
        <AppLayout>
            <Head title='Detalle de Evento'/>
            <div className='max-w-4xl mx-auto'>
                <div className='flex flex-col sm:flex-row justify-between items-start mb-6 gap-4'>
                    <h1 className='text-3xl font-bold text-white'>Detalle de Evento</h1>

                    <div className='flex flex-wrap items-center gap-4 w-full sm:w-auto'>
                        <Link
                            href={`/app/admin/events/${event.id}/edit`}
                            className='flex-1 sm:flex-none text-center px-6 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors shadow-lg shadow-amber-500/20'
                        >
                            Editar Evento
                        </Link>
                        <Link
                            href={`/app/admin/events`}
                            className='flex-1 sm:flex-none text-center px-6 py-3 bg-gray-800 hover:bg-gray-700 active:bg-gray-700 text-gray-300 font-semibold rounded-lg transition-colors'                        
                        >
                            Volver atrás
                        </Link>
                    </div>
                </div>

                <div className='bg-gray-900 rounded-lg p-8 border border-gray-800 space-y-6'>
                    {/* Título */}
                    <div>
                        <h3 className='text-sm font-semibold text-gray-400 mb-2'>Título</h3>
                        <p className='text-2xl font-bold text-white'>{event.title}</p>
                    </div>

                    {/* Descripción */}
                    <div>
                        <h3 className='text-sm font-semibold text-gray-400 mb-2'>Descripción</h3>
                        <p className='text-gray-300'>{event.description}</p>
                    </div>

                    {/* Fecha */}
                    <div>
                        <h3 className='text-sm font-semibold text-gray-400 mb-2'>Fecha</h3>
                        <p className='text-white'>{event.date}</p>
                    </div>

                    {/* Ubicación */}
                    <div>
                        <h3 className='text-sm font-semibold text-gray-400 mb-2'>Ubicación</h3>
                        <p className='text-white'>{event.location}</p>
                    </div>

                    {/* Info adicional */}
                    <div className='pt-6 border-t border-gray-800 text-sm text-gray-400'>
                        {event.is_public ? (
                            <span className='px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg'>
                                🌐 Pública
                            </span>
                        ) : (
                            <span className='px-4 py-2 bg-red-500/10 text-red-400 rounded-lg'>
                                🌐 No publicada
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}