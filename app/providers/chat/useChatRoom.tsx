import {
  type FetchNextPageOptions,
  type InfiniteData,
  type InfiniteQueryObserverResult,
} from "@tanstack/react-query";
import _ from "lodash";

import React from "react";
import { useCustomer } from "~/api/client/customer/useCustomer";
import { usePaginatedChatRooms } from "~/api/client/message/useMessage";
import { useDebounce } from "~/hooks/use-debounce";
import type { Customer } from "~/schemas/customer/customer-form";
import type { ChatRoomSchemaType } from "~/schemas/settings";

type LatestMessage = {
  id: string;
  message: string;
  messageLabel: string;
  createdAt: string;
};

type RoomUser = {
  id: string;
  fullName: string;
  imageUrl?: string | null;
};

type RoomCustomer = {
  id: string;
  imageUrl?: string | null;
  fullName: string;
  lineSubId: string;
};

export type ChatRoom = {
  id: string;
  active: boolean;
  name: string;
  imageUrl?: string | null;
  description?: string | null;
  status: string;
  customerId: string;
  branchId: string;
  customer?: RoomCustomer | null;
  users: RoomUser[];
  unreadMessageCount: number;
  latestMessage?: LatestMessage | null;
  done: boolean;
  isProcess: boolean;
  updatedAt?: string | null;
};

type IncomingRoomPayload = {
  chatRoomId?: string;
  id?: string;
  active?: boolean;
  name?: string;
  imageUrl?: string | null;
  description?: string | null;
  status?: string;
  customerId?: string;
  branchId?: string;
  customer?: RoomCustomer;
  users?: RoomUser[];
  unreadMessageCount?: number;
  latestMessage?: LatestMessage;
  updatedAt?: string;
  done: boolean;
  isProcess: boolean;
  isUpdateRoomDetails?: boolean;
  isAiReply?: boolean;
};

export const mergeRoomImmutable = (
  allRooms: ChatRoom[],
  incoming: IncomingRoomPayload
): ChatRoom[] => {
  const incomingId = incoming.chatRoomId ?? incoming.id;
  if (!incomingId) {
    return sortingChatRoomByLatestTime(allRooms);
  }
  //Check new room not update when message is incomming wrong body
  if (incoming.hasOwnProperty("isAiReply")) {
    return sortingChatRoomByLatestTime(allRooms);
  }

  const idx = allRooms.findIndex((r) => r.id === incomingId);
  const pick = <T,>(a: T | undefined, b: T): T => (a !== undefined ? a : b);

  if (idx >= 0) {
    const prev = allRooms[idx];
    if (!prev) {
      return sortingChatRoomByLatestTime(allRooms);
    }

    if (incoming.isUpdateRoomDetails) {
      const merged: ChatRoom = {
        ...prev,
        active: pick(incoming.active, prev.active),
        name: pick(incoming.name, prev.name),
        imageUrl: pick(incoming.imageUrl, prev.imageUrl ?? null),
        description: pick(incoming.description, prev.description ?? null),
        status: pick(incoming.status, prev.status),
        customerId: pick(incoming.customerId, prev.customerId),
        branchId: pick(incoming.branchId, prev.branchId),
        users: pick(incoming.users, prev.users),
        unreadMessageCount: pick(
          incoming.unreadMessageCount,
          prev.unreadMessageCount
        ),
        latestMessage: pick(incoming.latestMessage, prev.latestMessage ?? null),
        updatedAt: pick(incoming.updatedAt, prev.updatedAt ?? null),
        done: pick(incoming.done, prev.done),
        isProcess: pick(incoming.isProcess, prev.isProcess),
        customer: incoming.customer
          ? { ...(prev.customer ?? null), ...incoming.customer }
          : (prev.customer ?? null),
      };

      const next = allRooms.slice();
      next[idx] = merged;

      return sortingChatRoomByLatestTime(next);
    }

    const merged: ChatRoom = {
      ...prev,
      active: pick(incoming.active, prev.active),
      name: pick(incoming.name, prev.name),
      imageUrl: pick(incoming.imageUrl, prev.imageUrl ?? null),
      description: pick(incoming.description, prev.description ?? null),
      status: pick(incoming.status, prev.status),
      customerId: pick(incoming.customerId, prev.customerId),
      branchId: pick(incoming.branchId, prev.branchId),
      users: pick(incoming.users, prev.users),
      unreadMessageCount: pick(
        incoming.unreadMessageCount,
        prev.unreadMessageCount
      ),
      latestMessage: pick(incoming.latestMessage, prev.latestMessage ?? null),
      updatedAt: pick(incoming.updatedAt, prev.updatedAt ?? null),
      done: pick(incoming.done, prev.done ?? null),
      isProcess: pick(incoming.isProcess, prev.isProcess ?? null),
      customer: incoming.customer
        ? { ...(prev.customer ?? null), ...incoming.customer }
        : (prev.customer ?? null),
    };

    const without = allRooms.slice(0, idx).concat(allRooms.slice(idx + 1));
    const finalItems = [merged, ...without];

    return sortingChatRoomByLatestTime(finalItems);
  }

  const normalizedNew: ChatRoom = {
    id: incomingId,
    active: incoming.active ?? true,
    name: incoming.name ?? "",
    imageUrl: incoming.imageUrl ?? null,
    description: incoming.description ?? null,
    status: incoming.status ?? "new",
    customerId: incoming.customerId ?? "",
    branchId: incoming.branchId ?? "",
    customer: incoming.customer ?? null,
    users: incoming.users ?? [],
    unreadMessageCount: incoming.unreadMessageCount ?? 0,
    latestMessage: incoming.latestMessage ?? null,
    done: incoming.done ?? false,
    isProcess: incoming.isProcess ?? false,
    updatedAt: incoming.updatedAt ?? new Date().toISOString(),
  };

  const finalNormalizes = [normalizedNew, ...allRooms];
  return sortingChatRoomByLatestTime(finalNormalizes);
};

