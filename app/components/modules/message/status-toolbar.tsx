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
  useUpdateStatusProgressTag,
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
import type { UpdateStatusProgressTagPayLoad } from "~/schemas/message/message";

type Status = "todo" | "done";

type Props = {
  chatRoomDetail: any;
  onChange?: (next: Status) => void;
  className?: string;
  // offset: number | null;
  setCursor: React.Dispatch<React.SetStateAction<string>>;
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
  setCursor,
  total,
  onSearchClick,
}: // offset,

Props) {
  const [search, setSearch] = React.useState<string>("");

  const inputRef = React.useRef<HTMLInputElement>(null);

  const { mutate: updateStatusProgressTag } = useUpdateStatusProgressTag(
    chatRoomDetail?.id
  );

  const [isDone, setIsDone] = React.useState(chatRoomDetail?.done);
  const [isProcess, setIsProcess] = React.useState(chatRoomDetail?.isProcess);

  const [inputOpen, setInputOpen] = React.useState<boolean>(false);
  const [openNavigateMessage, setOpenNavigateMessage] =
    React.useState<boolean>(false);
  const debouncedSearch = useDebounce(search);
  const { data } = useSearchByKeyWord(chatRoomDetail?.id, debouncedSearch);

  const [isSearchFull, setIsSearchFull] = React.useState<boolean>(false);

  const handleCloseSearch = React.useCallback(() => {
    setSearch("");
    setInputOpen(false);
  }, [setInputOpen, setSearch]);

  // const setTodo = async () => {
  //   // onChange?.("todo");
  //   markAsProcess(true);
  //   markAsDone(false);
  //   startTransition(() => {
  //     setIsProcess(true);
  //     setIsDone(false);
  //   });
  // };
  // const setDone = () => {
  //   // onChange?.("done");
  //   markAsProcess(false);
  //   markAsDone(true);

  //   startTransition(() => {
  //     setIsDone(true);
  //     setIsProcess(false);
  //   });
  // };

  // const setClear = () => {
  //   // onChange?.("clear");
  //   markAsProcess(false);
  //   markAsDone(false);

  //   startTransition(() => {
  //     setIsDone(false);
  //     setIsProcess(false);
  //   });
  // };

  const handleUpdateStatusProgressTag = async (status: string) => {
    let body = {};

    switch (status) {
      case "isProgress":
        body = {
          isProcess: true,
          done: false,
        };
        break;

      case "isDone":
        body = {
          isProcess: false,
          done: true,
        };
        break;

      case "clear":
        body = {
          isProcess: false,
          done: false,
        };
        break;
      default:
        return;
    }

    updateStatusProgressTag(body as UpdateStatusProgressTagPayLoad, {
      onSuccess() {
        if (status === "isProgress") {
          startTransition(() => {
            setIsProcess(true);
            setIsDone(false);
          });
        } else if (status === "isDone") {
          startTransition(() => {
            setIsDone(true);
            setIsProcess(false);
          });
        } else {
          startTransition(() => {
            setIsProcess(false);
            setIsDone(false);
          });
        }
      },
      onError(error) {
        console.log("error when onError", error);
      },
    });
  };

  const handleClick = (item: any) => {
    if (onSearchClick) {
      const { id, offset } = item;

      onSearchClick(id, offset);
    }
    setCursor(item.offset);
    // }
    // setOpenNavigateMessage(false);
  };

  React.useEffect(() => {
    if (data && data?.totalMatches > 0) {
      setOpenNavigateMessage(true);
    }
  }, [data]);

  return (
    <div
      className={cn(
        "flex items-center gap-3 p-2 bg-background/60 w-full",
        className
      )}
    >
      {!isSearchFull ? (
        <React.Fragment>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "h-9 px-3 rounded-md border-muted-foreground/30",
                  isProcess && "border-primary text-primary bg-gray-300"
                )}
                onClick={() => handleUpdateStatusProgressTag("isProgress")}
              >
                <MessagesSquare className="mr-2 h-[18px] w-[18px]" />
                ต้องดำเนินการ
              </Button>
            </TooltipTrigger>
            <TooltipContent>กำหนดเป็น "ต้องดำเนินการ"</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              {/* <PopoverTrigger asChild> */}
              <Button
                variant="outline"
                className={cn(
                  "h-9 px-3 rounded-md border-muted-foreground/30",
                  isDone && "border-primary text-primary bg-gray-300"
                )}
                onClick={() => handleUpdateStatusProgressTag("isDone")}
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
                  className={cn(
                    "h-9 px-3 rounded-md border-muted-foreground/30"
                  )}
                  onClick={() => handleUpdateStatusProgressTag("clear")}
                >
                  <X className="mr-2 h-[18px] w-[18px]" />
                  เคลียร์
                </Button>
              </TooltipTrigger>
              <TooltipContent>ล้างค่าแท็ก</TooltipContent>
            </Tooltip>
          )}
          <div
            className="flex w-full items-center text-gray-400 border h-9 rounded-md px-3 py-1 text-sm bg-background cursor-pointer transition-all duration-200"
            onClick={() => setIsSearchFull(true)}
          >
            ค้นหา
          </div>
        </React.Fragment>
      ) : (
        <div className="items-center w-full gap-3">
          <Popover
            open={openNavigateMessage}
            onOpenChange={setOpenNavigateMessage}
          >
            <PopoverTrigger className="flex flex-row w-full">
              <div className="flex flex-row w-full items-center gap-2">
                <Input
                  ref={inputRef}
                  autoFocus
                  placeholder="ค้นหา..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-9 px-3 text-sm rounded-md border focus:outline-none focus:ring-0 focus:border-gray-300"
                />
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSearch("");
                    setIsSearchFull(false);
                  }}
                >
                  <X size={16} />
                </Button>
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
                                <AvatarImage
                                  src={item.imageUrl}
                                  alt={item.id}
                                />
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
        </div>
      )}
    </div>
  );
}
