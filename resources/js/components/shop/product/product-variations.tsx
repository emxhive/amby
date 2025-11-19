// product-variations.tsx
import { cn } from '@/lib/utils';

import { useEffect, useMemo } from 'react';

type SizeKey = 'S' | 'M' | 'L' | 'XL';

type SizeEntry = {
    key: SizeKey;
    id: number;
    price: number;
    packSize: string; // old label, e.g. "200 ml", "1 L"
    disabled: boolean;
};

interface Props {
    variations: ProductVariation[];
    selectedVariationId: number | null;
    onChange: (variationId: number) => void;
}

/** Stable price sort → assign S/M/L/XL (max 4). */

export function ProductVariations({ variations, selectedVariationId, onChange }: Props) {
    const entries = useMemo(() => buildSizeEntries(variations), [variations]);

    // Lookup helpers
    const entryById = useMemo(() => {
        const m = new Map<number, SizeEntry>();
        entries.forEach((e) => m.set(e.id, e));
        return m;
    }, [entries]);

    const firstEnabled = useMemo(() => entries.find((e) => !e.disabled) ?? null, [entries]);

    const selectedEntry = selectedVariationId ? (entryById.get(selectedVariationId) ?? null) : null;

    useEffect(() => {
        if (!selectedEntry && firstEnabled) {
            onChange(firstEnabled.id);
        }
    }, [selectedEntry, firstEnabled, onChange]);

    if (entries.length === 0) return null;

    const activePackSize = selectedEntry?.packSize;

    return (
        <div className="flex flex-col gap-4">
            {/* Modern header with pack size badge */}
            <div className="flex items-center gap-2">
                <span className="text-[10px] font-medium tracking-wide text-zinc-500 uppercase">Size</span>
                {activePackSize ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[10px] font-medium text-zinc-700">
                        <span className="opacity-70">Selected</span>
                        <span className="opacity-40">•</span>
                        <span className="uppercase">{activePackSize}</span>
                    </span>
                ) : null}
            </div>

            {/* Square size boxes; only selected has a dark border */}
            <div role="radiogroup" className="flex gap-1.5">
                {entries.map((e) => {
                    const isActive = e.id === selectedVariationId;
                    return (
                        <button
                            key={e.key}
                            type="button"
                            role="radio"
                            aria-checked={isActive}
                            aria-disabled={e.disabled || undefined}
                            disabled={e.disabled}
                            onClick={() => !e.disabled && onChange(e.id)}
                            className={cn(
                                'h-8 min-w-10 rounded-none px-3 select-none',
                                'border transition-colors outline-none',
                                e.disabled
                                    ? 'cursor-not-allowed border-transparent text-zinc-300'
                                    : isActive
                                      ? 'border-zinc-900 text-zinc-900'
                                      : 'border-transparent text-zinc-500 hover:border-zinc-300 focus-visible:border-zinc-400',
                                'text-xs font-medium uppercase',
                            )}
                        >
                            {e.key}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

function buildSizeEntries(variations: ProductVariation[]): SizeEntry[] {
    const KEYS: SizeKey[] = ['S', 'M', 'L', 'XL'];

    const withIndex = variations.map((v: any, i) => ({ v, i }));
    withIndex.sort((a, b) => {
        const pa = Number(a.v?.price ?? 0);
        const pb = Number(b.v?.price ?? 0);
        return pa === pb ? a.i - b.i : pa - pb;
    });

    return withIndex.slice(0, 4).map((x, idx) => {
        const qty = x.v?.quantity;
        const unit = x.v?.quantity_unit;
        const packSize = [qty, unit].filter(Boolean).join(' ') || x.v?.label || x.v?.sku || '';

        const stockLike = Number(x.v?.quantity ?? x.v?.activeBatch?.stock ?? 0);
        const disabled = x.v?.is_active === false || stockLike <= 0;

        return {
            key: KEYS[idx],
            id: Number(x.v.id),
            price: Number(x.v.price ?? 0),
            packSize,
            disabled,
        } as SizeEntry;
    });
}
