// AiInventoryFields.tsx
import * as React from "react";
import GlobalButton from "~/components/shared/global-button";
import {
  AlertTriangle,
  BarChart2,
  Boxes,
  Coins,
  Flame,
  LineChart,
  Link,
  Navigation,
  Package,
  PackageCheck,
  Receipt,
  RotateCw,
  Timer,
  TrendingUp,
  Warehouse,
} from "lucide-react";
import { useNavigate } from "react-router";

type FieldKey =
  | "totalStockValue"
  | "totalItems"
  | "inStockCount"
  | "capacityUsage"
  | "topSellingItems"
  | "topQuantityItems"
  | "lowStockItems"
  | "restockSuggestions"
  | "slowMovingItems"
  | "topCategories"
  | "monthlySalesValue"
  | "salesTrendPercent"
  | "fastestSoldItems";

export type AiInventoryFieldsState = Record<
  FieldKey,
  { checked: boolean; note: string; defaultValues: string }
>;

type InventorySummaryData = {
  id?: string;
  totalStockValue?: string;
  totalItems?: string;
  inStockCount?: string;
  capacityUsage?: string;
  topSellingItems?: string;
  topQuantityItems?: string;
  lowStockItems?: string;
  restockSuggestions?: string;
  slowMovingItems?: string;
  topCategories?: string;
  monthlySalesValue?: string;
  salesTrendPercent?: string;
  fastestSoldItems?: string;
};

type Props = {
  value?: AiInventoryFieldsState;
  defaultValue?: AiInventoryFieldsState;
  onChange?: (v: AiInventoryFieldsState) => void;
  defaultOpen?: FieldKey[];
  data: InventorySummaryData;
  onClickBtn?: () => void;
  closeBtn?: boolean;
};

export function AiInventoryFields({
  closeBtn,
  value,
  defaultValue,
  onChange,
  defaultOpen,
  data,
  onClickBtn,
}: Props) {
  const navigate = useNavigate();

  const emptyState = (checkedKeys: FieldKey[] = []): AiInventoryFieldsState =>
    (
      [
        "totalStockValue",
        "totalItems",
        "inStockCount",
        "capacityUsage",
        "topSellingItems",
        "topQuantityItems",
        "lowStockItems",
        "restockSuggestions",
        "slowMovingItems",
        "topCategories",
        "monthlySalesValue",
        "salesTrendPercent",
        "fastestSoldItems",
      ] as FieldKey[]
    ).reduce((acc, key) => {
      acc[key] = {
        checked: checkedKeys.includes(key),
        note: "",
        defaultValues: "",
      };
      return acc;
    }, {} as AiInventoryFieldsState);

  const [state, setState] = React.useState<AiInventoryFieldsState>(
    value ?? defaultValue ?? emptyState(defaultOpen)
  );

  React.useEffect(() => {
    if (value) setState(value);
  }, [value]);

  React.useEffect(() => {
    onChange?.(state);
  }, [state, onChange]);

  const infoItems = [
    {
      label: "มูลค่าสินค้าทั้งหมด",
      value: data?.totalStockValue ?? "-",
      icon: <Coins />,
    },
    {
      label: "จำนวนสินค้าทั้งหมด",
      value: data?.totalItems ?? "-",
      icon: <Boxes />,
    },
    {
      label: "จำนวนสินค้าทั้งหมดในสต็อก",
      value: data?.inStockCount ?? "-",
      icon: <PackageCheck />,
    },
    {
      label: "การใช้พื้นที่คลัง (%)",
      value: data?.capacityUsage ?? "-",
      icon: <Warehouse />,
    },
    {
      label: "สินค้าขายดี",
      value: data?.topSellingItems ?? "-",
      icon: <TrendingUp />,
    },
    {
      label: "สินค้าที่คงเหลือมากที่สุด",
      value: data?.topQuantityItems ?? "-",
      icon: <Package />,
    },
    {
      label: "สินค้าที่ใกล้หมด",
      value: data?.lowStockItems ?? "-",
      icon: <AlertTriangle />,
    },
    {
      label: "สินค้าที่ควรเติมสต็อก",
      value: data?.restockSuggestions ?? "-",
      icon: <RotateCw />,
    },
    {
      label: "สินค้าที่ไม่เคลื่อนไหว",
      value: data?.slowMovingItems ?? "-",
      icon: <Timer />,
    },
    {
      label: "หมวดสินค้าขายดี",
      value: data?.topCategories ?? "-",
      icon: <BarChart2 />,
    },
    {
      label: "มูลค่าการขายเดือนนี้",
      value: data?.monthlySalesValue ?? "-",
      icon: <Receipt />,
    },
    {
      label: "แนวโน้มยอดขายเทียบเดือนก่อน (%)",
      value: data?.salesTrendPercent ?? "-",
      icon: <LineChart />,
    },
    {
      label: "สินค้าที่ขายหมดเร็วที่สุด",
      value: data?.fastestSoldItems ?? "-",
      icon: <Flame />,
    },
  ];

  return (
    <div className="space-y-3 my-2">
      <div className="space-y-2">
        {infoItems.map((item, index) => (
          <div key={index} className="flex flex-row flex-wrap">
            <span className="flex mr-2 w-4 h-4">{item.icon}</span>
            <span className="font-bold">{item.label} :</span>
            <span className="pl-4 text-[#71717A]">
              {item.value || "ยังไม่มีข้อมูล"}
            </span>
          </div>
        ))}
      </div>

      {/* <div className="flex justify-between items-center gap-2 mt-5 min-w-0">
        <GlobalButton
          key="sync-ai"
          type="button"
          onClick={() => onClickBtn?.()}
          variant="secondary"
          className="flex-1 bg-[#2e498d] text-white hover:bg-[#142a60] hover:text-white px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
          icon={<Link />}
          label={<span className="hidden sm:inline">Sync ข้อมูล AI</span>}
        />
        {!closeBtn && (
          <GlobalButton
            key="navigate-inventory-details"
            type="button"
            onClick={() => navigate(`/inventory/${data?.id}`)}
            variant="secondary"
            className="flex-1 bg-[#34cf16] text-white hover:bg-[#142a60] hover:text-white px-2 py-1 text-xs sm:px-4 sm:py-2 sm:text-sm"
            icon={<Navigation />}
            label={
              <span className="hidden sm:inline">ไปยังหน้ารายละเอียด</span>
            }
          />
        )}
      </div> */}
    </div>
  );
}
