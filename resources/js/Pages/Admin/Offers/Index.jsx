import AppLayout from '@/Layouts/AppLayout';
import { Link, router, Head } from '@inertiajs/react';

export default function Index({ offers }) {
    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar esta oferta?')) {
            router.delete(`/app/admin/offers/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title='Índice de Ofertas'/>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold text-white'>Gestión de Ofertas</h1>
                <Link 
                    href='/app/admin/offers/create'
                    className='px-6 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors'
                >
                    + Nueva Oferta
                </Link>
            </div>

            {/* Tabla de Ofertas */}
            <div className='bg-gray-900 rounded-lg overflow-hidden border border-gray-800'>
                <table className='w-full'>
                    <thead className='bg-gray-800'>
                        <tr>
                            <th className='px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                Título
                            </th>
                            <th className='px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                Descuento
                            </th>
                            <th className='px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                Inicio
                            </th>
                            <th className='px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                Expiración
                            </th>
                            <th className='px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                Estado
                            </th>
                            <th className='px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-800'>
                        {offers.data.map((offer) => (
                            <tr key={offer.id} className='hover:bg-gray-800 active:bg-gray-800 transition-colors'>
                                <td className='px-6 py-4'>
                                    <div>
                                        <p className='text-white font-medium'>{offer.title}</p>
                                        <p className='text-gray-400 text-sm truncate max-w-md'>
                                            {offer.description}
                                        </p>
                                        <div className='flex gap-2 mt-1'>
                                            {offer.is_featured && (
                                                <span className='inline-block px-2 py-1 bg-amber-500/10 text-amber-400 text-xs rounded'>
                                                    Destacada
                                                </span>
                                            )}
                                            {offer.is_public && (
                                                <span className='inline-block px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded'>
                                                    Pública
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </td>
                                <td className='px-6 py-4 text-center'>
                                    <span className='text-2xl font-bold text-green-400'>
                                        {offer.discount_percentage}%
                                    </span>
                                </td>
                                <td className='px-6 py-4 text-gray-300 text-sm text-center'>
                                    {offer.starts_at}
                                </td>
                                <td className='px-6 py-4 text-gray-300 text-sm text-center'>
                                    {offer.expires_at || 'Sin expiración'}
                                </td>
                                <td className='px-6 py-4 text-center'>
                                    <span className={`
                                        ${offer.status === 'Activa' ? 'bg-green-500/10 text-green-400' : ''}
                                        ${offer.status === 'Próxima' ? 'bg-blue-500/10 text-blue-400' : ''}
                                        ${offer.status === 'Expirada' ? 'bg-red-500/10 text-red-400' : ''}
                                    `}>
                                        {offer.status}
                                    </span>
                                </td>
                                <td className='px-6 py-4'>
                                    <div className='flex w-full gap-2'>
                                        <Link  
                                            href={`/app/admin/offers/${offer.id}`}
                                            className='flex-1 text-center px-3 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-600 text-white text-sm rounded transition-colors'
                                        >
                                            Ver
                                        </Link>
                                        <Link  
                                            href={`/app/admin/offers/${offer.id}/edit`}
                                            className='flex-1 text-center px-3 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-gray-900 text-sm rounded transition-colors'
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(offer.id)}
                                            className='flex-1 text-center px-3 py-2 bg-red-500 hover:bg-red-600 active:bg-red-600 hover:cursor-pointer text-white text-sm rounded transition-colors'
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Paginación */}
                {/* links viene de haber usado el método paginate en AdminOfferController */}
                {offers.links.length > 3 && (
                    <div className='px-6 py-4 bg-gray-800 border-t border-gray-700 flex justify-between items-center'>
                        <div className='text-sm text-gray-400'>
                            Mostrando {offers.from} - {offers.to} de {offers.total} ofertas
                        </div>
                        <div className='flex gap-2'>
                            {offers.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`
                                        px-3 py-2 roudned text-sm
                                        ${link.active
                                            ? 'bg-amber-500 text-gray-900 font-semibold'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600 active:bg-gray-600'
                                        }
                                        ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}
                                    `}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    )
}