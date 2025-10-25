"use client";

import React from "react";
import { useOrderViewModel } from "../viewmodels/useOrderViewModel";
import type { OrderFormProps } from "~/schemas/order/type";
import { Form } from "~/components/ui/form";
import { Card } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { CreditZone } from "./credit-zone";
import { ViewOrderDetail } from "./view-order-detail";
import { CustomTabs } from "~/components/shared/custom-tabs";
import { BotMessageSquare, FileText } from "lucide-react";

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
            <CustomTabs
              defaultValue="details"
              items={[
                {
                  key: "details",
                  label: "รายละเอียดสินค้า",
                  icon: <FileText className="w-4 h-4" />,
                  content: (
                    <div className="p-2">
                      <ViewOrderDetail order={order} />
                    </div>
                  ),
                },
                {
                  key: "credit",
                  label: "AI Insight",
                  icon: <BotMessageSquare className="w-4 h-4" />,
                  content: <CreditZone />,
                },
              ]}
            />
          </Card>
        </form>
      </Form>
    </>
  );
};
