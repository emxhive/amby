// ---- Our Picks ----
import { ProductCard } from '@/components/shop/product-card';

export function OurPicksRow({ items }: { items: any[] }) {
    return (
        <section className="mt-10">
            <h3 className="mb-4 text-lg font-semibold">Our Picks</h3>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                {items.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
}
