import AdvertSection from '@/components/shop/advert-section';
import { AmbyFinds } from '@/components/shop/amby-finds';
import HeroTextSection from '@/components/shop/hero-left';
import ProductListSection from '@/components/shop/product-list-section';
import { TopPicks } from '@/components/shop/top-picks';
import ShopLayout from '@/layouts/shop-layout';
import { products } from '@/mocks/mockProducts';
import { pi } from '@/lib/utils';
import React from 'react';

const LandingPage: React.FC = () => {
    return (
        <ShopLayout>
            <main className="flex flex-col gap-20">
                {/* HERO */}
                <section className="flex flex-1 gap-4">
                    <HeroTextSection />
                    <img src={pi('placeholder.png')} alt="IMAGE" className="w-1/2" />
                </section>


                <TopPicks />
                <AdvertSection />

                <ProductListSection initialItems={products} />
            </main>
        </ShopLayout>
    );
};

export default LandingPage;

const past = (
    <div className="relative m-auto flex aspect-square w-1/5 items-center justify-center rounded-full bg-ambyYellow-100">
        <img src={pi('dated-popcorn.png')} className="absolute bottom-1/4 w-2/3" alt="IMAGE" />
    </div>
);
