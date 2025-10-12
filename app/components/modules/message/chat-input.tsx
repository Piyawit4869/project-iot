"use client";

import { useRef, useState } from "react";
import { Button } from "~/components/ui/button";
import { FileImage, Send, Loader2 } from "lucide-react";
import React from "react";
import { MessageLabelType } from "~/types/global";
import { useIsMobile } from "~/hooks/use-mobile";

import { useSendMessage } from "~/api/client/message/useMessage";
import { useUpload } from "~/api/client/useGetUpload";
import {
  useCustomer,
  type CustomerMessage,
} from "~/providers/customer-provider";
// import { socketConfig } from "@/libs/sockets";
// import { env } from "@/constants/common";

export default function ChatInput({ selectedRoom }: { selectedRoom: any }) {
  // const apiSocket = new URL(env.base_url ?? "http://localhost:3000").origin;

  const { messages, setMessages } = useCustomer();
  const isMobile = useIsMobile();

  const [input, setInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: upload, isPending } = useUpload();
  const { mutate: send } = useSendMessage();

  const handleInputChange = (e: any) => {
    const value = e.target.value;

    setInput(e.target.value);
    setMessages((prev) => {
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
    // const socket = socketConfig(apiSocket);

    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = "auto";

    setMessages((prev) => {
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
    if (!input.trim() || !selectedRoom?.id) return;

    const messageText = input.trim();
    setInput("");
    // socket.emit("emit-chat", {
    //   chatRoomId: selectedRoom.id,
    //   message: messageText,
    //   lineSubId: selectedRoom.customer?.lineSubId ?? "",
    //   messageType: "text",
    //   isAiReply: false,
    //   recipient: selectedRoom.customer?.fullName ?? "Unknown",
    //   customerId: selectedRoom.customerId ?? "",
    //   platform: "backoffice",
    //   messageLabel: MessageLabelType.SENDTEXT,
    //   imageUrl: "", // เผื่อฝั่ง server ต้องการ
    //   timestamp: new Date().toISOString(),
    //   sender: "คุณ",
    // });
    send({
      chatRoomId: selectedRoom.id,
      lineSubId: selectedRoom.customer?.lineSubId ?? "",
      message: messageText,
      messageType: "text",
      isAiReply: false,
      recipient: selectedRoom.customer?.fullName ?? "Unknown",
      customerId: selectedRoom.customerId ?? "",
      platform: "backoffice",
      messageLabel: MessageLabelType.SENDTEXT,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("ไฟล์ขนาดใหญ่เกินไป (เกิน 10MB)");
      e.target.value = "";
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    upload(formData, {
      onSuccess: (res) => {
        if (!selectedRoom?.id) return;

        const imageUrl = res.res.url;

        if (!imageUrl) {
          console.error("No image URL returned from upload");
          return;
        }

        send({
          chatRoomId: selectedRoom.id,
          lineSubId: selectedRoom.customer?.lineSubId ?? "",
          message: imageUrl,
          messageType: "image",
          isAiReply: false,
          recipient: selectedRoom.customer?.fullName ?? "Unknown",
          customerId: selectedRoom.customerId ?? "",
          platform: "line",
          messageLabel: MessageLabelType.SENDIMAGE,
        });
      },
      onError: (error) => {
        console.error("Upload failed", error);
      },
    });

    e.target.value = "";
  };

  React.useEffect(() => {
    const existingMesssge = messages.find((p) => p.roomId === selectedRoom.id);
    if (existingMesssge) {
      setInput(existingMesssge.lastestMessage);
    } else {
      setInput("");
    }
  }, [selectedRoom, messages]);

  if (!selectedRoom?.id) {
    return <div></div>;
  }

  return (
    <form
      onSubmit={sendText}
      className="gap-2 border-t w-full dark:bg-background"
    >
      <textarea
        placeholder={
          isMobile
            ? "กดส่งข้อความเพื่อส่งข้อความ"
            : "Enter: ส่ง, Shift+Enter:ขึ้นบรรทัดใหม่"
        }
        className="flex-1 max-h-[300px] w-full resize-none overflow-auto p-2 border-0 rounded-md outline-none "
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
            sendText(e as unknown as React.FormEvent); // Trigger your send function
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

      <div className="flex justify-end p-4 ">
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
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
