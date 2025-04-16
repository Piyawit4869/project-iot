import { z } from "zod";

// Chidren Schema
const openDaySchema = z.object({
  day: z.array(z.string()).optional(),
  isOpen: z.boolean().optional(),
  openTime: z.string().default("").optional(),
  closeTime: z.string().default("").optional(),
});

const settingSchema = z.object({
  active: z.boolean().optional(),
  theme: z.string().default("").optional(),
  textDisplay: z.string().default("").optional(),
  domainName: z.string().default("").optional(),
  defaultLanguage: z.enum(["th", "en", "jp"]).optional(),
  openDays: z.array(openDaySchema).optional(),
});

const addressSchema = z.object({
  active: z.boolean().optional(),
  language: z.string().default("").optional(),
  isMain: z.boolean().optional(),
  name: z.string().default("").optional(),
  building: z.string().default("").optional(),
  roomNo: z.string().default("").optional(),
  floorNo: z.string().default("").optional(),
  village: z.string().default("").optional(),
  villageNo: z.string().default("").optional(),
  houseNo: z.string().default("").optional(),
  alley: z.string().default("").optional(),
  road: z.string().default("").optional(),
  nation: z.string().default("").optional(),
  subDistrict: z.string().default("").optional(),
  city: z
    .string({
      required_error: "กรุณากรอกชื่อเมือง",
    })
    .min(1, "กรุณากรอกชื่อเมือง")
    .optional(),
  province: z.string().default("").optional(),
  postalCode: z.string().default("").optional(),
  note: z.string().default("").optional(),
});

const profileSchema = z.object({
  prefix: z.string().default("").optional(),
  firstName: z.string().default("").optional(),
  lastName: z.string().default("").optional(),
  birthDate: z.coerce.date().optional(),
  photoUrl: z.string().url().default("").optional(),
  isMobile: z.boolean().optional(),
  deviceToken: z.string().default("").optional(),
  phone: z
    .string()
    .regex(/^(0|\\+66)[0-9]{8,9}$/)
    .length(10)
    .default("")
    .optional(),
});

const userSchema = z.object({
  active: z.boolean().optional(),
  status: z.enum(["active", "inactive", "terminated", "pending"]).optional(),
  email: z.string().email().default("").optional(),
  password: z.string().min(6).default("").optional(),
  userName: z.string().default("").optional(),
  profile: profileSchema,
});

// Main Schemas
const cre_organizationSchema = z.object({
  active: z.boolean().optional(),
  status: z.string().default("").optional(),
  fromType: z.string().default("").optional(),
  taxId: z.string().default("").optional(),
  type: z.string().default("").optional(),
  openingDate: z.coerce.date().optional(),
  nameTh: z.string().default("").optional(),
  nameEn: z.string().default("").optional(),
  descriptionsTh: z.string().default("").optional(),
  descriptionsEn: z.string().default("").optional(),
  websiteUrl: z.string().url().default("").optional(),
  registerVat: z.boolean().optional(),
  contactName: z.string().default("").optional(),
  contactEmail: z.string().email().default("").optional(),
  contactPhone: z
    .string()
    .regex(/^(0|\\+66)[0-9]{8,9}$/)
    .length(10)
    .default("")
    .optional(),
  contactLine: z.string().default("").optional(),
  contactFacebook: z.string().default("").optional(),
  contactWhatsapp: z.string().default("").optional(),
  contactWebsite: z.string().url().default("").optional(),
  contactNote: z.string().default("").optional(),
  logoUrl: z.string().default("").optional(),
  domainName: z.string().default("").optional(),
  user: userSchema,
  setting: settingSchema,
  address: addressSchema,
});

