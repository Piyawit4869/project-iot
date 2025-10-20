import {
  type FetchNextPageOptions,
  type InfiniteData,
  type InfiniteQueryObserverResult,
} from "@tanstack/react-query";

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
  isUpdateRoomDetails?: boolean;
};

export const mergeRoomImmutable = (
  allRooms: ChatRoom[],
  incoming: IncomingRoomPayload
): ChatRoom[] => {
  const incomingId = incoming.chatRoomId ?? incoming.id;
  if (!incomingId) return allRooms;

  const idx = allRooms.findIndex((r) => r.id === incomingId);

  const pick = <T,>(a: T | undefined, b: T): T => (a !== undefined ? a : b);

  if (idx >= 0) {
    const prev = allRooms[idx];
    if (!prev) return allRooms;

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
        customer: incoming.customer
          ? { ...(prev.customer ?? null), ...incoming.customer }
          : prev.customer ?? null,
      };

      const next = allRooms.slice();
      next[idx] = merged;
      return next;
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
      customer: incoming.customer
        ? { ...(prev.customer ?? null), ...incoming.customer }
        : prev.customer ?? null,
    };

    const without = allRooms.slice(0, idx).concat(allRooms.slice(idx + 1));
    return [merged, ...without];
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
    updatedAt: incoming.updatedAt ?? new Date().toISOString(),
  };

  return [normalizedNew, ...allRooms];
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
  if (!realtimeChatRooms) return baseRooms.filter((r) => r?.id);

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

  return result.filter((r) => r?.id);
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
  search: string;
  filterRoom: any;
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

  const debouncedSearch = useDebounce(search);

  const {
    data: chatRooms,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = usePaginatedChatRooms(debouncedSearch);
  const [realtimeChatRooms, setRealtimeChatRooms] = React.useState<any>();
  const [selectedRoom, setSelectedRoom] =
    React.useState<ChatRoomSchemaType>(initialState);

  const [rooms, setRooms] = React.useState<any[]>(
    computeRooms(chatRooms, realtimeChatRooms)
  );

  const { data: customer, refetch: refetchCustomer } = useCustomer(
    selectedRoom.customerId
  );

  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [customerInfoOpen, setCustomerInfoOpen] = React.useState(true);
  const [onSelectRoom, setOnSelectRoom] = React.useState<boolean>(false);
  const [autoReadMsg, setAutoReadMsg] = React.useState<boolean>(false);

  const filterRoom = React.useMemo(() => {
    if (search === "" || !chatRooms) return [];

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
        filterRoom,
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
