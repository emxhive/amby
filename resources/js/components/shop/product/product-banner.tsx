import { Button } from '@/components/ui/button';
import { pi } from '@/lib/utils';

export default function ProductBanner() {
    return (
        <section className="relative isolate overflow-hidden bg-[#111] text-white" aria-label="Promotion: Amber Date Syrup">
            {/* spotlight bg */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-60"
                style={{
                    background: 'radial-gradient(60% 60% at 62% 65%, rgba(255,198,109,.25) 0%, rgba(255,198,109,0) 70%)',
                }}
            />

            <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-12 sm:px-6 md:grid-cols-2 lg:py-16">
                {/* left text */}
                <div className="order-2 space-y-4 pr-0 md:order-1 md:pr-8">
                    <p className="text-sm font-medium tracking-wide text-amber-300/90">Best Seller</p>
                    <h1 className="text-3xl leading-tight font-semibold sm:text-4xl">Amber Date Syrup</h1>
                    <p className="max-w-prose text-white/75">
                        Experience drops of heaven in a bottle. Pure, natural sweetness for oats, grills, and smoothies.
                    </p>

                    <div className="flex items-center gap-3 pt-1">
                        <a href="/shop/products?category=syrup" aria-label="Shop Syrup">
                            <Button className="bg-amber-500 font-semibold text-black hover:bg-amber-600">Shop Now</Button>
                        </a>
                        <span className="text-sm text-white/60">
                            <span className="font-semibold text-amber-300">15% OFF</span> today
                        </span>
                    </div>
                </div>

                {/* right visuals */}
                <div className="relative order-1 h-[280px] sm:h-[340px] md:order-2">
                    {/* ripple (2 rings) */}
                    <svg aria-hidden className="absolute bottom-2 left-1/2 w-[78%] -translate-x-1/2 sm:w-[70%]" viewBox="0 0 600 200" fill="none">
                        <ellipse cx="300" cy="150" rx="260" ry="35" stroke="rgba(255,255,255,.20)" strokeWidth="2" />
                        <ellipse cx="300" cy="150" rx="200" ry="26" stroke="rgba(255,255,255,.12)" strokeWidth="2" />
                    </svg>

                    {/* bottles (single combined PNG with transparent bg) */}
                    <img
                        src={pi('twin_bottles.png')}
                        alt="Amber Date Syrup bottles"
                        className="absolute right-0 bottom-0 mx-auto w-[68%] max-w-sm drop-shadow-[0_24px_36px_rgba(0,0,0,.65)]"
                        loading="eager"
                    />
                </div>
            </div>
        </section>
    );
}
