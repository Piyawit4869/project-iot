"use client";

import Image from "next/image";
import { useState } from "react";
import { Upload } from "lucide-react";

type Props = {
  onUpload?: (flie: File) => void;
};

export default function ImageUpload({ onUpload }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onUpload?.(file);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 mt-4 border rounded-xl shadow-md max-w-md mx-auto">
      {preview && (
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
        className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
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
