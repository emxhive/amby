// ---- More Like This ----
import { ProductCard } from '@/components/shop/product-card';

export function MoreLikeThis({ items }: { items: any[] }) {
    return (
        <section className="mt-12">
            <h3 className="mb-4 text-lg font-semibold">More Like This</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                {items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
}
