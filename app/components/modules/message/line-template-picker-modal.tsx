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

import { PreviewPane } from "./flex-message/preview-pane";

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
  content?: {
    items: string;
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
      setOpen(false);
    } else if (categoryValue === "quick_reply") {
      onSendQuickReply?.(selected?.id);
      setOpen(false);
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
