import React from 'react';
import { Input } from '@/components/ui/input';
import { uploadFile } from '@/pages/api/upload/upload';
import Image from 'next/image';
import * as Icons from 'lucide-react';

interface UploadProps {
  imageUrl: string | null;
  onUpload: (url: string) => void;
  className?: string;
}
export const Upload: React.FC<UploadProps> = ({
  onUpload,
  className,
  imageUrl,
}) => {
  const fileInuptRef = React.useRef<HTMLInputElement>(null);
  const [fileUpload, setFileUpload] = React.useState(false);
  const [imgUrl, setImgUrl] = React.useState([]) as any;

  // const handleFileChange = async (e: any) => {
  //   const file = e.target.files?.[0] as File;

  //   setFileUpload(true);

  //   const data = new FormData();
  //   data.set('file', file);
  //   console.log(file);

  //   await uploadFile({}, data);

  //   try {
  //     const result = await uploadFile({}, data);

  //     setImgUrl(...imgUrl, result.url);

  //     onUpload(result.url);
  //   } finally {
  //     setFileUpload(false);
  //   }
  // };

  return (
    <>
      <div
        onClick={() => {
          fileInuptRef.current?.click();
        }}
        className={`flex flex-warp p-2 w-[100px] border-dashed border-1 border-gray-400 h-auto rounded-md hover:scale-110 cursor-pointer ${className}`}
      >
        {imageUrl ? (
          <Image
            className="flex flex-warp cursor-pointer rounded-md"
            src={imageUrl}
            alt="img"
            width={100}
            height={100}
          />
        ) : (
          <>
            {!imgUrl?.length && (
              <div className="text-sm p-2 cursor-pointer opacity-50 text-center rounded-md">
                <div className="flex justify-center">
                  <Icons.ImageUp />
                </div>
                <div className="mt-2">
                  <span>เพิ่มรูปภาพ</span>
                </div>
              </div>
            )}

            {imgUrl?.map((url: any) => (
              <div key={url} className="relative">
                <Image
                  className="rounded-md"
                  src={url}
                  alt="img"
                  width={100}
                  height={100}
                />
              </div>
            ))}
          </>
        )}
      </div>

      <Input
        type="file"
        disabled={fileUpload}
        ref={fileInuptRef}
        className="hidden"
        onChange={async (e) => {
          const file = e.target.files?.[0] as File;

          setFileUpload(true);

          const data = new FormData();
          data.set('file', file);
          console.log(file);

          await uploadFile({}, data);

          try {
            const result = await uploadFile({}, data);

            setImgUrl([...imgUrl, result.url]);

            onUpload(result.url);
          } finally {
            setFileUpload(false);
          }
        }}
      />
    </>
  );
};
