interface Product {
    // remaining?: number;
    // sold?: number;
    id: number;
    name: string;
    slug: string;
    price: number;
    status: 'active' | 'inactive';
    image: string;
    category_id?: number;
    category?: {
        id: number;
        name: string;
        slug: string;
    };
    description?: string;
    weight?: number;
    variations: ProductVariation[];
}

interface ProductVariation {
    id: number;
    name: string;
    price: number;
    sku: string;
    status?: string;
    stock?: number;
    sold?: number;
    activeBatch?: VariationBatch;
}

interface VariationBatch {
    id: number;
    status: 'open' | 'closed';
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
    id: number;
    name: string;
    parent_id: number | null;
    is_default: boolean;

}
