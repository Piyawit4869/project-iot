import { Form, Row } from 'antd';
import { DynamicForm } from '@src/forms/Dynamic';
import { FormButtonsCreate } from '@src/components/shared/FormButtons';
import { renderForm } from './renderForm';

export const UsersCreate = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    console.log('Form Submitted', payload);
  };

  return (
    <div>
      <FormButtonsCreate form={form} />
      <div style={{ fontFamily: 'Prompt, sans-serif' }}>
        <div style={{ padding: '20px', marginTop: '10px' }}>
          <Form form={form} layout="vertical" onFinish={onFinish}>
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
