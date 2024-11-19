import { FormButtonsCreate } from '@src/components/shared/FormButtons';
import { Button, Col, Form, notification, Row, Select, TimePicker } from 'antd';
import React from 'react';
import {
  redirect,
  useFetcher,
  useLocation,
  useSubmit,
  // useSubmit
} from 'react-router-dom';
import {
  renderCreateBranchForm,
  renderCreateBranchSettingForm,
  renderCreateBranchUserForm,
} from '../branch/renderForm';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { FormFields } from '@src/forms';
import { debounce } from 'lodash';
import dayjs from 'dayjs';
import vine, { errors } from '@vinejs/vine';
import { schemaCreateBranch } from './schema';

export const BranchCreate = () => {
  const [form] = Form.useForm();
  const submit = useSubmit();
  const fetcher = useFetcher();
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);
  const modifiedPathnames =
    pathnames[0] === 'admin' ? pathnames.slice(1) : pathnames;

  const [uniqError, setUniqError] = React.useState({
    status: '',
    uniqError: false,
    errorMessage: '',
  });

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
    isMain: true,
    fromType: 'ordinary_person',
    status: 'newly_registered',
    registerVat: true,
    isCreateUser: true,
    setting: {
      defaultLanguage: 'th',
      theme: 'light',
      textDisplay: 'normal',
    },
  };

  const onFinish = async (values: any) => {
    try {
      const payload = Object.assign(values);
      payload.organizationId = modifiedPathnames[1];
      payload.setting.active = true;
      payload.address.active = true;
      payload.address.isMain = true;
      payload.address.language = 'th';
      payload.user.active = true;
      payload.user.status = 'active';

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

      if (payload.openingDate) {
        payload.openingDate = dayjs(values.openingDate).toISOString();
      }

      if (payload.user.profile.birthDate) {
        payload.user.profile.birthDate = dayjs(
          values.user.profile.birthDate,
        ).toISOString();
      }

      if (values.setting.openDays && values.setting.openDays.length) {
        const branchOpenDays = values.setting.openDays.map((item: any) => {
          const closeTime = dayjs(item.closeTime).format('HH:mm');
          const openTime = dayjs(item.openTime).format('HH:mm');
          const isOpen = true;
          return { ...item, closeTime, openTime, isOpen };
        });

        payload.setting.openDays = branchOpenDays;
      }

      // Compile the main schema for validation
      const validator = vine.compile(schemaCreateBranch);

      // Validate the entire form payload
      await validator.validate(payload);

      submit({ data: JSON.stringify(payload) }, { method: 'post' });
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        console.log({ error });

        notification.error({
          message: 'สร้างสาขาล้มเหลว',
          placement: 'bottomRight',
          description: 'ข้อมูลไม่ถูกต้องกรุณาลองตรวจเช็คความเรียบร้อย',
          duration: 3,
        });
      } else {
        console.log({ error });
        notification.error({
          message: 'พบปัญหาในระบบ',
          placement: 'bottomRight',
          description: `กรุณาติดต่อทีมงาน`,
          duration: 3,
        });
      }
    }
  };

  const handleFormChange = React.useCallback(
    debounce((changedValues: any, allValues: any) => {
      if (changedValues?.type) {
        setType(changedValues.type);
      }

      if (changedValues.isCreateUser) {
        setGenerateUser(false);
      } else {
        setGenerateUser(true);
      }

      const nameTh = changedValues?.nameTh || '';
      // const nameEn = changedValues.organization?.nameEn || '';
      // const taxId = changedValues.organization?.taxId || '';

      if (nameTh.length > 0 && nameTh.length <= 5) {
        setUniqError({
          status: 'error',
          uniqError: true,
          errorMessage: 'Name must be longer than 5 characters.',
        });
      } else if (nameTh.length === 0) {
        setUniqError({
          status: '',
          uniqError: false,
          errorMessage: 'Name is required.',
        });
      } else {
        setUniqError({
          status: 'success',
          uniqError: false,
          errorMessage: '',
        });
      }

      // if (nameEn.length > 0 && nameEn.length <= 5) {
      //   setUniqError({
      //     status: 'error',
      //     uniqError: true,
      //     errorMessage: 'Name must be longer than 5 characters.',
      //   });
      // } else if (nameEn.length === 0) {
      //   setUniqError({
      //     status: '',
      //     uniqError: false,
      //     errorMessage: 'Name is required.',
      //   });
      // } else {
      //   setUniqError({
      //     status: 'success',
      //     uniqError: false,
      //     errorMessage: '',
      //   });
      // }

      // if (taxId.length === 13) {
      //   setUniqError({
      //     status: 'error',
      //     uniqError: true,
      //     errorMessage: '',
      //   });
      // } else {
      //   setUniqError({
      //     status: 'success',
      //     uniqError: false,
      //     errorMessage: '',
      //   });
      // }

      // Query parameters and API call
      const buildQueryParams = (data: any) => {
        const allowedFields = ['nameTh', 'nameEn', 'taxId'];
        const params: Record<string, string> = {};

        const extractFields = (obj: any) => {
          Object.keys(obj).forEach((key) => {
            if (allowedFields.includes(key) && obj[key]) {
              params[key] = obj[key];
            }
          });
        };

        if (data) {
          extractFields(data);
        }

        return params;
      };

      const queryParams = buildQueryParams(allValues);
      const queryString = new URLSearchParams(queryParams).toString();

      fetcher.load(`/admin/organization/find?${queryString}`);
    }, 100),
    [fetcher, setUniqError],
  );

  return (
    <div>
      <Form
        form={form}
        initialValues={defaultValue}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={(changedValues: any, allValues: any) => {
          handleFormChange(changedValues, allValues);
        }}
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
              <FormFields
                renderForm={renderCreateBranchForm}
                form={form}
                isUniq={uniqError.uniqError}
                status={uniqError.status}
                type={type}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              {generateUser ? (
                <FormFields
                  renderForm={renderCreateBranchUserForm}
                  form={form}
                />
              ) : (
                <></>
              )}
              <FormFields
                renderForm={renderCreateBranchSettingForm}
                form={form}
              />
              <Form.List name={['setting', 'openDays']}>
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
