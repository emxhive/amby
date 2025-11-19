import { DotDotDotLoader } from '@/components/dot-dot-dot-loader';
import { Button } from '@/components/ui/button';
import { AnimateLoading } from '@/components/utils';
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
    processing?: boolean;
    processingLabel?: string;
}

export function PageHeader({
    title,
    onAction,
    actionLabel = 'Save',
    processingLabel = 'Saving',
    actionVariant = 'default',
    actions,
    className,
    children,
    processing,
}: PageHeaderProps) {
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
                    actions
                ) : (
                    <Button disabled={processing} className="h-8 w-35 px-5" variant={actionVariant} onClick={onAction}>
                        <AnimateLoading processing={!!processing} />
                        {processing ? (
                            <span>
                                {processingLabel}
                                <DotDotDotLoader />
                            </span>
                        ) : (
                            actionLabel
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
}
