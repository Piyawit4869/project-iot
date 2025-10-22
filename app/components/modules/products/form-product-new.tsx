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
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
// import { CardSelectorItems } from "@/components/shared/card-selector-items";
// import { Inventory } from "@/apis/data/inventory/InventorySchema";

// import ImageUpload from "@/components/shared/image-upload";

// import { Material } from "@/apis/data/material/MaterialSchema";
// import { Attribute } from "@/apis/data/attribute/AttributeSchema";
// import { Selection } from "@/apis/data/selection/SelectionSchema";

import { useState } from "react";

import OptionEditor, {
  type ProductOption,
  type ProductVariant,
} from "./option-editor";
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

const statusOptions = [
  { value: "active", label: "สินค้าที่เปิดขาย" },
  { value: "inactive", label: "สินค้าที่ไม่เปิดขาย" },
  { value: "out_of_season", label: "สินค้าที่อยู่นอกฤดูกาล" },
  { value: "discontinued", label: "สินค้าที่หยุดผลิตหรือขาย" },
  { value: "coming_soon", label: "สินค้าที่จะวางจำหน่ายในอนาคต" },
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

interface FormProductProps {
  form: UseFormReturn<ProductCreateDTO>;
  // inventories: Inventory[];
  categories: Category[];
  // materials: Material[];
  // attributes: Attribute[];
  // attributesSelected: Attribute[];
  // materialsSelected: Material[];

  // selections: Selection[];
  // inventoriesSelected: Inventory[];
  selectedInventoryIds: string[];
  onSubmit: (values: ProductCreateDTO) => void;
  handleChangeInventory: (inventoryIds: string[]) => void;
  selectedCategoryIds: string[];
  categoriesSelected: Category[];
  handleChangeCategory: (categoryIds: string[]) => void;
  // handleChangeMaterial: (materialIds: string[]) => void;
  // handleChangeAttribute: (attributeIds: string[]) => void;
  // handleChangeSelection: (selectionIds: string[]) => void;
  // selectedMaterialIds: string[];
  // selectedAttributeIds: string[];
  // selectedSelectionIds: string[];
  // selectionsSelected: Selection[];
}

export const FormProductNew: React.FC<FormProductProps> = ({
  form,
  onSubmit,
}) => {
  const navigate = useNavigate();
  const [values, setValues] = useState<string[]>([]);
  // const [openOpt, setOpenOpt] = React.useState(false);
  // const handleConfirmOption = (data: any) => {
  // };

  const { data } = useCategories();
  const categories = Array.isArray(data?.res)
    ? data.res
    : Array.isArray(data)
    ? data
    : [];

  const { mutate } = useCreateCategory();
  const [isEdit, setIsEdit] = React.useState(false);

  const [newCategory, setNewCategory] = useState("");

  const [optionsState, setOptionsState] = useState<ProductOption[]>([]);
  const [variantsState, setVariantsState] = useState<ProductVariant[]>([]);

  // const handleCreateFromEditor = async ({
  //   options,
  //   variants,
  // }: {
  //   options: ProductOption[];
  //   variants: ProductVariant[];
  // }) => {
  //   setOptionsState(options);
  //   setVariantsState(variants);
  // };

  const handleCancel = () => {
    if (categories) form.reset(form.getValues(), { keepDirty: false });
    setIsEdit(false);
  };

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

  const [showOptionEditor, setShowOptionEditor] = useState(false);

  const handleToggleOptionEditor = () => {
    setShowOptionEditor((prev) => !prev);
  };

  const handleClearOptionEditor = () => {
    setShowOptionEditor(false);
  };

  const create = (values: CategoryCreateDTO) => {
    mutate(values, {
      onSuccess: ({ res }) => {
        navigate(`/category/${res.id}`);
      },
      onError: () => {},
    });
  };
  return (
    <>
      <Form {...form}>
        <form id="products" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-[70%_29%] gap-4">
            <Card className="p-4 space-y-3">
              <div className="flex-1 p-6 mb-4">
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
                <div className="grid grid-cols-3 gap-3 mt-4">
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
                  <FormField
                    control={form.control}
                    name="sku"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <RequiredLabel required>รหัสสินค้า</RequiredLabel>
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
                      <FormItem className="flex-1 mt-1">
                        <FormLabel>สถานะ</FormLabel>
                        <Select
                          value={field.value || "active"}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full shadow-none">
                              <SelectValue placeholder="เลือกสถานะ" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="w-full">
                            {statusOptions.map((item) => (
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
                      <FormItem className="mt-4">
                        <FormLabel className="m-0">ภาพสินค้า</FormLabel>
                        <FormControl className="w-full">
                          <ImageUploadMulti
                            value={images}
                            onChange={safeOnChange}
                            max={maxCount}
                            tileSize={112}
                          />
                        </FormControl>

                        <div className="text-xs text-muted-foreground mt-1">
                          {`${images.length}/${maxCount} ตัวเลือก`}
                        </div>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <div>
                  <h1 className="text-md font-semibold mt-6">การกำหนดราคา</h1>
                  <div className="flex flex-row gap-3 mt-6">
                    <div className="w-2/5">
                      <FormField
                        control={form.control}
                        name="salePrice"
                        render={({ field }) => (
                          <FormItem>
                            <RequiredLabel required>ราคา</RequiredLabel>
                            <FormControl className="shadow-none">
                              <Input
                                type="number"
                                placeholder="ราคา"
                                value={field.value ?? ""}
                                onChange={(e) => {
                                  const v = e.target.value;
                                  field.onChange(
                                    v === "" ? undefined : Number(v)
                                  );
                                }}
                              />
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
                            <RequiredLabel required>
                              ราคาเปรียบเทียบ
                            </RequiredLabel>
                            <FormControl className="shadow-none">
                              <Input
                                placeholder="ราคาเปรียบเทียบ"
                                type="number"
                                {...field}
                              />
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
                          <RequiredLabel required>
                            ต้นทุนต่อรายการ
                          </RequiredLabel>
                          <FormControl className="shadow-none">
                            <Input
                              placeholder="ต้นทุน"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="profitAmount"
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
                      name="profitPercent"
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
                  </div>
                </div>
                <div>
                  <h1 className="text-md font-semibold mt-6">สินค้าคงคลัง</h1>
                  <div className="flex flex-row gap-3 mt-6">
                    <div className="w-[120px]">
                      <FormField
                        control={form.control}
                        name="availableForSale"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>จำนวน</FormLabel>
                            <FormControl className="shadow-none">
                              <Input
                                placeholder="จำนวน"
                                type="number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div>
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
                              <Input
                                placeholder="น้ำหนัก"
                                type="number"
                                {...field}
                              />
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
                          <FormItem>
                            <FormLabel>หน่วย</FormLabel>
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
                                {unitOptions.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
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
            </Card>

            <Card className="p-4 space-y-3">
              <div>
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
                        value={field.value || "non_material"}
                        onValueChange={field.onChange}
                      >
                        <FormControl className="w-full shadow-none">
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกประเภท" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-full">
                          {matTypeOptions?.map((item) => (
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
                <div className="flex flex-row gap-3 mt-6 w-[100%]">
                  <FormField
                    control={form.control}
                    name="productCategory"
                    render={({ field }) => (
                      <FormItem className="flex-1 mt-[14px] relative">
                        <FormLabel>หมวดหมู่</FormLabel>
                        <Select
                          value={field.value || ""}
                          onValueChange={(val) => field.onChange(val)}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full shadow-none">
                              <SelectValue placeholder="เลือกหมวดหมู่" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="w-full">
                            {categories?.map((item: Category) => (
                              <SelectItem key={item.name} value={item.name}>
                                {item.name}
                              </SelectItem>
                            ))}

                            <div className="flex gap-2 mt-2 w-full">
                              <input
                                type="text"
                                placeholder="เพิ่มหมวดหมู่ใหม่"
                                value={newCategory}
                                onChange={(e) => setNewCategory(e.target.value)}
                                className="flex-1 p-2 border rounded-sm text-base"
                              />
                              <Button
                                onClick={() => {
                                  if (newCategory.trim() !== "") {
                                    create({
                                      name: newCategory,
                                      active: true,
                                      code: "",
                                      description: "",
                                    });
                                    setNewCategory("");
                                  }
                                }}
                                type="button"
                                className="p-2 text-sm w-[80px] flex justify-center items-center"
                              >
                                เพิ่ม
                              </Button>
                            </div>
                          </SelectContent>
                        </Select>

                        {/* ปุ่มลบค่า */}
                        {/* {field.value && (
                        <Button
                          type="button"
                          onClick={() => field.onChange("")}
                          className="mt-2 absolute right-2 top-1/2 transform -translate-y-1/2 p-0 w-[20px] h-[20px] flex justify-center items-center bg-white rounded-full shadow-sm hover:bg-gray-200"
                        >
                          <span className="text-xl text-gray-600">×</span>
                        </Button>
                      )} */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </Card>
          </div>
        </form>
      </Form>
      <Card className="my-2 p-6">
        <div>
          <div className="flex gap-4 items-center">
            <h1 className="text-md font-semibold mt-6 mb-6">ตัวเลือกสินค้า</h1>

            <div className="text-xs text-muted-foreground mt-1">
              ตัวเลือก {optionsState.length} แบบ • รุ่นย่อย{" "}
              {variantsState.length} รายการ
            </div>
            <Button
              onClick={
                showOptionEditor
                  ? handleClearOptionEditor
                  : handleToggleOptionEditor
              }
            >
              {showOptionEditor ? "ล้าง" : "เพิ่มตัวเลือก"}
            </Button>
          </div>

          {showOptionEditor && (
            <OptionEditor
              form={form}
              initialOptions={optionsState}
              initialVariants={variantsState}
              onChange={setOptionsState}
              onVariantsChange={setVariantsState}
              onCreate={({ options, variants }) => {
                form.setValue("options" as any, options, { shouldDirty: true });
                form.setValue("variants" as any, variants, {
                  shouldDirty: true,
                });
              }}
            />
          )}
        </div>
      </Card>
    </>
  );
};
