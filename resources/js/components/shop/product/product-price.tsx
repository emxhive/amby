import { cn } from '@/lib/utils';

interface Props {
    unitPrice?: number | null; // undefined/null until a variation is selected
    quantity: number;
    currency?: string; // defaults to USD
}

export function ProductPrice({ unitPrice, quantity, currency = 'USD' }: Props) {
    const total = unitPrice != null ? unitPrice * quantity : null;

    const fmt = (v: number) => new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(v);

    return (
        <div className={cn('w-48')}>
            <div className="text-2xl text-zinc-900">{total != null ? fmt(total) : '—'}</div>
        </div>
    );
}
