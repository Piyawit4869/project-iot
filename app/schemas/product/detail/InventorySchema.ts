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

  hasCapacityLimit: z.boolean().default(false),
  enableLowStockAlert: z.boolean().default(false),
  lowStockThreshold: z.number().optional(),
  capacityThreshold: z.number().optional(),

  allowSell: z.boolean().optional(),
  allowBorrow: z.boolean().optional(),
  maxBorrowQty: z.number().optional(),
  allowRent: z.boolean().optional(),
  rentPrice: z.number().optional(),

  description: z.string().optional(),
  address: z.string().optional(),
  company: z.string().optional(),
  branch: z.string().optional(),
  capacity: z.string().optional(),
  productcapacity: z
    .preprocess((val) => {
      if (typeof val === "string" || typeof val === "number") {
        const num = Number(val);
        return isNaN(num) ? undefined : num;
      }
      return undefined;
    }, z.number().nonnegative("จำนวนสินค้าต้องไม่ติดลบ"))
    .optional(),
  active: z.boolean().default(true),

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
