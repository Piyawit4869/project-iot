import * as API from '@src/apis';
import { redirect, useLoaderData, useSubmit } from 'react-router-dom';
import { Button, notification, Form, Col, Row, TimePicker, Select } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import vine, { errors } from '@vinejs/vine';
import {
  FormButtonsSetting,
  FormButtonsSystemSetting,
} from '@src/components/shared/FormButtons';
import { DynamicForm } from '@src/forms';
import {
  renderSettingData,
  renderSystemSetting,
} from '../../superadmin/organize/renderForm';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

export async function organizeSingleLoader() {
  try {
    const setting = await API.organize.getSetting();

    return {
      setting: setting.data.data,
    };
  } catch (error) {
    return { organize: {}, params: [] };
  }
}

export async function organizeSingleAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);
  const me = JSON.parse(localStorage.getItem('me') as any);

  switch (submitData.action) {
    case 'edit':
      try {
        await API.organize.update(
          me.organizationId,
          JSON.parse(submitData.data),
        );
        notification['success']({
          message: 'แก้ไขข้อมูลองค์กรเสร็จสิ้น',
          placement: 'bottomRight',
          duration: 3,
        });
        return redirect(`/information`);
      } catch (error) {
        notification['error']({
          message: 'แก้ไขข้อมูลองค์กรล้มเหลว',
          placement: 'bottomRight',
          duration: 3,
        });
        return {
          data: {
            action: 'create',
            status: 'error',
            message: 'Organize Created Failed !',
          },
        };
      }
    case 'update':
      try {
        await API.organize.updateSystem(JSON.parse(submitData.data));
        notification['success']({
          message: 'แก้ไขข้อมูลองค์กรเสร็จสิ้น',
          placement: 'bottomRight',
          duration: 3,
        });
        return redirect(`/information`);
      } catch (error) {
        notification['error']({
          message: 'แก้ไขข้อมูลองค์กรล้มเหลว',
          placement: 'bottomRight',
          duration: 3,
        });
        return {
          data: {
            action: 'create',
            status: 'error',
            message: 'Organize Created Failed !',
          },
        };
      }

    default:
      break;
  }
}

