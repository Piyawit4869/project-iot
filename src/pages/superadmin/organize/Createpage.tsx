import React from 'react';
import { Form, notification, Row } from 'antd';
import { DynamicForm } from '@src/forms/Dynamic';
import { redirect, useSubmit } from 'react-router-dom';
import { FormButtonsCreate } from '@src/components/shared/FormButtons';
import { renderForm } from './renderForm';
import vine, { errors } from '@vinejs/vine';
import dayjs from 'dayjs';
import { schemaCreateOrg } from './schema';

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

  const defaultValue = {
    active: true,
    status: 'NewlyRegistered',
    fromType: 'OrdinaryPerson',
    registerVat: true,
    address: {
      isMain: true,
    },
    branch: {
      status: 'NewlyRegistered',
      active: true,
      isMain: true,
      fromType: 'OrdinaryPerson',
      registerVat: true,
      address: { isMain: false },
    },
    setting: {
      active: true,
      defaultLanguage: 'TH',
      theme: 'light',
      textDisplay: 'normal',
    },
  };

  const onFinish = async (values: any) => {
    try {
      const payload = { ...values };
      payload.branch.active = true;
      payload.setting.active = true;
      payload.address.active = true;
      payload.branch.address.active = true;
      payload.address.name = values.nameEn;
      payload.branch.address.name = values.branch.nameEn;
      payload.address.language = values.setting.defaultLanguage;
      payload.branch.address.language = values.setting.defaultLanguage;
      payload.address.isMain = true;
      payload.branch.address.isMain = true;

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
      const validator = vine.compile(schemaCreateOrg);

      // Validate the entire form payload
      await validator.validate(payload);

      await submit({ data: JSON.stringify(payload) }, { method: 'post' });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        notification.error({
          message: 'Create organization fail',
          placement: 'bottomRight',
          description: 'You have fail to create organization',
        });
      } else {
        notification.error({
          message: 'Submission fail',
          placement: 'bottomRight',
          description: `You have submission fail : ${error}`,
        });
      }
    }
  };

  const [type, setType] = React.useState('');

  const handleValuesChange = (changedValues: any) => {
    if (changedValues.type) {
      setType(changedValues.type);
    }
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
        <div
          style={{
            maxHeight: '74vh',
            minHeight: '50vh',
            height: '100%',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          <Row gutter={[20, 24]} style={{ paddingTop: '20px' }}>
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
                rule={item.rule}
                option={item.options}
                disabled={item.disabled}
                checked={item.checked}
                maxLength={item.maxLength}
                defaultValue={item.defaultValue}
                businessType={type}
                isName={item.isName}
                title={item.title}
                description={item.description}
                form={form}
                checkedText={item.checkedText}
                unCheckedText={item.unCheckedText}
              />
            ))}
          </Row>
        </div>
      </Form>
    </div>
  );
};

// const mockUp = {
//   active: true,
//   status: 'NewlyRegistered',
//   fromType: 'OrdinaryPerson',
//   type: 'CompanyLimited',
//   nameTh: 'ยูโทเทค',
//   nameEn: 'utotech',
//   taxId: '1111111111111',
//   registerVat: true,
//   openingDate: '2024-08-23T17:00:00.000Z',
//   websiteUrl: 'https://www.tung-wang-ruey.com',
//   setting: {
//     defaultLanguage: 'TH',
//     domainName: 'www.chong-tum-dee.com',
//     theme: 'light',
//     textDisplay: 'normal',
//     active: true,
//   },
//   address: {
//     address: 'test',
//     addressType: 'ทาวเฮาส์',
//     country: 'Thailand',
//     province: 'Liverpool',
//     district: 'พุทธมณฑล',
//     subDistrict: 'คลองโยง',
//     postalCode: '73170',
//   },
//   contactPhone: '660888821480',
//   contactEmail: 'johnlenon58@gmail.com',
//   branch: {
//     isMain: true,
//     fromType: 'OrdinaryPerson',
//     type: 'CompanyLimited',
//     status: 'NewlyRegistered',
//     nameTh: 'ตั้งหวังรวย',
//     nameEn: 'Tung Wang Ruey',
//     taxId: '1111111111111',
//     branchCode: 'twr001',
//     openingDate: '2024-08-23T17:00:00.000Z',
//     websiteUrl: 'https://www.tung-wang-ruey.com',
//     contactPhone: '',
//     contactEmail: 'phuwisw@gmail.com',
//     registerVat: true,
//     address: {
//       address: 'test',
//       descriptions: '',
//       addressType: 'ทาวเฮาส์',
//       country: 'ประเทศไทย',
//       province: 'นครปฐม',
//       district: 'พุทธมณฑล',
//       subDistrict: 'คลองโยง',
//       postalCode: '73170',
//     },
//     active: true,
//   },
//   user: {
//     email: 'phuwisw@gmail.com',
//     password: 'localpass',
//     profile: {
//       firstName: 'Phuwis',
//       lastName: 'Watthana',
//       birthDate: '2003-03-05T17:00:00.000Z',
//     },
//     userName: 'phuwis1',
//   },
// };
