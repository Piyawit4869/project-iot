import {
  Building2,
  CalendarDays,
  Link,
  Mail,
  Navigation,
  Package,
  Phone,
  Tag,
  User,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router";

import { formatDateAndTime } from "~/components/shared/global-format";
import type { CustomerRequestResponse } from "../customer/types/customer";
import GlobalButton from "~/components/shared/global-button";

type CustomerStatusValue =
  | "newly_registered"
  | "active"
  | "loyal_customer"
  | "at_risk"
  | "churned";

type Props = {
  onClickBtn?: () => void;
  data: CustomerRequestResponse;
  closeBtn?: boolean;
  noSyncBtn?: boolean;
};

export function AiCustomerFields({
  closeBtn,
  noSyncBtn,
  data,
  onClickBtn,
}: Props) {
  const navigate = useNavigate();

  const infoItems = [
    {
      label: "ชื่อผู้ติดต่อ",
      value: data?.contactName,
      icon: <User />,
    },
    {
      label: "ชื่อบริษัท",
      value: data?.companyName,
      icon: <Building2 />,
    },
    {
      label: "อีเมล",
      value: data?.email,
      icon: <Mail />,
    },
    {
      label: "เบอร์โทรศัพท์ที่ติดต่อได้สะดวก",
      value: data?.contactNumber,
      icon: <Phone />,
    },
    {
      label: "ชื่อแบรนด์ (ภาษาอังกฤษ)",
      value: data?.brandNameEn,
      icon: <Tag />,
    },
    {
      label: "จำนวนที่ต้องการสั่งผลิต",
      value: data?.orderQuantity,
      icon: <Package />,
    },
    {
      label: "งบประมาณหรือช่วงราคาที่ต้องการ (ถ้ามี)",
      value: data?.budgetRange,
      icon: <Wallet />,
    },
    {
      label: "วันที่ต้องการใช้สินค้า (ETD)",
      value: formatDateAndTime(data?.etdDate),
      icon: <CalendarDays />,
    },
  ];

  return (
    <div className="space-y-3 my-2">
      {/* <div className="space-y-2">
        {infoItems.map((item, index) => (
          <div key={index} className="flex flex-row flex-wrap ">
            <span className="flex mr-2 w-4 h-4">{item.icon}</span>
            <span className="font-bold">{item.label} :</span>
            <span className="pl-4 text-[#71717A]">
              {item.value || "ยังไม่มีข้อมูล"}
            </span>
          </div>
        ))}
      </div> */}

      <div className="px-6 py-6 max-h-[60vh] overflow-y-auto">
        <div className="space-y-4">
          {infoItems.map((item, index) => {
            const isPopulated = !!item.value;
            return (
              <div key={index} className="group">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-5 h-5 mt-0.5 transition-all ${
                      isPopulated
                        ? "text-green-600"
                        : "text-gray-300 group-hover:text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`text-md font-bold font-medium transition-colors ${
                          isPopulated ? "text-slate-900" : "text-slate-600"
                        }`}
                      >
                        {item.label}
                      </span>
                      <span
                        className={`text-sm transition-colors break-words ${
                          isPopulated
                            ? "text-slate-700 font-medium leading-relaxed"
                            : "text-slate-400 italic"
                        }`}
                      >
                        {item.value || "ยังไม่มีข้อมูล"}
                      </span>
                    </div>
                  </div>
                </div>

                {isPopulated && (
                  <div className="h-px bg-gradient-to-r from-green-300 to-transparent mt-3" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-between items-center gap-2 mt-5 min-w-0">
        {!noSyncBtn && (
          <GlobalButton
            key="sync-ai"
            type="button"
            onClick={() => onClickBtn?.()}
            variant="secondary"
            className="flex-1  bg-[#2e498d] text-white hover:bg-[#142a60] hover:text-white px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
            icon={<Link />}
            label={<span className="hidden sm:inline">Sync ข้อมูล AI</span>}
          />
        )}
        {closeBtn ?? (
          <GlobalButton
            key="navigate-customer-details"
            type="button"
            onClick={() => {
              navigate(`/customer/${data.id}`);
            }}
            variant="secondary"
            className="flex-1  bg-[#34cf16] text-white hover:bg-[#142a60] hover:text-white px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
            icon={<Navigation />}
            label={
              <span className="hidden sm:inline">ไปยังหน้ารายละเอียด</span>
            }
          />
        )}
      </div>
    </div>
  );
}
