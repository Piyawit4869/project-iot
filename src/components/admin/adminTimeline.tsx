import React from "react";

// Timeline wrapper component
interface TimelineProps {
  children: React.ReactNode;
  className?: string;
}

const Timeline: React.FC<TimelineProps> = ({ children, className }) => {
  return <div className={`timeline ${className}`}>{children}</div>;
};

// Timeline item component
const TimelineItem: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="timeline-item flex items-start space-x-4">{children}</div>;
};

// Timeline point component
const TimelinePoint = () => {
  return (
    <div className="timeline-point w-4 h-4 bg-blue-500 rounded-full mt-2.5"></div>
  );
};

// Timeline content component
interface TimelineContentProps {
  date: string;
  title: string;
  description: string;
}

const TimelineContent: React.FC<TimelineContentProps> = ({ date, title, description }) => {
  return (
    <div className="timeline-content">
      <p className="text-body-5 font-normal leading-[1.4] text-metal-400 dark:text-metal-300">
        {date}
      </p>
      <h1 className="text-body-3 font-medium text-metal-900 dark:text-white">
        {title}
      </h1>
      <p className="text-body-4 font-normal text-metal-600 dark:text-metal-300">
        {description}
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
          date="September 23, 2022"
          title="Step 1 Completed"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, incidunt."
        />
      </TimelineItem>

      <TimelineItem>
        <TimelinePoint />
        <TimelineContent
          date="September 23, 2022"
          title="Step 2 Completed"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, incidunt."
        />
      </TimelineItem>

      <TimelineItem>
        <TimelinePoint />
        <TimelineContent
          date="September 23, 2022"
          title="Step 3 Completed"
          description="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, incidunt."
        />
      </TimelineItem>
    </Timeline>
  );
};
