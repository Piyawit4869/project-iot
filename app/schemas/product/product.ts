import { z } from "zod";
import { MaterialSchema } from "./detail/MaterialSchema";
import { AttributeSchema } from "./detail/AttributeSchema";

import { CategorySchema } from "./detail/CategorySchema";
import { SelectionSchema } from "./detail/SelectionSchema";

const preprocessNumber = (min?: number, msg?: string) =>
  z.preprocess(
    (val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    },
    z.number().refine((n) => (min !== undefined ? n >= min : true), {
      message: msg ?? `ค่าต้องไม่ต่ำกว่า ${min}`,
    })
  );

// ---------- ใหม่: สคีมาสำหรับตัวเลือกสินค้า ----------
export const ProductOptionSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().optional().default(""),
  values: z.array(z.string()).default([]),
});

export const ProductVariantSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim(),
  optionValues: z.array(z.string()).default([]),
  // เก็บเป็น string ให้ตรงกับ UI ปัจจุบัน
  price: z.string().optional().default(""),
  sku: z.string().optional().default(""),
  stock: z.string().optional().default(""),
});
// -----------------------------------------------------

export const ProductsFormSchema = z.object({
  id: z.string().optional(),
  inventoryId: z.string().optional(),
  inventory: z.string().optional(),

  name: z.string().min(1, "กรุณาระบุชื่อสินค้า"),
  namePage: z.string().optional(),

  quantity: preprocessNumber(0, "จำนวนต้องไม่ติดลบ"),

  sku: z.string().min(1, "กรุณาระบุ SKU"),
  matType: z.enum(["material", "non_material"]).default("material").optional(),

  status: z
    .enum([
      "active",
      "inactive",
      "out_of_season",
      "discontinued",
      "coming_soon",
    ])
    .default("active")
    .optional(),
  publishStatus: z
    .enum(["available", "unavailable", "out_of_stock"])
    .default("available"),

  price: preprocessNumber(1, "กรุณาระบุราคาสินค้า").default(1),
  discountPrice: preprocessNumber(0, "กรุณาระบุราคาส่วนลด").default(0),

  profitAmount: preprocessNumber().optional(),
  profitPercent: preprocessNumber(0, "เปอร์เซ็นต์กำไรต้องไม่ติดลบ").optional(),

  stockQty: preprocessNumber(0, "จำนวนสต็อกต้องไม่ติดลบ").optional(),
  priceDisplayType: preprocessNumber(
    0,
    "ประเภทการแสดงราคาต้องไม่ติดลบ"
  ).optional(),
  vatPrice: preprocessNumber(0, "ภาษีต้องไม่ติดลบ").default(0),
  salePrice: preprocessNumber(0, "ราคาขายต้องไม่ติดลบ").optional(),
  costPrice: preprocessNumber(0, "ราคาทุนต้องไม่ติดลบ").optional(),
  availableForSale: preprocessNumber(0, "จำนวนขายได้ต้องไม่ติดลบ").optional(),
  available: preprocessNumber(0, "จำนวนขายได้ต้องไม่ติดลบ")
    .optional()
    .nullable(),

  imageUrl: z.string().optional(),
  imageUrls: z.array(z.string()).optional(),
  urlPath: z.string().optional(),
  description: z.string().optional(),
  shortDescription: z.string().optional(),
  refCode: z.string().nullable().optional(),

  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  active: z.boolean().default(true),

  branchId: z.string().uuid().optional(),
  unit: z.string().optional(),
  productCategory: z.string().optional(),
  weight: z.string().optional(),

  // หมายเหตุ: 'options' เดิมยังคงไว้ตามโครงสร้างเดิม (social/platform)
  options: z
    .array(
      z.object({
        id: z.string().optional(),
        platform: z.string().min(1, "กรุณากรอกชื่อแพลตฟอร์ม"),
        username: z.string().min(1, "กรุณากรอกชื่อบัญชี"),
        url: z.string().url(),
        isPrimary: z.boolean().default(false),
        description: z.string().optional(),
      })
    )
    .default([]),

  // ---------- ใหม่: เก็บตัวเลือกสินค้า/ตัวเลือกย่อยไว้ในฟอร์ม ----------
  productOptions: z.array(ProductOptionSchema).default([]),
  productVariants: z.array(ProductVariantSchema).default([]),
  // -----------------------------------------------------
});

const ReferenceItemSchema = z.object({
  id: z.string(),
  custom: z.boolean().default(false),
});

export const ProductCreateSchema = ProductsFormSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  id: z.string().optional(),
  materials: z.array(ReferenceItemSchema).default([]),
  attributes: z.array(ReferenceItemSchema).default([]),
  selections: z.array(ReferenceItemSchema).default([]),
  categories: z.array(ReferenceItemSchema).default([]),

  // เผื่อ safety: ให้ schema Create ก็ยัง default เป็น []
  options: z.array(ProductOptionSchema).default([]),
  variants: z.array(ProductVariantSchema).default([]),
});

export const ProductUpdateSchema = ProductsFormSchema.omit({
  createdAt: true,
  updatedAt: true,
});
export const ProductListSchema = z.array(ProductsFormSchema);

export const ProductFullSchema = ProductsFormSchema.extend({
  materials: z.array(MaterialSchema),
  attributes: z.array(AttributeSchema),
  selections: z.array(SelectionSchema),
  categories: z.array(CategorySchema),
});

export type ProductFull = z.infer<typeof ProductFullSchema>;
export type Product = z.infer<typeof ProductsFormSchema>;
export type ProductCreateDTO = z.infer<typeof ProductCreateSchema>;
