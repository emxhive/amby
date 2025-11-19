import { figs } from '@/lib/utils';
import { ProductPreview } from '@/components/shop/product/types/show.types';
import { Star } from 'lucide-react';

function RatingInfo({ product }: { product: ProductPreview }) {
    return (
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span>{product.average_rating}</span>
            <span> ({figs(product.reviews_count)} Reviews)</span>

            {product.sold_count && [
                <div key="center_dot" className="mx-2 size-0.5 rounded-full bg-zinc-500 p-[1.5px]"></div>,
                <span key="sold_count"> {figs(product.sold_count)} sold</span>,
            ]}
        </div>
    );
}

export function ProductInfo({ product }: { product: ProductPreview }) {
    return (
        <div className="mt-3 flex flex-col gap-3">
            <div className="text-xs font-semibold text-ambyRed-600">{product.brand}</div>
            <h2 className="text-xl font-bold">{product.name}</h2>
            <RatingInfo product={product} />
            <p className="line-clamp-3 text-xs">{product.description}</p>
        </div>
    );
}
