import { formatShowTime } from "~/components/shared/global-format";
import { MessageText } from "./message-text";
import {
  Play,
  PauseIcon,
  AudioLines,
  FileText,
  FileType,
  FileSpreadsheet,
  FileArchive,
  File,
  PlayIcon,
  Check,
  UserRound,
} from "lucide-react";
import { ChatItem, FlexMessageType } from "~/types/chat/chat-items";
import { FlexMessagePersonRender } from "./flex-message-person-render";
import { FlexMessageProductRender } from "./flex-message-product-render";
import { FlexMessagePlaceRender } from "./flex-message-place-render";
import { FlexMessageImageRender } from "./flex-message-image-render";
import React from "react";
import { LocationMap } from "./location-map-render";

const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

function getFileIcon(filename: string) {
  const ext = filename.split(".").pop()?.toLowerCase() || "";

  switch (ext) {
    case "pdf":
      return <FileText className="w-8 h-8 text-red-500" />;
    case "doc":
    case "docx":
      return <FileType className="w-8 h-8 text-blue-500" />;
    case "xls":
    case "xlsx":
      return <FileSpreadsheet className="w-8 h-8 text-green-500" />;
    case "zip":
    case "rar":
      return <FileArchive className="w-8 h-8 text-yellow-500" />;
    default:
      return <File className="w-8 h-8 text-muted-foreground" />;
  }
}

function getReferencePreview(ref: any) {
  if (!ref) return "";

  switch (ref.messageType) {
    case "text":
      return ref.message;
    case "image":
      return "[รูปภาพ]";
    case "sticker":
      return "[สติ๊กเกอร์]";
    case "file":
      return "[ไฟล์แนบ]";
    case "audio":
      return "[เสียง]";
    case "video":
      return "[วิดีโอ]";
    default:
      return "[ข้อความ]";
  }
}

function ReplyReference({ refMsg }: { refMsg: any }) {
  if (!refMsg) return null;

  const preview = getReferencePreview(refMsg);

  return (
    <div className="min-w-[180px] bg-white/30 px-3 py-2 border-b border-black/10 rounded-t-xl">
      <div className="flex items-center gap-2">
        <img
          src={refMsg.imageUrl || "/avatar.png"}
          className="w-6 h-6 rounded-full object-cover"
        />
        <span className="text-sm font-semibold text-primary">
          {refMsg.sender || "ผู้ส่งเดิม"}
        </span>
      </div>

      <div className="text-xs text-muted-foreground mt-1">
        {refMsg.messageType === "text" ? "ข้อความ" : refMsg.messageType}
      </div>

      <div className="text-sm mt-1 line-clamp-1">{preview}</div>
    </div>
  );
}

