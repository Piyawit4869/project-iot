"use client";

import * as Icons from "lucide-react";

import { X, Package, Hourglass } from "lucide-react";
import { useEffect, useState, type ReactElement } from "react";
import { usePaginate } from "~/api/client/product/useProductQuery";
import { GlobalImage } from "~/components/shared/global-image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";
import type { Item } from "~/types/global";

type VariantType =
  | "default"
  | "outline"
  | "secondary"
  | "destructive"
  | "ghost"
  | "link";

interface SelectorItemsModalProps {
  customButton?: ReactElement;
  label?: string;
  buttonVariant?: VariantType;
  items: Item[];
  selected: string[];
  onChange: (selectedIds: string[]) => void;
  multiple?: boolean;
  isLoading?: boolean;
}

export const SelectorItemsModal: React.FC<SelectorItemsModalProps> = ({
  label = "เลือกสินค้า",

  // items,
  selected,
  onChange,
  multiple = true,
}) => {
  function useDebounce<T>(value: T, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => setDebouncedValue(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
  }

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [selectedItems, setSelectedItems] = useState<string[]>(selected);
  const [previewUrl, setPreviewUrl] = useState("");

  const { data: products, isLoading } = usePaginate({
    pageIndex: 1,
    pageSize: 20,
    name: debouncedSearch,
  });

  const toggleItem = (id: string) => {
    if (multiple) {
      setSelectedItems((prev) =>
        prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
      );
    } else {
      setSelectedItems([id]);
      onChange([id]);
      setOpen(false);
    }
  };

  const handleDone = () => {
    onChange(selectedItems);
    setOpen(false);
  };

  useEffect(() => {
    if (!open) {
      setSearch("");
      setSelectedItems(selected);
    }
  }, [open, selected]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Hourglass />
              กำลังโหลดรายการสินค้า
            </>
          ) : (
            <>
              <Package /> เลือกสินค้า
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col md:min-w-[90vh] md:min-h-[70vh] md:max-h-[80vh] overflow-auto p-5.5 rounded-lg sm:max-w-lg">
        <DialogHeader className="gap-3">
          <DialogTitle>{label}</DialogTitle>
          <span className="text-sm text-gray-400">
            ผู้ใช้สามารถกดที่ไอคอนเพื่อดูรายละเอียดเพิ่มเติมได้
          </span>
          <div className="space-y-3">
            <Input
              placeholder="ค้นหาด้วยชื่อ"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </DialogHeader>

        <div className="space-y-3">
          <ScrollArea className="h-80 md:min-h-100 rounded-md border p-2 bg-white">
            <ul className="space-y-2">
              {products?.items && products.items.length > 0 ? (
                products.items.map((item: any) => {
                  const isOut =
                    Number(item.available) === 0 ||
                    Number(item.availableForSale) === 0;

                  return (
                    <li
                      key={item.id}
                      className={cn(
                        "flex items-center justify-between gap-4 rounded-xl p-3",
                        "hover:bg-muted/60 transition-colors",
                        isOut && "opacity-70"
                      )}
                    >
                      <div className="flex justify-between gap-3 md:gap-6 w-full">
                        <div className="flex items-center gap-3 md:gap-6">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => toggleItem(item.id ?? "")}
                            disabled={isOut}
                            className={cn(
                              "w-5 h-5 rounded-md border-2",
                              "data-[state=checked]:bg-black data-[state=checked]:border-black",
                              "data-[state=unchecked]:border-gray-300",
                              "hover:border-gray-800 hover:bg-gray-50",
                              "disabled:opacity-50 disabled:cursor-not-allowed"
                            )}
                          />

                          <GlobalImage
                            src={item.imageUrl || ""}
                            alt={item.name}
                            className="w-[48px] h-[48px] md:w-[70px] md:h-[70px] rounded-lg object-cover border"
                          />

                          <Accordion
                            type="single"
                            collapsible
                            className="w-full"
                          >
                            <AccordionItem
                              value={`item-${item.id}`}
                              className="border-none"
                            >
                              <AccordionTrigger className="p-0 hover:no-underline ">
                                <div className="flex flex-col text-left">
                                  <span className="text-sm font-medium truncate max-w-[180px] md:max-w-[260px]">
                                    {item.name}
                                  </span>
                                  <span className="text-xs text-muted-foreground truncate max-w-[220px]">
                                    {item.sku}
                                  </span>
                                  <span className="text-[11px] text-muted-foreground">
                                    คงเหลือ: {item.available} ชิ้น
                                  </span>
                                </div>
                              </AccordionTrigger>

                              <AccordionContent className="pt-2 space-y-1 text-xs text-muted-foreground">
                                <p>รหัสสินค้า: {item.sku}</p>
                                <p className="leading-5">
                                  รายละเอียด:{" "}
                                  {item.description
                                    ? item.description
                                    : "สินค้านี้ยังไม่มีรายละเอียด"}
                                </p>
                                <p>สินค้าคงเหลือ: {item.available} ชิ้น</p>
                                <p>
                                  พร้อมจำหน่าย: {item.availableForSale} ชิ้น
                                </p>
                                <p>ภาษีมูลค่าเพิ่ม: {item.vatPrice} %</p>
                                <p>ส่วนลด: {item.discountPrice} ฿</p>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>

                        <div className="flex flex-col items-end gap-1 min-w-[92px]">
                          <span className="font-semibold text-sm text-blue-600">
                            {item.salePrice} ฿
                          </span>
                          <Badge
                            variant="outline"
                            className={cn(
                              "px-2 py-0.5 text-[10px] rounded-full border-none",
                              isOut
                                ? "bg-gray-200 text-gray-700"
                                : "bg-green-100 text-green-700"
                            )}
                          >
                            {isOut ? (
                              <>
                                <span className="md:hidden">หมด</span>
                                <span className="hidden md:inline">
                                  สินค้าหมด
                                </span>
                              </>
                            ) : (
                              "สั่งซื้อได้"
                            )}
                          </Badge>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <li className="text-center py-6 text-sm text-muted-foreground">
                  ไม่พบสินค้าในรายการ
                </li>
              )}

              {previewUrl && (
                <div
                  className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
                  role="dialog"
                  aria-modal="true"
                  onClick={() => setPreviewUrl("")}
                >
                  <div
                    className="relative bg-transparent rounded-lg overflow-hidden w-full h-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-3 right-3 bg-white/95 rounded-full p-1.5 shadow"
                      onClick={() => setPreviewUrl("")}
                      aria-label="ปิด"
                    >
                      <Icons.X className="w-5 h-5" />
                    </button>
                    <GlobalImage
                      src={previewUrl}
                      alt="preview"
                      className="w-full h-full object-contain"
                      width={1600}
                      height={1000}
                    />
                  </div>
                </div>
              )}
            </ul>
          </ScrollArea>
        </div>

        {multiple && (
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              <X /> ปิด
            </Button>
            <Button onClick={handleDone}>ยืนยัน</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
