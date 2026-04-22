import { useForm, Link } from '@inertiajs/react';

export default function UserForm({ user, submitUrl, submitText = 'Guardar', isEditing = false}) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        password: user?.password || '',
        role: user?.role || 'client'
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
            {/* Nombre */}
            <div>
                <label className='block text-sm font-semibold text-gray-300 mb-2'>
                    Nombre {!isEditing ? <span className='text-red-500'>*</span> : ''}
                </label>
                <input
                    type='text'
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                        focus:outline-none focus:border-amber-500 transition-colors`}
                    placeholder='Introduce el nombre de usuario'
                    required={!isEditing} // Solo requerido si es creación, no edición de usuario
                />
                {errors.name && (
                    <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
                )}
            </div>

            {/* Email */}
            <div>
                <label className='block text-sm font-semibold text-gray-300 mb-2'>
                    Email {!isEditing ? <span className='text-red-500'>*</span> : ''}
                </label>
                <input
                    type='email'
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                        focus:outline-none focus:border-amber-500 transition-colors
                        ${isEditing ? 'opacity-50 cursor-not-allowed' : ''}`} // Si estamos editando, mostramos el campo email como deshabilitado
                    placeholder='usuario@example.com'
                    autoComplete='off'
                    disabled={isEditing} // No permitar editar el email si estamos editando un usuario existente
                    required={!isEditing} // El email solo es requerido si estamos creando un nuevo usuario, no al editar uno existente
                />
                {errors.email && (
                    <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
                )}
            </div>

            {/* Password */}
            <div>
                <label className='block text-sm font-semibold text-gray-300 mb-2'>
                    Contraseña {!isEditing ? <span className='text-red-500'>*</span> : ''}
                </label>
                <input
                    type='password'
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                        focus:outline-none focus:border-amber-500 transition-colors`}
                    placeholder='Introduce una constraseña'
                    autoComplete='off'
                    required={!isEditing} // La contraseña solo es requerida si estamos creando un nuevo usuario, no al editar uno existente
                />
                {errors.password && (
                    <p className='text-red-500 text-sm mt-1'>{errors.password}</p>
                )}
            </div>

            {/* Rol */}
            <div>
                <label className='block text-sm font-semibold text-gray-300 mb-2'>
                    Rol {!isEditing ? <span className='text-red-500'>*</span> : ''}
                </label>
                <select
                    value={data.role}
                    onChange={e => setData('role', e.target.value)}
                    className={`w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white 
                        focus:outline-none focus:border-amber-500 transition-colors`}
                    required={!isEditing} // Solo en creación
                >
                    <option value='client'>Cliente</option>
                    <option value='staff'>Staff</option>
                    <option value='admin'>Administrador</option>
                </select>
                {errors.role && (
                    <p className='text-red-500 text-sm mt-1'>{errors.role}</p>
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
                    href='/app/admin/users'
                    className='px-6 py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-600 text-white font-semibold rounded-lg transition-colors'
                >
                    Cancelar
                </Link>
                <span className='ml-auto my-auto text-lg text-gray-400'>(<span className='text-red-500'>*</span> requerido)</span>
            </div>
        </form>
    );
}