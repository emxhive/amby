//@ts-nocheck
import { defineModals } from '@/components/mx/modal-system/types/modal-kinds';
import SearchModal from './SearchModal';
import ConfirmModal from './ConfirmModal';

export const modalRegistry = defineModals({
    // add as many as you like
    search: SearchModal,       // props: { initialQuery?: string }
    confirm: ConfirmModal,     // props: { title?, body?, confirmText?, cancelText?, intent?, resolve?(value:boolean) }
});
