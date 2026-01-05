import { useEffect, useRef, useState, type RefObject } from "react";
import type { ChatMessage } from "~/types/messages.type";

export function useChatScroll(
  scrollAreaRef: React.RefObject<HTMLDivElement | null>,
  combinedMessages: ChatMessage[],
  messageRefs: RefObject<Record<string, HTMLDivElement | null>>
) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const newestSeenId = useRef<string | null>(null);
  const [buttonScrollToBottom, setButtonScroll] = useState(false);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el || combinedMessages.length === 0) return;

    const latest = combinedMessages[combinedMessages.length - 1];
    const isNew =
      newestSeenId.current &&
      newestSeenId.current !== (latest.timestamp ?? latest.createdAt);

    newestSeenId.current = latest.timestamp ?? latest.createdAt ?? null;

    if (isNew) {
      requestAnimationFrame(() =>
        el.scrollTo({ top: el.scrollHeight, behavior: "smooth" })
      );
    }
  }, [combinedMessages]);

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;

    const checkScroll = () => {
      const isScrollable = el.scrollHeight > el.clientHeight;
      const atBottom = el.scrollTop >= el.scrollHeight - el.clientHeight - 5;

      setButtonScroll(isScrollable && !atBottom);
    };

    el.addEventListener("scroll", checkScroll);
    checkScroll();

    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  return {
    bottomRef,
    scrollToBottom,
    buttonScrollToBottom,
  };
}
