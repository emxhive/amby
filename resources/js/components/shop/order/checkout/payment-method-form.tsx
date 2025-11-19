import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { paymentMethods } from './constants';
import { useState } from 'react';

interface Props {
  onPrev: () => void;
  onNext: () => void;
}

export function PaymentMethodForm({ onPrev, onNext }: Props) {
  const [method, setMethod] = useState<string>(paymentMethods[0]?.id ?? '');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onNext();
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 text-lg font-medium">Select payment method</div>
        <RadioGroup
          value={method}
          onValueChange={setMethod}
          className="space-y-3"
        >
          {paymentMethods.map((pm) => (
            <div
              key={pm.id}
              className="flex items-center gap-3 border rounded-lg p-4 hover:shadow transition"
            >
              <RadioGroupItem value={pm.id} id={pm.id} />
              <Label htmlFor={pm.id} className="flex-1 cursor-pointer">
                <div className="font-semibold">{pm.label}</div>
                {pm.description && (
                  <div className="text-xs text-gray-500">{pm.description}</div>
                )}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="flex justify-between pt-2">
        <Button variant="outline" type="button" onClick={onPrev}>Back</Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
