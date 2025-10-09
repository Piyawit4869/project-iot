"use client";

import React from "react";
import { useOrderViewModel } from "../viewmodels/useOrderViewModel";
import type { OrderFormProps } from "~/schemas/order/type";
import { Form } from "~/components/ui/form";
import { Card } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { CreditZone } from "./credit-zone";
import { ViewOrderDetail } from "./view-order-detail";

export const OrderDetail: React.FC<OrderFormProps> = (props) => {
  const {
    state: { formUpdate /* , isUpdate */ },
    actions: { onUpdate },
  } = useOrderViewModel();
  const { order } = props;

  // const onSubmit = (values: OrderFormValues) => {
  //   GlobalModal.info({
  //     title: "ปิดคำสั่งซื้อออเดอร์",
  //     description: "คุณต้องการปิดออเดอร์นี้ใช่หรือไม่",
  //     confirmText: "ยืนยัน",
  //     cancelText: "ยกเลิก",
  //     onConfirm: () => {
  //       /* const toastId = toast.loading("กำลังสร้างออเดอร์...");
  //       mutate(values, {
  //         onSuccess: (data) => {
  //           toast.success("สร้างออเดอร์เรียบร้อยแล้ว!", {
  //             id: toastId,
  //           });
  //           router.push(`/organization/orders/${data.data.id}`);
  //         },
  //         onError: () => {
  //           toast.error("เกิดข้อผิดพลาดขณะสร้างออเดอร์", {
  //             id: toastId,
  //           });
  //         },
  //       }); */
  //     },
  //   });
  // };

  return (
    <>
      <Form {...formUpdate}>
        <form id="orders" onSubmit={formUpdate.handleSubmit(onUpdate)}>
          <Card className="p-6 space-y-6">
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">รายละเอียดสินค้า</TabsTrigger>
                <TabsTrigger value="credit">เครดิต</TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="p-2">
                  <ViewOrderDetail order={order} />
                </div>
              </TabsContent>
              <TabsContent value="credit">
                <CreditZone />
              </TabsContent>
            </Tabs>
          </Card>
        </form>
      </Form>
    </>
  );
};
