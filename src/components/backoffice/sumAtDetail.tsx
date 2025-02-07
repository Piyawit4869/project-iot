// components/AttendanceSummaryCard.tsx
import React from 'react';

interface AttendanceSummaryCardProps {
  value: string;
  label: string;
  backgroundColor: string;
  icon: React.ReactNode;
}

const AttendanceSummaryCard: React.FC<AttendanceSummaryCardProps> = ({
  value,
  label,
  backgroundColor,
  icon,
}) => {
  return (
    <div
      className={`flex flex-col justify-between items-center p-4 rounded-lg shadow-md`}
      style={{ backgroundColor }}
    >
      <h2 className="text-3xl font-bold text-white">{value}</h2>
      <span className="p-3 bg-black text-white rounded-full mt-4">{icon}</span>
      <p className="text-sm font-medium text-white mt-2">{label}</p>
    </div>
  );
};

export default AttendanceSummaryCard;
