import { ActionButtons } from '@/components/action-buttons';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';
import { cn, figs, imgSrc } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';
import { Utensils } from 'lucide-react';
import Rating from 'react-rating';

export const productColumns: ColumnDef<Product>[] = [
    {
        id: 'index',
        header: '',
        cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.index + 1}.</span>,
        enableSorting: false,
        size: 60,
    },
    {
        accessorKey: 'name',
        header: 'Product Name',
        cell: ({ row }) => {
            const { variations, name, image } = row.original;
            return (
                <div className="flex items-center gap-3">
                    {image ? (
                        <img src={imgSrc(image)} alt={name} className="h-10 w-10 rounded-full border border-border text-muted-foreground" />
                    ) : (
                        <Utensils className={cn('h-10 w-10 text-muted-foreground')} />
                    )}
                    <div className="flex flex-col gap-1">
                        <span className="font-medium text-foreground">{name}</span>
                        <span className="text-xs text-muted-foreground">
                            <Button variant={'outline'}  className={cn('relative h-6 text-xs border-gray-100 hover:border-gray-300 transition-colors duration-300 rounded-sm')}>
                                View variations ({variations.length})
                            </Button>
                        </span>
                    </div>
                </div>
            );
        },
    },

    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => {
            const { variations } = row.original;
            let first: number | null = variations.length == 1 ? variations[0].price : null;
            const className = 'text-foreground text-xs';
            if (first !== null) return <span className={className}>{figs(first)}</span>;

            const prices = variations.map((v) => v.price);
            first = Math.min(...prices);
            const last = Math.max(...prices);
            return <span className={className}>{figs(first) + '-' + figs(last)}</span>;
        },
    },
    // 2. Sales Column
    {
        accessorKey: 'sales',
        header: 'Sales',
        cell: ({ row }) => {
            return <span className="text-xs text-muted-foreground">{figs(10000000)}</span>;
        },
        enableSorting: false,
        size: 100,
    },

    // 3. Sales Column
    {
        accessorKey: 'feedback',
        header: 'Feedback',
        cell: ({ row }) => {
            return (
                <div className="flex flex-col text-xs text-muted-foreground">
                    {/*@ts-ignore*/}
                    <Rating
                        initialRating={4.5}
                        emptySymbol={<span style={{ color: '#ddd', fontSize: 20 }}>☆</span>}
                        fullSymbol={<span style={{ color: '#FACC15', fontSize: 20 }}>★</span>}
                        readonly
                    />
                    <span className="ml-2 text-xs">by 343 users</span>
                </div>
            );
        },
        enableSorting: false,
        size: 100,
    },
    // 4. Status Column
    {
        accessorKey: 'status',
        header: 'Actions',
        cell: ({ row }) => {
            const { status, slug } = row.original;
            const isActive = status === 'active';
            return (
                <div className="flex items-center gap-2">
                    {/* Indicator */}
                    <span
                        className={`inline-block h-2 w-2 rounded-full ${isActive ? 'border bg-green-500' : 'border-2 bg-muted'} border-border`}
                        title={isActive ? 'Active' : 'Inactive'}
                    />
                    {/* Quiet Button */}
                    <Button
                        size="sm"
                        variant="ghost"
                        className={cn(
                            'w-24 border border-transparent px-2 text-xs hover:border-muted-foreground/10',
                            isActive ? 'text-muted-foreground' : '',
                        )}
                        onClick={() => {
                            router.patch(
                                route(routes.admin.products.update, { product: slug }),
                                {
                                    status: isActive ? 'inactive' : 'active',
                                },
                                {
                                    preserveScroll: true,
                                    preserveUrl: true,
                                    onSuccess: () => {},
                                },
                            );
                        }}
                    >
                        {isActive ? 'Take Offline' : 'Go Live'}
                    </Button>
                </div>
            );
        },
        enableSorting: false,
        size: 120,
    },
    {
        id: 'actions',
        header: '',
        cell: ({ row }) => (
            <ActionButtons
                actions={[
                    {
                        type: 'edit',
                        onClick: function (): void {
                            router.get(route(routes.admin.products.edit, row.original.slug));
                        },
                    },
                    {
                        type: 'delete',
                        confirm: true,
                        onClick: function (): void {
                            router.delete(route(routes.admin.products.destroy, row.original.slug));
                        },
                    },
                ]}
            />
        ),
        enableSorting: false,
        size: 100,
    },
];
