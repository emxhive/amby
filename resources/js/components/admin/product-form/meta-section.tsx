import { CategoryManager } from '@/components/admin/add-category';
import { CategorySelectView } from '@/components/category-select-view';
import { FormField } from '@/components/form-field';
import { useModal } from '@/components/mx/modal-system/use-modal-system';
import { SectionCard } from '@/components/section-card';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { PRODUCT_CREATE__ADD_CATEGORY } from '@/lib/modal-ids';
import { router } from '@inertiajs/react';
import { PlusSquare } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
    data: ProductFormData;
    setData: <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => void;
    errors: Record<string, string>;
    categories: Category[];
    className?: string;
}

export default function MetaSection({ data, setData, errors, categories, className }: Props) {
    const { open, close } = useModal();


    return (
        <SectionCard className={className}>
            <FormField label="Status" error={errors.status}>
                <Select value={data.status} onValueChange={(value) => setData('status', value as 'active' | 'inactive')}>
                    <SelectTrigger>{data.status === 'active' ? 'Active' : 'Inactive'}</SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                </Select>
            </FormField>
            <FormField
                label="Category"
                error={errors.category_id}
                rightAction={
                    <PlusSquare
                        className="h-5 w-5 cursor-pointer text-primary/50"
                        onClick={() => {
                            open({
                                id: PRODUCT_CREATE__ADD_CATEGORY,
                                description: 'Create a new product category',
                                title: 'Add Category',
                                content: (
                                    <CategoryManager
                                        categories={categories}
                                        onClose={() => {
                                            close(PRODUCT_CREATE__ADD_CATEGORY);
                                        }}
                                        onSuccess={() => {
                                            toast('Category Added');
                                            router.reload({ only: ['categories'] });
                                        }}
                                    />
                                ),
                            });
                        }}
                    />
                }
            >
                <CategorySelectView categories={categories} value={data.category_id} onValueChange={(val) => setData('category_id', val)} />
            </FormField>
        </SectionCard>
    );
}
