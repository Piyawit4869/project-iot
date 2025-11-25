"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import {
  Search,
  Star,
  StarOff,
  MessageSquareText,
  LayoutList,
  TicketCheck,
  PlusCircle,
  UserRound,
  MapPin,
  Clock,
  PhoneCall,
  Info,
} from "lucide-react";
import { cn } from "~/lib/utils";
import {
  useLineCardContentPaginate,
  useLineFeatureMessagePaginate,
  useLineMarkFavoriteRplyMessage,
  useLineMassagePaginate,
} from "~/api/client/settings";
import { Link } from "react-router";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";

import { GlobalImage } from "~/components/shared/global-image";

// -----------------------------
// Types
// -----------------------------

type CategoryKey = "reply" | "card" | "coupon";

export type ProfileCardData = {
  category?: string;
  imageUrl: string;
  name: string;

  position: string;
  note?: string;
  callText?: string; // ปุ่ม/ลิงก์ โทร
  emailText?: string; // ปุ่ม/ลิงก์ อีเมล
  tel?: string; // ใช้สร้าง tel:
  email?: string; // ใช้สร้าง mailto:
  tagText: string;
  title?: string;
  actionText?: string;
  tagColor?: string;
  tags?: any;
  tagEnabled?: boolean;
  priceEnabled?: boolean;
  description?: string;
  addressText?: string;
  addressLabel?: string;
  actionEnabled?: boolean;
  extraInfoType?: string;
  addressEnabled?: boolean;
  currency?: string;
  extraInfoValue?: string;
  extraInfoEnabled?: boolean;
  price?: string;
  ctaPrimaryText?: string;
  ctaPrimaryType?: string;
  ctaPrimaryEnabled?: boolean;
  ctaSecondaryText?: string;
  ctaSecondaryType?: string;
  ctaSecondaryEnabled?: boolean;
  meta?: {
    name: string;
    category?: string;
    items?: any;
  };
};

type ProfileCardProps = {
  items: ProfileCardData; // หรือถ้าชัวร์ type จริงของ product/place/person
  category?: string;
};
export interface TemplateItem {
  id: string;
  title: string;
  subtitle?: string;
  category: CategoryKey;
  createdAt: string; // ISO
  starred?: boolean;
  icon?: React.ReactNode;

  // --- ใหม่: ใช้เมื่อ category === "displayCard"
  profileCards?: ProfileCardData[];
}

// -----------------------------
// Mock Data
// -----------------------------

const MOCK_ITEMS: TemplateItem[] = [
  {
    id: "t1",
    title: "ไม่ลดราคา สินค้า exclusive",
    subtitle: "รายการนี้ เป็นสินค้าในกลุ่ม Exclusive Products ของเรา...",
    category: "reply",
    createdAt: "2025-10-10T09:00:00Z",
    starred: true,
    icon: <MessageSquareText className="size-4" />,
    profileCards: [],
  },
  {
    id: "t2",
    title: "ประกาศแจ้งลูกค้า 1-8 ตุลาฯ",
    subtitle: "ประกาศแจ้งลูกค้า เนื่องจากประเทศมีวันหยุด...",
    category: "reply",
    createdAt: "2025-10-08T10:00:00Z",
    icon: <MessageSquareText className="size-4" />,
    profileCards: [],
  },

  {
    id: "t3",
    title: "ทีมฝ่ายขาย (การ์ดโปรไฟล์)",
    category: "card",
    createdAt: "2025-10-05T10:00:00Z",
    icon: <LayoutList className="size-4" />,
    // profileCards: [
    //   {
    //     imageUrl:
    //       "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=600&auto=format&fit=crop",
    //     name: "Ms.GARFEILD",
    //     position: "Sale Admin",
    //     note: "สนับสนุนฝ่ายขาย",
    //     callText: "โทรหาคุณการ์ฟิว",
    //     emailText: "ส่งอีเมล",
    //     tel: "0912345678",
    //     email: "garfeild@example.com",
    //   },
    //   {
    //     imageUrl:
    //       "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
    //     name: "Ms.MOLLY",
    //     position: "Client Solutions",
    //     note: "ผู้เชี่ยวชาญลูกค้าองค์กร",
    //     callText: "โทรหาคุณมอลลี่",
    //     emailText: "ส่งอีเมล",
    //     tel: "0891112222",
    //     email: "molly@example.com",
    //   },
    //   // เพิ่มได้เรื่อย ๆ
    // ],
  },

  {
    id: "t4",
    title: "คูปองส่วนลด 10% สัปดาห์นี้",
    subtitle: "ใช้ได้กับสินค้าในหมวด Accessories",
    category: "coupon",
    createdAt: "2025-10-01T10:00:00Z",
    icon: <TicketCheck className="size-4" />,
    profileCards: [],
  },
];

