import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React from 'react';

interface FormFieldProps {
    id ?: string;
    label: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
    htmlFor?: string;
    rightAction?: React.ReactNode;
}

export function FormField({ label, error, required, children, className, htmlFor, rightAction }: FormFieldProps) {
    return (
        <div className={cn('relative flex flex-col', className)}>
            <div className="flex items-center">
                <Label htmlFor={htmlFor} className="mb-2 flex-1">
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </Label>
                {rightAction && <div className="absolute right-0 ml-2">{rightAction}</div>}
            </div>
            {children}
            <p className="mt-1 h-4 w-9/10 overflow-hidden text-xs text-ellipsis whitespace-nowrap text-red-500" title={error}>
                {error || '\u00A0'}
            </p>
        </div>
    );
}
