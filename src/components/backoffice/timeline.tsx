import React, { useEffect, useState } from 'react';

interface TimelineItemProps {
  data: {
    time: string;
    recorderName: string;
    action: string;
    date: string;
  };
}

const TimelineItem: React.FC<TimelineItemProps> = ({ data }) => (
  <div className="flex items-start gap-4 p-1">
    <div className="timeline-dot w-4 h-4 bg-green-500 rounded-full py-2" />
    <div>
      <p className="text-gray-700">
        <strong>{data.action}:</strong> {data.recorderName}
      </p>
      <p className="text-gray-700">
        <strong>Time:</strong> {data.time} <strong>Date:</strong> {data.date}
      </p>
    </div>
  </div>
);

interface TimelineProps {
  fetchData: () => Promise<{ time: string; recorderName: string; action: string; date: string }[]>;
}

const Timeline: React.FC<TimelineProps> = ({ fetchData }) => {
  const [timelineData, setTimelineData] = useState<
    { time: string; recorderName: string; action: string; date: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTimelineData = async () => {
      setLoading(true);
      try {
        const data = await fetchData();
        setTimelineData(data);
      } catch (error) {
        console.error('Error fetching timeline data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTimelineData();
  }, [fetchData]);

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">Timeline</h2>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : timelineData.length > 0 ? (
        timelineData.map((item, index) => <TimelineItem key={index} data={item} />)
      ) : (
        <p className="text-gray-500">No timeline data available.</p>
      )}
    </div>
  );
};

export default Timeline;
