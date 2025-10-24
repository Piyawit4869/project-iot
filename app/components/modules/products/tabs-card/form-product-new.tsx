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

import { useNavigate, useParams } from "react-router";
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

import { boolean } from "zod";
import { useProduct } from "~/api/client/product/useProductQuery";
import { cn } from "~/lib/utils";
import { FormTextRow } from "~/components/shared/formTextRow";
import { matTypeOptions } from "~/initData/product-init-data";
import type { ProductOption, ProductVariant } from "../option-editor";

interface FormProductProps {
  form: UseFormReturn<ProductCreateDTO>;
  // inventories: Inventory[];
  isCreate?: boolean;
  isEdit?: boolean;

  // handleChangeMaterial: (materialIds: string[]) => void;
  // handleChangeAttribute: (attributeIds: string[]) => void;
  // handleChangeSelection: (selectionIds: string[]) => void;
  // selectedMaterialIds: string[];
  // selectedAttributeIds: string[];
  // selectedSelectionIds: string[];
  // selectionsSelected: Selection[];
}

export const ProductOrgazine: React.FC<FormProductProps> = ({
  form,
  isCreate,
  isEdit,
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const id = (params?.id as string) ?? "";
  const [values, setValues] = useState<string[]>([]);
  const { data: productData } = useProduct(params.id ?? "");
  // const [openOpt, setOpenOpt] = React.useState(false);
  // const handleConfirmOption = (data: any) => {
  // };
  const { data: categories } = useCategories();

  const { mutate } = useCreateCategory();

  const [newCategory, setNewCategory] = useState("");

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
      <div className=" w-full  h-full ">
        <Card className="flex flex-col gap-3 p-4 space-y-3 h-full">
          <div>
            <h1 className="text-md font-semibold mb-8 mt-3">
              การจัดระเบียบสินค้า
            </h1>

            {isEdit ?? isCreate ? (
              <FormField
                control={form.control}
                name="matType"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>ประเภท</FormLabel>
                    <Select
                      value={field.value || "material"}
                      onValueChange={field.onChange}
                    >
                      <FormControl className="w-full shadow-none">
                        <SelectTrigger>
                          <SelectValue placeholder="เลือกประเภท" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        {matTypeOptions.map((item) => (
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
            ) : (
              <FormTextRow
                control={form.control}
                name="matType"
                label="ประเภท"
              />
            )}

            {/* category */}
            <div className="flex flex-row gap-3 mt-4 w-full">
              {isEdit ?? isCreate ? (
                <FormField
                  control={form.control}
                  name="productCategory"
                  render={({ field }) => (
                    <FormItem className="flex-1 mt-[14px] relative">
                      <FormLabel>หมวดหมู่</FormLabel>
                      <Select
                        value={field.value || ""}
                        onValueChange={field.onChange}
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
                              type="button"
                              className="p-2 text-sm w-[80px] flex justify-center items-center"
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
                            >
                              เพิ่ม
                            </Button>
                          </div>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ) : (
                <div className="mt-[14px]">
                  <FormTextRow
                    control={form.control}
                    name="productCategory"
                    label="หมวดหมู่"
                  />
                </div>
              )}
            </div>

            {/* tags */}
            <h1 className="text-sm font-semibold mb-2 mt-6">แท็กสินค้า</h1>
            {isEdit ?? isCreate ? (
              <>
                <InputTags
                  value={values}
                  onChange={setValues}
                  placeholder="กรอกแท็ก"
                  className="max-w-[500px]"
                />
                <h3 className="text-xs text-gray-400 p-1 mt-2">
                  กด Enter หรือพิมพ์คั่นด้วย comma(,) เพื่อเพิ่มแท็ก
                </h3>
              </>
            ) : (
              <span className="mt-2 text-sm text-[#71717A]  dark:text-[#b4b4c5]">
                {values.length > 0
                  ? values.join(", ")
                  : "สินค้าชิ้นนี้ยังไม่มีแท็ก"}
              </span>
            )}
          </div>
        </Card>
      </div>
    </>
  );
};
