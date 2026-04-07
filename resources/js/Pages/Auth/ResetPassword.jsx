import { Head, useForm } from '@inertiajs/react';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/reset-password');
    }

    return (
        <div className='mt-20 pax-w-md mx-auto'>
            <Head title='Restablecer Contraseña' />
            <div className='bg-gray-900 p-8 rounded-lg shadow-2xl'>
                <h1 className='text-2xl font-bold text-amber-400 mb-6'>Crear nueva contraseña</h1>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    {/* Email bloqueado con readOnly */}
                    <div>
                        <label className='block text-gray-300 mb-2'>Email</label>
                        <input
                            type='email'
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className='w-full px-4 py-3 bg-gray-800 text-gray-400 border border-gray-700 rounded-lg focus:outline-none'
                            readOnly
                        />
                        {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                    </div>

                    <div>
                        <label className='block text-gray-300 mb-2'>Nueva contraseña</label>
                        <input
                            type='password'
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-400 focus:outline-none'
                            required
                        />
                        {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}
                    </div>

                    <div>
                        <label className='block text-gray-300 mb-2'>Confirmar contraseña</label>
                        <input
                            type='password'
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-400 focus:outline-none'
                            required
                        />
                    </div>

                    <button
                        type='submit'
                        disabled={processing}
                        className='w-full bg-amber-400 hover:bg-amber-500 active:bg-amber-500 text-gray-900 font-bold py-3 px-4 rounded-lg disabled:opacity-50 transition-colors'
                    >
                        {processing ? 'Guardando...' : 'Restablecer Contraseña'}
                    </button>
                </form>
            </div>
        </div>
    );
}