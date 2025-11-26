import { X } from "lucide-react";
import { useSendMessage } from "~/api/client/message/useMessage";
import { useLineGetSticker } from "~/api/client/settings";
import {
  useCustomer,
  type CustomerMessage,
} from "~/providers/customer-provider";
import { MessageLabelType } from "~/types/global";

type LineSticker = {
  id: string;
  url: string;
};
type StickerPackage = {
  packageId: string;
  stickers: LineSticker[];
};

export function StickerSelectorBar({
  selectedRoom,
  customer,
  replyRefMessage,
  setShowStickerSelector,
}: {
  selectedRoom: any;
  customer: any;
  replyRefMessage: any;
  setShowStickerSelector: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { setMessages } = useCustomer();

  const { data } = useLineGetSticker();
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

    setShowStickerSelector(false);

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
      quoteToken: replyRefMessage?.quoteToken || "",
    });
  };

  return (
    <div className="h-60 flex flex-col border-b">
      <div className="w-full flex justify-end -mb-2">
        <X
          className="cursor-pointer"
          onClick={() => setShowStickerSelector(false)}
        />
      </div>
      <div className="h-14 border-b border-neutral-200 flex items-center gap-2 px-2">
        {data?.map((stickerPackage: StickerPackage) => {
          const firstSticker = stickerPackage.stickers[0];
          return (
            <button
              key={stickerPackage.packageId}
              className="h-10 w-10 rounded-md bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center overflow-hidden"
            >
              {firstSticker && (
                <img
                  src={firstSticker.url}
                  className="w-full h-full object-contain"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 mt-2">
        {data?.map((stickerPackage: StickerPackage) =>
          stickerPackage.stickers.map((sticker: LineSticker) => (
            <button
              key={sticker.id}
              className="aspect-square p-0 border rounded-xl bg-white hover:bg-neutral-100 transition-all duration-200 ease-out hover:scale-110 cursor-pointer"
              // onClick={() => handleSendSticker(sticker, stickerPackage)}
              onClick={() => handleSendSticker(stickerPackage, sticker)}
            >
              <img src={sticker.url} className="w-full h-full object-contain" />
            </button>
          ))
        )}
      </div>
    </div>
  );
}
