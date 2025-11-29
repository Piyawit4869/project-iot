import * as React from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
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
import type { CreateCRUDOrderInput, ProductType } from "~/schemas/order/order";
import { SingleSelectOnModalProduct } from "../../message";
import { Card } from "~/components/ui/card";
import {
  Coins,
  CreditCard,
  Percent,
  Receipt,
  ShoppingCart,
} from "lucide-react";

type ProductOption = {
  id: string;
  name: string;
  label: string;
  value: string;
};

type CreateOrderDialogProps = {
  customerId: string;
};

export function ListProduct({ customerId }: CreateOrderDialogProps) {
  const {
    order,
    //  setOrder,
    products,
    setProducts,
  } = useOrder();
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

            toast.success("สร้างคำสั่งซื้อเรียบร้อยแล้ว", {
              id: toastId,
              description: "",
              duration: 2500,
              position: "bottom-right",
            });
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
    if (products && products.length) {
      formOrder.setValue("orderDetail.products", products);
    }
  }, [products, formOrder]);

  return (
    <Form {...formOrder}>
      <form id="create-order" onSubmit={formOrder.handleSubmit(onCreate)}>
        <div className="gap-4 mt-3">
          <div className="flex flex-col gap-2">
            <Label className="font-semibold">เลือกรายการสินค้า</Label>

            <SingleSelectOnModalProduct
              options={productOptions}
              onChange={(productId) => {
                handleSelectProduct(productId);
              }}
            />

            <div className="mt-6">
              <div className="grid grid-cols-[1fr_150px_100px_120px] items-center border-b border-gray-200">
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
              <div className="mt-6 flex flex-col gap-4 overflow-y-auto">
                {products.map((p, i) => {
                  const productDetails =
                    getProducts &&
                    getProducts.length &&
                    getProducts?.find((prod: ProductType) => prod.id === p?.id);
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
                        className="grid grid-cols-[1fr_150px_100px_120px] items-center"
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={productDetails?.imageUrl || fallbackImage}
                            alt={productDetails?.name || "Unknown Product"}
                            className="w-16 h-16 rounded-md object-cover border border-gray-200"
                          />
                          <div className="flex flex-col">
                            <h3 className="text-sm font-semibold text-gray-900">
                              {productDetails?.name || "Unknown Product"}
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
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300"
                          >
                            –
                          </button>
                          <span className="w-6 text-center text-sm">
                            {p.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(i, (p.quantity ?? 1) + 1)
                            }
                            className="w-7 h-7 flex items-center justify-center rounded-md bg-gray-200 hover:bg-gray-300"
                          >
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
                          className="flex text-red-500 text-sm hover:text-red-600"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 h-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
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

            <hr />

            <div className="p-4 mt-3 w-full rounded-2xl bg-gray-50 shadow-inner">
              <h3 className="font-semibold text-lg mb-4">สรุปราคาสินค้า</h3>

              <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4 text-gray-500" />
                  <span>จำนวนสินค้า :</span>
                </div>
                <span>
                  {/* {(quantities || []).reduce((sum, q) => sum + q.quantity, 0)}{" "} */}
                  ชิ้น
                </span>
              </div>

              <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Coins className="w-4 h-4 text-gray-500" />
                  <span>ราคารวมสินค้า :</span>
                </div>
                {/* <span>{formatNumber(Price)} บาท</span> */}
                <span>บาท</span>
              </div>

              <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Percent className="w-4 h-4 text-gray-500" />
                  <span>ส่วนลด : </span>
                </div>
                <span>บาท</span>
                {/* <span>{formatNumber(discount)} บาท</span> */}
              </div>

              <div className="flex justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-gray-500" />
                  <span>ภาษีมูลค่าเพิ่ม : </span>
                </div>
                <span>
                  {/* <span>{formatNumber(totalVat)} บาท</span> */}
                  <span>%</span>
                </span>
              </div>

              <div className="flex justify-between font-bold text-lg mb-3">
                <div className="flex items-center gap-2">
                  <span>ยอดรวม : </span>
                </div>
                <span>บาท</span>
                {/* <span>{formatNumber(totalAddVat)} บาท</span> */}
              </div>

              {/* <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-gray-500" />
                  <span>
                    <span className="inline sm:hidden">ยอดชำระทั้งหมด : </span>
                    <span className="hidden sm:inline">
                      ยอดชำระทั้งหมด (รวม VAT/ค่าธรรมเนียม) :
                    </span>
                  </span>
                </div>
                {/* <span>{formatNumber((Price ?? 0) + (totalVat ?? 0))} บาท</span>
                <span>บาท</span>
              </div> */}
            </div>

            {/* <div>
              <section>
                <div className="p-4 mt-3 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-inner">
                  <h4 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">
                    สรุปราคาสินค้า
                  </h4>
                  <div className="flex justify-between mb-2">
                    <span>จำนวนสินค้าสินค้า:</span>
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
                  <div className="flex justify-between mb-2">
                    <span>ภาษีมูลค่าเพิ่ม:</span>
                    <span>{order.discount ?? 0} %</span>
                  </div>
                  <div className="flex justify-between font-bold text-green-700 dark:text-green-400 text-lg">
                    <span>ยอดรวม:</span>
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
            </div> */}
          </div>
        </div>
      </form>
    </Form>
  );
}
