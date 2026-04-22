import AppLayout from '@/Layouts/AppLayout';
import { Head, router, usePage, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function ManualScan() {
    const { flash, auth } = usePage().props;
    const userRole = auth.user.role;
    const baseUrl = `/app/${userRole}`;

    const [manualCode, setManualCode] = useState('');
    const [processing, setProcessing] = useState(false);

    const handleManualSubmit = (e) => {
        e.preventDefault();

        if (!manualCode.trim() || processing) return;

        setProcessing(true);

        router.post(`${baseUrl}/scan/${manualCode.trim()}`, {}, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {
                setProcessing(false);
                setManualCode('');
            }
        });
    };

    return (
        <AppLayout>
            <Head title='Entrada Manual de Oferta' />

            <div className='max-w-md mx-auto py-4 space-y-6'>
                {/* Cabecera y Botón de Volver */}
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-2xl font-bold text-white mb-1'>Código Manual</h2>
                        <p className='text-gray-400 text-sm'>
                            Introduce el código ID del cliente
                        </p>
                    </div>
                    {/* Botón para volver a la cámara */}
                    <Link
                        href={`${baseUrl}/scan`}
                        className='p-2 bg-gray-800 hover:bg-gray-700 active:bg-gray-700 rounded-lg text-gray-300 transition-colors'
                        title='Volver a la cámara'
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </Link>
                </div>

                {/* Formulario Principal */}
                <div className='bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl'>
                    <form onSubmit={handleManualSubmit} className='flex flex-col space-y-4'>
                        <div>
                            <label className='block text-sm text-gray-400 font-semibold mb-2 uppercase tracking-wider'>
                                UUID de la Oferta
                            </label>
                            <input
                                type='text'
                                autoFocus // Cursor automáticamente al entrar a la página
                                value={manualCode}
                                onChange={(e) => setManualCode(e.target.value)}
                                placeholder='Ej: e4b2-8f9a...'
                                className='w-full bg-gray-950 border-2 border-gray-700 text-white text-lg rounded-xl px-4 py-4 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors placeholder-gray-600 text-center font-mono tracking-widest'
                                disabled={processing}
                            />
                        </div>
                        <button
                            type='submit'
                            disabled={!manualCode.trim() || processing}
                            className='w-full py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 font-bold text-lg px-6 py4 rounded-xl transition-colors flex justify-center items-center'
                        >
                            {processing 
                                ? (
                                    <svg className="animate-spin h-6 w-6 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    'Canjear Oferta'
                                )
                            }                            
                        </button>
                    </form>
                </div>

                {/* Zona de Alertas Flash */}
                <div className='h-24'>
                    {flash?.success && (
                        <div className='bg-green-500/10 border-green-500/50 text-green-400 p-4 rounded-xl text-center'>
                            <p className='text-sm font-medium'>{flash.success}</p>
                        </div>
                    )}

                    {flash?.error && (
                        <div className='bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-center'>
                            <p className='text-sm font-medium'>{flash.error}</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    )
}