export function MessageRenderer({
  allMessages,
  onlyShow = false,
  msg,
  isBackoffice,
  setPreviewUrl,

  playing,
  setPlaying,
  currentTime,
  setCurrentTime,
  duration,
  setDuration,
  audioRef,
  togglePlay,
}: {
  allMessages?: any[];
  onlyShow?: boolean;
  msg: any;
  isBackoffice: boolean;
  setPreviewUrl?: (url: string) => void;

  playing?: boolean;
  setPlaying?: (b: boolean) => void;
  currentTime?: number;
  setCurrentTime?: (n: number) => void;
  duration?: number;
  setDuration?: (n: number) => void;
  audioRef?: any;
  togglePlay?: () => void;
}) {
  const message = msg?.message ?? "";
  const type = msg?.messageType;
  const isLabel = msg?.isLabel;
  const reference = msg?.messageReference;

  const {
    address = "",
    latitude = "",
    longitude = "",
    title = "",
  } = (msg && msg.contents) || {};

  const { category = "", items = {}, name = "" } = (msg && msg.contents) || {};

  // LABEL
  if (isLabel) {
    const formattedTime = formatShowTime(
      msg.createdAt ? msg.createdAt : msg.timestamp
    );

    return (
      <div className="flex w-full justify-center align-center whitespace-pre-wrap">
        <div className="flex flex-col items-center bg-muted text-primary rounded-full px-5 py-1 text-sm">
          <span className="text-[12px] text-muted-foreground mt-1">
            {formattedTime}
          </span>
          <span className="text-[12px] font-bold">{message}</span>
        </div>
      </div>
    );
  }

  // WRAPPER (รองรับ Reply Reference)
  // WRAPPER: เพิ่ม max-width และลบพื้นหลังเวลาเป็น image/sticker
  const Wrapper = ({ children, maxWidth, fullBleed }: any) => {
    const isMedia = [
      ChatItem.IMAGE,
      ChatItem.STICKER,
      ChatItem.CAROUSEL,
    ].includes(msg?.messageType);

    return (
      <div
        className={`
    rounded-xl
    overflow-hidden
    ${onlyShow ? "" : isMedia ? "" : isBackoffice ? "bg-blue-500/10" : "bg-muted-foreground/10"}
    ${fullBleed ? "max-w-none" : (maxWidth ?? "")}
    break-words
  `}
      >
        {reference && <ReplyReference refMsg={reference} />}
        <div
          className={`${isMedia ? "p-0" : "px-4 py-2"} break-words whitespace-pre-wrap`}
        >
          {children}
        </div>
      </div>
    );
  };

  // TEXT
  if (type === ChatItem.TEXT || type === null) {
    return (
      <Wrapper maxWidth="max-w-[500px]">
        <MessageText text={String(message)} />
      </Wrapper>
    );
  }

  if (type === ChatItem.QUICK_REPLY) {
    const lastMessage =
      Array.isArray(allMessages) && allMessages.length > 0
        ? allMessages[allMessages.length - 1]
        : null;

    const textContent = Array.isArray(lastMessage?.contents?.items)
      ? lastMessage.contents.items
      : [];

    const isLastMessage = lastMessage?.id === msg?.id;

    return (
      <>
        <Wrapper>
          <MessageText text={String(message)} />
        </Wrapper>

        {isLastMessage && (
          <div className="flex w-full flex-col">
            <div className="flex flex-row gap-4 mt-4 ml-0 lg:ml-20">
              {textContent.map((p: any, idx: number) => (
                <div
                  key={idx}
                  className="max-w-[100%] rounded-2xl bg-white shadow p-1.5 px-3 text-sm leading-6"
                >
                  <div className="flex flex-row gap-2">
                    {p?.imageUrl && (
                      <img
                        src={p.imageUrl}
                        alt="logo"
                        className="w-6 h-6 object-cover rounded-full"
                      />
                    )}
                    <span>{p?.action?.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </>
    );
  }

  // STICKER
  if (type === ChatItem.STICKER) {
    return (
      <Wrapper>
        <img
          src={message}
          className="rounded-xl max-w-[180px] h-auto object-contain"
        />
      </Wrapper>
    );
  }

  // FILE
  if (type === ChatItem.FILE) {
    const filename = message.split("/").pop() ?? "ไฟล์แนบ";
    return (
      <Wrapper>
        <div
          className="flex items-center gap-3 bg-white/40 p-3 rounded-xl cursor-pointer hover:bg-white/70"
          onClick={() => window.open(message, "_blank")}
        >
          {getFileIcon(filename)}
          <div className="flex flex-col">
            <span className="text-sm font-medium">{filename}</span>
            <span className="text-xs text-muted-foreground">
              แตะเพื่อเปิดไฟล์
            </span>
          </div>
        </div>
      </Wrapper>
    );
  }

  // IMAGE
  if (type === ChatItem.IMAGE) {
    return (
      <Wrapper>
        <div
          onClick={() => setPreviewUrl?.(message)}
          className="cursor-pointer"
        >
          <img
            src={message}
            onLoad={() => {
              window.dispatchEvent(new Event("chat-media-loaded"));
            }}
            className="
            rounded-xl 
            object-cover 
            max-w-[260px] 
          "
          />
        </div>
      </Wrapper>
    );
  }

  // VIDEO
  if (type === ChatItem.VIDEO) {
    return (
      <Wrapper>
        <div
          className="relative cursor-pointer"
          onClick={() => {
            const videoEl = document.createElement("video");
            videoEl.src = message;
            videoEl.autoplay = true;
            videoEl.controls = true;
            videoEl.style.width = "100%";
            videoEl.style.height = "100%";

            videoEl.onloadedmetadata = async () => {
              document.body.appendChild(videoEl);
              try {
                if (videoEl.requestFullscreen) {
                  await videoEl.requestFullscreen();
                }
                await videoEl.play();
              } catch (_) {
                videoEl.play();
              }

              videoEl.onfullscreenchange = () => {
                if (!document.fullscreenElement) {
                  videoEl.pause();
                  videoEl.remove();
                }
              };
            };
          }}
        >
          <video
            src={message}
            width={200}
            height={200}
            className="rounded-lg"
            muted
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-black/60 rounded-full p-3">
              <Play className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }

  // AUDIO
  if (type === ChatItem.AUDIO) {
    return (
      <Wrapper>
        <div
          className="flex items-center gap-3 bg-white/40 px-3 py-2 rounded-xl cursor-pointer"
          onClick={togglePlay}
        >
          <AudioLines className="w-6 h-6 text-primary" />
          <span className="font-medium text-sm">
            {playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
          </span>
          <span className="text-xs font-medium ml-2">
            {formatTime(currentTime || 0)} / {formatTime(duration || 0)}
          </span>

          <audio
            ref={audioRef}
            src={message}
            preload="auto"
            onLoadedMetadata={() => {
              if (!audioRef.current) return;
              setDuration?.(audioRef.current.duration);
            }}
            onTimeUpdate={() => {
              if (!audioRef.current) return;
              setCurrentTime?.(audioRef.current.currentTime);
            }}
            onEnded={() => {
              setPlaying?.(false);
              setCurrentTime?.(0);
            }}
          />
        </div>
      </Wrapper>
    );
  }

  if (type === ChatItem.LOCATION) {
    const mapUrl = `https://www.google.com/maps?q=${latitude ?? ""},${longitude ?? ""}&z=17`;

    const lat = latitude ? Number(latitude) : undefined;
    const lng = longitude ? Number(longitude) : undefined;

    return (
      <Wrapper maxWidth="max-w-[330px] ">
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block cursor-pointer"
        >
          <LocationMap latitude={lat} longitude={lng} />;
          <div className="py-2 mt-0.5">
            <div className="truncate text-sm font-semibold">{title ?? ""}</div>
            <div className="mt-1 text-xs leading-snug text-neutral-400">
              <span className="truncate block w-full">{address ?? ""}</span>
            </div>
          </div>
        </a>
      </Wrapper>
    );
  }

  if (type === ChatItem.CAROUSEL) {
    switch (category) {
      case FlexMessageType.PRODUCT:
        return (
          <Wrapper maxWidth="w-full">
            <div className="flex justify-end max-w-full px-4">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory p-3">
                {items.map((items: any, index: string) => (
                  <FlexMessageProductRender key={index} items={items} />
                ))}
              </div>
            </div>
          </Wrapper>
        );

      case FlexMessageType.PLACE:
        return (
          <Wrapper maxWidth="max-w-[80vh]">
            <div className="flex justify-end max-w-full px-4 wrap">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory p-3">
                {items.map((items: any, index: string) => (
                  <FlexMessagePlaceRender key={index} items={items} />
                ))}
              </div>
            </div>
          </Wrapper>
        );

      case FlexMessageType.PERSON:
        return (
          <Wrapper maxWidth="max-w-[80vh]">
            <div className="flex justify-end max-w-full px-4">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory p-3">
                {items.map((items: any, index: string) => (
                  <FlexMessagePersonRender key={index} items={items} />
                ))}
              </div>
            </div>
          </Wrapper>
        );

      case FlexMessageType.IMAGE:
        return (
          <Wrapper maxWidth="max-w-[400px]">
            <div className="max-w-full px-4">
              <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory p-3">
                {items.map((items: any, index: string) => (
                  <FlexMessageImageRender key={index} items={items} />
                ))}
              </div>
            </div>
          </Wrapper>
        );

      default:
        break;
    }
  }

  // FALLBACK
  return (
    <Wrapper>
      <span className="text-[16px] text-muted-foreground mt-1">
        ระบบยังไม่รองรับการส่งแบบ Location
      </span>
    </Wrapper>
  );
}

export const MemoMessageRenderer = React.memo(MessageRenderer, (prev, next) => {
  return prev.msg === next.msg;
});
