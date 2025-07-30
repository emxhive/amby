
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function PlusButton({ children = 'Add', className = '', iconClassName = '', ...props }) {
    return (
        <Button type="button" variant="outline" size="sm" className={`mt-2 flex items-center ${className}`} {...props}>
            <Plus className={`mr-1 h-4 w-4 ${iconClassName}`} />
            {children}
        </Button>
    );
}
