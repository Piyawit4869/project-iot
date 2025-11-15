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
  Lock,
  PlusCircle,
} from "lucide-react";
import { cn } from "~/lib/utils";
import {
  useLineMarkFavoriteRplyMessage,
  useLineMassagePaginate,
} from "~/api/client/settings";
import { Link } from "react-router";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";

// -----------------------------
// Types
// -----------------------------

type CategoryKey = "reply" | "displayCard" | "coupon";

export type ProfileCardData = {
  imageUrl: string;
  name: string;
  position: string;
  note?: string;
  callText?: string; // ปุ่ม/ลิงก์ โทร
  emailText?: string; // ปุ่ม/ลิงก์ อีเมล
  tel?: string; // ใช้สร้าง tel:
  email?: string; // ใช้สร้าง mailto:
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
    category: "displayCard",
    createdAt: "2025-10-05T10:00:00Z",
    icon: <LayoutList className="size-4" />,
    profileCards: [
      {
        imageUrl:
          "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=600&auto=format&fit=crop",
        name: "Ms.GARFEILD",
        position: "Sale Admin",
        note: "สนับสนุนฝ่ายขาย",
        callText: "โทรหาคุณการ์ฟิว",
        emailText: "ส่งอีเมล",
        tel: "0912345678",
        email: "garfeild@example.com",
      },
      {
        imageUrl:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop",
        name: "Ms.MOLLY",
        position: "Client Solutions",
        note: "ผู้เชี่ยวชาญลูกค้าองค์กร",
        callText: "โทรหาคุณมอลลี่",
        emailText: "ส่งอีเมล",
        tel: "0891112222",
        email: "molly@example.com",
      },
      // เพิ่มได้เรื่อย ๆ
    ],
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

function ProfileCardPreview({ data }: { data: ProfileCardData }) {
  return (
    <div className="w-full">
      <div className="bg-[#2a5182] text-white rounded-t-xl px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-black grid place-items-center text-xs font-semibold">
            ogga
          </div>
          <span className="text-sm font-medium">ดูตัวอย่าง</span>
        </div>
        <div className="text-xs opacity-80">ตัวอย่างการแสดงผล</div>
      </div>

      <div className="bg-[#e6eefb] rounded-b-xl p-4">
        <div className="flex gap-3">
          {/* การ์ดโปรไฟล์ซ้าย */}
          <div className="flex-1">
            <div className="rounded-2xl bg-white shadow p-5 text-center h-full">
              <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4">
                {/* ใช้ <img> เพื่อความง่าย (คุณสามารถเปลี่ยนเป็น GlobalImage/Image ได้ตามโปรเจกต์) */}
                <img
                  src={data.imageUrl}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-lg font-semibold">{data.name}</div>
              <div className="text-sm text-gray-600">{data.position}</div>
              {data.note && (
                <div className="text-xs text-gray-500 mt-1">{data.note}</div>
              )}

              <div className="mt-4 space-y-2">
                <button className="w-full border rounded-xl px-3 py-2 text-sm hover:bg-gray-50">
                  {data.callText ?? "โทรหา"}
                </button>
                <button className="w-full border rounded-xl px-3 py-2 text-sm hover:bg-gray-50">
                  {data.emailText ?? "ส่งอีเมล"}
                </button>
              </div>
            </div>
          </div>

          {/* สไลด์ถัดไป placeholder ขวา (ให้ฟีลแบบรูปตัวอย่างมีการ์ดเลื่อนได้) */}
          <div className="hidden md:block w-12 shrink-0">
            <div className="h-full rounded-2xl border border-dashed grid place-items-center text-gray-400">
              →
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileCard({ p }: { p: ProfileCardData }) {
  return (
    <div
      data-card="profile"
      className="rounded-2xl bg-white shadow p-5 text-center w-[260px] h-full border border-[#d8e5fb]"
    >
      <div className="w-36 h-36 rounded-full overflow-hidden mx-auto mb-4">
        <img
          src={p.imageUrl}
          alt={p.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-lg font-semibold">{p.name}</div>
      <div className="text-sm text-gray-700">{p.position}</div>
      {p.note && <div className="text-xs text-gray-500 mt-1">{p.note}</div>}

      <div className="mt-4 space-y-1">
        <a
          href={p.tel ? `tel:${p.tel}` : "#"}
          className="block text-sm text-blue-700 hover:underline"
        >
          {p.callText ?? "โทรหา"}
        </a>
        <a
          href={p.email ? `mailto:${p.email}` : "#"}
          className="block text-sm text-blue-700 hover:underline"
        >
          {p.emailText ?? "ส่งอีเมล"}
        </a>
      </div>
    </div>
  );
}

function ProfileCardCarousel({ items }: { items: ProfileCardData[] }) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

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

  return (
    <div className="w-full">
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

        <div
          ref={listRef}
          className="flex pl-20 items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth pr-6"
        >
          {items.map((p, idx) => (
            <div key={`${p.name}-${idx}`} className="shrink-0">
              <ProfileCard p={p} />
            </div>
          ))}
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
  if (item.category === "displayCard" && item.profileCards?.length) {
    return <ProfileCardCarousel items={item.profileCards} />;
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

  const { mutate } = useLineMarkFavoriteRplyMessage();

  const [open, setOpen] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>("");
  const [category, setCategory] = React.useState<CategoryKey | "all">("all");
  const [sortBy, setSortBy] = React.useState<"newest" | "oldest">("newest");
  const [items, setItems] = React.useState<any[]>(
    data && data?.items && data?.items?.length ? data?.items : []
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
    if (data && data.items && data.items?.length) {
      setSelectedId(data?.items?.length ? data?.items[0]?.id : "");
      setItems(data?.items);
    }
  }, [data]);

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
          <Tabs defaultValue="reply" className="w-full">
            <TabsList className="grid grid-cols-3 w-fit">
              <TabsTrigger value="reply" onClick={() => setCategory("reply")}>
                ข้อความตอบกลับ
              </TabsTrigger>
              <TabsTrigger
                value="displayCard"
                onClick={() => setCategory("displayCard")}
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
              <Select
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
                  {/* <SelectItem value="coupon">คูปอง</SelectItem> */}
                </SelectContent>
              </Select>
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
