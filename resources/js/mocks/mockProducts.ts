import { pi, randBtw } from '@/lib/utils';

export const works = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=80&q=80';

export const productCategories = ['Syrup', 'Snack', 'Spread'];

type RawProduct = {
    id: number;
    name: string;
    category: string;
    image: string;
    price: number;
};

const transformProducts = (products: RawProduct[]): Product[] => {
    const categoryMap = new Map(
        productCategories.map((cat, index) => [cat, { id: index + 1, name: cat, slug: cat.toLowerCase() }]),
    );

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
        price: p.price,
        variations: [
            {
                id: p.id * 100 + 1,
                price: p.price,
                sku: p.name.substring(0, 3).toUpperCase() + p.id,
                is_active: true,
                quantity: 100,
                quantity_unit: 'ml',
                activeBatch: {
                    id: p.id * 1000 + 1,
                    stock: 100,
                    sold: randBtw(5, 100),
                    is_open: true,
                    notes: 'Mock batch',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                },
            },
        ],
    }));
};

export const altProducts: Product[] = transformProducts([
    { id: 1, name: 'Classic Date Syrup', category: 'Syrup', image: works, price: 2200 },
    { id: 2, name: 'Cocoa Date Syrup', category: 'Syrup', image: works, price: 2500 },
    { id: 3, name: 'Ginger Date Syrup', category: 'Syrup', image: works, price: 2400 },
    { id: 4, name: 'Vanilla Date Syrup', category: 'Syrup', image: works, price: 2600 },
    { id: 5, name: 'Spiced Date Syrup', category: 'Syrup', image: works, price: 2700 },
    { id: 6, name: 'Cinnamon Date Syrup', category: 'Syrup', image: works, price: 2800 },
    { id: 7, name: 'Caramel Date Syrup', category: 'Syrup', image: works, price: 2900 },
    { id: 8, name: 'Mint Date Syrup', category: 'Syrup', image: works, price: 2550 },
    { id: 9, name: 'Orange Date Syrup', category: 'Syrup', image: works, price: 2650 },
    { id: 10, name: 'Honey Date Syrup', category: 'Syrup', image: works, price: 3000 },
]);

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

export { transformProducts };
