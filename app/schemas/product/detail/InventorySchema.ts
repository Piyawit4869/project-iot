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
  lowStockThreshold: z.number().nullable().optional(),
  capacityThreshold: z.number().nullable().optional(),

  inventoryType: z
    .enum([
      "main_warehouse",
      "sub_warehouse",
      "deposit_warehouse",
      "distribution_warehouse",
      "borrow_warehouse",
      "rent_warehouse",
      "damaged_warehouse",
    ])
    .optional(),
  contactName: z.string().optional(),
  contactPhone: z.string().optional(),
  contactEmail: z.string().optional(),

  allowSell: z.boolean().optional(),
  allowBorrow: z.boolean().optional(),
  maxBorrowQty: z.number().nullable().optional(),
  allowRent: z.boolean().optional(),
  rentPrice: z.number().nullable().optional(),

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

  targetQty: z
    .preprocess((val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }, z.number().nonnegative("เป้าหมายต้องไม่ติดลบ"))
    .optional(),

  monthlyTarget: z
    .preprocess((val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }, z.number().nonnegative("เป้าหมายต้องไม่ติดลบ"))
    .nullable()
    .optional(),

  soldQtyThisPeriod: z
    .preprocess((val) => {
      if (val === "" || val === null || val === undefined) return undefined;
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }, z.number().nonnegative("จำนวนสินค้าต้องไม่ติดลบ"))
    .optional(),

  productIds: z.array(z.string()).optional(),
});

export type InventoryCreateDTO = z.infer<typeof InventoryCreateSchema>;
export type Inventory = z.infer<typeof InventorySchema>;

const InventoryListSchema = z.array(InventorySchema);
export type InventoryList = Inventory[];

export { InventoryListSchema, InventorySchema, InventoryCreateSchema };
