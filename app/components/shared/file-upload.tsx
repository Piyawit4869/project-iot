"use client";

import React, { useId, useMemo } from "react";
import * as Icons from "lucide-react";
import { cn } from "@/libs/utils";
import { useUpload } from "@/actions/upload/client/useGetUpload";
import { toast } from "sonner";
import { Skeleton } from "../ui";

export type UploadedFile = {
  url: string;
  fileName: string;
  size: number; // bytes
  mimeType: string; // e.g. application/pdf
  extension?: string; // e.g. pdf, docx, xlsx
  storageProvider?: string;
  checksum?: string;
  width?: number; // เฉพาะรูปภาพ
  height?: number; // เฉพาะรูปภาพ
};

type FileUploadProps = {
  value: any;
  onChange: (file: UploadedFile | UploadedFile[] | null) => void;
  multiple?: boolean;
  /** จำกัดขนาดไฟล์ (bytes), เช่น 10 * 1024 * 1024 = 10MB */
  maxSize?: number;
  accept?: string;
  className?: string;
  previewImage?: boolean;
};

const DEFAULT_ACCEPT = [
  "image/*",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/csv",
].join(",");

const FileItemSkeleton = () => {
  return (
    <li className="flex items-center gap-3 p-3">
      {/* Icon / Image */}
      <Skeleton className="w-12 h-12 rounded-md" />

      {/* File name + meta */}
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-1/2 rounded" />
        <Skeleton className="h-3 w-1/3 rounded" />
      </div>

      {/* Remove button placeholder */}
      <Skeleton className="w-8 h-8 rounded-md" />
    </li>
  );
};

function bytesToSize(bytes: number) {
  if (!bytes && bytes !== 0) return "-";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
}

function extFromName(name?: string) {
  if (!name) return undefined;
  const idx = name.lastIndexOf(".");
  return idx >= 0 ? name.slice(idx + 1).toLowerCase() : undefined;
}

function pickIcon(mime: string, ext?: string) {
  const e = (ext || "").toLowerCase();
  if (mime?.startsWith("image/")) return Icons.Image;
  if (mime === "application/pdf" || e === "pdf") return Icons.FileText;
  if (mime?.includes("word") || e === "doc" || e === "docx")
    return Icons.FileType;
  if (mime?.includes("excel") || e === "xls" || e === "xlsx" || e === "csv")
    return Icons.Sheet;
  if (mime?.includes("powerpoint") || e === "ppt" || e === "pptx")
    return Icons.Presentation;
  return Icons.File;
}

async function readImageDimension(file: File) {
  return new Promise<Pick<UploadedFile, "width" | "height">>((resolve) => {
    try {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
        URL.revokeObjectURL(url);
      };
      img.onerror = () => resolve({});
      img.src = url;
    } catch {
      resolve({});
    }
  });
}

