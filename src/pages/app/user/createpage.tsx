import { Form, Row } from 'antd';
import { DynamicForm } from '@src/forms/Dynamic';
import { FormButtonsCreate } from '@src/components/shared/FormButtons';
import { renderForm } from './renderForm';
import vine, { errors, SimpleMessagesProvider } from '@vinejs/vine';
import dayjs from 'dayjs';
import { useSubmit } from 'react-router-dom';

export const UsersCreate = () => {
  const [form] = Form.useForm();
  const submit = useSubmit();

  const schema = vine.object({
    email: vine.string().email(),
    userName: vine.string(),
    password: vine.string(),
    active: vine.boolean(),
    roleId: vine.string().optional(),
    profix: vine.enum(['Mr.', 'Mrs.', 'Miss']),
    firstName: vine.string(),
    lastName: vine.string(),
    birthDate: vine.string(),
    phone: vine.string().maxLength(10),
  });

  vine.messagesProvider = new SimpleMessagesProvider({
    required: 'The {{ field }} field is required',
    string: 'The value of {{ field }} field must be a string',
    email: 'The value is not a valid email address',

    // Error message for the username field
    'username.required': 'Please choose a username for your account',
  });

  const onFinish = async (values: any) => {
    const validator = vine.compile(schema);

    try {
      const payload = Object.assign(values);

      payload.birthDate = dayjs(values.birthDate, 'DD/MM/YY').toISOString();
      await validator.validate(payload);

      submit({ data: JSON.stringify(payload) }, { method: 'post' });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        console.log(error);

        const fieldErrors = error.messages.map((err: any) => ({
          name: err.field,
          errors: [err.message],
        }));

        form.setFields(fieldErrors);
      }
    }
  };

  return (
    <div>
      <div style={{ fontFamily: 'Prompt, sans-serif' }}>
        <div style={{ padding: '20px', marginTop: '10px' }}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <FormButtonsCreate form={form} />
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
        </div>
      </div>
    </div>
  );
};

export default UsersCreate;
