import { useRef } from "react";
import { useChatSocket } from "./useChatSocket";
import { useChatGrouping } from "./useChatGrouping";
import { useChatScroll } from "./useChatScroll";
import { useChatPagination } from "./useChatPagination";
import type { PaginatedPage, ChatMessage } from "~/types/messages.type";

interface UseChatControllerProps {
  api: any;
  me: { branchId?: string } | null;
  selectedRoom: { id: string } | null;
  pages: PaginatedPage[];
  socketMessages: ChatMessage[];
  fetchNextPage: () => Promise<any>;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
  socketConfig: (api: any) => any;
}

export function useChatController({
  api,
  me,
  selectedRoom,
  pages,
  socketMessages,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  socketConfig,
}: UseChatControllerProps) {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);
  const messageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // SOCKET
  useChatSocket({ api, selectedRoom, me, socketConfig });

  // GROUPING
  const combinedMessages = useChatGrouping(
    pages,
    socketMessages,
    selectedRoom?.id
  );

  const meta = pages?.[0]?.meta ?? { next: false, prev: false };

  // PAGINATION
  const { showTopLoading } = useChatPagination({
    scrollAreaRef,
    meta,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  // SCROLL
  const { bottomRef, scrollToBottom, buttonScrollToBottom } = useChatScroll(
    scrollAreaRef,
    combinedMessages,
    messageRefs
  );

  return {
    scrollAreaRef,
    messageRefs,
    combinedMessages,
    showTopLoading,
    bottomRef,
    scrollToBottom,
    buttonScrollToBottom,
  };
}
