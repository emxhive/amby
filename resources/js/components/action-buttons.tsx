import useConfirmModal from '@/hooks/use-confirm-modal';

import { LucideIcon, Pencil, Trash2 } from 'lucide-react';
import React from 'react';

type ActionType = 'edit' | 'delete' | string;

interface ActionConfig {
    type: ActionType;
    onClick: (e?: React.MouseEvent) => void;
    icon?: LucideIcon;
    className?: string;
    confirm?: boolean;
    confirmTitle?: string;
    confirmText?: string;
    label?: string;
}

const ACTION_PRESETS: Record<string, Partial<ActionConfig>> = {
    edit: {
        icon: Pencil,
        className: 'hover:bg-primary/10 text-primary p-2 rounded transition-colors duration-300',
        label: 'Edit',
    },
    delete: {
        icon: Trash2,
        className: 'hover:bg-destructive/10 text-destructive p-2 rounded transition-colors duration-300',
        confirmTitle: 'Delete Item?',
        confirmText: 'This action cannot be undone.',
        label: 'Delete',
    },
};

function ActionIcon(
    props: ActionConfig & {
        onConfirm?: (() => void) | null;
    },
) {
    const { type, onClick, icon, className, confirm, confirmTitle, confirmText, label, onConfirm, ...rest } = props;
    const preset = ACTION_PRESETS[type] || {};
    const Icon = icon || preset.icon || Pencil;
    const btnClass = className || preset.className;
    const actionLabel = label || preset.label || type;

    const handleClick = (e: React.MouseEvent) => {
        if (confirm && onConfirm) {
            onConfirm();
        } else {
            onClick(e);
        }
    };

    return (
        <button onClick={handleClick} className={btnClass} type="button" aria-label={actionLabel} title={actionLabel} {...rest}>
            <Icon className="h-3.5 w-3.5" />
        </button>
    );
}

export function ActionButtons({ actions }: { actions: ActionConfig[] }) {
    const { confirm: openConfirm, ConfirmDialog } = useConfirmModal();

    const handleConfirmation = async (action: ActionConfig) => {
        const result = await openConfirm({
            title: action.confirmTitle || ACTION_PRESETS[action.type]?.confirmTitle || 'Are you sure?',
            message: action.confirmText || ACTION_PRESETS[action.type]?.confirmText || '',
        });

        if (result) {
            action.onClick();
        }
    };

    return (
        <div className="flex gap-3">
            {actions.map((action, i) => (
                <ActionIcon
                    key={i}
                    {...action}
                    onConfirm={action.confirm ? () => handleConfirmation(action) : null}
                />
            ))}
            {ConfirmDialog}
        </div>
    );
}
