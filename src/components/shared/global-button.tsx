import React from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

interface GlobalButtonProps {
  label: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
}

const GlobalButton = ({
  label,
  type = "button",
  loading,
  disabled,
}: GlobalButtonProps) => {
  return (
    <Button type={type} disabled={loading || disabled}>
      {loading && <Loader2 className="animate-spin" />}
      {label}
    </Button>
  );
};

export default GlobalButton;
