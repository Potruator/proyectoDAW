import AppLayout from '@/Layouts/AppLayout';
import { Link, Head } from '@inertiajs/react';

export default function Show({ event }) {
    return (
        <AppLayout>
            <Head title='Detalle de Evento'/>
            <div className='max-w-4xl'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-3xl font-bold text-white'>Detalle de Evento</h1>
                    <Link
                        href={`/app/admin/events/${event.id}/edit`}
                        className='px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors'
                    >
                        Editar Evento
                    </Link>
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