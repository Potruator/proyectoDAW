import AppLayout from '@/Layouts/AppLayout';
import { scanSuccessSound } from '@/utils/sounds';
import { Head, router, usePage, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner';

export default function Scan() {
    // Recuperamos los mensajes flash del controlador
    const { flash, auth } = usePage().props;

    // Detectamos el rol para construir la ruta
    const userRole = auth.user.role;
    const baseUrl = `/app/${userRole}`;

    // Estados para evitar comportamiento incontrolado del escáner
    const [processing, setProcessing] = useState(false);
    const [lastScanned, setLastScanned] = useState(null);

    const handleScan = (detectedCodes) => {
        // 1. Si ya estamos procesando un código, ignoramos la cámara
        if (processing) return;

        // 2. Extraer el valor del QR
        const value = Array.isArray(detectedCodes) ? detectedCodes[0].rawValue : detectedCodes;

        // 3. Evitamos escanear algo vacío o el mismo QR dos veces seguidas muy rápido
        if(!value || value === lastScanned) return;

        // 4. Bloqueamos la cámara visualmente e iniciamos la petición
        setProcessing(true);
        setLastScanned(value);

        // 5. Enviamos el UUID al backend
        router.post(`${baseUrl}/scan/${value}`, {}, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => {
                setProcessing(false);
                // Tras 3 segundos, permitimos volver a escanear ese mismo código (por si dio error y se quiere reintentar)
                setTimeout(() => setLastScanned(null), 3000);
            }
        });
    };

    return (
        <AppLayout>
            <Head title='Escanear Oferta' />

            <div className='max-w-md mx-auto h-full flex flex-col justify-center space-y-6 relative pb-6'>
                {/* Cabecera y Botón de Volver */}
                <div className='flex items-center justify-between'>
                    <div>
                        <h2 className='text-2xl font-bold text-white mb-1'>Escanear QR</h2>
                        <p className='text-gray-400 text-sm'>
                            Apunta con la cámara al código del cliente
                        </p>
                    </div>
                    <Link
                        href={baseUrl}
                        className='p-2 bg-gray-800 hover:bg-gray-700 active:bg-gray-700 rounded-lg text-gray-300 transition-colors'
                        title='Volver al inicio'
                    >
                       <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg> 
                    </Link>
                </div>

                {/* Contenedor de la Cámara */}
                <div className='bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden relative shadow-xl shadow-black/50'>
                    {/* Pantalla de carga superpuesta cuando se está enviando al backend */}
                    {processing && (
                        <div className='absolute inset-0 bg-black/70 z-20 flex flex-col items-center justify-center backdrop-blur-sm'>
                            <svg className="animate-spin h-12 w-12 text-amber-500 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <p className='text-amber-400 font-bold text-lg animate-pulse'>Verificando...</p>
                        </div>
                    )}

                    {/* El componente Escáner */}
                    <div className='aspect-square relative w-full bg-black flex items-center justify-center'>
                        <Scanner
                            onScan={handleScan}
                            formats={['qr_code']}
                            sound={scanSuccessSound}
                            components={{
                                audio:false,
                                tracker: true
                            }}
                        />

                        {/* Diseño de mirilla (UI) */}
                        <div className='absolute inset-0 border-2 border-amber-500/20 m-12 rounded-2xl pointer-events-none z-10'>
                            <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-amber-500 rounded-tl-2xl -ml-1 -mt-1"></div>
                            <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-amber-500 rounded-tr-2xl -mr-1 -mt-1"></div>
                            <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-amber-500 rounded-bl-2xl -ml-1 -mb-1"></div>
                            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-amber-500 rounded-br-2xl -mr-1 -mb-1"></div>
                        </div>
                    </div>
                </div>

                {/* Botón para ir a la entrada manual */}
                <div className='text-center pt-2'>
                    <p className='text-sm text-gray-400 mb-3'>¿Problemas para leer el código?</p>
                    <Link
                        href={`${baseUrl}/scan/manual`}
                        className='flex items-center justify-center space-x-2 w-full bg-gray-800 hover:bg-gray-700 active:bg-gray-700 text-white font-bold py-4 px-4 rounded-2xl transition-colors border border-gray-700'
                    >
                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        <span>Introducir código manualmente</span>
                    </Link>
                </div>

                {/* Zona de Alertas Flash */}
                <div className='absolute bottom-0 left-0 right-0 z-50'>
                    {flash?.success && (
                        <div className='bg-green-500/10 border-green-500/50 text-green-400 p-4 rounded-xl text-center'>
                            <div className='flex items-center justify-center space-x-2 mb-1'>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                <span className="font-bold">¡Éxito!</span>
                            </div>
                            <p className='text-sm font-medium'>{flash.success}</p>
                        </div>
                    )}

                    {flash?.error && (
                        <div className='bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl text-center'>
                            <div className='flex items-center justify-center space-x-2 mb-1'>
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                <span className="font-bold">Error</span>
                            </div>
                            <p className='text-sm font-medium'>{flash.error}</p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    )
}