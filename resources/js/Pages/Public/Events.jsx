import { Head } from '@inertiajs/react';

export default function Events({ events }) {
    return (
        <>
            <Head title='Calendario de Eventos' />

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full'>
                {/* Cabecera */}
                <div className='mb-12 text-center md:text-left border-b border-gray-800 pb-8'>
                    <h1 className='text-4xl md:text-5xl font-black text-white tracking-tight uppercase mb-4'>
                        Próximos <span className='text-amber-400'>Eventos</span>
                    </h1>
                    <p className='text-gray-400 text-lg max-w-2xl'>
                        Música en vivo, catas, fiestas temáticas y mucho más. Marca las fechas en tu calendario
                        y ven a disfrutar con nosotros.
                    </p>
                </div>

                {/* Lista/Cuadrícula de Eventos */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10'>
                    {events && events.length > 0 
                        ? (
                            events.map(event => (
                                <div key={event.id} className='bg-gray-900 flex flex-col sm:flex-row border border-gray-800 rounded-2xl overflow-hidden shadow-xl hover:border-gray-600 active:border-gray-600 transition-all group'>

                                    {/* Bloque de Fecha Destacada */}
                                    <div className='bg-gray-950 sm:w-1/3 p-6 flex flex-col items-center justify-centerborder-b sm:border-b-0 sm:border-r border-gray-800 text-center'>
                                        {event.date
                                            ? (
                                                <>
                                                    <span className='text-amber-400 font-bold uppercase tracking-widest text-sm mb-1'>
                                                        {new Date(event.date).toLocaleDateString('es-ES', { month: 'short' })}
                                                    </span>
                                                    <span className='text-white font-black text-5xl mb-1'>
                                                        {new Date(event.date).toLocaleDateString('es-ES', { day: 'numeric' })}
                                                    </span>
                                                    <span className='text-gray-500 font-medium text-sm'>
                                                        {new Date(event.date).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })} h
                                                    </span>
                                                </>
                                            ) : (
                                                <span className='text-amber-400 font-bold uppercase tracking-widest text-sm'>Próximamente</span>
                                            )
                                        }
                                    </div>

                                    {/* Detalles del Evento */}
                                    <div className='p-6 sm:w-2/3 flex flex-col justify-center'>
                                        <h3 className='text-2xl font-bold text-gray-100 mb-3 group-hover:text-amber-400 group-active:text-amber-400 transition-colors'>
                                            {event.title}
                                        </h3>
                                        <p className='text-gray-400 text-base'>
                                            {event.description}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='col-span-full flex flex-col items-center justify-center py-20 bg-gray-900/50 border border-gray-800 roudned-2xl'>
                                <svg className="w-16 h-16 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className='text-gray-400 text-lg'>Aún no hay eventos programados en el calendario.</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    );
}