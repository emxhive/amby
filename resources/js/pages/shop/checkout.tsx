import { Text } from '@/components/text';
import { CheckoutForm } from '@/features/checkout/components/checkout-form';
import { MobileSummaryDrawer } from '@/features/checkout/components/mobile-summary-drawer';
import { OrderSummary } from '@/features/checkout/components/order-summary';
import ShopLayout from '@/layouts/shop-layout';
import { routes } from '@/lib/routes';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';

export default function CheckoutPage() {
    return (
        <ShopLayout hideFooter className={''}>
            <Header />
            <div>
                <div className="hide-scrollbar w-full overflow-y-auto md:w-2/3">
                    <CheckoutForm />
                </div>

                <div className="hidden h-full w-1/3 flex-col justify-center md:flex">
                    <OrderSummary />
                </div>

                <div className="fixed right-0 bottom-0 left-0 z-50 flex items-center justify-between border-t bg-white p-4 md:hidden">
                    <span className="text-lg font-medium">Total: $144.00</span>
                    <MobileSummaryDrawer />
                </div>
            </div>
        </ShopLayout>
    );
}

const Header = () => (
    <div className="mb-12 w-full space-y-2">
        <Link
            href={route(routes.shop.products.index)}
            className="inline-flex items-center gap-1 text-sm font-medium text-ambyRed-700 hover:underline"
        >
            ← Back to shop
        </Link>

        <Text as={'h1'} className={cn('text-4xl font-bold')}>
            Checkout
        </Text>
    </div>
);
