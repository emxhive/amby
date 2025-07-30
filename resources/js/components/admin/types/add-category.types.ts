interface Category {
    id: number;
    name: string;
    parent_id: number | null;
    is_default: boolean;
}

interface AjaxResponse {
    status: string;
    category: Category;
}

interface CategoryManagerProps {
    categories: Category[];
    onClose: () => void;
    onSuccess?: (category: Category) => void;
}
