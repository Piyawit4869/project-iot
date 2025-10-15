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

// -----------------------------
// Types
// -----------------------------

type CategoryKey = "reply" | "displayCard" | "coupon";

interface TemplateItem {
  id: string;
  title: string;
  subtitle?: string;
  category: CategoryKey;
  createdAt: string; // ISO
  starred?: boolean;
  icon?: React.ReactNode;
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
  },
  {
    id: "t2",
    title: "ประกาศแจ้งลูกค้า 1-8 ตุลาฯ",
    subtitle: "ประกาศแจ้งลูกค้า เนื่องจากประเทศมีวันหยุด...",
    category: "reply",
    createdAt: "2025-10-08T10:00:00Z",
    icon: <MessageSquareText className="size-4" />,
  },
  {
    id: "t3",
    title: "ALL LINK ลิงก์สินค้าทั้งหมด",
    subtitle: "OGGA IDEA สินค้าใหม่ ปี 2025 ...",
    category: "displayCard",
    createdAt: "2025-10-05T10:00:00Z",
    icon: <LayoutList className="size-4" />,
  },
  {
    id: "t4",
    title: "คูปองส่วนลด 10% สัปดาห์นี้",
    subtitle: "ใช้ได้กับสินค้าในหมวด Accessories",
    category: "coupon",
    createdAt: "2025-10-01T10:00:00Z",
    icon: <TicketCheck className="size-4" />,
  },
];

// -----------------------------
// Helper UI
// -----------------------------

function ChatBubble({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="size-9 rounded-full bg-black text-white grid place-items-center font-semibold">
        og
      </div>
      <div className="max-w-[85%] rounded-2xl bg-white shadow p-3 text-sm leading-6">
        {text}
      </div>
    </div>
  );
}

function PreviewPane({ item }: { item?: TemplateItem }) {
  const fallback = (
    <div className="h-full w-full grid place-items-center text-muted-foreground">
      เลือกรายการทางซ้ายเพื่อดูตัวอย่าง
    </div>
  );

  return (
    <Card className="h-full gap-0 pt-6 pb-0">
      <CardHeader className="border-b">
        <div className="flex items-center justify-between pb-0">
          <div className="font-medium">ดูตัวอย่าง</div>
          <div className="text-muted-foreground text-xs flex items-center gap-1">
            <Lock className="size-3" /> ตัวอย่างการแสดงผล
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 h-full bg-[linear-gradient(180deg,#cfe3ff_0%,#d7e9ff_35%,#e7f0ff_100%)]">
        {item ? (
          <div className="mt-2">
            <ChatBubble
              text={
                item.id === "t1"
                  ? "รายการนี้ เป็นสินค้าในกลุ่ม Exclusive Products ของเรา ซึ่งมีการจัดจำหน่ายไปทั่วโลกกว่า 22 ประเทศ ทุกประเทศใช้มาตรฐานราคาเดียวกัน เพื่อรักษาความยุติธรรมและภาพลักษณ์ของแบรนด์ ทำให้เราไม่สามารถมอบส่วนลดเพิ่มเติมได้ในขณะนี้ค่ะ/ครับ"
                  : item.subtitle ?? "ตัวอย่างข้อความ/การ์ด/คูปอง"
              }
            />
          </div>
        ) : (
          fallback
        )}
      </CardContent>
    </Card>
  );
}

// -----------------------------
// Main Component
// -----------------------------

export default function LineTemplatePickerModal() {
  const [open, setOpen] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<string>("");
  const [category, setCategory] = React.useState<CategoryKey | "all">("all");
  const [sortBy, setSortBy] = React.useState<"newest" | "oldest">("newest");
  const [items, setItems] = React.useState<TemplateItem[]>(MOCK_ITEMS);
  const [selectedId, setSelectedId] = React.useState<string | undefined>(
    items[0]?.id
  );

  const selected = items.find((i) => i.id === selectedId);

  const filtered = items
    .filter((i) => (category === "all" ? true : i.category === category))
    .filter((i) =>
      [i.title, i.subtitle].some((t) =>
        t?.toLowerCase().includes(query.toLowerCase())
      )
    )
    .sort((a, b) =>
      sortBy === "newest"
        ? +new Date(b.createdAt) - +new Date(a.createdAt)
        : +new Date(a.createdAt) - +new Date(b.createdAt)
    );

  const toggleStar = (id: string) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, starred: !it.starred } : it))
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <PlusCircle className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[65%] h-[95%] p-0 gap-0 overflow-auto">
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
                <ul>
                  {filtered.map((it) => (
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
                            <span className="line-clamp-1">{it.title}</span>
                          </div>
                          {it.subtitle && (
                            <p className="text-xs text-muted-foreground line-clamp-1 mt-1">
                              {it.subtitle}
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
                            aria-label={it.starred ? "Unstar" : "Star"}
                          >
                            {it.starred ? (
                              <Star className="size-4 fill-current" />
                            ) : (
                              <StarOff className="size-4" />
                            )}
                          </Button>
                        </div>
                      </button>
                      <Separator />
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </Card>

            <div className="mt-3">
              <Button variant="secondary" className="w-full">
                สร้างข้อความตอบกลับ
              </Button>
            </div>
          </div>

          {/* Right Pane */}
          {/* <div className="col-span-7"> */}
          <div className="col-span-12 lg:col-span-7">
            <PreviewPane item={selected} />
          </div>
        </div>

        <div className="px-6 pb-6 flex items-center justify-end gap-2">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            ยกเลิก
          </Button>
          <Button onClick={() => setOpen(false)}>เลือก</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
