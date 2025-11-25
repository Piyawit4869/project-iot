import React from "react";
import ChatHeader from "./ChatHeader";
import ChatParticipantsDialog from "./ChatParticipantsDialog";
import ChatMobileDrawer from "./ChatMobileDrawer";
import ChatMessages from "./chat-message";

export const ChatMessageRender = ({
  api,
  isLoading,
  customerSingle,
  addCustomerDetail,
  selectedRoom,
  isLineGroup,
  refetch,
  setCreateOrderOpen,
  setAddCustomerDetail,
  handleCloseDrawer,
  handleShowSetting,
  handleOpenDrawer,
  subId,
}: any) => {
  const [autoScroll, setAutoScroll] = React.useState(true);
  const [showAllParticipants, setShowAllParticipants] = React.useState(false);

  const participants = selectedRoom?.participants ?? [];

  return (
    <div className="flex flex-col w-full h-full bg-white dark:bg-secondary">
      <ChatHeader
        isLoading={isLoading}
        isLineGroup={isLineGroup}
        selectedRoom={selectedRoom}
        customerSingle={customerSingle}
        participants={participants}
        onShowSettings={handleShowSetting}
        onShowAllParticipants={() => setShowAllParticipants(true)}
        onOpenDrawer={handleOpenDrawer}
      />

      {selectedRoom?.id && (
        <ChatMessages
          api={api}
          selectedRoom={selectedRoom}
          autoScroll={autoScroll}
          setAutoScroll={setAutoScroll}
          customer={customerSingle}
          subId={subId}
        />
      )}

      <ChatMobileDrawer
        selectedRoom={selectedRoom}
        addCustomerDetail={addCustomerDetail}
        customerSingle={customerSingle}
        api={api}
        refetch={refetch}
        setCreateOrderOpen={setCreateOrderOpen}
        setAddCustomerDetail={setAddCustomerDetail}
        handleCloseDrawer={handleCloseDrawer}
      />

      <ChatParticipantsDialog
        open={showAllParticipants}
        onOpenChange={setShowAllParticipants}
        participants={participants}
      />
    </div>
  );
};
