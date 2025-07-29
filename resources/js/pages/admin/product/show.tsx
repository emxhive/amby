import React from 'react';
import AdminLayout from '@/layouts/admin-layout';
import { usePage, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';

interface ProductProps {
    product: AdminProduct;
}

export default function ProductShow() {
    const { product } = usePage().props as unknown as ProductProps;

    const handleEdit = () => {
        router.visit(route(routes.admin.products.edit, { product: product.slug }));
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route(routes.admin.products.destroy, { product: product.slug }));
        }
    };

    return (
        <AdminLayout>
            <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">Product Details</h1>
                    <div className="space-x-2">
                        <Button onClick={handleEdit} variant="outline">Edit</Button>
                        <Button onClick={handleDelete} variant="destructive">Delete</Button>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg p-6">
                    {product.image && (
                        <div className="mb-4">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full max-w-md h-auto rounded"
                            />
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h2 className="text-xl font-semibold mb-4">{product.name}</h2>
                            <p className="text-gray-700 mb-2"><span className="font-medium">Price:</span> ${product.price}</p>
                            <p className="text-gray-700 mb-2"><span className="font-medium">Status:</span> {product.status}</p>
                            <p className="text-gray-700 mb-2"><span className="font-medium">Category:</span> {product.category?.name || 'Uncategorized'}</p>
                            <p className="text-gray-700 mb-2"><span className="font-medium">Weight:</span> {product.weight || 'N/A'}</p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <p className="text-gray-700 whitespace-pre-line">{product.description}</p>
                        </div>
                    </div>

                    {product.variations && product.variations.length > 0 && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Variations</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {product.variations.map((variation) => (
                                    <div key={variation.id} className="border rounded p-3">
                                        <p className="font-medium">{variation.name}</p>
                                        <p className="text-gray-700">${variation.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
