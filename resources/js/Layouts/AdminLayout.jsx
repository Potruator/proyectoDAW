import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ children }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className='min-h-screen bg-gray-950 flex'>
            {/* Sidebar */}
            <aside className={`
                ${sidebarOpen ? 'w-64' : 'w-20'}
                bg-gray-900 border-r border-gray-800 transition-all duration-300
                flex flex-col
            `}>
                {/* Logo y botón de toggle */}
                <div className='p-4 border-b border-gray-800 flex items-center justify-between'>
                    {sidebarOpen && (
                        <h1 className='text-xl font-bold text-amber-400'>Admin Panel</h1>
                    )}
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className='text-gray-400 hover:text-white'
                    >
                        <svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16'/>
                        </svg>
                    </button>
                </div>

                {/* Navegación */}
                <nav className='flex-1 p-4 space-y-2'>
                    <Link 
                        href='/app/admin'
                        className='flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'
                    >
                        <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'/>
                        </svg>
                        {sidebarOpen && <span>Dashboard</span>}
                    </Link>

                    <Link
                        href='/app/admin/ofertas'
                        className='flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'
                    >
                        <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
                        </svg>
                        {sidebarOpen && <span>Ofertas</span>}
                    </Link>

                    <Link
                        href='/app/admin/eventos'
                        className='flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'
                    >
                        <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                        </svg>
                        {sidebarOpen && <span>Eventos</span>}
                    </Link>

                    <Link 
                        href='/app/admin/usuarios'
                        className='flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors'  
                    >
                        <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' />
                        </svg>
                        {sidebarOpen && <span>Usuarios</span>}
                    </Link>
                </nav>

                {/* Información de usuario */}
                <div className='p-4 border-t border-gray-800'>
                    <div className='flex items-center space-x-3'>
                        <div className='w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-gray-900 font-bold'>
                            {auth.user?.name?.charAt(0)}
                        </div>
                        {sidebarOpen && (
                            <div className='flex-1'>
                                <p className='text-sm font-semibold text-white'>{auth.user?.name}</p>
                                <p className='text-xs text-gray-400'>{auth.user?.role_label}</p>
                            </div>
                        )}
                    </div>
                    <Link
                        href='/logout'
                        method='post'
                        as='button'
                        className='mt-3 w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm transition-colors'
                    >
                        <svg className='w-4 h-4' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                        </svg>
                        {sidebarOpen && <span>Salir</span>}
                    </Link>
                </div>
            </aside>

            {/* Contenido principal */}
            <div className='flex-1 flex flex-col'>
                {/* Barra superior */}
                <header className='bg-gray-900 border-b border-gray-800 px-6 py-4'>
                    <div className='flex items-center justify-between'>
                        <h2 className='text-2xl font-bold text-white'>Dashboard</h2>
                        <div className='flex items-center space-x-4'>
                            <span className='text-gray-400 text-sm'>
                                {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
                            </span>
                        </div>
                    </div>
                </header>

                {/* Contenido */}
                <main className='flex-1 p-6 overflow-y-auto'>
                    {children}
                </main>
            </div>
        </div>
    );
}