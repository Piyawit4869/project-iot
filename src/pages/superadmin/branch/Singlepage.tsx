import { FormButtonsEdit } from '@src/components/shared/FormButtons';
import { DynamicForm } from '@src/forms';
import { Button, Col, Flex, Form, Row, Select, TimePicker } from 'antd';
// import React from 'react';
import {
  renderSingleBranchAddressForm,
  renderSingleBranchForm,
  renderSingleBranchSystemForm,
} from './renderForm';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useLoaderData } from 'react-router-dom';
import React from 'react';
import dayjs from 'dayjs';
// import { useOrganizationContext } from '@src/contexts/OrganizationContext';

export const BranchSingle = () => {
  const { branch } = useLoaderData() as any;
  const [form] = Form.useForm();
  const [addressForm] = Form.useForm();
  const [systemForm] = Form.useForm();
  const [type, setType] = React.useState('');

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
  const onAddressFinish = async (values: any) => {
    console.log(values);
  };

  const onSystemFinish = async (values: any) => {
    console.log(values);
  };

  React.useEffect(() => {
    let businessRegister = null;
    if (branch && branch.openingDate) {
      businessRegister = dayjs(branch.openingDate);
    }

    setType(branch.type);

    const branchMainAddress = branch.addresses.find(
      (item: any) => item.isMain === true,
    );
    const organizationMainSetting = branch.settings.find(
      (item: any) => item.active === true,
    );

    console.log({ organizationMainSetting });

    form.setFieldsValue({
      ...branch,
      openingDate: businessRegister,
      logoUrl: branch?.logoUrl
        ? [
            {
              url: branch?.logoUrl ? branch.logoUrl : '',
            },
          ]
        : undefined,
      file: branch?.logoUrl
        ? [
            {
              url: branch?.logoUrl ? branch.logoUrl : '',
            },
          ]
        : undefined,
    });

    addressForm.setFieldsValue({ ...branchMainAddress });
    systemForm.setFieldsValue({
      ...organizationMainSetting,
      openDays: organizationMainSetting?.openDays.map((item: any) => ({
        ...item,
        openTime: dayjs(item.open),
        closeTime: dayjs(item.close),
      })),
    });
  }, [form, branch]);

  return (
    <div>
      <FormButtonsEdit
        form={form}
        titleModalSubmit="คุณต้องการแก้ไขข้อมูลสาขา ใช่หรือไม่?"
        contentModalSubmit="ข้อมูลที่คุณกรอกจะถูกบันทึก"
        titleModalReset="คุณต้องการเคลียร์ข้อมูลสาขา ใช่หรือไม่?"
        contentModalReset="ข้อมูลที่คุณกรอกจะถูกเคลียร์"
        titleModalDelete="คุณต้องการลบข้อมูลสาขา ใช่หรือไม่?"
        contentModalDelete="ข้อมูลของคุณจะถูกลบหากกดยืนยัน"
      />
      <div
        style={{
          overflowX: 'hidden',
        }}
      >
        <Row gutter={[12, 12]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Row gutter={[20, 24]} style={{ paddingTop: '20px' }}>
                {renderSingleBranchForm.map((item: any, index: number) => {
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
                  );
                })}
              </Row>
            </Form>
          </Col>
        </Row>

        <Row gutter={[12, 12]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form
              form={addressForm}
              layout="vertical"
              onFinish={onAddressFinish}
            >
              <Row gutter={[20, 24]} style={{ paddingTop: '20px' }}>
                {renderSingleBranchAddressForm.map(
                  (item: any, index: number) => {
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
                        rule={item.rule}
                        option={item.options}
                        disabled={item.disabled}
                        checked={item.checked}
                        maxLength={item.maxLength}
                        defaultValue={item.defaultValue}
                      />
                    );
                  },
                )}
              </Row>
              <Flex justify="end">
                <Button htmlType="submit" type="primary">
                  บันทึกข้อมูลที่อยู่
                </Button>
              </Flex>
            </Form>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form form={systemForm} layout="vertical" onFinish={onSystemFinish}>
              <Row gutter={[20, 24]} style={{ paddingTop: '20px' }}>
                {renderSingleBranchSystemForm.map(
                  (item: any, index: number) => {
                    return (
                      <DynamicForm
                        key={index}
                        name={item.name}
                        label={item.label}
                        placeholder={item.placeholder}
                        type={item.type}
                        col={item.col}
                        value={item.value}
                        rule={item.rule}
                        option={item.options}
                        defaultValue={item.defaultValue}
                        icon={item.icon}
                        disabled={item.disabled}
                        checked={item.checked}
                      />
                    );
                  },
                )}
                <Col span={24}>
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
                                    message:
                                      'กรุณาเลือกวันที่ทำงานช่วงเวลานี้!',
                                  },
                                ]}
                                style={{ flex: 1, marginRight: 8 }}
                              >
                                <Select
                                  mode="multiple"
                                  placeholder="เลือกวันทำงาน"
                                >
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
              <Flex justify="end">
                <Button htmlType="submit" type="primary">
                  บันทึกการตั้งค่า
                </Button>
              </Flex>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};
