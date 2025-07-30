import { Docker } from '@/components/modal-system/components/docker';
import { ModalContainer } from '@/components/modal-system/components/modal-container';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [modals, setModals] = useState<ModalOptions[]>([]);
    const [openId, setOpenId] = useState<string | null>(null);
    const [minimized, setMinimized] = useState<string[]>([]);

    const open = (modal: ModalOptions) => {
        setModals((prev) => {
            const without = prev.filter((m) => m.id !== modal.id);
            return [...without, modal];
        });
        setOpenId(modal.id);
        setMinimized((prev) => prev.filter((id) => id !== modal.id));
    };

    const close = (id: string) => {
        setModals((prev) => prev.filter((m) => m.id !== id));
        setMinimized((prev) => prev.filter((id) => id !== id));
        setOpenId((prev) => (prev === id ? null : prev));
    };

    const minimize = (id: string) => {
        setMinimized((prev) => [...new Set([...prev, id])]);
        setOpenId((prev) => (prev === id ? null : prev));
    };

    const restore = (id: string) => {
        setOpenId(id);
        setMinimized((prev) => prev.filter((mid) => mid !== id));
    };

    const ModalUI = (
        <>
            {modals.map((modal) => (
                <ModalContainer
                    key={modal.id}
                    modal={modal}
                    open={openId === modal.id}
                    onClose={() => close(modal.id)}
                    onMinimize={() => minimize(modal.id)}
                />
            ))}
        </>
    );

    const DockUI = <Docker modals={modals} minimized={minimized} onRestore={restore} />;

    const value = useMemo(() => ({ open, close, minimize, restore, ModalUI, DockUI }), [modals, openId, minimized]);

    return (
        <ModalContext.Provider value={value}>
            {ModalUI}
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error('useModal must be used within ModalProvider');
    return ctx;
}
