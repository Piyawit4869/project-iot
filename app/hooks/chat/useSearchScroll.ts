import { useEffect } from "react";

export function useSearchScroll({ targetId, refs, scrollRef, onDone }: any) {
  useEffect(() => {
    if (!targetId) return;

    const el = refs[targetId];
    const container = scrollRef.current;
    if (!el || !container) return;

    requestAnimationFrame(() => {
      const center =
        el.offsetTop - container.clientHeight / 2 + el.clientHeight / 2;

      container.scrollTo({ top: center, behavior: "smooth" });

      el.classList.add("shake");

      setTimeout(() => el.classList.remove("shake"), 500);

      onDone();
    });
  }, [targetId]);
}
