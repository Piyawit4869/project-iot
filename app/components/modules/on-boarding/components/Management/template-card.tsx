import { Card, CardTitle } from "~/components/ui/card";
import React, { useState } from "react";
import type { TemplateProps } from "~/schemas/on-boarding/onboard";

type TemplateCardProps = {
  value: string;
  title: string;
  image: string;
  selected: string;
  onSelect: (value: string) => void;
};

export const TemplateCard = ({
  value,
  title,
  image,
  selected,
  onSelect,
}: TemplateCardProps) => {
  return (
    <>
      <label className="cursor-pointer">
        <input
          type="radio"
          name="template"
          value={value}
          className="hidden peer"
          checked={selected === value}
          onChange={() => onSelect(value)}
        />

        <Card
          className="
          h-full text-center items-center p-4
          border transition
          peer-checked:border-primary
          peer-checked:bg-primary/5
        "
        >
          <img src={image} alt={value} className="px-5 object-contain" />
          <CardTitle className="mt-2">{title}</CardTitle>
        </Card>
      </label>
    </>
  );
};
