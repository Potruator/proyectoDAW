import { useForm, Link } from '@inertiajs/react';

export default function OfferForm({ offer, products = [], offerProductIds = [], submitUrl, submitText = 'Guardar', isEditing = false }) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: offer?.title || '',
        description: offer?.description || '',
        discount_percentage: offer?.discount_percentage || '',
        starts_at: offer?.starts_at || '',
        expires_at: offer?.expires_at || '',
        is_featured: offer?.is_featured ?? false,
        is_public: offer?.is_public ?? true,
        product_ids: offerProductIds
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (isEditing) {
            put(submitUrl, {
                preserveScroll: true
            });
        }
        else {
            post(submitUrl);
        }
    };

    const handleProductToggle = (productId) => {
        let currentIds = [...data.product_ids];

        if (currentIds.includes(productId)) {
            currentIds = currentIds.filter(id => id !== productId); // Quitamos el producto seleccionado
        }
        else {
            currentIds.push(productId); // Añadimos el producto
        }

        setData('product_ids', currentIds);
    }

    return (
        <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Título */}
            <div>
                <label className='block text-sm font-semibold text-gray-300 mb-2'>
                    Título de la Oferta {!isEditing ? <span className='text-red-500'>*</span> : ''}
                </label>
                <input
                    type='text'
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                        focus:outline-none focus:border-amber-500 transition-colors`}
                    placeholder='Ej: 2x1 en Todas las Bebidas'
                    required={!isEditing}
                />
                {errors.title && (
                    <p className='text-red-500 text-sm mt-1'>{errors.title}</p>
                )}
            </div>

            {/* Descripción */}
            <div>
                <label className='block text-sm font-semibold text-gray-300 mb-2'>
                    Descripción {!isEditing ? <span className='text-red-500'>*</span> : ''}
                </label>
                <textarea
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    rows={4}
                    className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors'
                    placeholder='Describe los detalles de la oferta...'
                    required={!isEditing}
                />
                {errors.description && (
                    <p className='text-red-500 text-sm mt-1'>{errors.description}</p>
                )}
            </div>

            {/* Descuento */}
            <div>
                <label className='block text-sm font-semibold text-gray-300 mb-2'>
                    Porcentaje de Descuento (1-100) % {!isEditing ? <span className='text-red-500'>*</span> : ''}
                </label>
                <div className='relative'>
                    <input
                        type='number'
                        min='1'
                        max='100'
                        value={data.discount_percentage}
                        onChange={e => setData('discount_percentage', e.target.value)}
                        className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors'
                        placeholder='50'
                        required={!isEditing}
                    />
                </div>
                {errors.discount_percentage && (
                    <p className='text-red-500 text-sm mt-1'>{errors.discount_percentage}</p>
                )}
            </div>

            {/* Fechas */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                {/* Fecha Inicio */}
                <div>
                    <label className='block text-sm font-semibold text-gray-300 mb-2'>
                        Fecha de inicio {!isEditing ? <span className='text-red-500'>*</span> : ''}
                    </label>
                    <input 
                        type='date'
                        value={data.starts_at}
                        onChange={e => setData('starts_at', e.target.value)}
                        className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors'
                        required={!isEditing}
                    />
                    {errors.starts_at && (
                        <p className='text-red-500 text-sm mt-1'>{errors.starts_at}</p>
                    )}
                </div>

                {/* Fecha Expiración */}
                <div>
                    <label className='block text-sm font-semibold text-gray-300 mb-2'>
                        Fecha de expiración (opcional)
                    </label>
                    <input
                        type='date'
                        value={data.expires_at}
                        onChange={e => setData('expires_at', e.target.value)}
                        className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors'
                    />
                    {errors.expires_at && (
                        <p className='text-red-500 text-sm mt-1'>{errors.expires_at}</p>
                    )}
                </div>
            </div>

            {/* Checkboxes */}
            <div className='space-y-3'>
                {/* Destacada */}
                <label className='flex items-center space-x-3 cursor-pointer'>
                    <input
                        type='checkbox'
                        checked={data.is_featured}
                        onChange={e => setData('is_featured', e.target.checked)}
                        className='w-5 h-5 bg-gray-800 border-gray-700 rounded text-amber-500 focus:ring-amber-500'
                    />
                    <span className='text-gray-300'>Marcar como destacada</span>
                </label>

                {/* Pública */}
                <label className='flex items-center space-x-3 cursor-pointer'>
                    <input
                        type='checkbox'
                        checked={data.is_public}
                        onChange={e => setData('is_public', e.target.checked)}
                        className='w-5 h-5 bg-gray-800 border-gray-700 rounded text-amber-500 focus:ring-amber-500'
                    />
                    <span className='text-gray-300'>Visible públicamente</span>
                </label>
            </div>

            {/* SELECTOR DE PRODUCTOS */}
            <div className='pt-6 border-t border-gray-800'>
                <label className='block text-base font-semibold text-gray-300 mb-1'>
                    Productos incluidos en la oferta
                </label>
                <p className='text-gray-400 text-sm mb-4'>
                    Selecciona los productos a los que se aplicará este descuento.
                </p>

                {products && products.length > 0
                    ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
                            {products.map((product) => (
                                <label
                                    key={product.id}
                                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all select-none
                                        ${data.product_ids.includes(product.id)
                                            ? 'bg-amber-500/10 border-amber-500'
                                            : 'bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-gray-500'
                                        }
                                    `}  
                                >
                                    <input
                                        type='checkbox'
                                        className='w-5 h-5 rounded border-gray-600 text-amber-500 focus:ring-amber-500 bg-gray-900 cursor-pointer'
                                        checked={data.product_ids.includes(product.id)}
                                        onChange={() => handleProductToggle(product.id)}
                                    />
                                    <div className='flex flex-col'>
                                        <span className={`font-semibold text-sm ${data.product_ids.includes(product.id) ? 'text-amber-400' : 'text-gray-200'}`}>
                                            {product.name}
                                        </span>
                                        <span className='text-xs text-gray-400'>{product.price} €</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <div className='p-4 bg-gray-800 border border-gray-700 rounded-lg text-center text-gray-500 text-sm'>
                            No hay productos activos en el menú en este momento.
                        </div>
                    )
                }
                {errors.product_ids && (
                    <p className='text-red-500 text-sm mt-2'>{errors.product_ids}</p>
                )}
            </div>

            {/* Botones */}
            <div className='flex gap-4 pt-4 border-t border-gray-800'>
                <button
                    type='submit'
                    disabled={processing}
                    className='px-6 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-gray-900 hover:cursor-pointer font-semibold rounded-lg transition-colors disabled:opacity-50'
                >
                    {processing ? 'Guardando...' : submitText}
                </button>
                <Link
                    href='/app/admin/offers'
                    className='px-6 py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-600 text-white font-semibold rounded-lg transition-colors'
                >
                    Cancelar
                </Link>
                <span className='ml-auto my-auto text-lg text-gray-400'>(<span className='text-red-500'>*</span> requerido)</span>
            </div>
        </form>
    );
}