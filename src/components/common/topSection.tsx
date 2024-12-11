'use client';

import React, { ReactNode } from 'react';

interface TopSectionProps {
  title: string;
  buttons?: ReactNode[];
}

export function TopSection({ title, buttons }: TopSectionProps) {
  return (
    <div className="sticky top-[-32px] bg-white shadow-md p-4 z-10">
      <div className="flex items-center justify-between">
        {/* Title */}
        <h1 className="text-2xl font-bold text-headFont">{title}</h1>

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
