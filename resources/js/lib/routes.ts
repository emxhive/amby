/**
 * This file contains all route names used in the application.
 * It's generated for frontend use.
 */

export const routes = {
    // Main routes
    main: {
        home: 'home',
        dashboard: 'dashboard',
    },

    // Shop routes
    shop: {
        products: {
            index: 'shop.products.index',
            show: 'shop.products.show',
        },
        orders: {
            index: 'orders.index',
            show: 'orders.show',
        },
        address: {
            index: 'address.index',
            create: 'address.create',
            store: 'address.store',
            show: 'address.show',
            edit: 'address.edit',
            update: 'address.update',
            destroy: 'address.destroy',
        },
    },

    // Admin routes
    admin: {
        products: {
            index: 'admin.products.index',
            create: 'admin.products.create',
            store: 'admin.products.store',
            show: 'admin.products.show',
            edit: 'admin.products.edit',
            update: 'admin.products.update',
            destroy: 'admin.products.destroy',
        },
        orders: {
            index: 'admin.orders.index',
            create: 'admin.orders.create',
            store: 'admin.orders.store',
            show: 'admin.orders.show',
            edit: 'admin.orders.edit',
            update: 'admin.orders.update',
            destroy: 'admin.orders.destroy',
        },
    },

    // Auth routes
    auth: {
        register: 'register',
        login: 'login',
        logout: 'logout',
        password: {
            request: 'password.request',
            email: 'password.email',
            reset: 'password.reset',
            store: 'password.store',
            confirm: 'password.confirm',
            edit: 'password.edit',
            update: 'password.update',
        },
        verification: {
            notice: 'verification.notice',
            verify: 'verification.verify',
            send: 'verification.send',
        },
    },

    // Profile/Settings routes
    profile: {
        edit: 'profile.edit',
        update: 'profile.update',
        destroy: 'profile.destroy',
    },

    // Appearance settings
    appearance: 'appearance',
};
