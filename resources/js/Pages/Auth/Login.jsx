import { useForm, Head, Link } from "@inertiajs/react"
import { useState } from "react";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    // Estado para controlar la visibilidad de la contraseña
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="w-full max-w-xl mx-auto my-auto px-4 py-8">
            <Head title="Login"/>
            <div className="bg-gray-900 p-8 sm:p-10 rounded-lg shadow-2xl">
                <h1 className="text-3xl font-bold text-amber-400 mb-6">Inicia sesión</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Email */}
                    <div>
                        <label className="block text-gray-300 mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={e => setData("email", e.target.value)}
                            placeholder="Introduce tu email"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                            required
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-gray-300 mb-2">Contraseña</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                onChange={e => setData("password", e.target.value)}
                                placeholder="Contraseña"
                                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                                required
                            />
                            {/* Botón para mostrar/ocultar contraseña */}
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-amber-400 active:text-amber-400 hover:cursor-pointer transition-colors focus:outline-none'
                            >
                                {showPassword 
                                    ?   (/* Icono de ojo abierto (Ocultar contraseña) */
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                                        </svg>
                                    )
                                    : ( /* Icono de ojo cerrado (Mostrar contraseña) */
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    )
                                }
                            </button>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                            )}
                        </div>
                        <div className="flex flex-col mt-2">
                            <Link
                                href="/forgot-password"
                                className="text-amber-400 hover:text-amber-500 active:text-amber-500 transition-colors"
                            >
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer w-full bg-amber-400 hover:bg-amber-500 active:bg-amber-500 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {processing ? "Iniciando..." : "Iniciar sesión"}
                    </button>

                    <div className="pt-6 mt-6 border-t border-gray-800 text-center">                
                        <p className="text-gray-400">
                            ¿Aún no tienes cuenta?{' '}
                            <Link
                                href='/register'
                                className="text-amber-400 hover:text-amber-300 font-semibold transition-colors"                               
                            >
                                Regístrate aquí
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}