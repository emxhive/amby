
import { ProductCard } from '@/components/shop/product-card';

type ProductResultsProps = {
    products: any[]; // swap to your Product type if you prefer
    onLoadMore?: () => void;
};

export function ProductResults({ products, onLoadMore }: ProductResultsProps) {
    return (
        <section className="">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>

            <div className="mt-6 text-center">
                <button
                    onClick={onLoadMore}
                    className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
                >
                    Load More
                </button>
            </div>
        </section>
    );
}
