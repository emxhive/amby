import { FormField } from '@/components/form-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAjaxForm } from '@/hooks/use-ajax-form';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import React from 'react';

export function CategoryManager({ onClose, onSuccess, categories }: CategoryManagerProps) {
    const { data, setData, errors, reset, processing, handleSubmit } = useAjaxForm<typeof formInit, AjaxResponse>(
        route(routes.admin.categories.store),
        formInit,
        {
            onSuccess: (result) => {
                onSuccess?.(result.category);
                onClose();
            },
        },
    );

    // 1) Build the full tree
    const fullTree = buildCategoryTree(categories);

    // // 2) Compute how many children each parent has
    // const childCounts = dummyCategories.reduce<Record<number, number>>((acc, c) => {
    //     const pid = c.parent_id ?? 0;
    //     acc[pid] = (acc[pid] || 0) + 1;
    //     return acc;
    // }, {});

    // 3) Exclude “General” (id=1) and any defaults
    const categoryTree = fullTree.filter(({ cat }) => cat.id !== 1 && !cat.is_default);

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <FormField label="Name" error={errors?.name} required>
                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} required />
            </FormField>

            <FormField label="Description" error={errors?.description}>
                <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </FormField>

            <FormField label="Parent Category" error={errors?.parent_id}>
                <Select value={data.parent_id || 'none'} onValueChange={(val) => setData('parent_id', val === 'none' ? '' : val)}>
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

const levelColors: string[] = ['text-gray-800 text-xs', 'text-gray-600', 'text-gray-500'];

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

const dummyCategories: Category[] = [
    { id: 1, name: 'General', parent_id: null, is_default: true },
    { id: 2, name: 'Drinks', parent_id: null, is_default: false },
    { id: 3, name: 'Foods', parent_id: null, is_default: false },
    { id: 4, name: 'Juices', parent_id: 2, is_default: false },
    { id: 5, name: 'Sodas', parent_id: 2, is_default: false },
    { id: 6, name: 'Fruit Juices', parent_id: 4, is_default: false },
    { id: 7, name: 'Apple Juice', parent_id: 6, is_default: false },
    { id: 8, name: 'Bakery', parent_id: 3, is_default: false },
    { id: 9, name: 'Breads', parent_id: 8, is_default: false },
    { id: 10, name: 'Pastries', parent_id: 8, is_default: false },
    { id: 11, name: 'Cakes', parent_id: 8, is_default: false },
    { id: 12, name: 'Chocolate Cakes', parent_id: 11, is_default: false },
    { id: 13, name: 'Savouries', parent_id: 3, is_default: false },
    { id: 14, name: 'Snacks', parent_id: 13, is_default: false },
    { id: 15, name: 'Biscuits', parent_id: 14, is_default: false },
];
