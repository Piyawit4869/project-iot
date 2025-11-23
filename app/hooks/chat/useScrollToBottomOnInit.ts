import { useEffect } from "react";

export function useScrollToBottomOnInit(ref: any, deps: any[]) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.scrollTop = el.scrollHeight;
    });
  }, deps);
}
