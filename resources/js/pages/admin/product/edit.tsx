import ProductForm from '@/components/admin/product-form';
import { routes } from '@/lib/routes';
import { usePage } from '@inertiajs/react';

export default function ProductEditPage() {
    const product = usePage().props.product as unknown as any;

    return <ProductForm extFormInit={product} routeStr={route(routes.admin.products.update, product.slug)} />;
}
