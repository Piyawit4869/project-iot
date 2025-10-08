"use client";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/libs/utils";
import React, { Dispatch, SetStateAction } from "react";

interface CountingCardsProps {
  data: {
    icon: React.ReactNode | string;
    label: string;
    value: number;
    active?: boolean;
    status: string;
  }[];
  setStatus: Dispatch<SetStateAction<string>>;
}

export default function CountingCards(props: CountingCardsProps) {
  const { data, setStatus } = props;

  const [activeIndex, setActiveIndex] = React.useState(0);
  return (
    <div className="flex w-full gap-2 p-2">
      {data.map((item, index) => {
        const isActive = index === activeIndex;

        return (
          <Card
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setStatus(item.status);
            }}
            className={cn(
              "flex-1 cursor-pointer transition-all",
              isActive
                ? "border-b-[3px] border-yellow-400 shadow-md"
                : "border-b-[3px] bg-muted text-muted-foreground"
            )}
          >
            <CardContent className="flex flex-col items-center justify-center p-4 gap-2">
              <div className="text-3xl">{item.icon}</div>
              <div className="text-sm font-medium text-center">
                {item.label}
              </div>
              <div className="text-xl font-bold">{item.value}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
