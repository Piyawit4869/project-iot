"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

import ImageUploadMulti from "~/components/shared/image-upload-multi";

import { useForm, type Resolver } from "react-hook-form";
import { TabControl } from "~/components/shared/tab-control";
import GlobalButton from "~/components/shared/global-button";
import { PlusIcon } from "lucide-react";

import {
  ProductCreateSchema,
  type ProductCreateDTO,
} from "~/schemas/product/product";
import type { ProductOption, ProductVariant } from "../products/option-editor";
import OptionEditor from "../products/option-editor";
import { InputTags } from "~/components/shared/input-tags";
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
import { ModalProduct } from "../products/modal-product";
const statusOptions = [
  { value: "available", label: "พร้อมจำหน่าย" },
  { value: "out_of_stock", label: "หมดสต็อก" },
  { value: "discontinued", label: "เลิกผลิต" },
];

export const Createproduct = () => {
  const [values, setValues] = useState<string[]>([]);

  const form = useForm<ProductCreateDTO>({
    resolver: zodResolver(ProductCreateSchema) as Resolver<ProductCreateDTO>,
  });

  const matTypeOptions = [
    { value: "material", label: "วัสดุ" },
    { value: "non_material", label: "ไม่ใช่วัสดุ" },
  ];

  const [optionsState, setOptionsState] = React.useState<ProductOption[]>([]);
  const [variantsState, setVariantsState] = React.useState<ProductVariant[]>(
    []
  );

  function handleOptionsChange(opts: ProductOption[]) {
    setOptionsState(opts);
  }

  function handleVariantsChange(vars: ProductVariant[]) {
    setVariantsState(vars);
  }

  const unitOptions = [
    { value: "kilogram", label: "กิโลกรัม" },
    { value: "pound", label: "ปอนด์" },
    { value: "gram", label: "กรัม" },
    { value: "ounce", label: "ออนซ์" },
  ];
  const onSubmit = (data: ProductCreateDTO) => {
    console.debug("Form Data:", data);
  };

  const [openOpt, setOpenOpt] = React.useState(false);
  const handleConfirmOption = (data: any) => {
    console.debug("confirmed option:", data);
  };

  return (
    <>
      <div className="flex-1 flex-col space-y-3 p-8 md:flex">
        <TabControl
          title="สร้างสินค้า"
          backpath="/inventory/create"
          buttons={[
            <GlobalButton
              label="สร้าง"
              key={"create button"}
              type="submit"
              form="inventory"
            />,
            <GlobalButton
              label="ยกเลิก"
              variant="outline"
              key={"delete button"}
              // onClick={}
            />,
          ]}
        />
        <Form {...form}>
          <form id="products" onSubmit={form.handleSubmit(onSubmit)}>
            <Card className="flex flex-row my-2">
              <div className="w-full md:w-3/4 gap-4 border-r-1">
                <div className="p-6 mb-4">
                  <div className="flex flex-1 justify-between items-center">
                    <h1 className="text-md font-semibold">สินค้า</h1>
                    <FormField
                      control={form.control}
                      name="active"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-end">
                          <FormLabel>การใช้งาน</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>ชื่อ</FormLabel>
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
                    <FormField
                      control={form.control}
                      name="sku"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>รหัสสินค้า</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="รหัสสินค้า"
                              {...field}
                              className="shadow-none"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel>สถานะ</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full shadow-none">
                                <SelectValue
                                  placeholder="เลือกสถานะ"
                                  defaultValue="available"
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="w-full">
                              {statusOptions.map((item) => {
                                return (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
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

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem className="mt-3">
                        <FormLabel>คำอธิบาย</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="กรอกคำอธิบาย"
                            {...field}
                            className="shadow-none  "
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <h1 className="mt-4">ภาพสินค้า</h1>
                  <FormField
                    control={form.control}
                    name="imageUrls"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormControl className="w-full">
                          {/* <ImageUpload
                        value={field.value}
                        onChange={field.onChange}
                        width={180}
                        height={180}
                      /> */}

                          <ImageUploadMulti
                            value={field.value ?? []}
                            onChange={field.onChange}
                            max={3}
                            tileSize={112}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <h1 className="text-md font-semibold mt-6">การกำหนดราคา</h1>
                  <div className="flex flex-row gap-3 mt-6">
                    <div className="w-2/5">
                      <FormField
                        control={form.control}
                        name="salePrice"
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
                      name="costPrice"
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
                      name="vatPrice"
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
                      name="vatPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>อัตรากำไร(%)</FormLabel>
                          <FormControl className="shadow-none">
                            <Input
                              placeholder="ตัวอย่าง 25"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <h1 className="text-md font-semibold mt-6">สินค้าคงคลัง</h1>
                  <div className="flex flex-row gap-3 mt-6">
                    <div className="w-[120px]">
                      <FormField
                        control={form.control}
                        name="price"
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
                        name="price"
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
                                    <SelectItem
                                      key={item.value}
                                      value={item.value}
                                    >
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

                  <div className="flex justify-between">
                    <h1 className="text-md font-semibold mt-6 mb-6">
                      ตัวเลือกสินค้า
                    </h1>
                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2 w-full md:w-auto"
                      onClick={() => setOpenOpt(true)}
                    >
                      <PlusIcon className="mr-2" />
                      เพิ่มตัวเลือกสินค้า
                    </Button>
                  </div>

                  <div className="text-xs text-muted-foreground mt-1">
                    ตัวเลือก {optionsState.length} แบบ • รุ่นย่อย{" "}
                    {variantsState.length} รายการ
                  </div>

                  {/* Modal */}
                  <ModalProduct
                    open={openOpt}
                    onOpenChange={setOpenOpt}
                    onConfirm={handleConfirmOption}
                  />

                  <OptionEditor
                    form={form}
                    onChange={handleOptionsChange}
                    onVariantsChange={handleVariantsChange}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/4 mt-0 p-4">
                <h1 className="text-md font-semibold mb-8 mt-6">
                  การจัดระเบียบสินค้า
                </h1>
                <FormField
                  control={form.control}
                  name="matType"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>ประเภท</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl className="w-full shadow-none">
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกประเภท" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {matTypeOptions.map((item) => {
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

                <h1 className="text-sm font-semibold mb-2 mt-6">แท็กสินค้า</h1>
                <InputTags
                  value={values}
                  onChange={setValues}
                  placeholder="กรอกแท็ก"
                  className="max-w-[500px]"
                />

                <h3 className="text-xs text-gray-400 p-1 flex pt-4">
                  กด Enter หรือพิมพ์คั่นด้วย comma(,) เพื่อเพิ่มแท็ก
                </h3>
              </div>
            </Card>
          </form>
        </Form>
      </div>
    </>
  );
};
