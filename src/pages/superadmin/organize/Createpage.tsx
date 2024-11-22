import React from 'react';
import { Button, Col, Form, notification, Row, Select, TimePicker } from 'antd';
import { redirect, useFetcher, useSubmit } from 'react-router-dom';
import { FormButtonsCreate } from '@src/components/shared/FormButtons';
import vine, { errors } from '@vinejs/vine';
import dayjs from 'dayjs';
import { schemaCreateOrg } from './schema';
import {
  renderCreateBranchForm,
  renderCreateForm,
  renderCreateSettingForm,
  renderCreateSettingฺBranchForm,
} from './renderForm';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';
import { FormFields } from '@src/forms';

interface TypeOfUniqError {
  name: string;
  status: string;
  uniqError: boolean;
  errorMessage: string;
}

export const OrganizeCreate: React.FC = () => {
  const [form] = Form.useForm();
  const submit = useSubmit();
  const fetcher = useFetcher();

  const [type] = React.useState('');
  const [uniqError, setUniqError] = React.useState<TypeOfUniqError[]>([]);

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
    organization: {
      active: true,
      fromType: 'ordinary_person',
      status: 'newly_registered',
      registerVat: true,
      setting: {
        defaultLanguage: 'th',
        theme: 'light',
        textDisplay: 'normal',
      },
    },
    branch: {
      active: true,
      fromType: 'ordinary_person',
      status: 'newly_registered',
      registerVat: true,
      setting: {
        defaultLanguage: 'th',
        theme: 'light',
        textDisplay: 'normal',
      },
    },
  };

  const onFinish = async (values: any) => {
    try {
      const payload = Object.assign(values);
      payload.organization.setting.active = true;
      payload.branch.setting.active = true;

      payload.organization.address.active = true;
      payload.branch.address.active = true;
      payload.organization.address.isMain = true;
      payload.branch.address.isMain = true;
      payload.organization.address.language = 'th';
      payload.branch.address.language = 'th';

      payload.organization.user.active = true;
      payload.branch.user.active = true;
      payload.organization.user.status = 'active';
      payload.branch.user.status = 'active';

      if (values.file1 && values.file1.length > 0) {
        if (values.file1[0].url) {
          payload.organization.logoUrl = values.file1[0].url;
          delete payload.file1;
        } else {
          values.organization.logoUrl = values.file1[0].response?.url;
          delete payload.file1;
        }
      } else {
        payload.logoUrl = null;
        delete payload.file;
      }

      if (values.file2 && values.file2.length > 0) {
        if (values.file2[0].url) {
          payload.branch.logoUrl = values.file2[0].url;
          delete payload.file2;
        } else {
          values.branch.logoUrl = values.file2[0].response?.url;
          delete payload.file2;
        }
      } else {
        payload.logoUrl = null;
        delete payload.file;
      }

      if (payload.organization.openingDate) {
        payload.organization.openingDate = dayjs(
          values.organization.openingDate,
        ).toISOString();
      }

      if (payload.organization.user.profile.birthDate) {
        payload.organization.user.profile.birthDate = dayjs(
          values.organization.user.profile.birthDate,
        ).toISOString();
      }

      if (
        values.organization.setting.openDays &&
        values.organization.setting.openDays.length
      ) {
        const organizationOpenDays = values.organization.setting.openDays.map(
          (item: any) => {
            const closeTime = dayjs(item.closeTime).format('HH:mm');
            const openTime = dayjs(item.openTime).format('HH:mm');
            const isOpen = true;
            return { ...item, closeTime, openTime, isOpen };
          },
        );

        payload.organization.setting.openDays = organizationOpenDays;
      }

      if (payload.branch.openingDate) {
        payload.branch.openingDate = dayjs(
          values.branch.openingDate,
        ).toISOString();
      }

      if (payload.branch.user.profile.birthDate) {
        payload.branch.user.profile.birthDate = dayjs(
          values.branch.user.profile.birthDate,
        ).toISOString();
      }

      if (
        values.branch.setting.openDays &&
        values.branch.setting.openDays.length
      ) {
        const branchOpenDays = values.branch.setting.openDays.map(
          (item: any) => {
            const closeTime = dayjs(item.closeTime).format('HH:mm');
            const openTime = dayjs(item.openTime).format('HH:mm');
            const isOpen = true;
            return { ...item, closeTime, openTime, isOpen };
          },
        );

        payload.branch.setting.openDays = branchOpenDays;
      }

      // Compile the main schema for validation
      const validator = vine.compile(schemaCreateOrg);

      // Validate the entire form payload
      await validator.validate(payload);

      submit({ data: JSON.stringify(payload) }, { method: 'post' });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        notification.error({
          message: 'สร้างองค์กรล้มเหลว',
          placement: 'bottomRight',
          description: 'ข้อมูลไม่ถูกต้องกรุณาลองตรวจเช็คความเรียบร้อย',
        });
      } else {
        notification.error({
          message: 'พบปัญหาในระบบ',
          placement: 'bottomRight',
          description: `กรุณาติดต่อทีมงาน`,
        });
      }
    }
  };

  const handleFormChange = React.useCallback(
    debounce((changedValues: any) => {
      const allowedFields = ['nameTh', 'nameEn', 'taxId'];

      const lastChangedKey = Object.keys(
        changedValues.organization
          ? changedValues.organization
          : changedValues.branch || {},
      )[0];
      const lastChangedValue = changedValues.organization
        ? changedValues.organization?.[lastChangedKey]
        : changedValues.branch?.[lastChangedKey];

      const lastChangedEntity: any = changedValues.organization
        ? 'organization'
        : changedValues.branch
        ? 'branch'
        : null;

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

        // Prepare query params for the last changed field only
        const queryParams = new URLSearchParams({
          [lastChangedKey]: lastChangedValue,
          entry: lastChangedEntity,
        }).toString();

        // Trigger API call
        fetcher.load(`/admin/organization/find?${queryParams}`);
      }
    }, 300), // Adjust debounce time as needed
    [fetcher],
  );

  React.useEffect(() => {
    if (fetcher?.data) {
      const { org, name, entry } = fetcher.data;

      if (org?.length) {
        setUniqError((prev: any) => {
          const updatedErrors = prev.map((item: any) =>
            item.name === name
              ? {
                  ...item,
                  name: `${entry}.${name}`,
                  status: 'error',
                  uniqError: true,
                  errorMessage: `The value for ${name} in ${entry} already exists.`,
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
              item.name !== `${entry}.${name}` && {
                name: `${entry}.${name}`,
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

  // Check path by role
  React.useEffect(() => {
    const me = JSON.parse(localStorage.getItem('me') as any);
    if (me.role.name !== 'super_admin') {
      redirect('/');
    }
  }, []);

  return (
    <div>
      <Form
        form={form}
        initialValues={defaultValue}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={(changedValues: any) => {
          handleFormChange(changedValues);
        }}
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
            overflowX: 'hidden',
          }}
        >
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <FormFields
                renderForm={renderCreateForm}
                form={form}
                uniqError={uniqError}
                // isUniq={uniqError.uniqError}
                // status={uniqError.status}
                type={type}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <FormFields renderForm={renderCreateSettingForm} form={form} />

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

            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <FormFields
                renderForm={renderCreateBranchForm}
                form={form}
                uniqError={uniqError}
                // isUniq={uniqError.uniqError}
                // status={uniqError.status}
                type={type}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <FormFields
                renderForm={renderCreateSettingฺBranchForm}
                form={form}
                uniqError={uniqError}
              />

              <Form.List name={['branch', 'setting', 'openDays']}>
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
