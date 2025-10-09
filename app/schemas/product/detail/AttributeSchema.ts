import { z } from "zod";

// Schema for individual attribute entry
export const AttributeSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "ชื่อคุณสมบัติห้ามว่าง"),
  width: z.preprocess((val) => {
    if (typeof val === "string" || typeof val === "number") {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }
    return undefined;
  }, z.number().nonnegative("ความกว้างต้องเป็นเลขไม่ติดลบ")),
  height: z.preprocess((val) => {
    if (typeof val === "string" || typeof val === "number") {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }
    return undefined;
  }, z.number().nonnegative("ความสูงต้องเป็นเลขไม่ติดลบ")),
  length: z.preprocess((val) => {
    if (typeof val === "string" || typeof val === "number") {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }
    return undefined;
  }, z.number().nonnegative("ความยาวต้องเป็นเลขไม่ติดลบ")),
  active: z.boolean(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  productId: z.string().optional(),
  materialId: z.string().optional(),
});

// Schema for creating new attributes (omit ID and timestamps)
export const AttributeCreateSchema = AttributeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Schema for updating attributes (ID required)
export const AttributeUpdateSchema = AttributeSchema.omit({
  createdAt: true,
  updatedAt: true,
});

// List schema
export const AttributeListSchema = z.array(AttributeSchema);

// ✅ Types
export type Attribute = z.infer<typeof AttributeSchema>;
export type AttributeCreateDTO = z.infer<typeof AttributeCreateSchema>;
export type AttributeUpdateDTO = z.infer<typeof AttributeUpdateSchema>;
export type AttributeList = z.infer<typeof AttributeListSchema>;
