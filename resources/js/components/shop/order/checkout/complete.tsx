import { CheckCircle2 } from 'lucide-react';

export function Complete() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <CheckCircle2 className="text-green-500 w-16 h-16 mb-4" />
      <div className="text-2xl font-bold mb-2">Order Complete!</div>
      <div className="text-gray-600 mb-6">
        Thank you for your purchase. A confirmation has been sent to your email.
      </div>
    </div>
  );
}
