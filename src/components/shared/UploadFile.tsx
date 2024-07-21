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
}

export const UploadFiles: React.FC<FormInterface> = (props: FormInterface) => {
  const { form, name, disabled } = props;
  const file = Form.useWatch(name, form);

  const [fileList, setFileList] = React.useState<any[]>([]);
  const [uploading, setUploading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (Array.isArray(file)) {
      setFileList(file);
    } else if (file && file.fileList) {
      setFileList(file.fileList);
    } else {
      setFileList([]);
    }
  }, [file]);

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      setUploading(true);
    } else if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      setFileList([info.file]); // Set only the uploaded file
      setUploading(false);
    } else if (info.file.status === 'removed') {
      setFileList([]);
      message.success(`${info.file.name} file has been removed`);
      setUploading(false);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
      setUploading(false);
    }
  };

  const uploadProps: UploadProps = {
    disabled: disabled,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    multiple: false,
    maxCount: 1,
    action: `${baseURL}/upload`,
    listType: 'picture-card',
    accept: `image/*`,
    onChange: handleChange,
    fileList,
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Form.Item
      name={name}
      valuePropName="fileList"
      getValueFromEvent={normFile}
    >
      <Upload {...uploadProps}>
        {uploading || fileList.length ? null : uploadButton}
      </Upload>
    </Form.Item>
  );
};