const cre_branchSchema = z.object({
  active: z.boolean().optional(),
  isMain: z.boolean().optional(),
  status: z
    .enum([
      "newly_registered",
      "active",
      "loyal_customer",
      "at_risk",
      "churned",
    ])
    .optional(),
  fromType: z.enum(["ordinary_person", "juristic_person"]).optional(),
  taxId: z.string().default("").optional(),
  type: z
    .enum([
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
    ])
    .optional(),
  openingDate: z.coerce.date().optional(),
  nameTh: z.string().default("").optional(),
  nameEn: z.string().default("").optional(),
  descriptionsTh: z.string().default("").optional(),
  descriptionsEn: z.string().default("").optional(),
  websiteUrl: z.string().url().default("").optional(),
  registerVat: z.boolean().optional(),
  contactName: z.string().default("").optional(),
  contactEmail: z.string().email().default("").optional(),
  contactPhone: z
    .string()
    .regex(/^(0|\\+66)[0-9]{8,9}$/)
    .length(10)
    .default("")
    .optional(),
  contactLine: z.string().default("").optional(),
  contactFacebook: z.string().default("").optional(),
  contactWhatsapp: z.string().default("").optional(),
  contactWebsite: z.string().url().default("").optional(),
  contactNote: z.string().default("").optional(),
  logoUrl: z.string().default("").optional(),
  setting: settingSchema,
  address: addressSchema,
  user: userSchema,
});

// Combined schema
export const createOrgSchema = z.object({
  organization: cre_organizationSchema ?? {},
  branch: cre_branchSchema ?? {},
});

export type cre_OrganizationFormValues = z.infer<typeof createOrgSchema>;

export const up_organizationSchema = z.object({
  active: z.boolean().optional(),
  status: z.string().default("").optional(),
  fromType: z.string().default("").optional(),
  taxId: z
    .string()
    .length(13, { message: "Tax ID must be exactly 13 digits." })
    .regex(/^\d+$/, { message: "Tax ID must contain only numbers." })
    .default("")
    .optional(),

  type: z.string().default("").optional(),
  code: z.string().default("").optional(),
  openingDate: z.date().optional(),
  nameTh: z.string().default("").optional(),
  nameEn: z.string().default("").optional(),
  descriptionsTh: z.string().default("").optional(),
  descriptionsEn: z.string().default("").optional(),
  websiteUrl: z.string().url().default("").optional(),
  registerVat: z.boolean().optional(),
  contactName: z.string().default("").optional(),
  contactEmail: z.string().email().default("").optional(),
  contactPhone: z
    .string()
    .regex(/^(0|\\+66)[0-9]{8,9}$/)
    .length(10)
    .default("")
    .optional(),
  contactLine: z.string().default("").optional(),
  contactFacebook: z.string().default("").optional(),
  contactWhatsapp: z.string().default("").optional(),
  contactWebsite: z.string().url().default("").optional(),
  contactNote: z.string().default("").optional(),
  logoUrl: z.string().url().default("").optional(),
});

export const up_branchSchema = z.object({
  organizationId: z.string().uuid().default("").optional(),
  active: z.boolean().optional(),
  isMain: z.boolean().optional(),
  status: z.string().default("").optional(),
  fromType: z.string().default("").optional(),
  taxId: z.string().length(13).default("").optional(),
  type: z.string().default("").optional(),
  code: z.string().default("").optional(),
  openingDate: z.date().optional(),
  nameTh: z.string().default("").optional(),
  nameEn: z.string().default("").optional(),
  descriptionsTh: z.string().default("").optional(),
  descriptionsEn: z.string().default("").optional(),
  websiteUrl: z.string().url().default("").optional(),
  registerVat: z.boolean().optional(),
  contactName: z.string().default("").optional(),
  contactEmail: z.string().email().default("").optional(),
  contactPhone: z
    .string()
    .regex(/^(0|\\+66)[0-9]{8,9}$/)
    .length(10)
    .default("")
    .optional(),
  contactLine: z.string().default("").optional(),
  contactFacebook: z.string().default("").optional(),
  contactWhatsapp: z.string().default("").optional(),
  contactWebsite: z.string().url().default("").optional(),
  contactNote: z.string().default("").optional(),
  logoUrl: z.string().url().default("").optional(),
});

export type up_OrganizationFormValues = z.infer<typeof up_organizationSchema>;
