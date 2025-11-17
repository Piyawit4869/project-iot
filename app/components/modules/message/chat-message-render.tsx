import { Settings2 } from "lucide-react";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Button } from "~/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";
import ChatCustomerInfo from "./chat-customer";
import MenuWhenNoData from "./noData/menuWhenNoData";
import ChatMessages from "./chat-message";
import React from "react";

export const ChatMessageRender = ({
  api,
  drawer,
  isMobile,
  isLoading,
  customerSingle,
  customerInfoOpen,
  addCustomerDetail,
  selectedRoom,
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
  refetch: () => void;
  setCreateOrderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAddCustomerDetail: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowSetting: () => void;
  handleShowCustomerInfoOpen: () => void;
  handleCloseDrawer: () => void;
  handleOpenDrawer: () => void;
}) => {
  const [autoScroll, setAutoScroll] = React.useState(true);

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
            <>
              <h2 className="text-lg font-semibold">{displayName}</h2>
            </>
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
    </div>
  );
};
