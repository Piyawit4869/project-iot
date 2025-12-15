import React from "react";

interface ToolbarButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ children, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-8 w-8 items-center justify-center rounded
                 hover:bg-gray-100 active:bg-gray-200
                 transition"
    >
      {children}
    </button>
  );
};

export default ToolbarButton;
