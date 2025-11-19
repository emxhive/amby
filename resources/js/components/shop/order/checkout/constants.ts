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

