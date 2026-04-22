import AppLayout from '@/Layouts/AppLayout';
import { Link, Head } from '@inertiajs/react';

export default function Show({ offer }) {
    return (
        <AppLayout>
            <Head title={`Detalle de Oferta: ${offer.title}`}/>
            <div className='max-w-4xl mx-auto'>
                <div className='flex flex-col sm:flex-row justify-between items-start mb-6 gap-4'>
                    <h1 className='text-3xl font-bold text-white'>Detalle de Oferta</h1>

                    <div className='flex flex-wrap items-center gap-4 w-full sm:w-auto'>
                        <Link
                            href={`/app/admin/offers/${offer.id}/edit`}
                            className='flex-1 sm:flex-none text-center px-6 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors shadow-lg shadow-amber-500/20'
                        >
                            Editar Oferta
                        </Link>
                        <Link
                            href={`/app/admin/offers`}
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

                    {/* Productos Incluidos */}
                    <div className='pt-6 border-t border-gray-800'>
                        <h3 className='text-sm font-semibold text-gray-400 mb-3'>Productos a los que aplica</h3>
                        {offer.products && offer.products.length > 0
                            ? (
                                <div className='flex flex-wrap gap-2'>
                                    {offer.products.map(product => (
                                        <span key={product.id} className='px-3 py-1.5 bg-gray-800 border border-gray-700 text-gray-200 rounded-md text-sm flex items-center gap-2'>
                                            <span className='text-amber-500'>☕</span> {product.name}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <p className='text-gray-500 text-sm italic'>
                                    Esta oferta aplica a todo el menú general.
                                </p>
                            )
                        }
                    </div>

                    {/* Estadísticas */}
                    <div className='pt-6 border-t border-gray-800 grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className='bg-gray-800/50 p-4 rounded-lg border border-gray-700/50'>
                            <h3 className='text-sm font-semibold text-gray-400 mb-1'>Guardada por usuarios</h3>
                            <p className='text-3xl font-bold text-blue-400'>{offer.total_assignments}</p>
                        </div>
                        <div className='bg-gray-800/50 p-4 rounded-lg border border-gray-700/50'>
                            <h3 className='text-sm font-semibold text-gray-400 mb-1'>Veces canjeada en el local</h3>
                            <p className='text-3xl font-bold text-green-400'>{offer.total_redemptions}</p>                        
                        </div>
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