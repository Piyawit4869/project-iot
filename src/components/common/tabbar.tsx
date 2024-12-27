'use client';

import { Tabs, Tab } from '@nextui-org/react';

export default function Tabbar({ tabs, selectedTab, onTabChange }: any) {
  return (
    <div className="flex flex-col items-start gap-6">
      <Tabs
        aria-label="Dynamic Color Tabs"
        color="secondary"
        radius="full"
        selectedKey={selectedTab} // Bind the selected tab
        onSelectionChange={(key) => onTabChange(key)} // Handle tab change
      >
        {tabs.map((item: any) => (
          <Tab key={item.value} title={item.label} />
        ))}
      </Tabs>
    </div>
  );
}
