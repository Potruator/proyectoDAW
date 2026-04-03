import AppLayout from '@/Layouts/AppLayout';
import OfferForm from '@/Components/OfferForm';
import { Head } from '@inertiajs/react';

export default function Edit({ offer }) {
    return (
        <AppLayout>
            <Head title='Editar Oferta'/>
            <div className='max-w-3xl'>
                <h1 className='text-3xl font-bold text-white mb-6'>Editar Oferta</h1>
                <div className='bg-gray-900 rounded-lg p-8 border border-gray-800'>
                    <OfferForm offer={offer} submitUrl={`/app/admin/offers/${offer.id}`} submitText='Actualizar Oferta' isEditing={true} />
                </div>
            </div>
        </AppLayout>
    )
}