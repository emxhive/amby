import { SearchBar } from '@/components/search-bar';
import { CartButton } from '@/components/shop/cart/cart-button';
import { AccountMenu } from '@/layouts/components/shop/account-menu';
import { DeliverTo } from '@/layouts/components/shop/deliver-to';
import { routes } from '@/lib/routes';
import { pi } from '@/lib/utils';
import { Link, router } from '@inertiajs/react';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
    rightUtilities?: ReactNode;
}
export function Header({ rightUtilities }: Props) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 6);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={['sticky top-0 z-50 bg-background/90 backdrop-blur', scrolled ? 'border-b' : ''].join(' ')}>
            <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Link href={route(routes.main.home)} className="shrink-0">
                            <img src={pi('logo.png')} alt="Amby Logo" className="h-8 w-auto" />
                        </Link>

                        <div className="mb-1 self-end border-b border-ambyRed-100 pr-1 text-[10px] font-extralight tracking-widest text-ambyRed-700 uppercase">
                            &mdash;Potential Untold
                        </div>
                    </div>
                </div>

                {/* Right utilities */}
                {rightUtilities || (
                    <div className="flex items-center gap-8">
                        <SearchBar
                            onSubmit={(payload) =>
                                router.get(route(routes.shop.products.index), payload, {
                                    preserveScroll: true,
                                    preserveState: true,
                                })
                            }
                        />
                        <DeliverTo
                            value={{
                                country: 'NGN',
                                currency: 'NG',
                            }}
                            onChange={function (v: { country: string; currency: string }): void {
                                throw new Error('Function not implemented.');
                            }}
                        />
                        <AccountMenu />

                        <CartButton />
                    </div>
                )}
            </div>
        </header>
    );
}
