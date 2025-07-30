import { FormField } from '@/components/form-field';
import { SectionCard } from '@/components/section-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { volumeUnits } from '@/lib/constants';
import { PlusSquare, X } from 'lucide-react';
import { ReactNode, useEffect, useRef } from 'react';

interface Props {
    data: ProductFormData;
    setVariation: (idx: number, key: keyof FormVariation, value: string) => void;
    addVariation: () => void;
    removeVariation: (idx: number) => void;
    getVariationError: (idx: number, field: string) => string | undefined;
    volumeUnits: string[];
    className?: string;
}

export default function VariationsSection({ data, setVariation, addVariation, removeVariation, getVariationError, className }: Props) {
    const cache = useRef({ varAdded: false });
    const fieldRef = useRef<HTMLElement>(null);

    useEffect(() => {
        if (cache.current.varAdded) {
            fieldRef.current?.scrollIntoView({ behavior: 'smooth' });
            cache.current.varAdded = false;
        }
    }, [data.variations.length]);

    const addVariationHandler = () => {
        addVariation();
        cache.current.varAdded = true;
        fieldRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <SectionCard className={className}>
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Quantity Variations</h2>

                <PlusSquare
                    onClick={addVariationHandler}
                    aria-label="Add Variation"
                    className="cursor-pointer text-primary/60 transition-colors duration-300 hover:text-primary/70"
                />
            </div>

            {data.variations.map((variation, idx) => (
                <div
                    // @ts-ignore
                    ref={cache.current.varAdded && idx == data.variations.length - 1 ? fieldRef : undefined}
                    className="relative flex items-center gap-3 rounded-md border-2 border-gray-50 bg-white p-5 pt-8"
                    key={idx}
                >
                    <FormField label="SKU" error={getVariationError(idx, 'sku')} className="flex-1/3">
                        <Input value={variation.sku} onChange={(e: any) => setVariation(idx, 'sku', e.target.value)} placeholder="Enter SKU" />
                    </FormField>

                    <TwinFields>
                        <FormField label="Stock" error={getVariationError(idx, 'stock')} className="">
                            <Input
                                type="number"
                                value={variation.stock}
                                onChange={(e: any) => setVariation(idx, 'stock', e.target.value)}
                                placeholder="Stock"
                            />
                        </FormField>

                        <FormField label="Price" error={getVariationError(idx, 'price')}>
                            <Input
                                type="number"
                                value={variation.price}
                                onChange={(e: any) => setVariation(idx, 'price', e.target.value)}
                                placeholder="Price"
                            />
                        </FormField>
                    </TwinFields>

                    <TwinFields>
                        <FormField label="Quantity" error={getVariationError(idx, 'name')}>
                            <Input
                                value={variation.quantity}
                                onChange={(e: any) => setVariation(idx, 'quantity', e.target.value)}
                                placeholder="e.g. 250"
                            />
                        </FormField>
                        <FormField className={'flex-1/4'} label="Unit" error={getVariationError(idx, 'quantity_unit')}>
                            <Select value={variation.quantity_unit} onValueChange={(val) => setVariation(idx, 'quantity_unit', val)}>
                                <SelectTrigger>{variation.quantity_unit}</SelectTrigger>
                                <SelectContent>
                                    {volumeUnits.map((unit) => (
                                        <SelectItem key={unit} value={unit}>
                                            {unit}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormField>
                    </TwinFields>

                    {idx > 0 && (
                        <X
                            onClick={() => removeVariation(idx)}
                            className="absolute top-2 right-4 h-8 w-8 cursor-pointer rounded-full p-2 text-destructive transition-colors duration-300 hover:bg-destructive/10"
                        />
                    )}
                </div>
            ))}
        </SectionCard>
    );
}

const TwinFields = ({ children, className }: { children: ReactNode; className?: string }) => {
    return <div className={'flex gap-1'}>{children}</div>;
};
