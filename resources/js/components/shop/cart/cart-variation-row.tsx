import { cartStore, CartVariation, formatNaira } from '@/components/shop/cart/cart-store';
import { Button } from '@/components/ui/button';
import React from 'react';

export function CartVariationRow({ variation }: { variation: CartVariation }) {
    const v = variation;

    return (
        <div key={v.id} className="flex items-center justify-between rounded-md border p-2">
            <div className="min-w-0 pr-2">
                <div className="text-xs font-medium">{v.label}</div>
                <div className="text-xs text-muted-foreground">{formatNaira(v.unit_price_at_add)} each</div>
            </div>
            <div className="flex items-center gap-3">
                <div className="qty flex items-center gap-2">
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => cartStore.updateQty(v.id, v.quantity - 1)}
                        aria-label="decrease"
                        type="button"
                    >
                        –
                    </Button>
                    <div className="w-7 text-center text-sm tabular-nums">{v.quantity}</div>
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-7 w-7"
                        onClick={() => cartStore.updateQty(v.id, v.quantity + 1)}
                        aria-label="increase"
                        type="button"
                    >
                        +
                    </Button>
                </div>
                <div className="w-24 text-right text-sm font-semibold">{formatNaira(v.unit_price_at_add * v.quantity)}</div>
                <Button
                    size="sm"
                    variant="ghost"
                    className="p-1 text-xs text-muted-foreground"
                    onClick={() => cartStore.removeVariation(v.id)}
                    aria-label="remove"
                    type="button"
                >
                    remove
                </Button>
            </div>
        </div>
    );
}
