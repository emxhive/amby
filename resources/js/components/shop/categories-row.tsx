import { routes } from '@/lib/routes';

type Item = { name: string; icon?: string };

const categories: Item[] = [
    { name: 'Syrups', icon: '🥞' },
    { name: 'Snacks', icon: '🍿' },
    { name: 'Spreads', icon: '🧈' },
    { name: 'Bundles', icon: '🧺' },
    { name: 'Gifts', icon: '🎁' },
    // ...more allowed; we’ll cap at 6
];

function slugify(s: string) {
    return s.trim().toLowerCase().replace(/\s+/g, '-');
}
const isImg = (v?: string) => !!v && /\/|\.png|\.jpe?g|\.webp|\.gif$/i.test(v || '');

export function CategoriesRow() {
    if (!categories || categories.length < 5) return null;

    const items = categories.slice(0, 6);
    const cols = items.length; // 5 or 6

    return (
        <section className="w-full space-y-6">
            <h2 className="text-center text-3xl md:text-2xl font-bold tracking-wide">
                Shop by Categories
            </h2>

            {/* Full-width grid, fixed gap, columns equal to item count */}
            <div
                className="grid gap-10 w-full"
                style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
            >
                {items.map((it) => {
                    const href = route(routes.shop.products.index, { category: slugify(it.name) });

                    return (
                        <a key={it.name} href={href} className="group flex flex-col items-center gap-3">
                            <div
                                className={[
                                    'w-full aspect-square rounded-full grid place-items-center',
                                    'bg-muted/40 ring-1 ring-muted-foreground/10 shadow-sm',
                                    'transition-colors duration-200 group-hover:bg-muted/60 group-hover:ring-muted-foreground/20',
                                    'mx-auto',
                                    // 'max-w-[220px]', // <- uncomment to keep circles from getting too huge
                                ].join(' ')}
                            >
                                {isImg(it.icon) ? (
                                    <img src={it.icon} alt={it.name} className="h-16 w-16 object-contain select-none" />
                                ) : (
                                    <span className="text-8xl select-none">{it.icon ?? '🛒'}</span>
                                )}
                            </div>
                            <div className="text-sm font-medium text-center text-foreground/90">{it.name}</div>
                        </a>
                    );
                })}
            </div>
        </section>
    );
}
