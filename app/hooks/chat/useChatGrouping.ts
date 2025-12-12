import { useMemo } from "react";
import dayjs from "dayjs";
import type { ChatMessage, PaginatedPage } from "~/types/messages.type";

export function useChatGrouping(
  pages: PaginatedPage[],
  socketMessages: ChatMessage[],
  roomId?: string
) {
  return useMemo(() => {
    const merged = [
      ...pages.flatMap((p) => p.items || []),
      ...socketMessages.flatMap((m) => m || []),
    ]
      .sort(
        (a, b) =>
          dayjs(a.createdAt ?? a.timestamp).valueOf() -
          dayjs(b.createdAt ?? b.timestamp).valueOf()
      )
      .filter((m) => m.chatRoomId === roomId)
      .map((m) => ({
        ...m,
        read: m.platform !== "backoffice",
      }));

    let groupId = 0;

    const result = merged.map((msg, i) => {
      const prev = merged[i - 1];
      const next = merged[i + 1];

      const withinOneMin = (a?: string, b?: string) =>
        Math.abs(dayjs(a).diff(dayjs(b))) < 60 * 1000;

      const samePrev =
        prev &&
        prev.sender === msg.sender &&
        prev.platform === msg.platform &&
        withinOneMin(
          msg.createdAt ?? msg.timestamp,
          prev.createdAt ?? prev.timestamp
        );

      if (!samePrev) groupId++;

      const sameNext =
        next &&
        next.sender === msg.sender &&
        next.platform === msg.platform &&
        withinOneMin(
          msg.createdAt ?? msg.timestamp,
          next.createdAt ?? next.timestamp
        );

      return {
        ...msg,
        groupId,
        isFirstInGroup: !samePrev,
        isLastInGroup: !sameNext,
        showAvatar: !samePrev,
        showTime: !sameNext,
      };
    });

    const last = result[result.length - 1];
    if (!last) return result;

    const isAIProcessing = last.messageLabel === "ROME AI กำลังประมวลผล";

    result[result.length - 1] = {
      ...last,
      showAvatar: !isAIProcessing,
      isFirstInGroup: !isAIProcessing,
    };

    return result;
  }, [pages, socketMessages, roomId]);
}
