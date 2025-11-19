import { pi } from '@/lib/utils';

export type CartVariation = {
    id: number;
    product_variation_id: number;
    label: string;
    unit_price_at_add: number;
    quantity: number;
};

export type CartProductGroup = {
    product_id: number;
    product_name: string;
    product_slug: string;
    image: string | null;
    variations: CartVariation[];
};

let data: CartProductGroup[] = [
    {
        product_id: 1,
        product_name: 'Amby Date Syrup',
        product_slug: 'amby-date-syrup',
        image: pi('placeholder.png'),
        variations: [
            { id: 101, product_variation_id: 501, label: '250g', unit_price_at_add: 2000, quantity: 1 },
            { id: 102, product_variation_id: 502, label: '500g', unit_price_at_add: 3500, quantity: 2 },
        ],
    },
    {
        product_id: 2,
        product_name: 'Greek Yogurt',
        product_slug: 'greek-yogurt',
        image: pi('placeholder.png'),

        variations: [{ id: 201, product_variation_id: 601, label: 'Plain · 350g', unit_price_at_add: 2800, quantity: 1 }],
    },
];

const listeners = new Set<() => void>();
function notify() {
    listeners.forEach((l) => l());
}

export const cartStore = {
    subscribe(fn: () => void) {
        listeners.add(fn);
        return () => listeners.delete(fn);
    },
    get() {
        return data;
    },
    set(next: CartProductGroup[]) {
        data = next;
        notify();
    },
    updateQty(variationId: number, nextQty: number) {
        data = data.map((g) => ({
            ...g,
            variations: g.variations.map((v) => (v.id === variationId ? { ...v, quantity: Math.max(1, nextQty) } : v)),
        }));
        notify();
    },
    removeVariation(variationId: number) {
        data = data.map((g) => ({ ...g, variations: g.variations.filter((v) => v.id !== variationId) })).filter((g) => g.variations.length > 0);
        notify();
    },
    subtotal() {
        return data.reduce((sum, g) => sum + g.variations.reduce((s, v) => s + v.unit_price_at_add * v.quantity, 0), 0);
    },
    itemCount() {
        return data.reduce((n, g) => n + g.variations.reduce((s, v) => s + v.quantity, 0), 0);
    },
};

export function formatNaira(n: number) {
    try {
        return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(n);
    } catch {
        return `₦${n.toLocaleString()}`;
    }
}
