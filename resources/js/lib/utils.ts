import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// utils/http.ts
export class HttpError extends Error {
    status: number;
    body?: any;

    constructor(status: number, message: string, body?: any) {
        super(message);
        this.name = 'HttpError';
        this.status = status;
        this.body = body;
    }
}

// Grabs Laravel's CSRF token if present (add <meta name="csrf-token" ...> to your blade layout)
function getCsrfToken() {
    if (typeof document !== 'undefined') {
        const el = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement;
        return el?.content;
    }
    return undefined;
}

// Universal POST: supports JSON, FormData, validation, CSRF
export async function post<TData = any, TResponse = any>(url: string, data?: TData | FormData, options: RequestInit = {}): Promise<TResponse> {
    const isFormData = typeof FormData !== 'undefined' && data instanceof FormData;
    const headers: HeadersInit = {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...(getCsrfToken() && { 'X-CSRF-TOKEN': getCsrfToken() }),
        ...(options.headers || {}),
    };

    const response = await fetch(url, {
        method: 'POST',
        headers,
        body: data ? (isFormData ? data : JSON.stringify(data)) : undefined,
        credentials: 'same-origin',
        ...options,
    });

    const contentType = response.headers.get('Content-Type') || '';
    let body: any = null;

    if (contentType.includes('application/json')) {
        body = await response.json();
    } else {
        body = await response.text();
    }

    if (!response.ok) {
        throw new HttpError(response.status, `HTTP error! status: ${response.status}`, body);
    }

    return body;
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**Public Image */
export function pi(name: string) {
    return `/imgs/${name}`;
}
