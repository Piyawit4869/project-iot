import React from "react";
import { GlobalImage } from "~/components/shared/global-image";
import { cn } from "~/lib/utils";
import { useChat } from "~/providers/chat/useChat";
import {
  mergeRoomImmutable,
  useChatRoom,
  type ChatRoom,
} from "~/providers/chat/useChatRoom";
import { useRouteLoaderData } from "react-router";
import { socketConfig } from "~/lib/sockets";
import { Button } from "~/components/ui/button";
import {
  CheckCircle,
  ChevronDown,
  Clock,
  FileUp,
  Inbox,
  Mail,
  Menu,
  MessagesSquare,
  OctagonAlert,
  Search,
  User,
  X,
} from "lucide-react";
import { TagLabel } from "~/components/shared/tag-label";
import { DateTimeStampChatDisplay } from "~/utils/date-format";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Separator } from "~/components/ui/separator";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";

interface Props {
  handleChangeSelectedRoom: (room: any) => void;
  api: string;
  resize: number;
  details: any;
}
export default function ChatlistSidebar({
  api,
  resize,
  details,
  handleChangeSelectedRoom,
}: Props) {
  const { me } = useRouteLoaderData("root");

  const [open, setOpen] = React.useState<boolean>(false);
  const [inputOpen, setInputOpen] = React.useState<boolean>(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const {
    chatRooms,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    setSidebarOpen,
    fetchNextPage,
    setOnSelectRoom,
    currentCustomer,
  } = details;

  const { search, setSearch, filterRoom } = useChatRoom();

  const [allRooms, setAllRooms] = React.useState<ChatRoom[]>([]);

  const { currentRoomId } = useChat();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el || isFetchingNextPage || !hasNextPage) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 50) {
      fetchNextPage();
    }
  };

  const handleCloseSearch = React.useCallback(() => {
    setSearch("");
    setInputOpen(false);
  }, [setInputOpen, setSearch]);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (
      el &&
      el.scrollHeight <= el.clientHeight &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  React.useEffect(() => {
    const socket = socketConfig(api);

    if (me?.branchId) {
      socket.emit("rooms", `${me.branchId}`);
    }

    socket.on("rooms", (room: any) => {
      setAllRooms((prev) => mergeRoomImmutable(prev, room));
    });

    return () => {
      socket.disconnect();
    };
  }, [me]);

  React.useEffect(() => {
    if (chatRooms) {
      setAllRooms(chatRooms);
    }
  }, [chatRooms]);

  return (
    <aside className="h-full border-r dark:bg-background flex flex-col border-l">
      <div className="p-3 border-b flex flex-col">
        <div className="flex justify-between px-0">
          <h2 className="text-lg font-semibold">แชท</h2>
        </div>
      </div>

      <div ref={containerRef} className="relative">
        <Popover open={open} onOpenChange={setOpen}>
          <div className="p-3">
            {inputOpen ? (
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  autoFocus
                  type="text"
                  placeholder="ค้นหา"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white w-full transition-all duration-200 focus:outline-none focus:ring-0 focus:border-gray-300"
                />
                <button
                  onClick={handleCloseSearch}
                  className="px-2 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300 transition-colors"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4 transition-all duration-200">
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-1">
                    <Menu className="w-4 h-4" />
                    <p className="text-sm font-semibold">ทั้งหมด</p>
                  </button>
                </PopoverTrigger>

                <input
                  type="text"
                  placeholder="ค้นหา"
                  value={search}
                  className="border  rounded-md px-3 py-1 text-sm bg-background w-1/2 transition-all duration-200 focus:outline-none focus:ring-0 focus:border-gray-300"
                  onClick={() => setInputOpen(true)}
                />
              </div>
            )}
          </div>

          <Separator className="w-full m-0" />

          <PopoverContent
            align="start"
            className="p-0 w-64 max-h-none overflow-visible"
          >
            <Command className="max-h-none overflow-visible">
              <CommandList className="max-h-none overflow-visible">
                <CommandGroup heading="">
                  <CommandItem className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Inbox className="w-4 h-4 text-gray-500" /> ทั้งหมด
                    </div>
                    <span className="bg-orange-100 text-gray-500 text-xs font-semibold rounded-full px-2 py-0.5">
                      3
                    </span>
                  </CommandItem>
                  <CommandSeparator />
                  <CommandItem className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" /> อินบ็อกซ์
                    </div>
                    <span className="bg-orange-100 text-gray-500 text-xs font-semibold rounded-full px-2 py-0.5">
                      3
                    </span>
                  </CommandItem>
                  <CommandItem className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-500" /> ยังไม่อ่าน
                    </div>
                    <span className="bg-orange-100 text-gray-500 text-xs font-semibold rounded-full px-2 py-0.5">
                      3
                    </span>
                  </CommandItem>
                  <CommandItem className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-gray-500" /> ดำเนินการ
                  </CommandItem>
                  <CommandItem className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-gray-500" /> เสร็จสิ้น
                  </CommandItem>
                </CommandGroup>
                <CommandSeparator />

                <CommandGroup>
                  <CommandItem className="flex items-center gap-2">
                    <FileUp className="w-4 h-4 text-gray-500" /> นำออกข้อมูล
                  </CommandItem>
                  <CommandSeparator />
                  <CommandItem className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" /> รับผิดชอบ
                  </CommandItem>
                  <CommandSeparator />
                  <CommandItem className="flex items-center gap-2">
                    <OctagonAlert className="w-4 h-4 text-gray-500" /> สแปม
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {inputOpen &&
          (search !== "" ? (
            filterRoom &&
            filterRoom.length > 0 &&
            filterRoom.map((room: any, i: number) => (
              <ChatItem
                key={room?.id + i}
                roomId={room?.id ?? ""}
                selectedRoom={currentRoomId}
                resize={resize}
                name={room?.name}
                message={room?.latestMessage?.message ?? ""}
                time={room?.latestMessage?.createdAt ?? ""}
                image={room?.imageUrl || ""}
                unread={room?.unreadMessageCount > 0}
                countUnreadMessage={room?.unreadMessageCount || 0}
                roomDetail={room}
                currentCustomer={currentCustomer}
                onChatClick={() => {
                  handleChangeSelectedRoom(room);
                  setSidebarOpen(false);
                  setOnSelectRoom(true);
                }}
              />
            ))
          ) : (
            <React.Fragment>
              <div className="flex flex-col gap-3 w-full mt-2 px-3 pb-2">
                <p className="text-sm font-semibold">การค้นหาล่าสุด</p>
                {["ไอที", "ไอ", "ทีม"].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between cursor-pointer hover:bg-gray-100 rounded-md p-1"
                    onClick={() => console.log("Click on item:", item)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-300">
                        <Search className="w-3 h-3 text-gray-600" />
                      </div>
                      <p className="text-sm font-semibold">{item}</p>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("Click delete on item:", item);
                      }}
                    >
                      <X className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                    </Button>
                  </div>
                ))}
              </div>

              <Separator className="w-full m-0" />

              <div className="flex gap-3 mt-2 px-3">
                <button
                  className="text-sm font-semibold hover:text-gray-700"
                  onClick={() =>
                    console.log("ปิดใช้งานการบันทึกอัตโนมัติ clicked")
                  }
                >
                  <p className="text-xs font-semibold">
                    ปิดใช้งานการบันทึกอัตโนมัติ
                  </p>
                </button>
                <p className="text-xs font-semibold">|</p>
                <button
                  className="text-sm font-semibold hover:text-gray-700"
                  onClick={() => console.log("ลบทั้งหมด clicked")}
                >
                  <p className="text-xs font-semibold">ลบทั้งหมด</p>
                </button>
              </div>
            </React.Fragment>
          ))}
      </div>

      {!inputOpen && (
        <div
          className="flex-1 overflow-y-auto"
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {isLoading ? (
            <LoadingSkeleton />
          ) : allRooms.length > 0 ? (
            allRooms.map((room: any, i: number) => (
              <ChatItem
                key={room?.id + i}
                roomId={room?.id ?? ""}
                selectedRoom={currentRoomId}
                resize={resize}
                name={room?.name}
                message={room?.latestMessage?.message ?? ""}
                time={room?.latestMessage?.createdAt ?? ""}
                image={room?.imageUrl || ""}
                unread={room?.unreadMessageCount > 0}
                countUnreadMessage={room?.unreadMessageCount || 0}
                currentCustomer={currentCustomer}
                roomDetail={room}
                onChatClick={() => {
                  handleChangeSelectedRoom(room);
                  setSidebarOpen(false);
                  setOnSelectRoom(true);
                }}
              />
            ))
          ) : (
            <EmptyChat />
          )}

          {hasNextPage && (
            <div className="p-4 text-center text-gray-400">
              กำลังโหลดเพิ่มเติม...
            </div>
          )}
        </div>
      )}
    </aside>
  );
}

