import { z } from "zod";
// import { SupportCustomerFormSchema } from "./support/support";

const CustomerStatusEnum = z.enum([
  "newly_registered",
  "active",
  "loyal_customer",
  "at_risk",
  "churned",
]);

const CustomerTypeEnum = z.enum(["ordinary_person", "juristic_person"]);

const OrganizationTypeEnum = z.enum([
  "taxpayer",
  "ordinary_partnership",
  "shop",
  "body_of_person",
  "others",
]);
export const chartItemSchema = z.object({
  name: z.string().optional(),
  process: z.number().optional(),
});

const NoteSchema = z.object({
  id: z.string(),
  note: z.string(),
});

// Profile
const ProfileSchema = z.object({
  name: z.string().nullable(),
  imageUrl: z.string().optional().nullable(),
  prefix: z.string().optional().nullable(),
  taxId: z
    .string()
    .max(13, "เลขประจำตัวผู้เสียภาษีต้องมี 13 หลัก")
    .optional()
    .nullable(),
  position: z
    .string()
    // .min(1, "กรุณากรอกตำแหน่งของลูกค้า")
    .optional()
    .nullable(),
  country: z.string().optional().nullable(),
  nation: z.string().optional().nullable(),
  lineName: z.string().optional().nullable(),
  faceBookName: z.string().optional().nullable(),
  nickName: z.string().optional().nullable(),
  firstName: z
    .string()
    .nullable()
    .transform((val) => val ?? "")
    .refine((val) => val.trim() !== "", { message: "กรุณากรอกชื่อ" }),

  lastName: z
    .string()
    .nullable()
    // .min(1, "กรุณากรอกนามสกุล")
    .optional(),
  // firstNameTh: z.string().optional(),
  // lastNameTh: z.string().optional(),
  birthDate: z
    .string()
    .optional()
    // .min(1, "กรุณาเลือกวันเดือนปีเกิดลูกค้า")
    .nullable(),
  phone: z.preprocess((val) => {
    if (typeof val === "string" || typeof val === "number") {
      const digits = String(val).replace(/\D/g, "");
      return digits;
    }
    return "";
  }, z.string().max(10, "หมายเลขโทรศัพท์ต้องไม่เกิน 10 หลัก").nullable().optional()),
  gender: z
    .string()
    // .min(1, "กรุณาเลือกเพศของลูกค้า")
    .optional()
    .nullable(),
  age: z.preprocess((val) => {
    if (val === "" || val === undefined) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().nonnegative("อายุต้องไม่ติดลบ").optional().nullable()),
});

// OrganizationDetails
const OrganizationDetailsSchema = z.object({
  fromType: CustomerTypeEnum.optional(),
  orgType: OrganizationTypeEnum.optional(),
  orgTypeOther: z.string().optional().nullable(),
  branchCode: z.string().optional().nullable(),
  businessName: z.string().optional().nullable(),
  businessPhone: z.preprocess((val) => {
    if (typeof val === "string" || typeof val === "number") {
      const digits = String(val).replace(/\D/g, "");
      return digits;
    }
    return "";
  }, z.string().max(9, "หมายเลขโทรศัพท์ต้องไม่เกิน 9 หลัก").optional().nullable()),

  businessFax: z.string().optional().nullable(),
  businessEmail: z.string().nullable().optional(),
  registerVat: z.boolean().optional().nullable(),
  importantDate: z.string().optional().nullable(),
  openingDate: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  websiteUrl: z.string().optional().nullable(),
  descriptions: z.string().optional().nullable(),
});

// Contact
const ContactSchema = z.object({
  name: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  position: z.string().optional().nullable(),
  department: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  contactPlatform: z.string().nullable().optional(),
  platformId: z.string().optional().nullable(),
  isPrimary: z.boolean().optional().nullable(),
});

// Tag
const TagSchema = z.object({
  name: z.string().optional(),
  active: z.boolean().optional(),
});

// Support
const SupportSchema = z.object({
  userId: z
    .string() /* .min(1, "กรุณาเลือกผู้รับผิดชอบ") */
    .optional(),
  isMain: z.boolean().optional(),
});

// Customer Schema
export const CustomerSchema = z.object({
  code: z.string().optional(),
  status: CustomerStatusEnum,
  customerType: CustomerTypeEnum,
  customerPlatform: z.string().optional(),
  // email: z.string().email().optional(),
  lineSubId: z.string().optional().nullable(),
  customerCode: z.string().optional().nullable(),
  refCode: z.string().optional().nullable(),
  branchId: z.string().optional().nullable(),
  progressPercentage: z.number().optional(),
  consentPii: z.boolean().optional(),
  // aiReplyResponseDuration: z
  //   .object({
  //     open: z.string().optional(),
  //     end: z.string().optional(),
  //   })
  //   .optional(),
  isAiReply: z.boolean().optional(),
  priority: z.preprocess((val) => {
    if (typeof val === "string" || typeof val === "number") {
      const num = Number(val);
      return isNaN(num) ? undefined : num;
    }
    return undefined;
  }, z.number().optional()),

  remark: z.string().optional().nullable(),
  note: z.array(NoteSchema).optional().nullable(),
  profile: ProfileSchema.optional(),
  organizationDetails: OrganizationDetailsSchema.optional(),
  contacts: z.array(ContactSchema).optional().nullable(),
  tags: z.array(TagSchema).optional().nullable(),
  supports: z.array(SupportSchema).optional().nullable(),
  /* .min(2, "กรุณาเลือกผู้รับผิดชอบอย่างน้อย 2 คน") 
    .refine((supports) => supports.some((s) => s.isMain === true), {
      message: "กรุณาเลือกผู้รับผิดชอบหลัก 1 คน",
    }) */ active: z.boolean().optional(),
});

export const contactSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "ชื่อห้ามว่าง"),
  phone: z.preprocess(
    (val) => {
      if (typeof val === "string" || typeof val === "number") {
        const digits = String(val).replace(/\D/g, "");
        return digits;
      }
      return "";
    },
    z
      .string()
      // .regex(
      //   /^\d+$/,
      //   "กรุณากรอกเฉพาะตัวเลข"
      // ) .min(9, "หมายเลขโทรศัพท์ต้องไม่น้อยกว่า 9 หลัก")
      .max(10, "หมายเลขโทรศัพท์ต้องไม่เกิน 10 หลัก")
      .optional()
  ),
  position: z.string().optional(),
  department: z.string().optional(),
  email: z.string().email("อีเมลไม่ถูกต้อง").optional(),
  contactPlatform: z.string().optional(),
  platformId: z.string().optional(),
  isPrimary: z.boolean().optional(),
  customerId: z.string().uuid().optional(),
});

