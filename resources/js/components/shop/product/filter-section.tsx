import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { CheckboxGroup } from '@/components/shop/product/checkbox-group';
import { PriceFilter } from '@/components/shop/product/price-filter';
import { CheckboxFilter, RangeFilter } from '@/components/shop/product/types/filter-types';
import { mockFilters } from '@/components/shop/product/types/mock';

export function FilterSection() {
    const groups = mockFilters.filter((f) => f.type === 'checkbox') as CheckboxFilter[];
    const price = mockFilters.find((f) => f.type === 'range') as RangeFilter | undefined;

    return (
        <aside
            className={cn(
                'hide-scrollbar overflow-y-auto',
                'hidden max-w-64 flex-[3_0_0%] md:flex md:flex-col',
                'border border-t-2 border-r-[2.5px] p-1 shadow-sm',
            )}
        >
            <Accordion type="multiple" defaultValue={groups.map((g) => g.key)} className="space-y-0">
                {/* First two Accordions */}
                <AccordionGroup group={groups.slice(0, 2)} />

                {/* PriceFilter in between */}
                {price && <PriceFilter filter={price} />}

                {/* The rest of the Accordions */}
                <AccordionGroup group={groups.slice(2)} />
            </Accordion>

            <div className="flex-1 pb-4"></div>
        </aside>
    );
}

const AccordionGroup = ({ group }: { group: CheckboxFilter[] }) => {
    return group.map((filter) => (
        <AccordionItem key={filter.key} value={filter.key} className="rounded-none border-0 bg-white">
            <AccordionTrigger className="rounded-none border-b border-zinc-100 p-3 font-medium uppercase hover:no-underline">
                {filter.label}
            </AccordionTrigger>
            <AccordionContent className="pt-4">
                <CheckboxGroup filter={filter} />
            </AccordionContent>
        </AccordionItem>
    ));
};
