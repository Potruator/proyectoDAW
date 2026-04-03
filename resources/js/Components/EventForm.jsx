import { useForm, Link } from '@inertiajs/react';

export default function EventForm({ event, submitUrl, submitText = 'Guardar', isEditing = false }) {
    const { data, setData, post, put, processing, errors } = useForm({
        title: event?.title || '',
        description: event?.description || '',
        date: event?.date || '',
        location: event?.location || '',
        is_public: event?.is_public || false
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
                    Título del Evento *
                </label>
                <input
                    type='text'
                    value={data.title}
                    onChange={e => setData('title', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                        focus:outline-none focus:border-amber-500 transition-colors`}
                    placeholder='Happy Hour de 17:00 a 20:00'
                    required={!isEditing} // Solo requerido si es creación, no edición
                />
                {errors.title && (
                    <p className='text-red-500 text-sm mt-1'>{errors.title}</p>
                )}
            </div>

            {/* Ubicación */}
            <div>
                <label className='block text-sm font-semibold text-gray-300 mb-2'>
                    Ubicación del Evento *
                </label>
                <input
                    type='text'
                    value={data.location}
                    onChange={e => setData('location', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                        focus:outline-none focus:border-amber-500 transition-colors`}
                    placeholder='Ej: Terraza Principal'
                    required={!isEditing}
                />
                {errors.location && (
                    <p className='text-red-500 text-sm mt-1'>{errors.location}</p>
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
                    placeholder='Describe los detalles del evento...'
                    required={!isEditing}
                />
                {errors.description && (
                    <p className='text-red-500 text-sm mt-1'>{errors.description}</p>
                )}
            </div>

            {/* Fecha */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                    <label className='block text-sm font-semibold text-gray-300 mb-2'>
                        Fecha *
                    </label>
                    <input 
                        type='date'
                        value={data.date}
                        onChange={e => setData('date', e.target.value)}
                        className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 transition-colors'
                        required={!isEditing}
                    />
                    {errors.date && (
                        <p className='text-red-500 text-sm mt-1'>{errors.date}</p>
                    )}
                </div>
            </div>

            {/* Checkboxes */}
            <div className='space-y-3'>

                {/* Pública */}
                <label className='flex items-center space-x-3 cursor-pointer'>
                    <input
                        type='checkbox'
                        checked={data.is_public}
                        onChange={e => setData('is_public', e.target.checked)}
                        className='w-5 h-5 bg-gray-800 border-gray-700 rounded text-amber-500 focus:ring-amber-500'
                        required={!isEditing}
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
                    href='/app/admin/events'
                    className='px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors'
                >
                    Cancelar
                </Link>
                <span className='ml-auto my-auto text-lg text-gray-400'>(* requerido)</span>
            </div>
        </form>
    );
}