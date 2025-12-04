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
import PlaceholderImage from "/assets/images/placeholder.webp";

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
  items?: Item[];
  selected: string[];
  onChange: (selectedIds: string[]) => void;
  multiple?: boolean;
  isLoading?: boolean;
}

export const SelectorItemsModal: React.FC<SelectorItemsModalProps> = ({
  label = "เลือกสินค้า",
  selected,
  onChange,
  multiple = true,
  isLoading,
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

  const { data: products, isLoading: isFetching } = usePaginate({
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
        <Button
          variant="outline"
          className="w-full"
          disabled={isLoading || isFetching}
        >
          {isLoading || isFetching ? (
            <>
              <Hourglass className="mr-2 h-4 w-4" />
              กำลังโหลดรายการสินค้า
            </>
          ) : (
            <>
              <Package className="mr-2 h-4 w-4" /> เลือกสินค้า
            </>
          )}
        </Button>
      </DialogTrigger>

      <DialogContent className="flex flex-col md:min-w-[90vh] md:min-h-[70vh] md:max-h-[80vh] overflow-auto p-6 rounded-lg sm:max-w-lg">
        <DialogHeader className="gap-3">
          <DialogTitle>{label}</DialogTitle>
          <span className="text-sm text-gray-400">
            ผู้ใช้สามารถกด “รายละเอียดเพิ่มเติม” เพื่อดูข้อมูลสินค้า
          </span>
          <Input
            placeholder="ค้นหาด้วยชื่อ"
            value={search}
            className="w-[30%]"
            onChange={(e) => setSearch(e.target.value)}
          />
        </DialogHeader>

        <ScrollArea className="h-80 md:min-h-100 rounded-md border p-3 bg-white space-y-2">
          {products?.items && products.items.length > 0 ? (
            products.items.map((item: any) => {
              const isOut =
                Number(item.available) === 0 ||
                Number(item.availableForSale) === 0;

              return (
                <Accordion
                  key={item.id}
                  type="single"
                  collapsible
                  className="w-full"
                >
                  <AccordionItem
                    value={`item-${item.id}`}
                    className="border-none"
                  >
                    <div
                      className={cn(
                        "flex items-center justify-between gap-4 rounded-xl p-3 hover:bg-muted/60 transition-colors"
                      )}
                    >
                      <div className="flex items-center gap-3 md:gap-6">
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => toggleItem(item.id ?? "")}
                          // disabled={isOut}
                          className={cn(
                            "w-5 h-5 rounded-md border-2",
                            "data-[state=checked]:bg-black data-[state=checked]:border-black",
                            "data-[state=unchecked]:border-gray-300",
                            "hover:border-gray-800 hover:bg-gray-50",
                            "disabled:opacity-50 disabled:cursor-not-allowed"
                          )}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setPreviewUrl(
                              item.imageUrl ||
                                (PlaceholderImage as unknown as string)
                            )
                          }
                          className="group"
                          aria-label="ดูรูปตัวอย่าง"
                        >
                          <img
                            src={item.imageUrl || PlaceholderImage}
                            alt={item.name}
                            className="w-[48px] h-[48px] md:w-[70px] md:h-[70px] rounded-lg object-cover border"
                          />
                        </button>

                        <div className="flex flex-col text-left gap-1">
                          <span className="text-base font-medium truncate max-w-[200px] md:max-w-[280px]">
                            {item.name}
                          </span>
                          <span className="text-sm text-muted-foreground truncate max-w-[220px]">
                            {item.sku}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              คงเหลือ: {item.available} ชิ้น
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
                      </div>

                      <div className="min-w-[92px] text-right">
                        <span className="font-semibold text-sm text-blue-600">
                          {item.salePrice} ฿
                        </span>
                      </div>
                    </div>

                    <AccordionTrigger className="px-0 pt-1 text-sm w-fit group hover:no-underline">
                      <span className="inline-flex items-center gap-1">
                        รายละเอียดเพิ่มเติม
                      </span>
                    </AccordionTrigger>

                    <AccordionContent className="pt-2 pb-3 space-y-1 text-sm text-muted-foreground border-t mt-2">
                      <p>รายละเอียดเพิ่มเติมเกี่ยวกับ {item.name}</p>
                      <p>รหัสสินค้า: {item.sku}</p>
                      <p className="leading-5">
                        รายละเอียด:{" "}
                        {item.description
                          ? item.description
                          : "สินค้านี้ยังไม่มีรายละเอียด"}
                      </p>
                      <p>
                        พร้อมจำหน่าย: {item.availableForSale ?? item.available}{" "}
                        ชิ้น
                      </p>
                      <p>ภาษีมูลค่าเพิ่ม: {item.vatPrice} %</p>
                      <p>ส่วนลด: {item.discountPrice} ฿</p>
                      <p>
                        โน้ตเพิ่มเติม:{" "}
                        {item.note ?? "สินค้านี้ยังไม่มีข้อมูลเพิ่มเติม"}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              );
            })
          ) : (
            <p className="text-center py-6 text-sm text-muted-foreground">
              ไม่พบสินค้าในรายการ
            </p>
          )}
        </ScrollArea>

        {multiple && (
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              <X className="mr-2 h-4 w-4" /> ปิด
            </Button>
            <Button onClick={handleDone}>ยืนยัน</Button>
          </DialogFooter>
        )}
      </DialogContent>

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
            <img
              src={previewUrl}
              alt="preview"
              className="w-auto h-[90vh] object-contain rounded-lg"
              width={1000}
              height={600}
            />
          </div>
        </div>
      )}
    </Dialog>
  );
};
