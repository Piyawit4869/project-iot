import { useModalStore } from "@/components/shared/modal/modal-controller";
import type {
  ModalOptions,
  ModalType,
} from "@/components/shared/modal/modal-controller";

function showModal(type: ModalType, options: Omit<ModalOptions, "type">) {
  useModalStore.getState().show({
    type,
    ...options,
  });
}

export const GlobalModal = {
  info: (options: Omit<ModalOptions, "type">) => showModal("info", options),
  success: (options: Omit<ModalOptions, "type">) => showModal("info", options),
  warning: (options: Omit<ModalOptions, "type">) =>
    showModal("warning", options),
  delete: (options: Omit<ModalOptions, "type">) => showModal("delete", options),
};
