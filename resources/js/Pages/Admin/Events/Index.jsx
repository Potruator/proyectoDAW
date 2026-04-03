import AppLayout from '@/Layouts/AppLayout';
import { Link, router, Head } from '@inertiajs/react';
import { useState } from 'react';
import styles from '../Styles modules/Index.module.css';

export default function Index({ events, filters }) {
    const [searchValues, setSearchValues] = useState({
        search: filters?.search || '',
        status: filters?.status || '' // Cambiado de 'role' a 'status'
    });

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este evento?')) {
            router.delete(`/app/admin/events/${id}`);
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
        router.get('/app/admin/events', searchValues, {
            preserveState: true,
            replace: true 
        });
    };

    // Función para limpiar los filtros
    const handleReset = () => {
        setSearchValues({ search: '', status: ''});
        router.get('/app/admin/events');
    };

    return (
        <AppLayout>
            <Head title='Índice de Eventos'/>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
                <h1 className='text-3xl font-bold text-white'>Gestión de Eventos</h1>
                <Link 
                    href='/app/admin/events/create'
                    className='px-6 py-3 bg-amber-500 hover:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors'
                >
                    + Nuevo Evento
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
                            placeholder='Buscar por título o ubicación...'
                            className='w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500'
                        />
                    </div>

                    <div className='w-full md:w-64'>
                        <select
                            name='status'
                            value={searchValues.status}
                            onChange={handleChange}
                            className='w-full h-full bg-gray-800 text-white border border-gray-700 hover:bg-gray-600 hover:cursor-pointer rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500'
                        >
                            <option value=''>Todos los estados</option>
                            <option value='public'>Públicos</option>
                            <option value='draft'>Borradores</option>
                        </select>
                    </div>

                    <div className='flex gap-2 w-full md:w-auto'>
                        <button
                            type='submit'
                            className='flex-1 md:flex-none px-6 py-2 bg-blue-500 hover:bg-blue-600 hover:cursor-pointer text-white font-semibold rounded-lg transition-colors'
                        >
                            Filtrar
                        </button>
                        {(searchValues.search || searchValues.status) && (
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

            {/* Tabla de Eventos */}
            <div className='bg-gray-900 rounded-lg overflow-x-auto w-full border border-gray-800'>
                <table className='w-full min-w-200'>
                    <thead className={styles.tableHeader}>
                        <tr>
                            <th className={`${styles.th} text-left`}>
                                Título
                            </th>
                            <th className={`${styles.th} text-left`}>
                                Fecha
                            </th>
                            <th className={`${styles.th} text-left`}>
                                Ubicación
                            </th>
                            <th className={`${styles.th} text-center`}>
                                Estado
                            </th>
                            <th className={`${styles.th} text-center`}>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {events.data.length === 0 ? (
                            <tr>
                                <td colSpan="5" className={`${styles.td} text-center py-8 text-gray-400`}>
                                    No hay eventos registrados.
                                </td>
                            </tr>
                        ) : (
                            events.data.map((event) => (
                                <tr key={event.id} className='hover:bg-gray-800 transition-colors'>
                                    <td className={`${styles.td} font-medium text-white`}>
                                        {event.title}
                                    </td>
                                    <td className={`${styles.td} text-sm text-gray-300`}>
                                        {event.date}
                                    </td>
                                    <td className={`${styles.td} text-sm text-gray-300`}>
                                        {event.location}
                                    </td>
                                    <td className={`${styles.td} text-sm text-center`}>
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                            ${event.is_public ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}
                                        `}>
                                            {event.is_public ? 'Público' : 'Borrador'}
                                        </span>
                                    </td>
                                    <td className={styles.td}>
                                        <div className='flex w-full gap-2'>
                                            <Link  
                                                href={`/app/admin/events/${event.id}`}
                                                className='flex-1 text-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors'
                                            >
                                                Ver
                                            </Link>
                                            <Link  
                                                href={`/app/admin/events/${event.id}/edit`}
                                                className='flex-1 text-center px-3 py-2 bg-amber-500 hover:bg-amber-600 text-gray-900 text-sm rounded transition-colors'
                                            >
                                                Editar
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(event.id)}
                                                className='flex-1 text-center px-3 py-2 bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white text-sm rounded transition-colors'
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

                {/* Paginación */}
                {events.links && events.links.length > 3 && (
                    <div className='px-6 py-4 bg-gray-800 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left'>
                        <div className='text-sm text-gray-400'>
                            Mostrando {events.from} - {events.to} de {events.total} eventos
                        </div>
                        <div className='flex flex-wrap justify-center gap-2'>
                            {events.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`
                                        px-3 py-2 rounded text-sm transition-colors
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
        </AppLayout>
    );
}