import React, { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type TabItem = {
  value: string;
  label: string;
  content: ReactNode | (() => ReactNode);
  disabled?: boolean;
};

type GlobalTabsProps = {
  tabs: TabItem[];
  defaultValue?: string;
};

const GlobalTabs: React.FC<GlobalTabsProps> = ({ tabs, defaultValue = "" }) => {
  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList className="gap-1">
        {tabs.map(({ value, label, disabled }) => (
          <TabsTrigger
            key={value}
            value={value}
            disabled={disabled}
            className="px-5 "
          >
            {label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map(({ value, content }) => (
        <TabsContent key={value} value={value}>
          {typeof content === "function" ? content() : content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default GlobalTabs;
