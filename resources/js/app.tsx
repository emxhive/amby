import '../css/app.css';

import { ModalProvider } from '@/components/mx/modal-system/use-modal-system';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// noinspection JSIgnoredPromiseFromCall
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ModalProvider>
                <App {...props} />
            </ModalProvider>,
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode onload...
initializeTheme();
