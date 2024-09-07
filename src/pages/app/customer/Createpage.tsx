import { TagFilled } from '@ant-design/icons';
import { Form, Row, Col } from 'antd';
import { DynamicForm } from '@src/forms/Dynamic';
import { FormButtonsCreate } from '@src/components/shared/FormButtons';

export const CustomerCreate = () => {
  const [form] = Form.useForm();

  const renderForm = [
    {
      label: 'เพิ่มข้อมูลลูกค้า',
      col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      type: 'LabelForm',
    },
    {
      name: ['user', 'email'],
      label: 'อีเมลล์',
      placeholder: 'กรอกอีเมลล์',
      require: true,
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
    },
    {
      name: 'companyName',
      label: 'ชื่อบริษัท',
      placeholder: 'กรอกชื่อจริง',
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
    },
    {
      name: ['user', 'profile', 'firstName'],
      label: 'ชื่อจริง',
      placeholder: 'กรอกชื่อจริง',
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
      validator: (_: any, value: any) => {
        if (value === undefined || value === '') {
          return undefined;
        }
        if (!/^([a-zA-Zก-๙]+)$/.test(value)) {
          return Promise.reject('กรุณากรอกตัวอักษรเท่านั้น');
        }
        return Promise.resolve();
      },
    },
    {
      name: ['user', 'profile', 'lastName'],
      label: 'นามสกุล',
      placeholder: 'กรอกนามสกุล',
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
      validator: (_: any, value: any) => {
        if (value === undefined || value === '') {
          return undefined;
        }
        if (!/^([a-zA-Zก-๙]+)$/.test(value)) {
          return Promise.reject('กรุณากรอกตัวอักษรเท่านั้น');
        }
        return Promise.resolve();
      },
    },
    {
      name: 'userName',
      label: 'ชื่อผู้ใช้',
      placeholder: 'กรอกชื่อผู้ใช้',
      require: true,
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
    },
    {
      name: ['user', 'email'],
      label: 'อีเมลล์',
      placeholder: 'กรอกอีเมลล์',
      require: true,
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
      validator: (_: any, value: any) => {
        if (value === undefined || value === '') {
          return Promise.reject('');
        }
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
          return Promise.reject('อีเมลล์ติดต่อไม่ถูกต้อง');
        }
      },
    },
    {
      name: 'tel',
      label: 'เบอร์โทร',
      placeholder: 'กรอกเบอร์โทร',
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
      maxLength: 10,
      validator: (_: any, value: any) => {
        if (value === undefined || value === '') {
          return undefined;
        }
        if (!/^(06|08)[0-9]{8}$/.test(value)) {
          return Promise.reject('เบอร์โทรศัพท์ติดต่อไม่ถูกต้อง');
        }
      },
    },
    {
      icon: <TagFilled />,
      label: 'ข้อมูลที่อยู่',
      col: { xs: 24, sm: 24, md: 24, lg: 24, xl: 24 },
      type: 'LabelForm',
    },
    {
      name: 'address',
      label: 'ที่อยู่',
      require: true,
      placeholder: 'กรอกที่อยู่',
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: 'TextAreaFormField',
    },
    {
      name: 'subdistrict',
      label: 'แขวง/ตำบล',
      placeholder: 'กรอกแขวง/ตำบล',
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
    },
    {
      name: 'district',
      label: 'เขต/อำเภอ',
      placeholder: 'กรอกเขต/อำเภอ',
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
    },
    {
      name: 'province',
      label: 'จังหวัด',
      placeholder: 'กรอกจังหวัด',
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
    },
    {
      name: 'postalCode',
      label: 'รหัสไปรษณีย์',
      placeholder: 'รหัสไปรษณีย์',
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
      maxLength: 5,
      validator: (_: any, value: any) => {
        if (value === undefined || value === '') {
          return undefined;
        }
        if (!/^[0-9]{5}$/i.test(value)) {
          return Promise.reject('รหัสไปรษณีย์ไม่ถูกต้อง');
        }
      },
    },
    {
      name: 'country',
      label: 'ประเทศ',
      placeholder: 'กรอกประเทศ',
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: 'TextboxFormField',
    },
    {
      name: 'type',
      label: 'ที่อยู่ที่ลงทะเบียนไว้',
      placeholder: 'กรอกที่อยู่ที่ลงทะเบียนไว้',
      col: { xs: 24, sm: 24, md: 12, lg: 12, xl: 12 },
      type: 'TextAreaFormField',
    },
  ];

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
              <Col
                xs={{ span: 24, order: 2 }}
                sm={{ span: 24, order: 2 }}
                md={{ span: 24, order: 2 }}
                lg={{ span: 12, order: 1 }}
                xl={{ span: 12, order: 1 }}
              >
                <Row gutter={24}>
                  {renderForm.map((item: any) => {
                    return (
                      <DynamicForm
                        key={item.name}
                        name={item.name}
                        label={item.label}
                        placeholder={item.placeholder}
                        type={item.type}
                        col={item.col}
                        option={item.option}
                        icon={item.icon}
                        value={item.value}
                        disabled={item.disabled}
                        checked={item.checked}
                        maxLength={item.maxLength}
                      />
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CustomerCreate;
