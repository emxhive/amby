#!/usr/bin/env bash

# Create/update checkout mock data
cat > resources/js/features/checkout/mock.ts << 'EOF'
export const checkoutMock = {
  addresses: [
    {
      id: "addr_default",
      name: "Zeki",
      label: "Ugbowo Quarters",
      line1: "House 26, EDU Road",
      city: "Benin City",
      tag: "Default",
    },
    {
      id: "addr_last_used",
      name: "Zeki",
      label: "Ikeja Office",
      line1: "12B Isaac John Street",
      city: "Lagos",
      tag: "Last Used",
    },
  ],
  shippingMethods: [
    {
      id: "standard",
      label: "Standard Delivery (3–5 days)",
      description: "Delivered in 3–5 business days.",
      price: "$4.00",
    },
    {
      id: "express",
      label: "Express Delivery (1–2 days)",
      description: "Delivered in 1–2 business days.",
      price: "$12.00",
    },
  ],
  paymentMethods: [
    {
      id: "stripe",
      label: "Stripe",
      description: "Pay securely with your card.",
    },
    {
      id: "cod",
      label: "Cash on Delivery",
      description: "Pay when your order arrives.",
    },
    {
      id: "bank",
      label: "Bank Transfer",
      description: "Send payment from your bank.",
    },
  ],
  contactInfoDefaults: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
};
EOF

# Create/update shared SectionTitle component
cat > resources/js/features/checkout/components/section-title.tsx << 'EOF'
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";
import * as React from "react";

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export function SectionTitle({ children, className, ...props }: SectionTitleProps) {
  return (
    <Text
      as="h2"
      variant="title"
      className={cn("mb-3", className)}
      {...props}
    >
      {children}
    </Text>
  );
}
EOF

# Update ContactInfoSection to use SectionTitle and PhoneInput
cat > resources/js/features/checkout/components/contact-info-section.tsx << 'EOF'
import { SectionTitle } from "./section-title";
import { Input } from "@/components/ui/input";
import { PhoneInput } from "@/components/ui/phone-input";

export function ContactInfoSection() {
  return (
    <section className="space-y-4">
      <SectionTitle>Contact Information</SectionTitle>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input placeholder="First Name" />
        <Input placeholder="Last Name" />
        <Input placeholder="Email" type="email" />
        <PhoneInput placeholder="Phone Number" defaultCountry="NG" />
      </div>
    </section>
  );
}
EOF

# Update DeliveryAddressSection to use RadioTiles and mock data
cat > resources/js/features/checkout/components/delivery-address-section.tsx << 'EOF'
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioTile, RadioTileGroup } from "@/components/radio-tile";
import { Text } from "@/components/text";
import { SectionTitle } from "./section-title";
import { checkoutMock } from "../mock";

export function DeliveryAddressSection() {
  const { addresses } = checkoutMock;

  return (
    <section className="space-y-4">
      <SectionTitle>Delivery Address</SectionTitle>

      <RadioTileGroup
        direction="horizontal"
        defaultValue={addresses[0]?.id}
      >
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
          <Text
            as="span"
            className="text-sm font-medium text-ambyRed-700"
          >
            Select Existing Address
          </Text>
        </Button>

        <Button variant="ghost" className="px-0">
          <Text
            as="span"
            className="text-sm font-medium text-ambyRed-700"
          >
            Add New Address
          </Text>
        </Button>
      </div>
    </section>
  );
}
EOF

# Update PaymentMethodSection to use mock data and SectionTitle
cat > resources/js/features/checkout/components/payment-method-section.tsx << 'EOF'
import { RadioTile, RadioTileGroup } from "@/components/radio-tile";
import { CreditCard, Landmark, Wallet } from "lucide-react";
import { SectionTitle } from "./section-title";
import { checkoutMock } from "../mock";

export function PaymentMethodSection() {
  const { paymentMethods } = checkoutMock;

  const getIcon = (id: string) => {
    switch (id) {
      case "stripe":
        return <CreditCard className="h-6 w-6 text-primary" />;
      case "cod":
        return <Wallet className="h-6 w-6 text-primary" />;
      case "bank":
        return <Landmark className="h-6 w-6 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <section className="space-y-4">
      <SectionTitle>Payment Method</SectionTitle>

      <RadioTileGroup
        direction="horizontal"
        defaultValue={paymentMethods[0]?.id}
      >
        {paymentMethods.map((method) => (
          <RadioTile
            key={method.id}
            value={method.id}
            icon={getIcon(method.id)}
            label={method.label}
            description={method.description}
          />
        ))}
      </RadioTileGroup>
    </section>
  );
}
EOF

# Update ShippingMethods to use RadioTiles and mock data
cat > resources/js/features/checkout/components/shipping-methods.tsx << 'EOF'
import { Truck } from "lucide-react";
import { RadioTile, RadioTileGroup } from "@/components/radio-tile";
import { SectionTitle } from "./section-title";
import { checkoutMock } from "../mock";

export function ShippingMethods() {
  const { shippingMethods } = checkoutMock;

  return (
    <section className="space-y-4">
      <SectionTitle>Shipping Method</SectionTitle>

      <RadioTileGroup
        direction="vertical"
        defaultValue={shippingMethods[0]?.id}
      >
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
EOF
