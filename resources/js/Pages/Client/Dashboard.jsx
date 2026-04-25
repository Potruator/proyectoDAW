import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard({ stats, history, offers }) {
    // Obtenemos los datos del usuario logueado
    const { auth } = usePage().props;

    return (
        <AppLayout>
            <Head title='Mis Ofertas' />

            <div className='py-8 px-4 max-w-5xl mx-auto space-y-8'>
                {/* Sección de bienvenida y estadísticas */}
                <div>
                    <h1 className='text-3xl font-bold text-white mb-6'>
                        Hola, <span className='text-amber-500'>{auth.user.name}</span> 👋
                    </h1>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                        <div className='bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center justify-between shadow-sm'>
                            <div>
                                <p className='text-sm text-gray-400 font-semibold mb-1 uppercase tracking-wider'>Ofertas Disponibles</p>
                                <p className='text-4xl font-bold text-white'>{stats.total_saved}</p>
                            </div>
                            <div className='text-5xl opacity-20'>🎟️</div>
                        </div>

                        <div className='bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center justify-between shadow-sm'>
                            <div>
                                <p className='text-sm text-gray-400 font-semibold mb-1 uppercase tracking-wider'>Ofertas Canjeadas</p>
                                <p className='text-4xl font-bold text-green-400'>{stats.total_redeemed}</p>
                            </div>
                            <div className='text-5xl opacity-20'>☕</div>
                        </div>
                    </div>
                </div>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                    { /* Ofertas disponibles del usuario */}
                    <div className='lg:col-span-2'>
                        <h1 className='text-2xl font-bold text-white mb-6'>Mis Ofertas Disponibles</h1>

                        {offers.length > 0 
                            ? (
                                <div className='grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6'>
                                    {offers.map((item) => (
                                        <Link
                                            key={item.uuid}
                                            href={`/app/client/offers/${item.uuid}`}
                                            className='group block bg-gray-900 border-gray-800 rounded-2xl p-5 shadow-sm border hover:shadow-md active:shadow-md active:border-amber-500 hover:border-amber-500 transition-all'
                                        >
                                            <div className='flex justify-between items-start h-full'>
                                                <div className='flex flex-col justify-between h-full flex-1'>
                                                    <div>
                                                        <div className='flex justify-between items-start mb-1'>
                                                            <h3 className='text-lg font-bold group-hover:text-amber-400 group-active:text-amber-400 transition-colors pr-2'>
                                                                {item.title}
                                                            </h3>
                                                            {item.discount_percentage && (
                                                                <span className='bg-amber-500 text-gray-900 font-bold px-2 py-0.5 rounded text-xs'>
                                                                    -{item.discount_percentage}%
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className='text-gray-400 text-sm mt-1 line-clamp-2'>
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                    <span className='inline-block mt-4 text-xs font-medium text-gray-500 uppercase tracking-widest'>
                                                        Obtenida {item.assigned_at}
                                                    </span>
                                                </div>
                                                <div className='ml-4 p-3 rounded-xl group-hover:bg-amber-500/20 group-active:bg-amber-500/20 transition-colors shrink-0'>
                                                    <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )
                            : (
                                <div className='text-center rounded-3xl py-20 border-2 border-dashed border-gray-700 bg-gray-900/50'>
                                    <span className='text-4xl block mb-3 opacity-50'>📭</span>
                                    <p className="text-gray-400">No tienes ofertas disponibles en este momento</p>
                                </div>
                            )
                        }
                    </div>

                    {/* Historial de canjeos */}
                    <div>
                        <h2 className='text-2xl font-bold text-white mb-6'>Historial</h2>

                        <div className='bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-sm'>
                            {history && history.length > 0 ? (
                                <div className='space-y-4'>
                                    {history.map(item => (
                                        <div key={item.id} className='border-l-2 border-green-500 pl-4 py-1 relative'>
                                            {/* Punto en la línea de tiempo */}
                                            <div className='absolute -left-1.25 top-2 w-2 h-2 rounded-full bg-green-500'></div>

                                            <p className='text-white font-bold text-sm'>{item.title}</p>
                                            <div className='flex justify-between items-center mt-1.5'>
                                                <span className='text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-0.5 rounded'>
                                                    -{item.discount}% aplicado
                                                </span>
                                                <span className='text-xs text-gray-500'>{item.redeemed_date}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='text-center py-8'>
                                    <span className='text-4xl opacity-30 mb-3 block'>🕰️</span>
                                    <p className='text-sm text-gray-500 italic'>
                                        Aún no has canjeado ninguna oferta en la cafetería.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}