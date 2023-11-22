import { Row, Button, Input, Space, Form } from "antd";
import { redirect, useLoaderData, useSubmit } from "react-router-dom";
import * as API from "../apis";
import { UploadFiles } from "../components/global/UploadImage";

export async function optionLoader({ params }: any) {
  console.log(params);

  try {
    const { data } = await API.features.get(params.id);

    console.log(data);

    return { data: data };
  } catch (error) {
    return { data: null };
  }
}

export async function OptionEditAction({ request, params }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  switch (submitData.action) {
    case "edit":
      try {
        await API.features.update(JSON.parse(submitData.data), params.id);

        return redirect("/admin/utotech");
      } catch (e: any) {
        return null;
      }

    case "delete":
      try {
        await API.features.deleted(params.id);

        return redirect("/admin/utotech");
      } catch (e: any) {
        return null;
      }

    default:
      break;
  }
}

export const SingleSettingOption = () => {
  const { data } = useLoaderData() as any;
  const [form] = Form.useForm();
  const submit = useSubmit();

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    if (payload.file && payload.file.length > 0) {
      payload.imageUrl = payload.file[0].response?.url || data.imageUrl;
      delete payload.file;
    } else {
      delete payload.file;
    }
    payload.service = "options";
    submit(
      { action: "edit", data: JSON.stringify(payload) },
      { method: "put" }
    );
  };

  const onDelete = () => {
    submit({ action: "delete" }, { method: "delete" });
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
            <Input defaultValue={data.title} />
          </Form.Item>
          <Form.Item
            name="subTitle"
            label="Subtitle"
            rules={[{ required: true }]}
          >
            <Input defaultValue={data.subTitle} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea
              defaultValue={data.description}
              style={{ height: "300px" }}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button htmlType="submit">Edit</Button>
              <Button onClick={onDelete}>Delete</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </Row>
  );
};
