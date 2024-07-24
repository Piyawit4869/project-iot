import { DynamicForm } from '@src/forms';

import {
  Link,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import { Row, Form, Flex } from 'antd';
import { branchColumns } from './organizeData';
import { TableComponent } from '@src/components/shared/TableComponent';
import { FormButtonsEdit } from '@src/components/shared/FormButtons';
import dayjs from 'dayjs';
import React from 'react';
import { renderEditForm } from './renderForm';
import { TitleBar } from '@src/components/shared';
import { CreateButton } from '@src/components/shared/CreateButton';
import { SearchBar } from '@src/components/shared/SearchBar';
import vine, { errors, SimpleMessagesProvider } from '@vinejs/vine';

export const OrganizeSingle: React.FC = () => {
  const { organize, param } = useLoaderData() as any;

  const [form] = Form.useForm();
  const submit = useSubmit();

  const [loading, setLoading] = React.useState<boolean>(true);
  const { state } = useNavigation();

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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  React.useEffect(() => {
    let businessRegister = null;
    if (organize && organize.openingDate) {
      businessRegister = dayjs(organize.openingDate);
    }
    form.setFieldsValue({
      ...organize,
      openingDate: businessRegister,
    });
  }, [form, organize]);

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <FormButtonsEdit
          form={form}
          titleModalSubmit="คุณต้องการแก้ไขข้อมูลองค์กร ใช่หรือไม่?"
          contentModalSubmit="ข้อมูลที่คุณกรอกจะถูกบันทึก"
          titleModalReset="คุณต้องการเคลียร์ข้อมูลองค์กร ใช่หรือไม่?"
          contentModalReset="ข้อมูลที่คุณกรอกจะถูกเคลียร์"
          titleModalDelete="คุณต้องการลบข้อมูลองค์กร ใช่หรือไม่?"
          contentModalDelete="ข้อมูลของคุณจะถูกลบหากกดยืนยัน"
        />
        <Row gutter={20} style={{ paddingTop: '20px' }}>
          {renderEditForm.map((item: any, index: number) => {
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
                form={form}
              />
            );
          })}
        </Row>
      </Form>

      <Flex vertical gap={'small'} style={{ marginTop: '20px' }}>
        {/* Title section from title component */}
        <TitleBar
          title={'ตั้งค่าสาขา'}
          buttons={[
            <Link to={'#'}>
              <CreateButton disable label={'เพิ่มข้อมูลสาขา'} />
            </Link>,
          ]}
        />

        {/* Filter section from search bar component */}
        <div style={{ height: '5px' }} />
        <SearchBar />

        {/* Index data from table component */}
        <TableComponent
          columns={branchColumns}
          dataSource={organize.branches}
          loading={loading || state === 'loading' || state === 'submitting'}
          pagination={{
            current: param && param.page ? Number(param?.page) : 1,
            pageSize: param && param.limit ? Number(param?.limit) : 10,
            total: organize && organize.meta ? organize.meta.totalItems : 10,
            showTotal: (total: any, range: any) =>
              `${range[0]}-${range[1]} ของ ${total} สาขาทั้งหมด`,
          }}
          bordered
        />
      </Flex>
    </div>
  );
};
