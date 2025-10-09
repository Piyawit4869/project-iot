import { z } from "zod";
import { ProductsFormSchema } from "../product/product";

export const orderSchema = z.object({
  products: z
    .array(
      z.object({
        product: z.string().min(1, "กรุณากรอกชื่อสินค้า"),
        quantity: z
          .number()
          .min(0, { message: "ส่วนลดต้องไม่น้อยกว่า 0" })

          .refine((val) => !isNaN(val), { message: "ส่วนลดต้องเป็นตัวเลข" }),
      })
    )
    .nonempty("ต้องมีสินค้าขึ้นไปอย่างน้อย 1 รายการ"),
  customerName: z.string().min(1, "กรุณากรอกชื่อผู้ติดต่อ"),
  customerEmail: z.string().email("รูปแบบอีเมลไม่ถูกต้อง"),
  addOns: z.array(z.string()),
  discount: z
    .number()
    .min(0, { message: "ส่วนลดต้องไม่น้อยกว่า 0" })
    .max(100, { message: "ส่วนลดต้องไม่เกิน 100" })
    .refine((val) => !isNaN(val), { message: "ส่วนลดต้องเป็นตัวเลข" }),
});

export type OrderData = z.infer<typeof orderSchema>;

export const inventorySchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  deletedAt: z.string().nullable(),
  createdBy: z.string().nullable(),
  createdById: z.string().nullable(),
  updatedBy: z.string().nullable(),
  updatedById: z.string().nullable(),
  deletedBy: z.string().nullable(),
  deletedById: z.string().nullable(),
  active: z.boolean(),
  name: z.string(),
  ordering: z.number(),
  description: z.string(),
  branchId: z.string().uuid(),
});

export const branchSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  updatedAt: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  deletedAt: z.string().nullable(),
  createdBy: z.string().nullable(),
  createdById: z.string().nullable(),
  updatedBy: z.string().nullable(),
  updatedById: z.string().nullable(),
  deletedBy: z.string().nullable(),
  deletedById: z.string().nullable(),
  code: z.string(),
  active: z.boolean(),
  isMain: z.boolean(),
  status: z.string(),
  fromType: z.string(),
  taxId: z.string(),
  type: z.string(),
  openingDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date",
  }),
  nameTh: z.string(),
  nameEn: z.string(),
  descriptionsTh: z.string().nullable(),
  descriptionsEn: z.string().nullable(),
  websiteUrl: z.string().url(),
  registerVat: z.boolean(),
  contactName: z.string().nullable(),
  contactEmail: z.string().email().nullable(),
  contactPhone: z.string(),
  contactLine: z.string().nullable(),
  contactFacebook: z.string().nullable(),
  contactWhatsapp: z.string().nullable(),
  contactWebsite: z.string().nullable(),
  contactNote: z.string().nullable(),
  logoUrl: z.string().url(),
  organizationId: z.string().uuid(),
});

export const productSchema = z.object({
  id: z.string().uuid().optional(),
  createdAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date",
    })
    .optional(),
  updatedAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date",
    })
    .optional(),
  deletedAt: z.string().nullable().optional(),
  createdBy: z.string().nullable().optional(),
  createdById: z.string().nullable().optional(),
  updatedBy: z.string().nullable().optional(),
  updatedById: z.string().nullable().optional(),
  deletedBy: z.string().nullable().optional(),
  deletedById: z.string().nullable().optional(),
  active: z.boolean().optional(),
  name: z.string().optional(),
  sku: z.string().optional(),
  quantity: z.number().optional(),
  matType: z.string().optional(),
  status: z.string().optional(),
  price: z.number().optional(),
  discountPrice: z.number().optional(),
  vatPrice: z.number().optional(),
  imageUrl: z.string().url().optional(),
  description: z.string().optional(),
  refCode: z.string().optional(),
  inventoryId: z.string().uuid().optional(),
  notationsId: z.string().uuid().optional(),
  branchId: z.string().uuid().optional(),
  inventory: inventorySchema.optional(),
  branch: branchSchema.optional(),
});

// ตัวอย่าง type จาก schema
export type ProductType = z.infer<typeof productSchema>;

export const itemSchema = z.object({
  products: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      quantity: z.number(),
      sku: z.string(),
      matType: z.string(),
      status: z.string(),
      price: z.number(),
      salePrice: z.number(),
      costPrice: z.number(),
      discountPrice: z.number(),
      vatPrice: z.number(),
      active: z.boolean(),
    })
  ),
});

export const configureOrderSchema = z.object({
  templateName: z.string(),
  width: z.string(), // can be changed to z.number() if you prefer
  height: z.string(),
  margin: z.string(),
  background: z.string(),
  padding: z.string(),
  border: z.string(),
  zIndex: z.string(),
  templateOrder: z.string(),
});

