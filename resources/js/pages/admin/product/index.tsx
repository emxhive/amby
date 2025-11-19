import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import AdminLayout from '@/layouts/admin-layout';
import { altProducts } from '@/lib/constants';
import { routes } from '@/lib/routes';
import { productColumns } from '@/lib/table-defs/product-columns';
import { Link, usePage } from '@inertiajs/react';

interface ProductProps {
    products: PaginatedResponse<Product>;
    categories: Category[];
}

export default function ProductTable() {
    const props = usePage().props as unknown as ProductProps;
    const { products } = props;

    let productData = products.data?.length ? products.data : altProducts;

    return (
        <AdminLayout>
            <DataTable
                title={'All Products'}
                toolbar={
                    <Button asChild variant="outline" className="h-8 w-35 hover:bg-muted">
                        <Link href={route(routes.admin.products.create)}>Add Product</Link>
                    </Button>
                }
                columns={productColumns}
                data={productData}
            />
        </AdminLayout>
    );
}
