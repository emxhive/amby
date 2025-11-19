import { ProductCard } from '@/components/shop/product-card';
import { routes } from '@/lib/routes';
import { pi } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { featuredProducts } from '@/lib/constants';


export function TopPicks() {
    return (
        <section className="space-y-8 rounded-lg border border-border bg-background p-3 md:p-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600">Featured</span>

                <h2 className="text-xl font-semibold text-zinc-700">Our Featured Products</h2>

                <Link href={route(routes.shop.products.index)} className="text-sm font-semibold text-ambyRed-600 hover:underline">
                    Explore
                </Link>
            </div>

            {/* One row, no overflow */}
            <div className="grid auto-cols-[minmax(0,1fr)] grid-flow-col gap-3 md:gap-5">
                {featuredProducts.map((p) => (
                    <ProductCard
                        key={p.id}
                      product={p}
                    />
                ))}
            </div>
        </section>
    );
}

export default TopPicks;
