"use client";

import Image from "next/image";
import { useState } from "react";
import { Upload } from "lucide-react";
import { useUpload } from "@/actions/upload/client/useGetUpload";

type ImageProps = {
  value: string;
  onChange: (url: string) => void;
};

export default function ImageUpload({ value, onChange }: ImageProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const { mutate } = useUpload();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    mutate(formData, {
      onSuccess: (data) => {
        console.log("✅ Created successfully:", data);
        onChange(data.res.url);
      },
      onError: (err) => {
        console.error("❌ Failed to create:", err);
      },
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-2">
      {value && (
        <Image
          src={value}
          alt="Preview"
          className="rounded-xl max-w-full h-auto border"
          width={200}
          height={200}
        />
      )}

      {!value && preview && (
        <Image
          src={preview}
          alt="Preview"
          className="rounded-xl max-w-full h-auto border"
          width={200}
          height={200}
        />
      )}

      <label
        htmlFor="file-upload"
        className="cursor-pointer flex items-center gap-2 px-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
      >
        <Upload className="w-4 h-4" />
        Upload Image
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
