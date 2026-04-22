import AppLayout from '@/Layouts/AppLayout';
import { App, Head, Link } from '@inertiajs/react';
import ProductForm from '@/Components/ProductForm';

export default function Edit({ product }) {
    return (
        <AppLayout>
            <Head title={`Editar Producto: ${product.name}`} />

            <div className='max-w-3xl mx-auto'>
                {/* Cabecera */}
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>
                    <h1 className='text-3xl font-bold text-white'>
                        Editar Producto: <span className='text-amber-500'>{product.name}</span>
                    </h1>
                    <Link
                        href={`/app/admin/products/${product.id}`}
                        className='px-6 py-3 bg-gray-700 hover:bg-gray-600 active:bg-gray-600 text-white font-semibold rounded-lg transition-colors'
                    >
                        Volver a Detalles
                    </Link>
                </div>

                {/* Contenedor del Formulario */}
                <div className='bg-gray-900 p-6 sm:p-8 rounded-lg border border-gray-800 shadow-lg'>
                    <ProductForm
                        product={product}
                        submitUrl={`/app/admin/products/${product.id}`}
                        submitText='Actualizar Producto'
                        isEditing={true}
                    />
                </div>
            </div>
        </AppLayout>
    );
}