import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const textVariants = cva('', {
    variants: {
        variant: {
            title: 'text-xl font-semibold text-zinc-900',
            cardTitle: 'text-[13px] font-bold text-zinc-900',
            body: 'text-sm text-zinc-700',
            muted: 'text-xs text-muted-foreground',
        },
    },
    defaultVariants: {
        variant: 'body',
    },
});

// POLYMORPHIC PROP TYPING (the correct pattern)
type TextProps<T extends React.ElementType> = {
    as?: T;
    variant?: VariantProps<typeof textVariants>['variant'];
    className?: string;
} & Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'className'>;

export function Text<T extends React.ElementType = 'span'>({ as, variant, className, ...props }: TextProps<T>) {
    const Comp = as || 'span';

    return <Comp className={cn(textVariants({ variant }), className)} {...props} />;
}