export const OrganizeSingle: React.FC = () => {
  const { setting } = useLoaderData() as any;
  const [settingForm] = Form.useForm();
  const [systemForm] = Form.useForm();
  const submit = useSubmit();
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const [type, setType] = React.useState('');

  const schemaUpdateOrg = vine.object({
    nameTh: vine.string(),
    nameEn: vine.string(),
    taxId: vine.string(),
    active: vine.boolean(),
    status: vine.enum([
      'NewlyRegistered',
      'ActiveUser',
      'LoyalCustomer',
      'AtRisk',
      'Churned',
    ]),
    fromType: vine.enum(['OrdinaryPerson', 'JuristicPerson']),
    type: vine.enum([
      'Taxpayer',
      'OrdinaryPartnership',
      'Shop',
      'BodyOfPerson',
      'CompanyLimited',
      'PublicCompanyLimited',
      'LimitedPartnership',
      'Foundation',
      'Association',
      'JointVenture',
      'Others',
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
  });

  const onFinish = async (values: any) => {
    const validator = vine.compile(schemaUpdateOrg);
    try {
      const payload = { ...values };
      if (!payload.active) {
        payload.active = true;
      }

      if (values.file && values.file.length > 0) {
        if (values.file[0].url) {
          payload.logoUrl = values.file[0].url;
          delete payload.file;
        } else {
          values.logoUrl = values.file[0].response?.url;
          delete payload.file;
        }
      } else {
        payload.logoUrl = null;
        delete payload.file;
      }

      payload.openingDate = dayjs(payload.openingDate).toISOString();

      await validator.validate(payload);

      await submit(
        { data: JSON.stringify(payload), action: 'edit' },
        { method: 'put' },
      );
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        console.log(error.messages);

        notification.error({
          message: 'แก้ไขข้อมูลองค์กรเสร็จสิ้น',
          placement: 'bottomRight',
          duration: 3,
        });
      } else {
        notification.error({
          message: 'ข้อมูลไม่ถูกต้อง',
          placement: 'bottomRight',
          duration: 3,
        });
      }
    }
  };

  const onSystemFinish = async (values: any) => {
    try {
      const payload = { ...values };

      if (payload.openDays && Array.isArray(payload.openDays)) {
        payload.openDays = payload.openDays.map((dayItem: any) => ({
          ...dayItem,
          open: dayjs(dayItem.open).format('HH:mm'),
          close: dayjs(dayItem.close).format('HH:mm'),
        }));
      }

      if (!payload.active) {
        payload.active = true;
      }

      await submit(
        { data: JSON.stringify(payload), action: 'update' },
        { method: 'put' },
      );
    } catch (error) {
      notification.error({
        message: 'แก้ไขข้อมูลองค์กรเสร็จสิ้น',
        placement: 'bottomRight',
        duration: 3,
      });
    }
  };

  const handleValuesChange = (changedValues: any) => {
    if (changedValues.type) {
      setType(changedValues.type);
    }
  };

  React.useEffect(() => {
    let businessRegister = null;
    const organize = setting?.organization;
    if (organize && organize.openingDate) {
      businessRegister = dayjs(organize.openingDate);
    }

    setType(organize?.type);

    settingForm.setFieldsValue({
      ...organize,
      openingDate: businessRegister,
      logoUrl: organize?.logoUrl
        ? [
            {
              url: organize?.logoUrl ? organize.logoUrl : '',
            },
          ]
        : undefined,
      file: organize?.logoUrl
        ? [
            {
              url: organize?.logoUrl ? organize.logoUrl : '',
            },
          ]
        : undefined,
    });
    systemForm.setFieldsValue({
      ...setting,
      openDays: setting?.openDays.map((item: any) => ({
        ...item,
        open: dayjs(item.open, 'HH:mm'),
        close: dayjs(item.close, 'HH:mm'),
      })),
    });
  }, [settingForm, systemForm, setting]);

  return (
    <div>
      <div
        style={{
          maxHeight: '74vh',
          minHeight: '50vh',
          height: '100%',
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        <Row gutter={[12, 12]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form
              form={settingForm}
              layout="vertical"
              onFinish={onFinish}
              onValuesChange={handleValuesChange}
            >
              <FormButtonsSetting
                form={settingForm}
                titleModalSubmit="คุณต้องการแก้ไขข้อมูลองค์กร ใช่หรือไม่?"
                contentModalSubmit="ข้อมูลที่คุณกรอกจะถูกบันทึก"
              />
              <Row gutter={[20, 24]} style={{ paddingTop: '20px' }}>
                {renderSettingData.map((item: any, index: number) => {
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
                      form={settingForm}
                      checkedText={item.checkedText}
                      unCheckedText={item.unCheckedText}
                    />
                  );
                })}
              </Row>
            </Form>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <Form form={systemForm} layout="vertical" onFinish={onSystemFinish}>
              <FormButtonsSystemSetting
                form={systemForm}
                titleModalSubmit="คุณต้องการแก้ไขตั้งค่าองค์กร ใช่หรือไม่?"
                contentModalSubmit="ตั้งค่าที่คุณกรอกจะถูกบันทึก"
              />
              <Row gutter={[20, 24]} style={{ paddingTop: '20px' }}>
                {renderSystemSetting.map((item: any, index: number) => {
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
                      form={systemForm}
                      checkedText={item.checkedText}
                      unCheckedText={item.unCheckedText}
                    />
                  );
                })}
                <Col span={24}>
                  <Form.List name="openDays">
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
                                name={[field.name, 'open']}
                                fieldKey={[field.fieldKey, 'open']}
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
                                name={[field.name, 'close']}
                                fieldKey={[field.fieldKey, 'close']}
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
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};
