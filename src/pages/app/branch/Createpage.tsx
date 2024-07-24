import { Form, Row } from 'antd';
import { DynamicForm } from '@src/forms/Dynamic';
import { FormButtonsCreate } from '@src/components/shared/FormButtons';
import { renderForm } from './renderForm';
import { redirect, useSubmit } from 'react-router-dom';
import React from 'react';
import vine, { errors, SimpleMessagesProvider } from '@vinejs/vine';
export const BranchCreate = () => {
  const [form] = Form.useForm();
  const submit = useSubmit();

  React.useEffect(() => {
    const me = JSON.parse(localStorage.getItem('me') as any);
    if (me.role.name !== 'onwer') {
      redirect('/');
    }
  }, []);

  const schema = vine.object({
    nameTh: vine.string(),
    // nameEn: vine.string(),
    taxId: vine.string(),
    logoUrl: vine.string(),
    type: vine.string(),
    fromType: vine.string(),
    contactEmail: vine.string().email(),
    websiteUrl: vine.string().optional(),
    // contactWebsite: vine.string().optional(),
    contactPhone: vine.string().maxLength(10),
    descriptionsTh: vine.string().optional(),
    // descriptionsEn: vine.string().optional(),
    address: vine.object({
      active: vine.boolean(),
      addresType: vine.string().optional(),
      province: vine.string().optional(),
      district: vine.string().optional(),
      subDistrict: vine.string().optional(),
      address: vine.string().optional(),
      postalCode: vine.string().maxLength(5).optional(),
    })
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

export default BranchCreate;
