import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import React from 'react';

type Category = {
    id: number;
    name: string;
    parent_id: number | null;
    is_default?: boolean;
};

type CategorySelectViewProps = {
    categories: Category[];
    value: string | number | null;
    onValueChange: (value: any) => void;

    open?: boolean;
    onOpenChange?: (open: boolean) => void;

    removeDefault?: boolean;
    includeNone?: boolean;
    noneLabel?: string;
    className?: string;
    disabledIds?: (string | number)[];
};

export const CategorySelectView: React.FC<CategorySelectViewProps> = ({
    categories,
    open,
    onOpenChange,
    value,
    onValueChange,
    includeNone = false,
    removeDefault = false,
    noneLabel = 'None',

    disabledIds = [],
}) => {
    const fullTree = buildCategoryTree(categories);
    const categoryTree = removeDefault ? fullTree.filter(({ cat }) => !cat.is_default) : fullTree;

    // Display name for selected value
    const selectedName =
        value == null || value === '' ? noneLabel : categoryTree.find(({ cat }) => String(cat.id) === String(value))?.cat.name || noneLabel;

    return (
        <Select
            open={open}
            onOpenChange={onOpenChange}
            value={value == null || value === '' ? 'none' : String(value)}
            onValueChange={(val) => {
                if (val === 'none') onValueChange(null);
                else onValueChange(val);
            }}
        >
            <SelectTrigger className="mt-1">{selectedName}</SelectTrigger>
            <SelectContent>
                {includeNone && (
                    <SelectItem value="none">
                        <TreeListItem name={noneLabel} level={0} />
                    </SelectItem>
                )}
                {categoryTree.map(({ cat, level }) => {
                    const notRoot = level > 0;
                    return (
                        <SelectItem
                            key={cat.id}
                            value={String(cat.id)}
                            disabled={disabledIds.includes(String(cat.id)) || disabledIds.includes(cat.id)}
                        >
                            <TreeListItem name={cat.name} level={level} notRoot={notRoot} />
                        </SelectItem>
                    );
                })}
            </SelectContent>
        </Select>
    );
};

function buildCategoryTree(
    categories: Category[],
    parentId: number | null = null,
    level: number = 0,
): {
    cat: Category;
    level: number;
}[] {
    let result: { cat: Category; level: number }[] = [];
    categories
        .filter((cat) => cat.parent_id === parentId)
        .forEach((cat) => {
            result.push({ cat, level });
            result.push(...buildCategoryTree(categories, cat.id, level + 1));
        });
    return result;
}

const levelColors = ['text-gray-800', 'text-gray-600', 'text-gray-500'];
const getLevelColor = (level: number) => levelColors[level] || levelColors[levelColors.length - 1];
const Hrs: React.FC<{ invisible?: boolean; notRoot?: boolean }> = ({ invisible = false, notRoot = false }) => (
    <hr className={cn(notRoot && 'w-3', invisible && 'border-transparent')} style={{ margin: 0 }} />
);

const TreeListItem: React.FC<{ name: string; level: number; notRoot?: boolean; className?: string }> = ({ name, level, notRoot, className }) => (
    <div className={cn('flex flex-row items-center', className)}>
        {Array.from({ length: level }).map((_, i) => (
            <Hrs key={i} invisible notRoot={notRoot} />
        ))}
        <div className={cn(notRoot && 'border-l', 'relative h-3')} />
        <Hrs notRoot={notRoot} />
        <div className={cn(notRoot && 'pl-1', getLevelColor(level))}>{name}</div>
    </div>
);
