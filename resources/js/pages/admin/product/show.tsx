import { Button } from '@/components/ui/button';
import AdminLayout from '@/layouts/admin-layout';
import { routes } from '@/lib/routes';
import { router, usePage } from '@inertiajs/react';

interface ProductProps {
    product: Product;
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
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Product Details</h1>
                    <div className="space-x-2">
                        <Button onClick={handleEdit} variant="outline">
                            Edit
                        </Button>
                        <Button onClick={handleDelete} variant="destructive">
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="rounded-lg bg-white p-6 shadow">
                    {product.image && (
                        <div className="mb-4">
                            <img src={product.image} alt={product.name} className="h-auto w-full max-w-md rounded" />
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        <div>
                            <h2 className="mb-4 text-xl font-semibold">{product.name}</h2>
                            <p className="mb-2 text-gray-700">
                                <span className="font-medium">Price:</span> ${product.price}
                            </p>
                            <p className="mb-2 text-gray-700">
                                <span className="font-medium">Status:</span> {product.status}
                            </p>
                            <p className="mb-2 text-gray-700">
                                <span className="font-medium">Category:</span> {product.category?.name || 'Uncategorized'}
                            </p>
                            <p className="mb-2 text-gray-700">
                                <span className="font-medium">Weight:</span> {product.weight || 'N/A'}
                            </p>
                        </div>

                        <div>
                            <h3 className="mb-2 text-lg font-semibold">Description</h3>
                            <p className="whitespace-pre-line text-gray-700">{product.description}</p>
                        </div>
                    </div>

                    {product.variations && product.variations.length > 0 && (
                        <div className="mt-6">
                            <h3 className="mb-2 text-lg font-semibold">Variations</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {product.variations.map((variation) => (
                                    <div key={variation.id} className="rounded border p-3">
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
