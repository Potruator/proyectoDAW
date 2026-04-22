import AppLayout from '@/Layouts/AppLayout';
import { Head, useForm, usePage } from '@inertiajs/react';

export default function EditProfile() {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    // Formulario 1: Nombre
    const {
        data: infoData,
        setData: setInfoData,
        put: putInfo,
        processing: infoProcessing,
        errors: infoErrors
    } = useForm({
        name: user.name || ''
    });

    const submitInfo = (e) => {
        e.preventDefault();
        putInfo('/app/profile', {
            preserveScroll: true
        });
    };

    // Formulario 2: Contraseña
    const {
        data: passwordData,
        setData: setPasswordData,
        put: putPassword,
        processing: passwordProcessing,
        errors: passwordErrors,
        reset: resetPasswordForm
    } = useForm({
        oldPassword: '',
        password: '',
        password_confirmation: ''
    });

    const submitPassword = (e) => {
        e.preventDefault();
        putPassword('/app/profile', {
            preserveScroll: true,
            // Si la contraseña se cambia con éxito, limpiamos los campos
            onSuccess: () => resetPasswordForm()
        });
    };

    return (
        <AppLayout>
            <Head title='Mi Perfil' />

            <div className='max-w-3xl mx-auto space-y-8 pb-10'>
                {/* Cabecera */}
                <div>
                    <h1 className='text-3xl font-bold text-white mb-2'>Configuración de Perfil</h1>
                    <p className='text-gray-400'>Gestiona tu información personal y la contraseña de tu cuenta</p>
                </div>

                {/* Zona de Alertas Flash compartidas */}
                {flash?.success && (
                    <div className='bg-green-500/10 border border-green-500/50 text-green-400 p-4 rounded-xl flex items-center space-x-3 shadow-lg shadow-green-500/5'>
                        <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium">{flash.success}</span>
                    </div>
                )}

                {flash?.error && (
                    <div className='bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl flex items-center space-x-3 shadow-lg shadow-red-500/5'>
                        <svg className="w-6 h-6 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-medium">{flash.error}</span>
                    </div>
                )}

                {/* Tarjeta 1: Información personal */}
                <div className='bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl shadow-black/50'>
                    <h2 className='text-xl font-bold text-white mb-2'>Información Personal</h2>
                    <p className='text-gray-400 text-sm mb-6'>Actualiza el nombre para mostrar en tu cuenta.</p>

                    <form onSubmit={submitInfo} className='space-y-6 max-w-xl'>
                        {/* Campo Email (Solo lectura para información visual */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-500 mb-2'>
                                Correo Electrónico (No modificable)
                            </label>
                            <input
                                type='email'
                                value={user.email}
                                disabled
                                className='w-full px-4 py-3 bg-gray-800/50 border border-gray-700/50 rounded-lg text-gray-500 cursor-not-allowed'
                            />
                        </div>

                        {/* Campo Nombre */}
                        <div>
                            <label className='block text-sm font-semibold text-gray-300 mb-2'>
                                Nombre de Usuario
                            </label>
                            <input 
                                type='text'
                                value={infoData.name}
                                onChange={e => setInfoData('name', e.target.value)}
                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all'
                                placeholder='Tu nombre...'
                            />
                            {infoErrors.name && <p className='text-red-500 text-sm mt-1'>{infoErrors.name}</p>}
                        </div>
                        <button
                            type='submit'
                            disabled={infoProcessing || infoData.name === user.name}
                            className='px-6 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 hover:cursor-pointer text-gray-900 font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20'
                        >
                            {infoProcessing ? 'Guardando...' : 'Guardar Información'}
                        </button>
                    </form>
                </div>

                {/* Tarjeta 2: Cambiar contraseña */}
                <div className='bg-gray-900 rounded-2xl p-8 border border-gray-800 shadow-xl shadow-black/50'>
                    <h2 className='text-xl font-bold text-white mb-2'>Seguridad de la Cuenta</h2>
                    <p className='text-gray-400 text-sm mb-6'>Asegúrate de usar una contraseña larga y segura para proteger tu cuenta.</p>

                    <form onSubmit={submitPassword} className='space-y-6 max-w-xl'>
                        <div>
                            <label className='block text-sm font-semibold text-gray-300 mb-2'>Antigua Contraseña</label>
                            <input
                                type='password'
                                autoComplete='off'
                                value={passwordData.oldPassword}
                                onChange={e => setPasswordData('oldPassword', e.target.value)}
                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all'
                                placeholder='Introduce la antigua contraseña'
                            />
                            {passwordErrors.oldPassword && <p className='text-red-500 text-sm mt-1'>{passwordErrors.oldPassword}</p>}
                        </div>

                        <div>
                            <label className='block text-sm font-semibold text-gray-300 mb-2'>Nueva Contraseña</label>
                            <input
                                type='password'
                                autoComplete='new-password'
                                value={passwordData.password}
                                onChange={e => setPasswordData('password', e.target.value)}
                                className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all'
                                placeholder='Mínimo 8 caracteres'
                            />
                            {passwordErrors.password && <p className='text-red-500 text-sm mt-1'>{passwordErrors.password}</p>}
                        </div>

                        <div>
                            <label className='block text-sm font-semibold text-gray-300 mb-2'>Confirmar Nueva Contraseña</label>
                            <input
                                type='password'
                                autoComplete='new-password'
                                value={passwordData.password_confirmation}
                                onChange={e => setPasswordData('password_confirmation', e.target.value)}
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                                placeholder='Repite la contraseña'
                            />
                        </div>

                        <button
                            type='submit'
                            disabled={passwordProcessing || !passwordData.password}
                            className='px-6 py-3 bg-gray-800 border border-gray-700 hover:bg-gray-700 active:bg-gray-600 hover:cursor-pointer text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {passwordProcessing ? 'Actualizando...' : 'Actualizar Contraseña'}
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}