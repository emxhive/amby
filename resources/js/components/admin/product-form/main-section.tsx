import { FormField } from '@/components/form-field';
import { SectionCard } from '@/components/section-card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Props {
    data: ProductFormData;
    setData: <K extends keyof ProductFormData>(field: K, value: ProductFormData[K]) => void;
    errors: Record<string, string>;
    className?: string;
}

export default function MainSection({ data, setData, errors, className }: Props) {
    return (
        <SectionCard className={className}>
            <h2 className="mb-2 text-lg font-semibold">Product Info</h2>
            <FormField label="Product Name" error={errors.name} required>
                <Input required value={data.name} onChange={(e: any) => setData('name', e.target.value)} />
            </FormField>
            <FormField label="Description" error={errors.description}>
                <Textarea
                    maxLength={500}
                    className={'h-64 max-h-46 w-full max-w-lg'}
                    value={data.description || undefined}
                    onChange={(e: any) => setData('description', e.target.value)}
                />
            </FormField>
        </SectionCard>
    );
}
