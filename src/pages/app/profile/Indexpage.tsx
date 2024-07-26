import { Form, Row } from 'antd';
import { FormButtonsCreate } from '@src/components/shared/FormButtons';
import { DynamicForm } from '@src/forms';
import { renderForm } from './renderForm';

export const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    console.log('Form Submitted', payload);
  };

  return (
    <>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <FormButtonsCreate
          form={form}
          titleModalReset="คุณต้องการเคลียร์ข้อมูลของคุณ ใช่หรือไม่?"
          contentModalReset="ข้อมูลทของคุณจะถูกเคลียร์"
          titleModalSubmit="คุณต้องการแก้ไขข้อมูล ใช่หรือไม่?"
          contentModalSubmit="ข้อมูลที่คุณแก้ไขจะถูกบันทึก"
        />
        <div style={{ height: '30px' }} />
        <Row gutter={24}>
          {renderForm.map((item: any, index: number) => (
            <DynamicForm
              key={index}
              name={item.name}
              label={item.label}
              placeholder={item.placeholder}
              type={item.type}
              col={item.col}
              option={item.option}
              icon={item.icon}
              value={item.value}
              ruleMessage={item.message}
              require={item.require}
              disabled={item.disabled}
              checked={item.checked}
              maxLength={item.maxLength}
              validator={item.validator}
            />
          ))}
        </Row>
      </Form>
    </>
  );
};

export default ProfilePage;
