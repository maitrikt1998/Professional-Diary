import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';

createInertiaApp({
    resolve: async (name) => {
        const pages = import.meta.glob('./Pages/**/*.tsx', {
            eager: true,
        });

        const page = pages[`./Pages/${name}.tsx`];

        if (!page) {
            throw new Error(`Page not found: ${name}`);
        }

        return (page as { default: React.ComponentType }).default;
    },

    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
