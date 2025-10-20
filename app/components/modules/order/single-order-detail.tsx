"use client";

import { Upload } from "lucide-react";
import { useParams } from "react-router";
import { useOrderViewModel } from "./viewmodels/useOrderViewModel";
import { useGetOrder } from "~/api/client/order/useGetOrder";
import { useEntityBreadcrumb } from "~/providers/RouteProvider";

import { Button } from "~/components/ui/button";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";

import initData from "~/initData/order-initData";
import { useOrderColumnTable } from "./components/order-column-table";
import { ViewCardGoods } from "./components/view-goods";
import { TabControl } from "~/components/shared/tab-control";
import { OrderDetail } from "./components/order-detail";
import { Card } from "~/components/ui/card";

export default function SingleOrdersDetail() {
  const params = useParams();
  const id = params?.id as string;

  const {
    state: { formUpdate },
    actions: { onUpdate },
  } = useOrderViewModel();

  const { data: order, isLoading: loadOrder } = useGetOrder(id);
  const columns = useOrderColumnTable();
  const products = order?.orderDetails?.products;

  useEntityBreadcrumb({
    feature: "order",
    entity: order
      ? { id: order.id, name: order?.docName ?? order.id }
      : undefined,
    base: order && {
      href: `/orders/${order?.id}`,
      label: order?.docName,
      uuid: order?.id,
    },
  });

  return (
    <div className="flex flex-col w-full space-y-8 p-8">
      <TabControl
        backpath="/orders"
        title={`ดูรายละเอียดออเดอร์ ${order?.docName || ""}`}
        buttons={[
          <Button
            form="orders"
            key={"export"}
            type="submit"
            className="bg-[#737373]"
            onClick={() => {
              if (order?.pdfUrl) {
                window.open(order.pdfUrl, "_blank");
              }
            }}
            disabled
          >
            <Upload /> ส่งออก
          </Button>,
          // <Button form="orders" key={"close order"} type="submit">
          //   <X />
          //   ปิดคำสั่งซื้อ
          // </Button>,
        ]}
      />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 md:order-1">
          {loadOrder ? (
            <SkeletonLoading className="min-h-[720px]" />
          ) : (
            <OrderDetail
              isLoading={loadOrder}
              form={formUpdate}
              onSubmit={onUpdate}
              initialData={initData.initialOrderFormData}
              order={order}
            />
          )}
        </div>
        <div className="w-full md:w-1/2 md:order-2 flex flex-col">
          {loadOrder ? (
            <>
              <SkeletonLoading className="min-h-[120px]" />
              <SkeletonLoading className="min-h-[120px]" />
              <SkeletonLoading className="min-h-[120px]" />
            </>
          ) : products && products.length > 0 ? (
            <ViewCardGoods columns={columns} data={products} quantity={0} />
          ) : (
            <Card className="p-3 space-y-3 w-full">
              <h1 className="font-semibold p-3 text-xl">รายการสินค้า</h1>
              <div className="text-center text-gray-500 pb-5">
                ยังไม่มีสินค้าที่เลือก
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
