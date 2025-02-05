import React from 'react';
import { CardContent } from '@/components/ui/card';
import * as Icons from 'lucide-react';

interface TimelineItem {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const timelineData: TimelineItem[] = [
  {
    date: 'Today',
    title: 'Pending Approval',
    description: 'This request requires your approval.',
    icon: <Icons.UserRoundCheck className="text-blue-500" size={16} />,
  },
  {
    date: 'May 19, 2018',
    title: 'Approval Requested',
    description: 'John Lloyd has requested your approval.',
    icon: <Icons.ClockAlert className="text-blue-500" size={16} />,
  },
  {
    date: '2018',
    title: 'Request Created',
    description: 'Request created by Kim May.',
    icon: <Icons.MapPin className="text-blue-500" size={16} />,
  },
];

const TimelineComponent: React.FC = () => {
  return (
    <CardContent>
      <h2 className="text-xl font-semibold text-start py-4">Timeline</h2>
      {/* Vertical line */}
      {/* <div className="absolute left-4 top-0 h-full border-l-2 border-gray-200" /> */}

      {timelineData.map((item, index) => (
        <div key={index} className="flex items-start space-x-4 py-1">
          {/* Icon with connecting line */}
          <div className="relative flex items-center">
            <div className="z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-blue-500 rounded-full">
              {item.icon}
            </div>
            {/* Connecting line for icons, except the last one */}
            {index !== timelineData.length - 1 && (
              <div className="absolute top-8 left-1 w-[2px] h-full bg-gray-200" />
            )}
          </div>

          {/* Timeline content */}
          <div className="text-xs">
            <p className="text-xs text-gray-500">{item.date}</p>
            <p className="font-medium text-gray-900">{item.title}</p>
            <p className="text-xs text-gray-600">{item.description}</p>
          </div>
        </div>
      ))}
    </CardContent>
  );
};

export default TimelineComponent;
