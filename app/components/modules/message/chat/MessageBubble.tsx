// /chat/components/MessageBubble.tsx
import React from "react";
import clsx from "clsx";
import MessageAvatar from "./MessageAvatar";
import MessageTimestamp from "./MessageTimestamp";
import MessageImagePreview from "./MessageImagePreview";

export default function MessageBubble({
  msg,
  isMine,
  children,
}: {
  msg: any;
  isMine: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "flex w-full gap-2 mb-2",
        isMine ? "flex-row-reverse" : "flex-row"
      )}
    >
      {!isMine && (
        <MessageAvatar
          imageUrl={msg.imageUrl}
          senderId={msg.sender}
          size={36}
        />
      )}

      <div className={clsx("flex flex-col max-w-[70%]", isMine && "items-end")}>
        <div
          className={clsx(
            "px-3 py-2 rounded-xl text-sm whitespace-pre-line",
            isMine
              ? "bg-primary text-white rounded-br-none"
              : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none"
          )}
        >
          {children}
        </div>

        <MessageTimestamp
          time={msg.createdAt}
          align={isMine ? "right" : "left"}
        />

        {msg.messageType === "image" && msg.fileUrl && (
          <MessageImagePreview url={msg.fileUrl} />
        )}
      </div>
    </div>
  );
}
