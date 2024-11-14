import { FormButtonsCreate } from '@src/components/shared/FormButtons';
import { Button, Col, Form, Row, Select, TimePicker } from 'antd';
import React from 'react';
import {
  redirect,
  // useSubmit
} from 'react-router-dom';
import {
  renderCreateBranchForm,
  renderCreateBranchSettingForm,
  renderCreateBranchUserForm,
} from '../branch/renderForm';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { DynamicForm } from '@src/forms';

export const BranchCreate = () => {
  const [form] = Form.useForm();
  // const submit = useSubmit();

  // Check path by role
  React.useEffect(() => {
    const me = JSON.parse(localStorage.getItem('me') as any);
    if (me.role.name !== 'super_admin') {
      redirect('/');
    }
  }, []);

  const [type, setType] = React.useState('');
  const [generateUser, setGenerateUser] = React.useState(false);

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const defaultValue = {
    active: true,
    fromType: 'OrdinaryPerson',
    status: 'NewlyRegistered',
    registerVat: true,
    generateUser: false,
    setting: {
      defaultLanguage: 'TH',
      theme: 'light',
      textDisplay: 'normal',
    },
  };

  const onFinish = async (values: any) => {
    console.log(values);
  };

  const handleValuesChange = (changedValues: any) => {
    if (changedValues.type) {
      setType(changedValues.type);
    }
    if (changedValues.generateUser) {
      setGenerateUser(false);
    } else {
      setGenerateUser(true);
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
          titleModalReset="คุณต้องการเคลียร์ข้อมูลสาขา ใช่หรือไม่?"
          contentModalReset="ข้อมูลที่คุณกรอกจะถูกเคลียร์"
          titleModalSubmit="คุณต้องการสร้างข้อมูลสาขา ใช่หรือไม่?"
          contentModalSubmit="ข้อมูลที่คุณกรอกจะถูกบันทึก"
        />

        <div
          style={{
            overflowX: 'hidden',
          }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Row gutter={[20, 24]} style={{ paddingTop: '20px' }}>
                {renderCreateBranchForm.map((item: any, index: number) => (
                  <DynamicForm
                    key={index}
                    name={item.name}
                    label={item.label}
                    placeholder={item.placeholder}
                    type={item.type}
                    col={item.col}
                    icon={item.icon}
                    value={item.value}
                    rule={item.rules}
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
                    nameRadio={item.nameRadio}
                    labelRadio={item.labelRadio}
                    isBranch={item.isBranch}
                  />
                ))}
              </Row>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Row gutter={[20, 24]} style={{ paddingTop: '20px' }}>
                {generateUser ? (
                  renderCreateBranchUserForm.map((item: any, index: number) => (
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
                  ))
                ) : (
                  <></>
                )}
                {renderCreateBranchSettingForm.map(
                  (item: any, index: number) => (
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
                  ),
                )}
              </Row>
              <Form.List name={['organization', 'setting', 'openDays']}>
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
                            <TimePicker
                              placeholder="เวลางานเริ่ม"
                              format="HH:mm"
                            />
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
                            <TimePicker
                              placeholder="เวลางานเลิก"
                              format="HH:mm"
                            />
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
            </Col>
          </Row>
        </div>
      </Form>
    </div>
  );
};
