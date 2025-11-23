import { useEffect } from "react";

export function useScrollLoadMore({
  scrollRef,
  meta,
  fetchNextPage,
  direction,
  setDirection,
  disable,
}: any) {
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      if (disable) return;

      const top = el.scrollTop;
      const bottom = el.scrollHeight - (el.scrollTop + el.clientHeight);

      if (top < 5 && meta.before) {
        setDirection("before");
        fetchNextPage();
      }

      if (bottom < 5 && meta.after) {
        setDirection("after");
        fetchNextPage();
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [meta]);
}
