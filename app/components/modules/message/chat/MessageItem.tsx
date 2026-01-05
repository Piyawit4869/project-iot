// /chat/components/MessageItem.tsx
import React from "react";
import MessageBubble from "./MessageBubble";
import { MessageRenderer } from "../render-message-content";

export default function MessageItem({ msg, isBackoffice, audio }: any) {
  // filter special cases
  if (msg.messageLabel === "ROME AI กำลังประมวลผล") return null;

  if (msg.messageLabel === "AI_PROCESSING") {
    return (
      <div className="rounded-xl bg-muted px-4 py-2 w-fit text-sm">
        กำลังพิมพ์...
      </div>
    );
  }

  const isMine = msg.platform === "backoffice";

  return (
    <MessageBubble msg={msg} isMine={isMine}>
      <MessageRenderer
        msg={msg}
        isBackoffice={isBackoffice}
        setPreviewUrl={audio.setPreviewUrl}
        playing={audio.playing}
        setPlaying={audio.setPlaying}
        currentTime={audio.currentTime}
        setCurrentTime={audio.setCurrentTime}
        duration={audio.duration}
        setDuration={audio.setDuration}
        audioRef={audio.audioRef}
        togglePlay={audio.togglePlay}
      />
    </MessageBubble>
  );
}
