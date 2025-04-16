import { z } from "zod";

//
// 🔹 Enum Definitions
//
const DayEnum = z.enum([
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]);

const LanguageEnum = z.enum(["th", "en", "jp"]);

const OrgStatusEnum = z.enum([
  "newly_registered",
  "active",
  "loyal_customer",
  "at_risk",
  "churned",
]);

const FromTypeEnum = z.enum(["ordinary_person", "juristic_person"]);

const OrgTypeEnum = z.enum([
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

const UserStatusEnum = z.enum([
  "active",
  "inactive",
  "on_leave",
  "terminated",
  "pending",
]);

//
// 🔹 Child Schemas
//
const openDaySchema = z.object({
  day: z.array(DayEnum).optional(),
  isOpen: z.boolean().optional(),
  openTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be in HH:mm format")
    .optional(),
  closeTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be in HH:mm format")
    .optional(),
});

const settingSchema = z.object({
  active: z.boolean().optional(),
  theme: z.string().min(1).optional(),
  textDisplay: z.string().min(1).optional(),
  domainName: z
    .string()
    .min(1, "Domain name is required")
    .regex(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid domain format")
    .optional(),
  defaultLanguage: LanguageEnum.optional(),
  openDays: z.array(openDaySchema).optional(),
});

const addressSchema = z.object({
  active: z.boolean().optional(),
  language: z.string().min(1).optional(),
  isMain: z.boolean().optional(),
  name: z.string().min(1, "Address name is required"),
  building: z.string().min(1).optional(),
  roomNo: z.string().min(1).optional(),
  floorNo: z.string().min(1).optional(),
  village: z.string().min(1).optional(),
  villageNo: z.string().min(1).optional(),
  houseNo: z.string().min(1).optional(),
  alley: z.string().min(1).optional(),
  road: z.string().min(1).optional(),
  nation: z.string().min(1).optional(),
  subDistrict: z.string().min(1).optional(),
  city: z.string().min(1, "City is required"),
  province: z.string().min(1, "Province is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  note: z.string().optional(),
});

const profileSchema = z.object({
  prefix: z.string().min(1).optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1),
  birthDate: z.coerce.date().optional(),
  photoUrl: z.string().url("Invalid photo URL").optional(),
  isMobile: z.boolean().optional(),
  deviceToken: z.string().min(1).optional(),
  phone: z
    .string()
    .regex(/^(0[0-9]{9}|\+66[0-9]{8})$/, "Invalid phone number")
    .optional(),
});

const userSchema = z.object({
  active: z.boolean(),
  status: UserStatusEnum,
  email: z.string().email("Invalid email format").min(1),
  password: z.string().min(6).optional(),
  userName: z.string().min(3).optional(),
  profile: profileSchema.optional(),
});

//
// 🔹 Organization Schema
//
export const cre_organizationSchema = z.object({
  active: z.boolean(),
  status: OrgStatusEnum,
  fromType: FromTypeEnum,
  taxId: z
    .string()
    .length(13, "Tax ID must be exactly 13 digits")
    .regex(/^[0-9]{13}$/, "Tax ID must be numeric only"),
  type: OrgTypeEnum,
  openingDate: z.coerce.date().optional(),
  nameTh: z.string().min(1),
  nameEn: z.string().min(1),
  descriptionsTh: z.string().optional(),
  descriptionsEn: z.string().optional(),
  websiteUrl: z.string().url("Invalid website URL").optional(),
  registerVat: z.boolean(),
  contactName: z.string().min(1),
  contactEmail: z.string().email("Invalid email"),
  contactPhone: z
    .string()
    .regex(/^(0[0-9]{9}|\+66[0-9]{8})$/, "Invalid phone number"),
  contactLine: z.string().optional(),
  contactFacebook: z.string().optional(),
  contactWhatsapp: z.string().optional(),
  contactWebsite: z.string().url("Invalid contact website").optional(),
  contactNote: z.string().optional(),
  logoUrl: z.string().url("Invalid logo URL").optional(),
  domainName: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid domain format"),
  user: userSchema.optional(),
  setting: settingSchema.optional(),
  address: addressSchema.optional(),
});

//
// 🔹 Branch Schema
//
export const cre_branchSchema = z.object({
  active: z.boolean(),
  isMain: z.boolean(),
  status: OrgStatusEnum,
  fromType: FromTypeEnum,
  taxId: z
    .string()
    .length(13, "Tax ID must be exactly 13 digits")
    .regex(/^[0-9]{13}$/, "Tax ID must be numeric only"),
  type: OrgTypeEnum,
  openingDate: z.coerce.date().optional(),
  nameTh: z.string().min(1).optional(),
  nameEn: z.string().min(1).optional(),
  descriptionsTh: z.string().optional(),
  descriptionsEn: z.string().optional(),
  websiteUrl: z.string().url("Invalid website URL").optional(),
  registerVat: z.boolean(),
  contactName: z.string().min(1),
  contactEmail: z.string().email("Invalid email"),
  contactPhone: z
    .string()
    .regex(/^(0[0-9]{9}|\+66[0-9]{8})$/, "Invalid phone number"),
  contactLine: z.string().optional(),
  contactFacebook: z.string().optional(),
  contactWhatsapp: z.string().optional(),
  contactWebsite: z.string().url("Invalid contact website").optional(),
  contactNote: z.string().optional(),
  logoUrl: z.string().url("Invalid logo URL").optional(),
  setting: settingSchema.optional(),
  address: addressSchema.optional(),
  user: userSchema.optional(),
});

//
// 🔹 Combined Schema
//
export const createOrgSchema = z.object({
  organization: cre_organizationSchema.optional(),
  branch: cre_branchSchema.optional(),
});

export type CreateOrganizationFormValues = z.infer<typeof createOrgSchema>;

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
