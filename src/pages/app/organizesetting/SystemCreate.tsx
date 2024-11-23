import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormButtonsCreate } from '@src/components/shared/FormButtons';
import { FormFields } from '@src/forms';
import { renderSetting } from '@src/pages/superadmin/organize/renderForm';
import { Button, Col, Form, Row, Select, TimePicker, Typography } from 'antd';

export const SystemCreate = () => {
  const [form] = Form.useForm();

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const onFinish = async (values: any) => {
    console.log(values);
  };

  return (
    <>
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <FormButtonsCreate
          form={form}
          titleModalReset="คุณต้องการเคลียร์ข้อมูลการตั้งค่าองค์กร ใช่หรือไม่?"
          contentModalReset="ข้อมูลที่คุณกรอกจะถูกเคลียร์"
          titleModalSubmit="คุณต้องการสร้างข้อมูลที่อยู่การตั้งค่าองค์กร ใช่หรือไม่?"
          contentModalSubmit="ข้อมูลที่คุณกรอกจะถูกบันทึก"
        />
        <Typography.Title level={3}>สร้างการตั้งค่าใหม่</Typography.Title>
        <FormFields renderForm={renderSetting} form={form} />
        <Form.List name={'openDays'}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field: any) => (
                <Row
                  justify="space-between"
                  align="middle"
                  key={field.key}
                  style={{ display: 'flex', marginBottom: 8 }}
                >
                  <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'day']}
                      fieldKey={[field.fieldKey, 'day']}
                      label="วัน"
                      rules={[
                        {
                          required: true,
                          message: 'กรุณาเลือกวันที่ทำงานช่วงเวลานี้!',
                        },
                      ]}
                      style={{ flex: 1, marginRight: 8 }}
                    >
                      <Select mode="multiple" placeholder="เลือกวันทำงาน">
                        {daysOfWeek.map((day) => (
                          <Select.Option key={day} value={day}>
                            {day}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={10} sm={10} md={10} lg={5} xl={5}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'openTime']}
                      fieldKey={[field.fieldKey, 'openTime']}
                      label="เริ่มงาน"
                      rules={[
                        {
                          required: true,
                          message: 'กรุณาเลือกเวลาที่งานเริ่ม!',
                        },
                      ]}
                      style={{ flex: 1, marginRight: 8 }}
                    >
                      <TimePicker placeholder="เวลางานเริ่ม" format="HH:mm" />
                    </Form.Item>
                  </Col>
                  <Col xs={10} sm={10} md={10} lg={5} xl={5}>
                    <Form.Item
                      {...field}
                      name={[field.name, 'closeTime']}
                      fieldKey={[field.fieldKey, 'closeTime']}
                      label="เลิกงาน"
                      rules={[
                        {
                          required: true,
                          message: 'กรุณาเลือกเวลาที่งานเลิก!',
                        },
                      ]}
                      style={{ flex: 1, marginRight: 8 }}
                    >
                      <TimePicker placeholder="เวลางานเลิก" format="HH:mm" />
                    </Form.Item>
                  </Col>
                  <Col xs={4} sm={4} md={4} lg={2} xl={2} span={2}>
                    <MinusCircleOutlined
                      style={{ alignSelf: 'center' }}
                      onClick={() => remove(field.name)}
                    />
                  </Col>
                </Row>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  เพิ่มวันทำงาน
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </>
  );
};
