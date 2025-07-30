import { ActionButtons } from '@/components/action-buttons';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { ColumnDef } from '@tanstack/react-table';

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
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                {row.original.image && (
                    <img
                        src={row.original.image}
                        alt={row.original.name}
                        className="h-10 w-10 rounded border border-border bg-background object-cover"
                    />
                )}
                <div className="flex flex-col gap-1">
                    <span className="font-medium text-foreground">{row.original.name}</span>
                    <span className="text-xs text-muted-foreground">
                        {row.original.variations ? (
                            <>
                                {row.original.variations.length} variation{row.original.variations.length > 1 ? '' : 's'}
                            </>
                        ) : (
                            ' '
                        )}
                    </span>
                </div>
            </div>
        ),
    },

    {
        accessorKey: 'price',
        header: 'Price',
        cell: ({ row }) => <span className="text-foreground">{row.original.variations[0]?.price.toLocaleString() ?? 1000}</span>,
    },
    // 2. Sales Column
    {
        accessorKey: 'sales',
        header: 'Sales',
        cell: ({ row }) => {
            // Optional chaining/fallbacks
            const sold = 100000;
            const remaining = 0;
            return (
                <span className="text-xs text-muted-foreground">
                    {sold} sold / {remaining} left
                </span>
            );
        },
        enableSorting: false,
        size: 100,
    },
    // 1. Status Column
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
            const isActive = row.original.status === 'active';
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
                            //TODO : IMPLEMENT CODE FOR TOGGLE ACTIVE/INACTIVE PRODUCT
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
                            throw new Error('Function not implemented.');
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
