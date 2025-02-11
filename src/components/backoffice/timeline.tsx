import React from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  useDisclosure,
  ModalContent,
} from '@nextui-org/react'; // Import NextUI components

interface TimelineItemProps {
  data: {
    userName: string;
    action: string;
    time: string;
    date: string;
  };
}

const TimelineItem: React.FC<TimelineItemProps> = ({ data }) => (
  <div className="flex gap-4 p-1">
    <div className="timeline-dot w-4 h-4 bg-green-500 rounded-full py-2" />
    <div>
      <p className="text-gray-700">
        <strong>{data.action}:</strong> {data.userName}
      </p>
      <p className="text-gray-700">
        <strong>Time:</strong> {data.time} <strong>Date:</strong> {data.date}
      </p>
    </div>
  </div>
);

interface TimelineProps {
  fetchData: () => Promise<
    { time: string; userName: string; action: string; date: string }[]
  >;
}

const Timeline: React.FC<TimelineProps> = ({ fetchData }) => {
  const [timelineData, setTimelineData] = React.useState<
    { time: string; userName: string; action: string; date: string }[]
  >([]);
  const [visibleItems] = React.useState(3); // Initial limit to 3 items
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
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

  const {
    isOpen: isOpenTimeline,
    onOpen: openTimeline,
    onOpenChange: onChange1,
  } = useDisclosure();

  return (
    <div className="p-6">
      <h2 className="text-lg font-semibold mb-4">กิจกรรม</h2>
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="spinner"></div>
          </div>
        ) : timelineData.length > 0 ? (
          <>
            {/* Display first 3 items */}
            {timelineData.slice(0, visibleItems).map((item, index) => (
              <TimelineItem key={index} data={item} />
            ))}

            {/* Show More button */}
            <div className="flex justify-end mt-4">
              {visibleItems < timelineData.length && (
                <button
                  className="text-sm text-accent1 hover:underline"
                  onClick={openTimeline}
                >
                  See More
                </button>
              )}
            </div>

            {/* Modal for full timeline */}
            <Modal size="5xl" isOpen={isOpenTimeline} onOpenChange={onChange1}>
              <ModalContent>
                {() => (
                  <>
                    <ModalHeader>
                      <h2 id="timeline-modal" className="text-lg font-semibold">
                        กิจกรรมทั้งหมด
                      </h2>
                    </ModalHeader>
                    <ModalBody>
                      {timelineData.map((item, index) => (
                        <TimelineItem key={index} data={item} />
                      ))}
                    </ModalBody>
                  </>
                )}
              </ModalContent>
            </Modal>
          </>
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
