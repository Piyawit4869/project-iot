import React from 'react';
import { Input } from '@/components/ui/input';
import { uploadFile } from '@/pages/api/upload/upload';
import Image from 'next/image';
import * as Icons from 'lucide-react';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/react';
import { updateUser } from '@/pages/api/user/update';
import { useParams } from 'next/navigation';

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
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const params = useParams<{ slug: string }>();

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

  const { onOpenChange: onOpenChange } = useDisclosure();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
      setModalVisible(true);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setFileUpload(true);
    const data = new FormData();
    data.append('file', selectedFile);

    try {
      const result = await uploadFile({}, data);
      if (result.url) {
        setImgUrl((prevUrl: any) => [...prevUrl, result.url]);
        onUpload(result.url);
      }

      const payload = {
        profile: {
          photoUrl: result.url,
        },
      };

      await updateUser({}, payload, params?.slug);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setFileUpload(false);
      setModalVisible(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <div
        onClick={() => {
          fileInuptRef.current?.click();
        }}
        className={`flex flex-warp p-2 w-[100px] border-dashed border-1 border-gray-400 h-[100px] rounded-md hover:scale-110 cursor-pointer ${className}`}
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
        // onChange={async (e) => {
        //   const file = e.target.files?.[0] as File;

        //   setFileUpload(true);

        //   const data = new FormData();
        //   data.set('file', file);
        //   console.log(file);

        //   await uploadFile({}, data);

        //   try {
        //     const result = await uploadFile({}, data);

        //     setImgUrl([...imgUrl, result.url]);

        //     onUpload(result.url);
        //   } finally {
        //     setFileUpload(false);
        //   }
        // }}
        onChange={handleFileChange}
      />

      <Modal
        size="xl"
        className="height-500"
        isOpen={modalVisible}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                ยืนยันรูปภาพ
              </ModalHeader>
              <ModalBody>
                {previewImage && (
                  <Image
                    alt="Preview"
                    style={{ width: '100%' }}
                    className="rounded-md"
                    src={previewImage}
                    width={150}
                    height={150}
                  />
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  className="bg-accent1 text-white"
                  form="create-address"
                  onClick={handleUpload}
                >
                  ยืนยัน
                </Button>
                <Button
                  className="bg-accent2 text-white"
                  form="create-address"
                  onClick={closeModal}
                >
                  ยกเลิก
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
