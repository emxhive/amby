import { Text } from '@/components/text';
import { cn } from '@/lib/utils';
import * as React from 'react';

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
}

export function SectionTitle({ children, className, ...props }: SectionTitleProps) {
    return (
        <Text as="h2" className={cn('mb-5 font-medium text-zinc-600 uppercase text-xs', className)} {...props}>
            {children}
        </Text>
    );
}
