import { useForm, Head, Link, usePage } from '@inertiajs/react';

export default function Register() {
    const { appName } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className='min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-950'>
            <Head title='Registro' />

            <div className="w-full sm:max-w-xl mt-6 px-8 py-10 bg-gray-900 rounded-2xl border border-gray-800 shadow-xl shadow-black/50 overflow-hidden">                
                {/* Cabecera del formulario */}
                <div className='text-center mb-8'>
                    <h2 className='text-2xl font-bold text-white mb-2'>{appName}</h2>
                    <p className='text-gray-400 text-sm'>Crea tu cuenta para acceder a promociones exclusivas</p>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Campo Nombre */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                            Nombre
                        </label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                            placeholder="Tu nombre completo"
                            required
                            autoFocus
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* Campo Email */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                            Correo Electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                            placeholder="ejemplo@correo.com"
                            required
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* Campo Contraseña */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                            placeholder="Mínimo 8 caracteres"
                            required
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>

                    {/* Campo Confirmar Contraseña */}
                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-semibold text-gray-300 mb-2">
                            Confirmar Contraseña
                        </label>
                        <input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
                            placeholder="Repite la contraseña"
                            required
                        />
                    </div>

                    {/* Acciones */}
                    <div className="flex flex-col space-y-4 pt-2">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 hover:cursor-pointer text-gray-900 font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-amber-500/20 text-center flex justify-center items-center"
                        >
                            {processing ? 'Creando cuenta...' : 'Registrarse'}
                        </button>

                        <div className="text-center">
                            <span className="text-gray-500 text-sm">¿Ya tienes cuenta? </span>
                            <Link
                                href="/login"
                                className="text-amber-500 hover:text-amber-400 font-semibold text-sm transition-colors"
                            >
                                Inicia Sesión
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}