import { router } from '@inertiajs/react';
import { ShoppingCart } from 'lucide-react';
import React from 'react';

import { useModal } from '@/components/mx/modal-system/use-modal-system';
import { CartSummary } from '@/components/shop/cart/cart-summary';
import { CART_SUMMARY } from '@/lib/modal-ids';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { cartStore } from './cart-store';

function CountIndicator({ count }: { count: number }) {
    const hasItems = count > 0;
    const overflow = count > 9;
    const display = Math.min(count, 9);

    if (!hasItems) return null;

    return (
        <span>
            {/* Count circle (1–9) */}
            <span
                aria-hidden={overflow}
                className={cn(
                    'absolute top-0 -right-2.5',
                    'flex items-center justify-center rounded-full',
                    'h-[16px] w-[16px]',
                    'bg-white text-[11px] leading-none font-semibold text-ambyRed-700',
                    'border border-s-ambyRed-200',
                    overflow
                        ? 'pointer-events-none scale-75 opacity-0 transition-all duration-200'
                        : 'scale-100 opacity-100 transition-all duration-200',
                )}
            >
                {display}
            </span>
            {/* Overflow dot (>9) */}
            <span
                aria-hidden={!overflow}
                className={cn(
                    'absolute -top-1 -right-1',
                    'rounded-full',
                    'h-2.5 w-2.5 bg-red-500',
                    'ring-2 ring-[hsl(var(--foreground))]',
                    overflow
                        ? 'scale-100 opacity-100 transition-all duration-200'
                        : 'pointer-events-none scale-75 opacity-0 transition-all duration-200',
                )}
            />
        </span>
    );
}

export function CartButton() {
    const { open, close } = useModal();
    const [, setTick] = React.useState(0);
    React.useEffect(() => {
        cartStore.subscribe(() => setTick((t) => t + 1));
    }, []);
    const count = cartStore.itemCount();
    const hasItems = count > 0;

    return (
        <button
            type="button"
            aria-label={hasItems ? `Open cart, ${count > 9 ? '9+' : count} item${count === 1 ? '' : 's'}` : 'Open cart'}
            className={cn(
                'relative flex h-8 w-8 items-center justify-center rounded-full',
                'bg-ambyRed-700 text-background transition hover:bg-ambyRed-600 focus:outline-none',
            )}
            onClick={() => {
                router.visit(route(routes.shop.checkout));
                if (Date.now() < 0)
                    open({
                        title: 'Cart',
                        description: 'Quick summary of cart content.',
                        hideToolBar: true,
                        id: CART_SUMMARY,
                        width: '440',
                        minimizable: true,
                        content: <CartSummary onClose={() => close(CART_SUMMARY)} />,
                    });
            }}
        >
            <ShoppingCart
                className={cn('transition-transform', hasItems ? 'size-5 scale-105' : 'size-5 opacity-90')}
                strokeWidth={hasItems ? 2.5 : 2}
            />
            <CountIndicator count={count} />
        </button>
    );
}
