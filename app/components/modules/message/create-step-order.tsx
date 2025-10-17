"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Label } from "@/components/ui/label";

import { OrderData, ProductType } from "@/schemas/order/order";
import { useOrder } from "@/stores/order/order";
import { useProductsWithEnable } from "@/actions/products/client/useGetProducts";
import { MultiSelectOnModal } from "@/components/features/message/multi-select-products";
// import { Input } from "@/components/ui";
import { GlobalImage } from "@/components/shared/global-image";

type ProductOption = {
  id: string;
  name: string;
  label: string;
  value: string;
};

type CreateOrderStepDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: OrderData) => void;
};

export function CreateOrderStepDialog({
  open,
  onOpenChange,
}: // onSubmit,
CreateOrderStepDialogProps) {
  const { order, setOrder, step, setStep, resetOrder, products, setProducts } =
    useOrder();

  const { data: getProducts, isLoading } = useProductsWithEnable({
    enabled: open,
  });

  const productOptions: ProductOption[] = React.useMemo(() => {
    if (!getProducts) return [];
    return getProducts.map((p: ProductType) => ({
      id: p.id,
      name: p.name,
      label: p.name,
      value: p.id,
    }));
  }, [getProducts]);

  const handleBack = () => {
    setStep(step - 1);
  };

  const toggleAddOn = (addon: string) => {
    const newAddOns = order.addOns.includes(addon)
      ? order.addOns.filter((a) => a !== addon)
      : [...order.addOns, addon];
    setOrder({ ...order, addOns: newAddOns });
  };

  const handleSubmit = () => {
    // onSubmit(order);
    resetOrder();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-full p-6 rounded-lg"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle>สร้างคำสั่งซื้อ - ขั้นตอนที่ {step} / 4</DialogTitle>
          <DialogDescription>
            {step === 1 && "เลือกสินค้า"}
            {step === 2 && "เลือกจำนวนสินค้า"}
            {step === 3 && "กรอกข้อมูลลูกค้า"}
            {step === 4 && "เลือกของแถมและส่วนลด"}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div>
            <Label htmlFor="products">สินค้า</Label>
            <MultiSelectOnModal
              options={productOptions}
              placeholder={isLoading ? "กำลังโหลดสินค้า..." : "เลือกสินค้า"}
              selected={products
                .map((item) => item.id)
                .filter((id): id is string => id !== undefined)}
              onChange={(newSelectedIds) => {
                const newProducts = newSelectedIds.map((id) => {
                  const productDetails =
                    getProducts &&
                    getProducts.res &&
                    getProducts.res.length &&
                    getProducts?.res?.find(
                      (prod: ProductType) => prod.id === id
                    );

                  return (
                    productDetails && {
                      ...productDetails,
                      id: id,
                      quantity: 1,
                      // branchId: me.data.branchId,
                    }
                  );
                });

                setProducts(newProducts);
              }}
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <Label className="mb-4 block text-lg font-semibold">
              จำนวนสินค้า
            </Label>
            <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto">
              {products.map((p) => {
                const productDetails = getProducts?.find(
                  (prod: ProductType) => prod.id === p.id
                );
                const fallbackImage =
                  "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(productDetails?.name ?? "image");

                const price = productDetails?.price ?? 0;
                const totalPrice = price * (p.quantity ?? 1);

                return (
                  <div
                    key={p.id}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  >
                    <GlobalImage
                      src={productDetails?.imageUrl || fallbackImage}
                      alt={productDetails?.name || "Unknown Product"}
                      className="w-20 h-20 rounded-md object-cover flex-shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {productDetails?.name || "Unknown Product"}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        ราคาต่อชิ้น: {price.toLocaleString()} ฿
                      </p>
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
                        ราคารวม: {totalPrice.toLocaleString()} ฿
                      </p>
                    </div>

                    {/* <div className="flex flex-col items-center">
                      <Label
                        htmlFor={`quantity-${p.id}`}
                        className="mb-1 text-sm"
                      >
                        จำนวน
                      </Label>
                      <Input
                        id={`quantity-${p.id}`}
                        type="number"
                        min={1}
                        className="w-20 text-center rounded border border-gray-300 dark:border-gray-600 px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={p.quantity}
                        onChange={(e) => {
                          const qty = Math.max(1, Number(e.target.value));
                          const newProducts = [...products];
                          newProducts[i] = { ...newProducts[i], quantity: qty };
                          setProducts(newProducts);
                        }}
                      />
                    </div> */}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <>
            <div className="mb-4">
              <Label htmlFor="customerName">ชื่อผู้ติดต่อ</Label>
              <input
                id="customerName"
                placeholder="ชื่อผู้ติดต่อ"
                className="w-full border rounded px-3 py-2"
                value={order.customerName}
                onChange={(e) =>
                  setOrder({ ...order, customerName: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="customerEmail">อีเมลลูกค้า</Label>
              <input
                id="customerEmail"
                type="email"
                placeholder="อีเมลลูกค้า"
                className="w-full border rounded px-3 py-2"
                value={order.customerEmail}
                onChange={(e) =>
                  setOrder({ ...order, customerEmail: e.target.value })
                }
              />
            </div>
          </>
        )}

        {step === 4 && (
          <div>
            <Label className="mb-2">ของแถม</Label>
            <div className="flex flex-col gap-2 mb-4">
              {["Gift Wrap", "Express Delivery", "Extended Warranty"].map(
                (addon) => (
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
                )
              )}
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
          </div>
        )}

        <DialogFooter className="mt-6 flex justify-between">
          <div>
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="mr-2"
              type="button"
            >
              ย้อนกลับ
            </Button>
            {step < 4 && (
              <Button
                onClick={() => {
                  setStep(step + 1);
                }}
                disabled={isLoading}
              >
                ถัดไป
              </Button>
            )}
          </div>

          {step === 4 && (
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white"
              type="button"
            >
              สร้างคำสั่งซื้อ
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
