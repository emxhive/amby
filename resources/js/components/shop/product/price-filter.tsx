import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RangeFilter } from '@/components/shop/product/types/filter-types';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import React from 'react';

export function PriceFilter({ filter, onChange }: { filter: RangeFilter; onChange?: (v: [number, number]) => void }) {
    const [value, setValue] = React.useState<[number, number]>(filter.selected ?? [filter.min, filter.max]);

    // Sync with external filter changes if needed
    React.useEffect(() => {
        if (!filter.selected) return;
        if (filter.selected[0] !== value[0] || filter.selected[1] !== value[1]) {
            setValue([filter.selected[0], filter.selected[1]]);
        }
    }, [filter.selected]);

    // Slider change
    const handleSliderChange = (val: number | number[]) => {
        if (Array.isArray(val)) {
            const newVal = [val[0], val[1]] as [number, number];
            setValue(newVal);
            onChange?.(newVal);
        }
    };

    // Input change
    const handleInputChange = (idx: 0 | 1, raw: string) => {
        let num = parseInt(raw, 10);
        if (isNaN(num)) num = idx === 0 ? filter.min : filter.max;
        let newValue: [number, number] = [...value] as [number, number];
        newValue[idx] = num;

        // Clamp
        newValue[0] = Math.max(filter.min, Math.min(newValue[0], filter.max, newValue[1]));
        newValue[1] = Math.max(filter.min, Math.min(newValue[1], filter.max));
        setValue(newValue);
        onChange?.(newValue);
    };

    return (
        <section className="m-4 rounded-lg border border-zinc-50 bg-white p-3 shadow-sm">
            <div className="mb-2 text-center text-sm font-medium uppercase">{filter.label}</div>

            <Slider range min={filter.min} max={filter.max} step={filter.step} value={value} allowCross={false} onChange={handleSliderChange} />
            <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                    <Label htmlFor="min-price" className="text-xs">
                        Min
                    </Label>
                    <Input
                        id="min-price"
                        type="number"
                        className="w-full"
                        value={value[0]}
                        min={filter.min}
                        max={value[1]}
                        onChange={(e) => handleInputChange(0, e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="max-price" className="text-xs">
                        Max
                    </Label>
                    <Input
                        id="max-price"
                        type="number"
                        className="w-full"
                        value={value[1]}
                        min={value[0]}
                        max={filter.max}
                        onChange={(e) => handleInputChange(1, e.target.value)}
                    />
                </div>
            </div>
        </section>
    );
}
