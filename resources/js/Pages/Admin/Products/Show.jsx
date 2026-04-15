import AppLayout from '@/Layouts/AppLayout';
import { Link, Head } from '@inertiajs/react';

export default function Show({ product }) {
    return (
        <AppLayout>
            <Head title={`Detalle de Producto: ${product.name}`} />
            <div className='max-w-4xl'>

                {/* Cabecera */}
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-3xl font-bold text-white'>Detalle de Producto</h1>
                    <Link
                        href={`/app/admin/products/${product.id}/edit`}
                        className='px-6 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors'
                    >
                        Editar Producto
                    </Link>
                </div>

                <div className='bg-gray-900 rounded-lg p-8 border border-gray-800 space-y-6'>
                    {/* Nombre */}
                    <div>
                        <h3 className='text-sm font-semibold text-gray-400 mb-2'>Nombre</h3>
                        <p className='text-2xl font-bold text-white'>{product.name}</p>
                    </div>

                    {/* Descripción */}
                    <div>
                        <h3 className='text-sm font-semibold text-gray-400 mb-2'>Descripción</h3>
                        <p className='tex-gray-300'>
                            {product.description || <span className='italic text-gray-500'>Sin descripción</span>}
                        </p>
                    </div>

                    {/* Precio */}
                    <div>
                        <h3 className='text-sm font-semibold text-gray-400 mb-2'>Precio</h3>
                        <p className='text-4xl font-bold text-green-400'>{product.price}</p>
                    </div>

                    {/* Imagen */}
                    {product.image_url && (
                        <div>
                            <h3 className='text-sm font-semibold text-gray-400 mb-2'>Imagen</h3>
                            <img
                                src={product.image_url}
                                alt={product.name}
                                className='w-48 h-48 object-cover rounded-lg border border-gray-700'
                            />
                        </div>
                    )}

                    {/* Badges / Estado */}
                    <div className='flex gap-3'>
                        {product.is_active ? (
                            <span className='px-4 py-2 bg-green-500/10 text-green-400 rounded-lg'>
                                ✅ Disponible
                            </span>
                        ) : (
                            <span className='px-4 py-2 bg-red-500/10 text-red-400 rounded-lg'>
                                ❌ Agotado / Oculto
                            </span>
                        )}
                    </div>

                    {/* Ofertas Vinculadas */}
                    <div className='pt-6 border-t border-gray-800'>
                        <h3 className='text-sm font-semibold text-gray-400 mb-3'>Ofertas en las que participa</h3>
                        {product.offers && product.offers.length > 0 ? (
                            <div className='flex flex-wrap gap-2'>
                                {product.offers.map(offer => (
                                    <Link
                                        key={offer.id}
                                        href={`/app/admin/offers/${offer.id}`}
                                        className='px-3 py-1.5 bg-gray-800 border border-gray-700 text-gray-200 hover:text-amber-400 hover:border-gray-500 active:text-amber-400 active:border-gray-500 rounded-md text-sm flex items-center gap-2 transition-colors'
                                    >
                                        <span className='text-amber-500'>🏷️</span> {offer.title} (-{offer.discount_percentage}%)
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <p className='text-gray-500 text-sm italic'>
                                Este producto no participa en ninguna oferta promocional en este momento.
                            </p>
                        )}
                    </div>

                    {/* Info adicional */}
                    <div className='pt-6 border-t border-gray-800 text-sm text-gray-400'>
                        Añadido el {product.created_at}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}