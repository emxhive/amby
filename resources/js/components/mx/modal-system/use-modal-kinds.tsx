import { modalRegistry } from './modal-registry';
import { OpenOptions, PropsOf } from './types/modal-kinds';
import { useModal } from './use-modal-system';

type Registry = typeof modalRegistry;

export function useModalKinds() {
    const { open, close } = useModal();

    function openByKind<K extends keyof Registry>(kind: K, opts?: OpenOptions & { props?: PropsOf<Registry[K]> }) {
        const C = modalRegistry[kind] as any;
        if (!C) return;

        open({
            id: opts?.id ?? `modal.${String(kind)}`,
            title: opts?.title ?? String(kind),
            description: opts?.description,
            content: <C {...(opts?.props as any)} />,
            minimizable: opts?.minimizable ?? true,
            className: opts?.className,
            width: opts?.width,
        });
    }

    function prompt<K extends keyof Registry>(kind: K, opts?: OpenOptions & { props?: PropsOf<Registry[K]> }): Promise<any> {
        const C = modalRegistry[kind] as any;
        if (!C) return Promise.resolve(undefined);

        const id = opts?.id ?? `modal.${String(kind)}.${Date.now()}`;

        return new Promise((resolve) => {
            const props = {
                ...(opts?.props as any),
                resolve: (v: any) => {
                    close(id);
                    resolve(v);
                },
            };
            open({
                id,
                title: opts?.title ?? String(kind),
                description: opts?.description,
                content: <C {...props} />,
                minimizable: false,
                className: opts?.className,
                width: opts?.width,
            });
        });
    }

    return { openByKind, prompt };
}