export type CustomerValues = z.infer<typeof CustomerSchema>;
export type ContactValues = z.infer<typeof contactSchema>;

export const supportUserSchema = z.object({
  id: z.string().uuid(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().datetime().nullable(),
  createdBy: z.string().nullable(),
  createdById: z.string().nullable(),
  updatedBy: z.string().nullable(),
  updatedById: z.string().nullable(),
  deletedBy: z.string().nullable(),
  deletedById: z.string().nullable(),
  userId: z.string().uuid(),
});

export const QueryCustomerSchema = z.object({
  id: z.string().uuid(),
  status: CustomerStatusEnum,
  type: CustomerTypeEnum,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  deletedAt: z.string().nullable().optional(),
  createdBy: z.string(),
  createdById: z.string().nullable().optional(),
  updatedBy: z.string().nullable().optional(),
  updatedById: z.string().nullable().optional(),
  deletedBy: z.string().nullable().optional(),
  deletedById: z.string().nullable().optional(),
  code: z.string(),
  active: z.boolean(),
  customerType: CustomerTypeEnum,
  name: z.string(),
  imageUrl: z.string().optional(),
  lineSubId: z.string(),
  customerCode: z.string().nullable().optional(),
  refCode: z.string().nullable().optional(),
  progressPercentage: z.number().int().min(0).max(100),
  humanAssistantScores: z.array(z.any()),
  aiAssistantScore: z.number(),
  isAiReply: z.boolean().default(false),
  aiReplyResponseDuration: z.string().optional(),
  priority: z.number().int(),
  remark: z.string().nullable().optional(),
  note: z.string().nullable().optional(),
  branchId: z.string().uuid(),
  organizationDetails: z.any().nullable().optional(),
  contacts: z.array(z.any()),
  supports: z.array(z.any()),
  profile: ProfileSchema.optional(),

  chatRoomAssistantId: z.string().optional(),

  aiReplySettings: z.array(
    z
      .object({
        allDay: z.boolean().default(false),
        remark: z.string().nullable().optional(),
        enabled: z.boolean().default(true),
        startTime: z.string().optional().nullable(),
        endTime: z.string().optional().nullable(),
        timezone: z.string().min(1).nullable().optional(),
        aiReplyResponseDuration: z.number().int().min(0).default(10),
      })
      .optional()
      .nullable()
  ),
});

export type Customer = z.infer<typeof QueryCustomerSchema>;
export type SupportUserValues = z.infer<typeof supportUserSchema>;
