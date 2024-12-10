import React, { ReactNode } from 'react';

interface TopSectionProps {
  title: string;
  buttons: ReactNode[];
}

export const TopSection: React.FC<TopSectionProps> = ({ title, buttons }) => {
  return (
    <div className="sticky top-0 bg-white shadow-md p-4 z-10">
      <div className="flex items-center justify-between">
        {/* Title */}
        <h1 className="text-lg font-bold text-gray-800">{title}</h1>

        {/* Buttons */}
        <div className="flex space-x-2">{buttons.map((button) => button)}</div>
      </div>
    </div>
  );
};
