import { TwinFields, VariationSectionTextArea, VarIconButton } from '@/components/admin/product-form/components/variation-section-components';
import { FormField } from '@/components/form-field';
import { useModal } from '@/components/mx/modal-system/use-modal-system';
import { SectionCard } from '@/components/section-card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { volumeUnits } from '@/lib/constants';
import { PRODUCT_UPDATE__ADD_BATCH_NOTES } from '@/lib/modal-ids';
import { Info, Paperclip, PlusSquare, Trash2 } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface Props {
    isCreate: boolean;
    data: ProductFormData;
    setVariation: (idx: number, key: keyof FormVariation, value: string | boolean) => void;
    addVariation: () => void;
    removeVariation: (idx: number) => void;
    getVariationError: (idx: number, field: string) => string | undefined;
    volumeUnits: string[];
    className?: string;
}

export default function VariationsSection({ data, setVariation, addVariation, removeVariation, getVariationError, className, isCreate }: Props) {
    const cache = useRef({ varAdded: false });
    const fieldRef = useRef<HTMLElement>(null);
    const notesRef = useRef('');

    const { open, close } = useModal();
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
                                onChange={(e) => setVariation(idx, 'stock', e.target.value)}
                                placeholder="Stock"
                            />

                            {!isCreate && variation?.id && (
                                <Tooltip>
                                    <div className="absolute -bottom-2 left-1 z-10 flex w-full items-center gap-2 py-1">
                                        <Checkbox
                                            id={`fresh-batch-${idx}`}
                                            checked={variation?.is_new_batch}
                                            onCheckedChange={(checked) => setVariation(idx, 'is_new_batch', checked)}
                                            className="transition data-[state=checked]:bg-black"
                                        />
                                        <div className="cursor-pointer text-xs text-gray-600">fresh batch {!variation.is_new_batch && '?'}</div>

                                        <TooltipTrigger asChild>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="icon"
                                                className="mr-2 ml-auto flex size-3 items-center justify-center bg-transparent text-red-400 hover:bg-transparent hover:text-red-600"
                                                aria-label="Info"
                                            >
                                                <Info className="size-3" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" align="center" className="text-xs">
                                            Ends the previous batch and starts a new sales record.
                                            <br />
                                            Select only for major changes.
                                            <br />
                                            <br />
                                            After selection, a note icon will appear. Click it to add details about the change.
                                        </TooltipContent>
                                    </div>
                                </Tooltip>
                            )}
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
                        <FormField className={'flex-1/2'} label="Unit" error={getVariationError(idx, 'quantity_unit')}>
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

                    <span className="absolute right-4 bottom-1 flex gap-4">
                        <VarIconButton
                            onClick={() => {
                                open({
                                    id: PRODUCT_UPDATE__ADD_BATCH_NOTES,
                                    description: 'Record noteworthy info for new batch',
                                    title: 'Add Notes',
                                    content: <VariationSectionTextArea notes={variation.notes} noteRef={notesRef} />,
                                    onClose: (value) => {
                                        close(PRODUCT_UPDATE__ADD_BATCH_NOTES);
                                        setVariation(idx, 'notes', notesRef.current);
                                    },
                                });
                            }}
                            condition={!!variation.is_new_batch}
                            className={'bg-blue-100 text-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400'}
                            label={'Notes For New Batch'}
                        >
                            <Paperclip className="h-3 w-3" />
                        </VarIconButton>

                        <VarIconButton
                            condition={idx > 0}
                            label={'Remove variation'}
                            className={'bg-red-100 text-red-500 hover:bg-red-600 focus:ring-2 focus:ring-red-400'}
                            onClick={() => removeVariation(idx)}
                        >
                            <Trash2 className="h-3 w-3" />
                        </VarIconButton>
                    </span>
                </div>
            ))}
        </SectionCard>
    );
}
