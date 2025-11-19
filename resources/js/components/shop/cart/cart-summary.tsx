import CartPanel from '@/components/shop/cart/cart-panel';
import { cartStore } from '@/components/shop/cart/cart-store';
import { Button } from '@/components/ui/button';
import React from 'react';

export function CartSummary({ onClose }: { onClose: () => void }) {
    const [, setTick] = React.useState(0);
    React.useEffect(() => {
        cartStore.subscribe(() => setTick((t) => t + 1));
    }, []);
    const count = cartStore.itemCount();

    return (
        <>
            <div className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center justify-between p-4">
                    <div className="text-base font-medium">cart</div>
                    <Button variant="link" size="sm" className="px-0 text-sm opacity-80 hover:opacity-100" onClick={onClose} type="button">
                        continue shopping
                    </Button>
                </div>
            </div>
            <CartPanel />
        </>
    );
}
