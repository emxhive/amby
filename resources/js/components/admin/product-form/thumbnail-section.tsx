import { FormField } from '@/components/form-field';
import { SectionCard } from '@/components/section-card';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface Props {
    data: ProductFormData;
    setData: <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => void;
    errors: Record<string, string>;
    className?: string;
}

export default function ThumbnailSection({ data, setData, errors, className }: Props) {
    const fileInput = useRef<HTMLInputElement>(null);

    return (
        <SectionCard className={cn('flex flex-col items-center space-y-2', className)}>
            <FormField label="Thumbnail" error={errors.image} className="flex w-full flex-col items-center">
                <input
                    ref={fileInput}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setData('image', e.target.files?.[0] || null)}
                />
                <div
                    className="mb-2 flex h-28 w-28 cursor-pointer items-center justify-center rounded bg-gray-100"
                    onClick={() => fileInput.current?.click()}
                >
                    {data.image ? (
                        <img src={URL.createObjectURL(data.image)} alt="thumb" className="h-full w-full rounded object-cover" />
                    ) : (
                        <span className="text-gray-400">Click to select</span>
                    )}
                </div>
                <span className="text-xs text-gray-400">Only JPG, PNG allowed</span>
            </FormField>
        </SectionCard>
    );
}
