import AppLayout from '@/Layouts/AppLayout';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard({ stats, recentScans = [] }) {
    const { auth } = usePage().props;

    return (
        <AppLayout>
            <Head title='Panel de Control | Staff' />
            <div className='max-w-4xl mx-auto space-y-6'>

                {/* Saludo personalizado */}
                <div>
                   <h2 className='text-2xl font-bold text-white'>¡Hola, {auth.user.name}! 👋</h2> 
                   <p className='text-gray-400 mt-1'>Bienvenido a tu panel de control</p>
                </div>

                {/* Zona de Principal (Botón de escaneo + Estadísticas) */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                    {/* Botón de Escaneo */}
                    <Link
                        href='/app/staff/scan'
                        className='bg-amber-500 hover:bg-amber-600 active:bg-amber-600 transition-colors 
                        rounded-2xl p-8 flex flex-col items-center justify-center text-gray-900
                        shadow-lg group hover:cursor-pointer min-h-50'
                    >
                        <svg className="w-16 h-16 mb-4 group-hover:scale-110 group-active:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                        </svg>
                        <h3 className='text-3xl font-bold'>Escanear QR</h3>
                        <p className='text-amber-900/80 mt-2 mont-medium'>Pulsa aquí para abrir la cámara</p>
                    </Link>

                    {/* Tarjeta de métrica rápida */}
                    <div className='bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col justify-center min-h-50'>
                        <div className='flex items-center space-x-3 mb-2'>
                            <div className='p-2 bg-blue-500/10 rounded-lg'>
                                <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <p className='text-6xl font-bold text-white'>{stats?.today || 0}</p>
                    </div>
                </div>

                {/* Historial Reciente */}
                <div className='bg-gray-90 border border-gray-800 rounded-2xl overflow-hidden mt-8'>
                    <div className='p-6 border-b border-gray-800'>
                        <h3 className='text-lg font-bold text-white'>Últimos movimientos</h3>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Tu historial</span>
                    </div>

                    <div className='p-6 text-center'>
                        {recentScans.length === 0 
                            ? (
                                <div className="py-4 flex flex-col items-center justify-center opacity-50">
                                    <svg className="w-12 h-12 text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                    <p className='text-gray-500'>Aún no has canjeado ninguna oferta hoy</p>
                                </div>
                            ) 
                            : (
                                <div className='space-y-3'>
                                    {recentScans.map((scan) => (
                                        <div key={scan.id} className="flex justify-between items-center p-4 bg-gray-800/50 hover:bg-gray-800 active:bg-gray-800 border border-gray-700/50 rounded-xl transition-colors">
                                            <div className='text-left'>
                                                <p className='text-white font-semibold'>{scan.offer_title}</p>
                                                <p className='text-sm text-gray-400'>
                                                    Cliente: <span className='text-gray-300'>{scan.client_name}</span>
                                                </p>
                                            </div>
                                            <div className='shrink-0 text-right'>
                                                <span className="text-xs text-amber-500 font-medium bg-amber-500/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                                                    {scan.time}
                                                </span>                                    
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}