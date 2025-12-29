import { useState } from "react";
import { Box, Save } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useSearchParams } from "react-router";
import { useCreateOrder } from "~/api/client/order/useGetOrder";
import type { OrderFormValues } from "~/schemas/order/order";
import { GlobalModal } from "~/components/shared/modal/modal";
import { TabControl } from "~/components/shared/tab-control";
import GlobalButton from "~/components/shared/global-button";
import { Form } from "~/components/ui/form";
import initData from "~/initData/order-initData";
import { Card, CardContent } from "~/components/ui/card";
import type { ProductColumn } from "~/schemas/order/type";
import {
  calculateTotals,
  generateOrderNumber,
} from "../modules/order/components/order-function";
import { useOrderViewModel } from "../modules/order/viewmodels/useOrderViewModel";
import { NotationForm } from "./components/notation-form";
import { QuotationMock } from "./components/template/quotation";
import { ReceiptMock } from "./components/template/receipt";
import { InvoiceMock } from "./components/template/invoice";

export default function CreateOrder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const docType = searchParams.get("type"); // quotation | receipt | invoice
  const docTypeTH = {
    quotation: "ใบเสนอราคา",
    receipt: "ใบเสร็จรับเงิน",
    invoice: "ใบแจ้งหนี้",
  } as const;

  const docLabel = docType ? docTypeTH[docType as keyof typeof docTypeTH] : "";

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
      title: "สร้างเอกสาร",
      description: "คุณต้องการสร้างเอกสารนี้ใช่หรือไม่",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",

      onConfirm: async () => {
        const toastId = toast.loading("กำลังสร้างเอกสาร...", {
          position: "bottom-right",
        });
        creation(payload, {
          onSuccess: (data) => {
            toast.success("สร้างเอกสารสำเร็จ !", {
              id: toastId,
              duration: 2500,
              position: "bottom-right",
            });
            navigate(`/orders/${data.id}`);
          },
          onError: () => {
            toast.error("เกิดข้อผิดพลาดในการสร้างเอกสาร", {
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
        backpath="/notation"
        title="สร้างเอกสาร"
        buttons={[
          <GlobalButton
            key="create-order"
            label={
              <>
                <Save />
                บันทึก
              </>
            }
            type="submit"
            loading={isCreating}
            form="notation"
          />,
        ]}
      />

      <Form {...formCreate}>
        <form id="notation" onSubmit={formCreate.handleSubmit(onCreate)}>
          <div className="flex flex-wrap gap-6 justify-between w-full">
            <div className="w-full md:w-1/2 md:order-1">
              <NotationForm
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
                  <span className="font-semibold text-xl">
                    ข้อมูล{docLabel}
                  </span>
                  <Box />
                </div>

                <CardContent className="p-0">
                  {docType === "quotation" && (
                    <QuotationMock
                      data={formCreate.getValues()}
                      product={productsSelected}
                      makeImage={makeImage}
                      approvedImage={approvedSign}
                    />
                  )}

                  {docType === "receipt" && (
                    <ReceiptMock
                      data={formCreate.getValues()}
                      product={productsSelected}
                      makeImage={makeImage}
                      approvedImage={approvedSign}
                    />
                  )}

                  {docType === "invoice" && (
                    <InvoiceMock
                      data={formCreate.getValues()}
                      product={productsSelected}
                      makeImage={makeImage}
                      approvedImage={approvedSign}
                    />
                  )}
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
