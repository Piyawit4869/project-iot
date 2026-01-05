// chat/helpers/scroll.newMessage.ts
export function scrollOnNewMessage({ ref, messages, newestSeenIdRef }: any) {
  if (!ref.current || !messages?.length) return;

  const newest = messages[messages.length - 1];
  const isNew =
    newestSeenIdRef.current && newestSeenIdRef.current !== newest.timestamp;

  newestSeenIdRef.current = newest.timestamp;

  if (isNew) {
    requestAnimationFrame(() => {
      ref.current.scrollTo({
        top: ref.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }
}
