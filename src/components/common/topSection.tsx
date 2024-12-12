'use client';

import React, { ReactNode } from 'react';
import CardComponent from './card';

interface TopSectionProps {
  title: string;
  buttons?: ReactNode[];
}

export function TopSection({ title, buttons }: TopSectionProps) {
  return (
    <CardComponent
      className="sticky top-[-32px] shadow-md z-10"
      customCard
      custom={
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
      }
    ></CardComponent>
  );
}
