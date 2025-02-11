import React from 'react';
import { Input } from '@/components/ui/input';
// import { uploadFile } from '@/pages/api/upload/upload';

export const Upload = () => {
  const fileInuptRef = React.useRef<HTMLInputElement>(null);
  return (
    <>
      {/* <Input
          type="file"
          onChange={async (e) => {
            const file = e.target.files?.[0] as File;

            const data = new FormData();
            data.set('file', file);

            const res = await uploadFile({}, data);
            console.log('res', res);
          }}
        /> */}

      <Input
        type="file"
        ref={fileInuptRef}
        className="absolute right-[9999px]"
      />

      <div className="" onClick={() => fileInuptRef.current?.click()}>
        Upload Image
      </div>
    </>
  );
};
