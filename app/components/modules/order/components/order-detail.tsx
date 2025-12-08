"use client";

import React from "react";
import { useOrderViewModel } from "../viewmodels/useOrderViewModel";
import type { OrderFormProps } from "~/schemas/order/type";
import { Form } from "~/components/ui/form";
import { Card } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { CreditZone } from "./credit-zone";

import { CustomTabs } from "~/components/shared/custom-tabs";
import { BotMessageSquare, FileText } from "lucide-react";
import { OrderForm } from "./form/OrderForm-create";

export const OrderDetail: React.FC<OrderFormProps> = (props) => {
  const {
    // state: { formUpdate /* , isUpdate */ },
    actions: { onUpdate },
  } = useOrderViewModel();
  const { order, isEdit, setProductsSelected, form, productsSelected } = props;

  return (
    <>
      <Form {...form}>
        <form id="orders" onSubmit={form.handleSubmit(onUpdate)}>
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
                      {/* <ViewOrderDetail order={order} /> */}
                      <OrderForm
                        order={order}
                        products={productsSelected}
                        form={form}
                        viewMode={true}
                        isEdit={isEdit}
                        setProductsSelected={setProductsSelected}
                      />
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
