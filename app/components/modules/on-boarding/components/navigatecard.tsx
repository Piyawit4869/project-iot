import { Card, CardTitle } from "~/components/ui/card";
import React from "react";
import type { NavCardProps } from "~/schemas/on-boarding/onboard";

export const NavCard: React.FC<NavCardProps> = ({ title, icon }) => {
  return (
    <>
      <Card className="w-full text-center items-center">
        <Card className="h-18 w-18 rounded-full flex items-center justify-center bg-gray-300">
          {icon}
        </Card>
        <CardTitle>{title}</CardTitle>
      </Card>
    </>
  );
};
