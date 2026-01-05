import { Drawer, DrawerContent, DrawerTrigger } from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";
import { Settings2 } from "lucide-react";
import ChatCustomerInfo from "./chat-customer";
import MenuWhenNoData from "./noData/menuWhenNoData";

export default function ChatMobileDrawer({
  selectedRoom,
  api,
  refetch,
  setCreateOrderOpen,
  setAddCustomerDetail,
  addCustomerDetail,
  customerSingle,
  handleCloseDrawer,
}: any) {
  return (
    <Drawer direction="right" onClose={handleCloseDrawer}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="flex md:hidden">
          <Settings2 className="h-4 w-4" />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full">
          {selectedRoom?.id ? (
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
              hasCustomerId={selectedRoom?.customerId ? true : false}
            />
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
