import { UserPlus, CheckCircle, Star, AlertTriangle, X } from "lucide-react";

type Category = {
  newly_registered: number;
  active: number;
  loyal_customer: number;
  at_risk: number;
  churned: number;
};

export const TabIndexTable = (categories: Category) => {
  const total =
    (categories?.newly_registered ?? 0) +
    (categories?.active ?? 0) +
    (categories?.loyal_customer ?? 0) +
    (categories?.at_risk ?? 0) +
    (categories?.churned ?? 0);

  const tabs = [
    {
      label: "ทั้งหมด",
      value: total,
      icon: "📊",
      status: "all",
    },
    {
      label: "ลงทะเบียนใหม่",
      value: categories?.newly_registered ?? 0,
      icon: <UserPlus className=" text-[#FFBE3D] " />,
      status: "newly_registered",
    },
    {
      label: "ใช้งานอยู่",
      value: categories?.active ?? 0,
      icon: <CheckCircle className="text-[#00A57C]" />,
      status: "active",
    },
    {
      label: "ลูกค้าประจำ",
      value: categories?.loyal_customer ?? 0,
      icon: <Star className="text-[#1F78FF]" />,
      status: "loyal_customer",
    },
    {
      label: "มีความเสี่ยง",
      value: categories?.at_risk ?? 0,
      icon: <AlertTriangle className="text-[#ED4949]" />,
      status: "at_risk",
    },
    {
      label: "ยกเลิกใช้งาน",
      value: categories?.churned ?? 0,
      icon: <X className="text-[#4a4949]" />,
      status: "churned",
    },
  ];

  return tabs;
};
