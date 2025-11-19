import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function OrderSummary() {
  // For demo, static values—replace with cart context later
  const subtotal = 5000;
  const shipping = 1200;
  const total = subtotal + shipping;

  return (
    <aside className="sticky top-28">
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>₦{shipping.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>
          <Button className="mt-6 w-full" disabled>
            Place Order
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}
