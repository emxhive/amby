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
        index: 'shop.index',
        products: {
            index: 'shop.products.index',
            show: 'shop.products.show',
        },
        orders: {
            index: 'shop.orders.index',
            show: 'shop.orders.show',
        },

        checkout: 'shop.checkout',

        address: {
            index: 'shop.address.index',
            create: 'shop.address.create',
            store: 'shop.address.store',
            show: 'shop.address.show',
            edit: 'shop.address.edit',
            update: 'shop.address.update',
            destroy: 'shop.address.destroy',
        },
    },

    // Admin routes
    admin: {
        base: 'admin.base', // Generic admin route for not yet implemented features
        dashboard: 'admin.dashboard',
        products: {
            index: 'admin.products.index',
            create: 'admin.products.create',
            store: 'admin.products.store',
            show: 'admin.products.show',
            edit: 'admin.products.edit',
            update: 'admin.products.update',
            destroy: 'admin.products.destroy',
            upload: 'admin.products.upload',
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
        users: {
            index: 'admin.users.index',
            create: 'admin.users.create',
            store: 'admin.users.store',
            show: 'admin.users.show',
            edit: 'admin.users.edit',
            update: 'admin.users.update',
            destroy: 'admin.users.destroy',
        },
        categories: {
            index: 'admin.categories.index',
            create: 'admin.categories.create',
            store: 'admin.categories.store',
            show: 'admin.categories.show',
            edit: 'admin.categories.edit',
            update: 'admin.categories.update',
            destroy: 'admin.categories.destroy',
        },
        recipes: {
            index: 'admin.recipes.index',
            create: 'admin.recipes.create',
            store: 'admin.recipes.store',
            show: 'admin.recipes.show',
            edit: 'admin.recipes.edit',
            update: 'admin.recipes.update',
            destroy: 'admin.recipes.destroy',
        },
        reviews: {
            index: 'admin.reviews.index',
            create: 'admin.reviews.create',
            store: 'admin.reviews.store',
            show: 'admin.reviews.show',
            edit: 'admin.reviews.edit',
            update: 'admin.reviews.update',
            destroy: 'admin.reviews.destroy',
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

    // Account routes
    account: {
        orders: {
            index: 'account.orders.index',
            show: 'account.orders.show',
            update: 'account.orders.update',
            destroy: 'account.orders.destroy',
            cancel: 'account.orders.cancel',
            confirm: 'account.orders.confirm',
            ship: 'account.orders.ship',
            complete: 'account.orders.complete',
            refund: 'account.orders.refund',
            download: 'account.orders.download',
            download_invoice: 'account.orders.download_invoice',
        },

        addresses: {
            index: 'account.addresses.index',
            create: 'account.addresses.create',
            store: 'account.addresses.store',
            show: 'account.addresses.show',
            edit: 'account.addresses.edit',
            update: 'account.addresses.update',
            destroy: 'account.addresses.destroy',
        },
    },

    // Cart routes
    cart: {
        index: 'cart.index',
    },

    // Support/help routes
    support: {
        faq: 'support.faq',
        shipping: 'support.shipping',
        returns: 'support.returns',
        warranty: 'support.warranty',
        chat: 'support.chat',
        shipping_restrictions: 'support.shipping_restrictions',
    },

    // Static content pages
    pages: {
        recipes: 'pages.recipes',
        about: 'pages.about',
        contact: 'pages.contact',
        careers: 'pages.careers',
        terms: 'pages.terms',
    },

    // Blog routes
    blog: {
        index: 'blog.index',
        category: 'blog.category',
    },

    // Appearance settings
    appearance: 'appearance',
};
