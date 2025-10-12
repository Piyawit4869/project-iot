"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
// import { Label } from "@/components/ui/label";

import { GlobalImage } from "~/components/shared/global-image";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { GlobalModal } from "~/components/shared/modal/modal";
import { toast } from "sonner";
// import { useGetProducts } from "@/hooks/queries/useProductQuery";
// import { OrderFormValues } from "@/schemas/order/order";

import dayjs from "dayjs";
import "dayjs/locale/th";
import { useNavigate } from "react-router";
import { Form } from "~/components/ui/form";
import { Card } from "~/components/ui/card";
import {
  CreateCRUDOrderSchema,
  type CreateCRUDOrderInput,
} from "~/schemas/order/order";
import { handleToastAndRedirect } from "~/utils/toast";
import { useOrder } from "~/hooks/order/order";
import type { Product } from "~/schemas/product/product";
import { useChatRoom } from "~/providers/chat/useChatRoom";
import { useCustomer } from "~/api/client/customer/useCustomer";
import { customerType } from "~/initData/customer-initData";
import {
  useCreateCustomerOrder,
  useExportPdf,
} from "~/api/client/order/useGetOrder";

dayjs.locale("th");

/* interface ProductType {
  id?: string;
  name?: string;
  quantity?: number;
  price?: number;
  [key: string]: any;
}
 */
// interface OrderDetail {
//   id?: string;
//   products?: Product[];
//   [key: string]: any;
// }

type ViewOrderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId: string;
  orderId: string;
  details: any;
};

