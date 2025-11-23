// /chat/components/MessageImagePreview.tsx
import React from "react";
import { GlobalImage } from "~/components/shared/global-image";

export default function MessageImagePreview({ url }: any) {
  return (
    <div className="mt-2">
      <GlobalImage
        src={url}
        alt="image"
        className="rounded-xl border max-w-[240px] object-cover"
      />
    </div>
  );
}
