import { ModalOptions } from '@/components/mx/modal-system/types/use-modal-system.types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Minus, X } from 'lucide-react';
import * as React from 'react';

interface Props {
    modal: ModalOptions;
    open: boolean;
    onClose: () => void;
    onMinimize: () => void;
}

export function ModalContainer({ modal, open, onClose, onMinimize }: Props) {
    const { hideToolBar, minimizable, className, width, title, description, content } = modal;

    const baseId = React.useId();
    const titleId = `${baseId}-title`;
    const descId = `${baseId}-desc`;

    console.log(descId, 'descId');
    const showHeader = !hideToolBar;

    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent
                className={cn(hideToolBar && 'p-0', className)}
                showCloseButton={false}
                style={width ? { width, maxWidth: width } : undefined}
                aria-labelledby={titleId}
                aria-describedby={descId}
            >
                {/* Toolbar (minimize / close) */}
                {!hideToolBar && (
                    <div className="absolute top-4 right-4 z-10 flex items-center gap-1">
                        {minimizable && (
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
                )}

                {/* Header visible */}
                {showHeader ? (
                    <DialogHeader>
                        <DialogTitle id={titleId}>{title}</DialogTitle>
                        {/* If no description was passed, still render an empty node to satisfy aria-describedby */}
                        <DialogDescription id={descId}>{description ?? ''}</DialogDescription>
                    </DialogHeader>
                ) : (
                    <>
                        <VisuallyHidden asChild>
                            <DialogTitle id={titleId}>{title ?? 'Dialog Title'}</DialogTitle>
                        </VisuallyHidden>
                        <VisuallyHidden asChild>
                            <DialogDescription id={descId}>{description ?? 'Dialog Description'}</DialogDescription>
                        </VisuallyHidden>
                    </>
                )}

                {/* Body/content */}
                {content}
            </DialogContent>
        </Dialog>
    );
}
