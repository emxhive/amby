import { ProductPreview } from '@/components/shop/product/types/show.types';
import { MapPin } from 'lucide-react';

export function ProductImage({ product }: { product: ProductPreview }) {
    return (
        <div className="flex items-center justify-center gap-6 bg-zinc-50">
            {/* Product image */}
            <div className="relative m-3 flex h-100 w-102 items-center justify-center rounded-md bg-background p-2 shadow-sm">
                {product.image && <img src={product.image} alt={product.name} className="h-full w-full object-contain" />}

                {product.pickup_available && (
                    <span className="absolute right-2 bottom-2 flex cursor-pointer items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium text-ambyRed-700 hover:text-ambyRed-500">
                        <MapPin className="h-3.5 w-3.5" />
                        Available Instore
                    </span>
                )}
            </div>
        </div>
    );
}
