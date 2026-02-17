import { Link } from '@inertiajs/react';
import { useState } from 'react';


export default function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='min-h-screen bg-gray-950'>
            <header className='sticky top-0 z-50 shadow-2xl'>
                <nav className='bg-gray-900 border-b border-gray-800'>
                    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                        <div className='flex justify-between h-16 items-center'>

                            {/* Logo */}
                            <h1 className='flex-shrink-0'>
                                <Link href='/' className='text-xl font-black tracking-tight text-amber-400 uppercase'>Golden Café</Link>
                            </h1>

                            {/* Nav desktop */}
                            <div className='hidden md:flex space-x-8'>
                                <Link href='/' className='text-gray-300 hover:text-amber-400 transition-colors font-medium'>Inicio</Link>
                                <Link href='/about' className='text-gray-300 hover:text-amber-400 transition-colors font-medium'>About</Link>
                                <Link href='/contact' className='text-gray-300 hover:text-amber-400 transition-colors font-medium'>Contact</Link>
                                <Link href='/login' className='text-gray-300 hover:text-amber-400 transition-colors font-medium'>Login</Link>
                            </div>

                            {/* Nav mobile */}
                            <div className='flex md:hidden'>
                                <button 
                                    onClick={() => setIsOpen(!isOpen)}
                                    className='text-gray-400 hover:text-amber-400 focus:outline-none p-2'
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
                        <div className='px-2 pt-2 pb-3 space-y-1'>
                            <Link href='/' className='block px-3 py-3 text-gray-50 active:bg-amber-400 active:text-gray-900 rounded-md'>Inicio</Link>
                            <Link href='/about' className='block px-3 py-3 text-gray-50 active:bg-amber-400 active:text-gray-900 rounded-md'>About</Link>
                            <Link href='/contact' className='block px-3 py-3 text-gray-50 active:bg-amber-400 active:text-gray-900 rounded-md'>Contacto</Link>
                            <Link href='/login' className='block px-3 py-3 text-gray-50 active:bg-amber-400 active:text-gray-900 rounded-md'>Login</Link>
                        </div>
                    </div>
                </nav>
            </header>

            <main>{children}</main>

            <footer></footer>
        </div>
    );
}