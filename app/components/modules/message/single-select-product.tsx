"use client";

import { ProductSelectBox } from "./product-select-box";

type Option = { value: string; label: string };
type SingleSelectSimpleProps = {
  options: Option[];
  onChange: (selected: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
};

export function SingleSelectOnModalProduct({
  options,
  onChange,
}: SingleSelectSimpleProps) {
  const handleSelectProduct = (value: string) => {
    onChange(value);
  };

  return (
    <>
      <div className="relative w-full">
        <ProductSelectBox data={options} onSelect={handleSelectProduct} />
      </div>
    </>
  );
}
