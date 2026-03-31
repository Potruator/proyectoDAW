import AdminLayout from '@/Layouts/AdminLayout';
import OfferForm from '@/Components/OfferForm';
import { Head } from '@inertiajs/react';

export default function Create() {
    return (
        <AdminLayout>
            <Head title='Crear Oferta'/>
            <div className='w-full'>
                <h1 className='text-3xl font-bold text-white mb-6'>Crear nueva oferta</h1>
                <div className='bg-gray-900 rounded-lg p-8 border border-gray-800'>
                    <OfferForm submitUrl='/app/admin/offers' submitText='Crear Oferta' isEditing={false}/>
                </div>
            </div>
        </AdminLayout>
    );
}