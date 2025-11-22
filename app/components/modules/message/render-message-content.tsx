import { formatShowTime } from "~/components/shared/global-format";
import { MessageText } from "./message-text";
import { Play, PauseIcon, AudioLines } from "lucide-react";

import {
  FileText,
  FileType,
  FileSpreadsheet,
  FileArchive,
  File,
  PlayIcon,
} from "lucide-react";

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

const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

export function MessageRenderer({
  msg,
  isBackoffice,
  setPreviewUrl,

  // AUDIO STATES
  playing,
  setPlaying,
  currentTime,
  setCurrentTime,
  duration,
  setDuration,
  audioRef,
  togglePlay,
}: {
  msg: any;
  isBackoffice: boolean;
  setPreviewUrl: (url: string) => void;

  playing: boolean;
  setPlaying: (b: boolean) => void;
  currentTime: number;
  setCurrentTime: (n: number) => void;
  duration: number;
  setDuration: (n: number) => void;
  audioRef: any;
  togglePlay: () => void;
}) {
  const message = msg?.message ?? "";
  const type = msg?.messageType;
  const isLabel = msg?.isLabel;

  // LABEL MESSAGE
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

  // TEXT
  if (type === "text" || type === null) {
    return (
      <div
        className={`rounded-xl px-4 py-2 text-sm whitespace-pre-wrap ${
          isBackoffice ? "bg-blue-500 text-white" : "bg-muted text-primary"
        }`}
      >
        <MessageText text={String(message)} />
      </div>
    );
  }

  // STICKER
  if (type === "sticker") {
    return <img src={message} width={150} height={150} />;
  }

  // FILE (PDF/DOC/ZIP)
  if (type === "file") {
    const filename = message.split("/").pop() ?? "ไฟล์แนบ";

    return (
      <div
        className="flex items-center gap-3 bg-muted p-3 rounded-xl cursor-pointer hover:bg-muted/70"
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
    );
  }

  // IMAGE
  if (type === "image") {
    return (
      <div onClick={() => setPreviewUrl(message)} className="cursor-pointer">
        <img
          src={message}
          width={180}
          height={180}
          className="rounded-md object-cover"
        />
      </div>
    );
  }

  // VIDEO
  if (type === "video") {
    return (
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
    );
  }

  // AUDIO
  if (type === "audio") {
    return (
      <div
        className="flex items-center gap-3 bg-muted px-3 py-2 rounded-xl cursor-pointer"
        onClick={togglePlay}
      >
        <AudioLines className="w-6 h-6 text-primary" />

        <span className="font-medium text-sm">
          {playing ? <PauseIcon size={14} /> : <PlayIcon size={14} />}
        </span>

        <span className="text-xs font-medium ml-2">
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>

        <audio
          ref={audioRef}
          src={message}
          preload="auto"
          onLoadedMetadata={() => {
            if (!audioRef.current) return;
            setDuration(audioRef.current.duration);
          }}
          onTimeUpdate={() => {
            if (!audioRef.current) return;
            setCurrentTime(audioRef.current.currentTime);
          }}
          onEnded={() => {
            setPlaying(false);
            setCurrentTime(0);
          }}
        />
      </div>
    );
  }

  // FALLBACK
  return (
    <span className="text-[16px] text-muted-foreground mt-1">
      ระบบยังไม่รองรับการส่งแบบ Location
    </span>
  );
}
