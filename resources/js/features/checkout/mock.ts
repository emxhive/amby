export const checkoutMock = {
    addresses: [
        {
            id: 'addr_default',
            name: 'Zeki',
            label: 'Ugbowo Quarters',
            line1: 'House 26, EDU Road',
            city: 'Benin City',
            state: 'Edo',
            tag: 'Default',
        },
        {
            id: 'addr_last_used',
            name: 'Zeki',
            label: 'Ikeja Office',
            line1: '12B Isaac John Street',
            city: 'Ipaja',
            state: 'Lagos',
            tag: 'Last Used',
        },
    ],
    shippingMethods: [
        {
            id: 'standard',
            label: 'Standard Delivery (3–5 days)',
            description: 'Delivered in 3–5 business days.',
            price: '$4.00',
        },
        {
            id: 'express',
            label: 'Express Delivery (1–2 days)',
            description: 'Delivered in 1–2 business days.',
            price: '$12.00',
        },
    ],
    paymentMethods: [
        {
            id: 'stripe',
            label: 'Stripe',
            // description: 'Pay securely with your card.',
            description: '',
        },
        {
            id: 'cod',
            label: 'Cash on Delivery',
            description: '',

            // description: 'Pay when your order arrives.',
        },
        {
            id: 'bank',
            label: 'Bank Transfer',
            description: '',

            // description: 'Send payment from your bank.',
        },
    ],
    contactInfoDefaults: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    },
};
