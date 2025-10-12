"use client";

import React from "react";
import { Message, useChat } from "@/stores/chat/useChat";
import ChatMessages from "./chat-message";
import { Button } from "@/components/ui";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { MessagesSquare, Settings2 } from "lucide-react";
import { useChatRoom } from "@/stores/chat/useRoom";
import ChatlistSidebar from "./chatlist-sidebar";
import ChatCustomerInfo from "./chat-customer";
import { socketConfig } from "@/libs/sockets";
import { OrderProvider } from "@/stores/order/order";
import { CreateOrderDialog } from "./create-order";
import FeatureCard from "@/components/shared/feature-card";

import NoChatDetail from "./noData/no-chatdata";
import MenuWhenNoData from "./noData/menuWhenNoData";
import { useGetMe } from "@/actions/auth/client/useLogin";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { AboutCustomer } from "./about-customer";
import { useCustomer } from "@/actions/customer/client/useGetCustomer";
import { CustomerInfoSkeleton } from "./noData/customer-info-skeleton";
import { CustomerChatSkeleton } from "./noData/customer-chat-skeleton";

export default function ChatbotSpace({ api }: { api: string }) {
  const {
    selectedRoom,
    customerInfoOpen,
    setCustomerInfoOpen,
    setRealtimeChatRooms,
    customer: currentCustomer,
    onSelectRoom,
    setAutoReadMsg,
    chatRooms,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    realtimeChatRooms,
    setSelectedRoom,
    setSidebarOpen,
    fetchNextPage,
    setOnSelectRoom,
  } = useChatRoom();
  const { addMessage } = useChat();

  const isMobile = useIsMobile();

  const { data: me } = useGetMe();
  const { data: customerSingle } = useCustomer(
    selectedRoom && selectedRoom.customer && selectedRoom.customer.id
  );

  const [autoScroll, setAutoScroll] = React.useState(true);

  const [isCreateOrderOpen, setCreateOrderOpen] = React.useState(false);
  const [resize, setResize] = React.useState(0);
  const [drawer, setDrawer] = React.useState(false);

  const [addCustomerDetail, setAddCustomerDetail] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const socket = socketConfig(api);

    if (me?.branchId) {
      socket.emit("rooms", `${me.branchId}`);
    }

    if (selectedRoom?.id) {
      socket.emit("chat", { chatRoomId: `${selectedRoom.id}` });
    }

    socket.on("chat", (msg: Message) => {
      const isCurrentRoom =
        selectedRoom?.id && msg.chatRoomId === selectedRoom.id;

      if (isCurrentRoom) {
        // const body = {
        //   chatRoomId: selectedRoom.id,
        //   userId: selectedRoom?.customer?.id,
        //   branchId: selectedRoom.branchId,
        // };

        // socket.emit("mark-read", body);

        setAutoReadMsg(true);

        // setRealtimeChatRooms((prev: any) => ({
        //   ...prev,
        //   unreadMessageCount: 0,
        // }));
      }

      addMessage({
        ...msg,
        imageUrl:
          msg.imageUrl || `https://ui-avatars.com/api/?name=${msg.sender}`,
      });
    });

    socket.on("rooms", (room: any) => {
      setRealtimeChatRooms(room);
    });

    return () => {
      socket.disconnect();
    };
  }, [me, selectedRoom]);

  return (
    <OrderProvider>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={40}
          minSize={6}
          maxSize={40}
          className="min-w-[75px] max-w-[80px] lg:max-w-[350px]"
          onResize={(size) => setResize(size)}
        >
          <div className="h-[calc(100vh-50px)]">
            {selectedRoom ? (
              <ChatlistSidebar
                api={api}
                handleChangeSelectedRoom={(room) => setSelectedRoom(room)}
                resize={resize}
                details={{
                  chatRooms,
                  isLoading,
                  hasNextPage,
                  isFetchingNextPage,
                  realtimeChatRooms,
                  setSelectedRoom,
                  setSidebarOpen,
                  fetchNextPage,
                  setOnSelectRoom,
                  currentCustomer,
                }}
              />
            ) : (
              <div className="flex flex-col h-full justify-center items-center gap-12 overflow-hidden ">
                <h2 className="text-center text-2xl p-2">
                  ยินดีต้อนรับสู่แชท Feature ที่ผนวกร่วมกับ Rome AI
                </h2>
                <div className="w-[500px] ">
                  <FeatureCard
                    icon={<MessagesSquare className="w-8 h-8 text-blue-500" />}
                    title="แชท sale AI & Support"
                    description="ช่องทางแชทระหว่างฝ่ายขายและลูกค้า พร้อมผนวก AI ช่วยตอบคำถามและสนับสนุนการสนทนาอย่างรวดเร็วและแม่นยำ"
                  />
                </div>
              </div>
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="hidden lg:flex " />
        <ResizablePanel defaultSize={50}>
          {onSelectRoom &&
          selectedRoom &&
          selectedRoom.id &&
          selectedRoom.customer &&
          currentCustomer ? (
            <div className="flex flex-col w-full h-full bg-white dark:bg-background">
              <div className="flex items-center justify-between border-b px-4 py-2 ">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">
                    {currentCustomer.profile?.name ?? ""}
                  </h2>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCustomerInfoOpen(!customerInfoOpen)}
                  className="hidden md:flex"
                >
                  <Settings2 className="h-4 w-4" />
                </Button>

                <Drawer
                  direction="right"
                  open={isMobile ? drawer || customerInfoOpen : drawer}
                  onClose={() => {
                    setDrawer(false);
                    setCustomerInfoOpen(false);
                  }}
                >
                  <DrawerTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDrawer(true)}
                      className="flex md:hidden"
                    >
                      <Settings2 className="h-4 w-4" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <div className="mx-auto w-full">
                      {selectedRoom.id && selectedRoom.customer ? (
                        <ChatCustomerInfo
                          setCreateOrderOpen={setCreateOrderOpen}
                          setAddCustomerDetail={setAddCustomerDetail}
                          addCustomerDetail={addCustomerDetail}
                          modelCustomerDetails={addCustomerDetail}
                          currentCustomer={currentCustomer}
                          api={api}
                          refetchCustomer={undefined}
                        />
                      ) : (
                        <MenuWhenNoData />
                      )}
                    </div>
                  </DrawerContent>
                </Drawer>
              </div>
              <ChatMessages
                api={api}
                selectedRoom={selectedRoom}
                autoScroll={autoScroll}
                setAutoScroll={setAutoScroll}
                isCreateOrderOpen={isCreateOrderOpen}
              />
            </div>
          ) : onSelectRoom ? (
            <CustomerChatSkeleton />
          ) : (
            <React.Fragment>
              <div className="flex flex-col w-full h-full bg-white dark:bg-secondary">
                <div className="flex items-center justify-between border-b px-4 py-2 dark:bg-background">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold">Rome Chat AI</h2>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCustomerInfoOpen(!customerInfoOpen)}
                    className="hidden md:flex"
                  >
                    <Settings2 className="h-4 w-4" />
                  </Button>
                </div>
                <NoChatDetail />
              </div>
            </React.Fragment>
          )}
        </ResizablePanel>
        <ResizableHandle withHandle className="hidden lg:flex" />
        {customerInfoOpen && (
          <ResizablePanel minSize={20} maxSize={25} className="min-w-[300px]">
            <aside className="hidden md:flex w-full">
              {onSelectRoom &&
              selectedRoom &&
              selectedRoom?.id &&
              selectedRoom?.customer &&
              currentCustomer ? (
                <ChatCustomerInfo
                  setCreateOrderOpen={setCreateOrderOpen}
                  setAddCustomerDetail={setAddCustomerDetail}
                  addCustomerDetail={addCustomerDetail}
                  modelCustomerDetails={addCustomerDetail}
                  currentCustomer={currentCustomer}
                  api={api}
                  refetchCustomer={undefined}
                />
              ) : onSelectRoom &&
                selectedRoom &&
                selectedRoom?.id !== "" &&
                selectedRoom?.customer?.id !== "" &&
                !currentCustomer ? (
                <CustomerInfoSkeleton />
              ) : (
                <MenuWhenNoData />
              )}
            </aside>
          </ResizablePanel>
        )}
      </ResizablePanelGroup>

      <AboutCustomer
        open={addCustomerDetail}
        onOpenChange={setAddCustomerDetail}
        customer={customerSingle}
        setAddCustomerDetail={setAddCustomerDetail}
      />

      <CreateOrderDialog
        open={isCreateOrderOpen}
        onOpenChange={setCreateOrderOpen}
        customerId={selectedRoom.customer?.id}
      />
    </OrderProvider>
  );
}
