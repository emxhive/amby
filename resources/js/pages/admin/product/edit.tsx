import React from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { usePage, router } from '@inertiajs/react';
import SmartForm from '@/components/smart-form/smart-form';
import { routes } from '@/lib/routes';
import { fields } from '@/lib/constants';

interface ProductEditProps {
    product: AdminProduct;
    categories: Categories;
}

export default function ProductEdit() {
    const { product, categories } = usePage().props as unknown as ProductEditProps;

    const handleCancel = () => {
        router.visit(route(routes.admin.products.show, { product: product.slug }));
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Edit Product</h1>
                    <button
                        onClick={handleCancel}
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    <SmartForm
                        fields={fields(categories)}
                        initialData={{
                            name: product.name,
                            slug: product.slug,
                            price: product.price,
                            description: product.description,
                            image: null, // Can't pre-fill file inputs
                            category_id: product.category_id,
                            status: product.status,
                            weight: product.weight,
                        }}
                        action={route(routes.admin.products.update, { product: product.slug })}
                        method="put"
                        styles={{
                            form: 'space-y-4',
                            fieldWrapper: 'flex flex-col',
                            label: 'font-medium',
                            input: 'border rounded px-2 py-1',
                            error: 'text-red-500 text-sm',
                            button: 'mt-4 w-full bg-blue-600 text-white py-2 rounded',
                        }}
                        submitOptions={{
                            onSuccess: () => {
                                router.visit(route(routes.admin.products.show, { product: product.slug }));
                            },
                        }}
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
