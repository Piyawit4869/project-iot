import { z } from "zod";

// Chidren Schema
const openDaySchema = z.object({
  day: z.array(z.string()),
  isOpen: z.boolean(),
  openTime: z.string(),
  closeTime: z.string(),
});

const settingSchema = z.object({
  active: z.boolean(),
  theme: z.string(),
  textDisplay: z.string(),
  domainName: z.string(),
  defaultLanguage: z.string(),
  openDays: z.array(openDaySchema),
});

const addressSchema = z.object({
  active: z.boolean().optional(),
  language: z.string().optional(),
  isMain: z.boolean().optional(),
  name: z.string(),
  building: z.string().optional(),
  roomNo: z.string().optional(),
  floorNo: z.string().optional(),
  village: z.string().optional(),
  villageNo: z.string().optional(),
  houseNo: z.string().optional(),
  alley: z.string().optional(),
  road: z.string().optional(),
  nation: z.string().optional(),
  subDistrict: z.string().optional(),
  city: z.string(),
  province: z.string(),
  postalCode: z.string(),
  note: z.string().optional(),
});

const profileSchema = z.object({
  prefix: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  birthDate: z.string().optional(),
  photoUrl: z.string().url().optional(),
  isMobile: z.boolean().optional(),
  deviceToken: z.string().optional(),
  phone: z.string().regex(/^(0|\\+66)[0-9]{8,9}$/),
});

const userSchema = z.object({
  active: z.boolean().optional(),
  status: z.string(),
  email: z.string().email(),
  password: z.string(),
  userName: z.string(),
  profile: profileSchema,
});

// Main Schemas
const organizationSchema = z.object({
  active: z.boolean(),
  status: z.string(),
  fromType: z.string(),
  taxId: z.string(),
  type: z.string(),
  openingDate: z.string().optional(),
  nameTh: z.string(),
  nameEn: z.string(),
  descriptionsTh: z.string().optional(),
  descriptionsEn: z.string().optional(),
  websiteUrl: z.string().url().optional(),
  registerVat: z.boolean(),
  contactName: z.string(),
  contactEmail: z.string().email(),
  contactPhone: z.string(),
  contactLine: z.string().optional(),
  contactFacebook: z.string().optional(),
  contactWhatsapp: z.string().optional(),
  contactWebsite: z.string().url().optional(),
  contactNote: z.string().optional(),
  logoUrl: z.string().nullable().optional(),
  domainName: z.string(),
  user: userSchema,
  setting: settingSchema,
  address: addressSchema,
});

const branchSchema = z.object({
  active: z.boolean(),
  isMain: z.boolean(),
  status: z.string(),
  fromType: z.string(),
  taxId: z.string(),
  type: z.string(),
  openingDate: z.string().optional(),
  nameTh: z.string().optional(),
  nameEn: z.string().optional(),
  descriptionsTh: z.string().optional(),
  descriptionsEn: z.string().optional(),
  websiteUrl: z.string().url().optional(),
  registerVat: z.boolean(),
  contactName: z.string(),
  contactEmail: z.string().email(),
  contactPhone: z.string(),
  contactLine: z.string().optional(),
  contactFacebook: z.string().optional(),
  contactWhatsapp: z.string().optional(),
  contactWebsite: z.string().url().optional(),
  contactNote: z.string().optional(),
  logoUrl: z.string().url().optional(),
  setting: settingSchema,
  address: addressSchema,
  user: userSchema,
});

// Combined schema
export const createOrgSchema = z.object({
  organization: organizationSchema,
  branch: branchSchema,
});
