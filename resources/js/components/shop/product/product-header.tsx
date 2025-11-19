import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { collapseBreadcrumbs, makeBreadcrumbs } from '@/lib/utils';
import { mockCategoryTrail } from '@/components/shop/product/types/mock';
import { Heart, Share2, X } from 'lucide-react';
import React from 'react';

interface Props {
    onClose: () => void;
}

export function ProductHeader({ onClose }: Props) {
    const crumbs = makeBreadcrumbs(mockCategoryTrail);
    const displayCrumbs = collapseBreadcrumbs(crumbs);

    return (
        <div className="flex items-center justify-between border-b border-b-ambyRed-100 p-1 px-5">
            {/* Breadcrumbs */}
            <Breadcrumb aria-hidden="true">
                <BreadcrumbList className="text-xs font-bold">
                    {displayCrumbs.map((c, i) => (
                        <React.Fragment key={i}>
                            <BreadcrumbItem>{'ellipsis' in c ? '· · ·' : c.label}</BreadcrumbItem>
                            {i < displayCrumbs.length - 1 && <BreadcrumbSeparator />}
                        </React.Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Share2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}
