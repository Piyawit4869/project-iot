"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollArea,
  Input,
  Button,
  Avatar,
  AvatarFallback,
} from "@/components/ui";
import { Maximize2, Send, FileImage } from "lucide-react";
import Link from "next/link";
// import socket from "@/libs/sockets";
import { useChat, Message } from "@/stores/chat/useChat";
import Image from "next/image";
import { cn } from "@/libs/utils";
import React from "react";
import {
  useAllMessageWithRoomId,
  useSendMessage,
} from "@/actions/chat/client/useMessage";

import { ChatRoomSchemaType } from "@/schemas/chat/message";

export default function ChatBox({
  chatName,
  roomLoading,
  selectedRoom,
}: {
  chatName: string;
  roomLoading: boolean;
  selectedRoom: ChatRoomSchemaType;
}) {
  const { messages, addMessage } = useChat();
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const { data: messagesData = [], isLoading } = useAllMessageWithRoomId(
    selectedRoom.id
  );

  const { mutate: send } = useSendMessage();

  const sendText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const messageText = input.trim();

    const userMessage: Message = {
      id: Date.now().toString(),
      chatRoomId: selectedRoom.id,
      message: messageText,
      timestamp: new Date().toISOString(),
      imageUrl: "https://ui-avatars.com/api/?name=Marry",
      lineSubId: selectedRoom.customer?.lineSubId ?? "",
      platform: "backoffice",
      sender: "Marry",
      recipient: "rome",
      isAiReply: false,
      status: "active",
      customerId: selectedRoom.customer?.id ?? "",
    };

    addMessage(userMessage);
    setInput("");

    // socket.emit("message", userMessage);

    send({
      chatRoomId: selectedRoom.id,
      lineSubId: selectedRoom.customer?.lineSubId ?? "",
      message: messageText,
      messageType: "text",
      isAiReply: false,
      recipient: selectedRoom.customer?.fullName ?? "Unknown",
      customerId: selectedRoom.customerId ?? "",
      platform: "backoffice",
      messageLabel: "text",
    });
  };

  // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = Array.from(e.target.files ?? []);
  //   if (files.length === 0) return;

  //   const readers = files.map(
  //     (file) =>
  //       new Promise<string>((resolve, reject) => {
  //         const reader = new FileReader();
  //         reader.onload = () => resolve(reader.result as string);
  //         reader.onerror = reject;
  //         reader.readAsDataURL(file);
  //       })
  //   );

  //   Promise.all(readers).then((base64Images) => {
  //     addMessage({
  //       role: "user",
  //       name: "Marry",
  //       avatar: "/user.jpg",
  //       content: "",
  //       images: base64Images,
  //       timestamp: new Date().toISOString(),
  //     });
  //   });
  // };

  React.useEffect(() => {
    if (messagesData.length > 0) {
      messagesData.forEach((msg: Message) => {
        const exists = messages.some((m) => m.timestamp === msg.timestamp);
        if (!exists) {
          addMessage({
            id: msg.timestamp,
            chatRoomId: msg.chatRoomId,
            message: msg.message,
            lineSubId: msg.lineSubId || "",
            status: msg.status || "active",
            sender: msg.sender || "Unknown",
            recipient: msg.recipient || "",
            isAiReply: msg.isAiReply || false,
            platform: msg.platform || "UNKNOWN",
            customerId: msg.customerId || "",
            imageUrl: msg.imageUrl || "",
            timestamp: msg.timestamp,
          });
        }
      });
    }
  }, [addMessage, messages, messagesData, selectedRoom.id]);

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-[90px] right-24 z-50 w-[300px] h-[400px] max-w-full">
      <Card className="shadow-xl border border-muted rounded-xl overflow-hidden">
        <CardHeader className="bg-primary text-white p-4 flex flex-row justify-between items-center">
          <CardTitle className="text-base">{chatName ?? "-"}</CardTitle>
          <Link href={"/organization/message"}>
            <Button size="icon" variant="ghost" className="text-white">
              <Maximize2 className="w-4 h-4" />
            </Button>
          </Link>
        </CardHeader>

        <CardContent className="flex flex-col h-[400px] justify-between p-0">
          <ScrollArea className="flex-1 overflow-y-auto">
            <div className="px-4 py-6 space-y-6 backdrop-blur-md bg-white/60">
              {roomLoading || isLoading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex max-w-[75%] flex-col gap-1",
                        i % 2 === 0
                          ? "ml-auto items-end"
                          : "mr-auto items-start"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-6 h-6 rounded-full bg-gray-300 animate-pulse" />
                        <div className="w-16 h-4 bg-gray-300 rounded animate-pulse" />
                      </div>
                      <div
                        className={cn(
                          "rounded-xl bg-gray-200 px-4 py-3 animate-pulse h-6",
                          i % 2 === 0 ? "bg-blue-200" : "bg-gray-200",
                          "w-[150px] sm:w-[200px] md:w-[250px]"
                        )}
                      />
                    </div>
                  ))
                : messages.map((msg, i) => {
                    const isUser = msg.platform === "DIRECT";
                    const avatarFallback =
                      msg.imageUrl && !msg.imageUrl.includes("http")
                        ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            msg.imageUrl
                          )}`
                        : msg.imageUrl;

                    return (
                      <div
                        key={i}
                        className={cn(
                          "flex max-w-[75%] flex-col gap-1",
                          isUser ? "ml-auto items-end" : "mr-auto items-start"
                        )}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Avatar className="w-6 h-6">
                            <Image
                              src={avatarFallback || "/avatar.png"}
                              alt="avatar"
                              fill
                              unoptimized
                              className="rounded-full object-cover"
                            />
                            <AvatarFallback>
                              {(msg.sender || msg.recipient || "U")[0]}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-xs text-muted-foreground font-medium">
                            {msg.sender || msg.recipient || "Anonymous"}
                          </span>
                        </div>

                        <div
                          className={cn(
                            "rounded-xl px-4 py-2 text-sm whitespace-pre-wrap",
                            isUser
                              ? "bg-blue-500 text-white"
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {msg.message}
                        </div>
                      </div>
                    );
                  })}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>

          <form
            onSubmit={sendText}
            className="flex items-center gap-2 border-t p-2"
          >
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileImage />
            </Button>

            <input
              disabled
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              // onChange={handleImageUpload}
              className="hidden"
            />

            <Input
              placeholder="Aa"
              className="flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />

            <Button type="submit" size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
