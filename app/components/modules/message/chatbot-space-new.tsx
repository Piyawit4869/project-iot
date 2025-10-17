import React from "react";
import ChatMessages from "./chat-message";
import { Button } from "~/components/ui/button";

import { Settings2 } from "lucide-react";
import ChatCustomerInfo from "./chat-customer";
import { CreateOrderDialog } from "./create-order";

import NoChatDetail from "./noData/no-chatdata";
import MenuWhenNoData from "./noData/menuWhenNoData";
import { AboutCustomer } from "./about-customer";
import { ChatlistContainer } from "./ChatlistContainer";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizeble";
import { useChatRoom } from "~/providers/chat/useChatRoom";
import { useIsMobile } from "~/hooks/use-mobile";
import { useCustomer } from "~/api/client/customer/useCustomer";
import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";
import { OrderProvider } from "~/hooks/order/order";

export default function ChatbotSpaceNew({
  api,
  chatRooms,
}: {
  api: string;
  chatRooms: any;
}) {
  const { customerInfoOpen, setCustomerInfoOpen } = useChatRoom();
  const isMobile = useIsMobile();
  const [selectedRoom, setSelectedRoom] = React.useState<any>();
  const [showChatList, setShowChatList] = React.useState(true);

  const {
    data: customerSingle,
    isLoading,
    refetch,
  } = useCustomer(
    selectedRoom && selectedRoom.customer && selectedRoom.customer.id
  );

  const [autoScroll, setAutoScroll] = React.useState(true);
  const [isCreateOrderOpen, setCreateOrderOpen] = React.useState(false);
  const [resize, setResize] = React.useState(0);
  const [drawer, setDrawer] = React.useState(false);

  const [addCustomerDetail, setAddCustomerDetail] =
    React.useState<boolean>(false);

  return (
    <div className="h-[calc(100vh-56px)]">
      <OrderProvider>
        <ResizablePanelGroup direction="horizontal">
          {showChatList && (
            <ResizablePanel
              defaultSize={40}
              minSize={6}
              maxSize={40}
              className="min-w-[75px] max-w-[80px] lg:max-w-[350px]"
              onResize={(size) => setResize(size)}
            >
              <ChatlistContainer
                chatRooms={chatRooms}
                resize={resize}
                api={api}
                handleChangeSelectedRoom={(room) => setSelectedRoom(room)}
              />
            </ResizablePanel>
          )}
          {/* <ResizableHandle withHandle className="hidden lg:flex " /> */}
          <ResizablePanel defaultSize={50}>
            <>
              {selectedRoom && selectedRoom.id && selectedRoom.customer ? (
                <div className="flex flex-col w-full h-full bg-white dark:bg-secondary">
                  <div className="flex items-center  border-b px-4 py-2 dark:bg-background">
                    <div className="flex items-center w-full gap-2 h-[36px] justify-between">
                      {isLoading ? (
                        <SkeletonLoading className="w-[200px] h-[20px]" />
                      ) : (
                        <h2 className="text-lg font-semibold">
                          {customerSingle?.profile?.name ?? ""}
                        </h2>
                      )}

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
                                refetchCustomer={refetch}
                                setCreateOrderOpen={setCreateOrderOpen}
                                setAddCustomerDetail={setAddCustomerDetail}
                                addCustomerDetail={addCustomerDetail}
                                modelCustomerDetails={addCustomerDetail}
                                currentCustomer={customerSingle}
                                api={api}
                              />
                            ) : (
                              <MenuWhenNoData />
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
                    isCreateOrderOpen={isCreateOrderOpen}
                    customer={customerSingle}
                  />
                </div>
              ) : (
                // : onSelectRoom ? (
                //   <CustomerChatSkeleton />
                // )

                <React.Fragment>
                  <div className="flex flex-col w-full h-full bg-white dark:bg-secondary">
                    <div className="flex items-center justify-between border-b px-4 py-2 dark:bg-background">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowChatList(!showChatList)}
                          className="hidden md:flex"
                        >
                          <Settings2 className="h-4 w-4" />
                        </Button>
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
            </>
          </ResizablePanel>
          {/* <ResizableHandle withHandle className="hidden lg:flex" /> */}
          {customerInfoOpen && (
            <ResizablePanel minSize={20} maxSize={25} className="min-w-[300px]">
              <aside className="hidden md:flex w-full">
                {selectedRoom && selectedRoom?.id && selectedRoom?.customer ? (
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
          customerId={selectedRoom?.customer?.id}
        />
      </OrderProvider>
    </div>
  );
}
