import { Head } from '@inertiajs/react';
import React from 'react';

export default function Home({ featuredOffers }) {
    console.log(featuredOffers); 
    return (
        <div>
            <Head title="Welcome"/>
            <h1>Ofertas del Bar</h1>
            <ul>
                {featuredOffers.map(offer => (
                    <li key={offer.id}>{offer.title} - {offer.price}€</li>
                ))}
            </ul>
        </div>
    );
}