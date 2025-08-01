export interface Category {
    id: number;
    name: string;
    parent_id: number | null;
    is_default: boolean;
}

export interface CategoryManagerProps {
    categories: Category[];
    onClose: () => void;
    onSuccess?: () => void;
}
