import { Head } from '@inertiajs/react';

export default function Offers({ offers }) {
    return (
        <>
            <Head title='Ofertas Disponibles' />

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full'>
                {/* Cabecera */}
                <div className='mb-12 text-center md:text-left border-b border-gray-800 pb-8'>
                    <h1 className='text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-4'>
                        Nuestras <span className='text-amber-400'>Ofertas</span>
                    </h1>
                    <p className='text-gray-400 text-lg max-w-2xl'>
                        Descubre todos los descuentos y promociones que tenemos activos. 
                        Canjea estas ofertas directamente en nuestro local desde tu panel de usuario.
                    </p>
                </div>

                {/* Cuadrícula de Ofertas */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {offers && offers.length > 0 
                        ? (
                            offers.map(offer => (
                                <div key={offer.id} className='bg-gray-900 border border-gray-800 rounded-2xl p-6 shadow-xl hover:border-amber-400/50 hover:shadow-[0_0_20px_rgba(251,191,36,0.1)] transition-all flex flex-col group'>
                                    <h3 className='text-2xl font-bold text-gray-100 mb-3 group-hover:text-amber-400 transition-colors'>
                                        {offer.title}
                                    </h3>
                                    <p className='text-gray-400 mb-6 grow'>
                                        {offer.description}
                                    </p>

                                    <div className='mt-auto pt-5 border-t border-gray-800 flex justify-between items-center'>
                                        <span className='text-amber-400 font-black text-xl'>
                                            {offer.discount_percentage}% Dto.
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='col-span-full flex flex-col items-center justify-center py-20 bg-gray-900/50 border border-gray-800 rounded-2xl'>
                                <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                <p className='text-gray-400 text-lg'>No hay ofertas disponibles en este momento.</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}