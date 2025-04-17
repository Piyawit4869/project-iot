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
}

const GlobalButton = ({
  label,
  form,
  onClick,
  type = "button",
  loading,
  disabled,
}: GlobalButtonProps) => {
  return (
    <Button
      type={type}
      form={form}
      onClick={onClick}
      disabled={loading || disabled}
    >
      {loading && <Loader2 className="animate-spin" />}
      {label}
    </Button>
  );
};

export default GlobalButton;
