"use client";

import React from "react";
import { Badge } from "~/components/ui/badge";
import {
  UserPlus,
  Zap,
  Star,
  Clock,
  Users,
  AlertCircle,
  Crown,
  Heart,
  ShoppingCart,
  X,
} from "lucide-react";

/* How to use
1. choose or add color in badgeVariants
2. add tag in TagsKey
3. add data in tagsKey*/

const badgeVariants = {
  default: "border-transparent bg-black text-white",
  vip: "border-transparent bg-[#FFDB00] text-black",
  new: "border-[#51C0FF] bg-[#EDF9FF] text-[#3ea9e6]",
  regular: "border-[#1056BD] bg-[#EDF9FF]  text-[#1056BD]",
  interested: "border-[#8B5CF6] bg-[#F7F3FF] text-[#8B5CF6]",
  inactive: "border-[#BDBDBD] bg-[#F6F6F6] text-[#525252]",
  promo: "border-[#FE9239] bg-[#FFF7ED] text-[#FE9239]",
  highPurchase: "border-[#10A957] bg-[#EFFEF5] text-[#10A957]",
  complaint: "border-[#AB0909] bg-[#FFF7ED] text-[#AB0909]",
  wholesale: "border-[#C54009] bg-[#FFF0F0] text-[#C54009]",

  member: "border-[#00BFA5] bg-[[#EDF9FF] text-[#00BFA5]",
  walkIn: "border-[#525252] bg-[#F6F6F6] text-[#525252]",
};

export type TagsKey =
  | "ลูกค้า VIP"
  | "ลูกค้าใหม่"
  | "ลูกค้าประจำ"
  | "ลูกค้าที่สนใจ"
  | "ลูกค้าไม่เคลื่อนไหว"
  | "ใช้โปรโมชั่น"
  | "มียอดซื้อสูง"
  | "มีประวัติร้องเรียน"
  | "ลูกค้าขายส่ง"
  | "ลูกค้าปลีก"
  | "สมาชิก"
  | "Walk";

const tagsKey: Record<
  TagsKey,
  { label: string; variant: keyof typeof badgeVariants; icon?: React.ReactNode }
> = {
  "ลูกค้า VIP": {
    label: "ลูกค้า VIP",
    variant: "vip",
    icon: <Crown size={14} />,
  },
  ลูกค้าใหม่: {
    label: "ลูกค้าใหม่",
    variant: "new",
    icon: <UserPlus size={14} />,
  },
  ลูกค้าประจำ: {
    label: "ลูกค้าประจำ",
    variant: "regular",
    icon: <Star size={14} />,
  },
  ลูกค้าที่สนใจ: {
    label: "ลูกค้าที่สนใจ",
    variant: "interested",
    icon: <Heart size={14} />,
  },
  ลูกค้าไม่เคลื่อนไหว: {
    label: "ลูกค้าไม่เคลื่อนไหว",
    variant: "inactive",
    icon: <Clock size={14} />,
  },
  ใช้โปรโมชั่น: {
    label: "ใช้โปรโมชั่น",
    variant: "promo",
    icon: <ShoppingCart size={14} />,
  },
  มียอดซื้อสูง: {
    label: "มียอดซื้อสูง",
    variant: "highPurchase",
    icon: <Zap size={14} />,
  },
  มีประวัติร้องเรียน: {
    label: "มีประวัติร้องเรียน",
    variant: "complaint",
    icon: <AlertCircle size={14} />,
  },
  ลูกค้าขายส่ง: {
    label: "ลูกค้าขายส่ง",
    variant: "wholesale",
    icon: <Users size={14} />,
  },
  ลูกค้าปลีก: {
    label: "ลูกค้าปลีก",
    variant: "regular",
    icon: <UserPlus size={14} />,
  },
  สมาชิก: { label: "สมาชิก", variant: "member", icon: <UserPlus size={14} /> },
  Walk: { label: "Walk-in", variant: "walkIn", icon: <UserPlus size={14} /> },
};

interface GlobalTagsBadgeProps {
  value: TagsKey | string;
  onClick?: () => void;
}

export function GlobalTagsBadge({ value, onClick }: GlobalTagsBadgeProps) {
  const status = tagsKey[value as TagsKey];
  const label = status?.label || value;
  const icon = status?.icon || null;
  const colorTag = status
    ? badgeVariants[status.variant]
    : badgeVariants.default;

  return (
    <Badge
      className={`inline-flex items-center justify-center rounded-xl border py-1 px-3 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-colors ${colorTag}`}
    >
      {icon} {label}
      {onClick && (
        <span
          className="cursor-pointer hover:text-red-500 ml-1"
          onClick={onClick}
        >
          <X size={14} />
        </span>
      )}
    </Badge>
  );
}
