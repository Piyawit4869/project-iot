import React from "react";
import type { ProfileCardData } from "../line-template-picker-modal";
import { FlexMessagePersonRender } from "../flex-message-person-render";
import { FlexMessageProductRender } from "../flex-message-product-render";
import { FlexMessagePlaceRender } from "../flex-message-place-render";
import { FlexMessageImageRender } from "../flex-message-image-render";
import { cn } from "~/lib/utils";

type ProfileCardProps = {
  items: ProfileCardData; // หรือถ้าชัวร์ type จริงของ product/place/person
  category?: string;
};

export function ProfileCardCarousel({ items, category }: ProfileCardProps) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(true);

  const cardSimple = items?.meta;

  const getStep = () => {
    const card = listRef.current?.querySelector<HTMLDivElement>(
      '[data-card="profile"], [data-card="product"], [data-card="image"], [data-card="place"]'
    );

    if (!card) return 300; // fallback

    const style = getComputedStyle(card);
    const gap = 16; // gap-4

    return (
      card.offsetWidth +
      parseInt(style.marginLeft) +
      parseInt(style.marginRight) +
      gap
    );
  };

  const updateNav = () => {
    const el = listRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 0);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  React.useEffect(() => {
    updateNav();
    const el = listRef.current;
    if (!el) return;
    const onScroll = () => updateNav();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollByStep = (dir: "prev" | "next") => {
    const el = listRef.current;
    if (!el) return;
    const dx = getStep() * (dir === "next" ? 1 : -1);
    el.scrollBy({ left: dx, behavior: "smooth" });
  };

  let CardComponent: any = null;

  if (cardSimple?.category === "person")
    CardComponent = FlexMessagePersonRender;
  if (cardSimple?.category === "product")
    CardComponent = FlexMessageProductRender;
  if (cardSimple?.category === "place") CardComponent = FlexMessagePlaceRender;
  if (cardSimple?.category === "image") CardComponent = FlexMessageImageRender;

  return (
    <div className="w-full flex flex-col h-full overflow-hidden">
      <div className="bg-[#2a5182] text-white rounded-t-xl px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-black grid place-items-center text-xs font-semibold">
            ogga
          </div>
          <span className="text-sm font-medium">ดูตัวอย่าง</span>
        </div>
        <div className="text-xs opacity-80">ตัวอย่างการแสดงผล</div>
      </div>

      <div className="relative flex-1 overflow-y-auto bg-[linear-gradient(180deg,#cfe3ff_0%,#d7e9ff_35%,#e7f0ff_100%)] rounded-b-xl p-4">
        <div className="pointer-events-none absolute left-4 w-6 bg-gradient-to-r from-[#e6eefb] to-transparent rounded-l-xl" />
        <div className="pointer-events-none absolute right-4 w-6 bg-gradient-to-l from-[#e6eefb] to-transparent rounded-r-xl" />
        <button
          type="button"
          aria-label="Previous"
          onClick={() => scrollByStep("prev")}
          disabled={!canPrev}
          className={cn(
            "absolute left-2 top-1/2 -translate-y-1/2 z-10",
            "size-9 rounded-full bg-white/90 shadow-md border",
            "grid place-items-center hover:bg-white transition",
            "disabled:opacity-40 disabled:cursor-not-allowed"
          )}
        >
          <span className="text-lg leading-none">‹</span>
        </button>

        <button
          type="button"
          aria-label="Next"
          onClick={() => scrollByStep("next")}
          disabled={!canNext}
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 z-10",
            "size-9 rounded-full bg-white/90 shadow-md border",
            "grid place-items-center hover:bg-white transition",
            "disabled:opacity-40 disabled:cursor-not-allowed"
          )}
        >
          <span className="text-lg leading-none">›</span>
        </button>

        <div className="flex flex-col mt-2">
          <div className="size-10 rounded-full bg-black text-white grid place-items-center font-semibold">
            ogga
          </div>

          <div className="flex mt-2 items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth pr-6">
            <div
              ref={listRef}
              className="flex items-stretch gap-4 overflow-x-auto no-scrollbar scroll-smooth"
            >
              {CardComponent &&
                cardSimple?.items?.map((p: any, idx: number) => (
                  <CardComponent
                    key={`${p.title ?? p.name}-${idx}`}
                    items={p}
                    category={items?.meta?.category}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
