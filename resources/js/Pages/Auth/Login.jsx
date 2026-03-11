import { useForm, Head } from "@inertiajs/react"

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="mt-20 max-w-md mx-auto">
            <Head title="Login"/>
            <div className="bg-gray-900 p-8 rounded-lg shadow-2xl">
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
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={e => setData("password", e.target.value)}
                            placeholder="Contraseña"
                            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-amber-400"
                            required
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="cursor-pointer w-full bg-amber-400 hover:bg-amber-500 text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {processing ? "Iniciando..." : "Iniciar sesión"}
                    </button>
                </form>
            </div>
        </div>
    )
}