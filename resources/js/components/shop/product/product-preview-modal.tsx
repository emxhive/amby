// product-preview-modal.tsx (updated usage)
'use client';
import { mockProductPreview } from '@/mocks/mockProductPreview';
import { useMemo, useState } from 'react';
import { ProductActions } from './product-actions';
import { ProductHeader } from './product-header';
import { ProductImage } from './product-image';
import { ProductInfo } from './product-info';

import { ProductQuantity } from './product-quantity';
import { ProductVariations } from './product-variations';

import { ProductPrice } from '@/components/shop/product/product-price';

interface Props {
    slug: string;
    onClose: () => void;
}

export function ProductPreviewModal({ slug, onClose }: Props) {
    const [selectedVariationId, setSelectedVariationId] = useState<number | null>(null);
    const [quantity, setQuantity] = useState(1);
    const product = mockProductPreview;

    // id → { price } map for O(1) lookups
    const idMap = useMemo(() => {
        const m = new Map<number, { price: number }>();
        for (const v of product.variations ?? []) {
            m.set(Number(v.id), { price: Number(v.price ?? 0) });
        }
        return m;
    }, [product.variations]);

    const unitPrice = selectedVariationId != null ? (idMap.get(selectedVariationId)?.price ?? null) : null;

    return (
        <div className="w-full overflow-hidden rounded-lg bg-white">
            <ProductHeader onClose={onClose} />

            <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left column */}
                <ProductImage product={product} />

                {/* Right column */}
                <div className="flex flex-col gap-6 p-6">
                    <ProductInfo product={product} />

                    <ProductVariations variations={product.variations} selectedVariationId={selectedVariationId} onChange={setSelectedVariationId} />

                    {/* Quantity + Price Row (side by side) */}
                    <div className="flex items-stretch gap-3">
                        <ProductPrice unitPrice={unitPrice} quantity={quantity} /* currency="USD" */ />
                        <div></div>
                        <ProductQuantity value={quantity} onChange={setQuantity} />
                    </div>

                    <ProductActions product={product} />
                </div>
            </div>
        </div>
    );
}
