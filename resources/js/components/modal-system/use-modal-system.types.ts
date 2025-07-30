interface ModalContextValue {
    open: (modal: ModalOptions) => void;
    close: (id: string) => void;
    minimize: (id: string) => void;
    restore: (id: string) => void;
    ModalUI: React.ReactNode;
    DockUI: React.ReactNode;
}

interface ModalOptions {
    id: string;
    title: string;
    content: React.ReactNode;
    minimizable?: boolean;
    className?: string;
    width?: string;
}
