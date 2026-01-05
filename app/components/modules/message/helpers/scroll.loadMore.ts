// chat/helpers/scroll.loadMore.ts
export function loadMoreOnScroll({
  scrollRef,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  meta,
  setShowTopLoading,
  setDirection,
}: any) {
  const el = scrollRef.current;
  if (!el) return;

  const THRESHOLD = 5;

  if (el.scrollTop <= THRESHOLD && meta.before && !isFetchingNextPage) {
    const prevHeight = el.scrollHeight;
    setShowTopLoading(true);
    setDirection("before");

    fetchNextPage().finally(() => {
      setShowTopLoading(false);
      requestAnimationFrame(() => {
        const newHeight = el.scrollHeight;
        el.scrollTop = newHeight - prevHeight;
      });
    });
  }

  const isBottom =
    el.scrollTop + el.clientHeight >= el.scrollHeight - THRESHOLD;

  if (isBottom && meta.after && !isFetchingNextPage) {
    setDirection("after");
    fetchNextPage();
  }
}
