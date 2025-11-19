import MainSection from '@/components/admin/product-form/main-section';
import MetaSection from '@/components/admin/product-form/meta-section';
import ThumbnailSection from '@/components/admin/product-form/thumbnail-section';
import VariationsSection from '@/components/admin/product-form/variations-section';
import { PageHeader } from '@/components/page-header';
import AdminLayout from '@/layouts/admin-layout';
import { volumeUnits } from '@/lib/constants';
import { routes } from '@/lib/routes';
import { cn, handleImageUpload } from '@/lib/utils';
import { router, useForm, usePage } from '@inertiajs/react';
import { useMemo, useRef, useState } from 'react';
import { toast } from 'sonner';

interface ProductFormProps {
    extFormInit?: ProductFormData;
    routeStr: string;
    submitOptions?: {
        onSuccess?: () => void;
        onError?: () => void;
    };
}

export default function ProductForm({ extFormInit, routeStr, submitOptions }: ProductFormProps) {
    console.log(usePage().props, 'the props');
    const { categories } = usePage().props as unknown as CreateProductProps;
    const [uploading, setUploading] = useState(false);
    const submitBtnRef = useRef<HTMLButtonElement>(null);

    const isCreate = extFormInit === undefined;

    const formInt = useMemo(() => {
        const base: ProductFormData = {
            id: undefined,
            name: '',
            status: 'active',
            image: null as File | null,
            category_id: categories.length > 0 ? String(categories[0].id) : '',
            description: '',
            variations: [
                {
                    id: undefined,
                    sku: '',
                    stock: '50',
                    quantity: '',
                    quantity_unit: volumeUnits[0],
                    price: '',
                },
            ],
        };

        if (!isCreate) {
            const allowedVariationKeys = Object.keys(base.variations[0]);
            const variations = extFormInit.variations.map((variation: FormVariation) => {
                const newVariation: any = {};
                allowedVariationKeys.forEach((key) => {
                    // @ts-ignore
                    newVariation[key] = variation[key];
                });
                newVariation.stock = variation?.activeBatch?.stock || '';
                newVariation.is_new_batch = variation.is_new_batch ?? false;
                return newVariation;
            });

            // Only copy allowed keys—no garbage
            const allowedProductKeys = Object.keys(base);
            const merged: ProductFormData = { ...base };
            allowedProductKeys.forEach((key) => {
                if (key === 'variations') {
                    merged.variations = variations;
                } else {
                    // @ts-ignore
                    if (extFormInit[key] !== undefined) merged[key] = extFormInit[key];
                }
            });
            return merged;
        }

        return base;
    }, [extFormInit, categories, isCreate]);

    // @ts-ignore
    const { data, setData, post, isDirty, processing, errors, setError } = useForm<ProductFormData>(formInt);

    const setDataWrapper = (key: keyof ProductFormData, value: any, altKey = '') => {
        const errKey = altKey || key;
        // @ts-ignore
        if (errors[errKey]) setError(errKey, '');
        setData(key, value);
    };

    const addVariation = () =>
        setDataWrapper('variations', [
            ...data.variations,
            {
                sku: '',
                stock: '50',
                quantity: '',
                quantity_unit: volumeUnits[0],
                price: '',
            },
        ]);

    const removeVariation = (idx: number) => {
        if (data.variations.length > 1) {
            setDataWrapper(
                'variations',
                data.variations.filter((_, i) => i !== idx),
            );
        }
    };

    const setVariation = (idx: number, key: keyof FormVariation, value: string | boolean) => {
        const updated = data.variations.map((v, i) => (i === idx ? { ...v, [key]: value } : v));
        setDataWrapper('variations', updated, `variations.${idx}.${key}`);
    };

    const getVariationError = (idx: number, field: string) => {
        const key = `variations.${idx}.${field}`;
        // @ts-ignore
        return errors && errors[key];
    };

    return (
        <AdminLayout>
            <PageHeader
                title={isCreate ? 'Add Product' : 'Update Product'}
                processing={processing || uploading}
                onAction={() => {
                    submitBtnRef.current?.click();
                }}
                actionLabel={isCreate ? 'Save' : 'Update'}
                processingLabel={isCreate ? 'Saving' : 'Updating'}
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
                onSubmit={async (e) => {
                    e.preventDefault();

                    if (uploading || processing) return;
                    if (!isDirty) return toast.info('Form data is unchanged');
                    setUploading(true);

                    if (!isCreate) {
                        let image = data.image || '';
                        let payload;
                        if (typeof image !== 'string') {
                            let path;
                            try {
                                path = await handleImageUpload(image as File, route(routes.admin.products.upload));
                            } catch (e) {
                                console.error(e);
                            } finally {
                                setUploading(false);
                            }

                            if (!path) return toast.error('Failed to upload image');

                            payload = { ...data, image: path };
                        }

                        router.put(routeStr, (payload as any) ?? data, {
                            onSuccess: () => {
                                if (uploading) setUploading(false);
                            },
                            ...submitOptions,
                        });
                    } else {
                        post(routeStr, {
                            forceFormData: true,
                            ...submitOptions,
                        });
                    }
                }}
            >
                <ThumbnailSection className={'[grid-area:thumb]'} data={data} setData={setDataWrapper} errors={errors} />
                <MetaSection className={'[grid-area:meta]'} data={data} setData={setDataWrapper} errors={errors} categories={categories} />

                <MainSection className={'[grid-area:main]'} data={data} setData={setDataWrapper} errors={errors} />
                <VariationsSection
                    isCreate={isCreate}
                    className={'[grid-area:vars]'}
                    data={data}
                    setVariation={setVariation}
                    addVariation={addVariation}
                    removeVariation={removeVariation}
                    getVariationError={getVariationError}
                    volumeUnits={volumeUnits}
                />
                <button ref={submitBtnRef} className={'hidden'} type="submit"></button>
            </form>
        </AdminLayout>
    );
}
