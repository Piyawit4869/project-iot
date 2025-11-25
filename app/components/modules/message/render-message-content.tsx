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
} from "lucide-react";

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
  const Wrapper = ({ children }: any) => {
    const isMedia = ["image", "sticker"].includes(msg?.messageType);
    const hasRef = !!reference;

    return (
      <div
        className={`
        rounded-xl overflow-hidden 
        ${onlyShow ? "" : isMedia ? "" : isBackoffice ? "bg-blue-500/10" : "bg-muted-foreground/10"}
        ${hasRef ? "max-w-[260px]" : "max-w-[220px]"} 
      `}
      >
        {reference && <ReplyReference refMsg={reference} />}
        <div className={`${isMedia ? "p-0" : "px-4 py-2"}`}>{children}</div>
      </div>
    );
  };

  // TEXT
  if (type === "text" || type === null) {
    return (
      <Wrapper>
        <MessageText text={String(message)} />
      </Wrapper>
    );
  }

  // STICKER
  if (type === "sticker") {
    return (
      <Wrapper>
        <img
          src={message}
          className="rounded-xl max-w-[220px] h-auto object-contain"
        />
      </Wrapper>
    );
  }

  // FILE
  if (type === "file") {
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
  if (type === "image") {
    return (
      <Wrapper>
        <div
          onClick={() => setPreviewUrl?.(message)}
          className="cursor-pointer"
        >
          <img
            src={message}
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
  if (type === "video") {
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
  if (type === "audio") {
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

  // FALLBACK
  return (
    <Wrapper>
      <span className="text-[16px] text-muted-foreground mt-1">
        ระบบยังไม่รองรับการส่งแบบ Location
      </span>
    </Wrapper>
  );
}
