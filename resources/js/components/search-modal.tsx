// SearchModal.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';


type Category = { id: string; name: string };

type RecentItem = {
    id: string;
    title: string;
    subtitle?: string;
    pinned?: boolean;
    onSelect?: () => void;
};

type ResultItem = {
    id: string;
    title: string;
    subtitle?: string;
    onSelect?: () => void;
};

type Props = {
    initialQuery?: string;
    categories?: Category[]; // populate for the dropdown
    defaultCategoryId?: string; // preselect a category if you want
    recent?: RecentItem[]; // optional “Recent” list
    fetchResults?: (q: string, categoryId?: string) => Promise<ResultItem[]>;
    onSubmit?: (q: string, categoryId?: string) => void; // Enter key
    onChange?: (q: string, categoryId?: string) => void; // live change
};

export default function SearchModal({ initialQuery, categories = [], defaultCategoryId, recent = [], fetchResults, onSubmit, onChange }: Props) {
    const [q, setQ] = useState(initialQuery ?? '');
    const [catId, setCatId] = useState<string | undefined>(defaultCategoryId ?? categories[0]?.id);
    const [results, setResults] = useState<ResultItem[] | null>(null);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // debounce search
    useEffect(() => {
        onChange?.(q, catId);
        if (!fetchResults) return;
        const t = setTimeout(async () => {
            setLoading(true);
            try {
                const data = await fetchResults(q, catId);
                setResults(data);
            } finally {
                setLoading(false);
            }
        }, 160);
        return () => clearTimeout(t);
    }, [q, catId]);

    const hasQuery = q.trim().length > 0;
    const showRecent = !hasQuery && recent.length > 0;
    const showResults = hasQuery && (results?.length ?? 0) > 0;

    const catOptions = useMemo(() => categories, [categories]);

    return (
        <div className="relative overflow-hidden rounded-xl border bg-white">
            {/* Top search bar */}
            <div className="sticky top-0 z-10 border-b bg-white/80 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="flex items-center gap-3">
                    <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border px-3 py-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="11" cy="11" r="7" strokeWidth="2"></circle>
                            <path d="m21 21-3.5-3.5" strokeWidth="2"></path>
                        </svg>
                        <input
                            ref={inputRef}
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') onSubmit?.(q, catId);
                            }}
                            placeholder="Search documentation"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                        />
                        <span className="hidden items-center gap-1 rounded-md border px-1.5 py-0.5 text-[10px] text-gray-500 md:flex">esc</span>
                    </div>

                    {/* Optional inline category select (header) – can hide if you prefer only in footer */}
                    {catOptions.length > 0 && (
                        <div className="hidden md:block">
                            <CategorySelect value={catId} onChange={setCatId} options={catOptions} />
                        </div>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="px-2 py-2">
                {/* Recent */}
                {showRecent && (
                    <Section title="Recent">
                        {recent.map((item) => (
                            <Row key={item.id} title={item.title} subtitle={item.subtitle} onClick={item.onSelect} />
                        ))}
                    </Section>
                )}

                {/* Results */}
                {hasQuery && (
                    <>
                        {loading && <div className="flex items-center justify-center py-10 text-sm text-gray-500">Searching…</div>}
                        {!loading && showResults && (
                            <Section title="Results">
                                {results!.map((r) => (
                                    <Row key={r.id} title={r.title} subtitle={r.subtitle} onClick={r.onSelect} />
                                ))}
                            </Section>
                        )}
                        {!loading && !showResults && <div className="px-4 py-8 text-sm text-gray-500">No results for “{q}”.</div>}
                    </>
                )}

                {/* No recent, no query */}
                {!hasQuery && recent.length === 0 && <div className="px-4 py-8 text-sm text-gray-500">Type to start searching…</div>}
            </div>

            {/* Footer — replaces “Search by Algolia” with category dropdown */}
            <div className="sticky bottom-0 z-10 flex items-center justify-between gap-3 border-t bg-white/80 px-4 py-2 text-xs text-gray-500 backdrop-blur supports-[backdrop-filter]:bg-white/60">
                <div className="hidden md:block">
                    Tip: Use <kbd className="rounded border px-1">/</kbd> to focus, <kbd className="rounded border px-1">esc</kbd> to close.
                </div>
                {catOptions.length > 0 && (
                    <div className="ml-auto flex items-center gap-2">
                        <span className="hidden md:inline">Filter:</span>
                        <CategorySelect value={catId} onChange={setCatId} options={catOptions} />
                    </div>
                )}
            </div>
        </div>
    );
}

/** Small components */

function  Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="py-1">
            <div className="px-4 pt-3 pb-2 text-xs font-medium tracking-wide text-gray-500 uppercase">{title}</div>
            <div className="divide-y rounded-lg border">{children}</div>
        </div>
    );
}

function Row({ title, subtitle, onClick }: { title: string; subtitle?: string; onClick?: () => void }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-gray-50 focus:outline-none"
        >
            <div className="min-w-0">
                <div className="truncate text-sm">{title}</div>
                {subtitle && <div className="truncate text-xs text-gray-500">{subtitle}</div>}
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="m9 18 6-6-6-6" strokeWidth="2" />
            </svg>
        </button>
    );
}

function CategorySelect({ value, onChange, options }: { value?: string; onChange: (v: string) => void; options: Category[] }) {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)} className="rounded-lg border bg-white px-3 py-2 text-sm outline-none">
            {options.map((o) => (
                <option key={o.id} value={o.id}>
                    {o.name}
                </option>
            ))}
        </select>
    );
}