// -----------------------------
// meta array
// -----------------------------
// function normalizeMeta(meta: any, category?: string) {
//   if (!meta) return [];

//   switch (category) {
//     case "product":
//       return meta.items ?? (meta.items ? [meta.item] : []);
//     case "place":
//       return meta.places ?? (meta.place ? [meta.place] : []);
//     case "person":
//       return meta.persons ?? (meta.person ? [meta.person] : []);
//     default:
//       return meta.items ?? (meta.item ? [meta.items] : []);
//   }
// }

// -----------------------------
// Helper UI
// -----------------------------

function ChatBubble({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="size-10 rounded-full bg-black text-white grid place-items-center font-semibold">
        ogga
      </div>
      <div className="max-w-[85%] rounded-2xl bg-white shadow p-3 text-sm leading-6">
        {text}
      </div>
    </div>
  );
}

function ImageCard({ items }: ProfileCardProps) {
  return (
    <div className="mx-auto w-[300px]  overflow-hidden rounded-[28px] bg-white text-card-foreground  ">
      <div className="relative overflow-hidden rounded-2xl bg-muted">
        {items?.imageUrl ? (
          <GlobalImage
            src={items?.imageUrl}
            alt="ภาพตัวอย่างการ์ด"
            className="h-full w-full object-cover "
            notShowPreview
          />
        ) : (
          <div className="flex h-44 items-center justify-center text-muted-foreground">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              role="img"
              aria-label="placeholder"
              className="h-12 w-12"
            >
              <path
                d="M8 12a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v24a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 0 8 8 6-4 8 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {items?.tagEnabled && (
          <span
            className="absolute left-3 top-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-tight text-white"
            style={{ backgroundColor: items?.tagColor || "#4B5D73" }}
          >
            {items?.tagText}
          </span>
        )}

        {items?.actionEnabled && (
          <div className="absolute bottom-3 left-1/2 w-[85%] -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-center text-[12px] text-white">
            {items?.actionText}
          </div>
        )}
      </div>
    </div>
  );
}

