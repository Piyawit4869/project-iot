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
import { Card } from "~/components/ui/card";
import { type UseFormReturn } from "react-hook-form";
import { Form } from "~/components/ui/form";
import { toast } from "sonner";
import { GlobalModal } from "~/components/shared/modal/modal";
import { cn } from "~/lib/utils";
import type { ProductCreateDTO } from "~/schemas/product/product";

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
  const updateOptionName = (id: string, name: string) => {
    setOptions((prev) => prev.map((o) => (o.id === id ? { ...o, name } : o)));
  };
  const updateOptionValue = (optId: string, idx: number, val: string) => {
    setOptions((prev) =>
      prev.map((o) =>
        o.id === optId
          ? { ...o, values: o.values.map((v, i) => (i === idx ? val : v)) }
          : o
      )
    );
  };
  const addOptionValue = (optId: string) => {
    setOptions((prev) =>
      prev.map((o) =>
        o.id === optId ? { ...o, values: [...o.values, ""] } : o
      )
    );
  };
  const removeOptionValue = (optId: string, idx: number) => {
    setOptions((prev) =>
      prev.map((o) =>
        o.id === optId
          ? { ...o, values: o.values.filter((_, i) => i !== idx) }
          : o
      )
    );
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

  // --- Derived flags ---
  const canGenerate =
    options.length > 0 &&
    options.every((o) => (o.name ?? "").trim().length > 0) &&
    options.every((o) =>
      (o.values ?? []).some((v) => (v ?? "").trim().length > 0)
    );

  const optionCountBadge = `${Math.min(options.length, 3)}/${3} ตัวเลือก`;

  // ---------- Render ----------
  return (
    <Form {...form}>
      <Card className={cn("p-4 md:p-6 border-1 space-y-4", className)}>
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-base">ตัวเลือกสินค้า</h1>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={addOption}
              disabled={options.length >= 3}
              title={options.length >= 3 ? "เพิ่มได้สูงสุด 3 ตัวเลือก" : ""}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              เพิ่มตัวเลือก
            </Button>
            <span className="text-xs text-muted-foreground">
              {optionCountBadge}
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
              <div key={opt.id} className="rounded-xl border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <h4 className="font-semibold truncate">
                      {opt.name?.trim()
                        ? `ตัวเลือก: ${opt.name}`
                        : `ตัวเลือก #${optIdx + 1}`}
                    </h4>
                    <div className="mt-1 text-xs text-muted-foreground">
                      ค่าตัวเลือก {opt.values.filter((v) => v.trim()).length}{" "}
                      รายการ
                    </div>
                  </div>
                  {options.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      className="text-red-600"
                      onClick={() => removeOption(opt.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" />
                      ลบตัวเลือกนี้
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-start">
                  <div>
                    <Label className="mb-2 block text-xs">ชื่อตัวเลือก</Label>
                    <Input
                      placeholder="เช่น สี / ขนาด / วัสดุ"
                      value={opt.name}
                      onChange={(e) => updateOptionName(opt.id, e.target.value)}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Label className="mb-2 block text-xs">ค่าตัวเลือก</Label>
                    {opt.values.map((val, vIdx) => (
                      <div key={vIdx} className="flex items-center gap-2 mb-2">
                        <Input
                          placeholder={optIdx === 0 ? "เช่น แดง" : "เช่น M"}
                          value={val}
                          onChange={(e) =>
                            updateOptionValue(opt.id, vIdx, e.target.value)
                          }
                        />
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
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addOptionValue(opt.id)}
                      className="mt-1"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      เพิ่มค่า
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Actions: generate variants */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="button"
            onClick={generateVariants}
            disabled={!canGenerate}
            className="w-full md:w-auto"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            สร้างตัวเลือกย่อย
          </Button>
        </div>

        {/* Variants grouped (หน้าการ์ดเดียว ไม่ใช้ Modal) */}
        <div className="mt-4 space-y-3">
          {parentValues.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              โปรดเพิ่มค่าของตัวเลือกที่ 1 เพื่อแสดงหัวรายการ
            </p>
          ) : (
            parentValues.map((pv) => {
              const isOpen = openGroups[pv] ?? true;
              const childCount = childCombos.length;

              // group sum
              const groupTotal = variants.reduce((sum, v) => {
                if (v.optionValues?.[0] === pv)
                  return sum + (Number(v.stock) || 0);
                return sum;
              }, 0);

              return (
                <div key={pv} className="rounded-lg border">
                  <button
                    type="button"
                    onClick={() => toggleGroup(pv)}
                    className="w-full flex items-center justify-between p-3"
                  >
                    <div className="text-left">
                      <div className="text-sm font-medium">{pv}</div>
                      <div className="text-xs text-muted-foreground">
                        ตัวเลือกสินค้า {childCount} รายการ
                      </div>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isOpen ? "rotate-180" : "rotate-0"
                      )}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t">
                      <div className="grid grid-cols-12 gap-2 p-3 text-xs font-medium bg-muted">
                        <div className="col-span-5">ชื่อ</div>
                        <div className="col-span-3">ราคา</div>
                        <div className="col-span-2">SKU</div>
                        <div className="col-span-2 flex items-center justify-between">
                          <span>จำนวน</span>
                          <span className="font-semibold">{groupTotal}</span>
                        </div>
                      </div>

                      {childCombos.map((combo, idx) => {
                        const fullValues = [pv, ...combo];
                        const fullTitle = buildVariantTitle(fullValues);
                        const childTitle = combo.length
                          ? buildVariantTitle(combo)
                          : pv;
                        const matched = variants.find(
                          (v) => v.title === fullTitle
                        );

                        return (
                          <div
                            key={`${pv}-${idx}-${childTitle}`}
                            className="grid grid-cols-12 gap-2 p-3 border-t items-center"
                          >
                            <div className="col-span-5 text-sm">
                              {childTitle}
                            </div>

                            <div className="col-span-3">
                              <Input
                                type="number"
                                placeholder="ราคา"
                                value={matched?.price ?? ""}
                                onChange={(e) =>
                                  upsertVariantField(
                                    fullValues,
                                    "price",
                                    e.target.value
                                  )
                                }
                              />
                            </div>

                            <div className="col-span-2">
                              <Input
                                placeholder="SKU"
                                value={matched?.sku ?? ""}
                                onChange={(e) =>
                                  upsertVariantField(
                                    fullValues,
                                    "sku",
                                    e.target.value
                                  )
                                }
                              />
                            </div>

                            <div className="col-span-2">
                              <Input
                                type="number"
                                placeholder="จำนวน"
                                value={matched?.stock ?? ""}
                                onChange={(e) =>
                                  upsertVariantField(
                                    fullValues,
                                    "stock",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Save (pattern เดียวกับ baseline) */}
        <div className="mt-4 flex gap-3">
          <Button
            type="button"
            onClick={handleSaveAll}
            className="w-full md:w-auto"
          >
            <Save className="mr-2 h-4 w-4" />
            บันทึกตัวเลือก
          </Button>
        </div>
      </Card>
    </Form>
  );
}
