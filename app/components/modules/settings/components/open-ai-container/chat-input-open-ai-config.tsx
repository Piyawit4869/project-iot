import { Loader2, Send } from "lucide-react";
import React from "react";
import { useSendMessage } from "~/api/client/settings";
import { useUpload } from "~/api/client/useGetUpload";
import { Button } from "~/components/ui/button";
import { useIsMobile } from "~/hooks/use-mobile";
import { useChatRoom } from "~/providers/chat/useChatRoom";
import { useMessage, type Message } from "~/providers/chat/useMessage";
import { MessageLabelType } from "~/types/global";

interface ChatInputOpenAiConfigProps {
  chatRoomId: string;
  isAILoading: boolean;
  isPendingAI: boolean;
  connectedChatRoomAI: (values: any) => void;
}

export const ChatInputOpenAiConfig: React.FC<ChatInputOpenAiConfigProps> = (
  props
) => {
  const { chatRoomId, isAILoading, isPendingAI, connectedChatRoomAI } = props;

  const { messagesAI } = useMessage();

  const isMobile = useIsMobile();

  const [input, setInput] = React.useState<string>("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { selectedRoom, customer } = useChatRoom();
  const { mutate: upload, isPending } = useUpload();
  const { mutate: send } = useSendMessage();

  const handleInputChange = (e: any) => {
    const value = e.target.value;

    setInput(e.target.value);
    // setMessagesAI((prev) => {
    //   const roomIndex = prev.findIndex((p) => p.roomId === selectedRoom.id);

    //   if (roomIndex > -1) {
    //     const updatedMessages = [...prev];
    //     updatedMessages[roomIndex] = {
    //       ...updatedMessages[roomIndex],
    //       lastestMessage: value,
    //     } as Message;

    //     return updatedMessages;
    //   }

    //   return [...prev, { roomId: selectedRoom.id, lastestMessage: value }];
    // });
  };

  const sendText = async (e: React.FormEvent) => {
    // const socket = socketConfig(api);

    const textarea = e.target as HTMLTextAreaElement;
    textarea.style.height = "auto";

    // setMessagesAI((prev) => {
    //   const roomIndex = prev.findIndex((p) => p.roomId === selectedRoom.id);

    //   if (roomIndex > -1) {
    //     const updatedMessages = [...prev];
    //     updatedMessages[roomIndex] = {
    //       ...updatedMessages[roomIndex],
    //       lastestMessage: "",
    //     } as Message;

    //     return updatedMessages;
    //   }

    //   return prev;
    // });

    e.preventDefault();
    if (!input.trim() || !chatRoomId) return;

    const messageText = input.trim();
    setInput("");

    connectedChatRoomAI({
      message: messageText,
      messageType: "text",
      chatRoomId: chatRoomId,
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
    const existingMesssge = messagesAI.find(
      (p) => p.roomId === selectedRoom.id
    );
    if (existingMesssge) {
      setInput(existingMesssge.lastestMessage);
    } else {
      setInput("");
    }
  }, [selectedRoom, messagesAI]);

  return (
    <form onSubmit={sendText} className="gap-2 border-t w-full">
      <textarea
        // placeholder={
        //   isMobile
        //     ? "กดส่งข้อความเพื่อส่งข้อความ"
        //     : "Enter: ส่ง, Shift+Enter:ขึ้นบรรทัดใหม่"
        // }
        placeholder="ทดสอบการพูดคุย..."
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

      <div className="flex justify-end p-4">
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
};
