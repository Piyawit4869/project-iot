import React, { ReactNode } from 'react';

interface TopSectionProps {
  title: string;
  buttons?: ReactNode[];
}

export async function TopSection({ title, buttons }: TopSectionProps) {
  return (
    <div className="sticky top-0 bg-white shadow-md p-4 z-10">
      <div className="flex items-center justify-between">
        {/* Title */}
        <h1 className="text-2xl font-bold">{title}</h1>

        {/* Buttons */}
        {buttons ? (
          <div className="flex space-x-2">
            {buttons.map((button) => button)}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
