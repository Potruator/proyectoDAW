import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AppLayout({ children }) {
    const { auth } = usePage().props;
    const currentUrl = usePage().url;

    // Obtenemos el rol del usuario para construir la ruta de Scan
    const userRole = auth.user.role;
    
    const [sidebarOpen, setSidebarOpen] = useState(() => {
        /* Guardamos en memoria si el sidebar estaba a true o false, para evitar parpadeos
        al refrescar la página */
        if (typeof window !== 'undefined') {
            const savedState = localStorage.getItem('sidebarPreference');
            if (savedState !== null) {
                return JSON.parse(savedState);
            }
            // Si es la primera vez que se accede, decidimos según el tamapo de la pantalla
            return window.innerWidth >= 768;
        }
        return true;
    });

    // Actualizamos el valor cada vez que se cambie
    useEffect(() => {
        localStorage.setItem('sidebarPreference', JSON.stringify(sidebarOpen));
    }, [sidebarOpen]);

    // Respuesta al redimensionamiento
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            }
            else {
                setSidebarOpen(true);
            }
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    });

    // Cerrar menú en móvil al cambiar de página
    useEffect(() => {
        if (window.innerWidth < 768) {
            setSidebarOpen(false);
        }
    }, [currentUrl]);

    

    useEffect(() => {
        const checkScreenSize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const isAdmin = auth.user?.role === 'admin';
    const isStaff = auth.user?.role === 'staff';
    const isClient = auth.user?.role === 'client';

    return (
        <div className='h-[calc(100dvh-64px)] w-full bg-gray-950 flex overflow-hidden relative'>
            
            {/* 1. OVERLAY MÓVIL */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-40 md:hidden transition-opacity"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* 2. SIDEBAR UNIVERSAL*/}
            <aside className={`
                
                fixed inset-y-0 left-0 z-50 flex flex-col bg-gray-900 border-r border-gray-800 transition-all duration-300
                ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'}
                
                md:relative md:translate-x-0
                ${sidebarOpen ? 'md:w-64' : 'md:w-20'}
            `}>
                {/* Cabecera Sidebar */}
                <div className={`h-16 p-4 border-b border-gray-800 flex items-center ${sidebarOpen ? 'justify-between' : 'justify-center'}`}>
                    {sidebarOpen && (
                        <h1 className='text-xl font-bold text-amber-400'>
                            {
                                isAdmin && 'Admin Panel' ||
                                isStaff && 'Staff Panel' ||
                                isClient && 'Client Panel' ||
                                'Panel'
                            }
                        </h1>
                    )}
                    <button 
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className='text-gray-400 hover:text-white hover:cursor-pointer active:text-white'
                    >
                        <svg className='w-6 h-6 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d={sidebarOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}/>
                        </svg>
                    </button>
                </div>

                {/* Navegación dinámica según rol de usuario - Ajustamos el padding dinámicamente para que no aplaste los iconos */}
                <nav className={`flex-1 space-y-2 overflow-y-auto ${sidebarOpen ? 'p-4' : 'p-2 py-4'}`}>

                    {/* --- ENLACES DE ADMINISTRADOR --- */}
                    {isAdmin && (
                        <>
                            <Link 
                                href='/app/admin'
                                className={`flex items-center rounded-lg transition-colors ${
                                    sidebarOpen ? 'px-4 py-3 space-x-3' : 'justify-center p-3'
                                } ${
                                    currentUrl === '/app/admin' 
                                        ? 'bg-amber-500 text-gray-900'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white active:bg-gray-800 active:text-white'
                                }`}
                            >
                                <svg className='w-6 h-6 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'/>
                                </svg>
                                {sidebarOpen && <span>Dashboard</span>}
                            </Link>

                            <Link
                                href='/app/admin/offers'
                                className={`flex items-center rounded-lg transition-colors ${
                                    sidebarOpen ? 'px-4 py-3 space-x-3' : 'justify-center p-3'
                                } ${
                                    currentUrl.startsWith('/app/admin/offers')
                                        ? 'bg-amber-500 text-gray-900'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white active:bg-gray-800 active:text-white'
                                }`}
                            >
                                <svg className='w-6 h-6 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
                                </svg>
                                {sidebarOpen && <span>Ofertas</span>}
                            </Link>

                            <Link
                                href='/app/admin/products'
                                className={`flex items-center rounded-lg transition-colors ${
                                    sidebarOpen ? 'px-4 py-3 space-x-3' : 'justify-center p-3'
                                } ${
                                    currentUrl.startsWith('/app/admin/products')
                                        ? 'bg-amber-500 text-gray-900'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white active:bg-gray-800 active:text-white'
                                }`}                                                            
                            >
                                <svg className='w-6 h-6 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z M3 8l9 3 9-3M12 11v9' />
                                </svg>

                                {sidebarOpen && <span>Productos</span>}
                            </Link>

                            <Link
                                href='/app/admin/events'
                                className={`flex items-center rounded-lg transition-colors ${
                                    sidebarOpen ? 'px-4 py-3 space-x-3' : 'justify-center p-3'
                                } ${
                                    currentUrl.startsWith('/app/admin/events')
                                        ? 'bg-amber-500 text-gray-900'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white active:bg-gray-800 active:text-white'
                                }`}
                            >
                                <svg className='w-6 h-6 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                                </svg>
                                {sidebarOpen && <span>Eventos</span>}
                            </Link>

                            <Link 
                                href='/app/admin/users'
                                className={`flex items-center rounded-lg transition-colors ${
                                    sidebarOpen ? 'px-4 py-3 space-x-3' : 'justify-center p-3'
                                } ${
                                    currentUrl.startsWith('/app/admin/users')
                                        ? 'bg-amber-500 text-gray-900'
                                        : 'text-gray-300 hover:bg-gray-800 hover:text-white active:bg-gray-800 active:text-white'
                                }`}
                            >
                                <svg className='w-6 h-6 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' />
                                </svg>
                                {sidebarOpen && <span>Usuarios</span>}
                            </Link>                     
                        </>
                    )}
                    
                    {/* --- ESCÁNER PARA ADMIN Y STAFF --- */}
                    {(isAdmin || isStaff) && (
                        <>
                            <Link 
                                href={`/app/${userRole}/scan`}
                                className={`flex items-center rounded-lg transition-colors 
                                ${sidebarOpen 
                                    ? 'px-4 py-3 space-x-3' 
                                    : 'justify-center p-3'} 
                                ${currentUrl.startsWith('/app/staff/scan') 
                                    ? 'bg-amber-500 text-gray-900' 
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white active:bg-gray-800 active:text-white'}`}
                            >
                                <svg className='w-6 h-6 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z' /></svg>
                            {sidebarOpen && <span>Escanear Oferta</span>}
                            </Link>
                        </>
                    )}
                </nav>

                {/* Perfil de usuario y Logout */}
                <div className={`p-4 border-t border-gray-800 flex flex-col ${sidebarOpen ? 'items-start' : 'items-center'}`}>
                    <div className='flex items-center space-x-3 w-full justify-center'>
                        <div className='w-10 h-10 rounded-full bg-amber-400 flex items-center justify-center text-gray-900 font-bold shrink-0'>
                            {auth.user?.name?.charAt(0)}
                        </div>
                        {sidebarOpen && (
                            <div className='flex-1 overflow-hidden'>
                                <p className='text-sm font-semibold text-white truncate'>{auth.user?.name}</p>
                                <p className='text-xs text-gray-400 truncate'>{auth.user?.role_label}</p>
                            </div>
                        )}
                    </div>
                    <Link
                        href='/logout'
                        method='post'
                        as='button'
                        className={`mt-3 flex items-center cursor-pointer justify-center rounded-lg bg-red-500 hover:bg-red-600 active:bg-red-600 text-white text-sm transition-colors ${
                            sidebarOpen ? 'w-full space-x-2 px-4 py-2' : 'w-10 h-10 p-0'
                        }`}
                        title="Salir"
                    >
                        <svg className='w-5 h-5 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
                        </svg>
                        {sidebarOpen && <span>Salir</span>}
                    </Link>
                </div>
            </aside>

            {/* 3. CONTENIDO PRINCIPAL */}
            <div className='flex-1 flex flex-col min-w-0 min-h-0'>
                {/* Header Superior */}
                <header className='h-16 flex-none bg-gray-900 border-b border-gray-800 px-4 md:px-6 flex items-center justify-between'>
                    <div className="flex items-center space-x-4">
                        {/* Botón de hamburguesa visible SOLO en móviles */}
                        <button 
                            onClick={() => setSidebarOpen(true)}
                            className='md:hidden text-gray-400 hover:text-white hover:cursor-pointer active:text-white'
                        >
                            <svg className='w-6 h-6 shrink-0' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16'/>
                            </svg>
                        </button>
                        <h2 className='text-xl font-bold text-white'>Dashboard</h2>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <span className='hidden sm:block text-gray-400 text-sm'>
                            {new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}
                        </span>
                    </div>
                </header>

                <section className='flex-1 p-4 md:p-6 overflow-y-auto'>
                    {children}
                </section>
            </div>
        </div>
    );
}