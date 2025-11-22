import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface LabelledInputProps extends React.HTMLAttributes<HTMLDivElement> {
    label: string;
    name?: string;
    id?: string;
    children?: React.ReactNode;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export function LabelledInput({ label, name, id, children, inputProps, className, ...props }: LabelledInputProps) {
    const inputId = id || name;

    return (
        <div className={cn('space-y-1.5', className)} {...props}>
            <Label htmlFor={inputId} className="text-xs font-medium text-zinc-600">
                {label}
            </Label>

            {children ? children : <Input id={inputId} name={name} {...inputProps} />}
        </div>
    );
}
