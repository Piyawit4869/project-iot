// components/Modal.tsx
"use client";

import { X } from "lucide-react";
import type React from "react";
import type { ModalProps } from "~/schemas/on-boarding/onboard";

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="mb-4">{children}</div>

        {/* Footer */}
        {footer && <div className="flex justify-end gap-2 pt-2">{footer}</div>}
      </div>
    </div>
  );
};
