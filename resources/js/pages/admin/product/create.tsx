import ProductForm from '@/components/admin/product-form';
import { routes } from '@/lib/routes';

export default function ProductCreatePage() {
    return <ProductForm routeStr={route(routes.admin.products.store)} />;
}
