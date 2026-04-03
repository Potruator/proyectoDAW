import AppLayout from '@/Layouts/AppLayout';
import EventForm from '@/Components/EventForm';
import { Head } from '@inertiajs/react';

export default function Create() {
    return (
        <AppLayout>
            <Head title='Crear Evento'/>
            <div className='w-full'>
                <h1 className='text-3xl font-bold text-white mb-6'>Crear nuevo evento</h1>
                <div className='bg-gray-900 rounded-lg p-8 border border-gray-800'>
                    <EventForm submitUrl='/app/admin/events' submitText='Crear Evento' isEditing={false}/>
                </div>
            </div>
        </AppLayout>
    );
}