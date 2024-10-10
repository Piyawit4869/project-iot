import { Form, Row } from 'antd';

import { DynamicForm } from '@src/forms/Dynamic';
import { FormButtonsEdit } from '@src/components/shared/FormButtons';
import { renderEditForm } from './renderForm';
import { useLoaderData, useSubmit } from 'react-router-dom';
import vine, { errors, SimpleMessagesProvider } from '@vinejs/vine';
import dayjs from 'dayjs';
import React from 'react';

export const BranchSingle = () => {
  const { branch } = useLoaderData() as any;
  const [form] = Form.useForm();
  const submit = useSubmit();

  const schema = vine.object({
    active: vine.boolean(),
    fromType: vine.enum(['OrdinaryPerson', 'JuristicPerson']),
    nameTh: vine.string(),
    nameEn: vine.string(),
    status: vine.string(),
    taxId: vine.string().maxLength(13),
    logoUrl: vine.string(),
    isMain: vine.boolean(),
    type: vine.enum([
      'human',
      'ordinary_partnership',
      'shop',
      'bop',
      'CompanyLimited',
      'PublicCompanyLimited',
      'LimitedPartnership',
      'Foundation',
      'Association',
      'JointVenture',
      'Others',
    ]),
    openingDate: vine.string(),
    branchCode: vine.string(),
    contactEmail: vine.string().email(),
    websiteUrl: vine.string().optional(),
    contactPhone: vine.string().maxLength(10),
    contactFacebook: vine.string().optional(),
    contactLine: vine.string().optional(),
    contactWhatsapp: vine.string().optional(),
    contactWebsite: vine.string().optional(),
    contactNote: vine.string().optional(),
    registerVat: vine.boolean(),
    descriptionsTh: vine.string().optional(),
    descriptionsEn: vine.string().optional(),
    address: vine.object({
      descriptions: vine.string().optional(),
      active: vine.boolean(),
      status: vine.string(),
      language: vine.string(),
      isMain: vine.boolean(),
      name: vine.string(),
      addresType: vine.string().optional(),
      province: vine.string().optional(),
      district: vine.string().optional(),
      subDistrict: vine.string().optional(),
      address: vine.string().optional(),
      postalCode: vine.string().maxLength(5).optional(),
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
      const payload = { ...values };
      payload.logoUrl = values.logoUrl[0].response?.url;
      payload.openingDate = dayjs(payload.openingDate).toISOString();

      await validator.validate(payload);

      submit(
        { data: JSON.stringify(payload), action: 'edit' },
        { method: 'put' },
      );
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

  React.useEffect(() => {
    let businessRegister = null;
    if (branch && branch.openingDate) {
      businessRegister = dayjs(branch.openingDate);
    }
    form.setFieldsValue({
      ...branch,
      openingDate: businessRegister,
    });
  }, [form, branch]);

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <FormButtonsEdit
          form={form}
          titleModalSubmit="คุณต้องการแก้ไขข้อมูลสาขา ใช่หรือไม่?"
          contentModalSubmit="ข้อมูลที่คุณกรอกจะถูกบันทึก"
          titleModalReset="คุณต้องการเคลียร์ข้อมูลสาขา ใช่หรือไม่?"
          contentModalReset="ข้อมูลที่คุณกรอกจะถูกเคลียร์"
          titleModalDelete="คุณต้องการลบข้อมูลสาขา ใช่หรือไม่?"
          contentModalDelete="ข้อมูลของคุณจะถูกลบหากกดยืนยัน"
        />
        <Row gutter={24}>
          {renderEditForm.map((item: any, index: number) => (
            <DynamicForm
              key={index}
              name={item.name}
              label={item.label}
              placeholder={item.placeholder}
              type={item.type}
              col={item.col}
              icon={item.icon}
              value={item.value}
              option={item.options}
              disabled={item.disabled}
              checked={item.checked}
              maxLength={item.maxLength}
            />
          ))}
        </Row>
      </Form>
    </div>
  );
};

export default BranchSingle;
