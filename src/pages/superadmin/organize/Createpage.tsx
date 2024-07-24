import React from 'react';
import { Form, Row } from 'antd';
import { DynamicForm } from '@src/forms/Dynamic';
import { redirect, useSubmit } from 'react-router-dom';
import { FormButtonsCreate } from '@src/components/shared/FormButtons';
import { renderForm } from './renderForm';
import vine, { errors, SimpleMessagesProvider } from '@vinejs/vine';
import dayjs from 'dayjs';

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

  const schema = vine.object({
    nameTh: vine.string(),
    nameEn: vine.string(),
    taxId: vine.string(),
    active: vine.boolean(),
    status: vine.enum([
      'newly_registered',
      'active_user',
      'loyal_customer',
      'at_risk',
      'churned',
    ]),
    fromType: vine.enum(['ordinary_person', 'juristic_person']),
    type: vine.enum([
      'human',
      'ordinary_partnership',
      'shop',
      'bop',
      'company_limited',
      'public_company_limited',
      'limited_partnership',
      'foundation',
      'association',
      'joint_venture',
      'others',
    ]),
    descriptionsTh: vine.string().optional(),
    descriptionsEn: vine.string().optional(),
    registerVat: vine.boolean(),
    openingDate: vine.string().optional(),
    websiteUrl: vine.string().optional(),
    contactEmail: vine.string().email(),
    contactPhone: vine.string().maxLength(10),
    contactWebsite: vine.string().optional(),
    businessEmail: vine.string().email().optional(),
    contactFacebook: vine.string().optional(),
    contactLine: vine.string().optional(),
    contactWhatsapp: vine.string().optional(),
    contactNote: vine.string().optional(),
    branch: vine.object({
      active: vine.boolean(),
      fromType: vine.enum(['ordinary_person', 'juristic_person']),
      nameTh: vine.string().optional(),
      nameEn: vine.string().optional(),
      taxId: vine.string().maxLength(13),
      type: vine.enum([
        'human',
        'ordinary_partnership',
        'shop',
        'bop',
        'company_limited',
        'public_company_limited',
        'limited_partnership',
        'foundation',
        'association',
        'joint_venture',
        'others',
      ]),
      isMain: vine.boolean(),
      branchCode: vine.string(),
      openingDate: vine.string().optional(),
      websiteUrl: vine.string().optional(),
      contactEmail: vine.string().email().optional(),
      contactPhone: vine.string().maxLength(10).optional(),
      registerVat: vine.boolean().optional(),
      address: vine.object({
        address: vine.string(),
        descriptions: vine.string().optional(),
        addressType: vine.string().optional(),
        country: vine.string().optional(),
        province: vine.string(),
        district: vine.string(),
        subDistrict: vine.string(),
        postalCode: vine.string().maxLength(5).optional(),
      }),
    }),
    user: vine.object({
      email: vine.string().email(),
      password: vine.string(),
      userName: vine.string().optional(),
      profile: vine.object({
        firstName: vine.string(),
        lastName: vine.string().optional(),
        birthDate: vine.string().optional(),
        phone: vine.string().maxLength(10).optional(),
      }),
    }),
    setting: vine.object({
      active: vine.boolean(),
      defaultLanguage: vine.enum(['TH', 'EN', 'JP']),
      domainName: vine.string(),
      textDisplay: vine.string().optional(),
      theme: vine.enum(['light', 'dark']).optional(),
    }),
  });

  vine.messagesProvider = new SimpleMessagesProvider({
    // Applicable for all fields
    required: 'The {{ field }} field is required',
    string: 'The value of {{ field }} field must be a string',
    email: 'The value is not a valid email address',

    // Error message for the username field
    'username.required': 'Please choose a username for your account',
  });

  const onFinish = async (values: any) => {
    const validator = vine.compile(schema);
    try {
      console.log('in try');

      const payload = { ...values };
      payload.openingDate = dayjs(values.openingDate).toISOString();
      payload.branch.openingDate = dayjs(
        values.branch.openingDate,
      ).toISOString();
      payload.user.profile.birthDate = dayjs(
        values.user.profile.birthDate,
      ).toISOString();
      await validator.validate(payload);

      submit({ data: JSON.stringify(payload) }, { method: 'post' });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
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
        <FormButtonsCreate
          form={form}
          titleModalReset="คุณต้องการเคลียร์ข้อมูลองค์กร ใช่หรือไม่?"
          contentModalReset="ข้อมูลที่คุณกรอกจะถูกเคลียร์"
          titleModalSubmit="คุณต้องการสร้างข้อมูลองค์กร ใช่หรือไม่?"
          contentModalSubmit="ข้อมูลที่คุณกรอกจะถูกบันทึก"
        />
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
