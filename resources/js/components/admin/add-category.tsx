import { CategoryManagerProps } from '@/components/admin/types/add-category.types';
import { CategorySelectView } from '@/components/category-select-view';
import { FormField } from '@/components/form-field';
import { useModal } from '@/components/mx/modal-system/use-modal-system';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AnimateLoading } from '@/components/utils';
import { PRODUCT_CREATE__ADD_CATEGORY } from '@/lib/modal-ids';
import { routes } from '@/lib/routes';
import { useForm } from '@inertiajs/react';

export function CategoryManager({ onClose, onSuccess, categories }: CategoryManagerProps) {
    const { data, setData, errors, processing, post } = useForm(formInit);
    const { useSubDialog } = useModal();

    const [selectOpen, setSelectOpen] = useSubDialog(PRODUCT_CREATE__ADD_CATEGORY, '1');

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                post(route(routes.admin.categories.store), {
                    forceFormData: true,
                    preserveScroll: true,
                    onSuccess: (_) => {
                        onSuccess?.();
                        onClose();
                    },
                });
            }}
            className="w-full max-w-md space-y-2 p-2"
        >
            <FormField label="Name" error={errors?.name} required>
                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} required />
            </FormField>

            <FormField label="Description" error={errors?.description}>
                <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </FormField>

            <FormField label="Parent Category" error={errors?.parent_id}>
                <CategorySelectView
                    categories={categories}
                    open={selectOpen}
                    onOpenChange={setSelectOpen}
                    value={data.parent_id}
                    onValueChange={(val) => setData('parent_id', val)}
                />
            </FormField>

            <FormField label="Image" error={errors?.image}>
                <Input type="file" accept="image/*" onChange={(e) => setData('image', e.target.files?.[0] || null)} />
            </FormField>

            <div className="mt-4 flex gap-2">
                <Button type="button" variant="outline" onClick={onClose} className="w-1/2">
                    Cancel
                </Button>
                <Button type="submit" disabled={processing} className="w-1/2">
                    <AnimateLoading processing={processing} />
                    {processing ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </form>
    );
}

const formInit = {
    name: '',
    description: '',
    parent_id: null,
    image: null as File | null,
};
