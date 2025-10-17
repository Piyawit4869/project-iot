import { z } from "zod";

// Enum for selection types
export const SelectionTypeEnum = z.enum(["option", "add_on", "color"]); // Add more types if needed

// Enum for status
export const SelectionStatusEnum = z.enum(["available", "unavailable"]);

export const SelectionSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "ชื่อห้ามว่าง"),
  sku: z.string().min(1, "SKU ห้ามว่าง"),
  sltType: SelectionTypeEnum,
  status: SelectionStatusEnum,
  // price: z.number().nonnegative("ราคาต้องไม่ติดลบ"),
  // discountPrice: z.number().nonnegative("ราคาส่วนลดต้องไม่ติดลบ"),
  // vatPrice: z.number().nonnegative("ภาษีต้องไม่ติดลบ"),

  price: z.preprocess((val) => {
    if (typeof val === "string" || typeof val === "number") {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }
    return undefined;
  }, z.number().nonnegative("ราคาต้องไม่ติดลบ")),
  discountPrice: z.preprocess((val) => {
    if (typeof val === "string" || typeof val === "number") {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }
    return undefined;
  }, z.number().nonnegative("ราคาส่วนลดต้องไม่ติดลบ")),
  vatPrice: z.preprocess((val) => {
    if (typeof val === "string" || typeof val === "number") {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }
    return undefined;
  }, z.number().nonnegative("ภาษีต้องไม่ติดลบ")),
  imageUrl: z.string().url("ต้องเป็น URL ที่ถูกต้อง").optional(),

  description: z.string().optional(),
  active: z.boolean(),
  productId: z.string().uuid("ต้องเป็น UUID ของสินค้า"),
  materialId: z.string().uuid("ต้องเป็น UUID ของวัสดุ"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Create schema (omit ID/timestamps)
export const SelectionCreateSchema = SelectionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update schema
export const SelectionUpdateSchema = SelectionSchema.omit({
  createdAt: true,
  updatedAt: true,
});

// List schema
export const SelectionListSchema = z.array(SelectionSchema);

// ✅ Types
export type Selection = z.infer<typeof SelectionSchema>;
export type SelectionCreateDTO = z.infer<typeof SelectionCreateSchema>;
export type SelectionUpdateDTO = z.infer<typeof SelectionUpdateSchema>;
export type SelectionList = z.infer<typeof SelectionListSchema>;
