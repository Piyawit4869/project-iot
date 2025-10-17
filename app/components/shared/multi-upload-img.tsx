import Image from "next/image";
import { useState } from "react";
import { Upload } from "lucide-react";
import { useUpload } from "@/actions/upload/client/useGetUpload";

type MultiImageUploadProps = {
  value: string[];
  onChange: (urls: string[]) => void;
};

export default function MultiImageUpload({
  value,
  onChange,
}: MultiImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([]);
  const { mutate } = useUpload();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const previewUrls = fileArray.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);

    fileArray.forEach((file) => {
      const formData = new FormData();
      formData.append("file", file);

      mutate(formData, {
        onSuccess: (data) => {
          onChange([...value, data.res.url]);
        },
        onError: () => {},
      });
    });
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-2">
      <div className="flex gap-2 flex-wrap">
        {[...value, ...previews].map((url, i) => (
          <Image
            loader={({ src }) => src}
            key={i}
            src={url}
            alt={`Uploaded image ${i + 1}`}
            className="rounded-lg border"
            width={150}
            height={150}
          />
        ))}
      </div>

      <label
        htmlFor="upload-multi"
        className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
      >
        <Upload className="w-4 h-4" />
        Upload Images
        <input
          id="upload-multi"
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleChange}
        />
      </label>
    </div>
  );
}
