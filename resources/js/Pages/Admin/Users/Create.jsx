import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import UserForm from '@/Components/UserForm';

export default function Create() {
    return (
        <AppLayout>
            <Head title='Crear Usuario'/>
            <div className='w-full'>
                <h1 className='text-3xl font-bold text-white mb-6'>Crear nuevo usuario</h1>
                <div className='bg-gray-900 rounded-lg p-8 border border-gray-800'>
                    <UserForm submitUrl='/app/admin/users' submitText='Crear Usuario' isEditing={false} />
                </div>
            </div>
        </AppLayout>
    );
}