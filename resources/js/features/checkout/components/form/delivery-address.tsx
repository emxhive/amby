import { RadioTile, RadioTileGroup } from '@/components/radio-tile';
import { Text } from '@/components/text';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import { checkoutMock } from '../../mock';
import { SectionTitle } from '../section-title';

export function DeliveryAddress() {
    const { addresses } = checkoutMock;

    return (
        <section className="space-y-4">
            <SectionTitle>2. Delivery Address</SectionTitle>

            <RadioTileGroup direction="horizontal" defaultValue={addresses[0]?.id}>
                {addresses.map((address) => (
                    <RadioTile
                        key={address.id}
                        value={address.id}
                        icon={<MapPin className="mt-1 h-5 w-5 text-primary" />}
                        label={`${address.name} — ${address.label}`}
                        description={`${address.line1}, ${address.city}`}
                        tag={address.tag}
                    />
                ))}
            </RadioTileGroup>

            <div className="flex flex-wrap gap-3">
                <Button variant="ghost" className="px-0">
                    <Text as="span" className="text-sm font-medium text-ambyRed-700">
                        Select Existing Address
                    </Text>
                </Button>

                <Button variant="ghost" className="px-0">
                    <Text as="span" className="text-sm font-medium text-ambyRed-700">
                        Add New Address
                    </Text>
                </Button>
            </div>
        </section>
    );
}


const AddressRender = ({ address }: { address: any }) => <div>{address.line1}</div>;