export const customerSchema = z.object({
  id: z.string(),
  // companyName: z.string().optional(),
  // customerId: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  // contactEmail: z.string().email(),
  // contactPhone: z.string(),
  taxID: z.string().optional(),
  customerType: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  postalCode: z.string().optional(),
  // Uncomment and extend this if you want to support addresses later:
  // addresses: z.array(addressSchema).optional()
});

export const TypeEnum = z
  .enum(["quotation", "invoice", "receipt", "delivery_order", "purchase_order"])
  .optional();

export const currencyEnum = z.enum(["THB", "USD", "EUR"]);

export const StatusEnum = z.enum(["draft", "approved", "sent", "cancelled"]);

export const orderFormSchema = z.object({
  active: z.boolean(),
  branchId: z.string(),
  suppliers: z.string(),
  arrivalDate: z.string(),
  orderDate: z.string(),
  shipping: z.string(),
  startDate: z.string().min(1, "กรุณาเลือกวันที่สั่งซื้อออเดอร์"),
  docName: z.string(),
  notationType: z.string(),
  expireDate: z.string().min(1, "กรุณาเลือกวันที่หมดอายุ"),
  note: z.string().optional(),
  trackingNo: z.string(),
  refCode: z.string(),
  docNo: z.string(),
  discount: z.coerce.number().nullable(),
  vat: z.coerce.number().nullable(),
  wht: z.coerce.number().nullable(),
  total: z.coerce.number().nullable(),
  grandTotal: z.coerce.number().nullable(),
  net: z.coerce.number().nullable(),
  subTotal: z.coerce.number().nullable(),
  customerId: z.string(),

  // discount: z.number().optional(),
  // type: TypeEnum,
  // status: z.string(),
  // docStatus: StatusEnum,
  // docName: z.string(),
  // vat: z.number(),
  // wht: z.number(),
  // isCustom: z.boolean(),

  // showInThai: z.boolean(),
  // haveSignature: z.boolean(),
  // signatureUrl: z.string(),
  // stampUrl: z.string().optional(),

  orderType: TypeEnum,
  currency: currencyEnum,
  customer: customerSchema.optional(),
  orderDetail: itemSchema,
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;

const Status = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
} as const;

const DocumentStatus = {
  DRAFT: "DRAFT",
  FINALIZED: "FINALIZED",
  CANCELED: "CANCELED",
} as const;

const DocumentType = {
  INVOICE: "invoice",
  QUOTATION: "quotation",
  PURCHASE_ORDER: "purchase_order",
} as const;

export const CreateCRUDOrderDetailSchema = z.object({
  products: z.array(ProductsFormSchema),
  status: z.string().optional(),
});

export const CreateCRUDOrderSchema = z.object({
  active: z.boolean(),
  docNo: z.string(),
  branchId: z.string(),
  startDate: z.string().nullable(),
  code: z.string().optional(),
  docName: z.string(),
  refNo: z.string().optional(),
  refCode: z.string().optional(),
  expireDate: z.string().optional(),
  status: z.nativeEnum(Status).optional(),
  docStatus: z.nativeEnum(DocumentStatus).optional(),
  discountPosition: z.enum(["beforeTax", "afterTax"]).optional(),
  notationType: z.nativeEnum(DocumentType),
  showInThai: z.boolean().optional(),
  signatureUrl: z.string().optional(),
  pdfUrl: z.string().optional(),
  urlStamp: z.string().optional(),
  haveSignature: z.boolean().optional(),
  isCustom: z.boolean().optional(),
  grandTotalText: z.string().optional(),
  haveStamp: z.boolean().optional(),
  currency: z.string().optional(),
  customIssueTo: z.string().optional(),
  customIssueEmail: z.string().optional(),
  customIssuePhone: z.string().optional(),
  customContactName: z.string().optional(),
  customContactEmail: z.string().optional(),
  customContactPhone: z.string().optional(),
  note: z.string().optional(),
  approvedBy: z.string().optional(),
  approvedById: z.string().optional(),
  rejectedBy: z.string().optional(),
  rejectedById: z.string().optional(),
  subTotal: z.number().optional(),
  total: z.number().optional(),
  net: z.number().optional(),
  grandTotal: z.number().optional(),
  discount: z.number(),
  vat: z.number(),
  wht: z.number(),
  customerId: z.string().optional(),
  orderDetail: CreateCRUDOrderDetailSchema,
});

export type CreateCRUDOrderInput = z.infer<typeof CreateCRUDOrderSchema>;
export type CreateCRUDOrderDetailInput = z.infer<
  typeof CreateCRUDOrderDetailSchema
>;
