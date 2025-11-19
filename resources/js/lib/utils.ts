import axios from 'axios';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function pi(name: string) {
    return `/imgs/${name}`;
}

export function imgSrc(str: string) {
    if (str.startsWith('http')) return str;
    if (str.startsWith('/storage/')) return str;
    return '/storage/' + str;
}

export async function handleImageUpload(file: File, route: string) {
    if (!file?.type.startsWith('image/')) return;
    const formData = new FormData();
    formData.append('image', file);
    const res = await axios.post(route, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data.path;
}

export function txt(text: number) {
    return text.toLocaleString();
}

export function figs(n: number) {
    if (n >= 1_000_000) {
        return (n / 1_000_000).toFixed(n % 1_000_000 ? 1 : 0).replace(/\.0$/, '') + 'M';
    }
    if (n >= 10_000) {
        return (n / 1_000).toFixed(n % 1_000 ? 1 : 0).replace(/\.0$/, '') + 'K';
    }
    return n.toLocaleString();
}

export function randBtw(min: number, max: number): number {
    const val = Math.random() * (max - min) + min;

    if (Number.isInteger(min) && Number.isInteger(max)) {
        return Math.round(val);
    }

    if (Math.random() < 0.5) {
        const nwVal = Math.round(val);
        return nwVal < min ? min : nwVal > max ? max : nwVal;
    } else {
        return parseFloat(val.toFixed(2));
    }
}

export function makeBreadcrumbs(trail: Category[]): Crumb[] {
    return trail.map((c) => ({
        label: c.name,
        href: `/shop/category/${c.slug}`,
    }));
}

// collapse breadcrumbs if > 3
export function collapseBreadcrumbs(crumbs: Crumb[]): Crumb[] | (Crumb | { ellipsis: true })[] {
    if (crumbs.length <= 3) return crumbs;

    return [crumbs[0], { ellipsis: true }, ...crumbs.slice(-2)];
}
