import * as React from "react";
import { Form, Upload, UploadProps, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const baseURL = import.meta.env.VITE_APP_API_BASE_URL;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface FormInterface {
  form: any;

  name: any;
  disabled?: boolean;
}

export const UploadFiles: React.FC<FormInterface> = (props: FormInterface) => {
  const { form, disabled } = props;
  const file: any = Form.useWatch(props.name, form);

  const [fileList, setFileList] = React.useState<any[]>([]);
  const [uploading, setUploading] = React.useState<boolean>(false);

  const prop: UploadProps = {
    disabled: disabled,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    multiple: false,
    maxCount: 1,
    action: `${baseURL}/upload`,
    listType: "picture-card",
    accept: `image/*`,
    onChange(info) {
      if (info.file.status === "uploading") {
        setUploading(true);
      }

      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setFileList((prev: any) => [...prev, info.file]);
        setUploading(false);
      } else if (info.file.status === "removed") {
        setFileList((prev: any) =>
          prev.filter((file: any) => file.uid !== info.file.uid)
        );
        message.success(`${info.file.name} file has been removed`);
        setUploading(false);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);

        setUploading(false);
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
    <>
      <Form.Item
        name={props.name}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload {...prop}>
          {uploading || (file && file?.length) || (fileList && fileList?.length)
            ? null
            : uploadButton}
        </Upload>
      </Form.Item>
    </>
  );
};
