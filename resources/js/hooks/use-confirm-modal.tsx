import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useRef, useState } from 'react';

interface ConfirmModalOptions {
    title?: string;
    message?: string;
}

function useConfirmModal() {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<ConfirmModalOptions | null>(null);

    // Ref to hold the current resolver
    const resolver = useRef<(result: boolean) => void>(undefined);

    const confirm = (opts: ConfirmModalOptions): Promise<boolean> => {
        setOptions(opts);
        setOpen(true);
        return new Promise<boolean>((resolve) => {
            resolver.current = resolve;
        });
    };

    const handleClose = (result: boolean) => {
        setOpen(false);
        if (resolver.current) {
            resolver.current(result);
            resolver.current = undefined;
        }
    };

    const ConfirmDialog = (
        <Dialog open={open} onOpenChange={() => handleClose(false)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{options?.title || 'Are you sure?'}</DialogTitle>
                    {options?.message && <DialogDescription>{options.message}</DialogDescription>}
                </DialogHeader>
                <DialogFooter>
                    <button onClick={() => handleClose(false)} className="mr-2">
                        Cancel
                    </button>
                    <button onClick={() => handleClose(true)} className="text-red-600">
                        Confirm
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return { confirm, ConfirmDialog };
}

export default useConfirmModal;
