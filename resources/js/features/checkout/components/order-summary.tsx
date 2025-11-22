import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const mockItems = [
    { id: 1, title: 'Black Hoodie', price: 60 },
    { id: 2, title: 'Sneakers', price: 84 },
    { id: 3, title: 'Cap (Limited Edition)', price: 28 },
];

export function OrderSummary() {
    return (
        <div className="sticky top-6 rounded-xl border bg-white p-6">
            <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>

            <ScrollArea className="h-48 pr-3">
                <div className="space-y-4">
                    {mockItems.map((item) => (
                        <div key={item.id} className="flex justify-between">
                            <span>{item.title}</span>
                            <span>${item.price}</span>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            <hr className="my-4" />

            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$144.00</span>
                </div>

                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$4.00</span>
                </div>

                <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$3.20</span>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>$151.20</span>
                </div>

                <Button className="mt-4 w-full">Place Order</Button>
            </div>
        </div>
    );
}
