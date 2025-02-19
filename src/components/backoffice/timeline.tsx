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
interface TimelineProps {
  fetchData: () => Promise<
    { time: string; userName: string; action: string; date: string }[]
  >;
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

const Timeline: React.FC<TimelineProps> = ({ fetchData }) => {
  const [timelineData, setTimelineData] = React.useState<
    { time: string; userName: string; action: string; date: string }[]
  >([]);
  const [visibleItems] = React.useState(3); // Initial limit to 3 items
  React.useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const data = await fetchData();
        setTimelineData(data);
      } catch (error) {
        console.error('Error fetching timeline data:', error);
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
    <div className="py-4 px-6">
      <h2 className="text-lg font-semibold mb-4">กิจกรรม</h2>
      <div>
        <>
          {/* Display first 3 items */}
          {timelineData.slice(0, visibleItems).map((item, index) => (
            <TimelineItem key={index} data={item} />
          ))}

          {/* Show More button */}
          <div className="flex justify-end my-2 mx-4">
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
            <ModalContent className="p-6">
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
      </div>
    </div>
  );
};

export default Timeline;
