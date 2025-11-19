import React, { ReactNode } from 'react';

/**
 * Options for a modal instance.
 */
export type ModalOptions = {
    description: React.ReactNode | undefined;
    hideToolBar?: boolean;
    hideNativeHeader?: boolean;
    id: string;
    title: string;
    content: ReactNode;
    minimizable?: boolean;
    onClose?: (value?: any) => void;
    className?: string;
    width?: string;
};

/**
 * State for all sub-dialogs under a single modal.
 * Keys are sub-dialog IDs, values are open states.
 */
export type SubDialogs = Record<string, boolean>;

/**
 * State map for all sub-dialogs under all modals.
 * Keys are modal IDs, values are sub-dialog state maps.
 */
export type SubDialogStateMap = Record<string, SubDialogs>;

export type UseSubDialogReturn = [isOpen: boolean, setOpen: (open: boolean) => void];

export interface ModalContextValue {
    open: (modal: ModalOptions) => void;
    close: (id: string) => void;
    minimize: (id: string) => void;
    restore: (id: string) => void;
    useSubDialog: (modalId: string, subId: string) => UseSubDialogReturn;
    ModalUI: ReactNode;
    DockUI: ReactNode;
}