type ChatItemProps = {
  name: string;
  message: string;
  time: string;
  unread?: boolean;
  image?: string;
  countUnreadMessage: number;
  onChatClick?: () => void;
  resize: number;
  selectedRoom: string;
  roomId: string;
  currentCustomer: any;
  roomDetail?: any;
};

function ChatItem({
  name,
  message,
  time,
  unread = false,
  image,
  countUnreadMessage = 0,
  onChatClick,
  resize,
  roomId,
  roomDetail,
}: ChatItemProps) {
  const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}`;
  const { autoReadMsg } = useChatRoom();
  const { setCurrentRoomId, currentRoomId } = useChat();

  return (
    <div
      className={cn(
        "sm:justify-center",
        currentRoomId === roomId && "bg-gray-300 dark:bg-gray-700",
        resize <= 25 && "justify-center",
        "flex items-center px-4 py-3 hover:bg-border cursor-pointer transition w-full"
        // unread && "bg-gray-200"
      )}
      onClick={() => {
        setCurrentRoomId?.(roomId);
        onChatClick?.();
      }}
    >
      <div className="relative w-12 h-12 shrink-0">
        <GlobalImage
          src={!image || image === "" ? fallbackImage : image}
          alt={name}
          className="w-[40px] h-[40px] rounded-full object-cover"
        />

        {!autoReadMsg && countUnreadMessage > 0 && (
          <span
            className="absolute top-0 right-0 inline-grid place-items-center min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs font-medium"
            aria-hidden
          >
            {countUnreadMessage}
          </span>
        )}
      </div>

      {resize > 25 && (
        <div className="hidden ml-3 lg:flex flex-col min-w-0 flex-1">
          <div className="flex flex-col justify-between items-start gap-2 min-w-0">
            <div className="flex w-full justify-between items-center gap-2 min-w-0">
              <p className={cn("text-sm truncate max-w-[160px]")}>{name}</p>

              <span className="text-xs text-black-400 whitespace-nowrap shrink-0 text-end">
                {DateTimeStampChatDisplay(time ?? "")}
              </span>
            </div>

            <div className="flex flex-row justify-between">
              <p
                className={cn(
                  "text-sm truncate text-black-400  sm:max-w-[200px] lg:max-w-[250px] min-w-[170px] whitespace-nowrap overflow-hidden",
                  unread && "font-medium",
                  (roomDetail?.isDone || roomDetail?.isProcess) &&
                    "truncate w-[80px]"
                )}
              >
                {message}
              </p>

              {(roomDetail?.isDone || roomDetail?.isProcess) && (
                <div className="flex flex-col items-center  justify-end w-[90px]">
                  {roomDetail?.isDone && (
                    <TagLabel
                      label="ดำเนินการแล้ว"
                      icon={<CheckCircle className="mr-1 h-[10px] w-[10px]" />}
                      color="green"
                    />
                  )}

                  {roomDetail?.isProcess && (
                    <TagLabel
                      label="ต้องดำเนินการ"
                      icon={
                        <MessagesSquare className="mr-1 h-[10px] w-[10px]" />
                      }
                      color="orange"
                      className="text-[10px]"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const LoadingSkeleton = () => {
  return (
    <div className="space-y-3 p-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3 animate-pulse">
          <div className="w-12 h-12 rounded-full bg-gray-200" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-100 rounded w-2/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

const EmptyChat = () => {
  return (
    <div className="text-center text-gray-400 py-6">
      ขณะนี้ยังไม่มีรายการแชท
    </div>
  );
};
