import { z } from "zod";

// Chidren Schema
const openDaySchema = z.object({
  day: z.array(z.string()),
  isOpen: z.boolean(),
  openTime: z.string().default(""),
  closeTime: z.string().default(""),
});

const settingSchema = z.object({
  active: z.boolean(),
  theme: z.string().default(""),
  textDisplay: z.string().default(""),
  domainName: z.string().default(""),
  defaultLanguage: z.enum(["th", "en", "jp"]),
  openDays: z.array(openDaySchema),
});

const addressSchema = z.object({
  active: z.boolean(),
  language: z.string().default(""),
  isMain: z.boolean(),
  name: z.string().default(""),
  building: z.string().default(""),
  roomNo: z.string().default(""),
  floorNo: z.string().default(""),
  village: z.string().default(""),
  villageNo: z.string().default(""),
  houseNo: z.string().default(""),
  alley: z.string().default(""),
  road: z.string().default(""),
  nation: z.string().default(""),
  subDistrict: z.string().default(""),
  city: z.string().default(""),
  province: z.string().default(""),
  postalCode: z.string().default(""),
  note: z.string().default(""),
});

const profileSchema = z.object({
  prefix: z.string().default(""),
  firstName: z.string().default(""),
  lastName: z.string().default(""),
  birthDate: z.coerce.date(),
  photoUrl: z.string().url().default(""),
  isMobile: z.boolean(),
  deviceToken: z.string().default(""),
  phone: z
    .string()
    .regex(/^(0|\\+66)[0-9]{8,9}$/)
    .length(10)
    .default(""),
});

const userSchema = z.object({
  active: z.boolean(),
  status: z.enum(["active", "inactive", "terminated", "pending"]),
  email: z.string().email().default(""),
  password: z.string().min(6).default(""),
  userName: z.string().default(""),
  profile: profileSchema,
});

// Main Schemas
const cre_organizationSchema = z.object({
  active: z.boolean(),
  status: z.string().default(""),
  fromType: z.string().default(""),
  taxId: z.string().default(""),
  type: z.string().default(""),
  openingDate: z.coerce.date(),
  nameTh: z.string().default(""),
  nameEn: z.string().default(""),
  descriptionsTh: z.string().default(""),
  descriptionsEn: z.string().default(""),
  websiteUrl: z.string().url().default(""),
  registerVat: z.boolean(),
  contactName: z.string().default(""),
  contactEmail: z.string().email().default(""),
  contactPhone: z
    .string()
    .regex(/^(0|\\+66)[0-9]{8,9}$/)
    .length(10)
    .default(""),
  contactLine: z.string().default(""),
  contactFacebook: z.string().default(""),
  contactWhatsapp: z.string().default(""),
  contactWebsite: z.string().url().default(""),
  contactNote: z.string().default(""),
  logoUrl: z.string().default(""),
  domainName: z.string().default(""),
  user: userSchema,
  setting: settingSchema,
  address: addressSchema,
});

const cre_branchSchema = z.object({
  active: z.boolean(),
  isMain: z.boolean(),
  status: z.enum([
    "newly_registered",
    "active",
    "loyal_customer",
    "at_risk",
    "churned",
  ]),
  fromType: z.enum(["ordinary_person", "juristic_person"]),
  taxId: z.string().default(""),
  type: z.enum([
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
  ]),
  openingDate: z.coerce.date(),
  nameTh: z.string().default(""),
  nameEn: z.string().default(""),
  descriptionsTh: z.string().default(""),
  descriptionsEn: z.string().default(""),
  websiteUrl: z.string().url().default(""),
  registerVat: z.boolean(),
  contactName: z.string().default(""),
  contactEmail: z.string().email().default(""),
  contactPhone: z
    .string()
    .regex(/^(0|\\+66)[0-9]{8,9}$/)
    .length(10)
    .default(""),
  contactLine: z.string().default(""),
  contactFacebook: z.string().default(""),
  contactWhatsapp: z.string().default(""),
  contactWebsite: z.string().url().default(""),
  contactNote: z.string().default(""),
  logoUrl: z.string().default(""),
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
  active: z.boolean(),
  status: z.string().default(""),
  fromType: z.string().default(""),
  taxId: z
    .string()
    .length(13, { message: "Tax ID must be exactly 13 digits." })
    .regex(/^\d+$/, { message: "Tax ID must contain only numbers." })
    .default(""),

  type: z.string().default(""),
  code: z.string().default(""),
  openingDate: z.date(),
  nameTh: z.string().default(""),
  nameEn: z.string().default(""),
  descriptionsTh: z.string().default(""),
  descriptionsEn: z.string().default(""),
  websiteUrl: z.string().url().default(""),
  registerVat: z.boolean(),
  contactName: z.string().default(""),
  contactEmail: z.string().email().default(""),
  contactPhone: z
    .string()
    .regex(/^(0|\\+66)[0-9]{8,9}$/)
    .length(10)
    .default(""),
  contactLine: z.string().default(""),
  contactFacebook: z.string().default(""),
  contactWhatsapp: z.string().default(""),
  contactWebsite: z.string().url().default(""),
  contactNote: z.string().default(""),
  logoUrl: z.string().url().default(""),
});

export const up_branchSchema = z.object({
  organizationId: z.string().uuid().default(""),
  active: z.boolean(),
  isMain: z.boolean(),
  status: z.string().default(""),
  fromType: z.string().default(""),
  taxId: z.string().default(""),
  type: z.string().default(""),
  code: z.string().default(""),
  openingDate: z.date(),
  nameTh: z.string().default(""),
  nameEn: z.string().default(""),
  descriptionsTh: z.string().default(""),
  descriptionsEn: z.string().default(""),
  websiteUrl: z.string().url().default(""),
  registerVat: z.boolean(),
  contactName: z.string().default(""),
  contactEmail: z.string().email().default(""),
  contactPhone: z
    .string()
    .regex(/^(0|\\+66)[0-9]{8,9}$/)
    .length(10)
    .default(""),
  contactLine: z.string().default(""),
  contactFacebook: z.string().default(""),
  contactWhatsapp: z.string().default(""),
  contactWebsite: z.string().url().default(""),
  contactNote: z.string().default(""),
  logoUrl: z.string().url().default(""),
});

export type up_OrganizationFormValues = z.infer<typeof up_organizationSchema>;
