// chat/helpers/scroll.initial.ts
export function scrollInitial({ ref, hasMessages, setHasInitialScroll }: any) {
  if (!ref.current || !hasMessages) return;
  requestAnimationFrame(() => {
    ref.current.scrollTop = ref.current.scrollHeight;
    setHasInitialScroll(true);
  });
}
