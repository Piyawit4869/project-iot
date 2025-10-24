import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { useFieldArray, type UseFormReturn } from "react-hook-form";
import { Card, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
// import { CardSelectorItems } from "@/components/shared/card-selector-items";
// import { Inventory } from "@/apis/data/inventory/InventorySchema";

// import ImageUpload from "@/components/shared/image-upload";

// import { Material } from "@/apis/data/material/MaterialSchema";
// import { Attribute } from "@/apis/data/attribute/AttributeSchema";
// import { Selection } from "@/apis/data/selection/SelectionSchema";

import { useState } from "react";

import { RequiredLabel } from "~/components/shared/required-design";

import { useNavigate } from "react-router";
import { Switch } from "~/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "~/components/ui/button";
import type { ProductCreateDTO } from "~/schemas/product/product";
import { InputTags } from "~/components/shared/input-tags";
import {
  useCategories,
  useCreateCategory,
} from "~/api/client/categories/useCategoryQuery";
import ImageUploadMulti from "~/components/shared/image-upload-multi";
import type {
  Category,
  CategoryCreateDTO,
} from "~/schemas/product/detail/CategorySchema";
import ImageUpload from "~/components/shared/image-upload";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  Calculator,
  CircleFadingPlus,
  FileText,
  Tags,
  Trash2,
} from "lucide-react";
import { FormTextRow } from "~/components/shared/formTextRow";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

const statusOptions = [
  { value: "active", label: "สินค้าที่เปิดขาย" },
  { value: "inactive", label: "สินค้าที่ไม่เปิดขาย" },
  { value: "out_of_season", label: "สินค้าที่อยู่นอกฤดูกาล" },
  { value: "discontinued", label: "สินค้าที่หยุดผลิตหรือขาย" },
  { value: "coming_soon", label: "สินค้าที่จะวางจำหน่ายในอนาคต" },
];

interface FormProductProps {
  form: UseFormReturn<ProductCreateDTO>;
  isEdit?: boolean;
  productData?: ProductCreateDTO;
  isCreate?: boolean;
}

export const TabPrice: React.FC<FormProductProps> = ({
  form,
  isEdit,
  productData,
  isCreate,
}) => {
  // const [openOpt, setOpenOpt] = React.useState(false);
  // const handleConfirmOption = (data: any) => {
  // };

  const { watch, setValue } = form;

  const salePrice = watch("customPrice.price");
  const costPrice = watch("customPrice.costPrice");
  const quantity = watch("customPrice.quantity");

  useEffect(() => {
    const priceValue = parseFloat(String(salePrice ?? "0"));
    const discountPriceValue = parseFloat(String(costPrice ?? "0"));

    const profitAmount = priceValue - discountPriceValue;
    const profitPercent =
      priceValue !== 0 ? (profitAmount / priceValue) * 100 : 0;

    setValue("customPrice.profitAmount", profitAmount);
    setValue("customPrice.profitPercent", profitPercent);
  }, [salePrice, costPrice, quantity, setValue]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "discountPromotion",
  });

  return (
    <>
      <div className="p-3">
        <CardTitle className="text-base font-bold">การกำหนดราคา</CardTitle>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {isEdit ?? isCreate ? (
            <>
              <FormField
                control={form.control}
                name="customPrice.price"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <RequiredLabel>ราคา</RequiredLabel>
                    <FormControl className="w-full">
                      <Input placeholder="ราคา" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customPrice.quantity"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <RequiredLabel required>ราคาเปรียบเทียบ</RequiredLabel>
                    <FormControl>
                      <Input placeholder="ราคา" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
              <FormTextRow
                control={form.control}
                name="customPrice.price"
                label="ราคา"
              />
              <FormTextRow
                control={form.control}
                name="customPrice.quantity"
                label="ราคาเปรียบเทียบ"
              />
            </>
          )}
        </div>

        <div className="grid grid-cols-4 gap-3 mt-4">
          {isEdit ?? isCreate ? (
            <>
              <FormField
                control={form.control}
                name="customPrice.costPrice"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <RequiredLabel>ต้นทุนต่อรายการ</RequiredLabel>
                    <FormControl>
                      <Input placeholder="ราคา" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customPrice.vat"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <RequiredLabel>ภาษี</RequiredLabel>
                    <FormControl>
                      <Input placeholder="ราคา" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customPrice.profitAmount"
                render={({ field }) => (
                  <FormItem className="mt-1">
                    <FormLabel>กำไร</FormLabel>
                    <FormControl className="shadow-none">
                      <Input type="number" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customPrice.profitPercent"
                render={({ field }) => (
                  <FormItem className="mt-1">
                    <FormLabel>อัตรากำไร(%)</FormLabel>
                    <FormControl className="shadow-none">
                      <Input type="number" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
              <FormTextRow
                control={form.control}
                name="customPrice.costPrice"
                label="ต้นทุนต่อรายการ"
              />
              <FormTextRow
                control={form.control}
                name="customPrice.vat"
                label="ภาษี"
              />
              <FormTextRow
                control={form.control}
                name="customPrice.profitAmount"
                label="กำไร"
              />
              <FormTextRow
                control={form.control}
                name="customPrice.profitPercent"
                label="อัตรากำไร(%)"
              />
            </>
          )}
        </div>
      </div>

      <div className="p-3">
        <CardTitle className="text-base font-bold mb-2">ส่วนลด</CardTitle>

        <div className="flex flex-col gap-3">
          {fields.length > 0
            ? fields.map((fieldItem, index) => (
                <div
                  key={fieldItem.id}
                  className="flex flex-row gap-3 items-center"
                >
                  {isEdit ?? isCreate ? (
                    <>
                      <FormField
                        control={form.control}
                        name={`discountPromotion.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem className="mt-1 w-full">
                            <FormLabel>จำนวน</FormLabel>
                            <FormControl className="shadow-none">
                              <Input
                                type="number"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`discountPromotion.${index}.discount`}
                        render={({ field }) => (
                          <FormItem className="mt-1 w-full">
                            <FormLabel>ส่วนลด</FormLabel>
                            <FormControl className="shadow-none">
                              <Input
                                type="number"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Trash2
                        onClick={() => remove(index)}
                        className="h-10 w-10 mt-5 ml-2"
                      />
                    </>
                  ) : (
                    <>
                      <FormTextRow
                        control={form.control}
                        name={`discountPromotion.${index}.quantity`}
                        label="จำนวน"
                      />

                      <span className="mt-1 text-gray-500">
                        {form.getValues(
                          `discountPromotion.${index}.discount`
                        ) ?? "ไม่มีส่วนลด"}
                      </span>
                    </>
                  )}
                </div>
              ))
            : !isEdit && (
                <span className="text-gray-500">
                  สินค้ารายการนี้ไม่มีส่วนลด
                </span>
              )}

          <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <Button className="w-50" variant="secondary">
            <Calculator /> คำนวณส่วนลด
          </Button>

          {isEdit && (
            <Button
              type="button"
              className="w-50 bg-white hover:bg-gray-200 border text-black flex items-center justify-center gap-2"
              onClick={() => append({ quantity: 0, discount: 0 })}
            >
              <CircleFadingPlus /> เพิ่มจำนวนส่วนลดสินค้า
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
