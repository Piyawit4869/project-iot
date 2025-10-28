"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { FileImage, Send, Loader2, X } from "lucide-react";
import React from "react";
import { MessageLabelType } from "~/types/global";
import { useIsMobile } from "~/hooks/use-mobile";
import { useSendMessage } from "~/api/client/message/useMessage";
import { useUpload } from "~/api/client/useGetUpload";
import {
  useCustomer,
  type CustomerMessage,
} from "~/providers/customer-provider";
import LineTemplatePickerModal from "./line-template-picker-modal";
import { GlobalImage } from "~/components/shared/global-image";

type PendingImage = { id: string; file: File; url: string; name: string };

export default function ChatInput({
  selectedRoom,
  customer,
}: {
  selectedRoom: any;
  customer: any;
}) {
  const { messages, setMessages } = useCustomer();
  const isMobile = useIsMobile();

  const [input, setInput] = useState("");
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: uploadMutate, isPending } = useUpload();
  const { mutate: send } = useSendMessage();

  // --- auto-resize helper ---
  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${el.scrollHeight}px`;
  };

  // resize เมื่อข้อความเปลี่ยน หรือมีการ mount ครั้งแรก
  useEffect(() => {
    autoResize();
  }, [input]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);
    setMessages((prev) => {
      const roomIndex = prev.findIndex((p) => p.roomId === selectedRoom.id);
      if (roomIndex > -1) {
        const updated = [...prev];
        updated[roomIndex] = {
          ...updated[roomIndex],
          lastestMessage: value,
        } as CustomerMessage;
        return updated;
      }
      return [...prev, { roomId: selectedRoom.id, lastestMessage: value }];
    });
  };

  const uploadFile = (file: File) =>
    new Promise<{ url: string }>((resolve, reject) => {
      const formData = new FormData();
      formData.append("file", file);
      uploadMutate(formData, { onSuccess: resolve, onError: reject });
    });

  const sendText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessages((prev) => {
      const roomIndex = prev.findIndex((p) => p.roomId === selectedRoom.id);
      if (roomIndex > -1) {
        const updated = [...prev];
        updated[roomIndex] = {
          ...updated[roomIndex],
          lastestMessage: "",
        } as CustomerMessage;
        return updated;
      }
      return prev;
    });

    if (!selectedRoom?.id) return;

    // 1) ส่งรูปถ้ามี
    if (pendingImages.length > 0) {
      try {
        for (const p of pendingImages) {
          const result = await uploadFile(p.file);
          if (!result?.url) continue;
          send({
            chatRoomId: selectedRoom.id,
            lineSubId: customer?.lineSubId ?? "",
            message: result.url,
            messageType: "image",
            isAiReply: false,
            recipient: customer?.name ?? "Unknown",
            customerId: selectedRoom?.customerId ?? "",
            platform: "backoffice",
            messageLabel: MessageLabelType.SENDIMAGE,
          });
        }
      } catch (err) {
        console.error("Upload image(s) failed", err);
        return;
      } finally {
        pendingImages.forEach((p) => URL.revokeObjectURL(p.url));
        setPendingImages([]);
      }
    }

    // 2) ส่งข้อความล้วน
    const plainText = input
      .split("\n")
      .filter((line) => !/^\[ภาพแนบ\s.+\]$/i.test(line.trim()))
      .join("\n")
      .trim();

    if (plainText) {
      send({
        chatRoomId: selectedRoom.id,
        lineSubId: customer?.lineSubId ?? "",
        message: plainText,
        messageType: "text",
        isAiReply: false,
        recipient: customer?.name ?? "Unknown",
        customerId: selectedRoom?.customerId ?? "",
        platform: "backoffice",
        messageLabel: MessageLabelType.SENDTEXT,
      });
    }

    // 3) เคลียร์ textarea แล้วรีไซซ์ใหม่
    setInput("");
    requestAnimationFrame(autoResize);
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   e.target.value = "";
  //   if (!file) return;
  //   if (file.size > 10 * 1024 * 1024) {
  //     alert("ไฟล์ขนาดใหญ่เกินไป (เกิน 10MB)");
  //     return;
  //   }
  //   const url = URL.createObjectURL(file);
  //   const id = `${Date.now()}-${file.name}`;
  //   setPendingImages((prev) => [...prev, { id, file, url, name: file.name }]);
  //   // setInput((prev) =>
  //   //   prev ? `${prev}\n[ภาพแนบ ${file.name}]` : `[ภาพแนบ ${file.name}]`
  //   // );
  // };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    e.target.value = "";

    if (selectedFiles.length === 0) return;

    const maxSize = 10 * 1024 * 1024; // 10MB
    const newImages: PendingImage[] = [];

    for (const file of selectedFiles) {
      if (file.size > maxSize) {
        alert(`ไฟล์ ${file.name} ขนาดใหญ่เกินไป (เกิน 10MB)`);
        continue;
      }

      const url = URL.createObjectURL(file);
      const id = `${Date.now()}-${file.name}`;
      newImages.push({ id, file, url, name: file.name });
    }

    if (newImages.length > 0) {
      setPendingImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleRemovePending = (id: string) => {
    setPendingImages((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.id !== id);
    });
    setInput((prev) =>
      prev
        .split("\n")
        .filter((line) => !line.startsWith("[ภาพแนบ"))
        .join("\n")
    );
  };

  // useEffect(() => {
  //   const existing = messages.find((p) => p.roomId === selectedRoom?.id);
  //   setInput(existing ? existing.lastestMessage : "");
  // }, [selectedRoom, messages]);

  if (!selectedRoom?.id) return <div />;

  return (
    <form
      onSubmit={sendText}
      className="flex flex-col w-full gap-2 border-t p-2 dark:bg-background"
    >
      {pendingImages.length > 0 && (
        <div className="w-full h-full grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
          {pendingImages.map((p) => (
            <div
              key={p.id}
              className="relative group border rounded-md overflow-hidden"
            >
              <GlobalImage
                src={p.url}
                alt={p.name}
                className="w-full h-24 object-contain"
              />
              <button
                type="button"
                onClick={() => handleRemovePending(p.id)}
                className="absolute top-1 right-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-black/60 text-white"
                title="ลบรูปนี้ออก"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      <textarea
        ref={textareaRef}
        placeholder={
          isMobile
            ? "กดส่งข้อความเพื่อส่งข้อความ"
            : "Enter: ส่ง, Shift+Enter:ขึ้นบรรทัดใหม่"
        }
        className="w-full resize-none p-2 border-0 rounded-md outline-none min-h-[44px] max-h-[40vh] leading-6 overflow-auto"
        value={input}
        onChange={handleInputChange}
        disabled={isPending}
        rows={1}
        onInput={autoResize}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey && !isMobile) {
            e.preventDefault();
            (e.currentTarget.form as HTMLFormElement)?.requestSubmit();
          }
        }}
      />

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleImageUpload}
        className="hidden"
        multiple={true}
      />

      <div className="flex justify-end gap-2 pt-1">
        <LineTemplatePickerModal />
        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
          title="แนบรูปภาพ"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <FileImage />
          )}
        </Button>
        <Button size="icon" type="submit" disabled={isPending} title="ส่ง">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
