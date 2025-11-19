import { FormField } from '@/components/form-field'; // your custom field wrapper
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import React from 'react';
import { routes } from '@/lib/routes';

interface CategoryManagerProps {
    categories: Category[];
    onClose: () => void;
    onSuccess?: () => void;
}

export function CategoryManager({ categories, onClose, onSuccess }: CategoryManagerProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        parent_id: 'none',
        image: null as File | null,
        is_default: false as boolean,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route(routes.admin.categories.store), {
            onSuccess: () => {
                reset();
                onSuccess?.();
                onClose();
            },
        });
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
            <FormField label="Name" error={errors.name} required>
                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} required />
            </FormField>

            <FormField label="Description" error={errors.description}>
                <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} />
            </FormField>

            <FormField label="Parent Category" error={errors.parent_id}>
                <Select value={data.parent_id || 'none'} onValueChange={(val) => setData('parent_id', val === 'none' ? '' : val)}>
                    <SelectTrigger className="mt-1">{categories.find((cat) => String(cat.id) === data.parent_id)?.name || 'None'}</SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">None</SelectItem>
                        {categories.map((cat) => (
                            <SelectItem key={cat.id} value={String(cat.id)}>
                                {cat.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </FormField>

            <FormField label="Image" error={errors.image}>
                <Input type="file" accept="image/*" onChange={(e) => setData('image', e.target.files?.[0] || null)} />
            </FormField>

            <FormField label="Set as Default" className="flex flex-row-reverse items-center justify-end gap-3" error={errors.is_default}>
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

interface Category {
    id: number;
    name: string;
}
