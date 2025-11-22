import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { OrderSummary } from "./order-summary";

export function MobileSummaryDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="bg-black text-white px-4 py-2 rounded-lg">
          View Summary
        </button>
      </DrawerTrigger>

      <DrawerContent className="p-6">
        <OrderSummary />
      </DrawerContent>
    </Drawer>
  );
}
