import { pi } from '@/lib/utils';
import { ProductPreview } from '@/components/shop/product/types/show.types';

export const mockFilters = [
    {
        key: 'category',
        label: 'Category',
        type: 'checkbox',
        options: [
            { id: 'syrups', label: 'Syrups' },
            { id: 'spreads', label: 'Spreads' },
            { id: 'snacks', label: 'Snacks' },
            { id: 'combos', label: 'Combos' },
        ],
        selected: ['syrups'],
    },
    {
        key: 'brand',
        label: 'Brand',
        type: 'checkbox',
        options: [
            { id: 'amby', label: 'Amby' },
            { id: 'date-delight', label: 'Date Delight' },
            { id: 'natural-press', label: 'Natural Press' },
        ],
    },
    {
        key: 'tags',
        label: 'Tags',
        type: 'checkbox',
        options: [
            { id: 'sugar-free', label: 'Sugar Free' },
            { id: 'vegan', label: 'Vegan' },
            { id: 'gluten-free', label: 'Gluten Free' },
            { id: 'kid-friendly', label: 'Kid Friendly' },
        ],
    },
    {
        key: 'sizes',
        label: 'Sizes',
        type: 'checkbox',
        options: [
            { id: '250ml', label: '250 ml' },
            { id: '500ml', label: '500 ml' },
            { id: '1l', label: '1 L' },
        ],
    },
    {
        key: 'price',
        label: 'Price',
        type: 'range',
        min: 1000,
        max: 30000,
        step: 500,
        unit: '₦',
        selected: [3000, 18000],
    },
];

export const mockProductPreview: ProductPreview = {
    id: 1,
    name: 'Greek Yogurt',
    slug: 'greek-yogurt',
    brand: 'AMBY',
    image: pi('placeholder.png'),
    description:
        'Greek yogurt is a strained dairy product with a tangy flavor and a smooth texture. Compared to regular yogurt, it has less sugar, fewer carbs, and more protein per serving.',
    average_rating: 4.9,
    reviews_count: 1000,
    sold_count: 2500,
    price: 34,
    shipping_cost: 23,
    shipping_estimate: '10–15 Business days',
    pickup_available: true,
    variations: [
        { id: 1, quantity: 50, quantity_unit: 'ml', price: 12, is_active: true },
        { id: 2, quantity: 200, quantity_unit: 'ml', price: 34, is_active: true },
        { id: 3, quantity: 1, quantity_unit: 'L', price: 80, is_active: true },
    ],
};

export const mockCategoryTrail = [
    { id: 1, name: 'Amby', slug: 'amby', parent_id: null },
    { id: 2, name: 'Dairy', slug: 'dairy', parent_id: 1 },
    { id: 3, name: 'Yogurt', slug: 'yogurt', parent_id: 2 },
    { id: 4, name: 'Greek Yogurt', slug: 'greek-yogurt', parent_id: 3 },
];
