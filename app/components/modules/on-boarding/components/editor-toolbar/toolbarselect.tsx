import React from "react";

interface ToolbarSelectProps {
  value?: string;
  onChange?: (value: string) => void;
}

const ToolbarSelect: React.FC<ToolbarSelectProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className="rounded-md border px-2 py-1 text-sm
                 focus:outline-none focus:ring-1 focus:ring-gray-400"
    >
      <option value="normal">Normal text</option>
      <option value="h1">Heading 1</option>
      <option value="h2">Heading 2</option>
      <option value="h3">Heading 3</option>
    </select>
  );
};

export default ToolbarSelect;
