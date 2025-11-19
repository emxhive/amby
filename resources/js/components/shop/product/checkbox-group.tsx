import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CheckboxFilter } from '@/components/shop/product/types/filter-types';

export function CheckboxGroup({ filter }: { filter: CheckboxFilter }) {
    return (
        <div className="space-y-2 px-3 pb-3">
            {filter.options.map((opt) => (
                <div key={opt.id} className="flex items-center gap-2">
                    <Checkbox className="checked:bg-ambyRed-700" id={`${filter.key}-${opt.id}`} />
                    <Label
                        htmlFor={`${filter.key}-${opt.id}`}
                        className="text-[13px] font-light transition duration-300 hover:text-ambyRed-700"
                    >
                        {opt.label}
                    </Label>
                </div>
            ))}
        </div>
    );
}
