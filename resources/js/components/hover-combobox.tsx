// src/components/ui/hover-combobox.tsx
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';

export type Item = {
    value: string;
    label: string;
    icon?: React.ReactNode; // optional per-item icon
    keywords?: string[]; // extra search terms
};

type HoverComboboxProps = {
    items: Item[];
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    ariaLabel?: string;
    className?: string;
    TriggerIcon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    renderTriggerText?: (item: Item | undefined) => React.ReactNode;

    // styling hooks
    triggerClassName?: string;
    iconClassName?: string;
    textClassName?: string;
    chevronClassName?: string;
    contentClassName?: string;
};

/** Detects coarse pointer (mobile/touch) */
function useCoarsePointer() {
    const [coarse, setCoarse] = React.useState(false);

    React.useEffect(() => {
        const m = window.matchMedia?.('(pointer: coarse)');
        if (!m) return;

        // initial
        setCoarse(m.matches);

        const handler = (e: MediaQueryListEvent) => setCoarse(e.matches);

        if (typeof m.addEventListener === 'function') {
            m.addEventListener('change', handler);
            return () => m.removeEventListener('change', handler);
        } else if (typeof m.addListener === 'function') {
            // legacy Safari
            m.addListener(handler);
            return () => m.removeListener(handler);
        }
    }, []);

    return coarse;
}

/**
 * A text-only, icon-leading, searchable combobox.
 * - Desktop: opens on hover (with slight delay), no arrow, no outline/border.
 * - Mobile (coarse pointer): opens on tap, shows a small chevron.
 */
export function HoverCombobox({
    items,
    value,
    onChange,
    placeholder = 'Select…',
    searchPlaceholder = 'Search',
    ariaLabel,
    className,
    TriggerIcon,
    renderTriggerText,
    triggerClassName,
    iconClassName,
    textClassName,
    chevronClassName,
    contentClassName,
}: HoverComboboxProps) {
    const isCoarse = useCoarsePointer();
    const [open, setOpen] = React.useState(false);

    const selected = React.useMemo(() => items.find((i) => i.value === value), [items, value]);

    // timers for delayed open/close
    const openTimer = React.useRef<number | null>(null);
    const closeTimer = React.useRef<number | null>(null);

    const setOpenWithDelay = (next: boolean, delay = 180) => {
        if (next) {
            if (closeTimer.current) window.clearTimeout(closeTimer.current);
            openTimer.current = window.setTimeout(() => setOpen(true), delay);
        } else {
            if (openTimer.current) window.clearTimeout(openTimer.current);
            closeTimer.current = window.setTimeout(() => setOpen(false), delay);
        }
    };

    // Desktop hover handlers with delay
    const hoverHandlers = isCoarse
        ? {}
        : {
              onMouseEnter: () => setOpenWithDelay(true, 120),
              onMouseLeave: () => setOpenWithDelay(false, 150),
          };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <button
                    type="button"
                    aria-label={ariaLabel}
                    aria-expanded={open}
                    className={cn(
                        'group inline-flex items-center gap-2 bg-transparent p-0 select-none focus:outline-none',
                        triggerClassName,
                        className,
                    )}
                    onClick={() => (isCoarse ? setOpen((o) => !o) : setOpen(true))}
                    {...hoverHandlers}
                >
                    {TriggerIcon && <TriggerIcon className={cn('size-5 shrink-0', iconClassName)} aria-hidden />}

                    <span className={cn('text-sm leading-none font-medium', textClassName)}>
                        {renderTriggerText ? renderTriggerText(selected) : (selected?.label ?? placeholder)}
                    </span>

                    <ChevronDown
                        className={cn('size-4 transition-transform group-aria-expanded:rotate-180 md:hidden', chevronClassName)}
                        aria-hidden
                    />
                </button>
            </PopoverTrigger>

            <PopoverContent
                side="top"
                align="start"
                sideOffset={6}
                avoidCollisions
                collisionPadding={8}
                onOpenAutoFocus={(e) => e.preventDefault()}
                className={cn('w-56 origin-bottom-left rounded-md p-0 shadow-md', contentClassName)}
                {...hoverHandlers}
            >
                <Command shouldFilter>
                    <CommandInput placeholder={searchPlaceholder} />
                    <CommandEmpty>No results.</CommandEmpty>
                    <CommandGroup>
                        {items.map((item) => (
                            <CommandItem
                                key={item.value}
                                keywords={[item.label, ...(item.keywords ?? [])]}
                                onSelect={() => {
                                    onChange?.(item.value);
                                    setTimeout(() => setOpen(false), 80); // close with a tiny delay
                                }}
                                className={cn('gap-2 px-3 py-2')}
                            >
                                <span className={cn('text-xs font-medium text-zinc-600', value === item.value && 'text-ambyRed-600')}>
                                    {item.label}
                                </span>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
