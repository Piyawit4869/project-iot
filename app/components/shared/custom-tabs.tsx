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
  className?: string;
}

export const CustomTabs = ({
  defaultValue,
  items,
  className,
}: CustomTabsProps) => {
  return (
    <Tabs defaultValue={defaultValue} className={cn("w-full mt-2", className)}>
      <TabsList className="bg-[#f4f4f5] dark:bg-[#1f1f23] p-1 dark:border-gray-700 flex flex-wrap gap-1">
        {items?.map((item) => (
          <TabsTrigger
            key={item.key}
            value={item.key}
            className={cn(
              `data-[state=active]:bg-white data-[state=active]:text-black
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
