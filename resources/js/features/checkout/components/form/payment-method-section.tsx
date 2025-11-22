import { RadioTile, RadioTileGroup } from '@/components/radio-tile';
import { CreditCard, Landmark, Wallet } from 'lucide-react';
import { checkoutMock } from '../../mock';
import { SectionTitle } from '../section-title';

export function PaymentMethodSection() {
    const { paymentMethods } = checkoutMock;

    const getIcon = (id: string) => {
        switch (id) {
            case 'stripe':
                return <CreditCard className="h-6 w-6 text-primary" />;
            case 'cod':
                return <Wallet className="h-6 w-6 text-primary" />;
            case 'bank':
                return <Landmark className="h-6 w-6 text-primary" />;
            default:
                return null;
        }
    };

    return (
        <section className="space-y-4">
            <SectionTitle>4. Payment Method</SectionTitle>

            <RadioTileGroup direction="horizontal" defaultValue={paymentMethods[0]?.id}>
                {paymentMethods.map((method) => (
                    <RadioTile key={method.id} value={method.id} icon={getIcon(method.id)} label={method.label} description={method?.description} />
                ))}
            </RadioTileGroup>
        </section>
    );
}
