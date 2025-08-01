import { FormField } from '@/components/form-field';

import { Category, CategoryManagerProps } from '@/components/admin/types/add-category.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { PC_ADD_CATEGORY } from '@/lib/modal-ids';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import React from 'react';
import { useModal } from '@/components/modal-system/use-modal-system';

export function CategoryManager({ onClose, onSuccess, categories }: CategoryManagerProps) {
    const { data, setData, errors, reset, processing, post } = useForm(formInit);
    const { useSubDialog } = useModal();

    const fullTree = buildCategoryTree(categories);
    const [selectOpen, setSelectOpen] = useSubDialog(PC_ADD_CATEGORY, '1');
    const categoryTree = fullTree.filter(({ cat }) => cat.id !== 1 && !cat.is_default);

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                post(route(routes.admin.categories.store), {
                    forceFormData: true,
                    preserveScroll: true,
                    onSuccess: (page) => {

                        console.log(page, "page stuff")
                        onSuccess?.();
                        onClose();
                    },
                });
            }}
            className="w-full p-2 max-w-md space-y-2"
        >
            <FormField label="Name" error={errors?.name} required>
                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} required />
            </FormField>

            <FormField label="Description" error={errors?.description}>
                <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </FormField>

            <FormField label="Parent Category" error={errors?.parent_id}>
                <Select
                    open={selectOpen}
                    onOpenChange={setSelectOpen}
                    value={data.parent_id || 'none'}
                    onValueChange={(val) => setData('parent_id', val === 'none' ? '' : val)}
                >
                    <SelectTrigger className="mt-1">
                        {categoryTree.find(({ cat }) => String(cat.id) === data.parent_id)?.cat.name || 'None'}
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">{itemWrap({ name: 'None', level: 0 })}</SelectItem>
                        {categoryTree.map(({ cat, level }) => {
                            const notRoot = level > 0;
                            return (
                                <SelectItem key={cat.id} value={String(cat.id)}>
                                    {itemWrap({ name: cat.name, level, notRoot })}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </FormField>

            <FormField label="Image" error={errors?.image}>
                <Input type="file" accept="image/*" onChange={(e) => setData('image', e.target.files?.[0] || null)} />
            </FormField>

            <div className="mt-4 flex gap-2">
                <Button type="button" variant="outline" onClick={onClose} className="w-1/2">
                    Cancel
                </Button>
                <Button type="submit" disabled={processing} className="w-1/2">
                    {processing ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </form>
    );
}

function buildCategoryTree(
    categories: Category[],
    parentId: number | null = null,
    level: number = 0,
): {
    cat: Category;
    level: number;
}[] {
    let result: { cat: Category; level: number }[] = [];
    categories
        .filter((cat) => cat.parent_id === parentId)
        .forEach((cat) => {
            result.push({ cat, level });
            result.push(...buildCategoryTree(categories, cat.id, level + 1));
        });
    return result;
}

const formInit = {
    name: '',
    description: '',
    parent_id: null as any,
    image: null as any,
};

const levelColors: string[] = ['text-gray-800', 'text-gray-600', 'text-gray-500'];

const getLevelColor = (level: number): string => levelColors[level] || levelColors[levelColors.length - 1];

const Hrs: React.FC<{ invisible?: boolean; notRoot?: boolean }> = ({ invisible = false, notRoot = false }) => (
    <hr className={cn(notRoot && 'w-3', invisible && 'border-transparent')} style={{ margin: 0 }} />
);

const itemWrap = ({ name, level, notRoot }: { name: string; level: number; notRoot?: boolean }) => (
    <div className="flex flex-row items-center">
        {Array.from({ length: level }).map((_, i) => (
            <Hrs key={i} invisible notRoot={notRoot} />
        ))}
        <div className={cn(notRoot && 'border-l', 'relative h-3')} />
        <Hrs notRoot={notRoot} />
        <div className={cn(notRoot && 'pl-1', getLevelColor(level))}>{name}</div>
    </div>
);
