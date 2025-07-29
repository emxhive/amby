import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Minus, X } from 'lucide-react';

interface Props {
    modal: ModalOptions;
    open: boolean;
    onClose: () => void;
    onMinimize: () => void;
}

export function ModalContainer({ modal, open, onClose, onMinimize }: Props) {
    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent
                showCloseButton={false}
                style={modal.width ? { width: modal.width, maxWidth: modal.width } : undefined}
            >
                {/* Custom buttons container for close and minimize */}
                <div className="absolute top-4 right-4 flex items-center gap-1">
                    {modal.minimizable && (
                        <button
                            onClick={onMinimize}
                            className="rounded p-1 opacity-70 transition hover:bg-gray-100 hover:opacity-100"
                            aria-label="Minimize"
                            tabIndex={0}
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="rounded p-1 opacity-70 transition hover:bg-gray-100 hover:opacity-100"
                        aria-label="Close"
                        tabIndex={0}
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <DialogHeader className="">
                    <DialogTitle>{modal.title}</DialogTitle>
                </DialogHeader>
                <div className={'max-h-[calc(100dvh-150px)] overflow-y-scroll'}>{modal.content}</div>
            </DialogContent>
        </Dialog>
    );
}
