import { z } from "zod";

const InventorySchema = z.object({
  id: z.string(),
  name: z.string().min(1, "กรุณากรอก"),
  description: z.string(),
  active: z.boolean().default(true),
});

const InventoryCreateSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "กรุณากรอก"),
  description: z.string(),
  productcapacity: z.string().optional(),
  active: z.boolean().default(true),
  capacity: z.string(),
  stockQty: z
    .preprocess((val) => {
      if (typeof val === "string" || typeof val === "number") {
        const num = Number(val);
        return isNaN(num) ? undefined : num;
      }
      return undefined;
    }, z.number().nonnegative("ราคาส่วนลดต้องไม่ติดลบ"))
    .optional(),
});

export type InventoryCreateDTO = z.infer<typeof InventoryCreateSchema>;
export type Inventory = z.infer<typeof InventorySchema>;

const InventoryListSchema = z.array(InventorySchema);

export type InventoryList = Inventory[];

export { InventoryListSchema, InventorySchema, InventoryCreateSchema };
