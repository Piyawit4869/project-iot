import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { GlobalImage } from "~/components/shared/global-image";
import { useForm } from "react-hook-form";

import { toast } from "sonner";

import { v4 as uuidv4 } from "uuid";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useOrder } from "~/hooks/order/order";
import { useCustomer } from "~/api/client/customer/useCustomer";
import { GlobalModal } from "~/components/shared/modal/modal";
import {
  useCreateCustomerOrder,
  useExportPdf,
} from "~/api/client/order/useGetOrder";
import { useChatRoom } from "~/providers/chat/useChatRoom";
import { useGetProducts } from "~/api/client/product/useProductQuery";
import { DatePicker } from "~/components/shared/date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { currencyType } from "~/initData/order-initData";
import { MultiSelectOnModalProduct } from "./multiProduct";
import { SingleSelectOnModalProduct } from "./single-select-product";
import type { CreateCRUDOrderInput, ProductType } from "~/schemas/order/order";

type ProductOption = {
  id: string;
  name: string;
  label: string;
  value: string;
};

type CreateOrderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId: string;
  // onSubmit: (data: OrderData) => void;
};

export function CreateOrderDialog({
  open,
  onOpenChange,
  customerId,
}: CreateOrderDialogProps) {
  const {
    order,
    //  setOrder,
    products,
    setProducts,
  } = useOrder();
  const { customer: currentCustomer, refetchCustomer } = useChatRoom();
  const { data: getProducts, isLoading } = useGetProducts();

  // const { data: getProducts, isLoading } = useProductsWithEnable({
  //   enabled: open,
  // });
  const { data: customer, isLoading: loadCustomer } = useCustomer(customerId);

  const { mutate: creation } = useCreateCustomerOrder();
  const { mutate: exportPdf } = useExportPdf();

  const productOptions: ProductOption[] = React.useMemo(() => {
    if (!getProducts) return [];
    return getProducts.map((p: ProductType) => ({
      id: p.id,
      name: p.name,
      label: p.name,
      value: p.id,
      imageUrl: p.imageUrl,
      quantity: p.quantity,
      sku: p.sku,
      price: p.price,
    }));
  }, [getProducts]);

  // const toggleAddOn = (addon: string) => {
  //   const newAddOns = order.addOns.includes(addon)
  //     ? order.addOns.filter((a) => a !== addon)
  //     : [...order.addOns, addon];
  //   setOrder({ ...order, addOns: newAddOns });
  // };

  const formOrder = useForm<CreateCRUDOrderInput>({
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

  // const onCreate = (values: CreateCRUDOrderInput) => {
  const onCreate = () => {
    const no = uuidv4();

    const ps = products.map((p) => {
      return {
        id: p.id,
        name: p.name,
        quantity: p.quantity,
        sku: p.sku,
        matType: p.matType,
        status: p.status,
        price: p.price,
        salePrice: p.salePrice,
        active: true,
        costPrice: 0,
        discountPrice: 0,
        vatPrice: 0,
      };
    });

    const payload = {
      active: true,
      docNo: no,
      docName: `Order ${no}`,
      branchId: customer.branchId,
      startDate: new Date().toISOString(),
      discount: 0,
      vat: 0,
      wht: 0,
      customerId: customer.id,
      orderDetail: {
        products: ps,
      },
    };

    GlobalModal.info({
      title: "ยืนยันการสร้างคำสั่งซื้อ",
      description: "คุณต้องการสร้างคำสั่งซื้อนี้หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: async () => {
        const toastId = toast.loading("กำลังบันทึกข้อมูลคำสั่งซื้อ...", {
          position: "bottom-right",
        });
        creation(payload, {
          onSuccess: (data) => {
            exportPdf({ id: data.id });

            refetchCustomer();

            toast.success("สร้างคำสั่งซื้อเรียบร้อยแล้ว", {
              id: toastId,
              description: "",
              duration: 2500,
              position: "bottom-right",
            });

            onOpenChange(false);
          },
          onError: () => {
            toast.error("ไม่สามารถสร้างคำสั่งซื้อได้", {
              id: toastId,
              description: "",
              duration: 2500,
              position: "bottom-right",
            });
          },
        });
      },
    });
  };

  const updateQuantity = (index: number, newQty: number) => {
    const qty = Math.max(1, newQty);
    const currentProducts = formOrder.getValues("orderDetail.products");

    const updatedProducts = currentProducts.map((product, idx) => {
      if (idx === index) {
        return { ...product, quantity: qty };
      }
      return product;
    });

    setProducts(updatedProducts);
    formOrder.setValue("orderDetail.products", updatedProducts);
  };

  const handleRemove = (index: number) => {
    const updated = products.filter((_, i) => i !== index);
    setProducts(updated);
    formOrder.setValue("orderDetail.products", updated);
  };

  const handleSelectProduct = (productId: string) => {
    const productDetail = getProducts?.find(
      (prod: ProductType) => prod.id === productId
    );

    const idxProductInCart = products.findIndex(
      (prod) => prod.id === productId
    );
    if (idxProductInCart === -1) {
      const cartItems = [
        ...products,
        {
          ...productDetail,
          id: productId,
          quantity: 1,
          branchId: currentCustomer?.branchId,
        },
      ];
      setProducts(cartItems);
      formOrder.setValue("orderDetail.products", cartItems);
      return;
    }

    const updatedProducts = products.map((p, index) =>
      index === idxProductInCart ? { ...p, quantity: p.quantity + 1 } : p
    );
    setProducts(updatedProducts);
    formOrder.setValue("orderDetail.products", updatedProducts);
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

  return (
    <Form {...formOrder}>
      <form id="create-order" onSubmit={formOrder.handleSubmit(onCreate)}>
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent
            style={{ width: "100%", maxWidth: "1200px", maxHeight: "90vh" }}
            className="max-w-6xl w-full overflow-y-auto p-8 bg-[#F8F8F8]"
            onPointerDown={(e) => e.stopPropagation()}>
            <DialogHeader>
              <DialogTitle>ตะกร้าสินค้า {products.length} รายการ</DialogTitle>
            </DialogHeader>

            <div className="flex gap-4 mt-3">
              <div className="flex flex-col gap-2">
                <div className="flex-1 flex flex-col dark:border-gray-700 pr-5 p-4 bg-white rounded-lg shadow-sm">
                  <section className="mb-6">
                    <Label className="mb-4 block font-semibold">
                      เลือกรายการสินค้าเพิ่มเติม
                    </Label>
                    {/* <MultiSelectOnModalProduct
                    options={productOptions}
                    placeholder={
                      isLoading ? "กำลังโหลดสินค้า..." : "เลือกสินค้า"
                    }
                    selected={products
                      .map((item) => item?.id)
                      .filter((id): id is string => !!id)}
                    onChange={(newSelectedIds) => {
                      const newProducts = newSelectedIds.map((id) => {
                        const productDetails =
                          getProducts &&
                          getProducts.length &&
                          getProducts?.find(
                            (prod: ProductType) => prod.id === id
                          );
                        return (
                          productDetails && {
                            ...productDetails,
                            id: id,
                            quantity: 1,
                            branchId: currentCustomer?.branchId,
                          }
                        );
                      });
                      setProducts(newProducts);
                      formOrder.setValue("orderDetail.products", newProducts);
                    }}
                  /> */}

                    <SingleSelectOnModalProduct
                      options={productOptions}
                      onChange={(productId) => {
                        handleSelectProduct(productId);
                      }}
                    />

                    <div className="mt-6">
                      <div className="grid grid-cols-[1fr_150px_100px_120px] items-center px-6 py-3 border-b border-gray-200">
                        <span className="text-sm font-semibold text-gray-700">
                          รายละเอียดสินค้า
                        </span>
                        <span className="text-sm font-semibold text-gray-700 text-center">
                          จำนวน
                        </span>
                        <span className="text-sm font-semibold text-gray-700 text-center">
                          ราคา
                        </span>
                        <span className="text-sm font-semibold text-gray-700 text-center">
                          ราคารวม
                        </span>
                      </div>

                      {/* List of product cards with quantity input */}
                      <div className="mt-6 flex flex-col gap-4 h-[50vh] overflow-y-auto">
                        {products.map((p, i) => {
                          const productDetails =
                            getProducts &&
                            getProducts.length &&
                            getProducts?.find(
                              (prod: ProductType) => prod.id === p?.id
                            );
                          const fallbackImage =
                            "https://ui-avatars.com/api/?name=" +
                            encodeURIComponent(productDetails?.name ?? "image");

                          const price = productDetails?.price ?? 0;
                          const totalPrice = price * (p.quantity ?? 1);

                          return (
                            // <div
                            //   key={p.id}
                            //   className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md  transition-shadow"
                            // >
                            //   <GlobalImage
                            //     src={productDetails?.imageUrl || fallbackImage}
                            //     alt={productDetails?.name || "Unknown Product"}
                            //     className="w-20 h-20 rounded-md object-cover flex-shrink-0"
                            //   />

                            //   <div className="flex-1 min-w-0">
                            //     <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                            //       {productDetails?.name || "Unknown Product"}
                            //     </h3>
                            //     <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            //       ราคาต่อชิ้น: {price.toLocaleString()} ฿
                            //     </p>
                            //     <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
                            //       ราคารวม: {totalPrice.toLocaleString()} ฿
                            //     </p>
                            //   </div>

                            //   <div className="flex flex-col items-center">
                            //     <Label
                            //       htmlFor={`quantity-${p.id}`}
                            //       className="mb-1 text-sm"
                            //     >
                            //       จำนวน
                            //     </Label>
                            //     <Input
                            //       id={`quantity-${p.id}`}
                            //       type="number"
                            //       min={1}
                            //       className="w-20 text-center rounded border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            //       value={p.quantity}
                            //       onChange={(e) => {
                            //         const qty = Math.max(1, Number(e.target.value));
                            //         const currentProducts = formOrder.getValues(
                            //           "orderDetail.products"
                            //         );
                            //         const updatedProducts = currentProducts.map(
                            //           (product, idx) => {
                            //             if (idx === i) {
                            //               const updatedProduct = {
                            //                 ...product,
                            //                 quantity: qty,
                            //               };

                            //               return updatedProduct;
                            //             }
                            //             return product;
                            //           }
                            //         );

                            //         setProducts(updatedProducts);
                            //         formOrder.setValue(
                            //           "orderDetail.products",
                            //           updatedProducts
                            //         );
                            //       }}
                            //     />
                            //   </div>
                            // </div>
                            <div>
                              <div
                                key={p.id}
                                className="grid grid-cols-[1fr_150px_100px_120px] items-center px-6 py-4">
                                <div className="flex items-center gap-4">
                                  <img
                                    src={
                                      productDetails?.imageUrl || fallbackImage
                                    }
                                    alt={
                                      productDetails?.name || "Unknown Product"
                                    }
                                    className="w-16 h-16 rounded-md object-cover border border-gray-200"
                                  />
                                  <div className="flex flex-col">
                                    <h3 className="text-sm font-semibold text-gray-900">
                                      {productDetails?.name ||
                                        "Unknown Product"}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                      {productDetails?.sku}
                                    </p>
                                    <div className="mt-1">
                                      <Select>
                                        <SelectTrigger className="">
                                          <SelectValue placeholder="ดำ, S" />
                                        </SelectTrigger>

                                        <SelectContent>
                                          <SelectItem key="test" value="test">
                                            ดำ, S
                                          </SelectItem>
                                          <SelectItem key="test2" value="test2">
                                            ขาว, M
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-center gap-2">
                                  <button
                                    onClick={() =>
                                      updateQuantity(i, (p.quantity ?? 1) - 1)
                                    }
                                    className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300">
                                    –
                                  </button>
                                  <span className="w-6 text-center text-sm">
                                    {p.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(i, (p.quantity ?? 1) + 1)
                                    }
                                    className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300">
                                    +
                                  </button>
                                </div>
                                <div className="text-sm text-center text-gray-800">
                                  {price} ฿
                                </div>
                                <div className="flex flex-col items-center justify-end gap-3">
                                  <span className="text-sm font-semibold text-gray-900">
                                    {totalPrice} ฿
                                  </span>
                                </div>
                              </div>
                              <div className="flex items-center justify-end">
                                <button
                                  onClick={() => handleRemove(i)}
                                  className="flex text-red-500 text-sm hover:text-red-600">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22m-5-4H6a2 2 0 00-2 2v2h16V5a2 2 0 00-2-2z"
                                    />
                                  </svg>
                                  ลบ
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </section>
                </div>
                <div>
                  <section>
                    <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-inner">
                      <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                        สรุปราคาสินค้า
                      </h4>
                      <div className="flex justify-between mb-2">
                        <span>ราคารวมสินค้า:</span>
                        <span>
                          {products
                            .reduce((sum, p) => {
                              const prod =
                                getProducts &&
                                getProducts.length &&
                                getProducts?.find(
                                  (prod: ProductType) => prod.id === p.id
                                );
                              const price = prod?.price ?? 0;
                              return sum + price * (p.quantity ?? 1);
                            }, 0)
                            .toLocaleString()}{" "}
                          ฿
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>ส่วนลด:</span>
                        <span>{order.discount ?? 0} %</span>
                      </div>
                      <div className="flex justify-between font-bold text-green-700 dark:text-green-400 text-lg">
                        <span>ราคาสุทธิ:</span>
                        <span>
                          {(
                            products.reduce((sum, p) => {
                              const prod =
                                getProducts &&
                                getProducts.length &&
                                getProducts?.find(
                                  (prod: ProductType) => prod.id === p.id
                                );
                              const price = prod?.price ?? 0;
                              return sum + price * (p.quantity ?? 1);
                            }, 0) *
                            (1 - (order.discount ?? 0) / 100)
                          ).toLocaleString()}{" "}
                          ฿
                        </span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col bg-white rounded-lg p-4 shadow-sm">
                <div className="flex-1 flex flex-col gap-6 max-h-[70vh] overflow-y-auto">
                  <section>
                    {loadCustomer ? (
                      <div>Loading ...</div>
                    ) : (
                      <div>
                        <Label className="text-lg mb-2 block font-font-bol pr-14">
                          รายการคำสั่งซื้อ (Purchase Order)
                        </Label>
                        <div className="space-x-4">
                          <div>
                            <div>
                              <span className="text-sm">เลขที่ใบสั่งซื้อ</span>
                              <p className="text-gray-800 text-xl dark:text-gray-100 mt-1 mb-1">
                                {customer?.code || "N/A"}
                              </p>
                            </div>
                            <div className="mt-4">
                              <span className="text-sm">ลูกค้า</span>
                              <p className="text-gray-800 text-sm dark:text-gray-100">
                                {customer?.name || "N/A"}
                              </p>
                            </div>
                            <div className="mt-2">
                              <span className="text-sm">
                                วันที่ยืนยันคำสั่งซื้อ
                              </span>
                              <p className="text-gray-800 text-sm dark:text-gray-100">
                                {customer?.jj || "N/A"}
                              </p>
                            </div>
                            <div className="mt-3">
                              <FormField
                                control={formOrder.control}
                                name="startDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>กำหนดรับสินค้า</FormLabel>
                                    <FormControl>
                                      <DatePicker
                                        value={field.value || ""}
                                        onChange={field.onChange}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="mt-3">
                              <span className="text-sm">
                                วันที่รับสินค้าจริง
                              </span>
                              <p className="text-gray-800 text-sm dark:text-gray-100">
                                {customer?.name || "N/A"}
                              </p>
                            </div>
                            <div className="mt-3 mb-4">
                              <FormField
                                control={formOrder.control}
                                name="docNo"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>สกุลเงิน</FormLabel>
                                    <Select
                                      value={field.value}
                                      onValueChange={field.onChange}
                                      defaultValue="THB">
                                      <FormControl>
                                        <SelectTrigger className="w-full ">
                                          <SelectValue placeholder="เลือกสกุลเงิน" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {currencyType?.map((item) => (
                                          <SelectItem
                                            key={item.value}
                                            value={item.value}>
                                            {item.icon} {item.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </FormItem>
                                )}
                              />
                            </div>
                            <hr className="border-t-2 border-gray-300 mb-4" />
                            <div>
                              <Label className="text-lg mb-2 block font-font-bol">
                                ข้อมูลเพิ่มเติม (Other Information)
                              </Label>
                              <div className="mt-3 mb-4">
                                <FormField
                                  control={formOrder.control}
                                  name="docNo"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>ผู้ขาย</FormLabel>
                                      <Select
                                        value={field.value}
                                        onValueChange={field.onChange}>
                                        <FormControl>
                                          <SelectTrigger className="w-full ">
                                            <SelectValue placeholder="เลือกผู้ขาย" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem key="test" value="test">
                                            test
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </FormItem>
                                  )}
                                />
                              </div>
                              <div className="mt-3 mb-4">
                                <FormField
                                  control={formOrder.control}
                                  name="docNo"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>บริษัท (Company)</FormLabel>
                                      <Select
                                        value={field.value}
                                        onValueChange={field.onChange}>
                                        <FormControl>
                                          <SelectTrigger className="w-full ">
                                            <SelectValue placeholder="เลือกบริษัท" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          <SelectItem key="test" value="test">
                                            test
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </FormItem>
                                  )}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </section>

                  {/* <section>
                    <Label className="mb-2 block font-semibold">
                      ของแถมและส่วนลด
                    </Label>
                    <div className="flex flex-col gap-2 mb-4">
                      {[
                        "Gift Wrap",
                        "Express Delivery",
                        "Extended Warranty",
                      ].map((addon) => (
                        <label
                          key={addon}
                          className="flex items-center gap-2 cursor-pointer select-none"
                        >
                          <input
                            type="checkbox"
                            checked={order.addOns.includes(addon)}
                            onChange={() => toggleAddOn(addon)}
                            className="cursor-pointer"
                          />
                          <span>{addon}</span>
                        </label>
                      ))}
                    </div>
                    <Label htmlFor="discount">ส่วนลด (%)</Label>
                    <input
                      id="discount"
                      type="number"
                      min={0}
                      max={100}
                      className="w-full border rounded px-3 py-2"
                      value={order.discount}
                      onChange={(e) =>
                        setOrder({ ...order, discount: Number(e.target.value) })
                      }
                      placeholder="ระบุเปอร์เซ็นต์ส่วนลด"
                    />
                  </section> */}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                type="button">
                ยกเลิก
              </Button>

              <Button
                form="create-order"
                className="text-white"
                // type="submit"

                onClick={onCreate}>
                สร้างคำสั่งซื้อ
              </Button>
            </div>

            {/* <DialogFooter className="mt-6 flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                type="button"
              >
                ยกเลิก
              </Button>

              <Button
                form="create-order"
                className="bg-green-600 hover:bg-green-700 text-white"
                type="submit"
              >
                สร้างคำสั่งซื้อ
              </Button>
            </DialogFooter> */}
          </DialogContent>
        </Dialog>
      </form>
    </Form>
  );
}
