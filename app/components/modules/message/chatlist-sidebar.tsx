import React from "react";
import { useRouteLoaderData } from "react-router";

import { GlobalImage } from "~/components/shared/global-image";
import { useChat } from "~/providers/chat/useChat";
import {
  mergeRoomImmutable,
  useChatRoom,
  type ChatRoom,
} from "~/providers/chat/useChatRoom";
import { socketConfig } from "~/lib/sockets";
import {
  CheckCircle,
  Clock,
  FileUp,
  Inbox,
  Menu,
  MessagesSquare,
  OctagonAlert,
} from "lucide-react";
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
import { SkeletonLoading } from "~/components/shared/skeleton-loading";
import { Avatar } from "~/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { ChatItem } from "./chat-item";
import { useRoomChatSummary } from "~/api/client/message/useMessage";

type StatusKey = "unread" | "done" | "isProcess" | "isSpam" | "all";

interface Props {
  handleChangeSelectedRoom: (room: any) => void;
  api: string;
  details: any;
}
export default function ChatlistSidebar({
  api,
  details,
  handleChangeSelectedRoom,
}: Props) {
  const { me } = useRouteLoaderData("root");

  const [recent, setRecent] = React.useState<string[]>([]);

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

  const { search, setSearch, select, setSelect, filterRoom, meta } =
    useChatRoom();

  const {
    data: roomSummary,
    refetch: refetchSummary,
    isFetching: isSummaryFetching,
  } = useRoomChatSummary();
  const [allRooms, setAllRooms] = React.useState<ChatRoom[]>([]);

  const RECENT_KEY = "recent-searches";
  const LIMIT = 5;

  const { currentRoomId, addMessageAI, removeMessage } = useChat();
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

  const handleClickMenu = (action: string) => {
    setSelect(action);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
  };

  const addRecentSearch = () => {
    const existingRaw = localStorage.getItem(RECENT_KEY);
    const existing = existingRaw ? JSON.parse(existingRaw) : [];

    const filtered = existing.filter((item: string) => item !== search);

    const updated = [search, ...filtered].slice(0, LIMIT);

    setRecent(updated);

    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  const removeRecentSearch = (item: string) => {
    const raw = localStorage.getItem(RECENT_KEY);
    const list = raw ? JSON.parse(raw) : [];

    const updated = list.filter((x: string) => x !== item);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));

    setRecent(updated);
  };

  const clearRecent = () => {
    localStorage.removeItem(RECENT_KEY);
    setRecent([]);
  };

  const loadRecentSearch = () => {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  };

  React.useEffect(() => {
    const recent = loadRecentSearch();
    setRecent(recent);
  }, []);

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
      console.log("rooms in", room);

      setAllRooms((prev) => {
        const merged = mergeRoomImmutable(prev, room);

        return merged;
      });

      //assistants
      if (room.chatRoomType === "assistant") {
        addMessageAI({
          ...room,
          imageUrl:
            room.imageUrl || `https://ui-avatars.com/api/?name=${room.sender}`,
          streaming: true,
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [me]);

  React.useEffect(() => {
    if (filterRoom.length > 0) {
      setAllRooms(filterRoom);
    } else {
      setAllRooms(chatRooms);
    }
  }, [chatRooms, filterRoom, select]);

  const compareText: Record<StatusKey, string> = {
    unread: "ยังไม่อ่าน",
    done: "ดำเนินการแล้ว",
    isProcess: "ต้องดำเนินการ",
    isSpam: "สแปม",
    all: "ทั้งหมด",
  };

  const resultStatus = compareText?.[select as StatusKey];

  return (
    <aside className="h-full border-r dark:bg-background flex flex-col border-l">
      <div className="p-3 border-b flex flex-col">
        <div className="flex justify-between items-center px-0">
          <h2 className="text-lg font-semibold">แชท</h2>

          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="w-[25px] h-[25px]">
                <GlobalImage
                  src="https://img.freepik.com/premium-vector/line-icon-vector-logo-set_1097694-1650.jpg"
                  alt="avatar"
                  className="rounded-full object-cover"
                  notShowPreview
                />
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>เชื่อมต่อกับแอพพลิเคขั่น LINE</TooltipContent>
          </Tooltip>
        </div>
      </div>

      <div ref={containerRef} className="relative min-w-[308px]">
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
                  // onChange={(e) => setSearch(e.target.value)}
                  onChange={handleSearch}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm bg-white w-full transition-all duration-200 focus:outline-none focus:ring-0 focus:border-gray-300"
                />
                <button
                  onClick={handleCloseSearch}
                  className="px-2 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300 transition-colors cursor-pointer"
                >
                  ✕
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4 transition-all duration-200">
                <PopoverTrigger asChild>
                  <button className="flex items-center gap-1 cursor-pointer">
                    <Menu className="w-4 h-4" />
                    <p className="text-sm font-semibold">{resultStatus}</p>
                  </button>
                </PopoverTrigger>

                <div
                  className="text-gray-400 border h-[30px] rounded-md px-3 py-1 text-sm bg-background w-1/2 transition-all duration-200 focus:outline-none focus:ring-0 focus:border-gray-300"
                  onClick={() => setInputOpen(true)}
                >
                  ค้นหา
                </div>
              </div>
            )}
          </div>

          <Separator className="w-full m-0" />

          <PopoverContent
            align="start"
            className="p-0 w-64 max-h-none overflow-visible"
            onOpenAutoFocus={() => refetchSummary?.()}
          >
            <Command className="max-h-none overflow-visible">
              <CommandList className="max-h-none overflow-visible">
                <CommandGroup heading="">
                  {isSummaryFetching ? (
                    <div className="flex flex-col ">
                      <SkeletonLoading width="w-full" height="h-[30px]" />
                    </div>
                  ) : (
                    <CommandItem
                      className={`
    flex justify-between items-center cursor-pointer
    ${select === "all" ? "bg-orange-50 font-semibold" : ""}
  `}
                      onSelect={() => handleClickMenu("all")}
                    >
                      <div className="flex items-center gap-2">
                        <Inbox className="w-4 h-4 text-gray-500" /> ทั้งหมด
                      </div>
                      <span className="bg-orange-100 text-gray-500 text-xs font-semibold rounded-full px-2 py-0.5">
                        {isSummaryFetching ? (
                          <SkeletonLoading />
                        ) : (
                          (roomSummary?.total ?? 0)
                        )}
                      </span>
                    </CommandItem>
                  )}
                  <CommandSeparator />
                  {/* <CommandItem className="flex justify-between items-center cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" /> อินบ็อกซ์
                    </div>
                    <span className="bg-orange-100 text-gray-500 text-xs font-semibold rounded-full px-2 py-0.5">
                      3
                    </span>
                  </CommandItem> */}
                  {isSummaryFetching ? (
                    <div className="flex flex-col ">
                      <SkeletonLoading width="w-full" height="h-[30px]" />
                    </div>
                  ) : (
                    <CommandItem
                      className={`
    flex justify-between items-center cursor-pointer
    ${select === "unread" ? "bg-orange-50 font-semibold" : ""}
  `}
                      onSelect={() => handleClickMenu("unread")}
                    >
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" /> ยังไม่อ่าน
                      </div>
                      <span className="bg-orange-100 text-gray-500 text-xs font-semibold rounded-full px-2 py-0.5">
                        {isSummaryFetching ? (
                          <SkeletonLoading />
                        ) : (
                          (roomSummary?.totalUnread ?? 0)
                        )}
                      </span>
                    </CommandItem>
                  )}
                  {isSummaryFetching ? (
                    <div className="flex flex-col ">
                      <SkeletonLoading width="w-full" height="h-[30px]" />
                    </div>
                  ) : (
                    <CommandItem
                      className={`
    flex justify-between items-center cursor-pointer
    ${select === "isProcess" ? "bg-orange-50 font-semibold" : ""}
  `}
                      onSelect={() => handleClickMenu("isProcess")}
                    >
                      <div className="flex items-center gap-2">
                        <MessagesSquare className="w-4 h-4 text-gray-500" />
                        ต้องดำเนินการ
                      </div>
                      <span className="bg-orange-100 text-gray-500 text-xs font-semibold rounded-full px-2 py-0.5">
                        {isSummaryFetching ? (
                          <SkeletonLoading />
                        ) : (
                          (roomSummary?.totalProcess ?? 0)
                        )}
                      </span>
                    </CommandItem>
                  )}
                  {isSummaryFetching ? (
                    <div className="flex flex-col ">
                      <SkeletonLoading width="w-full" height="h-[30px]" />
                    </div>
                  ) : (
                    <CommandItem
                      className={`
    flex justify-between items-center cursor-pointer
    ${select === "done" ? "bg-orange-50 font-semibold" : ""}
  `}
                      onSelect={() => handleClickMenu("done")}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-500" />{" "}
                        ดำเนินการแล้ว
                      </div>
                      <span className="bg-orange-100 text-gray-500 text-xs font-semibold rounded-full px-2 py-0.5">
                        {isSummaryFetching ? (
                          <SkeletonLoading />
                        ) : (
                          (roomSummary?.totalProcess ?? 0)
                        )}
                      </span>
                    </CommandItem>
                  )}
                </CommandGroup>
                <CommandSeparator />

                <CommandGroup>
                  {isSummaryFetching ? (
                    <div className="flex flex-col ">
                      <SkeletonLoading width="w-full" height="h-[30px]" />
                    </div>
                  ) : (
                    <CommandItem className="flex items-center gap-2 cursor-pointer">
                      <FileUp className="w-4 h-4 text-gray-500" /> นำออกข้อมูล
                    </CommandItem>
                  )}
                  <CommandSeparator />
                  {isSummaryFetching ? (
                    <div className="flex flex-col ">
                      <SkeletonLoading width="w-full" height="h-[30px]" />
                    </div>
                  ) : (
                    <CommandItem
                      className={`
    flex justify-between items-center cursor-pointer
    ${select === "isSpam" ? "bg-orange-50 font-semibold" : ""}
  `}
                      onSelect={() => handleClickMenu("isSpam")}
                    >
                      <div className="flex items-center gap-2">
                        <OctagonAlert className="w-4 h-4 text-gray-500" /> สแปม
                      </div>
                      <span className="bg-orange-100 text-gray-500 text-xs font-semibold rounded-full px-2 py-0.5">
                        {isSummaryFetching ? (
                          <SkeletonLoading />
                        ) : (
                          (roomSummary?.totalSpam ?? 0)
                        )}
                      </span>
                    </CommandItem>
                  )}
                  {/* <CommandItem className="flex items-center gap-2 cursor-pointer">
                    <User className="w-4 h-4 text-gray-500" /> รับผิดชอบ
                  </CommandItem>
                  <CommandSeparator /> */}
                  {/* <CommandItem className="flex items-center gap-2 cursor-pointer">
                    <OctagonAlert className="w-4 h-4 text-gray-500" /> สแปม
                  </CommandItem> */}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {inputOpen &&
          (search !== "" ? (
            allRooms &&
            allRooms.length > 0 &&
            allRooms
              .filter((r: any) => (select === "isSpam" ? r.isSpam : !r.isSpam))
              .filter(
                (r: any) =>
                  !search || r.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((room: any, i: number) => {
                return (
                  <ChatItem
                    key={room?.id + i}
                    roomId={room?.id ?? ""}
                    selectedRoom={currentRoomId}
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
                      removeMessage();
                      addRecentSearch();
                    }}
                  />
                );
              })
          ) : (
            <React.Fragment>
              <div className="flex flex-col gap-3 w-full mt-2 px-3 pb-2">
                <p className="text-sm font-semibold">การค้นหาล่าสุด</p>

                <div className="space-y-2">
                  {recent && recent.length > 0 ? (
                    recent.map((item) => (
                      <div
                        key={item}
                        className="flex items-center justify-between group cursor-pointer"
                      >
                        <div
                          className="flex items-center gap-3 w-full hover:text-blue-500"
                          onClick={() => setSearch(item)}
                        >
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-gray-500"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.35 4.35a7.5 7.5 0 0012.3 12.3z"
                              />
                            </svg>
                          </div>

                          <span className="text-[15px]">{item}</span>
                        </div>

                        <button
                          className="p-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeRecentSearch(item);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="h-[100px] flex items-center justify-center">
                      <span className="text-sm">กรุณาค้นหาข้อมูล</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="w-full m-0" />

              <div className="flex justify-end gap-3 mt-2 px-3">
                <button
                  className="text-sm font-semibold hover:text-gray-700 cursor-pointer"
                  onClick={clearRecent}
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
          ) : select !== "all" ? (
            allRooms.length > 0 ? (
              allRooms
                .filter((r: any) =>
                  select === "isSpam" ? r.isSpam : !r.isSpam
                )
                .filter(
                  (r: any) =>
                    !search ||
                    r.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((room: any, i: number) => (
                  <ChatItem
                    key={room?.id + i}
                    roomId={room?.id ?? ""}
                    selectedRoom={currentRoomId}
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
                      removeMessage();
                    }}
                  />
                ))
            ) : (
              <EmptyChat />
            )
          ) : allRooms.length > 0 ? (
            allRooms
              .filter((r: any) => !r.isSpam)
              .filter(
                (r: any) =>
                  !search || r.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((room: any, i: number) => (
                <ChatItem
                  key={room?.id + i}
                  roomId={room?.id ?? ""}
                  selectedRoom={currentRoomId}
                  name={room?.name}
                  message={room?.latestMessage?.messageLabel ?? ""}
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
                    removeMessage();
                  }}
                />
              ))
          ) : (
            <EmptyChat />
          )}

          {hasNextPage && (
            <div className="p-4 flex items-center justify-center gap-2">
              <svg
                className="animate-spin h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              กำลังโหลดเพิ่มเติม...
            </div>
          )}
        </div>
      )}
    </aside>
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
