interface FormVariation {
    sku: string;
    stock: string;
    quantity: string;
    quantity_unit: string;
    price: string;
}

interface CreateProductProps {
    categories: Category[];
}

interface ProductFormData {
    name: string;
    status: 'active' | 'inactive';
    image: File | null;
    category_id: string;
    description: string;
    variations: FormVariation[];
}
