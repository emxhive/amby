import { LabelledInput } from '@/components/labelled-input';
import { PhoneInput } from '@/components/ui/phone-input';
import { DeliveryAddress } from '@/features/checkout/components/form/delivery-address';
import { PaymentMethodSection } from '@/features/checkout/components/form/payment-method-section';
import { ShippingMethods } from './form/shipping-methods';
import { SectionTitle } from './section-title';

export function CheckoutForm() {
    return (
        <div className="space-y-14">
            <section className="space-y-4">
                <SectionTitle>1. Contact Information</SectionTitle>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <LabelledInput label="First Name" name="firstName" inputProps={{ placeholder: 'First Name' }} />

                    <LabelledInput label="Last Name" name="lastName" inputProps={{ placeholder: 'Last Name' }} />

                    <LabelledInput label="Email" name="email" inputProps={{ type: 'email', placeholder: 'Email Address' }} />

                    <LabelledInput label="Phone Number">
                        <PhoneInput defaultCountry="NG" placeholder="Phone Number" />
                    </LabelledInput>
                </div>
            </section>

            <DeliveryAddress />

            <ShippingMethods />
            <PaymentMethodSection />
        </div>
    );
}
