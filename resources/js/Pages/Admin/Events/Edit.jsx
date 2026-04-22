import AppLayout from '@/Layouts/AppLayout';
import EventForm from '@/Components/EventForm';
import { Head } from '@inertiajs/react';

export default function Edit({ event }) {
    return (
        <AppLayout>
            <Head title='Editar Evento'/>
            <div className='max-w-3xl mx-auto'>
                <h1 className='text-3xl font-bold text-white mb-6'>Editar Evento</h1>
                <div className='bg-gray-900 rounded-lg p-8 border border-gray-800'>
                    <EventForm event={event} submitUrl={`/app/admin/events/${event.id}`} submitText='Actualizar Evento' isEditing={true} />
                </div>
            </div>
        </AppLayout>
    )
}