"use client";
import React, { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useForm, type Resolver } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import ImageUpload from "~/components/shared/image-upload";
import { ChevronDown } from "lucide-react";
import { GlobalImage } from "~/components/shared/global-image";
import {
  ProductCreateSchema,
  type ProductCreateDTO,
} from "~/schemas/product/product";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Switch } from "~/components/ui/switch";

type InkOption = { value: string; label: string; image: string };
const options: InkOption[] = [
  { value: "black", label: "สีดำ", image: "/pen-black.png" },
  { value: "blue", label: "สีน้ำเงิน", image: "/pen-blue.png" },
];

type ModalproduckProps = {
  open: boolean;
  onOpenChange: (o: boolean) => void;
  onConfirm?: (data: ProductCreateDTO & { ink: InkOption }) => void;
};

const unitOptions = [
  { value: "kilogram", label: "กิโลกรัม" },
  { value: "pound", label: "ปอนด์" },
  { value: "gram", label: "กรัม" },
  { value: "ounce", label: "ออนซ์" },
];

export const ModalProduct: React.FC<ModalproduckProps> = ({
  open,
  onOpenChange,
  onConfirm,
}) => {
  const [selected, setSelected] = useState<InkOption>(
    () =>
      options[0] ?? {
        value: "black",
        label: "สีดำ",
        image: "",
      }
  );

  const form = useForm<ProductCreateDTO>({
    resolver: zodResolver(ProductCreateSchema) as Resolver<ProductCreateDTO>,
  });

  const toTagsArray = (v: unknown): string[] => {
    if (Array.isArray(v)) return v.map(String).filter(Boolean);
    if (typeof v === "string")
      return v
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
    return [];
  };

  const toTagsCSV = (v: unknown): string => {
    if (Array.isArray(v)) return v.map(String).join(", ");
    if (typeof v === "string") return v;
    return "";
  };

  const imageUrl = form.watch("imageUrl");
  const name = form.watch("name");
  const active = form.watch("active") ?? true;
  const statusRaw: unknown = form.watch("status");
  const statusTags = useMemo(() => toTagsArray(statusRaw), [statusRaw]);
  const handleConfirm = () => {
    const data = form.getValues();
    onConfirm?.({ ...data, ink: selected });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className=" w-[95vw] sm:max-w-[720px]  md:max-w-[960px] lg:max-w-[1100px] xl:max-w-[1280px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ตั้งค่าตัวเลือกสินค้า</DialogTitle>
        </DialogHeader>

        <div className="flex w-full md:p-4 gap-8 p-8">
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            <div className="flex gap-4">
              <GlobalImage
                src={imageUrl || ""}
                alt={name || ""}
                className="w-[80px] h-[80px] rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-medium truncate">
                      {name || "ปากการักษ์โลก"}
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      ตัวเลือกสินค้า {options.length} รายการ
                    </div>
                  </div>
                  <Badge
                    className={
                      active
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-gray-700"
                    }
                  >
                    {active ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                  </Badge>
                </div>

                {statusTags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {statusTags.map((t: string) => (
                      <Badge key={t} variant="outline" className="text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="border-b border-gray-300 my-2" />
            <h1 className="text-md font-semibold">รายการบนเครื่องมือค้นหา</h1>
            <div className="w-64">
              <span className="block text-sm font-medium">สีหมึก</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center justify-between w-40"
                >
                  <div className="flex items-center space-x-2">
                    <span>{selected.label}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 ml-2 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40">
                {options.map((opt) => (
                  <DropdownMenuItem
                    key={opt.value}
                    onClick={() => setSelected(opt)}
                    className="flex items-center space-x-2"
                  >
                    <GlobalImage
                      src=""
                      alt="ปากกา"
                      className="w-[40px] h-[40px] rounded-lg object-cover mt-0.5"
                    />
                    <span>{opt.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="w-full md:w-2/3 flex flex-col gap-6">
            <h1 className="text-md font-semibold">ข้อมูลสินค้า</h1>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>ชื่อสินค้า</FormLabel>
                  <FormControl>
                    <Input placeholder="เช่น ปากการักษ์โลก" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>สถานะการใช้งาน</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-3">
                      <Switch
                        checked={!!field.value}
                        onCheckedChange={field.onChange}
                      />
                      <span className="text-sm text-muted-foreground">
                        {field.value ? "เปิดใช้งาน" : "ปิดใช้งาน"}
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>แท็ก (คั่นด้วย ,)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="เช่น รักษ์โลก, ของแจก, ปากกา"
                      value={toTagsCSV(field.value)}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h1 className="text-md font-semibold">ตัวเลือก</h1>
            <div>
              <span className="block text-sm font-medium">สีหมึก</span>
              <Input placeholder="เพิ่มสีหมึก" className="border" />
            </div>

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="mt-2">
                  <FormLabel>เพิ่มรูปภาพ</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h1 className="text-md font-semibold mt-4">การกำหนดราคา</h1>
            <div className="flex flex-row gap-3 mt-4">
              <div className="w-2/5">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ราคา</FormLabel>
                      <FormControl className="shadow-none">
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-3/5">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ราคาเปรียบเทียบ</FormLabel>
                      <FormControl className="shadow-none">
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              <FormField
                control={form.control}
                name="discountPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ต้นทุนต่อรายการ</FormLabel>
                    <FormControl className="shadow-none">
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profitAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>กำไร</FormLabel>
                    <FormControl className="shadow-none">
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="profitPercent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>อัตรากำไร(%)</FormLabel>
                    <FormControl className="shadow-none">
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-row gap-3 mt-6">
              <div className="w-2/4">
                <FormField
                  control={form.control}
                  name="vatPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ภาษี (Vat)</FormLabel>
                      <FormControl className="shadow-none">
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-2/4">
                <FormField
                  control={form.control}
                  name="priceDisplayType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ประเภทของการแสดงราคา</FormLabel>
                      <FormControl className="shadow-none">
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <h1 className="text-md font-semibold mt-6">สินค้าคงคลัง</h1>
            <div className="flex flex-row gap-3 mt-6">
              <div className="w-[120px]">
                <FormField
                  control={form.control}
                  name="stockQty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>จำนวน</FormLabel>
                      <FormControl className="shadow-none">
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <h1 className="text-md font-semibold mt-6">การจัดส่ง</h1>
            <div className="flex flex-row gap-3 mt-6">
              <div className="max-w-[120px]">
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>น้ำหนัก</FormLabel>
                      <FormControl className="shadow-none">
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem className="flex-1 mt-[14px]">
                      <FormLabel></FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full shadow-none">
                            <SelectValue
                              placeholder=""
                              defaultValue="kilogram"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {unitOptions.map((item) => {
                            return (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            ยกเลิก
          </Button>
          <Button onClick={handleConfirm}>ยืนยัน</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
