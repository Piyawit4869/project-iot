"use client";

import {
  // useRef,
  useState,
} from "react";
import { Button } from "~/components/ui/button";
import {
  FileImage,
  Loader2,
  // FileImage, Loader2,
  Send,
} from "lucide-react";
// import { useSendMessage } from "@/actions/chat/client/useMessage";
import React from "react";
// import { useUpload } from "@/actions/upload/client/useGetUpload";
// import { MessageLabelType } from "@/types/global";
import { useIsMobile } from "~/hooks/use-mobile";

import { useChatRoom } from "~/providers/chat/useChatRoom";
import { useConnectedChatRoomAssistant } from "~/api/client/customer/useCustomer";
import {
  useCustomer,
  type CustomerMessage,
} from "~/providers/customer-provider";
import { useUpload } from "~/api/client/upload";

export default function ChatInputAIAssistant({
  customerId,
  chatRoomId,
  isAILoading,
}: {
  customerId: string;
  chatRoomId: string;
  isAILoading: boolean;
  firstTimeMessage?: string;
}) {
  const { messagesAITest, setMessagesAITest } = useCustomer();

  const isMobile = useIsMobile();

  const [input, setInput] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { selectedRoom } = useChatRoom();
  const { mutate: upload, isPending } = useUpload();
  const { mutateAsync: connectedChatRoomAIAssistant, isPending: isPendingAI } =
    useConnectedChatRoomAssistant(customerId, chatRoomId);

  console.log("selectedRoom", selectedRoom);

  const handleInputChange = (e: any) => {
    const value = e.target.value;

    setInput(e.target.value);
    setMessagesAITest((prev) => {
      const roomIndex = prev.findIndex((p) => p.roomId === selectedRoom.id);

      if (roomIndex > -1) {
        const updatedMessages = [...prev];
        updatedMessages[roomIndex] = {
          ...updatedMessages[roomIndex],
          lastestMessage: value,
        } as CustomerMessage;

        return updatedMessages;
      }

      return [...prev, { roomId: selectedRoom.id, lastestMessage: value }];
    });
  };

  const sendText = async (e: React.FormEvent) => {
    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = "auto";

    setMessagesAITest((prev) => {
      const roomIndex = prev.findIndex((p) => p.roomId === selectedRoom.id);

      if (roomIndex > -1) {
        const updatedMessages = [...prev];

        updatedMessages[roomIndex] = {
          ...updatedMessages[roomIndex],
          lastestMessage: "",
        } as CustomerMessage;

        return updatedMessages;
      }

      return prev;
    });

    e.preventDefault();
    if (!input.trim() || !customerId) return;

    const messageText = input.trim();
    setInput("");

    connectedChatRoomAIAssistant({
      message: messageText,
      messageType: "text",
      chatRoomId: customerId,
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
    <form onSubmit={sendText} className="gap-2 border-t w-full">
      <textarea
        // placeholder={
        //   isMobile
        //     ? "กดส่งข้อความเพื่อส่งข้อความ"
        //     : "Enter: ส่ง, Shift+Enter:ขึ้นบรรทัดใหม่"
        // }
        placeholder="สอบถาม AI ได้เลย"
        className="flex-1 max-h-[300px] w-full resize-none overflow-auto p-2 border-0 rounded-md outline-none"
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
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
      />

      <div className="flex justify-end p-4">
        <Button
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
        </Button>
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
