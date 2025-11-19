import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface RenderSelectFieldProps {
    id: string;
    name: string;
    value: any;
    onChange: (e: { currentTarget: { name: string; value: any } }) => void;
    options?: { value: any; label: string }[];
    className?: string;
}

export default function RenderSelectField({ id, name, value, onChange, options = [], className }: RenderSelectFieldProps) {
    return (
        <Select key={id} value={value} onValueChange={(val: any) => onChange({ currentTarget: { name, value: val } })}>
            <SelectTrigger className={className}>
                <SelectValue placeholder="Select…" />
            </SelectTrigger>
            <SelectContent>
                {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} >
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
