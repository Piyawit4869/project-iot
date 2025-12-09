// components/ui/CustomTabs.tsx
"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { cn } from "~/lib/utils";

interface TabItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

interface CustomTabsProps {
  defaultValue: string;
  items: TabItem[];
  listClassName?: string;
  className?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const CustomTabs = ({
  defaultValue,
  items,
  listClassName,
  className,
  value,
  onValueChange,
}: CustomTabsProps) => {
  return (
    <Tabs
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
      className={cn("flex w-full flex-col mt-2", className)}
    >
      <TabsList
        className={cn(
          " bg-[#f4f4f5] dark:bg-[#1f1f23] p-1 dark:border-gray-700 gap-1",
          listClassName
        )}
      >
        {items?.map((item) => (
          <TabsTrigger
            key={item.key}
            value={item.key}
            className={cn(
              ` 
              data-[state=active]:bg-white data-[state=active]:text-black
               dark:data-[state=active]:bg-[#41414a] dark:data-[state=active]:text-white
               text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#41414a]
               transition-colors flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium`
            )}
          >
            <span>{item.label}</span>
            {item.icon && <span className="ml-1">{item.icon}</span>}
          </TabsTrigger>
        ))}
      </TabsList>

      {items?.map((item) => (
        <TabsContent key={item.key} value={item.key} className="mt-3">
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};
