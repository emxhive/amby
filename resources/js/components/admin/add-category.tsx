import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FormField } from '@/components/form-field';

const dummyCategories = [
    { id: 1, name: "General", parent_id: null, is_default: true },
    { id: 2, name: "Drinks", parent_id: 1 },
    { id: 3, name: "Foods", parent_id: 1 },
    { id: 4, name: "Juices", parent_id: 2 },
    { id: 5, name: "Sodas", parent_id: 2 },
    { id: 6, name: "Bakery", parent_id: 3 },
    { id: 7, name: "Breads", parent_id: 6 },
    { id: 8, name: "Pastries", parent_id: 6 },
    { id: 9, name: "Cakes", parent_id: 6 },
    { id: 10, name: "Chocolate Cakes", parent_id: 9 },
    { id: 11, name: "Fruit Juices", parent_id: 4 },
    { id: 12, name: "Apple Juice", parent_id: 11 },
    { id: 13, name: "Savouries", parent_id: 3 },
    { id: 14, name: "Snacks", parent_id: 13 },
    { id: 15, name: "Biscuits", parent_id: 14 },
];

function buildCategoryTree(
    categories,
    parentId = null,
    level = 0
) {
    let result = [];
    categories
        .filter(cat => (cat.parent_id ?? null) === parentId)
        .forEach(cat => {
            result.push({ cat, level });
            result = result.concat(buildCategoryTree(categories, cat.id, level + 1));
        });
    return result;
}

export function CategoryManager({ onClose, onSuccess }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        parent_id: 'none',
        image: null as File | null,
        is_default: false,
    });

    const categoryTree = buildCategoryTree(
        dummyCategories.filter(cat => cat.name !== "General" && !cat.is_default)
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        // For demo, not posting anywhere
        reset();
        onSuccess?.();
        onClose();
    };

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
                        {
                            categoryTree.find(({ cat }) => String(cat.id) === data.parent_id)?.cat.name
                            || 'None'
                        }
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {categoryTree.map(({ cat, level }) => (
                            <SelectItem key={cat.id} value={String(cat.id)}>
                                {`${'— '.repeat(level)}${cat.name}`}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </FormField>
            <FormField label="Image" error={errors?.image}>
                <Input type="file" accept="image/*" onChange={(e) => setData('image', e.target.files?.[0] || null)} />
            </FormField>
            <FormField
                label="Set as Default"
                className="flex flex-row-reverse items-center justify-end gap-3"
                error={errors?.is_default}
            >
                <Checkbox id="is_default" checked={data.is_default} onCheckedChange={(val) => setData('is_default', Boolean(val))} />
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
