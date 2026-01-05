"use client";

import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface GlobalButtonProps {
  label: React.ReactNode;
  form?: string;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "destructive"
    | "ghost"
    | "link";
  icon?: React.ReactNode;
  width?: string;
}

const GlobalButton = ({
  label,
  form,
  onClick,
  type = "button",
  loading,
  disabled,
  className,
  width = "100%",

  variant = "default",
  icon,
}: GlobalButtonProps) => {
  return (
    <Button
      type={type}
      form={form}
      onClick={onClick}
      variant={variant}
      disabled={loading || disabled}
      style={{ width }}
      className={`${className} ${
        variant === "outline" && "border"
      } rounded-md px-4 py-2 flex items-center justify-center`}
    >
      {loading ? <Loader2 className="animate-spin" /> : null}
      {icon ? <span className="inline-flex">{icon}</span> : null}
      {label}
    </Button>
  );
};

export default GlobalButton;
