import MainSection from '@/components/admin/product-form/main-section';
import MetaSection from '@/components/admin/product-form/meta-section';
import ThumbnailSection from '@/components/admin/product-form/thumbnail-section';
import VariationsSection from '@/components/admin/product-form/variations-section';
import { PageHeader } from '@/components/page-header';
import AdminLayout from '@/layouts/admin-layout';
import { volumeUnits } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useForm, usePage } from '@inertiajs/react';

interface ProductFormProps {
    extFormInit?: ProductFormData;
    routeStr: string;
    submitOptions?: {
        onSuccess?: () => void;
        onError?: () => void;
    };
}

export default function ProductForm({ extFormInit, routeStr, submitOptions }: ProductFormProps) {
    console.log(usePage().props);
    const { categories } = usePage().props as unknown as CreateProductProps;

    const isCreate = extFormInit === undefined;

    const formInt = {
        name: '',
        status: 'active',
        image: null as File | null,
        category_id: categories.length > 0 ? String(categories[0].id) : '',
        description: '',
        variations: [{ sku: '', stock: '', quantity: '', quantity_unit: volumeUnits[0], price: '' }],
    } as ProductFormData;

    if (!isCreate) {
        Object.keys(formInt).forEach((key) => {
            // @ts-ignore
            if (extFormInit[key] !== undefined) {
                // @ts-ignore
                formInt[key] = extFormInit[key];
            }
        });
    }

    // @ts-ignore
    const { data, setData, post, put, processing, errors } = useForm<ProductFormData>(formInt);

    const addVariation = () =>
        setData('variations', [
            ...data.variations,
            {
                sku: '',
                stock: '',
                quantity: '',
                quantity_unit: volumeUnits[0],
                price: '',
            },
        ]);
    const removeVariation = (idx: number) => {
        if (data.variations.length > 1) {
            setData(
                'variations',
                data.variations.filter((_, i) => i !== idx),
            );
        }
    };
    const setVariation = (idx: number, key: keyof FormVariation, value: string) => {
        const updated = data.variations.map((v, i) => (i === idx ? { ...v, [key]: value } : v));
        setData('variations', updated);
    };

    // Helper to grab nested errors for variations (Inertia uses dot notation)
    const getVariationError = (idx: number, field: string) => {
        const key = `variations.${idx}.${field}`;
        // @ts-ignore
        return errors && errors[key];
    };

    const submit = isCreate ? post : put;

    return (
        <AdminLayout>
            <PageHeader
                title={isCreate ? 'Add Product' : 'Update Product'}
                onAction={() => submit(routeStr, submitOptions)}
                actionLabel={isCreate ? 'Save' : 'Update'}
                actionVariant="outline"
            />
            <form
                className={cn(
                    'grid gap-8',
                    '[grid-template-columns:1fr_1fr]',
                    "[grid-template-areas:'thumb_meta''main_main''vars_vars']",
                    'lg:[grid-template-columns:1fr_1fr_350px]',
                    "lg:[grid-template-areas:'main_main_thumb''main_main_meta''vars_vars_vars']",
                )}
                encType="multipart/form-data"
                onSubmit={(e: any) => {
                    e.preventDefault();
                    submit(routeStr, submitOptions);
                }}
            >
                <ThumbnailSection className={'[grid-area:thumb]'} data={data} setData={setData} errors={errors} />
                <MetaSection className={'[grid-area:meta]'} data={data} setData={setData} errors={errors} categories={categories} />

                <MainSection className={'[grid-area:main]'} data={data} setData={setData} errors={errors} />
                <VariationsSection
                    className={'[grid-area:vars]'}
                    data={data}
                    setVariation={setVariation}
                    addVariation={addVariation}
                    removeVariation={removeVariation}
                    getVariationError={getVariationError}
                    volumeUnits={volumeUnits}
                />
            </form>
        </AdminLayout>
    );
}

interface FormVariation {
    sku: string;
    stock: string;
    quantity: string;
    quantity_unit: string;
    price: string;
}

interface CreateProductProps {
    categories: Category[];
}

interface ProductFormData {
    name: string;
    status: 'active' | 'inactive';
    image: File | null;
    category_id: string;
    description: string;
    variations: FormVariation[];
}
