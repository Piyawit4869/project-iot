import * as React from 'react';
import { Form, Upload, UploadProps, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList ? e.fileList : [];
};

interface FormInterface {
  form: any;
  name: string;
  disabled?: boolean;
  label?: string;
}

export const UploadFiles: React.FC<FormInterface> = (props: FormInterface) => {
  const { form, name, disabled, label } = props;
  const file = Form.useWatch(name ? name : 'file', form);

  const [fileList, setFileList] = React.useState<any[]>(file || []);

  const uploadProps: UploadProps = {
    fileList: fileList,
    disabled: disabled,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
    multiple: false,
    maxCount: 1,
    action: `${baseURL}api/upload`,
    listType: 'picture-card',
    accept: `image/*`,
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
        setFileList((prev: any) => [...prev, info.file]);
      } else if (info.file.status === 'removed') {
        // Handle file removal here
        setFileList((prev: any) =>
          prev.filter((file: any) => file.uid !== info.file.uid),
        );
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Form.Item
      label={label}
      name={'file'}
      valuePropName="fileList"
      getValueFromEvent={normFile}
      initialValue={fileList}
    >
      {file && file.length ? (
        <Upload {...uploadProps}>{null}</Upload>
      ) : (
        <Upload {...uploadProps}>{uploadButton}</Upload>
      )}
    </Form.Item>
  );
};
