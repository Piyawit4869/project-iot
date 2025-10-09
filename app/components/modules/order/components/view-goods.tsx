"use client";

import * as React from "react";

import { GripVerticalIcon } from "lucide-react";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { GlobalImage } from "~/components/shared/global-image";
import { formatNumber } from "~/components/shared/global-format";
import { z, type ZodTypeAny } from "zod/v3";
import { useSortable } from "@dnd-kit/sortable";

type CardGoodsProps<T extends ZodTypeAny> = {
  label?: string;
  columns: ColumnDef<z.infer<T>>[];
  data: z.infer<T>[];
  onRemove?: (id: string) => void;
  onChange?: (val: number) => void;
  quantity?: number;
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

// Create a separate component for the drag handle
export const DragHandle = ({ id }: { id: string }) => {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVerticalIcon className="size-3 text-muted-foreground" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
};

export function ViewCardGoods<T extends ZodTypeAny>({
  quantity,
  data,
}: CardGoodsProps<T>) {
  return (
    <>
      <div className="overflow-hidden  ">
        {data &&
          data.length > 0 &&
          data.map((item: any, index) => {
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
                  <div className="flex flex-col gap-1.5">
                    <h2 className="font-bold text-lg">
                      {item.name || "ยังไม่มีชื่อสินค้า"}
                    </h2>
                    <span className="text-xs text-gray-500">
                      {item.sku || "ยังไม่มีรหัสสินค้า"}
                    </span>
                    <span className="text-sm ">
                      ต้นทุนต่อชิ้น : {formatNumber(item.costPrice || 0)}฿
                    </span>
                    <span className="text-sm ">
                      สินค้าคงเหลือ : {formatNumber(item.available || 0)} ชิ้น
                    </span>
                    <span className="text-sm ">
                      สินค้าพร้อมจำหน่าย :{" "}
                      {formatNumber(item.availableForSale || 0)} ชิ้น
                    </span>
                    <span className="text-sm ">
                      ส่วนลด : {formatNumber(item.discountPrice || 0)} ฿
                    </span>
                    <span className="text-red-600 font-semibold">
                      ราคารวม :{" "}
                      {formatNumber(
                        (quantity ?? 0) * item.salePrice - item.discountPrice
                      )}{" "}
                      ฿
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {/* <div className="flex flex-col items-center">
                    <span className="text-sm ">ภาษี (รวมอยู่ด้วย)</span>
                    <span className="text-md text-[#737373]">
                      {item.vatPrice || 0} %
                    </span>
                  </div> */}

                  <div className="flex flex-col items-center">
                    <span className="text-sm ">จำนวน</span>
                    <span className="text-md text-[#737373]">
                      {item.quantity || 0}
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-sm ">ราคาขาย</span>
                    <span className="text-md text-[#737373]">
                      {item.salePrice || 0}
                    </span>
                  </div>
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
