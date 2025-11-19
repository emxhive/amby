import type { PersonalDetails, Step } from './types';

export const steps: Step[] = [{ label: 'Personal details' }, { label: 'Payment' }, { label: 'Complete' }];

export const initialPersonalDetails: PersonalDetails = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
};

export const paymentMethods = [
    {
        id: 'card',
        label: 'Credit / Debit Card',
        description: 'Pay with your bank card securely.',
    },
    {
        id: 'transfer',
        label: 'Bank Transfer',
        description: 'Send directly from your bank app.',
    },
    {
        id: 'wallet',
        label: 'Wallet',
        description: 'Use your Amby wallet balance.',
    },
];

// constants.ts
export const countries = [
    { code: 'NG', name: 'Nigeria' },
    { code: 'GH', name: 'Ghana' },
    { code: 'US', name: 'United States' },
    // ...add more as needed
];

export const phoneCountryCodes = [
    { code: '+234', country: 'NG' },
    { code: '+233', country: 'GH' },
    { code: '+1', country: 'US' },
    // ...
];

export const savedAddresses = [
    {
        id: 1,
        label: 'Home',
        firstName: 'Ezekiel',
        lastName: 'Adeleke',
        email: 'zeki@email.com',
        phone: '+234 808 888 8888',
        country: 'NG',
        address: '11 Osbourne Rd, Ikoyi',
        city: 'Lagos',
        state: 'Lagos',
        postalCode: '101233',
        extraInfo: '',
    },
    {
        id: 2,
        label: 'Work',
        firstName: 'Zeki',
        lastName: 'Ola',
        email: 'zekiola@email.com',
        phone: '+234 802 123 4321',
        country: 'NG',
        address: '12 Norman Williams St, Ikoyi',
        city: 'Lagos',
        state: 'Lagos',
        postalCode: '101222',
        extraInfo: 'Leave at reception',
    },
];
