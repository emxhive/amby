// pages/shop/product/components/mock-filters.ts

export interface CheckboxOption {
    id: string | number;
    label: string;
}

export interface CheckboxFilter {
    key: string;
    label: string;
    type: 'checkbox';
    options: CheckboxOption[];
    selected?: (string | number)[];
}

export interface RangeFilter {
    key: string;
    label: string;
    type: 'range';
    min: number;
    max: number;
    step?: number;
    unit?: string;
    selected?: [number, number];
}

export type AnyFilter = CheckboxFilter | RangeFilter;

