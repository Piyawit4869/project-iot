import { FormFields } from '@src/forms';
import { Col, Form, Row } from 'antd';
import { renderCreateNotationForm } from './renderForm';
import { FormButtonsCreate } from '@src/components/shared/FormButtons';

export const NotationCreate = () => {
  const [form] = Form.useForm();
  const defaultValue = {};

  const onFinish = async (values: any) => {
    console.log({ values });
  };

  return (
    <div>
      <Form
        form={form}
        initialValues={defaultValue}
        layout="vertical"
        onFinish={onFinish}
      >
        <FormButtonsCreate
          form={form}
          titleModalReset="คุณต้องการเคลียร์ข้อมูลเอกสาร ใช่หรือไม่?"
          contentModalReset="ข้อมูลที่คุณกรอกจะถูกเคลียร์"
          titleModalSubmit="คุณต้องการสร้างเอกสาร ใช่หรือไม่?"
          contentModalSubmit="ข้อมูลที่คุณกรอกจะถูกบันทึก"
        />
        <div
          style={{
            overflowX: 'hidden',
          }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <FormFields renderForm={renderCreateNotationForm} form={form} />
            </Col>
            <Col xs={0} sm={0} md={12} lg={12} xl={12}>
              PDF rendering ....
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};
