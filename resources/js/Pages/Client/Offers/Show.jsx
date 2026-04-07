import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { QRCodeSVG } from 'qrcode.react';

export default function Show({ userOffer }) {
    return (
        <AppLayout>
            <Head title={`Canjear ${userOffer.title}`} />

            <div className='h-full flex items-center justify-center'>
                <div className='w-full max-w-sm sm:p-10 mx-auto rounded-3xl shadow-2xl text-center'>
                    <h2 className='text-2xl font-bold mb-2'>
                        {userOffer.title}
                    </h2>
                    <p className='text-gray-500 mb-8'>
                        Muestra este código al camarero para canjear tu oferta
                    </p>

                    {/* Generador de QR */}
                    <div className='bg-gray-50 p-6 rounded-2xl inline-block mb-8 border-4 border-amber-400'>
                        <QRCodeSVG 
                            value={userOffer.uuid}
                            size={200}
                            bgColor={'#f9fafb'}
                            fgColor={'#111827'}
                            level={'L'}
                            marginSize={0}
                        />
                    </div>

                    <div className='space-y-4'>
                        <p className='text-xs text-gray-400 uppercase tracking-widest font-mono'>
                            ID: {userOffer.uuid}
                        </p>

                        <Link
                            href='/app/client'
                            className='px-6 py-3  bg-amber-500 hover:bg-amber-600 active:bg-amber-600 text-gray-900 font-semibold rounded-lg transition-colors'
                        >
                            Volver atrás
                        </Link>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}