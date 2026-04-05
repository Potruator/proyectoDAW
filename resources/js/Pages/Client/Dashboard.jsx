import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard({ offers }) {
    return (
        <AppLayout>
            <Head title='Mis Ofertas' />

            <div className='py-8 px-4 max-w-2xl mx-auto'>
                <h1 className='text-2xl font-bold mb-6'>Mis Ofertas Disponibles</h1>

                {offers.length > 0 
                    ? (
                        <div className='grid gap-6'>
                            {offers.map((item) => (
                                <Link
                                    key={item.uuid}
                                    href={`/app/client/offers/${item.uuid}`}
                                    className='group block bg-gray-900 border-gray-800 rounded-2xl p-5 shadow-sm border hover:shadow-md active:border-amber-200 hover:border-amber-200 active:scale-[0.98] transition-all'
                                >
                                    <div className='flex justify-between items-start'>
                                        <div className='flex-1'>
                                            <h3 className='text-lg font-bold group-hover:text-amber-400 transition-colors'>
                                                {item.title}
                                            </h3>
                                            <p className='text-gray-400 text-sm mt-1'>
                                                {item.description}
                                            </p>
                                            <span className='inline-block mt-4 text-xs font-medium text-gray-400 uppercase tracking-widest'>
                                                Obtenida {item.assigned_at}
                                            </span>
                                        </div>
                                        <div className='ml-4 p-3 rounded-xl group-hover:bg-amber-100 transition-colors'>
                                            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                            </svg>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )
                    : (
                        <div className='text-center py-200 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200'>
                            <p className="text-gray-400">No tienes ofertas disponibles en este momento</p>
                        </div>
                    )
                }
            </div>
        </AppLayout>
    );
}