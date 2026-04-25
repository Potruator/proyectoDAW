import AppLayout from '@/Layouts/AppLayout';
import { usePage, Head } from '@inertiajs/react';

export default function Dashboard({
    stats,
    topOffers,
    recentRedemptions,
    recentUsers,
    upcomingEvents,
    redemptionsByMonth
}) {

    const maxRedemptions = Math.max(...redemptionsByMonth.map(i => i.count)) || 1;

    return (
        <AppLayout>
            <Head title='Dashboard'/>
            {/* Estadísticas */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                {/* Total Usuarios */}
                <div className='bg-gray-900 rounded-lg p-6 border border-gray-800'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-400 text-sm'>Total Usuarios</p>
                            <p className='text-3xl font-bold text-white mt-2'>{stats.total_users}</p>
                            <p className='text-xs text-gray-500 mt-1'>
                                <span className='text-blue-400'>{stats.total_clients} clientes</span> |
                                <span className='text-green-400'> {stats.total_staff} staff</span> |
                                <span className='text-amber-400'> {stats.total_admin} admin</span>
                            </p>
                        </div>
                        <div className='w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center'>
                            <svg className='w-6 h-6 text-blue-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Total Ofertas */}
                <div className='bg-gray-900 rounded-lg p-6 border border-gray-800'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-400 text-sm'>Ofertas</p>
                            <p className='text-3xl font-bold text-white mt-2'>{stats.total_offers}</p>
                            <p className='text-xs text-green-400 mt-1'>
                                {stats.active_offers} activas
                            </p>
                        </div>
                        <div className='w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center'>
                            <svg className='w-6 h-6 text-amber-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z' />
                            </svg>
                        </div>                    
                    </div>
                </div>

                {/* Total Events */}
                <div className='bg-gray-900 rounded-lg p-6 border border-gray-800'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-400 text-sm'>Eventos</p>
                            <p className='text-3xl font-bold text-white mt-2'>{stats.total_events}</p>
                            <p className='text-xs text-green-400 mt-1'>
                                {stats.upcoming_events} próximos
                            </p>
                        </div>
                        <div className='w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center'>
                            <svg className='w-6 h-6 text-purple-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Canjeos */}
                <div className='bg-gray-900 rounded-lg p-6 border border-gray-800'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p className='text-gray-400 text-sm'>Canjes</p>
                            <p className='text-3xl font-bold text-white mt-2'>{stats.total_redemptions}</p>
                            <p className='text-xs text-gray-500 mt-1'>
                                {stats.pending_redemptions} pendientes
                            </p>
                        </div>
                        <div className='w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center'>
                            <svg className='w-6 h-6 text-green-500' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gráfico y top ofertas */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
                {/* Gráfico de canjeos por mes */}
                <div className='bg-gray-900 rounded-lg p-6 border border-gray-800'>
                    <h3 className='text-lg font-semibold text-white mb-4'>Canjeos por mes</h3>

                    {/* Contenedor principal de la gráfica */}
                    <div className='h-64 flex items-end justify-between space-x-2'>
                        {redemptionsByMonth.map((item,index) => (
                            <div key={index} className='flex-1 flex flex-col h-full justify-end'>
                                <div
                                    className='w-full flex flex-col justify-end items-center bg-amber-500 rounded-t hover:bg-amber-400 active:bg-amber-400 transition-colors'
                                    style={{ height: `${ (item.count / maxRedemptions) * 100 }%`}}
                                    title={`${item.count} canjeos`}
                                >
                                    <span className={item.count > 0 ? 'text-gray-900' : 'text-white'}>{item.count}</span>
                                </div>
                                {/* Mes bajo la barra */}
                                <p className='text-xs text-center text-gray-400 mt-2'>{item.month}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top ofertas */}
                <div className='bg-gray-900 rounded-lg p-6 border border-gray-800'>
                    <h3 className='text-lg font-semibold text-white mb-4'>Ofertas más canjeadas</h3>
                    <div className='space-y-3'>
                        {topOffers.map((offer) => (
                            <div key={offer.id} className='flex items-center justify-between'>
                                <div className='flex-1'>
                                    <p className='text-white text-sm font-medium'>{offer.title}</p>
                                    <p className='text-gray-400 text-xs'>{offer.discount_percentage}% descuento</p>
                                </div>
                                <div className='flex items-center space-x-2'>
                                    <span className='text-amber-400 font-bold'>{offer.redemptions_count}</span>
                                    <span className='text-gray-500 text-xs'>canjes</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tablas */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                {/* Últimos canjeos */}
                <div className='bg-gray-900 rounded-lg p-6 border border-gray-800'>
                    <h3 className='text-lg font-semibold text-white mb-4'>Últimos canjeos</h3>
                    <div className='space-y-3'>
                        {recentRedemptions.map((redemption) => (
                            <div key={redemption.id} className='flex items-start justify-between border-b border-gray-800 pb-3'>
                                <div>
                                    <p className='text-white text-sm font-medium'>{redemption.offer_title}</p>
                                    <p className='text-gray-400 text-xs'>Cliente: {redemption.client_name}</p>
                                    <p className='text-gray-500 text-xs'>Staff: {redemption.staff_name}</p>
                                </div>
                                <span className='text-xs text-gray-400'>{redemption.redeemed_at}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Últimos usuarios */}
                <div className='bg-gray-900 rounded-lg p-6 border border-gray-800'>
                    <h3 className='text-lg font-semibold text-white mb-4'>Últimos usuarios</h3>
                    <div className='space-y-3'>
                        {recentUsers.map((user) => (
                            <div key={user.id} className='flex items-start justify-between border-b border-gray-800 pb-3'>
                                <div>
                                    <p className='text-white text-sm font-medium'>{user.name}</p>
                                    <p className='text-gray-400 text-xs'>{user.email}</p>
                                    <span className='inline-block mt-1 px-2 py-1 bg-blue-500/10 text-blue-400 text-xs rounded'>{user.role}</span>
                                </div>
                                <span className='text-xs text-gray-400'>{user.created_at}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Próximos eventos */}
            {upcomingEvents.length > 0 && (
                <div className='mt-6 bg-gray-900 rounded-lg p-6 border border-gray-800'>
                    <h3 className='text-lg font-semibold text-white mb-4'>Próximos eventos</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {upcomingEvents.map((event) => (
                            <div key={event.id} className='bg-gray-800 rounded-lg p-4 border border-gray-700'>
                                <h4 className='text-white font-semibold mb-2'>{event.title}</h4>
                                <div className='space-y-1 text-sm'>
                                    <p className='text-gray-400'>📅 {event.date}</p>
                                    <p className='text-gray-400'>🕑 {event.time}</p>
                                    <p className='text-gray-400'>📍 {event.location}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </AppLayout>
    );
}