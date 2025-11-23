// chat/helpers/scroll.searchTarget.ts
export function scrollToSearchTarget({
  messageRefs,
  targetId,
  containerRef,
  setHasScrolled,
}: any) {
  if (!targetId || setHasScrolled === true) return;

  const el = messageRefs.current[targetId];
  const container = containerRef.current;
  if (!el || !container) return;

  requestAnimationFrame(() => {
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    const center = el.offsetTop + elRect.height / 2 - containerRect.top;
    const newTop = center - container.clientHeight / 2 + container.scrollTop;

    container.scrollTo({ top: newTop, behavior: "smooth" });

    el.classList.add("shake");
    setTimeout(() => el.classList.remove("shake"), 500);

    setHasScrolled(true);
  });
}
