import AdminLayout from '@/layouts/admin-layout';
import { useForm } from '@inertiajs/react';
import ProductFormInfoSection from './product-form-info-section';
import ProductFormVariationsSection from './product-form-variations-section';
import ProductFormThumbnailSection from './product-form-thumbnail-section';
import ProductFormStatusSection from './product-form-status-section';
import ProductFormCategorySection from './product-form-category-section';
import { Button } from '@/components/ui/button';

interface ProductFormProps {
    mode: 'create' | 'edit';
    initialData: ProductFormData;
    categories: Category[];
    onSubmit: (data: ProductFormData) => void;
}

export default function ProductForm({ mode, initialData, categories, onSubmit }: ProductFormProps) {
    // @ts-ignore
    const { data, setData, errors, processing } = useForm<ProductFormData>(initialData);

    // Variation handlers here (can be passed to section)
    const addVariation = () => { /* ... */ };
    const removeVariation = (idx: number) => { /* ... */ };
    const setVariation = (idx: number, key: keyof FormVariation, value: string) => { /* ... */ };

    return (
        <AdminLayout>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    onSubmit(data);
                }}
                encType="multipart/form-data"
                className="flex flex-col gap-6 lg:flex-row"
            >
                <div className="flex-1 space-y-6">
                    <ProductFormInfoSection data={data} setData={setData} errors={errors} />
                    <ProductFormVariationsSection
                        variations={data.variations}
                        setVariation={setVariation}
                        addVariation={addVariation}
                        removeVariation={removeVariation}
                        errors={errors}
                        variation_label={data.variation_label}
                    />
                </div>
                <div className="flex w-full flex-col gap-6 lg:w-100">
                    <ProductFormThumbnailSection data={data} setData={setData} errors={errors} />
                    <ProductFormStatusSection data={data} setData={setData} errors={errors} />
                    <ProductFormCategorySection data={data} setData={setData} errors={errors} categories={categories} />
                </div>
                <div className="mt-4 flex justify-end gap-2 w-full">
                    <Button type="submit" disabled={processing}>
                        {mode === 'create' ? 'Save Product' : 'Update Product'}
                    </Button>
                </div>
            </form>
        </AdminLayout>
    );
}
