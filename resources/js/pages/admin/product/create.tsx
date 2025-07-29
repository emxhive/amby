import { SectionCard } from '@/components/section-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import AdminLayout from '@/layouts/admin-layout';
import { routes } from '@/lib/routes';
import { useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';

export default function ProductCreate() {
    const { categories } = usePage().props as unknown as CreateProductProps;
    const fileInput = useRef<HTMLInputElement>(null);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        slug: '',
        price: '',
        status: 'active',
        image: null as File | null,
        category_id: '',
        description: '',
        weight: '',
        variations: [{ name: '', price: '', sku: '', stock: '' }],
    });

    const addVariation = () => setData('variations', [...data.variations, { name: '', price: '', sku: '', stock: '' }]);
    const removeVariation = (idx: number) =>
        setData(
            'variations',
            data.variations.filter((_, i) => i !== idx),
        );
    const setVariation = (idx: number, key: keyof FormVariation, value: string) => {
        const updated = data.variations.map((v, i) => (i === idx ? { ...v, [key]: value } : v));
        setData('variations', updated);
    };

    return (
        <AdminLayout>
            <div className="relative">
                <header className="sticky top-0 mb-6 flex flex-row justify-between border-b border-gray-50 bg-white py-2.5">
                    <h1 className="text-2xl font-semibold">Add Product</h1>
                    <div className="space-x-3">
                        <Button variant="outline" className="w-30 hover:bg-muted">
                            Cancel
                        </Button>
                        <Button
                            variant="outline"
                            className="w-30 hover:bg-muted"
                            onClick={() => {
                                post(route(routes.admin.products.store));
                            }}
                        >
                            Save
                        </Button>
                    </div>
                </header>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        post(route(routes.admin.products.store));
                    }}
                    encType="multipart/form-data"
                    className="flex flex-col gap-6 lg:flex-row"
                >
                    {/* Main */}
                    <div className="flex-1 space-y-6">
                        <SectionCard>
                            <h2 className="mb-2 text-lg font-semibold">Product Info</h2>
                            <div>
                                <Label>Product Name *</Label>
                                <Input value={data.name} onChange={(e) => setData('name', e.target.value)} />
                                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                            </div>
                            <div>
                                <Label>Slug *</Label>
                                <Input value={data.slug} onChange={(e) => setData('slug', e.target.value)} />
                                {errors.slug && <p className="text-xs text-red-500">{errors.slug}</p>}
                            </div>
                            <div>
                                <Label>Price *</Label>
                                <Input type="number" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                                {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
                            </div>
                            <div>
                                <Label>Description</Label>
                                <Textarea value={data.description} onChange={(e) => setData('description', e.target.value)} />
                            </div>
                            <div>
                                <Label>Weight</Label>
                                <Input type="number" value={data.weight} onChange={(e) => setData('weight', e.target.value)} />
                            </div>
                        </SectionCard>

                        {/* Variations */}
                        <SectionCard>
                            <h2 className="mb-2 text-lg font-semibold">Variations</h2>
                            {data.variations.map((variation, idx) => (
                                <div className="grid grid-cols-4 items-end gap-2" key={idx}>
                                    <div>
                                        <Label>Name</Label>
                                        <Input value={variation.name} onChange={(e) => setVariation(idx, 'name', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Price</Label>
                                        <Input type="number" value={variation.price} onChange={(e) => setVariation(idx, 'price', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>SKU</Label>
                                        <Input value={variation.sku} onChange={(e) => setVariation(idx, 'sku', e.target.value)} />
                                    </div>
                                    <div>
                                        <Label>Stock</Label>
                                        <Input type="number" value={variation.stock} onChange={(e) => setVariation(idx, 'stock', e.target.value)} />
                                    </div>
                                    {data.variations.length > 1 && (
                                        <Button type="button" variant="ghost" size="sm" onClick={() => removeVariation(idx)}>
                                            Remove
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button type="button" variant="outline" size="sm" onClick={addVariation}>
                                + Add Variation
                            </Button>
                        </SectionCard>
                    </div>

                    {/* Sidebar */}
                    <div className="flex w-full flex-col gap-6 lg:w-80">
                        {/* Thumbnail */}
                        <SectionCard className="flex flex-col items-center space-y-2">
                            <Label>Thumbnail</Label>
                            <input
                                ref={fileInput}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => setData('image', e.target.files?.[0] || null)}
                            />
                            <div
                                className="mb-2 flex h-28 w-28 cursor-pointer items-center justify-center rounded bg-gray-100"
                                onClick={() => fileInput.current?.click()}
                            >
                                {data.image ? (
                                    <img src={URL.createObjectURL(data.image)} alt="thumb" className="h-full w-full rounded object-cover" />
                                ) : (
                                    <span className="text-gray-400">Click to select</span>
                                )}
                            </div>
                            {errors.image && <p className="text-xs text-red-500">{errors.image}</p>}
                            <span className="text-xs text-gray-400">Only JPG, PNG allowed</span>
                        </SectionCard>

                        {/* Status */}
                        <SectionCard className="flex flex-col gap-3">
                            <div>
                                <Label>Status</Label>
                                <Select value={data.status} onValueChange={(value) => setData('status', value as 'active' | 'inactive')}>
                                    <SelectTrigger className="mt-1">{data.status === 'active' ? 'Active' : 'Inactive'}</SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Active</SelectItem>
                                        <SelectItem value="inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Category</Label>
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
                                {errors.category_id && <p className="text-xs text-red-500">{errors.category_id}</p>}
                            </div>
                        </SectionCard>

                        {/* Categories */}
                        <SectionCard>
                            <Button type="button" variant="ghost" size="sm" className="mt-2">
                                + Create New Category
                            </Button>
                        </SectionCard>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

interface Category {
    id: number;
    name: string;
    slug?: string;
}

type Categories = Category[];

interface FormVariation {
    name: string;
    price: string;
    sku: string;
    stock: string;
}

interface CreateProductProps {
    categories: Categories;
}