export function ViewOrderDialog({
  open,
  onOpenChange,
  customerId,
  orderId,
  details,
}: ViewOrderDialogProps) {
  const navigate = useNavigate();
  const { /*  order, */ products /*  setProducts */ } = useOrder();
  const { customer: currentCustomer } = useChatRoom();
  // const { data: getProducts } = useGetProducts();
  // const { data: getProducts, isLoading } = useProductsWithEnable({
  //   enabled: open,
  // });

  const findDataOrder = details;

  const { /* data: customer, */ isLoading: loadCustomer } =
    useCustomer(customerId);

  const { mutate: creation } = useCreateCustomerOrder();
  const { mutate: exportPdf } = useExportPdf();

  const formOrder = useForm<CreateCRUDOrderInput>({
    resolver: zodResolver(
      CreateCRUDOrderSchema
    ) as Resolver<CreateCRUDOrderInput>,
    mode: "onSubmit",
    defaultValues: {
      active: true,
      docNo: "123",
      docName: "example doc",
      branchId: "",
      notationType: "quotation",
      startDate: new Date().toISOString(),
      discount: 0,
      vat: 0,
      wht: 0,
      customerId: "",
      orderDetail: {
        products: [],
      },
    },
  });

  const onCreate = (values: CreateCRUDOrderInput) => {
    GlobalModal.info({
      title: "ยืนยันการสร้างคำสั่งซื้อ",
      description: "คุณต้องการสร้างคำสั่งซื้อนี้หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังบันทึกข้อมูลคำสั่งซื้อ...", {
          position: "bottom-right",
        });
        creation(values, {
          onSuccess: (data) => {
            exportPdf({ id: data.id });
            handleToastAndRedirect({
              response: data,
              successRedirectPath: "#",
              loadingToastId: toastId as string,
              successMessage: "สร้างคำสั่งซื้อเรียบร้อยแล้ว!",
              errorMessage: "ไม่สามารถสร้างคำสั่งซื้อได้",
            });
            onOpenChange(false);
          },
          onError: () => {
            handleToastAndRedirect({
              successRedirectPath: "#",
              loadingToastId: toastId as string,
              successMessage: "สร้างคำสั่งซื้อเรียบร้อยแล้ว!",
              errorMessage: "ไม่สามารถสร้างคำสั่งซื้อได้",
            });
          },
        });
      },
    });
  };

  const handleOpenPdf = async () => {
    const toastId = toast.loading("กำลังสร้างใบเสนอราคาสินค้่า...", {
      position: "bottom-right",
    });

    exportPdf(
      { id: orderId },
      {
        onSuccess: (data) => {
          toast.success("สร้างใบเสนอราคาสินค้่าเรียบร้อยแล้ว", {
            id: toastId,
            description: "",
            duration: 2500,
            position: "bottom-right",
          });

          window.open(data.url, "_blank");
        },
        onError: () => {
          toast.error("ไม่สามารถสร้างใบเสนอราคาสินค้่า", {
            id: toastId,
            description: "",
            duration: 2500,
            position: "bottom-right",
          });
        },
      }
    );
  };

  React.useEffect(() => {
    if (currentCustomer?.branchId && currentCustomer?.id) {
      formOrder.setValue("branchId", currentCustomer.branchId);
      formOrder.setValue("customerId", currentCustomer.id);
    }
    if (products && products.length) {
      formOrder.setValue("orderDetail.products", products);
    }
  }, [currentCustomer?.branchId, currentCustomer?.id, products, formOrder]);

  const typeCustomer =
    customerType.find((item) => item.value === currentCustomer?.customerType)
      ?.label ?? "-";

  const productsData: Product[] = findDataOrder?.orderDetails?.products ?? [];
  const totalQuantity: number = productsData.reduce(
    (sum: number, product: Product) => sum + (product.quantity ?? 0),
    0
  );

  return (
    <Form {...formOrder}>
      <form id="create-order" onSubmit={formOrder.handleSubmit(onCreate)}>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent
            style={{ width: "100%", maxWidth: "800px", maxHeight: "90vh" }}
            className="max-w-6xl w-full overflow-y-auto p-8"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <DialogHeader>
              <DialogTitle>รายละเอียดคำสั่งซื้อ</DialogTitle>
              <DialogDescription>
                กรุณากรอกตรวจสอบข้อมูลก่อนออกใบราคาสินค้า
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2">
              <span>เลขที่คำสั่งซื้อ (Doc No)</span>
              <span>{findDataOrder?.id}</span>
              <div className="grid grid-cols-2 gap-2">
                <div>วันที่สั่งซื้อคำสั่งซื้อ</div>
                <div>สถานะของคำสั่งซื้อ</div>
                <div>
                  {dayjs(findDataOrder?.createdAt).format("DD MMMM YYYY HH:mm")}
                </div>
                <div>{findDataOrder?.status}</div>
              </div>
            </div>

            <div className="flex flex-row ">
              <Card className="p-6 space-y-6 w-full">
                <DialogHeader>
                  <DialogTitle>ข้อมูลลูกค้า</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                  <span>ชื่อ-นามสกุลลูกค้า</span>
                  <span>{findDataOrder?.customer?.name}</span>
                  <div className="grid grid-cols-2 gap-2">
                    <div>เลขประจำตัวผู้เสียภาษี</div>
                    <div>ประเภทผู้ติดต่อ</div>
                    <div>
                      {findDataOrder?.customer?.taxId &&
                      findDataOrder?.customer?.taxId.trim() !== ""
                        ? findDataOrder.customer.taxId
                        : "-"}
                    </div>
                    <div>{typeCustomer}</div>
                    <div>อีเมล</div>
                    <div>เบอร์โทรศัพท์</div>
                    <div>-</div>
                    <div>-</div>
                    <div>ที่อยู่</div>
                    <div>รหัสไปรณีย์</div>
                    <div>-</div>
                    <div>-</div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="flex flex-col gap-4 mt-4">
              {/* Left Column */}

              <div className="flex justify-between w-full space-x-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  รายการสินค้า
                </h3>
              </div>
              <Card className="space-y-6 w-full">
                <ul>
                  {productsData.length > 0 ? (
                    productsData.map((item: any) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between gap-4 p-3 mt-1 border-b rounded-md"
                      >
                        <div className="flex items-center justify-between gap-2 w-full">
                          <div className="flex flex-row gap-1 items-center">
                            <GlobalImage
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-[30px] h-[30px] rounded-lg items-center"
                            />
                            <div className="flex flex-col gap-1 ml-2">
                              <span className="text-sm font-medium">
                                {item.name}
                              </span>
                              <span className="font-semibold text-[12px] text-blue-600">
                                {item.salePrice} ฿
                              </span>
                            </div>
                          </div>
                          <div>จำนวน {item.quantity}</div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="text-center text-sm text-muted-foreground py-4">
                      No items found
                    </p>
                  )}
                </ul>
              </Card>
            </div>

            <div className="flex gap-4 mt-4">
              {/* Right Column */}
              <div className="flex-1 flex flex-col gap-4 h-full w-full">
                {loadCustomer ? (
                  <div>Loading ...</div>
                ) : (
                  <>
                    <div className="flex justify-between w-full space-x-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        สรุปราคาสินค้า
                      </h3>
                    </div>
                    <Card className="p-6 space-y-6 w-full">
                      <div className="flex justify-between mb-2">
                        <span>จำนวนสินค้า:</span>
                        <span>{totalQuantity} ชิ้น</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>ราคารวมสินค้า:</span>
                        <span>{findDataOrder?.subTotal} ฿</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>ส่วนลด:</span>
                        <span>{findDataOrder?.discount ?? 0}%</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>ภาษีมูลค่าเพิ่ม:</span>
                        <span>{findDataOrder?.discount ?? 0}%</span>
                      </div>
                      <div className="flex justify-between font-bold text-green-700 dark:text-green-400 text-lg">
                        <span>ราคาสุทธิ:</span>
                        <span>{findDataOrder?.total} ฿</span>
                      </div>
                    </Card>
                  </>
                )}
              </div>
            </div>

            <div className="mt-6 flex-1">
              <div className="flex flex-row justify-between">
                <Button
                  variant="ghost"
                  onClick={() => onOpenChange(false)}
                  type="button"
                >
                  ปิด
                </Button>

                <div className="flex flex-row gap-3">
                  {/* <Button
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    type="button"
                    disabled
                  >
                    ยกเลิกคำสั่งซื้อ
                  </Button> */}
                  <Button
                    variant="secondary"
                    // onClick={() => window.open("/notation-view", "_blank")}
                    onClick={handleOpenPdf}
                    type="button"
                  >
                    ดูใบเสนอราคาสินค้า
                  </Button>
                  {/* <Button
                    form="create-order"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    type="submit"
                    disabled
                  >
                    ส่งใบเสนอราคาสินค้าเข้าแชท
                  </Button> */}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
