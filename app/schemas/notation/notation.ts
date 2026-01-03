import z from "zod";
import { customerSchema, itemSchema, orderFormSchema } from "../order/order";

export const NotationSchema = z.object({
  type: z.string(),
});

export type NotationValues = z.infer<typeof NotationSchema>;

export const TypeEnum = z.enum(["quotation", "invoice", "receipt"]).optional();

export const currencyEnum = z.enum(["THB", "USD", "EUR"]);

export const notationFormSchema = z.object({
  active: z.boolean(),
  branchId: z.string().nullable(),
  saler: z.string().nullable(),
  suppliers: z.string().nullable(),
  arrivalDate: z.string().nullable(),
  orderDate: z.string().nullable(),
  shipping: z.string().nullable(),
  startDate: z.string().min(1, "กรุณาเลือกวันสั่งซื้อ"),
  docName: z.string().min(1, "กรุณากรอกชื่ออเดอร์"),
  notationType: z.string(),
  expireDate: z.string().min(1, "กรุณาเลือกวันหมดอายุ"),

  note: z.string().optional().nullable(),
  trackingNo: z.string().nullable(),
  refCode: z.string().nullable(),
  docNo: z.string().min(1, "กรุณากรอกหมายเลขออเดอร์"),
  discount: z.coerce.number().nullable(),
  vat: z.coerce.number().nullable(),
  wht: z.coerce.number().nullable(),
  total: z.coerce.number().nullable(),
  grandTotal: z.coerce.number().nullable(),
  net: z.coerce.number().nullable(),
  subTotal: z.coerce.number().nullable(),
  customerId: z.string().min(1, "กรุณาเลือกลูกค้า"),

  company: z.string().optional().nullable(),

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

  discountCode: z.string().optional().nullable(),
  credit: z.string().optional().nullable(),
  discountStep: z.string().optional().nullable(),
  discountType: z.string().optional().nullable(),
  discountNote: z.string().optional().nullable(),
  seal: z.string().optional().nullable(),
  makeSign: z.string().optional().nullable(),
  approvedSign: z.string().optional().nullable(),
  makeByName: z.string().optional().nullable(),
  approvedByName: z.string().optional().nullable(),
  makeByPosition: z.string().optional().nullable(),
  approvedByPosition: z.string().optional().nullable(),
  profile: customerSchema.optional().nullable(),
  orderType: TypeEnum,
  currency: currencyEnum,
  customer: customerSchema.optional(),
  orderDetails: itemSchema,
});

export type NotationFormValues = z.infer<typeof orderFormSchema>;
