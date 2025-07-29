import React from 'react';

interface Props {
    modals: ModalOptions[];
    minimized: string[];
    onRestore: (id: string) => void;
}

export function Docker({ modals, minimized, onRestore }: Props) {
    const visible = modals.filter((m) => minimized.includes(m.id));

    if (visible.length === 0) return null;

    return (
        <div className="fixed bottom-4 right-4 flex gap-2 z-50">
            {visible.map((modal) => (
                <button
                    key={modal.id}
                    onClick={() => onRestore(modal.id)}
                    className="bg-gray-800 text-white px-3 py-1 rounded shadow"
                >
                    {modal.title}
                </button>
            ))}
        </div>
    );
}
