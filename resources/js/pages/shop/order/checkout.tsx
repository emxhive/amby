import { Complete } from '@/components/shop/order/checkout/complete';
import { steps } from '@/components/shop/order/checkout/constants';
import { InvoiceCard } from '@/components/shop/order/checkout/invoice-card';
import { PaymentMethodForm } from '@/components/shop/order/checkout/payment-method-form';
import { PersonalDetailsForm } from '@/components/shop/order/checkout/personal-details-form';
import { Stepper } from '@/components/shop/order/checkout/stepper';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import ShopLayout from '@/layouts/shop-layout';
import { router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export default function CheckoutPage() {
    const [step, setStep] = useState(0);

    function next() {
        setStep((s) => Math.min(s + 1, steps.length - 1));
    }
    function prev() {
        setStep((s) => Math.max(s - 1, 0));
    }

    return (
        <ShopLayout
            hideFooter
            headerUtilities={
                <Button
                    variant="ghost"
                    className="hover:bg-ambyRed-50 flex items-center gap-2 font-semibold text-ambyRed-500"
                    onClick={() => router.visit('/shop')}
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>Back to Shop</span>
                </Button>
            }
        >
            {/* Main content area is flex and centers card */}
            <div className="flex h-[calc(100dvh-80px)] flex-col items-center justify-center py-6">
                <div className="mb-8 w-full max-w-2xl">
                    {/*<Stepper steps={steps} activeStep={step} />*/}
                </div>
                <Card className="flex h-[600px] w-full max-w-2xl flex-col overflow-hidden rounded-2xl shadow-2xl md:h-[700px]">
                    {/* Only this ScrollArea scrolls; outer div/layout never scrolls */}
                    <ScrollArea className="flex-1 p-8">
                        <div className={`w-full ${step === 1 ? 'grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]' : ''}`}>
                            <div>
                                {step === 0 && <PersonalDetailsForm onNext={next} />}
                                {step === 1 && <PaymentMethodForm onPrev={prev} onNext={next} />}
                                {step === 2 && <Complete />}
                            </div>
                            {step === 1 && <InvoiceCard />}
                        </div>
                    </ScrollArea>
                </Card>
            </div>
        </ShopLayout>
    );
}
