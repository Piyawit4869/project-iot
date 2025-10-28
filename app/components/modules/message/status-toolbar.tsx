import * as React from "react";

import { CheckCircle, MessagesSquare, Search, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";
import { startTransition } from "react";
import {
  useMarkAsDone,
  useMarkAsProcess,
  useSearchByKeyWord,
} from "~/api/client/message/useMessage";
import { useDebounce } from "~/hooks/use-debounce";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { formatDateAndTime } from "~/components/shared/global-format";

type Status = "todo" | "done";

type Props = {
  chatRoomDetail: any;
  onChange?: (next: Status) => void;
  className?: string;
  // offset: number | null;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  total: number;
  onSearchClick?: (messageId: string, offset: number) => void;
};

function initials(text: string) {
  if (!text) return "";
  const parts = text.split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function EmptyState() {
  return (
    <div className="py-10 flex items-center justify-center text-muted-foreground">
      ไม่พบข้อความ
    </div>
  );
}

type CalcParams = {
  total: number;
  targetTopIndex: number;
  limit: number;
};

export function calcOffsetFromBottom(params: CalcParams) {
  const { total, targetTopIndex, limit } = params;

  if (total <= limit) return { offset: 0, limit };

  const safeTopIndex = Math.max(0, Math.min(targetTopIndex, total - 1));

  const bottomIndex = total - 1 - safeTopIndex;

  const pageStart = Math.floor(bottomIndex / limit) * limit;

  const maxStart = Math.max(total - limit, 0);
  const offset = Math.min(pageStart, maxStart);

  return { offset, limit };
}

export default function StatusToolbar({
  chatRoomDetail,
  className,
  setOffset,
  total,
  onSearchClick,
}: // offset,

Props) {
  const [search, setSearch] = React.useState<string>("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  const { mutate: markAsProcess } = useMarkAsProcess(chatRoomDetail?.id);
  const { mutate: markAsDone } = useMarkAsDone(chatRoomDetail?.id);

  const [isDone, setIsDone] = React.useState(chatRoomDetail?.done);
  const [isProcess, setIsProcess] = React.useState(chatRoomDetail?.isProcess);

  const [inputOpen, setInputOpen] = React.useState<boolean>(false);
  const [openNavigateMessage, setOpenNavigateMessage] =
    React.useState<boolean>(false);
  const debouncedSearch = useDebounce(search);
  const { data } = useSearchByKeyWord(chatRoomDetail?.id, debouncedSearch);
  const handleCloseSearch = React.useCallback(() => {
    setSearch("");
    setInputOpen(false);
  }, [setInputOpen, setSearch]);

  const setTodo = async () => {
    // onChange?.("todo");
    markAsProcess(true);
    markAsDone(false);
    startTransition(() => {
      setIsProcess(true);
      setIsDone(false);
    });
  };
  const setDone = () => {
    // onChange?.("done");
    markAsProcess(false);
    markAsDone(true);

    startTransition(() => {
      setIsDone(true);
      setIsProcess(false);
    });
  };

  const setClear = () => {
    // onChange?.("clear");
    markAsProcess(false);
    markAsDone(false);

    startTransition(() => {
      setIsDone(false);
      setIsProcess(false);
    });
  };

  const handleClick = (item: any) => {
    if (onSearchClick) {
      const { id, offset } = item;

      onSearchClick(id, offset);
    }
    setOffset(item.offset);
    // }
    // setOpenNavigateMessage(false);
  };

  React.useEffect(() => {
    console.log({ data });
    if (data && data?.totalMatches > 0) {
      setOpenNavigateMessage(true);
    }
  }, [data]);

  return (
    // <TooltipProvider delayDuration={150}>
    <div
      className={cn("flex items-center gap-3 bg-background/60 p-2", className)}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "h-9 px-3 rounded-md border-muted-foreground/30",
              isProcess && "border-primary text-primary bg-gray-300"
            )}
            onClick={setTodo}
          >
            <MessagesSquare className="mr-2 h-[18px] w-[18px]" />
            ต้องดำเนินการ
          </Button>
        </TooltipTrigger>
        <TooltipContent>กำหนดเป็น "ต้องดำเนินการ"</TooltipContent>
      </Tooltip>

      {/* <Popover open={open} onOpenChange={setOpen}> */}

      <Tooltip>
        <TooltipTrigger asChild>
          {/* <PopoverTrigger asChild> */}
          <Button
            variant="outline"
            className={cn(
              "h-9 px-3 rounded-md border-muted-foreground/30",
              isDone && "border-primary text-primary bg-gray-300"
            )}
            onClick={setDone}
          >
            <CheckCircle className="mr-2 h-[18px] w-[18px]" />
            ดำเนินการแล้ว
          </Button>
          {/* </PopoverTrigger> */}
        </TooltipTrigger>
        <TooltipContent>กำหนดเป็น "ดำเนินการแล้ว"</TooltipContent>
      </Tooltip>
      {(isProcess || isDone) && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              className={cn("h-9 px-3 rounded-md border-muted-foreground/30")}
              onClick={setClear}
            >
              <X className="mr-2 h-[18px] w-[18px]" />
              เคลียร์
            </Button>
          </TooltipTrigger>
          <TooltipContent>ล้างค่าแท็ก</TooltipContent>
        </Tooltip>
      )}
      {/* <PopoverContent
            align="start"
            sideOffset={6}
            className="w-[260px] text-sm"
          >
            <div className="space-y-2">
              <div className="font-medium">กำหนดสถานะเป็น “ดำเนินการแล้ว”</div>
              <p className="text-muted-foreground">
                บันทึกสถานะเรียบร้อย คุณต้องการแจ้งลูกค้าหรือไม่
              </p>
              <div className="flex items-center gap-2 pt-1">
                <Button size="sm" onClick={() => setOpen(false)}>
                  ปิด
                </Button>
                <a
                  href="#send-email"
                  className="text-primary underline underline-offset-4"
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: ใส่ลอจิกส่งอีเมลของคุณที่นี่
                    setOpen(false);
                  }}
                >
                  ส่งอีเมล
                </a>
              </div>
            </div>
          </PopoverContent>
        </Popover> */}

      {/* ช่องค้นหา (ตามสไตล์ภาพ) */}
      {/* <div className="ml-1 flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="ค้นหา..." className="h-9 w-[220px] pl-8" />
          </div>
        </div> */}
      <div
        className="flex items-center text-gray-400 border h-9 w-[220px] rounded-md px-3 py-1 text-sm bg-background w-1/2 transition-all duration-200 focus:outline-none focus:ring-0 focus:border-gray-300"
        onClick={() => setInputOpen(true)}
      >
        ค้นหา
      </div>
      <Popover open={openNavigateMessage} onOpenChange={setOpenNavigateMessage}>
        <PopoverTrigger>
          <div className="flex items-center gap-2">
            <input
              ref={inputRef}
              autoFocus
              type="text"
              placeholder="ค้นหา"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              // onChange={handleChangeSearchMessageNavigate}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white w-full transition-all duration-200 focus:outline-none focus:ring-0 focus:border-gray-300"
            />
          </div>
        </PopoverTrigger>
        {data && data?.totalMatches > 0 && (
          <PopoverContent
            align="start"
            sideOffset={6}
            className="w-[px] text-sm"
          >
            <div className="max-h-[30vh] overflow-y-auto">
              {data.matches === 0 ? (
                <EmptyState />
              ) : (
                data.matches.map((item: any, idx: any) => (
                  <React.Fragment key={item.id}>
                    {/* <ListItem item={it} onClick={() => onSelect?.(it)} /> */}

                    <div
                      onClick={() => handleClick(item)}
                      className="cursor-pointer w-full text-left bg-background hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3 px-4 py-3">
                        <Avatar className="h-10 w-10 shrink-0">
                          {item.imageUrl ? (
                            <AvatarImage src={item.imageUrl} alt={item.id} />
                          ) : (
                            <AvatarFallback>
                              {item.avatarText?.slice(0, 2) ??
                                initials(item?.title)}
                            </AvatarFallback>
                          )}
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2 min-w-0">
                              {item.unread && (
                                <span className="inline-block h-2 w-2 rounded-full bg-primary shrink-0" />
                              )}
                              <span
                                className={
                                  "truncate text-base " +
                                  (item.unread
                                    ? "font-semibold"
                                    : "font-medium")
                                }
                                title={item.sender}
                              >
                                {item.sender}
                              </span>
                            </div>
                            <span className="text-xs text-muted-foreground shrink-0">
                              {formatDateAndTime(item.createdAt)}
                            </span>
                          </div>

                          <p className="truncate max-w-[340px] text-sm text-muted-foreground mt-1 line-clamp-1">
                            {item.message}
                          </p>
                        </div>
                      </div>
                    </div>
                    {idx !== data.matches.length - 1 && <Separator />}
                  </React.Fragment>
                ))
              )}
            </div>
          </PopoverContent>
        )}
      </Popover>
      <div className="flex items-center gap-2">
        <button
          onClick={handleCloseSearch}
          className="px-2 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300 transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
    // </TooltipProvider>
  );
}
