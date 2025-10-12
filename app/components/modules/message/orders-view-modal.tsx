import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import GlobalButton from "~/components/shared/global-button";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import dayjs from "dayjs";
import { ViewOrderDialog } from "./view-order";
import { useChatRoom } from "~/providers/chat/useChatRoom";
import { useGetAllOrders } from "~/api/client/order/useGetOrder";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";

type ChecklistDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function OrderViewModal({ open, onOpenChange }: ChecklistDialogProps) {
  const { selectedRoom, customer: currentCustomer } = useChatRoom();
  const { data, isLoading } = useGetAllOrders();

  const [search, setSearch] = React.useState("");

  const [customerOrders, setCustomerOrders] = React.useState<any[]>([]);
  const [viewOrderDetailOpen, setViewOrderDetailOpen] = React.useState(false);
  const [viewOrderDetail, setViewOrderDetail] = React.useState<string>("");

  const viewOrder = (orderId: string) => {
    const selectedOrder = customerOrders.find(
      (data: any) => data.id === orderId
    );

    if (!selectedOrder) return;

    setViewOrderDetail(selectedOrder?.id ?? "");

    setViewOrderDetailOpen?.(true);
  };

  React.useEffect(() => {
    if (currentCustomer) {
      const dataDetailFilter =
        data?.items?.filter((order: any) =>
          search
            ? order.customerId === currentCustomer.id &&
              order.id.includes(search)
            : order.customerId === currentCustomer.id
        ) ?? [];

      setCustomerOrders(dataDetailFilter);
    }
  }, [data, currentCustomer, search]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-lg w-full max-h-[70vh] overflow-auto p-6 rounded-lg"
      >
        <DialogHeader>
          <DialogTitle>ออเดอร์ของลูกค้า</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-2 max-h-[50vh] overflow-y-auto">
          <div className="space-y-3 border-t-1 pt-2">
            <Input
              placeholder="ค้นหาด้วยเลขออเดอร์"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {customerOrders && customerOrders?.length ? (
              <ScrollArea className="h-[50vh] rounded-md border p-1">
                <ul>
                  {customerOrders?.map((item: any) => (
                    <li
                      key={item && item.id}
                      className="flex items-center justify-between gap-4 p-2  border-b-1 hover:bg-muted rounded-md"
                    >
                      {item && item.id && (
                        <div className="flex items-center justify-between gap-2 cursor-pointer w-full">
                          <div className="flex flex-row gap-1 items-center">
                            <div className="flex flex-col">
                              <span className=" text-[12px] text-muted-foreground">
                                สร้างเมื่อ{" "}
                                {dayjs(item.createdAt).format(
                                  "DD MMM YYYY HH:mm"
                                )}
                              </span>
                              <span className="text-[12px]">
                                สถานะ {item.docStatus}
                              </span>
                              <span className="text-[12px] text-yellow-700">
                                Order-
                                {item.id?.length > 10
                                  ? item.id.slice(0, 6)
                                  : item.id}
                              </span>
                              <span className=" text-[12px]  ">
                                สร้างโดย {item.createdBy}
                              </span>
                            </div>
                          </div>
                          <div className="flex">
                            <GlobalButton
                              label="ดูออเดอร์"
                              className="mt-1 w-[10px]"
                              onClick={() => viewOrder(item.id)}
                            />
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            ) : (
              <div className="flex justify-center mt-5">
                {isLoading ? (
                  <SkeletonLoading />
                ) : (
                  <h2 className="text-sm">ยังไม่มีข้อมูลออเดอร์</h2>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>

      <ViewOrderDialog
        open={viewOrderDetailOpen}
        onOpenChange={setViewOrderDetailOpen}
        customerId={selectedRoom.customer?.id}
        orderId={viewOrderDetail}
        details={
          customerOrders &&
          customerOrders.length &&
          customerOrders?.find((co) => co.id === viewOrderDetail)
        }
      />
    </Dialog>
  );
}
