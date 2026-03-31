import AdminLayout from '@/Layouts/AdminLayout';
import { Link, Head } from '@inertiajs/react';

export default function Show({ user }) {
    return (
        <AdminLayout>
            <Head title='Detalle de Usuario'/>
            <div className='max-w-4xl'>
                <div className='flex justify-between items-center mb-6'>
                    <h1 className='text-3xl font-bold text-white'>Detalle de Usuario</h1>
                    <Link
                        href={`/app/admin/users/${user.id}/edit`}
                        className='px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors'
                    >
                        Editar Usuario
                    </Link>
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
        </AdminLayout>
    )
}