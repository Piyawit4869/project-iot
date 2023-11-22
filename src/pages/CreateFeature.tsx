import { Button, Row, Form, Input, Space } from "antd";
import * as API from "../apis";
import React from "react";
import { redirect, useSubmit } from "react-router-dom";
import { UploadFiles } from "../components/global/UploadImage";

export async function FeatureCreateAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  switch (submitData.action) {
    case "create":
      console.log("create");

      try {
        await API.features.create(JSON.parse(submitData.data));

        return redirect("/admin/utotech");
      } catch (e: any) {
        return null;
      }

    default:
      break;
  }
}

export const CreateFeature: React.FC = () => {
  const [form] = Form.useForm();
  const submit = useSubmit();

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    if (payload.file && payload.file.length > 0) {
      payload.imageUrl = payload.file[0].response?.url;
      delete payload.file;
    } else {
      delete payload.file;
    }
    payload.service = "features";
    submit(
      { data: JSON.stringify(payload), action: "create" },
      { method: "post" }
    );
  };

  return (
    <Row justify="space-around">
      <div style={{ width: "400px" }}>
        <Form
          form={form}
          onFinish={onFinish}
          name="validateOnly"
          layout="vertical"
          autoComplete="off"
        >
          <UploadFiles form={form} />
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="subTitle" label="Subtitle">
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea style={{ height: "300px" }} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button htmlType="submit">Create</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Row>
  );
};
