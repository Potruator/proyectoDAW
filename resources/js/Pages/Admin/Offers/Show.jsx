import AppLayout from '@/Layouts/AppLayout';
import { Link, Head } from '@inertiajs/react';

export default function Show({ offer }) {
    return (
        <AppLayout>
            <Head title='Detalle de Oferta'/>
            <div className='max-w-4xl'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-3xl font-bold text-white'>Detalle de Oferta</h1>
                    <Link
                        href={`/app/admin/offers/${offer.id}/edit`}
                        className='px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors'
                    >
                        Editar Oferta
                    </Link>
                </div>

                <div className='bg-gray-900 rounded-lg p-8 border border-gray-800 space-y-6'>
                    {/* Título */}
                    <div>
                        <h3 className='text-sm font-semibold text-gray-400 mb-2'>Título</h3>
                        <p className='text-2xl font-bold text-white'>{offer.title}</p>
                    </div>

                    {/* Descripción */}
                    <div>
                        <h3 className='text-sm font-semibold text-gray-400 mb-2'>Descripción</h3>
                        <p className='text-gray-300'>{offer.description}</p>
                    </div>

                    {/* Descuento */}
                    <div>
                        <h3 className='text-sm font-semibold text-gray-400 mb-2'>Descuento</h3>
                        <p className='text-4xl font-bold text-green-400'>{offer.discount_percentage}%</p>
                    </div>

                    {/* Fechas */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <h3 className='text-sm font-semibold text-gray-400 mb-2'>Fecha de Inicio</h3>
                            <p className='text-white'>{offer.starts_at}</p>
                        </div>
                        <div>
                            <h3 className='text-sm font-semibold text-gray-400 mb-2'>Fecha de Expiración</h3>
                            <p className='text-white'>{offer.expires_at || 'Sin expiración'}</p>
                        </div>
                    </div>

                    {/* Badges */}
                    <div className='flex gap-3'>
                        {offer.is_featured &&(
                            <span className='px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg'>
                                ⭐ Destacada
                            </span>
                        )}
                        {offer.is_public && (
                            <span className='px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg'>
                                🌐 Pública
                            </span>
                        )}
                    </div>

                    {/* Info adicional */}
                    <div className='pt-6 border-t border-gray-800 text-sm text-gray-400'>
                        Creada {offer.created_at}
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}