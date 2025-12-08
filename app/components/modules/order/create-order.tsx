"use client";

import { useState } from "react";
import { Box, FileText, Save } from "lucide-react";
import { toast } from "sonner";
import { useOrderViewModel } from "./viewmodels/useOrderViewModel";
import { useNavigate } from "react-router";
import { useCreateOrder } from "~/api/client/order/useGetOrder";
import type { OrderFormValues } from "~/schemas/order/order";
import { GlobalModal } from "~/components/shared/modal/modal";
import { TabControl } from "~/components/shared/tab-control";
import GlobalButton from "~/components/shared/global-button";
import { Form } from "~/components/ui/form";
import initData from "~/initData/order-initData";
import { Card, CardContent } from "~/components/ui/card";
import { formatNumber } from "~/components/shared/global-format";
import { OrderForm } from "./components/form/OrderForm-create";
import type { ProductColumn } from "~/schemas/order/type";
import { CardGoods } from "./components/form/cardGoods";
import { OrderProduct } from "./components/form/OrderProduct";
import {
  calculateTotals,
  generateOrderNumber,
} from "./components/order-function";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { OrderProvider } from "~/hooks/order/order";
import { ListProduct } from "./components/product-select";
import { DetailProduct } from "./components/product-detail";
import { QuotationMock } from "./components/template";

