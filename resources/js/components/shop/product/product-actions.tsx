import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ProductPreview } from '@/components/shop/product/types/show.types';
import { ShoppingBag, ShoppingCart } from 'lucide-react';

interface Props {
    product: ProductPreview;
}

export function ProductActions({ product }: Props) {
    return (
        <div className="flex gap-8">
            <Button
                className={cn('h-9 flex-1/3', 'rounded-none border border-zinc-200', 'text-xs font-medium tracking-wide uppercase')}
                variant="outline"
            >
                <ShoppingCart className="mr-2 h-4 w-4" />
                To Cart
            </Button>
            {/*<div className="flex-1/3"></div>*/}
            <Button
                className={cn('h-9 flex-1/3', 'rounded-none', 'bg-ambyRed-700 text-xs font-bold tracking-wide uppercase hover:bg-ambyRed-700/90')}
                variant="default"
            >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Buy Now
            </Button>
        </div>
    );
}
