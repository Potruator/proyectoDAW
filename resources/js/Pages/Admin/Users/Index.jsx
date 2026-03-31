import AdminLayout from '@/Layouts/AdminLayout';
import { Link, router, Head } from '@inertiajs/react';
import { useState } from 'react';
import styles from './Index.module.css';

export default function Index({ users, filters }) {
    const [searchValues, setSearchValues] = useState({
        search: filters?.search || '',
        role: filters?.role || ''
    });

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            router.delete(`/app/admin/users/${id}`);
        }
    };

    // Función para actualizar el estado de los filtros
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchValues(prev => ({ ...prev, [name]: value }));
    };

    // Función para ejecutar la búsqueda con los filtros actuales
    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/app/admin/users', searchValues, {
            preserveState: true, // Mantiene el estado de la página
            replace: true // Reemplaza la URL en lugar de agregar una nueva entrada en el historial del navegador
        })
    };

    // Función para limpiar los filtros
    const handleReset = () => {
        setSearchValues({ search: '', role: ''});
        router.get('/app/admin/users');
    };

    return (
        <AdminLayout>
            <Head title='Índice de Usuarios'/>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
                <h1 className='text-3xl font-bold text-white'>Gestión de Usuarios</h1>
                <Link 
                    href='/app/admin/users/create'
                    className='px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors'
                >
                    + Nuevo Usuario
                </Link>
            </div>

            {/* Barra de búsqueda y filtros */}
            <div className='bg-gray-900 p-4 rounded-lg mb-6 border border-gray-800'>
                <form onSubmit={handleSearch} className='flex flex-col md:flex-row gap-4 w-full'>
                    <div className='flex-1 w-full h-full'>
                        <input
                            type='text'
                            name='search'
                            value={searchValues.search}
                            onChange={handleChange}
                            placeholder='Buscar por nombre o email...'
                            className='w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500'
                        />
                    </div>

                    <div className='w-full md:w-64'>
                        <select
                            name='role'
                            value={searchValues.role}
                            onChange={handleChange}
                            className='w-full h-full bg-gray-800 text-white border border-gray-700 hover:bg-gray-600 hover:cursor-pointer rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500'
                        >
                            <option value=''>Todos los roles</option>
                            <option value='admin'>Administrador</option>
                            <option value='staff'>Personal</option>
                            <option value='client'>Cliente</option>
                        </select>
                    </div>

                    <div className='flex gap-2 w-full md:w-auto'>
                        <button
                            type='submit'
                            className='flex-1 md:flex-none px-6 py-2 bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white font-semibold rounded-lg transition-colors'
                        >
                            Filtrar
                        </button>
                        {(searchValues.search || searchValues.role) && (
                            <button
                                type='button'
                                onClick={handleReset}
                                className='flex-1 md:flex-none px-4 py-2 bg-gray-700 hover:bg-gray-600 hover:cursor-pointer text-white font-semibold rounded-lg transition-colors'
                            >
                                Limpiar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Tabla de Usuarios */}
            <div className='bg-gray-900 rounded-lg overflow-x-auto w-full border border-gray-800'>
                <table className='w-full min-w-200'>
                    <thead className={styles.tableHeader}>
                        <tr>
                            <th className={`${styles.th} text-left`}>
                                Nombre
                            </th>
                            <th className={`${styles.th} text-left`}>
                                Email
                            </th>
                            <th className={`${styles.th} text-center`}>
                                Fecha de registro
                            </th>
                            <th className={`${styles.th} text-center`}>
                                Rol
                            </th>
                            <th className={`${styles.th} text-center`}>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {users.data.map((user) => (
                            <tr key={user.id} className='hover:bg-gray-800 transition-colors'>
                                <td className={`${styles.td} font-medium`}>
                                    {user.name}
                                </td>
                                <td className={`${styles.td} font-medium`}>
                                    {user.email}
                                </td>
                                <td className={`${styles.td} text-sm text-center`}>
                                    {user.created_at}
                                </td>
                                <td className={`${styles.td} text-sm text-center`}>
                                    <span className={`px-1
                                        ${user.role === 'Administrador' ? 'bg-amber-400/10 text-amber-400' : ''}
                                        ${user.role === 'Personal' ? 'bg-green-400/10 text-green-400' : ''}
                                    `}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className={styles.td}>
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
                    <div className='px-6 py-4 bg-gray-800 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left'>
                        <div className='text-sm text-gray-400'>
                            Mostrando {users.from} - {users.to} de {users.total} ofertas
                        </div>
                        <div className='flex flex-wrap justify-center gap-2'>
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