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
  SENDTEXT = "ส่งข้อความ",
  SENDIMAGE = "ส่งรูปภาพ",
  SENDSTICKER = "ส่งสติ้กเกอร์",
  SENDAUDIO = "ส่งเสียง",
  SENDVIDEO = "ส่งวิดีโอ",
  SENDFILE = "ส่งไฟล์",
  SENDLOCATION = "ส่งตำแหน่งที่อยู่",
}

//line message type
export enum LineMessageType {
  TEXT = "text",
  IMAGE = "image",
  VIDEO = "video",
  AUDIO = "audio",
  LOCATION = "location",
  STICKER = "sticker",
  FLEX = "flex",
  CAROUSEL = "carousel",
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
