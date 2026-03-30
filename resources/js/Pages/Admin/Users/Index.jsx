import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router } from '@inertiajs/react';

export default function Index({ users }) {
    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            router.delete(`/app/admin/users/${id}`);
        }
    };

    console.log(users);

    return (
        <AdminLayout>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold text-white'>Gestión de Usuarios</h1>
                <Link 
                    href='/app/admin/usuario/create'
                    className='px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors'
                >
                    + Nueva Usuario
                </Link>
            </div>

            {/* Tabla de Ofertas */}
            <div className='bg-gray-900 rounded-lg overflow-hidden border border-gray-800'>
                <table className='w-full'>
                    <thead className='bg-gray-800'>
                        <tr>
                            <th className='px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                Nombre
                            </th>
                            <th className='px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                Email
                            </th>
                            <th className='px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                Fecha de registro
                            </th>
                            <th className='px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                Rol
                            </th>
                            <th className='px-6 py-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider'>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-800'>
                        {users.data.map((user) => (
                            <tr key={user.id} className='hover:bg-gray-800 transition-colors'>
                                <td className='px-6 py-4 text-white font-medium'>
                                    {user.name}
                                </td>
                                <td className='px-6 py-4 text-white font-medium'>
                                    {user.email}
                                </td>
                                <td className='px-6 py-4 text-gray-300 text-sm text-center'>
                                    {user.created_at}
                                </td>
                                <td className='px-6 py-4 text-gray-300 text-sm text-center'>
                                    <span className={`
                                        ${user.role === 'Administrador' ? 'bg-amber-400/10 text-amber-400' : ''}
                                        ${user.role === 'Personal' ? 'bg-green-400/10 text-green-400' : ''}
                                    `}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className='px-6 py-4'>
                                    <div className='flex w-full gap-2'>
                                        <Link  
                                            href={`/app/admin/users/${user.id}`}
                                            className='flex-1 text-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors'
                                        >
                                            Ver
                                        </Link>
                                        <Link  
                                            href={`/app/admin/users/${user.id}/edit`}
                                            className='flex-1 text-center px-3 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 text-sm rounded transition-colors'
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(user.id)}
                                            className='flex-1 text-center px-3 py-2 bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white text-sm rounded transition-colors'
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Paginación */}
                {/* links viene de haber usado el método paginate en AdminUserController */}
                {users.links.length > 3 && (
                    <div className='px-6 py-4 bg-gray-800 border-t border-gray-700 flex justify-between items-center'>
                        <div className='text-sm text-gray-400'>
                            Mostrando {users.from} - {users.to} de {users.total} ofertas
                        </div>
                        <div className='flex gap-2'>
                            {users.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`
                                        px-3 py-2 roudned text-sm
                                        ${link.active
                                            ? 'bg-amber-500 text-gray-900 font-semibold'
                                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                        }
                                        ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}
                                    `}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}