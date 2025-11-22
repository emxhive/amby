import { Header } from '@/layouts/components/shop/header';
import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';
import ShopFooter from './components/shop/shop-footer';

type Props = PropsWithChildren<{ className?: string; hideFooter?: boolean; headerUtilities?: React.ReactNode }>;

export default function ShopLayout({ children, className, headerUtilities, hideFooter }: Props) {
    return (
        <div className="min-h-dvh bg-background text-foreground">
            <Header rightUtilities={headerUtilities} />
            <main className={cn('mx-auto max-w-7xl px-4 py-6', className)}>{children}</main>

            {!hideFooter && <ShopFooter />}
        </div>
    );
}
