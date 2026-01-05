// chat/helpers/groupMessages.ts
import dayjs from "dayjs";

export function groupMessages({
  paginated,
  socketMessages,
  selectedRoomId,
}: any) {
  const messages = [
    ...paginated.flatMap((m: any) => m.items || []),
    ...socketMessages.flatMap((m: any) => m || []),
  ]
    .sort(
      (a, b) =>
        dayjs(a.createdAt ?? a.timestamp).valueOf() -
        dayjs(b.createdAt ?? b.timestamp).valueOf()
    )
    .filter((c) => c.chatRoomId === selectedRoomId)
    .map((message) => ({
      ...message,
      read: message?.platform !== "backoffice" && true,
    }));

  let groupId = 0;

  const result = messages.map((msg, index) => {
    const prev = messages[index - 1];
    const next = messages[index + 1];

    const samePrev =
      prev &&
      prev.sender === msg.sender &&
      prev.platform === msg.platform &&
      Math.abs(
        dayjs(msg.createdAt ?? msg.timestamp).diff(
          dayjs(prev.createdAt ?? prev.timestamp)
        )
      ) < 60000;

    if (!samePrev) groupId++;

    const sameNext =
      next &&
      next.sender === msg.sender &&
      next.platform === msg.platform &&
      Math.abs(
        dayjs(next.createdAt ?? next.timestamp).diff(
          dayjs(msg.createdAt ?? msg.timestamp)
        )
      ) < 60000;

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

  if (last?.messageLabel !== "ROME AI กำลังประมวลผล") {
    result[result.length - 1] = {
      ...last,
      showAvatar: true,
      isFirstInGroup: true,
    };
  } else {
    result[result.length - 1] = {
      ...last,
      showAvatar: false,
    };
  }

  return result;
}
