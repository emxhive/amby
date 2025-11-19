//@ts-nocheck
import { pi, randBtw } from '@/lib/utils';

export const volumeUnits = ['ml', 'L', 'g', 'kg', 'pcs'];

export const productCategories = ['Syrup', 'Snack', 'Spread'];
export const works = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80';

export const altProducts: Product[] = [
    {
        id: 1,
        name: 'Classic Date Syrup',
        slug: 'classic-date-syrup',
        price: 2200,
        status: 'active',
        image: works,
        variations: 3,
    },
    {
        id: 2,
        name: 'Cocoa Date Syrup',
        slug: 'cocoa-date-syrup',
        price: 2500,
        status: 'active',
        image: works,
        variations: 2,
    },
    {
        id: 3,
        name: 'Ginger Date Syrup',
        slug: 'ginger-date-syrup',
        price: 2400,
        status: 'inactive',
        image: works,
        variations: 4,
    },
    {
        id: 4,
        name: 'Vanilla Date Syrup',
        slug: 'vanilla-date-syrup',
        price: 2600,
        status: 'active',
        image: works,
        variations: 1,
    },
    {
        id: 5,
        name: 'Spiced Date Syrup',
        slug: 'spiced-date-syrup',
        price: 2700,
        status: 'inactive',
        image: works,
        variations: 5,
    },
    {
        id: 6,
        name: 'Cinnamon Date Syrup',
        slug: 'cinnamon-date-syrup',
        price: 2800,
        status: 'active',
        image: works,
        variations: 0,
    },
    {
        id: 7,
        name: 'Caramel Date Syrup',
        slug: 'caramel-date-syrup',
        price: 2900,
        status: 'active',
        image: works,
        variations: 3,
    },
    {
        id: 8,
        name: 'Mint Date Syrup',
        slug: 'mint-date-syrup',
        price: 2550,
        status: 'inactive',
        image: works,
        variations: 2,
    },
    {
        id: 9,
        name: 'Orange Date Syrup',
        slug: 'orange-date-syrup',
        price: 2650,
        status: 'active',
        image: works,
        variations: 4,
    },
    {
        id: 10,
        name: 'Honey Date Syrup',
        slug: 'honey-date-syrup',
        price: 3000,
        status: 'active',
        image: works,
        variations: 3,
    },
];

const transformProducts = (products: any[]) => {
    const categoryMap = new Map(productCategories.map((cat, index) => [cat, { id: index + 1, name: cat, slug: cat.toLowerCase() }]));

    return products.map((p) => ({
        id: p.id,
        name: p.name,
        slug: p.name.toLowerCase().replace(/ /g, '-'),
        status: 'active',
        image: p.image,
        category_id: categoryMap.get(p.category)?.id,
        category: categoryMap.get(p.category),
        description: `Premium quality ${p.name.toLowerCase()}.`,
        reviews_count: randBtw(100, 3000),
        average_rating: randBtw(4.4, 5),
        variations: [
            {
                id: p.id * 100 + 1,
                price: p.price,
                sku: p.name.substring(0, 3).toUpperCase() + p.id,
                is_active: true,
                quantity: 100,
                activeBatch: {
                    id: p.id * 1000 + 1,
                    stock: 100,
                    sold: randBtw(5, 100),
                },
            },
        ],
    }));
};

export const products: Product[] = transformProducts([
    { id: 1, name: 'Amber Honey Syrup 250ml', category: 'Syrup', image: pi('placeholder.png'), price: 9.0 },
    { id: 2, name: 'Amber Honey Syrup 500ml', category: 'Syrup', image: pi('placeholder.png'), price: 15.5 },
    { id: 3, name: 'Golden Crunch Popcorn', category: 'Snack', image: pi('placeholder.png'), price: 4.75 },
    { id: 4, name: 'Cinnamon Date Bites', category: 'Snack', image: pi('placeholder.png'), price: 6.25 },
    { id: 5, name: 'Velvet Cocoa Spread', category: 'Spread', image: pi('placeholder.png'), price: 7.75 },
    { id: 6, name: 'Hazelnut Morning Spread', category: 'Spread', image: pi('placeholder.png'), price: 8.0 },
    { id: 7, name: 'Spiced Apple Syrup', category: 'Syrup', image: pi('placeholder.png'), price: 10.0 },
    { id: 8, name: 'Classic Maple Syrup 300ml', category: 'Syrup', image: pi('placeholder.png'), price: 12.0 },
    { id: 9, name: 'Roasted Almond Clusters', category: 'Snack', image: pi('placeholder.png'), price: 5.5 },
    { id: 10, name: 'Caramel Bliss Popcorn', category: 'Snack', image: pi('placeholder.png'), price: 6.0 },
    { id: 11, name: 'Morning Oat Spread', category: 'Spread', image: pi('placeholder.png'), price: 6.25 },
    { id: 12, name: 'Berry Swirl Jam', category: 'Spread', image: pi('placeholder.png'), price: 7.0 },
    { id: 13, name: 'Dark Molasses Syrup', category: 'Syrup', image: pi('placeholder.png'), price: 11.0 },
    { id: 14, name: 'Coconut Cream Syrup', category: 'Syrup', image: pi('placeholder.png'), price: 13.5 },
    { id: 15, name: 'Nutty Caramel Bites', category: 'Snack', image: pi('placeholder.png'), price: 4.5 },
]);

export const featuredProducts: Product[] = transformProducts([
    { id: 1, name: 'Pure Date Syrup 250ml', category: 'Syrup', image: pi('placeholder.png'), price: 8.5 },
    { id: 2, name: 'Pure Date Syrup 500ml', category: 'Syrup', image: pi('placeholder.png'), price: 14 },
    { id: 3, name: 'Date Popcorn (Sweet & Salty)', category: 'Snack', image: pi('placeholder.png'), price: 5 },
    { id: 4, name: 'Date Granola Bites', category: 'Snack', image: pi('placeholder.png'), price: 6.5 },
    { id: 5, name: 'Date Spread – Classic', category: 'Spread', image: pi('placeholder.png'), price: 7.25 },
    { id: 6, name: 'Date Spread – Cocoa', category: 'Spread', image: pi('placeholder.png'), price: 7.5 },
]);
