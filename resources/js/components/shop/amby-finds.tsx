import { pi } from '@/lib/utils';
import { routes } from '@/lib/routes';

export function AmbyFinds() {
    const chips = [
        { id: 3, title: 'Caramel Popcorn', img: pi('placeholder.png') },
        { id: 6, title: 'Cocoa Spread', img: pi('placeholder.png') },
        { id: 2, title: 'Syrup 500ml', img: pi('placeholder.png') },
    ];

    return (
        <section className="flex items-center gap-6 border-zinc-100 py-3 px-6 border-t border-b">
            <div className="relative flex w-max items-center rounded-full bg-ambyRed-100/40 py-1.5 pr-3 pl-10 text-sm font-semibold text-ambyRed-300">
                <span className="absolute left-1 text-2xl drop-shadow-md">🍔</span>
                Amby Finds
            </div>

            <p className="text-sm text-muted-foreground">Light, tasty, and made for your sweet tooth—check out this week’s picks.</p>

            <div className="ml-auto flex items-center gap-3">
                {chips.map((c, i) => (
                    <a
                        key={i}
                        href={route(routes.shop.products.show, { id: c.id })}
                        className="flex items-center gap-2 rounded-full border border-muted-foreground/10 py-1 pr-3 pl-1 transition-colors hover:bg-muted/20"
                    >
                        <div className="h-8 w-8 overflow-hidden rounded-full bg-muted">
                            <img src={c.img} alt={c.title} className="h-full w-full object-contain" />
                        </div>
                        <span className="text-xs">{c.title}</span>
                    </a>
                ))}
            </div>
        </section>
    );
}

const bg = 'bg-ambyRed-100/20';