function PlaceCard({ items }: ProfileCardProps) {
  const ExtraIcon =
    items?.extraInfoType === "time"
      ? Clock
      : items?.extraInfoType === "phone"
        ? PhoneCall
        : Info;
  return (
    <div className="mx-auto w-[270px] h-[430px] overflow-hidden rounded-[28px] bg-white text-card-foreground  ">
      <div
        className="rounded-t-[28px] px-5 pt-5 pb-10 text-white"
        style={{
          backgroundColor: "#6F96AE",
          backgroundImage: `url(${items?.imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: 200,
        }}
      >
        {items?.tagEnabled && (
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-tight"
            style={{ backgroundColor: items?.tagColor }}
          >
            {items?.tagText}
          </span>
        )}
      </div>
      <div className="space-y-3 px-5 py-6">
        <p className="text-base font-semibold">{items?.title}</p>
        {items?.addressEnabled && (
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4" />
            <div>
              <p>{items?.addressLabel}</p>
            </div>
          </div>
        )}
        {items?.extraInfoEnabled && (
          <div className="flex items-start gap-2 text-sm text-muted-foreground">
            <ExtraIcon className="mt-0.5 size-4" />
            <p>{items?.extraInfoValue}</p>
          </div>
        )}
        <div className="pt-2 text-center">
          {items?.ctaPrimaryEnabled && (
            <p className="px-0 text-blue-500">
              {items?.ctaPrimaryText || "ใส่ข้อความสำหรับป้ายแอ็กชัน"}
            </p>
          )}
          {items?.ctaSecondaryEnabled && (
            <p className="mt-2 text-sm text-blue-500">
              {items?.ctaSecondaryText || "ป้ายแอ็กชันรอง"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ items }: ProfileCardProps) {
  return (
    // <div className="w-full">
    //   <div className="bg-[#2a5182] text-white rounded-t-xl px-4 py-2 flex items-center justify-between">
    //     <div className="flex items-center gap-2">
    //       <div className="size-8 rounded-full bg-black grid place-items-center text-xs font-semibold">
    //         ogga
    //       </div>
    //       <span className="text-sm font-medium">ดูตัวอย่าง</span>
    //     </div>
    //     <div className="text-xs opacity-80">ตัวอย่างการแสดงผล</div>
    //   </div>

    //   <div className="bg-[#e6eefb] rounded-b-xl p-4">
    //     <div className="flex gap-3">
    //       {/* การ์ดโปรไฟล์ซ้าย */}
    //       <div className="flex-1">
    //         <div className="rounded-2xl bg-white shadow p-5 text-center h-full">
    //           <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4">
    //             {/* ใช้ <img> เพื่อความง่าย (คุณสามารถเปลี่ยนเป็น GlobalImage/Image ได้ตามโปรเจกต์) */}
    //             <img
    //               src={items.imageUrl}
    //               alt={items.name}
    //               className="w-full h-full object-cover"
    //             />
    //           </div>
    //           <div className="text-lg font-semibold">{items.name}</div>
    //           <div className="text-sm text-gray-600">{items.position}</div>
    //           {items.note && (
    //             <div className="text-xs text-gray-500 mt-1">{items.note}</div>
    //           )}

    //           <div className="mt-4 space-y-2">
    //             <button className="w-full border rounded-xl px-3 py-2 text-sm hover:bg-gray-50">
    //               {items.callText ?? "โทรหา"}
    //             </button>
    //             <button className="w-full border rounded-xl px-3 py-2 text-sm hover:bg-gray-50">
    //               {items.emailText ?? "ส่งอีเมล"}
    //             </button>
    //           </div>
    //         </div>
    //       </div>

    //       {/* สไลด์ถัดไป placeholder ขวา (ให้ฟีลแบบรูปตัวอย่างมีการ์ดเลื่อนได้) */}
    //       <div className="hidden md:block w-12 shrink-0">
    //         <div className="h-full rounded-2xl border border-dashed grid place-items-center text-gray-400">
    //           →
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="mx-auto w-[270px] h-[430px] overflow-hidden rounded-[28px] bg-white text-card-foreground  ">
      <div
        className="rounded-t-[28px] px-5 pt-5 pb-10 text-white"
        style={{
          backgroundColor: "#6F96AE",
          backgroundImage: `url(${items?.imageUrl})`,
          backgroundSize: "cover", // ให้ภาพเต็ม div
          backgroundPosition: "center", // จัดตำแหน่งกลาง
          minHeight: 200,
        }}
      >
        {items?.tagEnabled && (
          <span
            className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-tight"
            style={{ backgroundColor: items?.tagColor }}
          >
            {items?.tagText}
          </span>
        )}
      </div>
      <div className="space-y-3 px-5 py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-semibold">{items?.title}</p>
            <p className="text-muted-foreground text-sm">
              {items?.description}
            </p>
          </div>
        </div>
        {/* <p className="text-muted-foreground text-sm leading-relaxed">
            {description}
          </p> */}
        {items?.priceEnabled && (
          <p className="text-right text-lg font-semibold">
            {items?.currency}
            {items?.price}
          </p>
        )}
        <div className="pt-2 text-center">
          {(items?.ctaPrimaryEnabled || items?.ctaSecondaryEnabled) && (
            <div className="pt-2 text-center">
              {items?.ctaPrimaryEnabled && (
                <p className="px-0 text-blue-500">
                  {items?.ctaPrimaryText || "ข้อความป้ายแอ็กชัน"}
                </p>
              )}
              {items?.ctaSecondaryEnabled && (
                <p className="mt-2 text-sm text-blue-500">
                  {items?.ctaSecondaryText || "ป้ายแอ็กชันรอง"}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProfileCard({ items }: ProfileCardProps) {
  return (
    // <div
    //   data-card="profile"
    //   className="rounded-2xl bg-white shadow p-5 text-center w-[260px] h-full border border-[#d8e5fb]"
    // >
    //   <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-4">
    //     <img
    //       src={items.imageUrl}
    //       alt={items.name}
    //       className="w-full h-full object-cover"
    //     />
    //   </div>
    //   <div className="text-lg font-semibold">{items.name}</div>
    //   <div className="text-sm text-gray-700">{items.position}</div>
    //   {items.note && (
    //     <div className="text-xs text-gray-500 mt-1">{items.note}</div>
    //   )}

    //   <div className="mt-4 space-y-1">
    //     <a
    //       href={items.tel ? `tel:${items.tel}` : "#"}
    //       className="block text-sm text-blue-700 hover:underline"
    //     >
    //       {items.callText ?? "โทรหา"}
    //     </a>
    //     <a
    //       href={items.email ? `mailto:${items.email}` : "#"}
    //       className="block text-sm text-blue-700 hover:underline"
    //     >
    //       {items.emailText ?? "ส่งอีเมล"}
    //     </a>
    //   </div>
    // </div>
    <div className="mx-auto w-[240px] h-[300px] rounded-[24px] bg-white p-10 text-center shadow-lg">
      <div className="mx-auto mb-4 size-24 overflow-hidden rounded-full bg-muted flex items-center justify-center">
        {items?.imageUrl ? (
          <GlobalImage
            src={items?.imageUrl}
            alt="รูปโปรไฟล์"
            width={96}
            height={96}
            className="h-full w-full object-cover"
            notShowPreview
          />
        ) : (
          <UserRound className="size-10 text-muted-foreground" />
        )}
      </div>
      <p className="text-base font-semibold">{items?.name}</p>
      <div className="mt-3 flex flex-wrap justify-center gap-2"></div>
      {items?.tagEnabled && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {items?.tags?.map((tag: any, idx: number) => (
            <span
              key={`${tag.text}-${idx}`}
              className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium tracking-tight text-white"
              style={{ backgroundColor: tag.color || "#4B5D73" }}
            >
              {tag?.text?.trim() || "ใส่ข้อความแท็ก"}
            </span>
          ))}
        </div>
      )}
      {items?.description && (
        <p className="mt-3 text-sm text-muted-foreground">
          {items?.description}
        </p>
      )}
      {(items?.ctaPrimaryEnabled || items?.ctaSecondaryEnabled) && (
        <div className="pt-2 text-center">
          {items?.ctaPrimaryEnabled && (
            <p className="px-0 text-blue-500">{items?.ctaPrimaryText}</p>
          )}
          {items?.ctaSecondaryEnabled && (
            <p className="mt-2 text-sm text-blue-500">
              {items?.ctaSecondaryText}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function ProfileCardCarousel({ items, category }: ProfileCardProps) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  const cardSimple = items?.meta;
  // const metaArray = normalizeMeta(items.meta, items.meta?.category);

  // console.log({ metaArray });

  // โปรโมชั่น: ความกว้างต่อการเลื่อน (เท่ากับการ์ด 1 ใบ + gap)
  const getStep = () => {
    const card = listRef.current?.querySelector<HTMLDivElement>(
      '[data-card="profile"]'
    );
    if (!card) return 300; // fallback
    const style = getComputedStyle(card);
    const gap = 16; // gap-4
    return (
      card.offsetWidth +
      parseInt(style.marginLeft) +
      parseInt(style.marginRight) +
      gap
    );
  };

  const updateNav = () => {
    const el = listRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  React.useEffect(() => {
    updateNav();
    const el = listRef.current;
    if (!el) return;
    const onScroll = () => updateNav();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollByStep = (dir: "prev" | "next") => {
    const el = listRef.current;
    if (!el) return;
    const dx = getStep() * (dir === "next" ? 1 : -1);
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  let CardComponent: any = null;

  if (cardSimple?.category === "person") CardComponent = ProfileCard;
  if (cardSimple?.category === "product") CardComponent = ProductCard;
  if (cardSimple?.category === "place") CardComponent = PlaceCard;
  if (cardSimple?.category === "image") CardComponent = ImageCard;

  return (
    <div className="w-full h-[85%]">
      <div className="bg-[#2a5182] text-white rounded-t-xl px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-black grid place-items-center text-xs font-semibold">
            ogga
          </div>
          <span className="text-sm font-medium">ดูตัวอย่าง</span>
        </div>
        <div className="text-xs opacity-80">ตัวอย่างการแสดงผล</div>
      </div>

      <div className="relative bg-[linear-gradient(180deg,#cfe3ff_0%,#d7e9ff_35%,#e7f0ff_100%)] h-full rounded-b-xl p-4">
        <div className="pointer-events-none absolute left-4 w-6 bg-gradient-to-r from-[#e6eefb] to-transparent rounded-l-xl" />
        <div className="pointer-events-none absolute right-4 w-6 bg-gradient-to-l from-[#e6eefb] to-transparent rounded-r-xl" />
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollByStep("prev")}
          disabled={!canPrev}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-10",
            "size-9 rounded-full bg-white/90 shadow-md border",
            "grid place-items-center hover:bg-white transition",
            "disabled:opacity-40 disabled:cursor-not-allowed"
          )}
        >
          <span className="text-lg leading-none">‹</span>
        </button>

        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollByStep("next")}
          disabled={!canNext}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-10",
            "size-9 rounded-full bg-white/90 shadow-md border",
            "grid place-items-center hover:bg-white transition",
            "disabled:opacity-40 disabled:cursor-not-allowed"
          )}
        >
          <span className="text-lg leading-none">›</span>
        </button>

        <div className="flex flex-col mt-2">
          <div className="size-10 rounded-full bg-black text-white grid place-items-center font-semibold">
            ogga
          </div>

          <div
            ref={listRef}
            className="flex mt-2 items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth pr-6"
          >
            <div
              ref={listRef}
              className="flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth"
            >
              {CardComponent &&
                cardSimple?.items?.map((p: any, idx: number) => (
                  <CardComponent
                    key={`${p.title ?? p.name}-${idx}`}
                    items={p}
                    category={items?.meta?.category}
                  />
                ))}
            </div>

            {/* {items.map((p, idx) => (
            <div key={`${p.name}-${idx}`} className="shrink-0">
              <ProfileCard p={p} />
            </div>
          ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewPane({ item }: { item?: any }) {
  const fallback = (
    <div className="h-full w-full grid place-items-center text-muted-foreground">
      เลือกรายการทางซ้ายเพื่อดูตัวอย่าง
    </div>
  );

  if (!item) {
    return (
      <div className="h-full gap-0 pt-6 pb-0">
        {/* <CardHeader className="border-b">
          <div className="flex items-center justify-between pb-0">
            <div className="font-medium">ดูตัวอย่าง</div>
            <div className="text-muted-foreground text-xs">
              ตัวอย่างการแสดงผล
            </div>
          </div>
        </CardHeader> */}

        <div className="bg-[#2a5182] text-white rounded-t-xl px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-black grid place-items-center text-xs font-semibold">
              ogga
            </div>
            <span className="text-sm font-medium">ดูตัวอย่าง</span>
          </div>
          <div className="text-xs opacity-80">ตัวอย่างการแสดงผล</div>
        </div>
        <div className="p-4 h-full max-h-[600px] rounded-b-xl bg-[linear-gradient(180deg,#cfe3ff_0%,#d7e9ff_35%,#e7f0ff_100%)]">
          {fallback}
        </div>
      </div>
    );
  }

  // โหมดการ์ดแสดงผล (หลายใบจากอาร์เรย์)
  if (item.type === "card") {
    return <ProfileCardCarousel items={item} />;
  }

  // โหมดข้อความตอบกลับ (เดิม)
  return (
    <div className="h-full gap-0 pb-0">
      {/* <CardHeader className="border-b">
        <div className="flex items-center justify-between pb-0">
          <div className="font-medium">ดูตัวอย่าง</div>
          <div className="text-muted-foreground text-xs">ตัวอย่างการแสดงผล</div>
        </div>
      </CardHeader> */}

      <div className="bg-[#2a5182] text-white rounded-t-xl px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-black grid place-items-center text-xs font-semibold">
            ogga
          </div>
          <span className="text-sm font-medium">ดูตัวอย่าง</span>
        </div>
        <div className="text-xs opacity-80">ตัวอย่างการแสดงผล</div>
      </div>
      <div className="p-4 h-full max-h-[600px] rounded-b-xl bg-[linear-gradient(180deg,#cfe3ff_0%,#d7e9ff_35%,#e7f0ff_100%)]">
        <div className="mt-2">
          <ChatBubble
            text={item?.content?.messages?.[0]?.text ?? "ตัวอย่างข้อความ"}
          />
        </div>
      </div>
    </div>
  );
}

// -----------------------------
// Main Component
// -----------------------------

export default function LineTemplatePickerModal({
  handleSelectChange,
}: {
  handleSelectChange: React.Dispatch<React.SetStateAction<any>>;
}) {
  const { data, refetch, isLoading } = useLineMassagePaginate({
    pageIndex: 1,
    limit: 100,
  });

  const { data: lineFeatureFlex, isLoading: lineFeatureLoading } =
    useLineFeatureMessagePaginate({
      pageIndex: 1,
      limit: 100,
    });

  // const { data: lineFeatureFlex, isLoading: lineFeatureLoading } =
  //   useLineCardContentPaginate({
  //     pageIndex: 1,
  //     limit: 100,
  //   });

  const { mutate } = useLineMarkFavoriteRplyMessage();

  const [open, setOpen] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>("");
  const [category, setCategory] = React.useState<CategoryKey | "all">("all");
  const [sortBy, setSortBy] = React.useState<"newest" | "oldest">("newest");
  const [items, setItems] = React.useState<any[]>(
    lineFeatureFlex && lineFeatureFlex?.items && lineFeatureFlex?.items?.length
      ? lineFeatureFlex?.items
      : []
  );

  const [selectedId, setSelectedId] = React.useState<string | undefined>();

  const toggleStar = (id: string) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, isFavorite: !it.isFavorite } : it
      )
    );

    mutate(id);
    refetch();
  };

  React.useEffect(() => {
    if (
      lineFeatureFlex &&
      lineFeatureFlex.items &&
      lineFeatureFlex.items?.length
    ) {
      setSelectedId(
        lineFeatureFlex?.items?.length ? lineFeatureFlex?.items[0]?.id : ""
      );
      setItems(lineFeatureFlex?.items);
    }
  }, [lineFeatureFlex]);

  const selected = items.find((i) => i.id === selectedId);

  const filtered = items
    .filter((i) => (category === "all" ? true : i.type === category))
    .filter((i) =>
      [i.name, i.content?.messages?.[0]?.text].some((t) =>
        t?.toLowerCase().includes(query.toLowerCase())
      )
    )
    .sort((a, b) =>
      sortBy === "newest"
        ? +new Date(b.createdAt) - +new Date(a.createdAt)
        : +new Date(a.createdAt) - +new Date(b.createdAt)
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PlusCircle className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[65%] h-[85%] p-0 gap-0 overflow-auto">
        <DialogHeader className="px-6 pt-5 pb-3">
          <DialogTitle>เลือกคอนเทนต์</DialogTitle>
        </DialogHeader>

        <div className="px-6">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 w-fit">
              <TabsTrigger
                value="all"
                onClick={() => setCategory("all")}
                className="hover:bg-border relative !shadow-none !border-0 rounded-md 
            after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black 
            after:transition-all after:w-0 data-[state=active]:after:w-full"
              >
                ทั้งหมด
              </TabsTrigger>
              <TabsTrigger
                value="reply"
                onClick={() => setCategory("reply")}
                className="hover:bg-border relative !shadow-none !border-0 rounded-md 
            after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black 
            after:transition-all after:w-0 data-[state=active]:after:w-full"
              >
                ข้อความตอบกลับ
              </TabsTrigger>
              <TabsTrigger
                value="displayCard"
                onClick={() => setCategory("card")}
                className="hover:bg-border  relative  !shadow-none !border-0 rounded-md 
            after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black 
            after:transition-all after:w-0 data-[state=active]:after:w-full"
              >
                การ์ดแสดงผล
              </TabsTrigger>
              {/* <TabsTrigger value="coupon" onClick={() => setCategory("coupon")}>
                คูปอง
              </TabsTrigger> */}
            </TabsList>
          </Tabs>
        </div>

        <div className="px-6 pt-3 pb-5 grid grid-cols-12 gap-4">
          {/* Left Pane */}
          <div className="col-span-12 lg:col-span-5">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="ค้นหาชื่อหัวข้อ"
                  className="pl-8"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              {/* <Select
                value={category}
                onValueChange={(v) => setCategory(v as CategoryKey | "all")}
              >
                <SelectTrigger className="w-[130px]">
                  <SelectValue placeholder="ทั้งหมด" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทั้งหมด ({items.length})</SelectItem>
                  <SelectItem value="reply">ข้อความ</SelectItem>
                  <SelectItem value="displayCard">การ์ด</SelectItem>
                  <SelectItem value="coupon">คูปอง</SelectItem>
                </SelectContent>
              </Select> */}
              <Select
                value={sortBy}
                onValueChange={(v) => setSortBy(v as "newest" | "oldest")}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="เรียงลำดับ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">สร้างล่าสุด</SelectItem>
                  <SelectItem value="oldest">เก่าสุด</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* data in select */}
            <Card className="mt-3">
              <ScrollArea className="h-[520px]">
                {isLoading ? (
                  <ul className="flex flex-col gap-3 px-4">
                    <SkeletonLoading className="w-full h-15" />
                    <SkeletonLoading className="w-full h-15" />
                    <SkeletonLoading className="w-full h-15" />
                    <SkeletonLoading className="w-full h-15" />
                  </ul>
                ) : (
                  <ul>
                    {filtered && filtered.length > 0
                      ? filtered.map((it) => (
                          <li key={it.id}>
                            <button
                              className={cn(
                                "w-full text-left px-4 py-3 hover:bg-muted/60 grid grid-cols-[1fr_auto] gap-2",
                                selectedId === it.id && "bg-muted"
                              )}
                              onClick={() => setSelectedId(it.id)}
                            >
                              <div>
                                <div className="flex items-center gap-2 font-medium">
                                  {it.icon}
                                  <span className="line-clamp-1">
                                    {it.name}
                                  </span>
                                </div>
                                {it.description && (
                                  <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                                    {it.description}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-start">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleStar(it.id);
                                  }}
                                  aria-label={it.isFavorite ? "Unstar" : "Star"}
                                >
                                  {it.isFavorite ? (
                                    <Star className="size-4 fill-current" />
                                  ) : (
                                    <StarOff className="size-4" />
                                  )}
                                </Button>
                              </div>
                            </button>
                            <Separator />
                          </li>
                        ))
                      : null}
                  </ul>
                )}
              </ScrollArea>
            </Card>

            <div className="mt-3">
              <Link to="/setting-organization/third-party/line?tab=massage-line&view=create">
                <Button variant="secondary" className="w-full">
                  สร้างข้อความตอบกลับ
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Pane */}
          <div className="col-span-12 lg:col-span-7">
            <PreviewPane item={selected} />
          </div>
        </div>

        <div className="px-6 pb-6 flex items-center justify-end gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            ยกเลิก
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              handleSelectChange(selected?.content?.messages?.[0]?.text);
            }}
          >
            เลือก
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
