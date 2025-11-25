import { useLineGetSticker, useSendMessage } from "~/api/client/settings";
import { Avatar, AvatarFallback } from "~/components/ui/avatar";
import {
  useCustomer,
  type CustomerMessage,
} from "~/providers/customer-provider";
import { MessageLabelType } from "~/types/global";
import { MessageRenderer } from "./render-message-content";
import { X } from "lucide-react";
type LineSticker = {
  id: string;
  url: string;
};

export function ReplyContentBar({
  selectedRoom,
  customer,
  replyRefMessage,
  setReplyRefMessage,
}: {
  selectedRoom: any;
  customer: any;
  replyRefMessage: any;
  setReplyRefMessage: React.Dispatch<React.SetStateAction<any>>;
}) {
  const { setMessages } = useCustomer();

  const { mutate: send } = useSendMessage();

  const handleSendSticker = (stickerPackage: any, sticker: any) => {
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

    send({
      chatRoomId: selectedRoom.id,
      lineSubId: customer?.lineSubId ?? "",
      message: sticker.url,
      messageType: "sticker",
      isAiReply: false,
      recipient: customer?.name ?? "Unknown",
      platform: "backoffice",
      messageLabel: MessageLabelType.SENDSTICKER,
      packageId: stickerPackage.packageId,
      stickerId: sticker.id,
    });
  };

  return (
    <div className="flex flex-col border-b">
      <div className="flex justify-between ">
        <div className="flex items-center gap-2 mb-1">
          <Avatar className="w-6 h-6">
            <img
              src={replyRefMessage.imageUrl || "/avatar.png"}
              alt="avatar"
              className="rounded-full object-cover"
            />
            <AvatarFallback>{replyRefMessage.sender}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-muted-foreground font-medium">
            {replyRefMessage.sender || "Anonymous"}
          </span>
        </div>

        <X
          onClick={() => setReplyRefMessage(null)}
          className="cursor-pointer"
        />
      </div>

      <MessageRenderer
        onlyShow={true}
        msg={replyRefMessage}
        isBackoffice={false}
      />
    </div>
  );
}
