// modal-kinds.ts
import React from 'react';

export type AnyFC<P = any> = React.FC<P>;
export type PropsOf<C> = C extends AnyFC<infer P> ? P : never;

export type OpenOptions = {
    id?: string;
    title?: string;
    className?: string;
    width?: string;
    minimizable?: boolean;
    description?: React.ReactNode;
};

// Helper to keep strong typing for the registry object.
export function defineModals<T extends Record<string, AnyFC<any>>>(r: T) {
    return r;
}
