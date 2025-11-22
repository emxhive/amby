import { RadioTile, RadioTileGroup } from '@/components/radio-tile';
import { Truck } from 'lucide-react';
import { checkoutMock } from '../../mock';
import { SectionTitle } from '../section-title';

export function ShippingMethods() {
    const { shippingMethods } = checkoutMock;

    return (
        <section className="space-y-4">
            <SectionTitle>3. Shipping Method</SectionTitle>

            <RadioTileGroup direction="horizontal" defaultValue={shippingMethods[0]?.id}>
                {shippingMethods.map((method) => (
                    <RadioTile
                        key={method.id}
                        value={method.id}
                        icon={<Truck className="h-6 w-6 text-primary" />}
                        label={method.label}
                        description={method.description}
                        tag={method.price}
                    />
                ))}
            </RadioTileGroup>
        </section>
    );
}


