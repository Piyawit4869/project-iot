import React from "react";

import ChatCustomerInfo from "./chat-customer";
import { CreateOrderDialog } from "./create-order";

import MenuWhenNoData from "./noData/menuWhenNoData";
import { AboutCustomer } from "./about-customer";
import { ChatlistContainer } from "./ChatlistContainer";
import { useChatRoom } from "~/providers/chat/useChatRoom";
import { useIsMobile } from "~/hooks/use-mobile";
import { useCustomer } from "~/api/client/customer/useCustomer";
import { OrderProvider } from "~/hooks/order/order";
import { cn } from "~/lib/utils";
import { ChatMessageRender } from "./chat-message-render";
import { ChatMessageNoData } from "./noData/chat-message-no-data";

export default function ChatbotSpaceNew({
  api,
  chatRooms,
}: {
  api: string;
  chatRooms: any;
}) {
  const isMobile = useIsMobile();

  const { customerInfoOpen, setCustomerInfoOpen } = useChatRoom();
  const [selectedRoom, setSelectedRoom] = React.useState<any>();
  const [showChatList, setShowChatList] = React.useState(true);
  

  const {
    data: customerSingle,
    isLoading,
    refetch,
  } = useCustomer((selectedRoom && selectedRoom.customerId) ?? "");

  const [isCreateOrderOpen, setCreateOrderOpen] = React.useState(false);
  const [drawer, setDrawer] = React.useState(false);
  const [addCustomerDetail, setAddCustomerDetail] =
    React.useState<boolean>(false);

  const hasCustomerId = !selectedRoom
    ? true
    : selectedRoom?.customerId
      ? true
      : false;

  return (
    <div className="flex flex-row h-[calc(100vh-56px)]">
      <OrderProvider>
        {showChatList && (
          <div className="max-w-[80px] lg:max-w-[310px]">
            <ChatlistContainer
              chatRooms={chatRooms}
              api={api}
              handleChangeSelectedRoom={(room) => {
                setSelectedRoom(room);
              }}
            />
          </div>
        )}

        <div className={cn("flex-1 flex flex-col")}>
          {selectedRoom && selectedRoom.id && selectedRoom ? (
            <ChatMessageRender
              api={api}
              selectedRoom={selectedRoom}
              drawer={drawer}
              isMobile={isMobile}
              isLoading={isLoading}
              customerInfoOpen={customerInfoOpen}
              customerSingle={customerSingle}
              isCreateOrderOpen={false}
              refetch={refetch}
              setCreateOrderOpen={setCreateOrderOpen}
              setAddCustomerDetail={setAddCustomerDetail}
              addCustomerDetail={addCustomerDetail}
              handleShowSetting={() => setShowChatList(!showChatList)}
              handleShowCustomerInfoOpen={() =>
                setCustomerInfoOpen(!customerInfoOpen)
              }
              handleCloseDrawer={() => {
                setDrawer(true);
                setCustomerInfoOpen(false);
              }}
              handleOpenDrawer={() => setDrawer(true)}
            />
          ) : (
            <ChatMessageNoData
              handleShowChatList={() => setShowChatList(!showChatList)}
              handleShowCustomerInfoOpen={() =>
                setCustomerInfoOpen(!customerInfoOpen)
              }
            />
          )}
        </div>

        {customerInfoOpen && !isMobile && (
          <div className="w-96">
            {selectedRoom && selectedRoom?.id && selectedRoom?.customerId ? (
              <ChatCustomerInfo
                refetchCustomer={refetch}
                setCreateOrderOpen={setCreateOrderOpen}
                setAddCustomerDetail={setAddCustomerDetail}
                addCustomerDetail={addCustomerDetail}
                modelCustomerDetails={addCustomerDetail}
                currentCustomer={customerSingle}
                api={api}
              />
            ) : (
              <MenuWhenNoData hasCustomerId={hasCustomerId} />
            )}
          </div>
        )}

        {/* modal section */}
        <AboutCustomer
          open={addCustomerDetail}
          onOpenChange={setAddCustomerDetail}
          customer={customerSingle}
          setAddCustomerDetail={setAddCustomerDetail}
        />

        <CreateOrderDialog
          open={isCreateOrderOpen}
          onOpenChange={setCreateOrderOpen}
          customerId={selectedRoom?.customerId}
        />
      </OrderProvider>
    </div>
  );
}
