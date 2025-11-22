import { Text } from '@/components/text';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import * as React from 'react';

type Direction = 'vertical' | 'horizontal';

interface RadioTileProps extends React.ComponentPropsWithoutRef<typeof RadioGroupItem> {
    icon?: React.ReactNode;
    label: React.ReactNode;
    description?: React.ReactNode;
    tag?: React.ReactNode;
}

/**
 * RadioTile
 * - Icon left
 * - Label (cardTitle)
 * - Description (muted)
 * - Optional tag badge (tiny text)
 * - Radio circle far right
 */
export const RadioTile = React.forwardRef<React.ElementRef<typeof RadioGroupItem>, RadioTileProps>(
    ({ icon, label, description, tag, className, disabled, ...props }, ref) => {
        return (
            <label
                className={cn(
                    'group relative flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xs transition-all',
                    'hover:border-zinc-300 hover:bg-accent/40',
                    // active styles
                    'has-[data-state=checked]:border-zinc-900 has-[data-state=checked]:ring-2 has-[data-state=checked]:ring-zinc-300',
                    // disabled
                    'has-[data-disabled]:cursor-not-allowed has-[data-disabled]:opacity-60',
                    className,
                )}
            >
                {icon && <div className="shrink-0">{icon}</div>}

                <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                        {/* LABEL */}
                        <div>
                            <Text as="div" variant="cardTitle">
                                {label}
                            </Text>

                            {description && typeof description === 'string' ? (
                                <Text as="div" variant="muted" className="mt-0.5">
                                    {description}
                                </Text>
                            ) : (
                                description
                            )}
                        </div>

                        {/* TAG */}
                        {tag && (
                            <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5">
                                <Text variant="muted" className="text-[10px] font-medium">
                                    {tag}
                                </Text>
                            </span>
                        )}
                    </div>
                </div>

                <RadioGroupItem
                    ref={ref}
                    {...props}
                    disabled={disabled}
                    className={cn(
                        'ml-3 h-4 w-4 rounded-full border border-zinc-500',
                        // OUTER RING
                        'data-[state=checked]:border-ambyRed-700',

                        // INNER DOT COLOR
                        'data-[state=checked]:text-ambyRed-700', // <— THIS is the inner dot fill

                        // STRUCTURE
                        'flex items-center justify-center',
                        'data-[disabled]:opacity-60',
                    )}
                />
            </label>
        );
    },
);

RadioTile.displayName = 'RadioTile';

interface RadioTileGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroup> {
    direction?: Direction;
}

/**
 * RadioTileGroup
 * - Vertical (stacked)
 * - Horizontal (row, wraps)
 */
export function RadioTileGroup({ direction = 'vertical', className, ...props }: RadioTileGroupProps) {
    return (
        <RadioGroup
            className={cn(
                direction === 'vertical' && 'flex flex-col gap-3',
                direction === 'horizontal' && 'flex flex-row flex-wrap gap-4 [&>*]:flex-1 [&>*]:basis-[30%]',
                className,
            )}
            {...props}
        />
    );
}
