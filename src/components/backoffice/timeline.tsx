import React, { useState } from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  useDisclosure,
  ModalContent,
} from '@nextui-org/react';

// Define the type for a single timeline item
interface TimelineItemProps {
  userName: string;
  action: string;
  time: string;
  date: string;
}

// Define props for the TimelineComponent
interface TimelineComponentProps {
  timeline: TimelineItemProps[];
}

// Timeline Item Component
const TimelineItem: React.FC<{ data: TimelineItemProps }> = ({ data }) => (
  <div className="flex gap-x-4 gap-y-4">
    <div className="w-4 h-4 bg-green-500 rounded-full mt-2" />
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

// Main Timeline Component
const TimelineComponent: React.FC<TimelineComponentProps> = ({ timeline }) => {
  const [visibleItems] = useState(4); // Show only first 3 items initially
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="px-8 py-6 max-sm:py-4">
      <h2 className="text-lg font-semibold mb-4">กิจกรรม</h2>
      <div>
        {/* Display first 3 items */}
        {timeline.slice(0, visibleItems).map((item, index) => (
          <TimelineItem key={index} data={item} />
        ))}

        {/* "See More" Button */}
        <div className="flex justify-end mx-4 lg:my-0 md:my-2 max-sm:my-4">
          {visibleItems < timeline.length && (
            <button
              className="text-sm text-accent1 hover:underline"
              onClick={onOpen}
            >
              See More
            </button>
          )}
        </div>

        {/* Modal to show full timeline */}
        <Modal size="5xl" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent className="p-6">
            <>
              <ModalHeader>
                <h2 className="text-lg font-semibold">กิจกรรมทั้งหมด</h2>
              </ModalHeader>
              <ModalBody>
                {timeline.map((item, index) => (
                  <TimelineItem key={index} data={item} />
                ))}
              </ModalBody>
            </>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default TimelineComponent;
