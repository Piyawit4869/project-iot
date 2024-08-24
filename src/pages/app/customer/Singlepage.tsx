import { TagFilled } from '@ant-design/icons';
import { Form, Button, Row, Col, Timeline } from 'antd';
import { DynamicForm } from '@src/forms/Dynamic';
import { useRef, useState } from 'react';
import { FormButtonsEdit } from '@src/components/shared/FormButtons';

export const CustomerSingle = () => {
  const [form] = Form.useForm();
  const containerRef = useRef(null);
  const [showMore, setShowMore] = useState(false);

  const renderForm = [
    {
      label: 'แก้ไขข้อมูลลูกค้า',
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

  const timelineItems = [
    'Create a services site 2015-09-01',
    'Solve initial network problems 2015-09-01',
    'Technical testing 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
    'Network problems being solved 2015-09-01',
  ];

  const onFinish = (values: any) => {
    const payload = Object.assign(values);
    console.log('Form Submitted', payload);
  };

  return (
    <div>
      <FormButtonsEdit form={form} />

      <div style={{ fontFamily: 'Prompt, sans-serif' }}>
        <div style={{ padding: '20px', marginTop: '10px' }} ref={containerRef}>
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
                      disabled={false}
                      checked={false}
                      maxLength={item.maxLength}
                    />
                  ))}
                </Row>
              </Col>
              <Col
                xs={{ span: 24, order: 2 }}
                sm={{ span: 24, order: 2 }}
                md={{ span: 24, order: 2 }}
                lg={{ span: 12, order: 1 }}
                xl={{ span: 12, order: 1 }}
              >
                <div style={{ height: '100px' }}>
                  <h1>กิจกรรม</h1>
                </div>
                <div
                  style={{
                    maxHeight: '400px',
                    overflowY: 'auto',
                    padding: '40px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                  }}
                >
                  <Timeline>
                    {(showMore ? timelineItems : timelineItems.slice(0, 5)).map(
                      (item, index) => (
                        <Timeline.Item key={index}>{item}</Timeline.Item>
                      ),
                    )}
                  </Timeline>
                  {timelineItems.length > 10 && (
                    <div style={{ textAlign: 'right', marginTop: '10px' }}>
                      <Button
                        type="link"
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore ? 'See Less' : 'See More'}
                      </Button>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Form>

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
                  {renderForm.map((item: any) => (
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
                    />
                  ))}
                </Row>
              </Col>
              <Col
                xs={{ span: 24, order: 2 }}
                sm={{ span: 24, order: 2 }}
                md={{ span: 24, order: 2 }}
                lg={{ span: 12, order: 1 }}
                xl={{ span: 12, order: 1 }}
              >
                <div style={{ height: '100px' }}>
                  <h1>กิจกรรม</h1>
                </div>
                <div
                  style={{
                    maxHeight: '400px',
                    overflowY: 'auto',
                    padding: '40px',
                    border: '1px solid #d9d9d9',
                    borderRadius: '4px',
                  }}
                >
                  <Timeline>
                    {(showMore ? timelineItems : timelineItems.slice(0, 5)).map(
                      (item, index) => (
                        <Timeline.Item key={index}>{item}</Timeline.Item>
                      ),
                    )}
                  </Timeline>
                  {timelineItems.length > 10 && (
                    <div style={{ textAlign: 'right', marginTop: '10px' }}>
                      <Button
                        type="link"
                        onClick={() => setShowMore(!showMore)}
                      >
                        {showMore ? 'See Less' : 'See More'}
                      </Button>
                    </div>
                  )}
                </div>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CustomerSingle;
