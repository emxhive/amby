import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

const MOCK_ORDER = {
    id: 'AMBY-20231015-00001',
    items: [
        { name: 'Date Syrup 500ml', qty: 2, unit: 3500 },
        { name: 'Greek Yogurt', qty: 1, unit: 2000 },
        { name: 'Whole Wheat Bread', qty: 1, unit: 2500 },
    ],
    shipping: 1200,
};

export function InvoiceCard() {
    const subtotal = MOCK_ORDER.items.reduce((acc, item) => acc + item.qty * item.unit, 0);
    const total = subtotal + MOCK_ORDER.shipping;

    return (
        <Card className="flex h-96 flex-col">
            <CardHeader>
                <CardTitle>Invoice</CardTitle>
                <div className="mt-1 text-xs text-gray-400">Order ID: {MOCK_ORDER.id}</div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col p-0">
                <ScrollArea className="flex-1 px-4 pb-4">
                    <div className="space-y-4">
                        {MOCK_ORDER.items.map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                                <span>
                                    {item.name}
                                    <span className="mx-1 text-xs text-gray-500">×{item.qty}</span>
                                </span>
                                <span className="font-medium">₦{(item.qty * item.unit).toLocaleString()}</span>
                            </div>
                        ))}
                        <div className="mt-4 flex justify-between border-t pt-2 text-sm">
                            <span>Shipping</span>
                            <span>₦{MOCK_ORDER.shipping.toLocaleString()}</span>
                        </div>
                        <div className="mt-2 flex justify-between text-base font-semibold">
                            <span>Total</span>
                            <span>₦{total.toLocaleString()}</span>
                        </div>
                    </div>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
