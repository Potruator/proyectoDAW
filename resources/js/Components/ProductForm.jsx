import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ProductForm({ product, submitUrl, submitText = 'Guardar', isEditing = false }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        image_url: product?.image_url || '',
        is_active: product?.is_active ?? true
    });

    // Función a ejecutar al pulsar Guardar
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            put(
                submitUrl, 
                {
                    preserveScroll: true
                }
            );
        }
        else {
            post(submitUrl);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='space-y-6'>

            {/* Campo: Nombre */}
            <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                    Nombre del Producto {!isEditing ? <span className='text-red-500'>*</span> : ''}
                </label>
                <input 
                    type='text'
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className={`w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 border
                            ${errors.name
                                ? 'border-red-500'
                                : 'border-gray-700'
                            }
                        `}
                    placeholder={isEditing ? 'Dejar en blanco para no cambiar' : 'Ej: Café Flat White'}
                    required={!isEditing}
                />
                {errors.name && <p className='text-red-500 text-sm mt-1'>{errors.name}</p>}
            </div>

            {/* Campo: Descripción */}
            <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                    Descripción
                </label>
                <textarea
                    value={data.description}
                    onChange={e => setData('description', e.target.value)}
                    rows='3'
                    className={`w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 border
                            ${errors.description
                                ? 'border-red-500'
                                : 'border-gray-700'
                            }
                        `}
                    placeholder='Breve descripción de los ingredientes o preparación...'
                />
                {errors.description && <p className='text-red-500 text-sm mt-1'>{errors.description}</p>}
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Campo: Precio */}
                <div>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Precio (€) {!isEditing ? <span className='text-red-500'>*</span> : ''}
                    </label>
                    <input 
                        type='number'
                        step='0.01'
                        min='0'
                        value={data.price}
                        onChange={e => setData('price', e.target.value)}
                        className={`w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 border
                                ${errors.price
                                    ? 'border-red-500'
                                    : 'border-gray-700'
                                }
                            `}
                        placeholder={isEditing ? 'Dejar en blanco para no cambiar' : 'Ej: 3.50'}
                        required={!isEditing}
                    />
                    {errors.price && <p className='text-red-500 text-sm mt-1'>{errors.price}</p>}
                </div>

                {/* Campo: Estado (Activo/Inactivo) */}
                <div>
                    <label className='block text-sm font-medium text-gray-300 mb-2'>
                        Estado {!isEditing ? <span className='text-red-500'>*</span> : ''}
                    </label>
                    <select
                        value={data.is_active ? '1' : '0'}
                        onChange={e => setData('is_active', e.target.value === '1')}
                        className='w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 border border-gray-700 cursor-pointer'
                        required={!isEditing}
                    >
                        <option value='1'>Disponible (Visible)</option>
                        <option value='0'>Agotado / Oculto</option>
                    </select>
                    {errors.is_active && <p className='text-red-500 text-sm mt-1'>{errors.is_active}</p>}
                </div>
            </div>
            

            {/* Campo: Imagen URL */}
            <div>
                <label className='block text-sm font-medium text-gray-300 mb-2'>
                    URL de la Imagen
                </label>
                <input
                    type='text'
                    value={data.image_url}
                    onChange={e => setData('image_url', e.target.value)}
                    className={`w-full bg-gray-800 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 border
                            ${errors.image_url
                                ? 'border-red-500'
                                : 'border-gray-700'
                            }
                        `}                                
                    placeholder='https://ejemplo.com/imagen.jpg'
                />
                {errors.image_url && <p className='text-red-500 text-sm mt-1'>{errors.image_url}</p>}
                <p className='text-gray-500 text-xs mt-2'>Opcional. Si no tienes una, puedes dejarlo en blanco.</p>
            </div>

            {/* Botón de Guardar */}
            <div className='pt-4 border-t border-gray-800 flex gap-4 justify-end'>
                <button
                    type='submit'
                    disabled={processing}
                    className='px-8 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-gray-900 font-bold rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
                >
                    {processing ? 'Guardando...' : submitText}
                </button>
                <Link
                    href='/app/admin/products'
                    className='px-6 py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-600 text-white font-semibold rounded-lg transition-colors'
                >
                    Cancelar
                </Link>
                {!isEditing && (
                        <span className='ml-auto my-auto text-sm text-gray-400'>
                            (<span className='text-red-500'>*</span> requerido)
                        </span>
                )}
            </div>
        </form>
    );
}