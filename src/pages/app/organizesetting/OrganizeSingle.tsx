import { useFetcher, useLoaderData } from 'react-router-dom';
import { Button, Form, Col, Row, TimePicker, Select } from 'antd';
import React from 'react';
import dayjs from 'dayjs';
import {
  renderAddressSetting,
  renderSettingData,
  renderSystemSetting,
} from '../../superadmin/organize/renderForm';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import { FormButtonsSetting } from '@src/components/shared/FormButtons';
import { FormFields } from '@src/forms';

interface TypeOfUniqError {
  name: string;
  status: string;
  uniqError: boolean;
  errorMessage: string;
}

export const OrganizeSingle: React.FC = () => {
  const { setting } = useLoaderData() as any;
  const fetcher = useFetcher();
  const [form] = Form.useForm();
  const [addressForm] = Form.useForm();
  const [systemForm] = Form.useForm();

  const [uniqError, setUniqError] = React.useState<TypeOfUniqError[]>([]);

  // const submit = useSubmit();
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

  const onAddressFinish = async (values: any) => {
    console.log(values);
  };

  const onFinish = async (values: any) => {
    console.log(values);

    // const validator = vine.compile(schemaUpdateOrg);
    // try {
    //   const payload = { ...values };
    //   if (!payload.active) {
    //     payload.active = true;
    //   }
    //   if (values.file && values.file.length > 0) {
    //     if (values.file[0].url) {
    //       payload.logoUrl = values.file[0].url;
    //       delete payload.file;
    //     } else {
    //       values.logoUrl = values.file[0].response?.url;
    //       delete payload.file;
    //     }
    //   } else {
    //     payload.logoUrl = null;
    //     delete payload.file;
    //   }
    //   payload.openingDate = dayjs(payload.openingDate).toISOString();
    //   await validator.validate(payload);
    //   await submit(
    //     { data: JSON.stringify(payload), action: 'edit' },
    //     { method: 'put' },
    //   );
    // } catch (error) {
    //   if (error instanceof errors.E_VALIDATION_ERROR) {
    //     console.log(error.messages);
    //     notification.error({
    //       message: 'แก้ไขข้อมูลองค์กรเสร็จสิ้น',
    //       placement: 'bottomRight',
    //       duration: 3,
    //     });
    //   } else {
    //     notification.error({
    //       message: 'ข้อมูลไม่ถูกต้อง',
    //       placement: 'bottomRight',
    //       duration: 3,
    //     });
    //   }
    // }
  };

  const onSystemFinish = async (values: any) => {
    console.log(values);

    // try {
    //   const payload = { ...values };

    //   if (payload.openDays && Array.isArray(payload.openDays)) {
    //     payload.openDays = payload.openDays.map((dayItem: any) => ({
    //       ...dayItem,
    //       open: dayjs(dayItem.open).format('HH:mm'),
    //       close: dayjs(dayItem.close).format('HH:mm'),
    //     }));
    //   }

    //   if (!payload.active) {
    //     payload.active = true;
    //   }

    //   await submit(
    //     { data: JSON.stringify(payload), action: 'update' },
    //     { method: 'put' },
    //   );
    // } catch (error) {
    //   notification.error({
    //     message: 'แก้ไขข้อมูลองค์กรเสร็จสิ้น',
    //     placement: 'bottomRight',
    //     duration: 3,
    //   });
    // }
  };

  const handleFormChange = React.useCallback(
    debounce((changedValues: any) => {
      if (changedValues?.type) {
        setType(changedValues.type);
      }
      const allowedFields = ['nameTh', 'nameEn', 'taxId'];
      const lastChangedKey = Object.keys(changedValues || {})[0];
      const lastChangedValue = changedValues?.[lastChangedKey];

      if (
        lastChangedKey &&
        lastChangedValue &&
        allowedFields.includes(lastChangedKey)
      ) {
        const fullName = lastChangedKey;
        // Set temporary validation status
        setUniqError((prev: any) => [
          ...prev.filter((error: any) => error.name !== fullName),
          {
            name: fullName,
            status: '', // Temporary status for ongoing validation
            uniqError: false,
            errorMessage: '',
          },
        ]);
        const queryParams = new URLSearchParams({
          [lastChangedKey]: lastChangedValue,
        }).toString();

        // Trigger API call
        fetcher.load(`/admin/organization/find?${queryParams}`);
      }
    }, 300),
    [fetcher],
  );

  React.useEffect(() => {
    let businessRegister = null;
    const organize = setting?.organization;
    if (organize && organize.openingDate) {
      businessRegister = dayjs(organize.openingDate);
    }

    setType(organize?.type);

    // const address = organize?.addresses.find(
    //   (item: any) => item.isMain === true,
    // );

    form.setFieldsValue({
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
    // addressForm.setFieldsValue({ ...address });
    systemForm.setFieldsValue({
      ...setting,
      openDays: [],
      // openDays: setting?.openDays.map((item: any) => ({
      //   ...item,
      //   open: dayjs(item.open, 'HH:mm'),
      //   close: dayjs(item.close, 'HH:mm'),
      // })),
    });
  }, [form, systemForm, setting]);

  React.useEffect(() => {
    if (fetcher?.data) {
      const { org, name } = fetcher.data; // Ensure `entity` is returned (organization or branch)

      if (org?.length) {
        setUniqError((prev: any) => {
          const updatedErrors = prev.map((item: any) =>
            item.name === name
              ? {
                  ...item,
                  name: name,
                  status: 'error',
                  uniqError: true,
                  errorMessage: `The value for ${name}  already exists.`,
                }
              : item,
          );

          return updatedErrors;
        });
      } else {
        // Clear errors for the specific field
        setUniqError((prev: any) => {
          const otherUniq = prev.filter(
            (item: any) =>
              item.name !== name && {
                name: name,
                status: '',
                uniqError: false,
                errorMessage: '',
              },
          );

          return otherUniq;
        });
      }
    }
  }, [fetcher?.data]);

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={(changedValues: any) => {
          handleFormChange(changedValues);
        }}
      >
        <FormButtonsSetting
          form={form}
          titleModalSubmit="คุณต้องการแก้ไขข้อมูลองค์กร ใช่หรือไม่?"
          contentModalSubmit="ข้อมูลที่คุณกรอกจะถูกบันทึก"
        />

        <Row gutter={[12, 12]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <FormFields
              renderForm={renderSettingData}
              form={form}
              uniqError={uniqError}
              type={type}
            />
          </Col>
        </Row>
      </Form>
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form form={addressForm} layout="vertical" onFinish={onAddressFinish}>
            <FormFields renderForm={renderAddressSetting} form={addressForm} />
          </Form>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form form={systemForm} layout="vertical" onFinish={onSystemFinish}>
            <FormFields renderForm={renderSystemSetting} form={systemForm} />

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
          </Form>
        </Col>
      </Row>
    </div>
  );
};
