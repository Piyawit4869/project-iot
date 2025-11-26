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
import { ParticipantType, RoomUserType } from "~/utils/enum";

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

  const [isCreateOrderOpen, setCreateOrderOpen] = React.useState(false);
  const [drawer, setDrawer] = React.useState(false);
  const [addCustomerDetail, setAddCustomerDetail] =
    React.useState<boolean>(false);

  const subId =
    selectedRoom && selectedRoom?.kind === RoomUserType.CUSTOMER_USER_DM
      ? selectedRoom?.lineSubId
      : selectedRoom?.lineGroupId;
  const hasCustomerId = !!(selectedRoom && subId);

  const findCustomerInParticipant = selectedRoom?.participants?.find(
    (participant: any) =>
      participant.participantType === ParticipantType.CUSTOMER
  );

  const customerId =
    selectedRoom?.kind === RoomUserType.CUSTOMER_USER_DM
      ? findCustomerInParticipant?.participantId
      : null;

  const {
    data: customerSingle,
    isLoading,
    refetch,
  } = useCustomer(customerId ?? "");

  const isLineGroup = selectedRoom?.kind === RoomUserType.GROUP;

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
          {selectedRoom && selectedRoom?.id ? (
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
              isLineGroup={isLineGroup}
              subId={subId}
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
            {selectedRoom && selectedRoom?.id && subId ? (
              <ChatCustomerInfo
                isLineGroup={isLineGroup}
                selectedRoom={selectedRoom}
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
          customerId={customerId}
        />
      </OrderProvider>
    </div>
  );
}
