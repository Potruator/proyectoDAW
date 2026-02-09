import React from 'react';

// Fíjate en el "export default" al principio de la función
export default function Home({ featuredOffers }) {
    console.log(featuredOffers); // Esto sí es un log útil
    return (
        <div>
            <h1>Ofertas del Bar</h1>
            <ul>
                {featuredOffers.map(offer => (
                    <li key={offer.id}>{offer.title} - {offer.price}€</li>
                ))}
            </ul>
        </div>
    );
}