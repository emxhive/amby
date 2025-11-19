import { useModal } from '@/components/mx/modal-system/use-modal-system';
import { Button } from '@/components/ui/button';
import { PRODUCT_PREVIEW } from '@/lib/modal-ids';
import { ProductPreviewModal } from '@/components/shop/product/product-preview-modal';
import { usePage } from '@inertiajs/react';
import { ShoppingBag, Star, Store, ThumbsUp } from 'lucide-react';

type RatingMode = 'star' | 'thumbs';

type ProductCardProps = {
    product: Product;
    className?: string;
    showProgress?: boolean;
    onAddToCart?: (p: Product) => void;
};

export function ProductCard({ product, className = '', showProgress = false, onAddToCart }: ProductCardProps) {
    const page = usePage<{ shared?: { ratingMode?: RatingMode } }>();
    const ratingMode: RatingMode = page?.props?.shared?.ratingMode ?? 'star';

    const name = product.name;
    const image = product.image ?? undefined;
    const categoryName = product.category?.name;
    const priceNum = product.variations?.[0]?.price ?? 0;

    const ratingAvg = product.average_rating ?? 0;
    const ratingCount = product.reviews_count ?? 0;

    const starValue = Number(ratingAvg.toFixed(1));
    const thumbsPct = Math.round((Math.max(0, Math.min(5, ratingAvg)) / 5) * 100);
    const compactCount = ratingCount >= 1000 ? (ratingCount / 1000).toFixed(1).replace(/\.0$/, '') + 'k' : String(ratingCount);

    const batch = product.variations?.[0]?.activeBatch;
    const sold = batch?.sold;
    const stock = batch?.stock;
    const progressTotal = sold != null && stock != null ? sold + stock : undefined;
    const pct = sold != null && progressTotal ? Math.min(100, Math.max(0, (sold / progressTotal) * 100)) : undefined;

    const { open, close } = useModal();

    const openPreview = () => {
        open({
            description: product.slug + ' quickView ',
            id: PRODUCT_PREVIEW,
            title: product.slug,
            width: '900px',
            hideToolBar: true,
            content: <ProductPreviewModal slug={product.slug} onClose={() => close(PRODUCT_PREVIEW)} />,
        });
    };

    return (
        <div
            className={`overflow-hidden rounded-md border border-zinc-100 bg-white shadow-xs transition-all duration-300 hover:shadow-lg ${className}`}
            onClick={openPreview}
        >
            <div className="relative aspect-[4/3] bg-zinc-50">
                {image ? (
                    <img src={image} alt={name} className="h-full w-full rounded-md object-contain" />
                ) : (
                    <div className="h-full w-full rounded-md" />
                )}

                {showProgress && (
                    <div className="pointer-events-none absolute right-0 -bottom-[1px] left-0 flex items-center px-2">
                        <div className="pointer-events-auto -ml-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow ring-1 ring-zinc-200">
                            <Store className="h-3.5 w-3.5 text-zinc-700" />
                        </div>

                        <div className="relative mx-2 h-[2px] flex-1 overflow-hidden rounded-full bg-zinc-200/80">
                            <div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-rose-600/80 via-rose-500/60 to-rose-400/40"
                                style={{ width: `${pct ?? 0}%` }}
                            />
                        </div>

                        <div className="pointer-events-auto -mr-0.5">
                            <Button
                                type="button"
                                size="icon"
                                variant="secondary"
                                className="h-7 w-7 rounded-full shadow ring-1 ring-zinc-200"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAddToCart?.(product);
                                }}
                            >
                                <ShoppingBag className="h-4 w-4 text-zinc-800" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-3">
                {categoryName ? <div className="text-xs text-gray-500">{categoryName}</div> : <div className="h-3" />}
                <div className="mt-1 line-clamp-2 min-h-[2.6rem] text-[13px] leading-snug font-bold">{name}</div>

                <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                    <span className="text-[13px] font-semibold text-emerald-600">${Number(priceNum || 0).toFixed(2)}</span>
                    <span className="inline-flex items-center gap-1">
                        {ratingMode === 'star' ? (
                            <>
                                <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" aria-hidden />
                                <span className="font-medium">{starValue.toFixed(1)}</span>
                                <span className="opacity-70">| {compactCount}</span>
                            </>
                        ) : (
                            <>
                                <ThumbsUp className="h-3.5 w-3.5 fill-amber-500 text-amber-500" aria-hidden />
                                <span className="font-medium">{thumbsPct}%</span>
                                <span className="opacity-70">{compactCount}</span>
                            </>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}
