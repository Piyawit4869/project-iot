import React from "react";
import type { ProfileCardData } from "../line-template-picker-modal";
import { FlexMessagePersonRender } from "../flex-message-person-render";
import { FlexMessageProductRender } from "../flex-message-product-render";
import { FlexMessagePlaceRender } from "../flex-message-place-render";
import { FlexMessageImageRender } from "../flex-message-image-render";
import { cn } from "~/lib/utils";
import { ChatBubble } from "./chat-bubble";

type ProfileCardProps = {
  items: ProfileCardData; // หรือถ้าชัวร์ type จริงของ product/place/person
  category?: string;
};

export function QuickReply({ items, category }: ProfileCardProps) {
  const listRef = React.useRef<HTMLDivElement>(null);
  const textContent = Array.isArray(items?.content?.items)
    ? items.content.items
    : [];

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

      <div className="relative flex flex-col flex-1 overflow-y-auto bg-[linear-gradient(180deg,#cfe3ff_0%,#d7e9ff_35%,#e7f0ff_100%)] rounded-b-xl p-4">
        <div className="pointer-events-none absolute left-4 w-6 bg-gradient-to-r from-[#e6eefb] to-transparent rounded-l-xl" />
        <div className="pointer-events-none absolute right-4 w-6 bg-gradient-to-l from-[#e6eefb] to-transparent rounded-r-xl" />

        <ChatBubble text="กรุณาเลือกคำตอบของคุณ" />

        <div
          ref={listRef}
          className="mt-auto flex items-stretch gap-3 overflow-x-auto justify-center  no-scrollbar scroll-smooth"
        >
          {textContent &&
            textContent.length > 0 &&
            textContent?.map((p: any, idx: number) => (
              <div
                key={idx}
                className="max-w-[100%] rounded-2xl bg-white shadow p-1.5 px-3 text-sm leading-6 "
              >
                <div className="flex flex-row gap-2">
                  {p?.imageUrl && (
                    <img
                      src={p?.imageUrl}
                      alt="logo"
                      width={10}
                      height={10}
                      className="w-6 h-6  object-cover rounded-full"
                    />
                  )}
                  <span>{p?.action?.label}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
