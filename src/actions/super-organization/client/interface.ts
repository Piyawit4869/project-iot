export interface Profile {
  prefix: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  birthDate: string | undefined;
  photoUrl: string | undefined;
  isMobile: boolean | undefined;
  deviceToken: string | undefined;
  phone: string | undefined;
}

export interface User {
  active: boolean | undefined;
  status: string | undefined;
  email: string | undefined;
  password: string | undefined;
  userName: string | undefined;
  profile: Profile | undefined;
}

export interface OpenDay {
  day: string[] | undefined;
  isOpen: boolean | undefined;
  openTime: string | undefined;
  closeTime: string | undefined;
}

export interface Setting {
  active: boolean | undefined;
  theme: string | undefined;
  textDisplay: string | undefined;
  domainName: string | undefined;
  defaultLanguage: string | undefined;
  openDays: OpenDay[] | undefined;
}

export interface Address {
  active: boolean | undefined;
  language: string | undefined;
  isMain: boolean | undefined;
  name: string | undefined;
  building: string | undefined;
  roomNo: string | undefined;
  floorNo: string | undefined;
  village: string | undefined;
  villageNo: string | undefined;
  houseNo: string | undefined;
  alley: string | undefined;
  road: string | undefined;
  nation: string | undefined;
  subDistrict: string | undefined;
  city: string | undefined;
  province: string | undefined;
  postalCode: string | undefined;
  note: string | undefined;
}

export interface Organization {
  active: boolean | undefined;
  status: string | undefined;
  fromType: string | undefined;
  taxId: string | undefined;
  type: string | undefined;
  openingDate: string | undefined;
  nameTh: string | undefined;
  nameEn: string | undefined;
  descriptionsTh: string | undefined;
  descriptionsEn: string | undefined;
  websiteUrl: string | undefined;
  registerVat: boolean | undefined;
  contactName: string | undefined;
  contactEmail: string | undefined;
  contactPhone: string | undefined;
  contactLine: string | undefined;
  contactFacebook: string | undefined;
  contactWhatsapp: string | undefined;
  contactWebsite: string | undefined;
  contactNote: string | undefined;
  logoUrl: string | null | undefined;
  domainName: string | undefined;
  user: User | undefined;
  setting: Setting | undefined;
  address: Address | undefined;
}

export interface Branch extends Omit<Organization, "user" | "domainName"> {
  isMain: boolean | undefined;
  user: User | undefined;
}
