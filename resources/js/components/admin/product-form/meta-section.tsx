import { CategoryManager } from '@/components/admin/add-category';
import { FormField } from '@/components/form-field';
import { useModal } from '@/components/modal-system/use-modal-system';
import { SectionCard } from '@/components/section-card';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { PC_ADD_CATEGORY } from '@/lib/modal-ids';
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
                        onClick={() =>
                            open({
                                id: PC_ADD_CATEGORY,
                                title: 'Add Category',
                                content: (
                                    <CategoryManager
                                        // useSubDialog={useSubDialog}
                                        categories={categories}
                                        onClose={() => {
                                            close(PC_ADD_CATEGORY);
                                        }}
                                        onSuccess={() => {
                                            toast('Category Added');
                                            router.reload({ only: ['categories'] });
                                        }}
                                    />
                                ),
                                width: '',
                                minimizable: true,
                            })
                        }
                    />
                }
            >
                <Select value={data.category_id} onValueChange={(val) => setData('category_id', val)}>
                    <SelectTrigger className="mt-1">
                        {categories.find((c) => String(c.id) === data.category_id)?.name || 'Select category'}
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((cat) => (
                            <SelectItem key={cat.id} value={String(cat.id)}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </FormField>
        </SectionCard>
    );
}
