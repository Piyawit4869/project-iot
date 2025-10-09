import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { UseFormReturn } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ProductCreateDTO } from "@/schemas/products/product";
// import { CardSelectorItems } from "@/components/shared/card-selector-items";
import { Inventory } from "@/apis/data/inventory/InventorySchema";
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Switch,
  Textarea,
} from "@/components/ui";
import type { ProductOption, ProductVariant } from "./option-editor";
// import ImageUpload from "@/components/shared/image-upload";
import { Category } from "@/apis/data/category/CategorySchema";
import { Material } from "@/apis/data/material/MaterialSchema";
import { Attribute } from "@/apis/data/attribute/AttributeSchema";
import { Selection } from "@/apis/data/selection/SelectionSchema";

import { useState } from "react";
import { InputTags } from "@/components/ui/input-tags";
import ImageUploadMulti from "@/components/shared/image-upload-multi";
import OptionEditor from "./option-editor";
import { PlusIcon } from "lucide-react";
import { Modalproduck } from "./modal-product";

const statusOptions = [
  { value: "available", label: "พร้อมจำหน่าย" },
  { value: "out_of_stock", label: "หมดสต็อก" },
  { value: "discontinued", label: "เลิกผลิต" },
];

const matTypeOptions = [
  { value: "material", label: "วัสดุ" },
  { value: "non_material", label: "ไม่ใช่วัสดุ" },
];

const unitOptions = [
  { value: "kilogram", label: "กิโลกรัม" },
  { value: "pound", label: "ปอนด์" },
  { value: "gram", label: "กรัม" },
  { value: "ounce", label: "ออนซ์" },
];

const category = [
  { value: "pen", label: "ปากกา" },
  { value: "fan", label: "พัดลม" },
  { value: "bag", label: "กระเป๋า" },
  { value: "tumbler", label: "แก้วเก็บความเย็น" },
  { value: "coaster", label: "ที่รองแก้ว" },
];

interface FormProductProps {
  form: UseFormReturn<ProductCreateDTO>;
  inventories: Inventory[];
  categories: Category[];
  materials: Material[];
  attributes: Attribute[];
  selections: Selection[];
  inventoriesSelected: Inventory[];
  selectedInventoryIds: string[];
  onSubmit: (values: ProductCreateDTO) => void;
  handleChangeInventory: (inventoryIds: string[]) => void;
  selectedCategoryIds: string[];
  categoriesSelected: Category[];
  handleChangeCategory: (categoryIds: string[]) => void;
  handleChangeMaterial: (materialIds: string[]) => void;
  handleChangeAttribute: (attributeIds: string[]) => void;
  handleChangeSelection: (selectionIds: string[]) => void;
  selectedMaterialIds: string[];
  materialsSelected: Material[];
  selectedAttributeIds: string[];
  attributesSelected: Attribute[];
  selectedSelectionIds: string[];
  selectionsSelected: Selection[];
}

export const FormProduct: React.FC<FormProductProps> = ({ form, onSubmit }) => {
  const [values, setValues] = useState<string[]>([]);
  const [openOpt, setOpenOpt] = React.useState(false);

  const handleConfirmOption = (data: any) => {
    console.debug("confirmed option:", data);
  };

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

  return (
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
                        className="shadow-none"
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

              <div>
                <FormField
                  control={form.control}
                  name="productCategory"
                  render={({ field }) => (
                    <FormItem className="flex-1 mt-[14px]">
                      <FormLabel>หมวดหมู่</FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full shadow-none">
                            <SelectValue
                              placeholder="เลือกหมวดหมู่"
                              defaultValue="pen"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {category.map((item) => {
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

              <Modalproduck
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
            {/* <h1 className="text-md font-semibold mb-8 mt-4">จัดการ การค้นหา</h1>
            <FormField
              control={form.control}
              name="namePage"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>ชื่อหน้าเพจ</FormLabel>
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
              name="shortDescription"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>คำอธิบายโดยย่อ</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="กรอกคำอธิบาย"
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
              name="urlPath"
              render={({ field }) => (
                <FormItem className="mt-5">
                  <FormLabel>จัดการ URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="product/..."
                      {...field}
                      className="shadow-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h3 className="text-xs text-gray-400 p-1">
              https://example.com/product/...
            </h3>
            <hr className="my-6" />
            <FormField
              control={form.control}
              name="publishStatus"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>การเผยแพร่</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full shadow-none">
                        <SelectValue
                          placeholder="เลือกช่องทางการเผยแพร่"
                          defaultValue="available"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="w-full">
                      {statusOptions.map((item) => {
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
            /> */}
            <h1 className="text-md font-semibold mb-8 mt-6">
              การจัดระเบียบสินค้า
            </h1>
            <FormField
              control={form.control}
              name="matType"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>ประเภท</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
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

            <h3 className="text-xs text-gray-400 p-1">
              กด Enter หรือพิมพ์คั่นด้วย comma(,) เพื่อเพิ่มแท็ก
            </h3>
          </div>
        </Card>
      </form>
    </Form>
  );
};
