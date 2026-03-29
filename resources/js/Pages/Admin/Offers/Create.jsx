import AdminLayout from '@/Layouts/AdminLayout';
import OfferForm from '@/Components/OfferForm';
import { router } from '@inertiajs/react';

export default function Create() {
    const handleSubmit = (data) => {
        router.post(route('ofertas.store'), data);
    };

    return (
        <AdminLayout>
            <div className='max-w-3xl'>
                <h1 className='text-3xl font-bold text-white mb-6'>Crear nueva oferta</h1>

                <div className='bg-gray-900 rounded-lg p-8 border border-gray-800'>
                    <OfferForm onSubmit={handleSubmit} submitText='Crear Oferta' />
                </div>
            </div>
        </AdminLayout>
    );
}