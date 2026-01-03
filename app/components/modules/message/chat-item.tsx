import {
  CheckCircle,
  MessagesSquare,
  MoreVertical,
  OctagonAlert,
} from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useMarkAsSpam } from "~/api/client/message/useMessage";
import { GlobalImage } from "~/components/shared/global-image";
import { GlobalModal } from "~/components/shared/modal/modal";
import { TagLabel } from "~/components/shared/tag-label";
import { Avatar } from "~/components/ui/avatar";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useIsMobile } from "~/hooks/use-mobile";
import { cn } from "~/lib/utils";
import { useChat } from "~/providers/chat/useChat";
import { useChatRoom } from "~/providers/chat/useChatRoom";
import { DateTimeStampChatDisplay } from "~/utils/date-format";

type ChatItemProps = {
  name: string;
  message: string;
  time: string;
  unread?: boolean;
  image?: string;
  countUnreadMessage: number;
  onChatClick?: () => void;
  selectedRoom: string;
  roomId: string;
  currentCustomer: any;
  roomDetail?: any;
};

export function ChatItem({
  name,
  message,
  time,
  unread = false,
  image,
  countUnreadMessage = 0,
  onChatClick,
  roomId,
  roomDetail,
}: ChatItemProps) {
  const { mutate: markAsSpam, isPending } = useMarkAsSpam(roomId);
  const fallbackImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}`;

  const isMobile = useIsMobile();

  const { autoReadMsg } = useChatRoom();
  const { setCurrentRoomId, currentRoomId } = useChat();
  const [openOption, setOpenOption] = React.useState<boolean>(false);

  const makeSpam = () => {
    GlobalModal.delete({
      title: "ทำเครื่องหมายลูกค้ารายนี้เป็นสแปม",
      description: "คุณต้องการทำเครื่องหมายลูกค้ารายนี้เป็นสแปม ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังทำเครื่องหมายเป็นสแปม...");

        markAsSpam(true, {
          onSuccess: () => {
            toast.success("ทำเครื่องหมายเป็นสแปมเรียบร้อยแล้ว", {
              id: toastId,
            });
          },
          onError: () => {
            toast.error(
              "ไม่สามารถทำเครื่องหมายเป็นสแปมได้ กรุณาลองใหม่อีกครั้ง",
              { id: toastId }
            );
          },
        });
      },
    });
  };

  const cancelSpam = () => {
    GlobalModal.delete({
      title: "ยกเลิกการทำเครื่องหมายลูกค้ารายนี้เป็นสแปม",
      description:
        "คุณต้องการยกเลิกการทำเครื่องหมายลูกค้ารายนี้เป็นสแปม ใช่หรือไม่?",
      confirmText: "ยืนยัน",
      cancelText: "ยกเลิก",
      onConfirm: () => {
        const toastId = toast.loading("กำลังยกเลิกการทำเครื่องหมายเป็นสแปม...");

        markAsSpam(false, {
          onSuccess: () => {
            toast.success("ยกเลิกการทำเครื่องหมายเป็นสแปมเรียบร้อยแล้ว", {
              id: toastId,
            });
          },
          onError: () => {
            toast.error(
              "ไม่สามารถยกเลิกการทำเครื่องหมายเป็นสแปมได้ กรุณาลองใหม่อีกครั้ง",
              { id: toastId }
            );
          },
        });
      },
    });
  };

  return (
    <div
      className={cn(
        "group sm:justify-center",
        currentRoomId === roomId && "bg-gray-300 dark:bg-gray-700",
        // resize <= 25 && "justify-center",
        "flex items-center px-4 py-3 hover:bg-border cursor-pointer transition w-full"
      )}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("[data-chat-option]")) return;

        setCurrentRoomId?.(roomId);
        onChatClick?.();
      }}
    >
      <div className="relative w-12 h-12 shrink-0">
        <GlobalImage
          src={!image || image === "" ? fallbackImage : image}
          alt={name}
          className="w-[40px] h-[40px] rounded-full object-cover"
        />
        <Avatar className="w-[20px] h-[20px] absolute top-[-5px] right-0">
          <GlobalImage
            src="https://img.freepik.com/premium-vector/line-icon-vector-logo-set_1097694-1650.jpg"
            alt="avatar"
            className="rounded-full object-cover"
          />
        </Avatar>

        {!autoReadMsg && countUnreadMessage > 0 && (
          <span
            className="absolute bottom-[5px] left-[-5px] inline-grid place-items-center min-w-4 h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-medium"
            aria-hidden
          >
            {countUnreadMessage}
          </span>
        )}
      </div>

      {!isMobile && (
        <div className="hidden ml-3 lg:flex flex-col min-w-0 flex-1">
          <div className="flex flex-col gap-2 min-w-0">
            <div className="flex w-full justify-between items-center gap-2 min-w-0">
              <p className={cn("text-sm truncate max-w-[160px]")}>{name}</p>

              <div className="flex items-center gap-2">
                <span className="text-xs text-black-400 whitespace-nowrap shrink-0 text-end">
                  {DateTimeStampChatDisplay(time ?? "")}
                </span>
                <div className="group flex items-center" data-chat-option>
                  <Popover
                    open={openOption}
                    onOpenChange={setOpenOption}
                    data-chat-option
                  >
                    <PopoverTrigger asChild>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onPointerDown={(e) => {
                          e.stopPropagation();
                        }}
                        className="opacity-0 group-hover:opacity-100 transition cursor-pointer hover:text-black"
                      >
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent
                      align="start"
                      className="w-56 p-1 mt-2"
                      data-chat-option
                    >
                      <Command
                        className="max-h-none overflow-visible"
                        data-chat-option
                      >
                        <CommandList>
                          <CommandGroup>
                            {roomDetail?.isSpam ? (
                              <CommandItem
                                className="flex items-center gap-2 cursor-pointer"
                                disabled={isPending}
                                onSelect={cancelSpam}
                              >
                                <OctagonAlert className="w-4 h-4" />
                                ยกเลิกสแปม
                              </CommandItem>
                            ) : (
                              <CommandItem
                                className="flex items-center gap-2 text-red-500 cursor-pointer"
                                disabled={isPending}
                                onSelect={makeSpam}
                              >
                                <OctagonAlert className="w-4 h-4" />
                                กำหนดเป็นสแปม
                              </CommandItem>
                            )}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-row justify-between">
              <p
                className={cn(
                  "text-sm truncate text-black-400  w-full whitespace-nowrap overflow-hidden",
                  unread && "font-medium",
                  ((roomDetail && roomDetail.done) || roomDetail.isProcess) &&
                    "truncate w-[100px]"
                )}
              >
                {message}
              </p>

              {roomDetail && (
                <div className="flex flex-col items-center  justify-end w-[90px]">
                  {roomDetail.done && (
                    <TagLabel
                      label="ดำเนินการแล้ว"
                      icon={<CheckCircle className="mr-1 h-[10px] w-[10px]" />}
                      color="green"
                    />
                  )}

                  {roomDetail.isProcess && (
                    <TagLabel
                      label="ต้องดำเนินการ"
                      icon={
                        <MessagesSquare className="mr-1 h-[10px] w-[10px]" />
                      }
                      color="orange"
                      className="text-[10px]"
                    />
                  )}
                  {roomDetail.isSpam && (
                    <TagLabel
                      label="สแปม"
                      icon={
                        <MessagesSquare className="mr-1 h-[10px] w-[10px]" />
                      }
                      color="red"
                      className="text-[10px]"
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
