"use client";

import React from "react";
import { cn } from "@/libs/utils";
import * as Icons from "lucide-react";
import { useId } from "react";
import { useUpload } from "@/actions/upload/client/useGetUpload";
import { GlobalImage } from "./global-image";

type ImageUploadMultiProps = {
  value: string[];
  onChange: (urls: string[]) => void;
  max?: number;
  tileSize?: number;
  className?: string;
};

export default function ImageUploadMulti({
  value,
  onChange,
  max,
  tileSize = 112, // 28 * 4
  className,
}: ImageUploadMultiProps) {
  const inputId = useId();
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { mutate } = useUpload();

  const canAddMore = typeof max === "number" ? value.length < max : true;
  const sizeStyle: React.CSSProperties = { width: tileSize, height: tileSize };

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;

    files.forEach((file) => {
      const formData = new FormData();
      formData.append("file", file);

      mutate(formData, {
        onSuccess: (data: any) => {
          const url = data?.url as string;
          if (!url) return;
          onChange([...value, url]);
        },
        onError: (e) => {
          console.debug({ e });
        },
      });
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleRemove = (idx: number) => {
    const next = value.filter((_, i) => i !== idx);
    onChange(next);
  };

  // preview ด้วย state ง่ายๆ
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  return (
    <div className={cn("flex flex-col gap-3 mt-5", className)}>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(112px,1fr))] gap-2">
        {value.map((url, idx) => (
          <div
            key={url + idx}
            className="relative rounded-lg overflow-hidden border"
            style={sizeStyle}
          >
            <GlobalImage
              src={url}
              alt={`image-${idx + 1}`}
              className="object-cover w-full h-full"
              width={tileSize}
              height={tileSize}
            />

            <div className="absolute inset-0 flex items-end justify-start gap-2 p-2 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition">
              <button
                type="button"
                onClick={() => setPreviewUrl(url)}
                className="inline-flex items-center justify-center rounded-md bg-white/90 text-gray-800 p-1"
                aria-label="ดูรูป"
                title="ดูรูป"
              >
                <Icons.Eye className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleRemove(idx)}
                className="inline-flex items-center justify-center rounded-md bg-white/90 text-gray-800 p-1"
                aria-label="ลบรูป"
                title="ลบรูป"
              >
                <Icons.Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}

        {canAddMore && (
          <label
            htmlFor={inputId}
            className={cn(
              "flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-border transition text-sm text-gray-600"
            )}
            style={sizeStyle}
          >
            <span className="text-2xl leading-none">+</span>
            <span className="mt-1">Upload</span>
          </label>
        )}
      </div>

      <input
        id={inputId}
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFilesChange}
      />

      {previewUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setPreviewUrl(null)}
        >
          <div
            className="relative bg-white rounded-lg overflow-hidden max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 bg-white/90 rounded-full p-1 border"
              onClick={() => setPreviewUrl(null)}
              aria-label="ปิด"
            >
              <Icons.X className="w-5 h-5" />
            </button>
            <GlobalImage
              src={previewUrl}
              alt="preview"
              className="w-full h-auto"
              width={1200}
              height={800}
            />
          </div>
        </div>
      )}
    </div>
  );
}
