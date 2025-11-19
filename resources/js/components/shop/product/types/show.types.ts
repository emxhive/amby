
export interface ProductPreview {
    id: number;
    name: string;
    slug: string;
    brand?: string;
    image: string | null;
    description: string;
    average_rating: number;
    reviews_count: number;
    sold_count?: number;
    variations: ProductVariation[];
    price: number;
    shipping_cost: number;
    shipping_estimate: string;
    pickup_available: boolean;
}
