import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import ProductForm from '@/Components/ProductForm';

export default function Create() {
    return (
        <AppLayout>
            <Head title='Nuevo Producto' />

            <div className='max-w-3xl mx-auto'>
                <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4'>                      
                    <h1 className='text-3xl font-bold text-white'>Añadir Nuevo Producto</h1>
                </div>

                <div className='bg-gray-900 p-8 rounded-lg border border-gray-800'>
                    <ProductForm
                        submitUrl='/app/admin/products'
                        submitText='Crear Producto'
                        isEditing={false}
                    />
                </div>
            </div>
        </AppLayout>
    )
}