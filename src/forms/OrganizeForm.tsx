import { InputFormField } from "@src/components/shared";
import { Button, Col, Form, Input, Row, Select } from "antd";

interface OrganizeFormProps {
  initialValues?: OrganizeType;
}

export const OrganizeForm: React.FC<OrganizeFormProps> = (
  props: OrganizeFormProps
) => {
  const { initialValues } = props;

  // const [form] = Form.useForm();

  const onFinish = (values: OrganizeType) => {
    console.log({ values });
  };

  return (
    <Form layout="vertical" initialValues={initialValues} onFinish={onFinish}>
      {/* <Form.Item label="Name" name="name">
        <Input />
      </Form.Item> */}

      <Row gutter={20}>
        <Col
          xs={{ span: 24, order: 2 }}
          sm={{ span: 24, order: 2 }}
          md={{ span: 24, order: 2 }}
          lg={{ span: 12, order: 1 }}
          xl={{ span: 12, order: 1 }}
        >
          <Row gutter={20}>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <InputFormField name="name" label="Name" />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={8}>
              <InputFormField name="description" label="Description" />
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={24}>
              <InputFormField name="name2" label="Name2" />
            </Col>
            <Col span={8}>
              <InputFormField name="description2" label="Description2" />
            </Col>
          </Row>
        </Col>

        <Col
          xs={{ span: 24, order: 1 }}
          sm={{ span: 24, order: 1 }}
          md={{ span: 24, order: 1 }}
          lg={{ span: 12, order: 2 }}
          xl={{ span: 12, order: 2 }}
          style={{
            background: "orange",
          }}
        >
          Details
        </Col>
      </Row>
    </Form>
  );
};

{
  /* <InputFormField name="description" label="Description" />
      <InputFormField name="province" label="Province" />

      <Form.Item label="Type" name="type">
        <Select
          placeholder="Select a type"
          options={[
            { value: "type 1", label: "type 1" },
            { value: "type 2", label: "type 2" },
            { value: "type 3", label: "type 3" },
          ]}
        />
      </Form.Item>

      <SelectFormField />
      <RadioFormField />

      <Button htmlType="reset">Cancel</Button>
      <Button type="primary" htmlType="submit">
        Submit
      </Button> */
}
