import React, { useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { type UseFormReturn } from "react-hook-form";
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
import { FileText, Tags } from "lucide-react";
import { statusOptions, unitOptions } from "~/initData/product-init-data";
import { FormTextRow } from "~/components/shared/formTextRow";
import { GlobalImage } from "~/components/shared/global-image";
import { GlobalStatusBadge } from "~/components/shared/global-status-tag";
import { Tooltip } from "~/components/ui/tooltip";

interface FormProductProps {
  form: UseFormReturn<ProductCreateDTO>;
  isEdit?: boolean;
  isCreate?: boolean;
  productData?: ProductCreateDTO;
}

export const TabDetail: React.FC<FormProductProps> = ({
  form,
  isEdit,
  isCreate,
  productData,
}) => {
  const { watch, setValue } = form;

  const salePrice = watch("salePrice");
  const costPrice = watch("costPrice");
  const quantity = watch("quantity");

  useEffect(() => {
    const priceValue = parseFloat(String(salePrice ?? "0"));
    const discountPriceValue = parseFloat(String(costPrice ?? "0"));

    const profitAmount = priceValue - discountPriceValue;
    const profitPercent =
      priceValue !== 0 ? (profitAmount / priceValue) * 100 : 0;

    setValue("profitAmount", profitAmount);
    setValue("profitPercent", profitPercent);
  }, [salePrice, costPrice, quantity, setValue]);
  return (
    <>
      <div className="p-3">
        <CardTitle className="text-base font-bold">สินค้า</CardTitle>

        {isEdit || isCreate ? (
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className="flex flex-col py-3">
                <FormLabel className="text-sm">การใช้งาน</FormLabel>
                <FormControl>
                  <div className="flex items-center flex-row gap-2 mt-1">
                    <label
                      htmlFor="switch-status"
                      className="text-sm text-gray-700 select-none dark:text-white"
                    >
                      ปิด
                    </label>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="switch-status"
                      className="scale-140 ml-3"
                    />
                    <label
                      htmlFor="switch-status"
                      className="text-sm text-gray-700 select-none ml-3 dark:text-white"
                    >
                      เปิด
                    </label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}

        <div className="grid grid-cols-3 gap-3 mt-4">
          {isEdit || isCreate ? (
            <>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <RequiredLabel required>ชื่อ</RequiredLabel>
                    <FormControl className="w-full">
                      <Input
                        placeholder="ชื่อ"
                        {...field}
                        className="shadow-none"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          ) : (
            <>
              <FormTextRow control={form.control} name="name" label="ชื่อ" />
            </>
          )}
        </div>

        {/* description */}
        <div className="grid grid-cols-1 gap-3 mt-6">
          {isEdit || isCreate ? (
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mt-1">
                  <FormLabel>คำอธิบาย</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="กรอกคำอธิบาย"
                      {...field}
                      className="shadow-none"
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormTextRow
              control={form.control}
              name="description"
              label="คำอธิบาย"
            />
          )}
        </div>

        {/* product image */}
        <div className="grid grid-cols-1 gap-3 mt-6">
          <span>ภาพสินค้า</span>

          {isEdit || isCreate ? (
            <>
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mt-2">ภาพหลัก</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value || ""}
                        onChange={field.onChange}
                        width={120}
                        height={120}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrls"
                render={({ field }) => {
                  const maxCount = 3;
                  const images = (field.value as string[] | undefined) ?? [];
                  const safeOnChange = (next: string[]) => {
                    field.onChange((next ?? []).slice(0, maxCount));
                  };
                  return (
                    <FormItem>
                      <FormLabel className="mt-2 gap-3">ภาพเพิ่มเติม</FormLabel>
                      <FormControl>
                        <ImageUploadMulti
                          value={images}
                          onChange={safeOnChange}
                          max={maxCount}
                          tileSize={100}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </>
          ) : (
            <div className="flex flex-row gap-2">
              <GlobalImage
                src={productData?.imageUrl || ""}
                width={140}
                height={140}
                className="rounded-xl object-contain object-center"
                fallbackSrc={`https://api.dicebear.com/9.x/initials/svg?seed=${
                  productData?.imageUrl || "default"
                }`}
              />
              {productData?.imageUrls?.map((url, idx) => (
                <GlobalImage
                  key={idx}
                  src={url}
                  width={140}
                  height={140}
                  className="rounded-xl object-contain object-center"
                  fallbackSrc={`https://api.dicebear.com/9.x/initials/svg?seed=${url}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* salePrice */}
      <div className="grid grid-cols-1 gap-3 p-3">
        <h1 className="text-md font-semibold mt-6">การกำหนดราคา</h1>
        <div className="flex flex-row gap-3 mt-6">
          {isEdit || isCreate ? (
            <>
              <FormField
                control={form.control}
                name="salePrice"
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel required>ราคา</RequiredLabel>
                    <FormControl className="shadow-none">
                      <Input type="number" placeholder="ราคา" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel required>ราคาเปรียบเทียบ</RequiredLabel>
                    <FormControl className="shadow-none">
                      <Input
                        type="number"
                        placeholder="ราคาเปรียบเทียบ"
                        {...field}
                      />
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
                name="salePrice"
                label="ราคา"
                type="number"
              />
              <FormTextRow
                control={form.control}
                name="quantity"
                label="ราคาเปรียบเทียบ"
                type="number"
              />
            </>
          )}
        </div>

        {/* costPrice */}
        <div className="grid grid-cols-3 gap-3 mt-4">
          {isEdit || isCreate ? (
            <>
              <FormField
                control={form.control}
                name="costPrice"
                render={({ field }) => (
                  <FormItem>
                    <RequiredLabel required>ต้นทุนต่อรายการ</RequiredLabel>
                    <FormControl className="shadow-none">
                      <Input type="number" placeholder="ต้นทุน" {...field} />
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
                      <Input type="number" {...field} disabled />
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
                name="costPrice"
                label="ต้นทุนต่อรายการ"
                type="number"
              />
              <FormTextRow
                control={form.control}
                name="profitAmount"
                label="กำไร"
                type="number"
              />
              <FormTextRow
                control={form.control}
                name="profitPercent"
                label="อัตรากำไร(%)"
              />
            </>
          )}
        </div>

        {/* availableForSale */}
        <div className="mt-6">
          <h1 className="text-md font-semibold">สินค้าคงคลัง</h1>
          {isEdit || isCreate ? (
            <FormField
              control={form.control}
              name="availableForSale"
              render={({ field }) => (
                <FormItem className="w-[120px] mt-2">
                  <FormLabel>จำนวน</FormLabel>
                  <FormControl className="shadow-none">
                    <Input type="number" placeholder="จำนวน" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : (
            <FormTextRow
              control={form.control}
              name="availableForSale"
              label="จำนวน"
            />
          )}
        </div>

        {/* delivery */}
        <div className="mt-6">
          <h1 className="text-md font-semibold">การจัดส่ง</h1>
          <div className="flex flex-row gap-3 mt-2">
            {isEdit || isCreate ? (
              <>
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem className="max-w-[120px]">
                      <FormLabel>น้ำหนัก</FormLabel>
                      <FormControl className="shadow-none">
                        <Input type="number" placeholder="น้ำหนัก" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>หน่วย</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full shadow-none">
                            <SelectValue
                              placeholder="เลือกหน่วย"
                              defaultValue="kilogram"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {unitOptions.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <>
                <FormTextRow
                  control={form.control}
                  name="weight"
                  label="น้ำหนัก"
                />
                <FormTextRow control={form.control} name="unit" label="หน่วย" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
