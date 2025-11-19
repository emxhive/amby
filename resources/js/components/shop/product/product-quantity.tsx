import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Minus, Plus } from 'lucide-react';

interface Props {
    value: number;
    onChange: (val: number) => void;
}

export function ProductQuantity({ value, onChange }: Props) {
    return (
        <div className="flex items-center gap-3">
            <Button
                size="icon"
                variant="outline"
                onClick={() => onChange(Math.max(1, value - 1))}
                className={cn('h-8 w-8 rounded-none border border-zinc-300', 'hover:border-zinc-400')}
            >
                <Minus className="h-4 w-4" />
            </Button>

            <span className="min-w-[32px] text-center text-sm font-medium tracking-wide uppercase">{value}</span>

            <Button
                size="icon"
                variant="outline"
                onClick={() => onChange(value + 1)}
                className={cn('h-8 w-8 rounded-none border border-zinc-300', 'hover:border-zinc-400')}
            >
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    );
}
