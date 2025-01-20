import React from 'react';

// Timeline wrapper component
interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ children, className }) => {
  return <div className={`timeline ${className}`}>{children}</div>;
};

// Timeline item component
const TimelineItem: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className=" pl-8 timeline-item flex items-start space-x-4">
      {children}
    </div>
  );
};

// Timeline point component
const TimelinePoint = () => {
  return (
    <div className="timeline-point w-4 h-4 bg-accent1 rounded-full mt-2.5 "></div>
  );
};

// Timeline content component
interface TimelineContentProps {
  action: string;
  name: string;
  dateTime: string;
}

const TimelineContent: React.FC<TimelineContentProps> = ({
  action,
  name,
  dateTime,
}) => {
  return (
    <div className="timeline-content mt-2">
      <h1 className="text-body-3 font-medium text-metal-900 dark:text-white">
        {action}
      </h1>
      <p className="text-body-3 font-medium text-metal-900 dark:text-white">
        {name}
      </p>
      <p className="text-body-5 font-normal leading-[1.4] text-metal-400 dark:text-metal-300">
        {dateTime}
      </p>
    </div>
  );
};

export const TimelineComponent = () => {
  return (
    <Timeline className="border-dotted">
      <TimelineItem>
        <TimelinePoint />
        <TimelineContent
          action="In"
          name="FullName"
          dateTime="09:00:00 , 20/01/2024"
        />
      </TimelineItem>

      <TimelineItem>
        <TimelinePoint />
        <TimelineContent
          action="Break"
          name="FullName"
          dateTime="13:00:00 , 20/01/2024"
        />
      </TimelineItem>

      <TimelineItem>
        <TimelinePoint />
        <TimelineContent
          action="Out"
          name="FullName"
          dateTime="17:00:00 , 20/01/2024"
        />
      </TimelineItem>
    </Timeline>
  );
};
