'use client';

import { Tabs, Tab } from '@nextui-org/react';

export default function Tabbar({ tabs }: any) {
  return (
    <div className="flex flex-col items-start gap-6 ">
      <Tabs
        aria-label="Dynamic Color Tabs"
        color={'secondary'} // Dynamically set the color based on activeTab
        radius="full"
      >
        {tabs.map((item: any, index: any) => {
          return <Tab key={index} title={item.title} />;
        })}
      </Tabs>
    </div>
  );
}
