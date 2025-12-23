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
  channelAccessToken: z
    .string()
    .min(1, "กรุณากรอก Channel access token")
    .max(500, "Token ยาวเกินไป")
    .optional(),
});

export type ConnectLineValues = z.infer<typeof ConnectLineSchema>;

// --------------------- create org ---------------------

/* ---------- Open Day ---------- */
const WorkingHoursSchema = z.record(
  z.enum([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]),
  z.object({
    open: z.string().optional(),
    close: z.string().optional(),
  })
);
/* ---------- Setting ---------- */
export const SettingThemeSchema = z.object({
  active: z.boolean(),
  theme: z.enum(["light", "dark"]).optional(),
  textDisplay: z.string().optional().nullable(),
  defaultLanguage: z.enum(["TH", "EN"]).optional().nullable(),
  openDays: WorkingHoursSchema,
});

/* ---------- Address ---------- */

export const AddressSchema = z.object({
  active: z.boolean(),
  name: z.string().optional().nullable(),
  building: z.string().optional().nullable(),
  roomNo: z.string().optional().nullable(),
  floorNo: z.string().optional().nullable(),
  village: z.string().optional().nullable(),
  villageNo: z.coerce.number().optional(),
  houseNo: z.string().optional().nullable(),
  alley: z.string().optional().nullable(),
  road: z.string().optional().nullable(),
  nation: z.string().optional().nullable(),
  subDistrict: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  province: z.string().optional().nullable(),
  postalCode: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  organizationId: z.string().optional().nullable(),
});

/* ---------- Main Branch ---------- */
export const OrganizationSchema = z.object({
  code: z.string().optional().nullable(),
  active: z.boolean().optional().nullable(),
  isMain: z.boolean().optional().nullable(),

  status: z.string().optional().nullable(),
  fromType: z.string().optional().nullable(),
  taxId: z.string().optional().nullable(),
  branchType: z.string().optional().nullable(),

  openingDate: z.string().optional().nullable(), // หรือ .date() ถ้าแปลงก่อน
  nameTh: z.string().optional().nullable(),
  nameEn: z.string().optional().nullable(),
  descriptionsTh: z.string().optional().optional().nullable(),
  descriptionsEn: z.string().optional().optional().nullable(),
  websiteUrl: z.string().optional().optional().nullable(),

  registerVat: z.boolean(),

  logoUrl: z.string().optional().nullable(),

  setting: SettingThemeSchema,
  address: AddressSchema,

  organizationId: z.string().optional().nullable(),
});

/* ---------- Type ---------- */

export type BranchesOrganization = z.infer<typeof OrganizationSchema>;
export type Address = z.infer<typeof AddressSchema>;
// ------------------------------------------

export const ReplySchema = z.object({
  name: z.string().min(1, "กรุณากรอกชื่อ").max(30),
  description: z.string().optional(),
  content: z.string().min(1, "กรุณากรอกข้อความ").max(1000),
});
export type ReplyValues = z.infer<typeof ReplySchema>;

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
  // remark: z.string().min(1, "กรุณากรอก"),
  remark: z.string().nullable(),
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
    id: z.string(),
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
  customerId: z.string().optional(),
  platform: z.string(),
  messageLabel: z.string(),
  packageId: z.string().optional(),
  stickerId: z.string().optional(),
});

export type PushMessageValues = z.infer<typeof pushMessageSchema>;

// message item
const MessageItemSchema = z.object({
  type: z.enum(["text"]), // ถ้ามี media อื่นในอนาคต สามารถเพิ่มได้
  text: z.string(),
});

// content
const ContentSchema = z.object({
  messages: z.array(MessageItemSchema),
});

// full schema (ใช้ตอน fetch จาก DB)
const TeamMessageSchema = z.object({
  id: z.string(),
  active: z.boolean().default(true),
  name: z.string(),
  description: z.string().nullable().optional(),
  isFavorite: z.boolean().default(false),
  type: z.enum(["text"]), // ถ้ารองรับหลายชนิด เพิ่มที่นี่
  content: ContentSchema,
});

// create schema (ตอนสร้างใหม่)
const TeamMessageCreateSchema = z.object({
  active: z.boolean().default(true),
  name: z.string(),
  description: z.string().nullable().optional(),
  isFavorite: z.boolean().default(false),
  type: z
    .enum(["card", "reply", "quick_reply", "location", "flex", "bubble"])
    .default("reply"),
  // content: ContentSchema,
  content: z.string(),
});

// list schema
const TeamMessageListSchema = z.array(TeamMessageSchema);

// types
export type TeamMessage = z.infer<typeof TeamMessageSchema>;
export type TeamMessageCreateDTO = z.infer<typeof TeamMessageCreateSchema>;
export type TeamMessageList = TeamMessage[];

export {
  TeamMessageSchema,
  TeamMessageCreateSchema,
  TeamMessageListSchema,
  ContentSchema,
  MessageItemSchema,
};