export const mergeChat = (rooms: any[], incoming: any) => {
  const idx = rooms.findIndex((r) => r.customerId === incoming.customerId);

  const safeMerge = (oldRoom: any, newRoom: any): any => {
    return {
      ...oldRoom,
      ...Object.fromEntries(
        Object.entries(newRoom).filter(([_, v]) => v !== undefined) // กัน undefined ทับของเก่า
      ),
      latestMessage: {
        ...oldRoom.latestMessage,
        ...newRoom.latestMessage,
        id: crypto.randomUUID(),
        createdAt: newRoom.updatedAt ?? oldRoom.latestMessage?.createdAt,
        messageLabel:
          newRoom.sender === "ROME Ai"
            ? newRoom.messageLabel
            : newRoom.latestMessage?.messageLabel,
        message:
          newRoom.sender === "ROME Ai"
            ? newRoom.message
            : newRoom.latestMessage?.message,
      },
    };
  };

  if (idx !== -1 && rooms[idx]) {
    rooms[idx] = safeMerge(rooms[idx] as any, incoming);
  } else {
    rooms.unshift(incoming);
  }

  return rooms;
};

export const computeRooms = (
  chatRooms: any,
  realtimeChatRooms: any | undefined | null
): any[] => {
  const paginated = chatRooms?.pages?.flatMap((p: any) => p) ?? [];
  const baseRooms: any[] = paginated.flatMap((p: any) => p?.items ?? []);
  if (!realtimeChatRooms) {
    const crs = baseRooms.filter((r) => r?.id);
    return sortingChatRoomByLatestTime(crs);
  }

  const merged = mergeChat([...baseRooms], realtimeChatRooms as any);

  const lockedIndexMap = new Map<string, number>();
  merged.forEach((r: any, i: number) => {
    if (r.isUpdateRoomDetails) lockedIndexMap.set(r.id, i);
  });

  const getTime = (r: any) => {
    const t = r.latestMessage?.createdAt ?? r.updatedAt ?? 0;
    return new Date(t as any).getTime();
  };

  const movable = merged.filter((r: any) => !r.isUpdateRoomDetails);
  const sortedMovable = [...movable].sort((a, b) => getTime(b) - getTime(a));

  const result: any[] = [];
  let movableIdx = 0;
  for (let i = 0; i < merged.length; i++) {
    const lockedRoom = [...lockedIndexMap.entries()].find(
      ([, pos]) => pos === i
    );
    if (lockedRoom) {
      result.push(merged.find((r: any) => r.id === lockedRoom[0])!);
    } else {
      const movableRoom = sortedMovable[movableIdx++];
      if (movableRoom) result.push(movableRoom);
    }
  }

  const chatrooms = result.filter((r) => r?.id);
  return sortingChatRoomByLatestTime(chatrooms);
};

type PaginatedChatRoomsPage = {
  items: ChatRoomSchemaType[];
};

