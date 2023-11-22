import * as React from "react";
import { Form, Upload, UploadProps, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

interface FormInterface {
  form: any;
}

// ... (import statements and other code)

export const UploadFiles: React.FC<FormInterface> = (props: FormInterface) => {
  const { form } = props;
  const file = form.getFieldValue("file");

  const [fileList, setFileList] = React.useState<any[]>(file || []);

  const prop: UploadProps = {
    fileList: fileList,
    multiple: false,
    maxCount: 1,
    action: "/api/upload",
    listType: "picture-circle",
    onChange(info) {
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setFileList(info.fileList);
      } else if (info.file.status === "removed") {
        // Handle file removal here
        setFileList(info.fileList);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    // ... (other props)
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Form.Item
      name="file"
      valuePropName="fileList"
      getValueFromEvent={normFile}
      initialValue={fileList}
    >
      <Upload {...prop}>{fileList.length >= 1 ? null : uploadButton}</Upload>
    </Form.Item>
  );
};
