import { ProductPreview } from '@/components/shop/product/types/show.types';
import { Truck } from 'lucide-react';

export function ShippingInfo({ product }: { product: ProductPreview }) {
    return (
        <div className="flex w-full items-center justify-between gap-2 bg-white p-1 text-xs uppercase">
            <div className="flex items-center gap-2">
                <Truck className="h-7 w-7 stroke-1 text-zinc-600" />
                <span>Standard Shipping</span>
                <span>${product.shipping_cost}</span>
            </div>

            <span className="text-xs text-zinc-500">{product.shipping_estimate}</span>
        </div>
    );
}
