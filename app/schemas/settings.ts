import { z } from "zod";

const statusEnum = z.enum([
  "newly_registered",
  "active",
  "loyal_customer",
  "at_risk",
  "churned",
]);

const typeEnum = z.enum([
  "taxpayer",
  "ordinary_partnership",
  "shop",
  "body_of_person",
  "company_limited",
  "public_company_limited",
  "limited_partnership",
  "foundation",
  "association",
  "joint_venture",
  "others",
]);

export const organizationSchema = z.object({
  active: z.boolean().optional(),
  status: statusEnum.optional(),
  isMain: z.boolean().optional(),
  fromType: z.string().default("ordinary_person"),
  taxId: z
    .string()
    .length(13, { message: "Tax ID must be exactly 13 digits." })
    .optional(),
  branchType: typeEnum.optional(),
  code: z.string().min(1, "รหัสไม่ควรเป็นค่าว่าง").optional(),
  openingDate: z.string().optional(),
  nameTh: z.string().min(1, "กรุณากรอกขื่อ"),
  nameEn: z.string().min(1, "กรุณากรอกขื่อ"),
  descriptionsTh: z.string().optional(),
  descriptionsEn: z.string().optional(),
  websiteUrl: z.url().optional(),
  registerVat: z.boolean().optional(),
  contactName: z.string().optional(),
  contactEmail: z.email().optional(),
  contactPhone: z.string().optional(),
  contactLine: z.string().optional(),
  contactFacebook: z.string().optional(),
  contactWhatsapp: z.string().optional(),
  contactWebsite: z.url().optional(),
  contactNote: z.string().optional(),
  logoUrl: z.string().default(""),
  domainName: z.string().optional(),
});

export type OrganizationFormValues = z.infer<typeof organizationSchema>;

export const addressSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "กรุณากรอกชื่อสถานที่ตั้ง"),
  building: z.string().optional(),
  village: z.string().optional(),
  roomNo: z.string().optional(),
  floorNo: z.string().optional(),
  villageNo: z.coerce.number().optional(),
  houseNo: z.string().optional(),
  alley: z.string().optional(),
  road: z.string().optional(),
  subDistrict: z.string().optional(),
  city: z.string().min(1, "กรุณากรอกชื่ออำเภอ"),
  province: z.string().min(1, "กรุณากรอกชื่อจังหวัด"),
  nation: z.string().optional(),
  postalCode: z.string().min(1, "กรุณากรอกรหัสไปรษณีย์"),
  note: z.string().optional(),
  isMain: z.boolean().optional(),
});

export type AddressSchemaValues = z.infer<typeof addressSchema>;

export const SettingSchema = z.object({
  id: z.uuid().optional(),
  active: z.boolean().optional(),
  isMain: z.boolean().optional(),
  theme: z.string().nullable(),
  textDisplay: z.string().nullable().optional(),
  defaultLanguage: z.string().nullable(),
  openDays: z.unknown().nullable().optional(),
  organizationId: z.uuid().optional(),
  branchId: z.uuid().optional(),
});

export type SettingSchemaValues = z.infer<typeof SettingSchema>;

export const ConnectLineSchema = z.object({
  id: z.uuid().optional(),
  name: z.string().min(1, "กรุณากรอก"),
  channelId: z
    .string()
    .min(1, "กรุณากรอก Channel ID")
    .max(100, "Channel ID ยาวเกินไป")
    .optional(),
  channelSecret: z
    .string()
    .min(1, "กรุณากรอก Channel Secret")
    .max(200, "Channel Secret ยาวเกินไป")
    .optional(),
  accessToken: z
    .string()
    .min(1, "กรุณากรอก Channel access token")
    .max(500, "Token ยาวเกินไป")
    .optional(),
});

export type ConnectLineValues = z.infer<typeof ConnectLineSchema>;

export const ConnectAiSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "กรุณากรอก"),
  systemInstructions: z.string().optional(),
  useStock: z.boolean().optional(),
  consentPii: z.boolean().optional(),
  temperature: z.preprocess((val) => {
    if (val === "" || val === undefined) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().min(0).max(2).optional()),
  topP: z.preprocess((val) => {
    if (val === "" || val === undefined) return undefined;
    const num = Number(val);
    return isNaN(num) ? undefined : num;
  }, z.number().min(0).max(1).optional()),

  // logoUrl: z.string(),
  // channelId: z.string(),
  // channelSecret: z.string(),
  // accessToken: z.string(),
  aiKey: z.string().optional(),
  openAssistantId: z.string().optional(),
  note: z.string().optional(),
  remark: z.string().min(1, "กรุณากรอก"),
  defaultIsAiReply: z.boolean(),
  branchId: z.string().uuid(),
  model: z.string().optional(),
  // organizationId: z.string().uuid(),
  // createdAt: z.string().refine((value) => !isNaN(Date.parse(value)), {
  //   message: "Invalid date format",
  // }),
  // updatedAt: z.string().refine((value) => !isNaN(Date.parse(value)), {
  //   message: "Invalid date format",
  // }),
  // deletedAt: z
  //   .string()
  //   .nullable()
  //   .refine((value) => value === null || !isNaN(Date.parse(value)), {
  //     message: "Invalid date format",
  //   }),
  // createdBy: z.string().nullable(),
  // createdById: z.string().nullable(),
  // updatedBy: z.string(),
  // updatedById: z.string().uuid(),
  // deletedBy: z.string().nullable(),
  // deletedById: z.string().nullable(),
  active: z.boolean(),
});

export type ConnectAiValues = z.infer<typeof ConnectAiSchema>;

export const chatRoomSchema = z.object({
  id: z.string().uuid(),
  active: z.boolean(),
  name: z.string(),
  imageUrl: z.string(),
  description: z.string(),
  status: z.string(),
  customerId: z.string().uuid(),
  branchId: z.string().uuid(),
  customer: z.object({
    lineSubId: z.string().optional(),
    id: z.string().uuid(),
    imageUrl: z.string().nullable(),
    fullName: z.string(),
  }),

  users: z.array(
    z
      .object({
        id: z.string().uuid(),
        imageUrl: z.string(),
        fullName: z.string(),
        employeeRoleName: z.string(),
      })
      .optional()
  ),
  latestMessage: z.object({
    id: z.string().uuid(),
    message: z.string(),
    createdAt: z.string().datetime(),
  }),
});

export type ChatRoomSchemaType = z.infer<typeof chatRoomSchema>;

export const pushMessageSchema = z.object({
  chatRoomId: z.string(),
  lineSubId: z.string().optional(),
  message: z.string(),
  messageType: z.string(),
  isAiReply: z.boolean(),
  recipient: z.string().optional(),
  customerId: z.string().uuid().optional(),
  platform: z.string(),
  messageLabel: z.string(),
});

export type PushMessageValues = z.infer<typeof pushMessageSchema>;
