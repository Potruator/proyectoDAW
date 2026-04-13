import AppLayout from '@/Layouts/AppLayout';
import SortIcon from '@/Components/SortIcon';
import { Link, router, Head } from '@inertiajs/react';
import { useState } from 'react';

import styles from '../StylesModules/Index.module.css';

export default function Index({ products, filters }) {
    // Estado para los filtros y la ordenación
    const [searchValues, setSearchValues] = useState({
        search: filters?.search || '',
        sortField: filters?.sortField || 'created_at',
        sortDirection: filters?.sortDirection || 'desc'
    });

    // Función para borrar un producto con confirmación
    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de eliminar este producto del menú?')) {
            router.delete(`/app/admin/products/${id}`);
        }
    };

    // Funciones de búsqueda y filtros
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchValues(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        router.get('/app/admin/products', searchValues, {
            preserveState: true,
            replace: true
        });
    };

    const handleReset = () => {
        const defaultValues = { search: '', sortField: 'created_at', sortDirection: 'desc' };
        setSearchValues(defaultValues);
        router.get('/app/admin/products', defaultValues);
    };

    const handleSort = (field) => {
        const newDirection = (searchValues.sortField === field && searchValues.sortDirection === 'asc') ? 'desc' : 'asc';
        const newFilters = { ...searchValues, sortField: field, sortDirection: newDirection };
        setSearchValues(newFilters);

        router.get('/app/admin/products', newFilters, {
            preserveState: true,
            replace: true
        });
    };

    return (
        <AppLayout>
            <Head title='Menú de Products' />

            {/* Cabecera principal */}
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
                <h1 className='text-3xl font-bold text-white'>Menú de Productos</h1>
                <Link
                    href='/app/admin/products/create'
                    className='px-6 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors'
                >
                    + Nuevo Producto
                </Link>
            </div>

            {/* Barra de búsqueda */}
            <div className='bg-gray-900 p-4 roudned-lg mb-6 border border-gray-800'>
                <form
                    onSubmit={handleSearch}
                    className='flex flex-col md:flex-row gap-4 w-full'>

                    <div className='flex-1 w-full h-full'>
                        <input 
                            type='text'
                            name='search'
                            value={searchValues.search}
                            onChange={handleChange}
                            placeholder='Buscar café, tarta, bebida...'
                            className='w-full bg-gray-800 text-white border border-gray-700 hover:bg-gray-600 active:bg-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-amber-500'
                        />
                    </div>

                    <div className='flex gap-2 w-full md:w-auto'>
                        <button
                            type='submit'
                            className='flex-1 md:flex-none px-6 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-600 cursor-pointer text-white font-semibold rounded-lg transition-colors'
                        >
                            Buscar
                        </button>
                        {(setSearchValues.search || searchValues.sortField !== 'created_at' || searchValues.sortDirection !== 'desc') && (
                            <button
                                type='button'
                                onClick={handleReset}
                                className='flex-1 md:flex-none px-4 py-2 bg-gray-700 hover:bg-gray-600 active:bg-gray-600 cursor-pointer text-white font-semibold rounded-lg transition-colors'
                            >
                                Limpiar
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Tabla de Productos */}
            <div className='bg-gray-900 rounded-lg overflow-x-auto w-full border border-gray-800 select-none'>
                <table className='w-full min-w-[800px'>
                    <thead className={styles.tableHeader}>
                        <tr>
                            <th
                                className={`${styles.th} text-left cursor-pointer hover:bg-gray-800 transition-colors group w-1/3`}
                                onClick={() => handleSort('name')}
                            >
                                Nombre del Producto <SortIcon filed='name' />
                            </th>
                            <th
                                className={`${styles.th} text-left cursor-pointer hover:bg-gray-800 transition-colors group w-1/3`}
                                onClick={() => handleSort('price')}
                            >
                                Precio <SortIcon field='price' />
                            </th>
                            <th
                                className={`${styles.th} text-left cursor-pointer hover:bg-gray-800 transition-colors group w-1/3`}
                                onClick={() => handleSort('is_active')}
                            >
                                Estado <SortIcon field='is_active' />
                            </th>
                            <th
                                className={`${styles.th} text-left cursor-pointer hover:bg-gray-800 transition-colors group w-1/3`}
                                onClick={() => handleSort('created_at')}
                            >
                                Fecha de alta <SortIcon field='created_at' />
                            </th>
                            <th className={`${styles.th} text-center`}>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className={styles.tableBody}>
                        {products.data.length > 0 
                            ? (
                                products.data.map((product) => (
                                    <tr key={product.id} className='hover:bg-gray-800 active:bg-gray-800 transition-colors border-b border-gray-800 last:border-0'>
                                        <td className={`${styles.td} font-medium`}>
                                            <div className='flex items-center gap-3'>
                                                <div className='w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-amber-500'>
                                                    ☕
                                                </div>
                                                {product.name}
                                            </div>
                                        </td>
                                        <td className={`${styles.td} text-center font-semibold text-amber-400`}>
                                            {product.price}
                                        </td>
                                        <td className={`${styles.td} text-center`}>
                                            <span className={`px-2 py-1 rounded-md font-medium text-xs
                                                ${product.is_active
                                                    ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                                    : 'bg-red-500/10 text-red-400 border border-red-500/20'
                                                }
                                            `}>
                                                {product.is_active ? 'Disponible' : 'Agotado/Oculto'}
                                            </span>
                                        </td>
                                        <td className={`${styles.td} text-sm text-center text-gray-400`}>
                                            {product.created_at}
                                        </td>
                                        <td className={styles.td}>
                                            <div className='flex w-full justify-center gap-2'>
                                                <Link
                                                    href={`/app/admin/products/${product.id}/edit`}
                                                    className='px-3 py-2 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-gray-900 text-sm font-semibold rounded transition-colors'
                                                >
                                                    Editar
                                                </Link>
                                                <button 
                                                    onClick={() => handleDelete(product.id)}
                                                    className='px-3 py-2 bg-red-500 hover:bg-red-600 active:bg-red-600 cursor-pointer text-white text-sm font-semibold rounded transition-colors'
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan='5' className='px-6 py-8 text-center text-gray-400'>
                                        No se han encontrado productos con esos filtros.
                                    </td>
                                </tr>
                            )}
                    </tbody>
                </table>

                {/* Paginación */}
                {products.links.length > 3 && (
                    <div className='px-6 py-4 bg-gray-800 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left'>
                        <div className='text-sm text-gray-400'>
                            Mostrando {products.from || 0} - {products.to || 0} de {products.total} productos
                        </div>
                        <div className='flex flex-wrap justify-center gap-2'>
                            {products.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`px-3 py-2 rounded text-sm transition-colors
                                        ${link.active ? 'bg-amber-500 text-gray-900 font-semibold' : 'bg-gray-700 text-gray-300 hover:bg-gray-600 active:bg-gray-600'}   
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
    )
}