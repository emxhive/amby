import { CartVariationRow } from '@/components/shop/cart/cart-variation-row';
import { Button } from '@/components/ui/button'; // ShadCN button
import React from 'react';
import { cartStore, formatNaira } from './cart-store';

export default function CartPanel({ onClose }: { onClose?: () => void }) {
    const [, setTick] = React.useState(0);
    React.useEffect(() => {
        cartStore.subscribe(() => setTick((t) => t + 1));
    }, []);

    const cart = cartStore.get();

    if (!cart.length) {
        return <div className="p-8 text-center text-sm text-muted-foreground">your cart is empty — add something tasty ✨</div>;
    }

    return (
        <div className="flex h-full flex-col">
            <div className="hide-scrollbar max-h-[calc(100dvh-148px)] flex-1 space-y-5 overflow-y-auto p-4">
                {cart.map((group) => (
                    <div key={group.product_id} className="rounded-lg border p-3">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="h-12 w-12 shrink-0 overflow-hidden rounded bg-muted">
                                {group.image && <img src={group.image} alt={group.product_name} className="h-full w-full object-cover" />}
                            </div>
                            <div className="min-w-0">
                                <div className="truncate text-sm font-medium">{group.product_name}</div>
                                <div className="text-xs text-muted-foreground">{group.product_slug}</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            {group.variations.map((v) => (
                                <CartVariationRow variation={v} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="sticky bottom-0 border-t bg-background p-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">subtotal</span>
                    <span className="text-base font-semibold">{formatNaira(cartStore.subtotal())}</span>
                </div>
                <Button
                    className="w-full"
                    size="lg"
                    onClick={() => {
                        /* TODO: handle checkout */
                    }}
                >
                    checkout
                </Button>
            </div>
        </div>
    );
}
