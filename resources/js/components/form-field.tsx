import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import React from 'react';

interface FormFieldProps {
    id?: string;
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
        <div className={cn('relative flex flex-col pb-4', className)}>
            <div className="flex items-center">
                <Label htmlFor={htmlFor} className="mb-2 flex-1">
                    {label}
                    {required && <span className="ml-1 text-red-500">*</span>}
                </Label>
                {rightAction && <div className="absolute right-0 ml-2">{rightAction}</div>}
            </div>
            {children}

            {error ? (
                <p
                    className={cn(
                        'absolute -bottom-2 left-0 z-10 w-full truncate rounded border border-red-100 bg-red-50 p-1 px-3 text-xs text-red-600 shadow-md',
                        'w-full',
                    )}
                    title={error}
                    style={{ pointerEvents: 'none' }}
                >
                    {error}
                </p>
            ) : (
                ''
            )}
        </div>
    );
}
