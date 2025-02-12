import React from 'react';
import { Input } from '@/components/ui/input';
import { uploadFile } from '@/pages/api/upload/upload';
import Image from 'next/image';

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

  React.useEffect(() => {
    setImgUrl(imageUrl);
  }, [imageUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  return (
    <>
      <div
        onClick={() => {
          fileInuptRef.current?.click();
        }}
        className={`flex flex-warp p-2 bg-gray-200 w-[100px] h-auto rounded-md hover:scale-110 cursor-pointer ${className}`}
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
              <div className="text-sm flex items-center p-2 cursor-pointer opacity-50 text-center">
                <span>เพิ่มรูปภาพ</span>
              </div>
            )}

            {/* {imgUrl?.map((url: any) => (
              <div key={url} className="relative">
                <Image
                  className="rounded-md"
                  src={url}
                  alt="img"
                  width={100}
                  height={100}
                />
              </div>
            ))} */}
          </>
        )}
      </div>

      <Input
        type="file"
        disabled={fileUpload}
        ref={fileInuptRef}
        className="hidden"
        onChange={handleFileChange}
      />
    </>
  );
};
