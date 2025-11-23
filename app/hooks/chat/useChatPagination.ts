// /chat/hooks/useChatPagination.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchAllMessageCursorWithRoomId } from "~/api/server/message/message";

export function useChatPagination(
  roomId: string,
  currentId: string = "",
  direction: "none" | "before" | "after" = "none"
) {
  const limit = 20;

  return useInfiniteQuery({
    queryKey: ["messages-cursor", roomId, currentId, direction],

    queryFn: async ({ pageParam = currentId }) => {
      console.log("Cursor Query:", { roomId, pageParam, direction });

      return fetchAllMessageCursorWithRoomId(
        roomId,
        pageParam,
        limit,
        direction
      );
    },

    initialPageParam: currentId ?? "",

    getPreviousPageParam: (firstPage) => {
      if (!firstPage?.meta?.before) return undefined;
      return { before: firstPage.meta.before };
    },

    getNextPageParam: (lastPage) => {
      if (!lastPage?.meta) return undefined;

      const meta = lastPage.meta;

      // direction = "after" → ดึงหน้าใหม่กว่า
      if (direction === "after") return meta.after;

      // default = "before" → ดึงข้อความเก่ากว่า
      return meta.before;
    },

    enabled: !!roomId,
  });
}
