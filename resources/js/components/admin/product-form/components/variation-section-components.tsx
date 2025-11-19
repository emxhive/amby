import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { ReactNode, RefObject } from 'react';

type VarIconButtonProps = {
    condition: boolean;
    className: string;
    children?: ReactNode;
    label: string;
    onClick: () => void;
};

export const VarIconButton = ({ condition, className, children, onClick, label }: VarIconButtonProps) => {
    return condition ? (
        <Button
            onClick={onClick}
            type="button"
            size="icon"
            className={cn(
                'flex size-6 items-center justify-center rounded-full p-0 shadow transition hover:text-white focus:ring-2 focus:outline-none',
                className,
            )}
            aria-label={label}
        >
            {children}
        </Button>
    ) : null;
};

export const TwinFields = ({ children, className }: { children: ReactNode; className?: string }) => {
    return <div className={'flex gap-1'}>{children}</div>;
};


type VariationSectionTextAreaProps = {
    notes: string | undefined;
    noteRef: RefObject<string>;
};
export const VariationSectionTextArea = ({ notes, noteRef }: VariationSectionTextAreaProps) => {
    noteRef.current = notes || '';

    return (
        <Textarea
            maxLength={225}
            className="h-80 max-h-80"
            placeholder="eg. The overall sugar content was reduced by 5% "
            defaultValue={notes}
            onBlur={(e: any) => {
                noteRef.current = e.target.value;
            }}
        />
    );
};
