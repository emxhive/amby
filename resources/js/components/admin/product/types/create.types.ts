interface FormVariation {
    sku: string;
    stock: string;
    quantity: string;
    quantity_unit: string;
    price: string;

    id?: number;

    //copied from Batch Data for Edit mode
    is_new_batch?: boolean;
    notes?: string;
    activeBatch?: BatchData;
}

interface CreateProductProps {
    categories: Category[];
}

interface ProductFormData {
    id ?: number;
    name: string;
    status: 'active' | 'inactive';
    image: string | File | null;
    category_id: string;
    description: string;
    variations: FormVariation[];
}

interface BatchData {
    stock: string;
    sold: number;
    notes: string;
}
