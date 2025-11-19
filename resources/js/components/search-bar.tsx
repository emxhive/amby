import { Search } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';

export type SearchPayload = { q: string; category?: string; scope?: 'all' | 'products' };
export type Category = { label: string; value: string };

export type SearchBarOpenArgs = Readonly<{
    onSubmit: (p: SearchPayload) => void; // passed straight through to your modal
    initial?: Partial<SearchPayload>; // seed the modal (e.g., prefill q)
    categories?: Category[]; // hand your modal the category list if you want
}>;

export type SearchBarProps = Readonly<{
    onSubmit: (p: SearchPayload) => void;
    categories?: Category[];
    initial?: Partial<SearchPayload>;
    className?: string;
    autoFocus?: boolean;
}>;

export function SearchBar({
    onSubmit,
    categories = [{ label: 'All', value: 'all' }],
    initial = {},
    className = '',
    autoFocus = false,
}: SearchBarProps) {
    const btnRef = useRef<HTMLButtonElement>(null);
    const isMac = useMemo(() => typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform), []);

    const onOpen = (args: SearchBarOpenArgs) => {};

    useEffect(() => {
        if (autoFocus) btnRef.current?.focus();
    }, [autoFocus]);

    // Global Cmd/Ctrl+K -> open modal
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            const t = e.target as HTMLElement | null;
            const inField = !!t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || (t as HTMLElement).isContentEditable);

            if (!inField && (isMac ? e.metaKey : e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                onOpen({ onSubmit, initial, categories }); // you do the rest
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isMac, onOpen, onSubmit, initial, categories]);

    const open = (boost?: Partial<SearchPayload>) =>
        onOpen({
            onSubmit,
            initial: { ...initial, ...boost },
            categories,
        });

    return (
        <div className={`relative ${className}`}>
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 opacity-60" />
            <button
                ref={btnRef}
                type="button"
                aria-haspopup="dialog"
                aria-label="Open search"
                aria-keyshortcuts={isMac ? 'Meta+K' : 'Control+K'}
                onClick={() => open()}
                onKeyDown={(e) => {
                    // If focused here, and they type a printable char, open and prefill q with the first key
                    if (e.key.length === 1 && !e.altKey && !e.ctrlKey && !e.metaKey) {
                        e.preventDefault();
                        open({ q: `${initial.q ?? ''}${e.key}` });
                    }
                }}
                className="h-9 w-60 rounded-full border bg-background pr-10 pl-9 text-left text-sm text-muted-foreground shadow-xs ring-offset-background transition outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
                Search products…
            </button>
            <kbd className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded-full border bg-muted px-1.5 py-0.5 text-[10px] leading-4 text-muted-foreground">
                {isMac ? '⌘K' : 'Ctrl K'}
            </kbd>
        </div>
    );
}
