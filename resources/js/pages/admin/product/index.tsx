import SmartForm from '@/components/smart-form/smart-form';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { useModal } from '@/components/modal-system/use-modal-system';
import AdminLayout from '@/layouts/admin-layout';
import { altProducts, Categories, fields } from '@/lib/constants';
import { routes } from '@/lib/routes';
import { productColumns } from '@/lib/table-defs/product-columns';
import { Link, usePage } from '@inertiajs/react';

interface ProductProps {
    products: PaginatedResponse<Product>;
    categories: Categories;
}

export default function ProductTable() {
    const props = usePage().props as unknown as ProductProps;
    const { products, categories } = props;
    console.log(props);

    const { open, ModalUI } = useModal();
    const formData = {
        name: '',
        slug: '',
        price: '',
        description: '',
        image: null,
        category_id: null,
        status: 'inactive',
        weight: '',
    };

    // Use paginated data if available, otherwise fallback to hardcoded data
    let productData = products.data?.length ? products.data : altProducts;

    const handleOpen = () => {
        open({
            id: 'create-product',
            title: 'New Product',
            content: (
                <SmartForm
                    fields={fields(categories)}
                    initialData={formData}
                    action={route(routes.admin.products.store)}
                    method="post"
                    styles={{
                        form: 'space-y-4',
                        fieldWrapper: 'flex flex-col',
                        label: 'font-medium',
                        input: 'border rounded px-2 py-1',
                        error: 'text-red-500 text-sm',
                        button: 'mt-4 w-full bg-green-600 text-white py-2 rounded',
                    }}
                />
            ),
            minimizable: true,
            width: '50em',
        });
    };

    return (
        <AdminLayout>

            <DataTable
                title={'All Products'}

                toolbar={
                    <Button asChild variant="outline" className="hover:bg-muted">
                        <Link href={route(routes.admin.products.create)}>Add Product</Link>
                    </Button>
                }
                columns={productColumns}
                data={productData}
            />

            {ModalUI}
        </AdminLayout>
    );
}
