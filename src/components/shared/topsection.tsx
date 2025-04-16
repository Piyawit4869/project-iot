import React, { ReactNode } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import * as Icons from "lucide-react";

interface CardWithFormProps {
  title: string;
  backpath?: string;
  subtitle?: string;
  buttons: ReactNode[];
}

export function Tabcontrol({
  title,
  backpath,
  subtitle,
  buttons,
}: CardWithFormProps) {
  return (
    <div className="sticky top-[-20px] z-50">
      <Card className="p-4 mt-4">
        <div className="flex items-center justify-between">
          {backpath ? (
            <div className="flex text-headFont gap-2 items-center">
              <Link href={backpath} passHref>
                <Icons.ChevronLeft className="text-base cursor-pointer" />
              </Link>
              <CardTitle>{title}</CardTitle>
            </div>
          ) : (
            <CardTitle className="text-xl">{title}</CardTitle>
          )}
          {subtitle && <CardTitle className="text-xl">{subtitle}</CardTitle>}

          <div className="flex space-x-2">
            {buttons.map((button: ReactNode, index: number) => (
              <div key={index}>{button}</div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}
