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

  // Check path by role
  React.useEffect(() => {
    const me = JSON.parse(localStorage.getItem('me') as any);
    if (me.role.name !== 'super_admin') {
      redirect('/');
    }
  }, []);

  const profileSchema = vine.object({
    firstName: vine.string(),
    lastName: vine.string().optional(),
    birthDate: vine.string().optional(),
    phone: vine.string().maxLength(15).optional(),
  });

  const userSchema = vine.object({
    email: vine.string().email(),
    password: vine.string(),
    userName: vine.string().optional(),
    profile: profileSchema.clone(),
  });

  const addressSchema = vine.object({
    address: vine.string(),
    descriptions: vine.string().optional(),
    addressType: vine.string().optional(),
    country: vine.string().optional(),
    province: vine.string(),
    district: vine.string(),
    subDistrict: vine.string(),
    postalCode: vine.string().maxLength(5).optional(),
  });

  const branchSchema = vine.object({
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
    contactPhone: vine.string().maxLength(15).optional(),
    registerVat: vine.boolean().optional(),
    address: addressSchema.clone(),
  });

  const settingSchema = vine.object({
    active: vine.boolean(),
    defaultLanguage: vine.enum(['TH', 'EN', 'JP']),
    domainName: vine.string(),
    textDisplay: vine.string().optional(),
    theme: vine.enum(['light', 'dark']).optional(),
  });

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
    contactPhone: vine.string().maxLength(15),
    contactWebsite: vine.string().optional(),
    businessEmail: vine.string().email().optional(),
    contactFacebook: vine.string().optional(),
    contactLine: vine.string().optional(),
    contactWhatsapp: vine.string().optional(),
    contactNote: vine.string().optional(),
    branch: branchSchema.clone(),
    address: addressSchema.clone(),
    user: userSchema.clone(),
    setting: settingSchema.clone(),
  });

  const defaultValue = {
    active: true,
    status: 'newly_registered',
    fromType: 'ordinary_person',
    registerVat: true,
    branch: {
      active: true,
      isMain: true,
      fromType: 'ordinary_person',
      registerVat: true,
    },
    setting: {
      active: true,
      defaultLanguage: 'TH',
      theme: 'light',
      textDisplay: 'normal',
    },
  };

  vine.messagesProvider = new SimpleMessagesProvider({
    required: 'The {{ field }} field is required',
    string: 'The value of {{ field }} field must be a string',
    // 'username.required': 'Please choose a username for your account',
  });

  const onFinish = async (values: any) => {
    try {
      const payload = { ...values };
      payload.branch.active = true;
      payload.setting.active = true;

      // Convert dates to ISO format if they exist
      if (values.openingDate) {
        payload.openingDate = dayjs(values.openingDate).toISOString();
      }
      if (values.branch?.openingDate) {
        payload.branch.openingDate = dayjs(
          values.branch.openingDate,
        ).toISOString();
      }
      if (values.user?.profile?.birthDate) {
        payload.user.profile.birthDate = dayjs(
          values.user.profile.birthDate,
        ).toISOString();
      }

      // Compile the main schema for validation
      const validator = vine.compile(schema);

      // Validate the entire form payload
      await validator.validate(payload);

      await submit({ data: JSON.stringify(payload) }, { method: 'post' });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        console.log(error.messages);

        // Correctly map validation errors to the form fields, including nested fields
        const fieldErrors = error.messages.map((err: any) => {
          const fieldName = err.field.includes('.')
            ? err.field.split('.')
            : [err.field];

          return {
            name: fieldName,
            errors: [err.message],
          };
        });

        form.setFields(fieldErrors);
      } else {
        console.error('Submission error:', error);
      }
    }
  };

  const [type, setType] = React.useState('');
  const [allValues, setAllValues] = React.useState();

  const handleValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.type) {
      setType(changedValues.type);
    }
    setAllValues(allValues);

    const flattenKeys = (obj: any, prefix: string[] = []): any[] => {
      return Object.keys(obj).reduce((acc: any[], key) => {
        const currentPath = [...prefix, key];
        const value = obj[key];

        if (
          typeof value === 'object' &&
          value !== null &&
          !Array.isArray(value)
        ) {
          acc.push(...flattenKeys(value, currentPath));
        } else {
          acc.push(currentPath);
        }

        return acc;
      }, []);
    };

    const fieldsToClear = flattenKeys(changedValues).map((fieldPath) => ({
      name: fieldPath,
      errors: [],
    }));

    form.setFields(fieldsToClear);
  };

  return (
    <div>
      <Form
        form={form}
        initialValues={defaultValue}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={handleValuesChange}
      >
        <FormButtonsCreate
          form={form}
          titleModalReset="คุณต้องการเคลียร์ข้อมูลองค์กร ใช่หรือไม่?"
          contentModalReset="ข้อมูลที่คุณกรอกจะถูกเคลียร์"
          titleModalSubmit="คุณต้องการสร้างข้อมูลองค์กร ใช่หรือไม่?"
          contentModalSubmit="ข้อมูลที่คุณกรอกจะถูกบันทึก"
        />
        <Row gutter={20} style={{ paddingTop: '20px' }}>
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
              ruleMessage={item.message}
              require={item.require}
              option={item.options}
              disabled={item.disabled}
              checked={item.checked}
              maxLength={item.maxLength}
              validator={item.validator}
              defaultValue={item.defaultValue}
              businessType={type}
              isName={item.isName}
              title={item.title}
              description={item.description}
              formValue={allValues}
              form={form}
              checkedText={item.checkedText}
              unCheckedText={item.unCheckedText}
            />
          ))}
        </Row>
      </Form>
    </div>
  );
};
