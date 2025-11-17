import { Settings2 } from "lucide-react";
import React from "react";

import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Button } from "~/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";
import ChatCustomerInfo from "./chat-customer";
import MenuWhenNoData from "./noData/menuWhenNoData";
import ChatMessages from "./chat-message";
import { GlobalImage } from "~/components/shared/global-image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

export const ChatMessageRender = ({
  api,
  drawer,
  isMobile,
  isLoading,
  customerSingle,
  customerInfoOpen,
  addCustomerDetail,
  selectedRoom,
  isLineGroup,
  refetch,
  setCreateOrderOpen,
  setAddCustomerDetail,
  handleCloseDrawer,
  handleShowSetting,
  handleOpenDrawer,
}: {
  selectedRoom: any;
  drawer: boolean;
  isMobile: boolean;
  isLoading: boolean;
  customerInfoOpen: boolean;
  customerSingle: any;
  isCreateOrderOpen: boolean;
  api: string;
  addCustomerDetail: any;
  isLineGroup: boolean;
  refetch: () => void;
  setCreateOrderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddCustomerDetail: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowSetting: () => void;
  handleShowCustomerInfoOpen: () => void;
  handleCloseDrawer: () => void;
  handleOpenDrawer: () => void;
}) => {
  const [autoScroll, setAutoScroll] = React.useState(true);
  const [showAllParticipants, setShowAllParticipants] = React.useState(false);

  const LIMIT = 5; // จำนวนที่ต้องการเก็บ

  const participants = selectedRoom.participants ?? [];
  const firstSeven = participants.slice(0, LIMIT);
  const extraCount = participants.length - LIMIT;

  const displayName =
    customerSingle?.profile?.name ?? customerSingle?.profile?.lineName;

  return (
    <div className="flex flex-col w-full h-full bg-white dark:bg-secondary">
      <div className="flex items-center border-b px-4 py-2 dark:bg-background">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleShowSetting}
          className="hidden md:flex"
        >
          <Settings2 className="h-4 w-4" />
        </Button>
        <div className="flex items-center w-full gap-2 h-[36px] justify-between">
          {isLoading ? (
            <SkeletonLoading className="w-[200px] h-[20px]" />
          ) : (
            <div className="flex items-center gap-4">
              {!isLineGroup && (
                <h2 className="text-lg font-semibold">{displayName}</h2>
              )}

              {isLineGroup && (
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold">
                    {isLineGroup ? selectedRoom.name : displayName}
                  </h2>

                  <div className="flex flex-wrap gap-2 items-center">
                    {firstSeven.map((par: any) => (
                      <button key={par.participantId}>
                        <GlobalImage
                          src={
                            par.imageUrl ||
                            `https://api.dicebear.com/9.x/initials/svg?seed=${par.participantId}`
                          }
                          alt={`p-${par.participantId}`}
                          className="w-[35px] h-[35px] rounded-full object-cover border-2"
                          notShowPreview
                        />
                      </button>
                    ))}

                    {participants.length > LIMIT && (
                      <button
                        onClick={() => setShowAllParticipants(true)}
                        className="w-[35px] h-[35px] rounded-full bg-gray-200 text-gray-700 
                   flex items-center justify-center text-sm font-semibold"
                      >
                        +{extraCount}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          <Drawer direction="right" onClose={handleCloseDrawer}>
            <DrawerTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleOpenDrawer}
                className="flex md:hidden"
              >
                <Settings2 className="h-4 w-4" />
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full">
                {selectedRoom.id ? (
                  <ChatCustomerInfo
                    api={api}
                    refetchCustomer={refetch}
                    setCreateOrderOpen={setCreateOrderOpen}
                    setAddCustomerDetail={setAddCustomerDetail}
                    addCustomerDetail={addCustomerDetail}
                    modelCustomerDetails={addCustomerDetail}
                    currentCustomer={customerSingle}
                    selectedRoom={selectedRoom}
                  />
                ) : (
                  <MenuWhenNoData
                    hasCustomerId={
                      !selectedRoom
                        ? true
                        : selectedRoom?.customerId
                          ? true
                          : false
                    }
                  />
                )}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      <ChatMessages
        api={api}
        selectedRoom={selectedRoom}
        autoScroll={autoScroll}
        setAutoScroll={setAutoScroll}
        customer={customerSingle}
      />

      <Dialog open={showAllParticipants} onOpenChange={setShowAllParticipants}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>รายชื่อผู้เข้าร่วม</DialogTitle>
          </DialogHeader>

          <div className="max-h-[60vh] overflow-y-auto space-y-3 mt-4">
            {participants.map((par: any) => (
              <div key={par.participantId} className="flex items-center gap-3">
                <GlobalImage
                  src={
                    par.imageUrl ||
                    `https://api.dicebear.com/9.x/initials/svg?seed=${par.participantId}`
                  }
                  alt={`p-${par?.participantId}`}
                  className="w-[45px] h-[45px] rounded-full object-cover border"
                  notShowPreview
                />
                <div className="flex flex-col">
                  <span className="font-medium">
                    {par?.displayName || "ไม่ทราบชื่อ"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
