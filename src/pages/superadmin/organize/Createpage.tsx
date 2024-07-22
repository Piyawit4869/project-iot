import React from 'react';
import { Form, Row } from 'antd';
import { DynamicForm } from '@src/forms/Dynamic';
import { redirect, useSubmit } from 'react-router-dom';
import { FormButtonsCreate } from '@src/components/shared/FormButtons';
import { renderForm } from './renderForm';

export const OrganizeCreate: React.FC = () => {
  const [form] = Form.useForm();
  const submit = useSubmit();

  //check path by role
  React.useEffect(() => {
    const me = JSON.parse(localStorage.getItem('me') as any);
    if (me.role.name !== 'super_admin') {
      redirect('/');
    }
  }, []);

  const onFinish = (values: any) => {
    const payload = Object.assign(values);

    submit({ data: JSON.stringify(payload) }, { method: 'post' });
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <FormButtonsCreate form={form} />
        <Row gutter={20} style={{ paddingTop: '20px' }}>
          {renderForm.map((item: any, index: number) => {
            return (
              <DynamicForm
                key={index}
                name={item.name}
                label={item.label}
                placeholder={item.placeholder}
                type={item.type}
                col={item.col}
                icon={item.icon}
                value={item.value}
                ruleMessage={item.message}
                require={item.require}
                option={item.options}
                disabled={item.disabled}
                checked={item.checked}
                maxLength={item.maxLength}
                validator={item.validator}
              />
            );
          })}
        </Row>
      </Form>
    </div>
  );
};
