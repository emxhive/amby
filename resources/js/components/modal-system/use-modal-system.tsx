import { Docker } from '@/components/modal-system/components/docker';
import { ModalContainer } from '@/components/modal-system/components/modal-container';
import React, { createContext, JSX, ReactNode, useContext, useMemo, useState } from 'react';
import { ModalContextValue, ModalOptions, SubDialogStateMap, UseSubDialogReturn } from './use-modal-system.types';

// Always provide a type for context
const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }): JSX.Element {
    const [modals, setModals] = useState<ModalOptions[]>([]);
    const [openId, setOpenId] = useState<string | null>(null);
    const [minimized, setMinimized] = useState<string[]>([]);
    const [subDialogs, setSubDialogs] = useState<SubDialogStateMap>({});

    const open = (modal: ModalOptions): void => {
        setModals((prev) => {
            const without = prev.filter((m) => m.id !== modal.id);
            return [...without, modal];
        });
        setOpenId(modal.id);
        setMinimized((prev) => prev.filter((id) => id !== modal.id));
    };

    const close = (id: string): void => {
        setModals((prev) => prev.filter((m) => m.id !== id));
        setMinimized((prev) => prev.filter((mid) => mid !== id));
        setOpenId((prev) => (prev === id ? null : prev));
        setSubDialogs((prev) => {
            const { [id]: _removed, ...rest } = prev;
            return rest;
        });
    };

    const minimize = (id: string): void => {
        setMinimized((prev) => Array.from(new Set([...prev, id])));
        setOpenId((prev) => (prev === id ? null : prev));
    };

    const restore = (id: string): void => {
        setOpenId(id);
        setMinimized((prev) => prev.filter((mid) => mid !== id));
    };

    const setSubDialogState = (modalId: string, subId: string, open: boolean): void => {
        setSubDialogs((prev) => ({
            ...prev,
            [modalId]: {
                ...(prev[modalId] || {}),
                [subId]: open,
            },
        }));
    };

    const useSubDialog = (modalId: string, subId: string): UseSubDialogReturn => {
        const isOpen: boolean = !!subDialogs[modalId]?.[subId];
        const setOpen = (value: boolean): void => setSubDialogState(modalId, subId, value);
        return [isOpen, setOpen];
    };

    const getOpenSubDialog = (modalId: string): string | null => {
        const subs = subDialogs[modalId] || {};
        return Object.keys(subs).find((key) => subs[key]) || null;
    };

    const manageStack = (modalId: string): boolean => {
        const openSub = getOpenSubDialog(modalId);
        if (openSub) {
            setSubDialogState(modalId, openSub, false);
            return true;
        }
        return false;
    };

    const ModalUI: React.ReactNode = (
        <>
            {modals.map((modal) => (
                <ModalContainer
                    key={modal.id}
                    modal={modal}
                    open={openId === modal.id}
                    onClose={() => {
                        if (manageStack(modal.id)) return;
                        close(modal.id);
                    }}
                    onMinimize={() => minimize(modal.id)}
                />
            ))}
        </>
    );

    const DockUI: React.ReactNode = <Docker modals={modals} minimized={minimized} onRestore={restore} />;

    const value = useMemo<ModalContextValue>(
        () => ({
            open,
            close,
            minimize,
            restore,
            useSubDialog,
            ModalUI,
            DockUI,
        }),
        [modals, openId, minimized, subDialogs],
    );

    return (
        <ModalContext.Provider value={value}>
            {ModalUI}
            {children}
        </ModalContext.Provider>
    );
}

export function useModal(): ModalContextValue {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error('useModal must be used within ModalProvider');
    return ctx;
}
