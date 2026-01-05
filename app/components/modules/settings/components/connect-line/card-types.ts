import type { CardCategoryId } from "./card-category-dialog";

export interface ProductCardFormValues {
  tagEnabled: boolean;
  tagText: string;
  tagColor: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  description: string;
  priceEnabled: boolean;
  currency: "THB" | "USD";
  price: string;
  ctaPrimaryEnabled: boolean;
  ctaPrimaryText: string;
  ctaSecondaryEnabled: boolean;
  ctaSecondaryText: string;
}

export interface PlaceCardFormValues {
  tagEnabled: boolean;
  tagText: string;
  tagColor: string;
  imageUrl: string;
  title: string;
  addressEnabled: boolean;
  addressText: string;
  addressLabel: string;
  extraInfoEnabled: boolean;
  extraInfoType: "time" | "phone" | "custom";
  extraInfoValue: string;
  ctaPrimaryEnabled: boolean;
  ctaPrimaryType: "link" | "map" | "call";
  ctaPrimaryText: string;
  ctaSecondaryEnabled: boolean;
  ctaSecondaryType: "link" | "map" | "call";
  ctaSecondaryText: string;
}

export type PersonActionType = "link" | "call" | "chat";

export interface PersonCardTagFormValue {
  enabled: boolean;
  text: string;
  color: string;
}

export interface PersonCardActionFormValue {
  enabled: boolean;
  type: PersonActionType;
  text: string;
}

export interface PersonCardFormValues {
  imageUrl: string;
  name: string;
  descriptionEnabled: boolean;
  description: string;
  tags: PersonCardTagFormValue[];
  actions: PersonCardActionFormValue[];
}

export interface ImageCardFormValues {
  tagEnabled: boolean;
  tagText: string;
  tagColor: string;
  imageUrl: string;
  actionEnabled: boolean;
  actionType: "link" | "map" | "call";
  actionText: string;
}

export interface MessageCardFormValues {
  name: string;
  category: CardCategoryId | "";
  product: ProductCardFormValues;
  place: PlaceCardFormValues;
  person: PersonCardFormValues;
  image: ImageCardFormValues;
}

export const PRODUCT_CARD_DEFAULT_VALUES: ProductCardFormValues = {
  tagEnabled: true,
  tagText: "",
  tagColor: "#4B5D73",
  imageUrl: "",
  title: "",
  subtitle: "",
  description: "",
  priceEnabled: true,
  currency: "THB",
  price: "",
  ctaPrimaryEnabled: true,
  ctaPrimaryText: "",
  ctaSecondaryEnabled: false,
  ctaSecondaryText: "",
};

export const PLACE_CARD_DEFAULT_VALUES: PlaceCardFormValues = {
  tagEnabled: true,
  tagText: "",
  tagColor: "#4B5D73",
  imageUrl: "",
  title: "",
  addressEnabled: true,
  addressText: "",
  addressLabel: "ตำแหน่งที่ตั้ง",
  extraInfoEnabled: true,
  extraInfoType: "time",
  extraInfoValue: "",
  ctaPrimaryEnabled: true,
  ctaPrimaryType: "link",
  ctaPrimaryText: "",
  ctaSecondaryEnabled: false,
  ctaSecondaryType: "link",
  ctaSecondaryText: "",
};

const PERSON_TAG_DEFAULT: PersonCardTagFormValue = {
  enabled: true,
  text: "",
  color: "#4B5D73",
};

const PERSON_ACTION_DEFAULT: PersonCardActionFormValue = {
  enabled: true,
  type: "link",
  text: "",
};

export const PERSON_CARD_DEFAULT_VALUES: PersonCardFormValues = {
  imageUrl: "",
  name: "",
  descriptionEnabled: true,
  description: "",
  tags: [
    { ...PERSON_TAG_DEFAULT },
    { ...PERSON_TAG_DEFAULT, enabled: false },
    { ...PERSON_TAG_DEFAULT, enabled: false },
  ],
  actions: [
    { ...PERSON_ACTION_DEFAULT },
    { ...PERSON_ACTION_DEFAULT, enabled: false },
  ],
};

export const IMAGE_CARD_DEFAULT_VALUES: ImageCardFormValues = {
  tagEnabled: true,
  tagText: "",
  tagColor: "#4B5D73",
  imageUrl: "",
  actionEnabled: true,
  actionType: "link",
  actionText: "",
};

export const MESSAGE_CARD_DEFAULT_VALUES: MessageCardFormValues = {
  name: "",
  category: "",
  product: { ...PRODUCT_CARD_DEFAULT_VALUES },
  place: { ...PLACE_CARD_DEFAULT_VALUES },
  person: { ...PERSON_CARD_DEFAULT_VALUES },
  image: { ...IMAGE_CARD_DEFAULT_VALUES },
};
