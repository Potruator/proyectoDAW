import { Head, Link, usePage } from '@inertiajs/react';

export default function Home({ appName, featuredOffers, upcomingEvents }) {
    const { auth } = usePage().props;
    const userRole = auth?.user?.role;

    return (
        <>
            <Head title="Inicio"/>

            {/* HERO SECTION */}
            <section className='relative bg-gray-900 border-b border-gray-800'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 flex flex-col items-center text-center'>
                    <h1 className='text-5xl md:text-6xl font-black text-white tracking-tight mb-6 uppercase'>
                        Bienvenido a <span className='text-amber-400'>{appName}</span>
                    </h1>
                    <p className='text-xl text-gray-400 max-w-2xl mb-10'>
                        Disfruta de la mejor experiencia, eventos exclusivos y ofertas diseñadas especialmente para ti. Inicia sesión o regístrate en nuestra aplicación
                        para estar al día de los últimos eventos y ofertas.
                    </p>
                    <div className='flex flex-col sm:flex-row gap-4'>
                        <Link
                            href='/offers'
                            className='px-8 py-3 bg-amber-400 text-gray-950 font-bold rounded-lg hover:bg-amber-300 active:bg-amber-300 transition-colors shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                        >
                            Ver Promociones
                        </Link>
                        {userRole && (
                            <Link
                                href={`/app/${userRole}/`}
                                className='px-8 py-3 bg-gray-800 text-gray-100 font-bold rounded-lg border border-gray-700 hover:bg-gray-700 active:bg-amber-700 transition-colors'
                            >
                                Acceder a mi panel
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* SECCIÓN: OFERTAS DESTACADAS */}
            <section className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
                <div className='flex justify-between items-end mb-10'>
                    <div>
                        <h2 className='text-3xl font-bold text-amber-400 uppercase tracking-tight'>Ofertas Destacadas</h2>
                        <p className='text-gray-400 mt-2'>Aprovecha estos descuentos por tiempo limitado.</p>
                    </div>
                    <Link 
                        href='/offers'
                        className='hidden sm:block text-amber-400 hover:text-amber-300 active:text-amber-300 font-medium'
                    >
                        Ver todas &rarr;
                    </Link>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {featuredOffers && featuredOffers.length > 0
                        ? (
                            featuredOffers.map(offer => (
                                <div key={offer.id} className='bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg hover:border-amber-400/50 active:border-amber-400/50 transition-colors flex flex-col'>
                                    <h3 className='text-xl font-bold text-gray-100 mb-2'>{offer.title}</h3>
                                    <p className='text-gray-400 mb-4 grow line-clamp-3'>{offer.description}</p>
                                    <div className='mt-auto pt-4 border-t border-gray-800'>
                                        <span className='inline-block bg-amber-400/10 text-amber-400 px-3 py-1 rounded-full text-sm font-bold'>
                                            {offer.discount_percentage}% Dto.
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className='col-span-3 text-center py-10 bg-gray-900 border border-gray-800 rounded-xl'>
                                <p className='text-gray-500 italic'>Nuevas ofertas estarán disponibles pronto.</p>
                            </div>
                        )
                    }
                </div>
            </section>

            {/* SECCIÓN: PRÓXIMOS EVENTOS */}
            <section className='bg-gray-900 border-t border-gray-800'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20'>
                    <div className='flex justify-between items-end mb-10'>
                        <div>
                            <h2 className='text-3xl font-bold text-gray-100 uppercase tracking-tight'>Próximos Eventos</h2>
                            <p className='text-gray-400 mt-2'>No te pierdas lo que tenemos preparado para ti.</p>
                        </div>
                        <Link 
                            href='/events'
                            className='hidden sm:block text-amber-400 hover:text-amber-300 active:text-amber-300 font-medium'
                        >
                            Calendario completo &rarr;
                        </Link>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {upcomingEvents && upcomingEvents.length > 0
                            ? (
                                upcomingEvents.map(event => (
                                    <div key={event.id} className='bg-gray-950 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-600 active:border-gray-600 transition-colors'>
                                        <div className='p-6'>
                                            <div className='text-amber-400 font-semibold text-sm mb-2 uppercase tracking-wide'>
                                                {event.date
                                                    ? new Date(event.date).toLocaleString('es-ES', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })
                                                    : 'Próximamente'
                                                }
                                            </div>
                                            <h3 className='text-xl font-bold text-gray-100 mb-2'>{event.title}</h3>
                                            <p className='text-gray-400 text-sm line-clamp-2'>{event.description}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className='col-span-full text-center py-10'>
                                    <p className='text-gray-500 italic'>Aún no hay eventos programados.</p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    );
}