import React from "react";

export interface StatusCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  valueColor?: string;
}

export interface NavCardProps {
  title: string;
  icon: React.ReactNode;
  valueColor?: string;
}

export interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}
