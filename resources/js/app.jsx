import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import Layout from './Layout';

createInertiaApp({
    title: (title) => `${title} - Mi Bar`,
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        const page =  pages[`./Pages/${name}.jsx`];
        page.default.layout = page.default.layout || (page => <Layout children={page} />);
        return page.default;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});