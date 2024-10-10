import { Form, notification, Row } from 'antd';
import { DynamicForm } from '@src/forms/Dynamic';
import { FormButtonsCreate } from '@src/components/shared/FormButtons';
import { renderForm } from './renderForm';
import vine, { errors } from '@vinejs/vine';
import { useSubmit } from 'react-router-dom';

export const UsersCreate = () => {
  const [form] = Form.useForm();
  const submit = useSubmit();

  const schema = vine.object({
    email: vine.string().email(),
    userName: vine.string().optional(),
    password: vine.string(),
    active: vine.boolean(),
    roleId: vine.string().optional(),
    profile: vine.object({
      photoUrl: vine.string().optional(),
      prefix: vine.enum(['Mr.', 'Mrs.', 'Miss']).optional(),
      firstName: vine.string(),
      lastName: vine.string().optional(),
      birthDate: vine.string().optional(),
      phone: vine.string().maxLength(10).optional(),
    }),
  });

  const onFinish = async (values: any) => {
    const validator = vine.compile(schema);

    try {
      const payload = Object.assign({}, values);

      if (payload.file && payload.file.length > 0) {
        payload.profile.photoUrl = payload.file[0].response?.url;
        delete payload.file;
      } else {
        payload.profile.photoUrl = null;
        delete payload.file;
      }

      if (!payload.active) {
        payload.active = true;
      }

      if (payload.profile.birthDate) {
        payload.profile.birthDate = payload.profile.birthDate.toISOString();
      }

      await validator.validate(payload);

      await submit({ data: JSON.stringify(payload) }, { method: 'post' });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        console.log(error.messages);

        notification.error({
          message: 'สร้างผู้ใช้งานล้มเหลว',
          placement: 'bottomRight',
          duration: 3,
        });
      } else {
        notification.error({
          message: 'ข้อมูลผู้ใช้งานไม่ถูกต้อง',
          placement: 'bottomRight',
          duration: 3,
        });
      }
    }
  };

  return (
    <div>
      <div style={{ fontFamily: 'Prompt, sans-serif' }}>
        <div style={{ padding: '20px', marginTop: '10px' }}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <FormButtonsCreate
              form={form}
              titleModalReset="คุณต้องการเคลียร์ข้อมูลผู้ใช้งาน ใช่หรือไม่?"
              contentModalReset="ข้อมูลที่คุณกรอกจะถูกเคลียร์"
              titleModalSubmit="คุณต้องการสร้างข้อมูลผู้ใช้งาน ใช่หรือไม่?"
              contentModalSubmit="ข้อมูลที่คุณกรอกจะถูกบันทึก"
            />
            <Row gutter={24}>
              {renderForm.map((item: any, index: number) => (
                <DynamicForm
                  key={index}
                  name={item.name}
                  label={item.label}
                  placeholder={item.placeholder}
                  type={item.type}
                  col={item.col}
                  icon={item.icon}
                  value={item.value}
                  rule={item.rule}
                  option={item.options}
                  disabled={item.disabled}
                  checked={item.checked}
                  maxLength={item.maxLength}
                  defaultValue={item.defaultValue}
                  isName={item.isName}
                  title={item.title}
                  description={item.description}
                  form={form}
                  checkedText={item.checkedText}
                  unCheckedText={item.unCheckedText}
                />
              ))}
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};
