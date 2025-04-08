import React, { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

type TabItem = {
  value: string;
  label: string;
  content: ReactNode | (() => ReactNode);
};

type GlobalTabsProps = {
  tabs: TabItem[];
  defaultValue?: string;
};

const GlobalTabs: React.FC<GlobalTabsProps> = ({ tabs, defaultValue = "" }) => {
  return (
    <Tabs defaultValue={defaultValue}>
      <TabsList>
        {tabs.map(({ value, label }) => (
          <TabsTrigger key={value} value={value}>
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
