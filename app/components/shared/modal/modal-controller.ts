import { create } from "zustand";

export type ModalType = "success" | "info" | "warning" | "delete";

export interface ModalOptions {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  type: ModalType;
}

interface ModalState extends ModalOptions {
  open: boolean;
  loading: boolean;
  show: (options: ModalOptions) => void;
  hide: () => void;
  setLoading: (loading: boolean) => void;
}

const defaultState: Omit<ModalState, "show" | "hide" | "setLoading"> = {
  open: false,
  type: "info",
  title: "",
  description: "",
  confirmText: "ยืนยัน",
  cancelText: "ยกเลิก",
  onConfirm: undefined,
  onCancel: undefined,
  loading: false,
};

export const useModalStore = create<ModalState>((set) => ({
  ...defaultState,

  show: (options) =>
    set(() => ({
      ...defaultState,
      ...options,
      open: true,
      loading: false,
    })),

  hide: () => set({ open: false }),

  setLoading: (loading) => set({ loading }),
}));
