import React from "react";

import { useState } from "react";
import { FileImage, Loader2, Send } from "lucide-react";

import { useChatRoom } from "~/providers/chat/useChatRoom";
import { useCustomer } from "~/providers/customer-provider";
import { useUpload } from "~/api/client/upload";
import { Button } from "~/components/ui/button";

import { useIsMobile } from "~/hooks/use-mobile";

export default function ChatInputAIAssistant({
  isPendingAI,
  customerId,
  chatRoomId,
  isAILoading,
  connectedChatRoomAIAssistant,
  assistantId,
}: {
  isPendingAI: boolean;
  customerId: string;
  chatRoomId: string;
  isAILoading: boolean;
  firstTimeMessage?: string;
  assistantId: string;
  connectedChatRoomAIAssistant: (values: any) => void;
}) {
  const isMobile = useIsMobile();

  const [input, setInput] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { mutate: upload, isPending } = useUpload();

  const handleInputChange = (e: any) => {
    const value = e.target.value;

    setInput(value);
    // setMessagesAITest((prev) => {
    //   const roomIndex = prev.findIndex((p) => p.roomId === selectedRoom.id);

    //   if (roomIndex > -1) {
    //     const updatedMessages = [...prev];
    //     updatedMessages[roomIndex] = {
    //       ...updatedMessages[roomIndex],
    //       lastestMessage: value,
    //     } as CustomerMessage;

    //     return updatedMessages;
    //   }

    //   return [...prev, { roomId: selectedRoom.id, lastestMessage: value }];
    // });
  };

  const sendText = async (e: React.FormEvent) => {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = "auto";

    // setMessagesAITest((prev) => {
    //   const roomIndex = prev.findIndex((p) => p.roomId === selectedRoom.id);

    //   if (roomIndex > -1) {
    //     const updatedMessages = [...prev];

    //     updatedMessages[roomIndex] = {
    //       ...updatedMessages[roomIndex],
    //       lastestMessage: "",
    //     } as CustomerMessage;

    //     return updatedMessages;
    //   }

    //   return prev;
    // });

    e.preventDefault();
    if (!input.trim() || !customerId) return;

    const messageText = input.trim();
    setInput("");

    connectedChatRoomAIAssistant({
      message: messageText,
      messageType: "text",
      assistantId,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const file = e.target.files?.[0];
    // if (!file) return;
    // if (file.size > 10 * 1024 * 1024) {
    //   alert("ไฟล์ขนาดใหญ่เกินไป (เกิน 10MB)");
    //   e.target.value = "";
    //   return;
    // }
    // const formData = new FormData();
    // formData.append("file", file);
    // upload(formData, {
    //   onSuccess: (res) => {
    //     if (!selectedRoom?.id) return;
    //     const imageUrl = res.res.url;
    //     if (!imageUrl) {
    //       console.error("No image URL returned from upload");
    //       return;
    //     }
    //     send({
    //       chatRoomId: selectedRoom.id,
    //       lineSubId: selectedRoom.customer?.lineSubId ?? "",
    //       message: imageUrl,
    //       messageType: "image",
    //       isAiReply: false,
    //       recipient: selectedRoom.customer?.fullName ?? "Unknown",
    //       customerId: selectedRoom.customerId ?? "",
    //       platform: "line",
    //       messageLabel: MessageLabelType.SENDIMAGE,
    //     });
    //   },
    //   onError: (error) => {
    //     console.error("Upload failed", error);
    //   },
    // });
    // e.target.value = "";
  };

  // React.useEffect(() => {
  //   const existingMesssge = messagesAITest.find(
  //     (p) => p.roomId === selectedRoom.id
  //   );
  //   if (existingMesssge) {
  //     setInput(existingMesssge.lastestMessage);
  //   } else {
  //     setInput("");
  //   }
  // }, [selectedRoom, messagesAITest]);

  // if (!selectedRoom?.id || !selectedRoom.latestMessage?.id) {
  //   return <div></div>;
  // }

  return (
    <form onSubmit={sendText} className="gap-2 border-t w-full ">
      <textarea
        placeholder="สอบถาม AI ได้เลย"
        className="flex-1  w-full resize-none overflow-auto p-2 border-0 rounded-md outline-none"
        value={input}
        onChange={handleInputChange}
        disabled={isPending}
        rows={1}
        onInput={(e) => {
          const textarea = e.target as HTMLTextAreaElement;
          textarea.style.height = "auto";
          textarea.style.height = `${textarea.scrollHeight}px`;
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !isMobile) {
            sendText(e as unknown as React.FormEvent);
            const textarea = e.target as HTMLTextAreaElement;

            textarea.style.height = `50px`;
          }
        }}
      />
      {/* <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      /> */}

      <div className="flex justify-end pt-4 pr-2 px-2">
        {/* <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <FileImage />
          )}
        </Button> */}
        <Button size="icon" type="submit" disabled={isPending}>
          {isPendingAI || isAILoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </div>
    </form>
  );
}
