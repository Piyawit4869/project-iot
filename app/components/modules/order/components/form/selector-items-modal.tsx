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
          <ScrollArea className="h-80 md:min-h-100 rounded-md border p-1">
            <ul className="space-y-2">
              {products?.items && products.items.length > 0 ? (
                <ul>
                  {products.items.map((item: any) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-4 hover:bg-muted rounded-md"
                    >
                      <div className="flex justify-between gap-2 cursor-pointer w-full">
                        <div className="flex flex-row items-center gap-3 md:gap-6">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => toggleItem(item.id ?? "")}
                            disabled={
                              item.available === 0 ||
                              item.availableForSale === 0
                            }
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
                            className="w-[45px] h-[45px] md:w-[70px] md:h-[70px] rounded-lg object-cover"
                          />

                          {/* detail product */}
                          <Accordion
                            type="single"
                            collapsible
                            className="w-full "
                          >
                            <AccordionItem value="item-1">
                              <AccordionTrigger>{item.name}</AccordionTrigger>
                              <AccordionContent className="flex flex-col gap-1 text-balance">
                                <h2 className="text-sm font-light text-gray-400">
                                  รหัสสินค้า: {item.sku}
                                </h2>
                                <h2 className="text-sm font-light text-gray-400">
                                  รายละเอียด:{" "}
                                  <span className="md:hidden">
                                    {" "}
                                    {item.description || "ไม่มีรายละเอียด"}
                                  </span>
                                  <span className="hidden md:inline">
                                    {item.description ||
                                      "สินค้านี้ยังไม่มีรายละเอียด"}
                                  </span>
                                </h2>
                                <h2 className="text-sm font-light text-gray-400">
                                  สินค้าคงเหลือ : {item.available} ชิ้น
                                </h2>
                                <h2 className="text-sm font-light text-gray-400">
                                  สินค้าพร้อมจำหน่าย : {item.availableForSale}{" "}
                                  ชิ้น
                                </h2>
                                <h2 className="text-sm font-light text-gray-400">
                                  ภาษีมูลค่าเพิ่ม : {item.vatPrice} %
                                </h2>
                                <h2 className="text-sm font-light text-gray-400">
                                  ส่วนลด : {item.discountPrice} ฿
                                </h2>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </div>

                        <div className="flex flex-col items-end">
                          <span className="font-semibold text-sm text-blue-600">
                            {item.salePrice} ฿
                          </span>
                          <Badge
                            variant="outline"
                            className={cn(
                              "px-2 py-0 text-[10px] rounded-full",
                              item.available === 0 ||
                                item.availableForSale === 0
                                ? "bg-gray-500 text-white font-bold pt-1"
                                : "bg-green-600 text-white font-bold pt-1"
                            )}
                          >
                            {item.available === 0 ||
                            item.availableForSale === 0 ? (
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
                  ))}
                </ul>
              ) : (
                <div className="text-center py-4 text-gray-500"></div>
              )}

              {previewUrl && (
                <div
                  className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 h-full"
                  role="dialog"
                  aria-modal="true"
                  onClick={() => setPreviewUrl("")}
                >
                  <div
                    className="relative bg-transparent rounded-lg overflow-hidden w-full h-full"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      className="absolute top-2 right-2 bg-white/90 rounded-full p-1"
                      onClick={() => setPreviewUrl("")}
                      aria-label="ปิด"
                    >
                      <Icons.X className="w-5 h-5" />
                    </button>
                    <GlobalImage
                      src={previewUrl}
                      alt="preview"
                      className="w-full h-full object-contain"
                      width={1200}
                      height={800}
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
