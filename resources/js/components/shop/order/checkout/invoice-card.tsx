import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { mockOrder } from '@/mocks/mockOrder';

export function InvoiceCard() {
    const subtotal = mockOrder.items.reduce((acc, item) => acc + item.qty * item.unit, 0);
    const total = subtotal + mockOrder.shipping;

    return (
        <Card className="flex h-96 flex-col">
            <CardHeader>
                <CardTitle>Invoice</CardTitle>
                <div className="mt-1 text-xs text-gray-400">Order ID: {mockOrder.id}</div>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col p-0">
                <ScrollArea className="flex-1 px-4 pb-4">
                    <div className="space-y-4">
                        {mockOrder.items.map((item, i) => (
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
                            <span>₦{mockOrder.shipping.toLocaleString()}</span>
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
