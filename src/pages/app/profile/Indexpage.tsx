import { Form, Row, Image } from 'antd';
import { useState } from 'react';
import { FormButtonsCreate } from '@src/components/shared/FormButtons';
import { DynamicForm } from '@src/forms';
import { renderForm } from './renderForm';

export const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();
  const [, setIsEditing] = useState(false);

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    console.log('Form Submitted', payload);
    localStorage.setItem('me', JSON.stringify(payload));
    setIsEditing(false);
  };

  return (
    <>
      <FormButtonsCreate form={form} />
      <Row justify="center" style={{ marginTop: 24 }}>
        <Image
          width={300}
          src="https://img5.pic.in.th/file/secure-sv1/Screenshot-2024-07-24-232206b4bc39310f99c59b.png"
          style={{ borderRadius: '50%' }}
        />
      </Row>
      <div style={{ fontFamily: 'Prompt, sans-serif' }}>
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
    </>
  );
};

export default ProfilePage;
