import AdminLayout from '@/Layouts/AdminLayout';
import OfferForm from '@/Components/OfferForm';
import { router } from '@inertiajs/react';

export default function Edit({ offer }) {
    const handleSubmit = (data) => {
        router.put(`/app/admin/offers/${offer.id}`, data, {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout>
            <div className='max-w-3xl'>
                <h1 className='text-3xl font-bold text-white mb-6'>Editar Oferta</h1>

                <div className='bg-gray-900 rounded-lg p-8 border border-gray-800'>
                    <OfferForm offer={offer} onSubmit={handleSubmit} submitText='Actualizar Oferta' />
                </div>
            </div>
        </AdminLayout>
    )
}