export default function CreateOrder() {
  const navigate = useNavigate();

  const {
    state: { formCreate, isCreating },
  } = useOrderViewModel();
  const { mutateAsync: creation } = useCreateOrder();

  const [productsSelected, setProductsSelected] = useState<ProductColumn[]>([]);

  // const updateSelectedProducts = (newProducts: ProductColumn[]) => {
  //   const mergedProducts = newProducts.map((p) => {
  //     const match = productsSelected.find((sp) => sp.id === p.id);
  //     return { ...p, quantity: match?.quantity ?? p.quantity ?? 1 };
  //   });

  //   setProductsSelected(mergedProducts);

  //   formCreate.setValue(
  //     "orderDetail.products",
  //     mergedProducts.map((p) => ({
  //       id: p.id,
  //       name: p.name,
  //       quantity: p.quantity,
  //       sku: p.sku,
  //       matType: p.matType,
  //       status: p.status,
  //       price: p.salePrice,
  //       salePrice: p.salePrice,
  //       costPrice: p.costPrice,
  //       wht: p.wht,
  //       discountPrice: p.discountPrice,
  //       vatPrice: p.vatPrice,
  //       active: p.active ?? true,
  //     }))
  //   );
  // };

  // // add goods
  // const handleAddProduct = (products: ProductColumn[]) => {
  //   const newProducts = products.filter(
  //     (p) => !productsSelected.some((sp) => sp.id === p.id)
  //   );
  //   updateSelectedProducts([...productsSelected, ...newProducts]);
  // };

  // // del goods
  // const handleRemove = (id: string) => {
  //   const updatedProducts = productsSelected.filter((p) => p.id !== id);
  //   updateSelectedProducts(updatedProducts);
  // };

  // cal
  const { Price, totalVat, totalPrice } = calculateTotals(productsSelected);

  const discount = Number(formCreate.watch("discount") || 0);
  const totalAddVat = (Price ?? 0) + (totalVat ?? 0) - (discount ?? 0);
  const approvedSign = formCreate.watch("approvedSign");
  const makeImage = formCreate.watch("makeSign");

  const onCreate = (values: OrderFormValues) => {
    const productsPayload = productsSelected.map((p) => ({
      id: p.id,
      name: p.name,
      quantity: p.quantity,
      sku: p.sku,
      matType: p.matType,
      status: p.status,
      price: p.salePrice,
      salePrice: p.salePrice,
      costPrice: p.costPrice,
      wht: p.wht,
      discountPrice: p.discountPrice,
      vatPrice: p.vatPrice,
      active: p.active ?? true,
    }));

    const { Price, totalVat, totalWht, totalPrice } =
      calculateTotals(productsSelected);

    const payload = {
      ...values,
      docNo: generateOrderNumber(),
      discount: parseFloat(discount.toFixed(2)),
      grandTotal: parseFloat(totalAddVat.toFixed(2)),
      net: parseFloat(totalPrice.toFixed(2)),
      subTotal: parseFloat(Price.toFixed(2)),
      total: parseFloat(totalPrice.toFixed(2)),
      vat: parseFloat(totalVat.toFixed(2)),
      wht: parseFloat(totalWht.toFixed(2)),

      orderDetail: { products: productsPayload },
    };

    GlobalModal.info({
      title: "สร้างออเดอร์",
      description: "คุณต้องการสร้างออเดอร์นี้ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",

      onConfirm: async () => {
        const toastId = toast.loading("กำลังสร้างออเดอร์...", {
          position: "bottom-right",
        });
        creation(payload, {
          onSuccess: (data) => {
            toast.success("สร้างออเดอร์สำเร็จ !", {
              id: toastId,
              duration: 2500,
              position: "bottom-right",
            });
            navigate(`/orders/${data.id}`);
          },
          onError: () => {
            toast.error("เกิดข้อผิดพลาดในการสร้างออเดอร์", {
              id: toastId,
              duration: 3000,
              position: "bottom-right",
            });
          },
        });
      },
    });
  };

  return (
    <div className="flex flex-col w-full space-y-8 p-8">
      <TabControl
        backpath="/orders"
        title="สร้างออเดอร์"
        buttons={[
          <GlobalButton
            key="create-order"
            label={
              <>
                <Save /> สร้าง
              </>
            }
            type="submit"
            loading={isCreating}
            form="orders"
          />,
        ]}
      />

      <Form {...formCreate}>
        <form id="orders" onSubmit={formCreate.handleSubmit(onCreate)}>
          <div className="flex flex-wrap gap-6 justify-between w-full">
            <div className="w-full md:w-1/2 md:order-1">
              <OrderForm
                isEdit={false}
                viewMode={false}
                form={formCreate}
                initialData={initData.initialOrderFormData}
                Price={Price}
                totalVat={totalVat}
                quantities={productsSelected}
                products={productsSelected}
                onChangeProducts={setProductsSelected}
              />
            </div>

            <div className="flex-1 w-1/2 md:order-2 flex flex-col ">
              <Card className="p-6  w-full ">
                <div className="flex flex-row gap-3">
                  <span className="font-semibold text-xl">ข้อมูลออเดอร์</span>
                  <Box />
                </div>

                <CardContent className="p-0 px-0">
                  <div className="w-full">
                    <QuotationMock
                      data={formCreate.getValues()}
                      product={productsSelected}
                      makeImage={makeImage}
                      approvedImage={approvedSign}
                    />
                  </div>
                </CardContent>
                {/* <Tabs defaultValue="order" className="gap-4">
                  <TabsList className="bg-gray-100 rounded-sm px-6 p-1 ml-auto max-w-xs w-full">
                    <TabsTrigger value="order">
                      ข้อมูลออเดอร์
                      <Box />
                    </TabsTrigger>
                    <TabsTrigger value="notation">
                      ใบเสนอราคา <FileText />
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="order">
                    <h1 className="font-semibold p-3 text-xl">ข้อมูลออเดอร์</h1>
                    {productsSelected.length === 0 ? (
                      <div className="text-center text-gray-500 pb-5">
                        ยังไม่มีสินค้าที่เลือก
                      </div>
                    ) : (
                      <>
                        <CardGoods
                          data={productsSelected}
                          key={productsSelected.length}
                          quantities={productsSelected}
                          setQuantities={setProductsSelected}
                          onRemove={handleRemove}
                        />
                        <div className="flex flex-col items-end mt-4 text-lg font-semibold">
                          <div className="flex">
                            ราคาสินค้า :{" "}
                            <span className="ml-2 block">
                              {formatNumber(Price)} บาท
                            </span>
                          </div>
                          <div className="flex">
                            ภาษี :{" "}
                            <span className="ml-2 block">
                              {formatNumber(totalVat)} บาท
                            </span>
                          </div>
                          <div className="flex">
                            ราคารวมสินค้า :{" "}
                            <span className="ml-2 block">
                              {formatNumber(totalPrice)} บาท
                            </span>
                          </div>
                        </div>
                        <OrderProvider>
                          <DetailProduct products={productsSelected} />
                        </OrderProvider>
                      </>
                    )}
                    <OrderProduct
                      selectedProducts={productsSelected}
                      onAddProduct={handleAddProduct as any}
                    />
                  </TabsContent>
                </Tabs> */}
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
