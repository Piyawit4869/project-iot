import { useRef, useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { Send, Loader2, X, Paperclip, Smile } from "lucide-react";
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
import { StickerSelectorBar } from "./line-sticker";
import { ReplyContentBar } from "./reply-content-bar";
import { ChatSelectLocation } from "./chat-select-location";
import { handleSplitThaiAddress } from "~/utils/chats";
import { useRouteLoaderData } from "react-router";
import { useChat, type Message } from "~/providers/chat/useChat";
import { socketConfig } from "~/lib/sockets";
import { io, type Socket } from "socket.io-client";

const getLabelFromType = (type: string): MessageLabelType => {
  switch (type) {
    case "text":
      return MessageLabelType.SENDTEXT;
    case "image":
      return MessageLabelType.SENDIMAGE;
    case "sticker":
      return MessageLabelType.SENDSTICKER;
    case "audio":
      return MessageLabelType.SENDAUDIO;
    case "video":
      return MessageLabelType.SENDVIDEO;
    case "file":
      return MessageLabelType.SENDFILE;
    default:
      return MessageLabelType.SENDTEXT;
  }
};

const extractThumbnail = (file: File): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.muted = true;
    video.crossOrigin = "anonymous";

    const objectUrl = URL.createObjectURL(file);
    video.src = objectUrl;

    // 1) เมื่อ metadata พร้อม → กำหนดเวลา frame
    video.onloadedmetadata = () => {
      if (video.duration < 0.1) {
        video.currentTime = 0; // บางไฟล์สั้นมาก
      } else {
        video.currentTime = Math.min(0.1, video.duration / 2);
      }
    };

    // 2) เมื่อ seeked เสร็จ → frame พร้อมแล้ว
    video.onseeked = () => {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) return reject("Canvas ctx error");

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl);

          if (!blob) return reject("Thumbnail creation failed");

          resolve(blob);

          // auto download
          // const downloadUrl = URL.createObjectURL(blob);
          // const a = document.createElement("a");
          // a.href = downloadUrl;
          // a.download = `${file.name}-thumbnail.jpg`;
          // document.body.appendChild(a);
          // a.click();
          // document.body.removeChild(a);
          // setTimeout(() => URL.revokeObjectURL(downloadUrl), 300);
        },
        "image/jpeg",
        0.8
      );
    };

    video.onerror = (err) => reject(err);
  });
};

type PendingImage = {
  id: string;
  file: File;
  url: string;
  name: string;
  type: "image" | "video" | "audio" | "file";
};

export interface LatLong {
  lat: number;
  lng: number;
}

