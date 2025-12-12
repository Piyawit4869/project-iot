import { useEffect, useState, type RefObject } from "react";
import type { PaginatedPage } from "~/types/messages.type";

interface UseChatPaginationProps {
  scrollAreaRef: React.RefObject<HTMLDivElement | null>;
  meta: PaginatedPage["meta"];
  fetchNextPage: () => Promise<any>;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
}

export function useChatPagination({
  scrollAreaRef,
  meta,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UseChatPaginationProps) {
  const [showTopLoading, setShowTopLoading] = useState(false);

  useEffect(() => {
    const el = scrollAreaRef.current;
    if (!el) return;

    const TH = 5;

    const onScroll = () => {
      if (!hasNextPage || isFetchingNextPage) return;

      if (el.scrollTop <= TH && meta.prev) {
        const prevHeight = el.scrollHeight;
        setShowTopLoading(true);

        fetchNextPage().finally(() => {
          setShowTopLoading(false);
          requestAnimationFrame(() => {
            const newHeight = el.scrollHeight;
            el.scrollTop = newHeight - prevHeight;
          });
        });
      }

      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - TH;

      if (atBottom && meta.next) {
        fetchNextPage();
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [meta, hasNextPage, isFetchingNextPage]);

  return { showTopLoading };
}
