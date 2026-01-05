"use client";

import {
  Activity,
  BotMessageSquare,
  Box,
  FileText,
  PenLine,
  Save,
  Upload,
  X,
} from "lucide-react";
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
import { Card, CardContent } from "~/components/ui/card";
import { OrderForm } from "./components/form/OrderForm-create";
import { QuotationMock } from "~/components/modules/order/components/template";
import { calculateTotals } from "./components/order-function";
import { useEffect, useState } from "react";
import type { ProductColumn } from "~/schemas/order/type";
import ArrowProgress from "./components/ArrowProgress";
import { CustomTabs } from "~/components/shared/custom-tabs";
import { CreditZone } from "./components/credit-zone";
import { ViewCustomerActivityLog } from "../customer/components/customer-activityLog";
import GlobalButton from "~/components/shared/global-button";

export default function SingleOrdersDetail() {
  const params = useParams();
  const id = params?.id as string;

  const {
    state: { formUpdate },
    actions: { onUpdate },
  } = useOrderViewModel();

  const { data: order, isLoading: loadOrder } = useGetOrder(id);

  const products = order?.orderDetails?.products;

  const [productsSelected, setProductsSelected] =
    useState<ProductColumn[]>(products);

  const [isEdit, setIsEdit] = useState(false);

  const approvedSign = formUpdate.watch("approvedSign");
  const makeImage = formUpdate.watch("makeSign");

  const cancelEdit = () => {
    formUpdate.reset();
    setProductsSelected(order?.orderDetails?.products ?? []);
    setIsEdit(false);
  };

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

  useEffect(() => {
    if (products) {
      setProductsSelected(products);
    }
  }, [products]);

  return (
    <div className="flex flex-col w-full space-y-8 p-8">
      <TabControl
        backpath="/orders"
        title={`ดูรายละเอียดออเดอร์ ${order?.docName || ""}`}
        buttons={[
          // ส่งออก (ยัง disabled อยู่)
          <Button
            form="orders"
            key="export"
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

          isEdit && (
            <div>
              <Button key="cancel" className="mr-3" onClick={cancelEdit}>
                <X />
                ยกเลิก
              </Button>
              <Button
                key="save-order"
                form="orders"
                onClick={() => setIsEdit(false)}
              >
                <Save />
                บันทึก
              </Button>
            </div>
          ),

          !isEdit && (
            <Button key="edit" onClick={() => setIsEdit(true)}>
              <PenLine />
              แก้ไข
            </Button>
          ),
        ]}
      />

      <div className="mb-4">
        {" "}
        <ArrowProgress />{" "}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/2 md:order-1">
          {loadOrder ? (
            <SkeletonLoading className="min-h-[720px]" />
          ) : (
            <OrderDetail
              isEdit={isEdit}
              isLoading={loadOrder}
              form={formUpdate}
              onSubmit={onUpdate}
              initialData={initData.initialOrderFormData}
              order={order}
              products={products}
              productsSelected={productsSelected}
              setProductsSelected={setProductsSelected}
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
          ) : (
            <Card className="p-6 w-full ">
              <CardContent className="p-0 px-0 ">
                <div className="flex justify-end items-end">
                  <CustomTabs
                    listClassName="self-end"
                    defaultValue="details"
                    items={[
                      {
                        key: "details",
                        label: "รายละเอียดสินค้า",
                        icon: <FileText className="w-4 h-4" />,
                        content: (
                          <div className="p-2">
                            <div className="flex flex-row gap-3">
                              <span className="font-bold text-xl">
                                ตัวอย่างใบเสนอราคา
                              </span>
                              <Box />
                            </div>
                            {/* <ViewOrderDetail order={order} /> */}
                            <QuotationMock
                              data={formUpdate.getValues()}
                              product={productsSelected || []}
                              makeImage={makeImage}
                              approvedImage={approvedSign}
                            />
                          </div>
                        ),
                      },
                      {
                        key: "active",
                        label: "บันทึกกิจกรรม",
                        icon: <Activity className="w-4 h-4" />,
                        content: (
                          <>
                            <div className="p-2">
                              <div className="flex flex-row gap-3">
                                <span className="font-bold text-xl">
                                  บันทึกกิจกรรม
                                </span>
                              </div>
                            </div>
                            <ViewCustomerActivityLog />
                          </>
                        ),
                      },
                    ]}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
