import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
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
  Settings,
  Layers,
  MessageSquareReply,
  CreditCard,
  Zap,
  Menu,
  MessageCircleMore,
  GalleryHorizontalEnd,
} from "lucide-react";
import { cn } from "~/lib/utils";
import {
  useLineCardContentPaginate,
  useLineFeatureMessagePaginate,
  useLineMarkFavoriteRplyMessage,
  useLineMassagePaginate,
  useLineSendCardContent,
  usePaginateChatBot,
  useQuickReplyMessagePaginate,
} from "~/api/client/settings";
import { Link, useNavigate } from "react-router";
import { SkeletonLoading } from "~/components/shared/skeleton-loading";

import { GlobalImage } from "~/components/shared/global-image";
import { FlexMessagePersonRender } from "./flex-message-person-render";
import { FlexMessageProductRender } from "./flex-message-product-render";
import { FlexMessagePlaceRender } from "./flex-message-place-render";
import { FlexMessageImageRender } from "./flex-message-image-render";
import type { platform } from "os";

// -----------------------------
// Types
// -----------------------------

type CategoryKey = "reply" | "card" | "coupon" | "quick_reply";

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

function ProfileCardCarousel({ items, category }: ProfileCardProps) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  const cardSimple = items?.meta;

  const getStep = () => {
    const card = listRef.current?.querySelector<HTMLDivElement>(
      '[data-card="profile"], [data-card="product"], [data-card="image"], [data-card="place"]'
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

  if (cardSimple?.category === "person")
    CardComponent = FlexMessagePersonRender;
  if (cardSimple?.category === "product")
    CardComponent = FlexMessageProductRender;
  if (cardSimple?.category === "place") CardComponent = FlexMessagePlaceRender;
  if (cardSimple?.category === "image") CardComponent = FlexMessageImageRender;

  return (
    <div className="w-full flex flex-col h-full overflow-hidden">
      <div className="bg-[#2a5182] text-white rounded-t-xl px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-black grid place-items-center text-xs font-semibold">
            ogga
          </div>
          <span className="text-sm font-medium">ดูตัวอย่าง</span>
        </div>
        <div className="text-xs opacity-80">ตัวอย่างการแสดงผล</div>
      </div>

      <div className="relative flex-1 overflow-y-auto bg-[linear-gradient(180deg,#cfe3ff_0%,#d7e9ff_35%,#e7f0ff_100%)] rounded-b-xl p-4">
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

          <div className="flex mt-2 items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth pr-6">
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
      <div className="h-full gap-0  pb-0">
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

  if (item.type === "card") {
    return <ProfileCardCarousel items={item} />;
  }

  return (
    <div className="h-full gap-0 pb-0">
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
  subId,
  chatRoomId,
  onSendQuickReply,
}: {
  handleSelectChange: React.Dispatch<React.SetStateAction<any>>;
  subId?: string;
  chatRoomId: string;
  onSendQuickReply?: (values: any) => void;
}) {
  const navigate = useNavigate();
  const { data, refetch, isLoading } = useLineMassagePaginate({
    pageIndex: 1,
    limit: 100,
  });

  const { data: lineFeatureFlex } = useLineFeatureMessagePaginate({
    pageIndex: 1,
    limit: 100,
  });

  const { data: chatBot } = usePaginateChatBot({
    pageIndex: 1,
    pageSize: 10,
  });
  const lineIds =
    chatBot
      ?.filter((bot: any) => bot.platform === "line")
      .map((bot: any) => bot.refId) ?? [];

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
  const [categoryValue, setCategoryValue] = React.useState<
    string | undefined
  >();

  const { mutate: lineSendCard } = useLineSendCardContent(selectedId || "");

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
      setSelectedId(data?.length ? data?.id : "");
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
    .sort((a, b) => {
      // 1. favorite มาก่อน
      if (a.isFavorite && !b.isFavorite) return -1;
      if (!a.isFavorite && b.isFavorite) return 1;

      // 2. reply มาก่อน
      const isReplyA = a.type === "reply";
      const isReplyB = b.type === "reply";
      if (isReplyA && !isReplyB) return -1;
      if (!isReplyA && isReplyB) return 1;

      // 3. เรียงตามวันที่
      return sortBy === "newest"
        ? +new Date(b.createdAt) - +new Date(a.createdAt)
        : +new Date(a.createdAt) - +new Date(b.createdAt);
    });

  const onSelect = () => {
    const value = selected?.content?.messages?.[0]?.text;

    if (categoryValue === "card") {
      sendCardApi(selectedId || "");
    } else if (categoryValue === "quick_reply") {
      onSendQuickReply?.(selected?.id);
    } else {
      handleSelectChange(value);
      setOpen(false);
    }
  };

  const sendCardApi = async (id: string) => {
    lineSendCard(
      { to: subId, chatRoomId },
      {
        onSuccess: () => {
          setOpen(false);
        },
        onError: (error: any) => {
          console.error("❌", error);
        },
      }
    );
  };

  const goToSetting = () => {
    navigate(
      `/setting-organization/third-party/line?id=${lineIds}&tab=config-card&view=list`
    );
  };

  const getCreateConfig = (category: string) => {
    switch (category) {
      case "reply":
        return {
          label: "สร้างข้อความตอบกลับ",
          path: `/setting-organization/third-party/line?id=${lineIds}&tab=massage-line&view=list`,
        };
      case "card":
        return {
          label: "สร้างการ์ดแสดงผล",
          path: `/setting-organization/third-party/line?id=${lineIds}&tab=quick-reply&view=list`,
        };
      case "quick-reply":
        return {
          label: "สร้างข้อความตอบกลับอัตโนมัติ",
          path: `/setting-organization/third-party/line?id=${lineIds}&tab=quick-reply&view=list`,
        };
      default:
        return null;
    }
  };

  const config = getCreateConfig(category);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PlusCircle className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      {/* IMPORTANT: flex-col, NO overflow here */}
      <DialogContent className="min-w-[65%] p-0 gap-0 flex flex-col">
        {/* Header */}
        <DialogHeader className="px-6 pt-5 shrink-0">
          <DialogTitle>เลือกคอนเทนต์</DialogTitle>
        </DialogHeader>

        {/* ===== Scrollable Content ===== */}
        <div className="flex-1 min-h-0 overflow-auto">
          {/* Tabs */}
          <Tabs defaultValue="all" className="w-full px-6 mt-2">
            <TabsList className="grid grid-cols-4 w-fit">
              <TabsTrigger
                value="all"
                onClick={() => setCategory("all")}
                className="hover:bg-border relative !shadow-none !border-0 rounded-md
                after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black
                after:transition-all after:w-0 data-[state=active]:after:w-full"
              >
                <div className="flex items-center gap-2">
                  <LayoutList size={16} />
                  <span>ทั้งหมด</span>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="reply"
                onClick={() => setCategory("reply")}
                className="hover:bg-border relative !shadow-none !border-0 rounded-md
                after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black
                after:transition-all after:w-0 data-[state=active]:after:w-full"
              >
                <div className="flex items-center gap-2">
                  <MessageCircleMore size={16} />

                  <span>ข้อความตอบกลับ</span>
                </div>
              </TabsTrigger>

              <TabsTrigger
                value="displayCard"
                onClick={() => setCategory("card")}
                className="hover:bg-border relative !shadow-none !border-0 rounded-md
                after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black
                after:transition-all after:w-0 data-[state=active]:after:w-full"
              >
                <div className="flex items-center gap-2">
                  <GalleryHorizontalEnd size={16} />
                  <span>การ์ดแสดงผล</span>
                </div>
              </TabsTrigger>
              <TabsTrigger
                value="quick-reply"
                onClick={() => setCategory("quick_reply")}
                className="hover:bg-border relative !shadow-none !border-0 rounded-md
                after:block after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black
                after:transition-all after:w-0 data-[state=active]:after:w-full"
              >
                <div className="flex items-center gap-2">
                  <MessageSquareText size={16} />
                  <span>ข้อความตอบกลับอัตโนมัติ</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Content */}
          <div className="px-6 pb-5 grid grid-cols-12 gap-4 mt-3">
            {/* Left Pane */}
            <div className="col-span-12 lg:col-span-5 flex flex-col">
              {/* Search */}
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
                <div className={`edit-icon-container cursor-pointer`}>
                  <div className="edit-icon-wrapper">
                    <Settings className="w-5 h-5 " onClick={goToSetting} />
                  </div>
                </div>
              </div>

              {/* List */}
              <Card className={`mt-3 ${config ? "h-[380px]" : "h-[400px]"}`}>
                <ScrollArea className="h-full">
                  {isLoading ? (
                    <ul className="flex flex-col gap-3 px-4 py-4">
                      <SkeletonLoading className="w-full h-15" />
                      <SkeletonLoading className="w-full h-15" />
                      <SkeletonLoading className="w-full h-15" />
                      <SkeletonLoading className="w-full h-15" />
                    </ul>
                  ) : (
                    <ul>
                      {filtered?.length > 0 &&
                        filtered.map((it) => (
                          <li key={it.id}>
                            <button
                              className={cn(
                                "w-full text-left px-4 py-3 hover:bg-muted/60 grid grid-cols-[1fr_auto] gap-2",
                                selectedId === it.id && "bg-muted"
                              )}
                              onClick={() => {
                                setSelectedId(it.id);
                                setCategoryValue(it.type);
                              }}
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

                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleStar(it.id);
                                }}
                              >
                                {it.isFavorite ? (
                                  <Star className="size-4 fill-current" />
                                ) : (
                                  <StarOff className="size-4" />
                                )}
                              </Button>
                            </button>
                            <Separator />
                          </li>
                        ))}
                    </ul>
                  )}
                </ScrollArea>
              </Card>

              {config && (
                <div className="mt-3">
                  <Link to={config.path}>
                    <Button variant="secondary" className="w-full">
                      {config.label}
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Right Pane */}
            <div className="col-span-12 lg:col-span-7 h-[430px]">
              <div className="h-full">
                <PreviewPane item={selected} />
              </div>
            </div>
          </div>
        </div>

        {/* Footer (FIXED) */}
        <DialogFooter className="px-6 py-5   shrink-0 flex items-center justify-end gap-5">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            ยกเลิก
          </Button>
          <Button onClick={onSelect}>
            {category === "card" ? "ส่ง" : "เลือก"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
