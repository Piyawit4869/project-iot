import { useLineGetSticker, useSendMessage } from "~/api/client/settings";

export function StickerSelectorBar() {
  type LineSticker = {
    id: string;
    url: string;
  };
  type StickerPackage = {
    packageId: string;
    stickers: LineSticker[];
  };
  const { data } = useLineGetSticker();
  // const { mutate: send } = useSendMessage();

  // function handleSendSticker(sticker: LineSticker, stickerPackage: StickerPackage) {
  //   send({
  //     chatRoomId: "1800de94-e68a-48c1-8663-03170ac34f4d",
  //     lineSubId: "U179fc1713b2fc0e8290003b53084ee21",
  //     message: sticker.url,
  //     messageType: "sticker",
  //     isAiReply: false,
  //     recipient: "zevxor",
  //     customerId: "0c80f9f5-b264-4670-8fe8-a0c9515b1182",
  //     platform: "backoffice",
  //     messageLabel: "ส่งข้อความ",
  //     // packageId: stickerPackage.packageId,
  //     // stickerId: sticker.id,
  //   });
  // }

  return (
    <div className="h-60 flex flex-col border-b">
      <div className="h-14 border-b border-neutral-200 flex items-center gap-2 px-2">
        {data?.map((stickerPackage: StickerPackage) => {
          const firstSticker = stickerPackage.stickers[0];
          return (
            <button
              key={stickerPackage.packageId}
              className="h-10 w-10 rounded-md bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center overflow-hidden"
            >
              {firstSticker && (
                <img src={firstSticker.url} className="w-full h-full object-contain" />
              )}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2">
        {data?.map((stickerPackage: StickerPackage) => 
          stickerPackage.stickers.map((sticker: LineSticker) => (
          <button
            key={sticker.id}
            className="aspect-square p-0 border rounded-xl bg-white hover:bg-neutral-100 transition-all duration-200 ease-out hover:scale-110"
            // onClick={() => handleSendSticker(sticker, stickerPackage)}
          >
            <img src={sticker.url} className="w-full h-full object-contain" />
          </button>
          ))
        )}
      </div>
    </div>
  );
}