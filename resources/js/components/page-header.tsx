import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

interface PageHeaderProps {
    title: string;
    onAction?: () => void; // What the button does
    actionLabel?: string; // Button text
    actionVariant?: 'default' | 'outline' | 'secondary' | 'destructive';
    actions?: React.ReactNode; // Custom, overrides the default button
    className?: string;
    children?: React.ReactNode; // For breadcrumbs, subtext, etc.
}

export function PageHeader({ title, onAction, actionLabel = 'Save', actionVariant = 'default', actions, className, children }: PageHeaderProps) {
    return (
        <div
            className={cn(
                'sticky top-0 z-20 mb-8 flex items-center justify-between border-b border-gray-100 bg-white/95 px-2 pb-3 backdrop-blur',
                className,
            )}
        >
            <div>
                <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
                {children && <div className="mt-1 text-sm text-muted-foreground">{children}</div>}
            </div>
            <div className="flex items-center gap-3">
                {actions ? (
                    actions // If actions provided, use them
                ) : (
                    <Button className="h-8 w-28 px-5" variant={actionVariant} onClick={onAction}>
                        {actionLabel}
                    </Button>
                )}
            </div>
        </div>
    );
}