type ChatRoomContextType = {
  selectedRoom: ChatRoomSchemaType;
  setSelectedRoom: (room: ChatRoomSchemaType) => void;
  chatRooms: InfiniteData<PaginatedChatRoomsPage, unknown> | undefined;
  isLoading: boolean;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  customerInfoOpen: boolean;
  setCustomerInfoOpen: (open: boolean) => void;
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<PaginatedChatRoomsPage, unknown>,
      Error
    >
  >;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  customer: Customer;
  refetchCustomer: () => void;
  realtimeChatRooms: any;
  setRealtimeChatRooms: React.Dispatch<React.SetStateAction<any>>;
  onSelectRoom: boolean;
  setOnSelectRoom: (onSelectRoom: boolean) => void;
  autoReadMsg: boolean;
  setAutoReadMsg: (onSelectRoom: boolean) => void;
  rooms: any;
  setRooms: React.Dispatch<React.SetStateAction<any>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;

  select: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  filterRoom: any;
  meta: any;
};

const ChatRoomContext = React.createContext<ChatRoomContextType | undefined>(
  undefined
);

export const ChatRoomProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const initialState: ChatRoomSchemaType = {
    id: "",
    name: "",
    active: false,
    branchId: "",
    status: "",
    description: "",
    customerId: "",
    imageUrl: "",
    customer: { id: "", imageUrl: null, fullName: "" },
    users: [],
    latestMessage: { id: "", message: "", createdAt: "" },
  };

  const [search, setSearch] = React.useState<string>("");
  const [select, setSelect] = React.useState<string>("all");

  const debouncedSearch = useDebounce(search);
  const debouncedSearchSelectKey = useDebounce(select);

  const {
    data: chatRooms,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePaginatedChatRooms(
    debouncedSearch,
    debouncedSearchSelectKey === "all" ? "" : debouncedSearchSelectKey
  );
  const [realtimeChatRooms, setRealtimeChatRooms] = React.useState<any>();
  const [selectedRoom, setSelectedRoom] =
    React.useState<ChatRoomSchemaType>(initialState);

  const [rooms, setRooms] = React.useState<any[]>(
    computeRooms(chatRooms, realtimeChatRooms)
  );

  const { data: customer, refetch: refetchCustomer } = useCustomer(
    selectedRoom.customerId ?? ""
  );

  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [customerInfoOpen, setCustomerInfoOpen] = React.useState(true);
  const [onSelectRoom, setOnSelectRoom] = React.useState<boolean>(false);
  const [autoReadMsg, setAutoReadMsg] = React.useState<boolean>(false);

  const filterRoom = React.useMemo(() => {
    if ((select === "" && search === "") || !chatRooms) return [];

    return computeRooms(chatRooms, realtimeChatRooms);
  }, [chatRooms, realtimeChatRooms]);
  return (
    <ChatRoomContext.Provider
      value={{
        selectedRoom,
        setSelectedRoom,
        chatRooms,
        isLoading,
        sidebarOpen,
        setSidebarOpen,
        customerInfoOpen,
        setCustomerInfoOpen,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        customer,
        refetchCustomer,
        realtimeChatRooms,
        setRealtimeChatRooms,
        onSelectRoom,
        setOnSelectRoom,
        autoReadMsg,
        setAutoReadMsg,
        rooms,
        setRooms,
        search,
        setSearch,
        select,
        setSelect,
        filterRoom,
        meta: {
          statusSummary: chatRooms && chatRooms.pages?.[0]?.statusSummary,
        },
      }}
    >
      {children}
    </ChatRoomContext.Provider>
  );
};

export const useChatRoom = () => {
  const context = React.useContext(ChatRoomContext);
  if (!context) {
    throw new Error("useChatRoom must be used within a ChatRoomProvider");
  }
  return context;
};

const sortingChatRoomByLatestTime = (chatrooms: ChatRoom[]): ChatRoom[] => {
  const updatedRooms = chatrooms.map((item) => {
    if (item.latestMessage) {
      if (
        !item.latestMessage.createdAt ||
        isNaN(Date.parse(item.latestMessage.createdAt))
      ) {
        item.latestMessage.createdAt = new Date().toISOString();
      }
    }
    return item;
  });

  const sorted = _.orderBy(
    updatedRooms,
    [
      (item: ChatRoom) => {
        if (!item.latestMessage) return new Date(0);
        return new Date(item.latestMessage.createdAt as string);
      },
    ],
    ["desc"]
  );

  return sorted;
};
