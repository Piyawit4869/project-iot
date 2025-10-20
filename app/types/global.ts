import type { ReactNode } from "react";

export type Item =
  | {
      id?: string;
      imageUrl?: string;
      name?: string;
      status?: string;
      price?: number | string;
      salePrice?: number | string;
      description?: string;
      sku?: string;
      vatPrice?: number | string;
      unit?: number | string;
      discountPrice?: number | string;
    }
  | undefined
  | null;

export enum MessageLabelType {
  SENDTEXT = "ส่งข้อความ", //"send-text",
  SENDIMAGE = "ส่งรูปภาพ",
  SENDSTICKER = "ส่งสติ้กเกอร์",
}

export type FilterKind =
  | "text"
  | "select"
  | "boolean"
  | "numberRange"
  | "number"
  | "dateRange"
  | "date";

export type FilterField = {
  id: string;
  path?: string;
  label: ReactNode | string;
  kind: FilterKind;
  options?: { label: string; value: string | number | boolean }[];
  placeholder?: string;
  showOnlyMobile?: boolean;
  showIn?: "main" | "advanced" | "both";
};
