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
