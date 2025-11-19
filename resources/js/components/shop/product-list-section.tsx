import { ProductCard } from '@/components/shop/product-card';
import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import React from 'react';

type LoadMoreResult = {
    items: Product[];
    nextCursor?: any;
};

type Props = {
    title?: React.ReactNode;
    titleText?: string;
    initialItems: Product[];
    initialCursor?: any;
    loadMore?: (cursor?: any) => Promise<LoadMoreResult>;
    headerRight?: React.ReactNode;
    className?: string;
    gridClassName?: string;
};

export default function ProductListSection({
    title,
    titleText = "And.. there's more",
    initialItems,
    initialCursor,
    loadMore,
    headerRight,
    className,
    gridClassName,
}: Props) {
    const [items, setItems] = React.useState<Product[]>(initialItems ?? []);
    const [cursor, setCursor] = React.useState<any | null>(initialCursor ?? null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    const sentryRef = React.useRef<HTMLDivElement | null>(null);
    const hasMore = !!(cursor && loadMore);

    const doLoadMore = React.useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        setError(null);
        try {
            const res = await loadMore?.(cursor);
            if (!res) throw new Error('Failed to load more products');
            setItems((prev) => [...prev, ...(res.items ?? [])]);
            setCursor(res.nextCursor ?? null);
        } catch (e: any) {
            setError(e?.message || 'Failed to load products');
        } finally {
            setLoading(false);
        }
    }, [cursor, hasMore, loadMore, loading]);

    React.useEffect(() => {
        if (!loadMore) return; // no infinite scroll on landing
        const el = sentryRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) doLoadMore();
            },
            { rootMargin: '800px' }, // uses viewport
        );
        io.observe(el);
        return () => io.disconnect();
    }, [doLoadMore, loadMore]);

    return (
        <section className={cn('flex flex-col gap-5', className)}>
            <div className="flex items-center justify-between px-3">
                <div>{title ?? <h2 className="text-md font-medium">{titleText}</h2>}</div>
                {headerRight}
            </div>

            <div className={cn('grid gap-5 px-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5', gridClassName)}>
                {items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>

            {/* Infinite scroll sentry */}
            {loadMore && <div ref={sentryRef} className="h-1" />}

            {loading && <div className="p-3 text-center text-sm text-muted-foreground">Loading...</div>}

            {error && (
                <div className="p-3 text-center text-sm text-red-500">
                    {error}{' '}
                    <Button size="sm" onClick={doLoadMore}>
                        Retry
                    </Button>
                </div>
            )}

            {/* End state */}
            {!hasMore && !loading && (
                <div className="p-3 text-center text-sm text-muted-foreground">
                    <Link
                        href={route(routes.shop.products.index)}
                        className="inline-flex items-center gap-1 font-medium text-ambyRed-700 hover:underline"
                    >
                        Explore the store <span aria-hidden>→</span>
                    </Link>
                </div>
            )}
        </section>
    );
}
