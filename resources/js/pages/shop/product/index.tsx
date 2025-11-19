import ShopLayout from '@/layouts/shop-layout';
import { featuredProducts, products } from '@/lib/constants';
import { FilterSection } from '@/components/shop/product/filter-section';
import { MoreLikeThis } from '@/components/shop/product/more-like-this';
import { OurPicksRow } from '@/components/shop/product/our-picks-row';
import { ProductResults } from '@/components/shop/product/product-results';

export default function ProductListPage() {
    const more = products;
    const picks = featuredProducts;

    return (
        <ShopLayout>
            {/* BLOCK A: Split area where only the RIGHT column scrolls */}
            <section className="mx-auto flex h-[calc(100dvh-100px)] max-h-[calc(100dvh-100px)] w-full gap-6">
                {/* Left: steady filter */}
                <FilterSection />

                {/* Right: self-scrolling column */}
                <main className="hide-scrollbar flex-1 overflow-y-auto pr-1 md:flex-[9_0_0%]">
                    <ProductResults products={products} />

                    {picks.length > 0 && <OurPicksRow items={picks} />}

                    <div className="h-6" />
                </main>
            </section>

            {/* BLOCK B: Lives outside Block A, free from the split */}
            {more.length > 0 && (
                <section className="mx-auto mt-10 w-full">
                    <MoreLikeThis items={more} />
                </section>
            )}
        </ShopLayout>
    );
}
