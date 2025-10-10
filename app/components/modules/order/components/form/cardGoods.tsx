"use client";

import * as React from "react";

import { Trash2 } from "lucide-react";
import type { ProductColumn } from "~/schemas/order/type";
import z, { type ZodTypeAny } from "zod";
import { Card } from "~/components/ui/card";
import { GlobalImage } from "~/components/shared/global-image";
import { formatNumber } from "~/components/shared/global-format";
import { Button } from "~/components/ui/button";

type CardGoodsProps<_T> = {
  label?: string;
  data: ProductColumn[];
  onRemove?: (id: string) => void;
  onChange?: (newProducts: ProductColumn[]) => void;
  quantities: ProductColumn[];
  setQuantities: React.Dispatch<React.SetStateAction<ProductColumn[]>>;
};

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  status: z.string(),
  target: z.string(),
  limit: z.string(),
  reviewer: z.string(),
});

export function CardGoods<T extends ZodTypeAny>({
  onRemove,
  setQuantities,
  quantities,
  data: initialData,
}: CardGoodsProps<T>) {
  const [data /*  setData */] = React.useState(initialData);

  return (
    <>
      <div className="overflow-hidden  ">
        {data &&
          data.length > 0 &&
          data.map((item: any, index) => {
            const itemQuantity =
              quantities.find((q) => q.id === item.id)?.quantity ?? 1;
            return (
              <Card
                key={`item.value-${index}`}
                className="flex items-start justify-between p-4 gap-4 mb-5"
              >
                <div className="flex gap-4">
                  <GlobalImage
                    src={item.imageUrl}
                    alt="Product"
                    className="w-15 h-15 rounded-lg object-cover border"
                  />
                  <div className="flex flex-col gap-1">
                    <h2 className="font-bold text-lg">{item.name}</h2>

                    <span className="text-xs text-gray-500">
                      {item.sku || "ยังไม่มีรหัสสินค้า"}
                    </span>
                    <span className="text-sm ">
                      ต้นทุนต่อชิ้น : {formatNumber(item.costPrice || 0)} ฿
                    </span>
                    <span className="text-sm ">
                      สินค้าคงเหลือ : {item.available || 0} ชิ้น
                    </span>
                    <span className="text-sm ">
                      สินค้าพร้อมจำหน่าย : {item.availableForSale || 0} ชิ้น
                    </span>
                    <span className="text-sm ">
                      ส่วนลด : {formatNumber(item.discountPrice || 0)} ฿
                    </span>
                    <span className="text-red-600 font-semibold">
                      ราคารวม :{" "}
                      {formatNumber(
                        itemQuantity * item.salePrice - item.discountPrice
                      )}
                      ฿
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* <div className="flex flex-col items-center">
                    <span className="text-sm ">ภาษี (รวมอยู่ด้วย)</span>
                    <span className="text-md text-[#737373]">
                      {item.vatPrice} %
                    </span>
                  </div> */}

                  <div className="flex flex-col items-center">
                    <span className="text-sm">จำนวน</span>
                    <input
                      type="number"
                      min={1}
                      max={item.availableForSale}
                      className="w-16 h-10 text-center border rounded"
                      value={itemQuantity}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        const clamped = Math.max(
                          1,
                          Math.min(item.availableForSale, val)
                        );
                        const id = item.id;
                        const value = clamped;

                        // let qtyResult;
                        setQuantities((prev) => {
                          const existing = prev.find((q) => q.id === id);
                          let updated: ProductColumn[];
                          if (existing) {
                            updated = prev.map((q) =>
                              q.id === id ? { ...q, quantity: value } : q
                            );
                          } else {
                            const product = data.find((p) => p.id === id);
                            if (!product) return prev; // safety check
                            updated = [
                              ...prev,
                              { ...product, quantity: value },
                            ];
                          }

                          // qtyResult = updated;
                          return updated;
                        });

                        // handleQuantityChange(qtyResult);
                      }}
                    />
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-sm ">ราคาขาย</span>
                    <span className="text-md text-[#737373]  h-10">
                      {item.salePrice}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onRemove?.(item.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
            );
          })}
        {/*  <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableBody className="**:data-[slot=table-cell]:first:w-8">
              {table.getRowModel().rows?.length ? (
                <SortableContext
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map((row) => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext> */}
      </div>
    </>
  );
}
