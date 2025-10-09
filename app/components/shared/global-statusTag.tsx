import {
  UserPlus,
  CheckCircle,
  Star,
  AlertTriangle,
  Clock,
  Slash,
  XCircle,
  Users,
  CalendarOff,
  Bookmark,
  Trash,
  X,
} from "lucide-react";
import { Badge } from "../ui/badge";

/* How to use
1. choose or add color in badgeVariants
2. add Status in StatusKey
3. add data in StatusKey*/

type StatusKey =
  /* ----------status---------- */
  | "newly_registered"
  | "active"
  | "loyal_customer"
  | "at_risk"
  | "pending"
  /* ----------use---------- */
  | "available"
  | "unavailable"
  | "churned"
  /* ----------users type---------- */
  | "ordinary_person"
  | "juristic_person"
  /* ----------users---------- */
  | "new_user"
  | "active_user"
  | "inactive_user"
  | "suspended"
  | "deleted"
  /* ----------Inventory---------- */
  | "in_stock"
  | "out_of_stock"
  | "pending_restock"
  | "discontinued"
  | "reserved"
  /* ----------Inventory---------- */
  | "inactive"
  | "out_of_season"
  | "coming_soon"
  /* ----------Setting Third party---------- */
  | "third_party_active"
  | "third_party_inactive"
  | "third_party_isConnected_true"
  | "third_party_isConnected_false";

interface Props {
  value?: StatusKey | string | boolean | null;
  key?: string | boolean | null;
}
const badgeVariants = {
  default: "border-transparent bg-primary text-white", // สีหลักทั่วไป
  secondary: "border-transparent bg-secondary text-black", // สีรอง / ไม่พร้อมใช้งาน
  active: "border-transparent bg-[#00A57C] text-white", // ใช้งาน / พร้อม / มีสินค้า
  warning: "border-transparent bg-[#FFBE3D] text-black", // รอดำเนินการ / ผู้ใช้ใหม่
  risk: "border-transparent bg-[#ED4949] text-white", // มีปัญหา / หมด / ระงับ
  orange: "border-transparent bg-orange text-white", // นิติบุคคล / เด่น
  lightGreen: "border-transparent bg-[#06C755] text-white", // สดใส / จอง / บุคคลธรรมดา
  white: "border-transparent bg-[#D9D9D9] text-black", // ไม่ใช้งาน / จาง / ลบ
  normal: "border-transparent bg-[#1F78FF] text-white", // แจ้งเตือน / ลูกค้าประจำ / Coming Soon
  pink: "border-transparent bg-pink-500 text-white", // ตัวเลือกพิเศษ เช่น VIP, โปรโมชั่น
  purple: "border-transparent bg-purple-500 text-white", // ตัวเลือกพิเศษ หรือ seasonal highlight
};

const statusMap: Record<
  StatusKey,
  { label: string; variant: keyof typeof badgeVariants; icon?: React.ReactNode }
> = {
  /* ---------- Customers ---------- */
  newly_registered: {
    label: "ลงทะเบียนใหม่",
    variant: "warning",
    icon: <UserPlus />,
  },
  active: { label: "ใช้งาน", variant: "active", icon: <CheckCircle /> },
  loyal_customer: { label: "ลูกค้าประจำ", variant: "normal", icon: <Star /> },
  at_risk: { label: "มีความเสี่ยง", variant: "risk", icon: <AlertTriangle /> },
  churned: { label: "ยกเลิกใช้งาน", variant: "white", icon: <X /> },
  pending: { label: "รอดำเนินการ", variant: "warning", icon: <Clock /> },
  available: { label: "เปิดใช้งาน", variant: "active", icon: <Slash /> },
  unavailable: {
    label: "ไม่พร้อมใช้งาน",
    variant: "secondary",
    icon: <XCircle />,
  },
  ordinary_person: {
    label: "บุคคลธรรมดา",
    variant: "lightGreen",
    icon: <UserPlus />,
  },
  juristic_person: { label: "นิติบุคคล", variant: "orange", icon: <Users /> },

  /* ---------- Users ---------- */
  new_user: {
    label: "ผู้ใช้ใหม่ที่เพิ่งลงทะเบียน",
    variant: "warning",
    icon: <UserPlus />,
  },
  active_user: {
    label: "ผู้ใช้ที่ใช้งานอย่างต่อเนื่อง",
    variant: "active",
    icon: <CheckCircle />,
  },
  inactive_user: {
    label: " ผู้ใช้ที่ไม่เคยใช้งานหรือไม่ใช้งานมานาน",
    variant: "white",
    icon: <XCircle />,
  },
  suspended: {
    label: "ผู้ใช้ที่ถูกระงับการใช้งาน",
    variant: "risk",
    icon: <AlertTriangle />,
  },
  deleted: {
    label: "ผู้ใช้ที่ลบบัญชีออกจากระบบ",
    variant: "secondary",
    icon: <Trash />,
  },

  /* ---------- Inventory ---------- */
  in_stock: {
    label: "มีในสต็อก",
    variant: "active",
    icon: <CheckCircle />,
  },
  out_of_stock: {
    label: " หมดสต็อก",
    variant: "risk",
    icon: <XCircle />,
  },
  pending_restock: {
    label: "รอการเติมสต็อก",
    variant: "warning",
    icon: <Clock />,
  },
  discontinued: {
    label: "ยกเลิกการจำหน่าย",
    variant: "white",
    icon: <Slash />,
  },
  reserved: {
    label: " ถูกจองไว้แล้ว",
    variant: "lightGreen",
    icon: <Bookmark />,
  },

  /* ---------- Seasonal / Other ---------- */
  inactive: { label: "ที่ไม่เปิดขาย", variant: "white", icon: <XCircle /> },

  third_party_active: {
    label: "พร้อมใช้งาน",
    variant: "active",
    icon: <CheckCircle />,
  },
  third_party_inactive: {
    label: "ยังไม่เปิดใช้งาน",
    variant: "white",
    icon: <XCircle />,
  },
  third_party_isConnected_true: {
    label: "เชื่อมต่อแล้ว",
    variant: "active",
    icon: <CheckCircle />,
  },
  third_party_isConnected_false: {
    label: "ยังไม่ได้เชื่อมต่อ",
    variant: "white",
    icon: <XCircle />,
  },

  out_of_season: {
    label: " สินค้าอยู่นอกฤดูกาล",
    variant: "secondary",
    icon: <CalendarOff />,
  },
  coming_soon: { label: "หยุดผลิตหรือขาย", variant: "normal", icon: <Clock /> },
};

export function GlobalStatusBadge({ value }: Props) {
  let status: StatusKey | null = null;

  if (value === true || value === "active") status = "active";
  else if (value === false || value === "active") status = "churned";
  else if (typeof value === "string" && statusMap[value as StatusKey])
    status = value as StatusKey;

  const { label, variant, icon } = status
    ? statusMap[status]
    : { label: "ไม่ระบุ", variant: "secondary" };
  const colorTag = badgeVariants[variant as keyof typeof badgeVariants];

  return (
    <Badge
      className={`inline-flex items-center justify-center rounded-xl border py-1 px-3 text-sm font-medium w-fit whitespace-nowrap shrink-0 gap-1 transition-colors ${colorTag}`}
    >
      {icon} {label}
    </Badge>
  );
}
