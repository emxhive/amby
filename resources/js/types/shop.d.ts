interface Product {
    id: number;
    name: string;
    slug: string;
    status: string;
    price?: number;
    weight?: string | number | null;
    image?: string | null;
    category_id?: number;
    category?: {
        id: number;
        name: string;
        slug: string;
    };
    description?: string;
    reviews_count: number;
    average_rating: number;
    variations: ProductVariation[];
}

interface ProductVariation {
    id: number;
    price: number;
    sku?: string;
    is_active?: boolean;
    name?: string;
    quantity: number;
    quantity_unit: string;
    activeBatch?: VariationBatch;
}

interface VariationBatch {
    id: number;
    is_open: boolean;
    stock: number;
    sold: number;
    notes?: string;
    created_at: string;
    updated_at: string;
}

interface PaginatedResponse<T> {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number | null;
        last_page: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
        path: string;
        per_page: number;
        to: number | null;
        total: number;
    };
}

interface Category {
    slug: string;
    id: number;
    name: string;
    parent_id: number | null;
    is_default?: boolean;
}
interface Crumb {
    label: string;
    href: string;
}
