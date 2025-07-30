
import { cn } from '@/lib/utils'
import React from 'react'

interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SectionCard({ className, ...props }: SectionCardProps) {
    return (
        <div
            className={cn(
                "flex flex-col gap-6",
                "rounded-xl bg-gray-50/30 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 p-6 pr-10",
                className
            )}
            {...props}
        />
    )
}
