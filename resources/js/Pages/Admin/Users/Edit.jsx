import AdminLayout from '@/Layouts/AdminLayout';
import { Head } from '@inertiajs/react';
import UserForm from '@/Components/UserForm';

export default function Edit({ user }) {
    return (
        <AdminLayout>
            <Head title='Editar Usuario'/>
            <div className='max-w-3xl'>
                <h1 className='text-3xl font-bold text-white mb-6'>Editar Usuario</h1>
                <div className='bg-gray-900 rounded-lg p-8 border border-gray-800'>
                    <UserForm user={user} submitUrl={`/app/admin/users/${user.id}`} submitText='Actualizar Usuario' isEditing={true} />
                </div>
            </div>
        </AdminLayout>
    )
}