export default function FileUpload({
  value,
  onChange,
  multiple = false,
  maxSize = 20 * 1024 * 1024, // 20MB
  accept = DEFAULT_ACCEPT,
  className,
  previewImage = true,
}: FileUploadProps) {
  const inputId = useId();
  const { mutate, isPending } = useUpload();

  const files: UploadedFile[] = useMemo(() => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const handleFiles = async (picked: FileList | null) => {
    if (!picked || picked.length === 0) return;

    const toArray = Array.from(picked);

    for (const file of toArray) {
      if (maxSize && file.size > maxSize) {
        toast.error(`ไฟล์มีขนาดเกินกว่ากำหนด (${maxSize}) กรุณาเปลี่ยนไฟล์`);

        continue;
      }

      const dims =
        previewImage && file.type.startsWith("image/")
          ? await readImageDimension(file)
          : {};

      const formData = new FormData();
      formData.append("file", file);

      await new Promise<void>((resolve) => {
        mutate(formData, {
          onSuccess: (data: any) => {
            const uploaded: UploadedFile = {
              url: data?.url ?? "",
              fileName: data?.fileName ?? file.name,
              size: typeof data?.size === "number" ? data.size : file.size,
              mimeType: data?.mimeType ?? file.type,
              extension: data?.extension ?? extFromName(file.name),
              storageProvider: data?.storageProvider,
              checksum: data?.checksum,
              ...(dims ?? {}),
            };

            if (multiple) {
              const next = [...files, uploaded];
              onChange(next);
            } else {
              onChange(uploaded);
            }
            resolve();
          },
          onError: () => {
            // ที่นี่คุณอาจจะเพิ่ม toast แจ้งอัปโหลดล้มเหลว
            resolve();
          },
        });
      });
    }
  };

  const removeAt = (idx: number) => {
    if (!multiple) {
      onChange(null);
      return;
    }
    const next = files.filter((_, i) => i !== idx);
    onChange(next.length ? next : null);
  };

  const clearAll = () => onChange(multiple ? [] : null);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-2">
        {/* <label
          htmlFor={inputId}
          className={cn(
            "inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm cursor-pointer hover:bg-gray-50",
            isPending && "bg-gray-200 hover:bg-gray-200 cursor-none"
          )}
        >
          <Icons.Upload className="w-4 h-4 mr-2" />
          {multiple ? "เลือกไฟล์" : "เลือกไฟล์"}
        </label> */}

        <label
          htmlFor={inputId}
          className={cn(
            "inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm transition",
            isPending
              ? "bg-gray-50 text-gray-400 cursor-not-allowed"
              : "cursor-pointer hover:bg-gray-50"
          )}
        >
          {isPending ? (
            <Icons.Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Icons.Upload className="w-4 h-4 mr-2" />
          )}
          {multiple ? "เลือกไฟล์" : "เลือกไฟล์"}
        </label>

        {multiple && files.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
          >
            <Icons.Trash2 className="w-4 h-4 mr-2" />
            เคลียร์ทั้งหมด
          </button>
        )}
      </div>

      <input
        id={inputId}
        type="file"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={(e) => {
          const input = e.target;
          void handleFiles(input.files);
          // ให้สามารถเลือกไฟล์ซ้ำชื่อเดิมได้
          input.value = "";
        }}
        disabled={isPending}
      />

      {isPending ? (
        files.map((_, idx) => <FileItemSkeleton key={idx} />)
      ) : (
        <>
          {files.length === 0 ? (
            <div className="border border-dashed rounded-lg p-4 text-sm text-muted-foreground">
              รองรับ: รูปภาพ, PDF, Word, Excel, PowerPoint, CSV — สูงสุด{" "}
              {bytesToSize(maxSize)}
            </div>
          ) : (
            <ul className="divide-y rounded-lg border">
              {files.map((f, idx) => {
                const Icon = pickIcon(f.mimeType, f.extension);
                const isImage = f?.mimeType?.startsWith("image/");
                return (
                  <li
                    key={`${f.url}-${idx}`}
                    className="flex items-center gap-3 p-3"
                  >
                    <div className="shrink-0">
                      {isImage && previewImage ? (
                        // ใช้ <img> ตรง ๆ ได้; ถ้าคุณมี GlobalImage ก็สลับได้
                        <img
                          src={f.url}
                          alt={f.fileName}
                          className="w-12 h-12 object-cover rounded-md border"
                        />
                      ) : (
                        <div className="w-12 h-12 flex items-center justify-center rounded-md border">
                          <Icon className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium truncate">
                        {f.fileName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {f.mimeType} • {bytesToSize(f.size)}
                        {f.extension ? ` • .${f.extension}` : ""}
                        {isImage && f.width && f.height
                          ? ` • ${f.width}×${f.height}px`
                          : ""}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeAt(idx)}
                      className="inline-flex items-center justify-center rounded-md border px-2 py-1 text-xs hover:bg-gray-50"
                      aria-label="remove file"
                    >
                      <Icons.X className="w-4 h-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
