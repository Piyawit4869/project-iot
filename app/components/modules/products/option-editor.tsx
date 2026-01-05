import * as React from "react";
import {
  PlusCircle,
  Save,
  X,
  ChevronDown,
  Trash2,
  RefreshCw,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card, CardContent } from "~/components/ui/card";
import { type UseFormReturn } from "react-hook-form";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { toast } from "sonner";
import { GlobalModal } from "~/components/shared/modal/modal";
import { cn } from "~/lib/utils";
import type { ProductCreateDTO } from "~/schemas/product/product";
import ImageUploadMulti from "~/components/shared/image-upload-multi";
import { useState } from "react";
import { Separator } from "~/components/ui/separator";

export type OptionType = "variant" | "attribute";

// ---------- Types ----------
export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string; // "แดง / M / ผ้า"
  optionValues: string[]; // ["แดง","M","ผ้า"]
  price?: string;
  sku?: string;
  stock?: string;
};

type OptionEditorProps = {
  form: UseFormReturn<ProductCreateDTO>;
  className?: string;
  initialOptions?: ProductOption[];
  initialVariants?: ProductVariant[];
  onChange?: (options: ProductOption[]) => void;
  onVariantsChange?: (variants: ProductVariant[]) => void;
  onCreate?: (data: {
    options: ProductOption[];
    variants: ProductVariant[];
  }) => void;
};

// ---------- Utils ----------
function cartesian<T>(...arrays: T[][]): T[][] {
  if (arrays.length === 0) return [];
  return arrays.reduce<T[][]>(
    (acc, curr) => acc.flatMap((a) => curr.map((c) => [...a, c])),
    [[]]
  );
}
function buildVariantTitle(values: string[]) {
  return values.join(" / ");
}
function uniqStrings(arr: string[]) {
  return Array.from(new Set(arr.map((s) => s.trim()).filter(Boolean)));
}

