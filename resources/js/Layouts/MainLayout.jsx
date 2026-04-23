import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';


export default function MainLayout({ children }) {
    const { auth = {}, flash = {}, appName } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const [showFlash, setShowFlash] = useState(false);
    const [hideFlash, setHideFlash] = useState(false);

    // Ocultar mensaje flash tras 5 segundos
    useEffect(() => {
        if(flash.success || flash.error) {
            setShowFlash(true);
            setHideFlash(false);

            const leaveTimer = setTimeout(() => {
                setHideFlash(true);
            }, 4700);

            const hideTimer = setTimeout(() => {
                setShowFlash(false);
            }, 5020);

            return () => {
                clearTimeout(leaveTimer);
                clearTimeout(hideTimer);
            }
        }
    }, [flash]);

    return (
        <div className='h-dvh bg-gray-950 flex flex-col overflow-hidden'>
            <header className='sticky top-0 z-50 shadow-2xl'>
                <nav className='bg-gray-900 border-b border-gray-800'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <div className='flex justify-between h-16 items-center'>

                            {/* Logo */}
                            <h1 className='shrink-0'>
                                <Link href='/' className='text-xl font-black tracking-tight text-amber-400 uppercase'>{appName}</Link>
                            </h1>

                            {/* Nav desktop */}
                            <div className='hidden md:flex space-x-8'>
                                <Link href='/' className='text-gray-300 hover:text-amber-400 active:text-amber-400 transition-colors font-medium'>Inicio</Link>
                                <Link href='/offers' className='text-gray-300 hover:text-amber-400 active:text-amber-400 transition-colors font-medium'>Ofertas</Link>
                                <Link href='/events' className='text-gray-300 hover:text-amber-400 active:text-amber-400 transition-colors font-medium'>Eventos</Link>

                                {/* Usuario autenticado en desktop*/}
                                {auth.user ? (
                                    <div className='flex items-center space-x-4 border-l border-gray-800 pl-4'>
                                        <span className='text-amber-400 font-semibold'>
                                            <Link href={`/app/${auth.user.role}`} method='get'>
                                                Hola, {auth.user.name}
                                            </Link>
                                        </span>
                                        <Link href='/logout' method='post' as='button' className='text-red-400 cursor-pointer hover:text-red-500 active:text-red-500 transition-colors font-medium'>Cerrar sesión</Link>
                                    </div>
                                ) : (
                                    <Link href='/login' className='text-gray-300 hover:text-amber-400 active:text-amber-400 transition-colors font-medium'>Login</Link>
                                )}
                            </div>

                            {/* Nav mobile */}
                            <div className='flex md:hidden'>
                                <button 
                                    onClick={() => setIsOpen(!isOpen)}
                                    className='text-gray-400 hover:cursor-pointer hover:text-amber-400 active:text-amber-400 focus:outline-none p-2'
                                >
                                    <svg className='h-7 w-7' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                        {isOpen ? (
                                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12' />
                                        ) : (
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                        )}
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-gray-900 border-t border-gray-100`}>
                        <div className='px-2 pt-2 pb-3 space-y-1' onClick={() => setIsOpen(false)}>
                            <Link href='/' className='block px-3 py-3 text-gray-50 hover:bg-amber-400 hover:text-gray-900 active:bg-amber-400 active:text-gray-900 rounded-md'>Inicio</Link>
                            <Link href='/offers' className='block px-3 py-3 text-gray-50 hover:bg-amber-400 hover:text-gray-900 active:bg-amber-400 active:text-gray-900 rounded-md'>Ofertas</Link>
                            <Link href='/events' className='block px-3 py-3 text-gray-50 hover:bg-amber-400 hover:text-gray-900 active:bg-amber-400 active:text-gray-900 rounded-md'>Eventos</Link>

                            {/* Usuario autenticado en mobile */}
                            {auth.user ? (
                                <>
                                    <div className='px-3 py-3 text-amber-400 text-sm border-t border-gray-800 hover:bg-amber-400 hover:text-gray-900 active:bg-amber-400 active:text-gray-900 rounded-md'>
                                        <Link 
                                            href={`/app/${auth.user.role}`} 
                                            method='get'
                                        >
                                            {auth.user.name}
                                        </Link>
                                    </div>
                                    <Link href='/logout' method='post' as='button' 
                                        className='block w-full text-left px-3 py-3 hover:cursor-pointer text-red-400 hover:bg-red-400 hover:text-gray-900 active:bg-red-400 active:text-gray-900 rounded-md transition-colors'>
                                        Salir
                                    </Link>
                                </>
                            ) : (
                                <Link href='/login' className='block px-3 py-3 text-gray-50 hover:bg-amber-400 hover:text-gray-900 active:bg-amber-400 active:text-gray-900 rounded-md transition-colors'>
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>
            </header>

            {/* Notificaciones flash */}
            {showFlash && (
                <div className='fixed top-20 right-4 z-50 space-y-2 max-w-md'>
                    {flash.success && (
                        <div className={`${hideFlash ? 'animate-slide-out' : 'animate-slide-in'}
                            bg-green-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-start justify-between
                        `}>
                            <div className='flex items-start'>
                                <svg
                                    className='w-6 h-6 mr-3 shrink-0 mt-0.5'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                                    />
                                </svg>
                                <div>
                                    <p className='font-semibold'>¡Éxito!</p>
                                    <p className='text-sm'>{flash.success}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setHideFlash(true);
                                    setTimeout(() => setShowFlash(false), 300); // Tiempo para permitir la animación
                                }}
                                className='ml-4 cursor-pointer text-white hover:text-gray-200 active:text-gray-200 shrink-0'>
                                    <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                                            d='M6 18L18 6M6 6l12 12'/>
                                    </svg>
                            </button>
                        </div>
                    )}
                    {flash.error && (
                        <div className={`${hideFlash ? 'animate-slide-out' : 'animate-slide-in'}
                            bg-red-500 text-white px-6 py-4 rounded-lg shadow-2xl flex items-start justify-between
                        `}>
                            <div className='flex items-start'>
                                <svg
                                    className='w-6 h-6 mr-3 shrink-0 mt-0.5'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    stroke='currentColor'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth={2}
                                        d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                    />
                                </svg>
                                <div>
                                    <p className='font-semibold'>Error</p>
                                    <p className='text-sm'>{flash.error}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => {
                                    setHideFlash(true);
                                    setTimeout(() => setShowFlash(false), 320); // Tiempo para permitir la animación
                                }}
                                className='ml-4 cursor-pointer text-white hover:text-gray-200 active:text-gray-200 shrink-0'>
                                    <svg className='w-5 h-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
                                            d='M6 18L18 6M6 6l12 12'/>
                                    </svg>
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className='flex-1 overflow-y-auto flex flex-col'>
                <main className='grow flex flex-col'>
                    {children}
                </main>

                <footer className='bg-gray-900 border-t border-gray-800 shrink-0 mt-auto'>
                    <div className='mx-auto py-4 text-center text-gray-400'>
                        <p>&copy; 2026 {appName}. Todos los derechos reservados.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}