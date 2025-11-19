import { ModalOptions } from 'resources/js/components/mx/modal-system/types/use-modal-system.types';

interface Props {
    modals: ModalOptions[];
    minimized: string[];
    onRestore: (id: string) => void;
}

export function Docker({ modals, minimized, onRestore }: Props) {
    const visible = modals.filter((m) => minimized.includes(m.id));

    if (visible.length === 0) return null;

    return (
        <div className="fixed right-4 bottom-4 z-50 flex gap-2">
            {visible.map((modal) => (
                <button key={modal.id} onClick={() => onRestore(modal.id)} className="rounded bg-gray-800 px-3 py-1 text-white shadow">
                    {modal.title}
                </button>
            ))}
        </div>
    );
}
