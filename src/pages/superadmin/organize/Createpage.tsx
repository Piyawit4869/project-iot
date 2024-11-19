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

export const OrganizeCreate: React.FC = () => {
  const [form] = Form.useForm();
  const submit = useSubmit();
  const fetcher = useFetcher();

  const [type, setType] = React.useState('');
  const [uniqError, setUniqError] = React.useState({
    status: '',
    uniqError: false,
    errorMessage: '',
  });

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

  const handleFormChange = React.useCallback(
    debounce((changedValues: any, allValues: any) => {
      if (changedValues.organization?.type) {
        setType(changedValues.organization.type);
      }

      const nameTh = changedValues.organization?.nameTh || '';
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

        if (data.organization) {
          extractFields(data.organization);
        }

        return params;
      };

      const queryParams = buildQueryParams(allValues);
      const queryString = new URLSearchParams(queryParams).toString();

      fetcher.load(`/admin/organization/find?${queryString}`);
    }, 100),
    [fetcher, setUniqError],
  );

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

  // Check path by role
  React.useEffect(() => {
    const me = JSON.parse(localStorage.getItem('me') as any);
    if (me.role.name !== 'super_admin') {
      redirect('/');
    }
  }, []);

  React.useEffect(() => {
    if (fetcher?.data) {
      // Update uniqError based on API response
      if (fetcher.data.org?.length) {
        setUniqError((prev) => ({
          ...prev,
          status: 'error',
          uniqError: true,
          errorMessage: 'This organization name already exists.',
        }));
      } else {
        setUniqError((prev) => ({
          ...prev,
          status:
            prev.status === 'error' && prev.errorMessage
              ? prev.status
              : 'success',
          uniqError: prev.errorMessage ? prev.uniqError : false,
        }));
      }
    }
  }, [fetcher?.data]);

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
                isUniq={uniqError.uniqError}
                status={uniqError.status}
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
                isUniq={uniqError.uniqError}
                status={uniqError.status}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <FormFields
                renderForm={renderCreateSettingฺBranchForm}
                form={form}
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

// const p = {
//   organization: {
//     active: true,
//     fromType: 'juristic_person',
//     status: 'newly_registered',
//     type: 'company_limited',
//     nameTh: 'ภูวิศ',
//     nameEn: 'Phuwis',
//     taxId: '1234567890123',
//     descriptionsTh: 'รายละเอียด',
//     descriptionsEn: 'description',
//     openingDate: '2024-11-12T17:00:00.000Z',
//     registerVat: true,
//     websiteUrl: 'test',
//     domainName: 'test',
//     contactPhone: '66888821480',
//     contactEmail: 'phuwis@utotech.org',
//     contactWebsite: 'Test',
//     businessEmail: 'phuwis@utotech.org',
//     contactFacebook: 'phuwis-utotech',
//     contactLine: 'phuwis-utotech',
//     contactWhatsapp: 'phuwis-utotech',
//     contactNote: 'phuwis-utotech',
//     address: {
//       active: true,
//       isMain: true,
//       city: 'Liverpool',
//       province: 'นครปฐม',
//       postalCode: '73170',
//       roomNo: 'phuwis-utotech',
//       floorNo: 'phuwis-utotech',
//       village: 'phuwis-utotech',
//       villageNo: 'phuwis-utotech',
//       houseNo: 'phuwis-utotech',
//       alley: 'phuwis-utotech',
//       road: 'phuwis-utotech',
//       building: 'phuwis-utotech',
//       nation: 'phuwis-utotech',
//       district: 'phuwis-utotech',
//       subDistrict: 'phuwis-utotech',
//       note: 'test',
//       language: 'TH',
//     },
//     user: {
//       email: 'phuwisw@gmail.com',
//       password: 'localpass',
//       profile: {
//         firstName: 'phuwis',
//         lastName: 'utotech',
//         birthDate: '2024-11-13T17:00:00.000Z',
//         phone: '66888821480',
//       },
//       userName: 'phuwis-utotech',
//       active: true,
//       status: 'Active',
//     },
//     setting: {
//       defaultLanguage: 'TH',
//       theme: 'light',
//       textDisplay: 'normal',
//       openDays: [
//         {
//           day: ['Monday', 'Tuesday', 'Wednesday'],
//           open: '2024-11-13T01:00:00.000Z',
//           close: '2024-11-13T10:00:00.000Z',
//           openTime: '08:00',
//           closeTime: '17:00',
//           isOpen: true,
//         },
//       ],
//       active: true,
//     },
//     logoUrl:
//       'https://storage.googleapis.com/stay-organize-dev/1-92b18aee87664319b27b4a5a18c7a139839943.png',
//   },
//   branch: {
//     user: {
//       email: 'phuwis@utotech.org',
//       password: 'localpass',
//       profile: {
//         firstName: 'Phuwis',
//         lastName: 'Watthana',
//         birthDate: '2024-11-12T17:00:00.000Z',
//         phone: '66888821480',
//       },
//       userName: 'PhuwisBranch',
//       active: true,
//       status: 'Active',
//     },
//     setting: {
//       defaultLanguage: 'TH',
//       theme: 'light',
//       textDisplay: 'normal',
//       openDays: [
//         {
//           day: ['Monday', 'Tuesday', 'Wednesday'],
//           close: '2024-11-13T10:00:00.000Z',
//           open: '2024-11-13T02:00:00.000Z',
//           openTime: '08:00',
//           closeTime: '17:00',
//           isOpen: true,
//         },
//       ],
//       active: true,
//     },
//     active: true,
//     isMain: true,
//     fromType: 'juristic_person',
//     type: 'company_limited',
//     status: 'newly_registered',
//     nameTh: 'ตั้งหวังรวย',
//     nameEn: 'Tung Wang Ruey',
//     taxId: '1234567890123',
//     openingDate: '2024-11-12T17:00:00.000Z',
//     registerVat: true,
//     websiteUrl: 'https://www.tung-wang-ruey.com',
//     domainName: 'testttt',
//     contactPhone: '66888821480',
//     contactEmail: 'phuwis@utotech.org',
//     contactWebsite: 'test',
//     businessEmail: 'phuwis@utotech.org',
//     contactFacebook: 'test',
//     contactLine: 'test',
//     contactWhatsapp: 'test',
//     contactNote: 'test',
//     address: {
//       city: 'Liverpool',
//       province: 'นนทบุรี',
//       postalCode: '12345',
//       roomNo: '12',
//       floorNo: '12',
//       village: 'สมพงษ์',
//       villageNo: '123',
//       houseNo: '12/123',
//       alley: '22',
//       road: 'สมพงษ์22',
//       building: '-',
//       nation: 'England',
//       district: 'พุทธมณฑล',
//       subDistrict: 'คลองโยง',
//       note: 'test',
//       active: true,
//       isMain: true,
//       language: 'TH',
//     },
//     logoUrl:
//       'https://storage.googleapis.com/stay-organize-dev/1-92b18aee87664319b27b4a5a18c7a139839943.png',
//   },
// };
