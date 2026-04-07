import { Head, useForm, usePage } from '@inertiajs/react';

export default function ForgotPassword() {
    // Mensaje de 'status' si el correo se envió bien
    const { flash } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        email: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/forgot-password');
    }

    return (
        <div className='mt-20 max-w-md mx-auto'>
            <Head title='Recuperar Contraseña' />
            <div className='bg-gray-900 p-8 rounded-lg shadow-2xl'>
                <h1 className='text-2xl font-bold text-amber-400 mb-4'>Recuperar Contraseña</h1>
                <p className='text-gray-400 text-sm mb-6'>
                    Introduce tu email y te enviaremos un enlace para restablecer tu contraseña
                </p>

                {/* Mensaje de éxito si el correo se envió correctamente */}
                {flash?.status && (
                    <div className='mb-4 font-medium text-sm text-green-400'>
                        {flash.status}
                    </div>
                )}

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                        <label className='block text-gray-300 mb-2'>Email</label>
                        <input
                            type='email'
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className='w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-amber-400 focus:outline-none'
                            required
                        />
                        {errors.email && <p className='text-red-500 text-sm mt-1'>{errors.email}</p>}
                    </div>

                    <button
                        type='submit'
                        disabled={processing}
                        className='w-full bg-amber-400 hover:bg-amber-500 active:bg-amber-500 hover:cursor-pointer text-gray-900 font-bold py-3 px-4 rounded-lg disabled:opacity-50 transition-colors'
                    >
                        {processing ? 'Enviando...' : 'Enviar enlace'}
                    </button>
                </form>
            </div>
        </div>
    );
}