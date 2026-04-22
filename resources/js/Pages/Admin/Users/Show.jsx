import AppLayout from '@/Layouts/AppLayout';
import { Link, Head } from '@inertiajs/react';

export default function Show({ user }) {
    return (
        <AppLayout>
            <Head title='Detalle de Usuario'/>
            <div className='max-w-4xl mx-auto'>
                <div className='flex flex-col sm:flex-row justify-between items-start mb-6 gap-4'>
                    <h1 className='text-3xl font-bold text-white grow'>Detalle de Usuario</h1>

                    <div className='flex flex-wrap items-center gap-4 w-full sm:w-auto'>
                        <Link
                            href={`/app/admin/users/${user.id}/edit`}
                            className='flex-1 sm:flex-none text-center px-6 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors shadow-lg shadow-amber-500/20'
                        >
                            Editar Usuario
                        </Link>
                        <Link
                            href={`/app/admin/users`}
                            className='flex-1 sm:flex-none text-center px-6 py-3 bg-gray-800 hover:bg-gray-700 active:bg-gray-700 text-gray-300 font-semibold rounded-lg transition-colors'                        
                        >
                            Volver atrás
                        </Link>
                    </div>
                </div>

                <div className='bg-gray-900 rounded-lg p-8 border border-gray-800 space-y-6'>
                    {/* Nombre */}
                    <div>
                        <h3 className='text-sm font-semibold text-gray-400 mb-2'>Nombre</h3>
                        <p className='text-2xl font-bold text-white'>{user.name}</p>
                    </div>

                    {/* Email */}
                    <div>
                        <h3 className='text-sm font-semibold text-gray-400 mb-2'>Correo Electrónico</h3>
                        <p className='text-gray-300'>{user.email}</p>
                    </div>

                    {/* Rol */}
                    <div>
                        <h3 className='text-sm font-semibold text-gray-400 mb-2'>Rol</h3>
                        <p className='text-4xl font-bold text-green-400'>{user.role}</p>
                    </div>

                    {/* Fecha de alta */}
                    <div className='grid grid-cols-2 gap-4'>
                        <div>
                            <h3 className='text-sm font-semibold text-gray-400 mb-2'>Fecha de Alta</h3>
                            <p className='text-white'>{user.created_at}</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </AppLayout>
    )
}