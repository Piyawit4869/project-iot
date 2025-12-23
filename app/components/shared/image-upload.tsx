"use client";

import React from "react";

import * as Icons from "lucide-react";
import { useId } from "react";

import { GlobalImage } from "./global-image";
import { useUpload } from "~/api/client/useGetUpload";
import { cn } from "~/lib/utils";

type ImageUploadProps = {
  value: string | null | undefined;
  onChange: (url: string) => void;
  width?: number;
  height?: number;
  className?: string;
  disabled?: boolean;
  hideRemoveWhenDisabled?: boolean;
};

export default function ImageUpload({
  value,
  onChange,
  width = 80,
  height = 80,
  className,
  disabled = false,
  hideRemoveWhenDisabled = true,
}: ImageUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const inputId = useId();
  const { mutate } = useUpload();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return; // กันทุกเคส
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    mutate(formData, {
      onSuccess: (data) => {
        onChange(data.url);
      },
      onError: () => {},
    });
  };

  const canRemove = Boolean(value) && (!disabled || !hideRemoveWhenDisabled);

  return (
    <div
      className={cn(
        "flex flex-col justify-center w-full gap-4 mt-5",
        className
      )}
      aria-disabled={disabled}
    >
      {!value ? (
        // กล่องอัปโหลด: ถ้า disabled ให้ปิด pointer และเอา htmlFor ออก
        <label
          {...(!disabled ? { htmlFor: inputId } : {})}
          className={cn(
            "flex flex-col items-center justify-center border border-dashed rounded-lg w-28 h-28 text-sm",
            disabled
              ? "cursor-not-allowed border-muted-foreground/20 text-muted-foreground/60 bg-muted/20 pointer-events-none"
              : "cursor-pointer border-gray-300 text-gray-600 hover:border-blue-400 hover:bg-border transition"
          )}
          tabIndex={disabled ? -1 : 0}
        >
          <span className="text-2xl leading-none">+</span>
          <span className="mt-1">
            {disabled ? "Upload ปิดใช้งาน" : "Upload"}
          </span>
        </label>
      ) : (
        <div
          className={cn(
            "relative w-fit flex justify-center",
            disabled && "pointer-events-none select-none"
          )}
        >
          <GlobalImage
            src={value}
            alt="Image"
            className="rounded-xl border"
            width={width}
            height={height}
          />
          {canRemove && (
            <button
              type="button"
              onClick={() => !disabled && onChange("")}
              className={cn(
                "absolute -top-2 -right-2 rounded-full p-1 shadow transition",
                disabled
                  ? "bg-muted text-muted-foreground/70 border-muted-foreground/20 cursor-not-allowed"
                  : "bg-white border-gray-300 hover:bg-gray-100"
              )}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : 0}
            >
              <Icons.X className="w-4 h-4" />
            </button>
          )}
        </div>
      )}

      <input
        id={inputId}
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        disabled={disabled} // ✅ ปิด input
      />
    </div>
  );
}