export default function ChatInput({
  api,
  selectedRoom,
  customer,
  replyRefMessage,
  subId,
  setReplyRefMessage,
}: {
  api: string;
  subId: string;
  selectedRoom: any;
  customer: any;
  replyRefMessage: any;
  setReplyRefMessage: React.Dispatch<React.SetStateAction<any>>;
}) {
  const { me } = useRouteLoaderData("root");

  const { setMessages } = useCustomer();
  const isMobile = useIsMobile();

  const [input, setInput] = useState("");
  const [showStickerSelector, setShowStickerSelector] = useState(false);
  const [pendingImages, setPendingImages] = useState<PendingImage[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const socketRef = React.useRef<Socket | null>(null);

  const [mapAddress, setMapAddress] = React.useState<string>("");
  const [latlng, setLatLng] = React.useState<LatLong | undefined>(undefined);

  const typingTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const isTypingRef = React.useRef(false);

  const { chatRoomId: customerChatRoomId } =
    (customer && customer.chatRoomDetail) || {};

  const { mutate: uploadMutate, isPending } = useUpload();
  const { mutate: send } = useSendMessage();

  // Resize textarea
  const autoResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    autoResize();
  }, [input]);

  // Detect file type
  const getFileType = (file: File): PendingImage["type"] => {
    const mime = file.type;
    if (mime.startsWith("image/")) return "image";
    if (mime.startsWith("video/")) return "video";
    if (mime.startsWith("audio/")) return "audio";
    return "file";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInput(value);

    const payload = {
      chatRoomId: selectedRoom.id,
      userId: me.id,
    };

    if (!isTypingRef.current) {
      emitTyping(payload);
      isTypingRef.current = true;
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

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

  // ---- MAIN SUBMIT ----
  const sendText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // clear preview in sidebar
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

    // ---- 1) ส่งไฟล์ทุกประเภท ----
    if (pendingImages.length > 0) {
      try {
        for (const p of pendingImages) {
          const result = await uploadFile(p.file);
          if (!result?.url) continue;

          let messageType: string = p.type; // image, video, audio
          let message = result.url;

          if (p.type === "file") {
            messageType = "text"; // FILE ต้องส่งเป็น text แต่ message เป็น URL
          }

          send({
            chatRoomId: selectedRoom.id,
            lineSubId: customer?.lineSubId ?? "",
            message,
            messageType,
            isAiReply: false,
            recipient: customer?.name ?? "Unknown",
            platform: "backoffice",
            messageLabel: MessageLabelType.SENDIMAGE,
            quoteToken: replyRefMessage?.quoteToken || "",
          });

          setReplyRefMessage(null);
        }
      } catch (err) {
        console.error("Upload file(s) failed", err);
        return;
      } finally {
        pendingImages.forEach((p) => URL.revokeObjectURL(p.url));
        setPendingImages([]);
      }
    }

    // ---- 2) ส่งข้อความล้วน ----
    const plainText = input.trim();
    if (plainText) {
      send({
        chatRoomId: selectedRoom.id,
        lineSubId: customer?.lineSubId ?? "",
        message: plainText,
        messageType: "text",
        isAiReply: false,
        recipient: customer?.name ?? "Unknown",
        platform: "backoffice",
        messageLabel: MessageLabelType.SENDTEXT,
        quoteToken: replyRefMessage?.quoteToken || "",
      });
    }
    setReplyRefMessage(null);
    setInput("");
    requestAnimationFrame(autoResize);
  };

  // ---- FILE PICKER HANDLER ----
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    e.target.value = "";

    if (selectedFiles.length === 0) return;

    const maxSize = 20 * 1024 * 1024; // 20MB

    for (const file of selectedFiles) {
      if (file.size > maxSize) {
        alert(`ไฟล์ ${file.name} ขนาดใหญ่เกินไป (เกิน 20MB)`);
        continue;
      }

      const mime = file.type;

      // -------------------------
      // IMAGE → stack normally
      // -------------------------
      if (mime.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        const id = `${Date.now()}-${file.name}`;

        setPendingImages((prev) => [
          ...prev,
          { id, file, url, name: file.name, type: "image" },
        ]);
        continue;
      }

      // -------------------------
      // OTHER FILES → upload then send
      // -------------------------
      try {
        const result = await uploadFile(file);
        if (!result?.url) continue;

        let messageType = "file";

        if (mime.startsWith("video/")) messageType = "video";
        else if (mime.startsWith("audio/")) messageType = "audio";

        let thumbnailUrl = "";

        // --------------------------
        // VIDEO → generate thumbnail
        // --------------------------
        if (messageType === "video") {
          try {
            const thumbnailBlob = await extractThumbnail(file);

            const formThumb = new FormData();
            formThumb.append("file", thumbnailBlob, "thumbnail.jpg");

            const thumbUpload = await new Promise<{ url: string }>(
              (resolve, reject) =>
                uploadMutate(formThumb, { onSuccess: resolve, onError: reject })
            );

            thumbnailUrl = thumbUpload?.url ?? "";
          } catch (err) {
            console.error("Thumbnail error:", err);
          }
        }
        // --------------------------
        // SEND MESSAGE
        // --------------------------
        send({
          chatRoomId: selectedRoom.id,
          lineSubId: customer?.lineSubId ?? "",
          message: result.url,
          messageType,
          thumbnailUrl, // <-- ADD HERE
          isAiReply: false,
          recipient: customer?.name ?? "Unknown",
          platform: "backoffice",
          messageLabel: getLabelFromType(messageType),
          quoteToken: replyRefMessage?.quoteToken || "",
        });
        setReplyRefMessage(null);
      } catch (err) {
        console.error("Upload file failed:", err);
      }
    }
  };

  const handleRemovePending = (id: string) => {
    setPendingImages((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.id !== id);
    });
  };

  const handleSendLocation = React.useCallback(() => {
    try {
      const { line1: message, line2: longAddress } =
        handleSplitThaiAddress(mapAddress);

      send({
        chatRoomId: selectedRoom.id,
        lineSubId: customer?.lineSubId ?? "",
        message,
        messageType: "location",
        isAiReply: false,
        recipient: customer?.name ?? "Unknown",
        platform: "backoffice",
        messageLabel: MessageLabelType.SENDLOCATION,
        quoteToken: replyRefMessage?.quoteToken || "",
        address: longAddress,
        latitude: `${(latlng && latlng.lat) || ""}`,
        longitude: `${(latlng && latlng.lng) || ""}`,
      });
    } catch (error) {
      console.error("error form send location [handleSendLocation]", error);
    }
  }, [mapAddress]);

  React.useEffect(() => {
    const s = socketConfig(api);

    // socketRef.current = io(`wss://service-zev.flune.xyz/live-chat`, {
    //   transports: ["websocket"],
    //   autoConnect: true,
    //   reconnectionAttempts: Infinity,
    //   reconnectionDelay: 1000,
    //   // extraHeaders: {
    //   //   Authorization: `Bearer ${token}`,
    //   // },
    //   auth: {
    //     token: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzZjBmZjI5My04NjdhLTRkYjMtOThjOS0yNmVlZjg4MzUxMjciLCJpYXQiOjE3NjcwNjg0NDQsImV4cCI6MTc2NzMyNzY0NH0.93KHTLx9Dv9v_mvbWHv5XzMM9-0iDdqCEQE-sredPcc`,
    //   },
    // });

    socketRef.current = s;

    socketRef.current.on("connect", () => {
      console.log("✅ socket connected on time", socketRef.current?.id);
    });

    socketRef.current.on("connect_error", (err) => {
      console.error("❌ socket error", err.message);
    });

    socketRef.current.onAny((event, ...args) => {
      console.log("📡 socket event:", event, args);
    });

    socketRef.current.on("disconnect", (reason) => {
      console.warn("🔌 socket disconnected:", reason);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const emitTyping = (payload: any) => {
    const socket = socketRef.current;
    if (!socket || !socket.connected) return;

    socket.emit("typing", payload, (ack: any) => {
      console.log("✅ typing ack:", ack);

      if (ack?.ok) {
        console.log("🎉 emit typing success");
      } else {
        console.warn("⚠️ emit typing failed", ack);
      }
    });
  };

  // useEffect(() => {
  //   if (!socket.current) return;

  //   socket.current = socketConfig(api);

  //   socket.current.onAny((event, ...args) => {
  //     console.log("📡 socket event:", event, args);
  //   });

  //   socket.current.on("typing", (data) => {
  //     console.log("🔥 typing received", data);
  //   });
  // }, []);

  const handlePayload = () => {
    const payload = {
      chatRoomId: selectedRoom.id,
      userId: me.id,
    };

    emitTyping(payload);
  };

  if (!selectedRoom?.id) return <div />;

  return (
    <form
      onSubmit={sendText}
      className="flex flex-col w-full gap-2 border-t p-2 dark:bg-background"
    >
      {showStickerSelector && (
        <div className="w-full">
          <StickerSelectorBar
            selectedRoom={selectedRoom}
            customer={customer}
            replyRefMessage={replyRefMessage}
            setShowStickerSelector={setShowStickerSelector}
          />
        </div>
      )}

      {replyRefMessage?.id && (
        <div className="w-full">
          <ReplyContentBar
            selectedRoom={selectedRoom}
            customer={customer}
            replyRefMessage={replyRefMessage}
            setReplyRefMessage={setReplyRefMessage}
          />
        </div>
      )}
      {/* Preview */}
      {pendingImages.length > 0 && (
        <div className="w-full grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2">
          {pendingImages.map((p) => (
            <div key={p.id} className="relative group border rounded-md p-1">
              <GlobalImage
                src={p.url}
                alt={p.name}
                className="w-full h-24 object-contain"
              />
              <button
                type="button"
                onClick={() => handleRemovePending(p.id)}
                className="absolute top-1 right-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-black/60 text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <textarea
        ref={textareaRef}
        placeholder={
          isMobile
            ? "พิมพ์ข้อความเพื่อส่ง"
            : "Enter = ส่งข้อความ / Shift+Enter = ขึ้นบรรทัดใหม่"
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
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        multiple
      />

      <div className="flex justify-end gap-2 pt-1">
        <ChatSelectLocation
          address={mapAddress}
          latlng={latlng}
          setAddress={setMapAddress}
          setLatLng={setLatLng}
          handleSendLocation={handleSendLocation}
        />

        <Button
          variant="ghost"
          size="icon"
          type="button"
          title="อีโมจิ"
          onClick={() => setShowStickerSelector((isOpen) => !isOpen)}
        >
          <Smile className="w-4 h-4" />
        </Button>

        <Button onClick={handlePayload}>ทดสอบพิมพ์</Button>

        <LineTemplatePickerModal
          handleSelectChange={setInput}
          subId={subId}
          chatRoomId={customerChatRoomId}
        />

        <Button
          variant="ghost"
          size="icon"
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
          title="แนบไฟล์"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Paperclip />
          )}
        </Button>

        <Button size="icon" type="submit" disabled={isPending} title="ส่ง">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}
