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
    if (me.role !== 'super_admin') {
      redirect('/');
    }
  }, []);

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    payload.active = true;
    payload.user.active = true;
    payload.branch.branchType = 'branch';

    payload.logoUrl =
      'https://cdn.discordapp.com/attachments/1235856320280924213/1244954526155542598/575757.png?ex=6656fdc1&is=6655ac41&hm=96242e1d5d4f232411d9434a17f5053d4a7e6c788030f515e5da25d03813da86&';
    payload.branch.logoUrl =
      'https://cdn.discordapp.com/attachments/1235856320280924213/1244954526155542598/575757.png?ex=6656fdc1&is=6655ac41&hm=96242e1d5d4f232411d9434a17f5053d4a7e6c788030f515e5da25d03813da86&';

    console.log(payload);

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
