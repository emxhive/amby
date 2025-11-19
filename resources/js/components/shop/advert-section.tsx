import { routes } from '@/lib/routes';
import { PALM_PATH_D } from '@/lib/svg-paths';
import { cn } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import React from 'react';
import { FiAward, FiCheckCircle, FiHeart, FiLayers } from 'react-icons/fi';

type Feature = {
    id: string;
    title: string;
    text?: string;
    bullets?: string[];
    icon: React.ReactNode;
    className?: string; // grid size
    iconColor: string;
    iconBg?: string;
    cta?: { label: string; to: string };
};

export default function AdvertSection() {
    return (
        <section
            className={cn(
                'relative overflow-hidden rounded-2xl cursor-pointer',
                'bg-gradient-to-br from-transparent to-zinc-50',
                'transition-all duration-500 hover:shadow-md',
            )}
        >
            <div className="mx-auto flex max-w-7xl flex-col px-4 py-16 md:py-24 lg:flex-row lg:justify-between lg:gap-12 lg:px-8">
                {/* LEFT */}
                <div className="flex flex-col justify-center space-y-4 lg:basis-4/6">
                    <span className="text-sm font-semibold tracking-wide text-zinc-500 uppercase">Introducing our Flagship</span>

                    <span className="w-fit text-4xl leading-tight font-extrabold text-ambyRed-700 md:text-6xl">
                        <div>AMBYDATE</div>
                        <div className="text-right">SYRUP</div>
                    </span>

                    <p className="max-w-prose text-sm text-zinc-600">
                        Pure date sweetness—silky texture, deep caramel notes, and zero refined sugar. Made to elevate everyday meals without
                        compromise.
                    </p>
                </div>

                {/* RIGHT */}
                <div className="mt-12 lg:mt-0 lg:basis-2/6">
                    <FeatureGrid />
                </div>
            </div>
        </section>
    );
}

function FeatureGrid() {
    return (
        <div className="flex flex-col gap-4 lg:gap-6">
            {features.map((f) => (
                <article key={f.id} className="flex cursor-pointer items-start gap-4 rounded-lg bg-white p-5">
                    {/* Icon */}
                    <div className={cn('flex h-12 w-12 shrink-0 items-center justify-center rounded-full', f.iconBg || 'bg-zinc-100')}>
                        <div className={f.iconColor}>{f.icon}</div>
                    </div>

                    {/* Text */}
                    <div>
                        <h3 className="text-base leading-snug font-semibold text-zinc-600">{f.title}</h3>
                        {f.text && <p className="mt-1 line-clamp-3 text-xs leading-snug font-medium text-zinc-400">{f.text}</p>}
                    </div>
                </article>
            ))}
        </div>
    );
}

/* ---------------- palm decoration ---------------- */

const thickness = 2; // slightly thicker so filled icons stand out
const size = 18;

const features: Feature[] = [
    {
        id: 'satisfaction',
        title: 'Guaranteed Satisfaction',
        text: 'Over 80% repeat buyers, reflecting long-term trust and satisfaction.',
        icon: <FiHeart size={size} strokeWidth={thickness} />,
        iconColor: 'text-ambyRed-500',
        iconBg: 'bg-ambyRed-100/40',
    },
    {
        id: 'nutrition',
        title: 'Nutrient Rich',
        text: 'A natural source of minerals, antioxidants, and balanced sweetness.',
        icon: <FiAward size={size} strokeWidth={thickness} />,
        iconColor: 'text-ambyBlue-500',
        iconBg: 'bg-ambyBlue-100/30',
    },
    {
        id: 'versatile',
        title: 'Culinary Flexibility',
        text: 'Equally suited for glazes, breakfast dishes, and modern beverages.',
        icon: <FiLayers size={size} strokeWidth={thickness} />,
        iconColor: 'text-amber-500',
        iconBg: 'bg-amber-100/40',
    },
    {
        id: 'certified',
        title: 'Safety Assured',
        text: 'Certified to meet rigorous food safety and labeling standards.',
        icon: <FiCheckCircle size={size} strokeWidth={thickness} />,
        iconColor: 'text-emerald-500',
        iconBg: 'bg-emerald-100/30',
    },
];

function PalmDecoration({ color = '#d6c9a3', palmScale = 0.25, palmYOffset = 200 }: { color?: string; palmScale?: number; palmYOffset?: number }) {
    return (
        <svg
            className="pointer-events-none absolute bottom-0 left-0 h-full w-auto select-none"
            viewBox="0 0 1440 220"
            preserveAspectRatio="none"
            aria-hidden
        >
            <rect x="0" y="175" width="1440" height="65" fill="rgba(214,201,163,0.25)" />
            <path
                d="M0,175 C90,155 180,155 270,175 S450,195 630,175 S900,155 1125,175 S1315,195 1440,175 L1440,220 L0,220 Z"
                fill="rgba(214,201,163,0.35)"
            />
            <g
                transform={`
          translate(720, ${palmYOffset})
          scale(${palmScale})
          translate(-256, -505)
        `}
            >
                <path d={PALM_PATH_D} fill={color} opacity={0.4} />
            </g>
        </svg>
    );
}

const Shopping = () => {
    return (
        <a
            href={route(routes.shop.products.index)}
            className="flex w-max cursor-pointer items-center rounded-full bg-black py-1.5 pr-12 pl-1.5 shadow-lg transition-all duration-150 hover:scale-105 hover:shadow-xl"
        >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ambyYellow-600">
                <ShoppingCart className="h-5 w-5 text-black" />
            </span>
            <span className="ml-7 text-sm font-semibold text-white">Shop Now</span>
        </a>
    );
};
