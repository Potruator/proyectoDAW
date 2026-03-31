import { useForm, Link } from '@inertiajs/react';

export default function OfferForm({ offer, submitUrl, submitText = 'Guardar', isEditing = false }) {
    const { data, setData, post, processing, errors } = useForm({
        title: offer?.title || '',
        description: offer?.description || '',
        discount_percentage: offer?.discount_percentage || '',
        starts_at: offer?.starts_at || '',
        expires_at: offer?.expires_at || '',
        is_featured: offer?.is_featured || false,
        is_public: offer?.is_public || true
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

    return (
        <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Título */}
            <div>
                <label className='block text-sm font-semibold text-gray-300 mb-2'>
                    Título de la Oferta *
                </label>
                <input
                    type='text'
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                        focus:outline-none focus:border-amber-500 transition-colors`}
                    placeholder='Ej: 2x1 en Todas las Bebidas'
                    required
                />
                {errors.title && (
                    <p className='text-red-500 text-sm mt-1'>{errors.title}</p>
                )}
            </div>

            {/* Descripción */}
            <div>
                <label className='block text-sm font-semibold text-gray-300 mb-2'>
                    Descripción *
                </label>
                <textarea
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    rows={4}
                    className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors'
                    placeholder='Describe los detalles de la oferta...'
                    required
                />
                {errors.description && (
                    <p className='text-red-500 text-sm mt-1'>{errors.description}</p>
                )}
            </div>

            {/* Descuento */}
            <div>
                <label className='block text-sm font-semibold text-gray-300 mb-2'>
                    Porcentaje de Descuento * (1-100) %
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
                        required
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
                        Fecha de inicio *
                    </label>
                    <input 
                        type='date'
                        value={data.starts_at}
                        onChange={e => setData('starts_at', e.target.value)}
                        className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors'
                        required
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

            {/* Botones */}
            <div className='flex gap-4 pt-4'>
                <button
                    type='submit'
                    disabled={processing}
                    className='px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 hover:cursor-pointer font-semibold rounded-lg transition-colors disabled:opacity-50'
                >
                    {processing ? 'Guardando...' : submitText}
                </button>
                <Link
                    href='/app/admin/offers'
                    className='px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors'
                >
                    Cancelar
                </Link>
                <span className='ml-auto my-auto text-lg text-gray-400'>(* requerido)</span>
            </div>
        </form>
    );
}