// ---------- Component ----------
export default function OptionEditorInline({
  form,
  className,
  initialOptions,
  initialVariants,
  onChange,
  onVariantsChange,
  onCreate,
}: OptionEditorProps) {
  // --- State: options/variants ---
  const [options, setOptions] = React.useState<ProductOption[]>(
    initialOptions?.length
      ? initialOptions
      : [{ id: crypto.randomUUID(), name: "", values: [""] }]
  );
  const [variants, setVariants] = React.useState<ProductVariant[]>(
    initialVariants ?? []
  );

  // --- UI helpers (group toggle แบบ baseline) ---
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(
    {}
  );

  const [productVariants, setProductVariants] = React.useState<ProductOption[]>(
    initialOptions?.length
      ? initialOptions
      : [{ id: crypto.randomUUID(), name: "", values: [""] }]
  );

  const toggleGroup = (key: string) =>
    setOpenGroups((s) => ({ ...s, [key]: !s[key] }));

  // --- Derived values ---
  const parentValues = React.useMemo(
    () => uniqStrings(options[0]?.values ?? []).filter(Boolean),
    [options]
  );
  const childCombos = React.useMemo(() => {
    const v2 = uniqStrings(options[1]?.values ?? []).filter(Boolean);
    const v3 = uniqStrings(options[2]?.values ?? []).filter(Boolean);
    const hasV2 = v2.length > 0;
    const hasV3 = v3.length > 0;
    if (!hasV2 && !hasV3) return [[]];
    return hasV3 ? cartesian<string>(v2, v3) : v2.map((x) => [x]);
  }, [options]);

  // --- Option CRUD (inline ไม่ใช้ Modal) ---
  const addOption = () => {
    setOptions((prev) => {
      if (prev.length >= 3) return prev;
      return [...prev, { id: crypto.randomUUID(), name: "", values: [""] }];
    });
  };
  const removeOption = (id: string) => {
    GlobalModal.warning({
      title: "ลบตัวเลือก",
      description: "คุณต้องการลบตัวเลือกนี้ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังลบ...");
        try {
          setOptions((prev) => prev.filter((o) => o.id !== id));
          toast.success("ลบเรียบร้อย", { id: toastId });
        } catch {
          toast.error("ลบไม่สำเร็จ", { id: toastId });
        }
      },
    });
  };
  const updateOptionName = (id: string, name: string, type?: OptionType) => {
    if (type === "variant") {
      setProductVariants((prev) =>
        prev.map((o) => (o.id === id ? { ...o, name } : o))
      );
    } else {
      setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, name } : o)));
    }
  };
  const updateOptionValue = (
    optId: string,
    idx: number,
    val: string,
    type?: OptionType
  ) => {
    if (type === "variant") {
      setProductVariants((prev) =>
        prev.map((o) =>
          o.id === optId
            ? { ...o, values: o.values.map((v, i) => (i === idx ? val : v)) }
            : o
        )
      );
    } else {
      setOptions((prev) =>
        prev.map((o) =>
          o.id === optId
            ? { ...o, values: o.values.map((v, i) => (i === idx ? val : v)) }
            : o
        )
      );
    }
  };
  const addOptionValue = (optId: string, type?: OptionType) => {
    if (type === "variant") {
      setProductVariants((prev) =>
        prev.map((o) =>
          o.id === optId ? { ...o, values: [...o.values, ""] } : o
        )
      );
    } else {
      setOptions((prev) =>
        prev.map((o) =>
          o.id === optId ? { ...o, values: [...o.values, ""] } : o
        )
      );
    }
  };

  const removeOptionValue = (optId: string, idx: number, type?: OptionType) => {
    if (type === "variant") {
      setProductVariants((prev) =>
        prev.map((o) =>
          o.id === optId
            ? { ...o, values: o.values.filter((_, i) => i !== idx) }
            : o
        )
      );
    } else {
      setOptions((prev) =>
        prev.map((o) =>
          o.id === optId
            ? { ...o, values: o.values.filter((_, i) => i !== idx) }
            : o
        )
      );
    }
  };

  // --- Generate Variants (คงค่าเดิมถ้ามี) ---
  const generateVariants = () => {
    const cleaned = options
      .map((o) => ({
        ...o,
        name: (o.name ?? "").trim(),
        values: uniqStrings(o.values ?? []),
      }))
      .filter((o) => o.name && o.values.length > 0);

    setOptions(cleaned);
    onChange?.(cleaned);

    if (cleaned.length === 0) {
      setVariants([]);
      onVariantsChange?.([]);
      return;
    }

    const combos = cartesian<string>(...cleaned.map((o) => o.values));
    const prevMap = new Map(variants.map((v) => [v.title, v]));

    const next: ProductVariant[] = combos.map((arr) => {
      const title = buildVariantTitle(arr);
      const existed = prevMap.get(title);
      return {
        id: existed?.id ?? crypto.randomUUID(),
        title,
        optionValues: arr,
        price: existed?.price ?? "",
        sku: existed?.sku ?? "",
        stock: existed?.stock ?? "",
      };
    });

    setVariants(next);
    onVariantsChange?.(next);
    toast.success("สร้างตัวเลือกย่อยเรียบร้อย");
  };

  // --- Upsert Variant Field (inline cell editing) ---
  const upsertVariantField = (
    fullValues: string[],
    field: "price" | "sku" | "stock",
    value: string
  ) => {
    const title = buildVariantTitle(fullValues);
    setVariants((prev) => {
      const idx = prev.findIndex((v) => v.title === title);
      if (idx === -1) {
        const created: ProductVariant = {
          id: crypto.randomUUID(),
          title,
          optionValues: fullValues,
          price: field === "price" ? value : "",
          sku: field === "sku" ? value : "",
          stock: field === "stock" ? value : "",
        };
        const next = [...prev, created];
        onVariantsChange?.(next);
        return next;
      } else {
        const next = prev.map((v, i) =>
          i === idx ? { ...v, [field]: value } : v
        );
        onVariantsChange?.(next);
        return next;
      }
    });
  };

  // --- Save all (pattern เดียวกับ baseline: toast + callback) ---
  const handleSaveAll = () => {
    const toastId = toast.loading("กำลังบันทึกตัวเลือก...");
    try {
      const cleaned = options
        .map((o) => ({
          ...o,
          name: (o.name ?? "").trim(),
          values: uniqStrings(o.values ?? []),
        }))
        .filter((o) => o.name && o.values.length > 0);

      setOptions(cleaned);
      onChange?.(cleaned);
      onVariantsChange?.(variants);
      onCreate?.({ options: cleaned, variants });

      toast.success("บันทึกเรียบร้อยแล้ว", { id: toastId });
    } catch {
      toast.error("บันทึกไม่สำเร็จ กรุณาลองใหม่", { id: toastId });
    }
  };

  // // --- Derived flags ---
  // const canGenerate =
  //   options.length > 0 &&
  //   options.every((o) => (o.name ?? "").trim().length > 0) &&
  //   options.every((o) =>
  //     (o.values ?? []).some((v) => (v ?? "").trim().length > 0)
  //   );

  const addProductVariant = () => {
    setProductVariants((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: "", values: [""] },
    ]);
  };

  const removeProductVariant = (id: string) => {
    setProductVariants((prev) => prev.filter((p) => p.id !== id));
  };

  const updateProductVariant = (
    id: string,
    field: keyof Omit<(typeof productVariants)[number], "id">,
    value: string
  ) => {
    setProductVariants((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const selectionsCount = `${Math.min(options.length, 3)}/${3} ตัวเลือก`;
  const attributesCount = `${Math.min(parentValues.length, 3)}/${2} ตัวเลือก`;
  const [images, setImages] = useState<string[]>([]);

  // ---------- Render ----------
  return (
    <Form {...form}>
      <div className="flex flex-row gap-4">
        <Card className={cn("p-4 md:p-6 border-1 space-y-4 w-full", className)}>
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-base">คุณสมบัติ</h1>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={addOption}
                disabled={options.length >= 3}
                className="bg-none border-0 w-30 hover:bg-white shadow-none"
                title={options.length >= 3 ? "เพิ่มได้สูงสุด 3 ตัวเลือก" : ""}
              >
                <span className="text-[#1F78FF] hover:underline">
                  + เพิ่มตัวเลือก
                </span>
              </Button>
              <span className="text-xs text-muted-foreground">
                {selectionsCount}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {options.length === 0 ? (
              <div className="rounded-xl text-sm text-muted-foreground">
                ยังไม่มีตัวเลือก กรุณากดปุ่ม “เพิ่มตัวเลือก”
              </div>
            ) : (
              options.map((opt, optIdx) => (
                <Card
                  key={opt.id}
                  className="px-5 bg-[#F2F2F2] flex flex-col gap-4"
                >
                  <div className="text-sm flex justify-between items-center">
                    <span>
                      คุณสมบัติ : {opt.name}
                      <span className="text-sm mt-2 flex justify-center text-muted-foreground">
                        ค่าตัวเลือก {opt.values?.length || 0} รายการ
                      </span>
                    </span>

                    {opt.id.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => removeOption(opt.id)}
                        className="text-red-500 flex items-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>ลบคุณสมบัติ</span>
                      </Button>
                    )}
                  </div>
                  <span className="text-sm  flex text-muted-foreground">
                    ชื่อคุณสมบัติ
                  </span>

                  <Input
                    key="selections"
                    placeholder="เช่น สี / ขนาด / วัสดุ"
                    value={opt.name}
                    onChange={(e) => updateOptionName(opt.id, e.target.value)}
                    className="bg-white flex-1"
                  />
                  <Separator />
                  {opt.values.map((val, vIdx) => (
                    <>
                      <div key={vIdx} className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">ชื่อตัวเลือก</span>
                          {opt.values.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => removeOptionValue(opt.id, vIdx)}
                              className="text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                          <Input
                            placeholder={optIdx === 0 ? "เช่น แดง" : "เช่น M"}
                            value={val}
                            onChange={(e) =>
                              updateOptionValue(opt.id, vIdx, e.target.value)
                            }
                            className="bg-white flex-1"
                          />
                        </div>
                        <div className="grid flex-col grid-cols-2 gap-4">
                          <span className=" text-sm mt-2">ราคาเพิ่ม</span>
                          <span className=" text-sm mt-2">จำนวน</span>
                          <Input
                            placeholder={optIdx === 0 ? "เช่น แดง" : "เช่น M"}
                            value={val}
                            onChange={(e) =>
                              updateOptionValue(opt.id, vIdx, e.target.value)
                            }
                            className="bg-white flex-1"
                          />

                          <Input
                            placeholder={optIdx === 0 ? "เช่น แดง" : "เช่น M"}
                            value={val}
                            onChange={(e) =>
                              updateOptionValue(opt.id, vIdx, e.target.value)
                            }
                            className="bg-white flex-1"
                          />
                        </div>
                      </div>
                      <ImageUploadMulti
                        value={images}
                        onChange={(e) => setImages(e)}
                        tileSize={100}
                      />
                    </>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addOptionValue(opt.id)}
                    className="mt-2 w-25"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    เพิ่มค่า
                  </Button>
                </Card>
              ))
            )}
          </div>

          {/* <div className="flex flex-wrap items-center gap-3">
            <Button
              type="button"
              onClick={generateVariants}
              disabled={!canGenerate}
              className="w-full md:w-auto"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              สร้างตัวเลือกย่อย
            </Button>
          </div> */}
        </Card>
        <div className="w-[45%]">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-bold text-base">ตัวเลือกสินค้า</h1>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addProductVariant}
                  className="bg-none border-0 w-30 hover:bg-white shadow-none"
                >
                  <span className="text-[#1F78FF] hover:underline">
                    + เพิ่มสินค้า
                  </span>
                </Button>
                <span className="text-xs text-muted-foreground">
                  {attributesCount}
                </span>
              </div>
            </div>

            {productVariants.length === 0 ? (
              <p className="text-sm mt-2 flex justify-center text-muted-foreground">
                ยังไม่มีรายการสินค้า กรุณากด “เพิ่มสินค้า”
              </p>
            ) : (
              productVariants.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-[#F2F2F2] p-3 rounded-md   flex flex-col gap-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-sm">
                      ตัวเลือกสินค้า : {item.name}
                    </span>

                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => removeProductVariant(item.id)}
                      className="text-red-500"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="font-semibold text-sm">ชื่อตัวเลือก</span>
                  <Input
                    placeholder="ชื่อตัวเลือก เช่น สีแดง / ขนาด M"
                    value={item.name}
                    onChange={(e) =>
                      updateProductVariant(item.id, "name", e.target.value)
                    }
                    className="bg-white"
                  />
                  <Separator />

                  {item.values.map((val, vIdx) => (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-3">
                        <span className=" text-sm mt-2">ค่าตัวเลือก</span>

                        <Input
                          placeholder="ค่าตัวเลือก"
                          // value={val.price}
                          // onChange={(e) =>
                          //   updateProductVariant(item.id, "price", e.target.value)
                          // }
                          className="bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <span className=" text-sm mt-2">ราคาเพิ่ม</span>
                        <span className=" text-sm mt-2">จำนวน</span>
                        <Input
                          type="number"
                          // value={item.sku}
                          // onChange={(e) =>
                          //   updateProductVariant(item.id, "sku", e.target.value)
                          // }
                          className="bg-white"
                        />
                        <Input
                          type="number"
                          placeholder="จำนวน"
                          // value={item.stock}
                          // onChange={(e) =>
                          //   updateProductVariant(item.id, "stock", e.target.value)
                          // }
                          className="bg-white"
                        />
                      </div>
                    </>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => addOptionValue(item.id, "variant")}
                    className="mt-2 w-25"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    เพิ่มค่า
                  </Button>
                </div>
              ))
            )}

            {productVariants.length > 0 && (
              <div className="mt-2 flex gap-3">
                <Button
                  type="button"
                  onClick={() => console.log("save", productVariants)}
                  className="w-full md:w-auto"
                >
                  <Save className="mr-2 h-4 w-4" />
                  บันทึกสินค้า
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </Form>
  );
}
