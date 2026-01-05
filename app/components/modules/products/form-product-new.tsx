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

import OptionEditor, {
  type ProductOption,
  type ProductVariant,
} from "./option-editor";
import { RequiredLabel } from "~/components/shared/required-design";

import { useNavigate, useParams } from "react-router";

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
import { ViewCustomerActivityLog } from "../customer/components/customer-activityLog";

import { FileText, Tags } from "lucide-react";
import { TabDetail } from "./tabs-card/tab-detail";
import { TabPrice } from "./tabs-card/tab-price";
import { boolean } from "zod";
import { useProduct } from "~/api/client/product/useProductQuery";
import { cn } from "~/lib/utils";
import { FormTextRow } from "~/components/shared/formTextRow";
import { ProductOrgazine } from "./tabs-card/form-product-new";
import { CustomTabs } from "~/components/shared/custom-tabs";

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
  isEdit?: boolean;
  categories: Category[];
  isCreate?: boolean;
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

  const { data } = useCategories();
  const categories = Array.isArray(data?.res)
    ? data.res
    : Array.isArray(data)
      ? data
      : [];

  const { mutate } = useCreateCategory();

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
          <div className="flex flex-row gap-4">
            <Card className="p-4 space-y-3 w-[70%]">
              <CustomTabs
                defaultValue="details"
                items={[
                  {
                    key: "details",
                    label: "รายละเอียดสินค้า",
                    icon: <FileText className="w-4 h-4" />,
                    content: (
                      <TabDetail
                        form={form}
                        isCreate={isCreate}
                        isEdit={isEdit}
                        productData={productData}
                      />
                    ),
                  },
                  {
                    key: "price",
                    label: "รายละเอียดราคา",
                    icon: <Tags className="w-4 h-4" />,
                    content: (
                      <TabPrice
                        form={form}
                        isCreate={isCreate}
                        isEdit={isEdit}
                        productData={productData}
                      />
                    ),
                  },
                ]}
              />
            </Card>

            <div className="flex flex-col gap-3 md:w-[30%]">
              <ProductOrgazine
                form={form}
                isEdit={isEdit}
                isCreate={isCreate}
              />

              {!isEdit && <ViewCustomerActivityLog />}
            </div>
          </div>
        </form>
      </Form>
      {isEdit || isCreate ? (
        <Card className="my-2 p-6">
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
              className={
                showOptionEditor
                  ? "bg-white border-1 text-black hover:bg-gray-100"
                  : ""
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
        </Card>
      ) : (
        <Card className={cn("p-4 md:p-6 border-1 space-y-4")}>
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-base">ตัวเลือกสินค้า</h1>
            <div className="text-xs mt-1 text-muted-foreground">
              ตัวเลือก 0 แบบ • รุ่นย่อย 0 รายการ
            </div>
          </div>

          <Card className="p-4">
            <div className="flex justify-between">
              <h1 className="font-bold text-base">ตัวเลือกสินค้า</h1>
              <div className="text-xs mt-1 text-muted-foreground">
                0 /3 ตัวเลือก
              </div>
            </div>
            <span className="text-gray-400">ไม่มีสินค้าเพิ่มเติม</span>
          </Card>
        </Card>
      )}
    </>
  );
};
