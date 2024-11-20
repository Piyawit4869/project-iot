import { FormFields } from '@src/forms';

import {
  Link,
  useFetcher,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import {
  Row,
  Form,
  Flex,
  notification,
  Col,
  Select,
  TimePicker,
  Button,
} from 'antd';
import { branchColumns } from './organizeData';
import { TableComponent } from '@src/components/shared/TableComponent';
import { FormButtonsEdit } from '@src/components/shared/FormButtons';
import dayjs from 'dayjs';
import React from 'react';
import {
  renderAddressSetting,
  renderSettingData,
  renderSystemSetting,
} from './renderForm';
import { TitleBar } from '@src/components/shared';
import { CreateButton } from '@src/components/shared/CreateButton';
import { SearchBar } from '@src/components/shared/SearchBar';
import vine, { errors } from '@vinejs/vine';
import { schemaUpdateOrg } from './schema';
import { useOrganizationContext } from '@src/contexts/OrganizationContext';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

interface TypeOfUniqError {
  name: string;
  status: string;
  uniqError: boolean;
  errorMessage: string;
}

export const OrganizeSingle: React.FC = () => {
  const { organize, branches, param } = useLoaderData() as any;
  const { setOrganization } = useOrganizationContext() as any;
  const fetcher = useFetcher();
  const [form] = Form.useForm();
  const [addressForm] = Form.useForm();
  const [systemForm] = Form.useForm();

  const [uniqError, setUniqError] = React.useState<TypeOfUniqError[]>([]);

  const submit = useSubmit();

  const [loading, setLoading] = React.useState<boolean>(true);
  const { state } = useNavigation();

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

  const onAddressFinish = async (values: any) => {
    console.log(values);
  };

  const onSystemFinish = async (values: any) => {
    console.log(values);
  };

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
        notification.error({
          message: 'แก้ไขข้อมูลองค์กรล้มเหลว',
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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  React.useEffect(() => {
    let businessRegister = null;
    if (organize && organize.openingDate) {
      businessRegister = dayjs(organize.openingDate);
    }

    setOrganization({ nameTh: organize.nameTh });

    setType(organize.type);

    const organizationMainAddress = organize.addresses.find(
      (item: any) => item.isMain === true,
    );
    const organizationMainSetting = organize.settings.find(
      (item: any) => item.active === true,
    );

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

    addressForm.setFieldsValue({ ...organizationMainAddress });
    systemForm.setFieldsValue({
      ...organizationMainSetting,
      openDays: organizationMainSetting?.openDays.map((item: any) => ({
        ...item,
        openTime: dayjs(item.open, 'HH:mm'),
        closeTime: dayjs(item.close, 'HH:mm'),
      })),
    });
  }, [form, organize]);

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
        <FormButtonsEdit
          form={form}
          titleModalSubmit="คุณต้องการแก้ไขข้อมูลองค์กร ใช่หรือไม่?"
          contentModalSubmit="ข้อมูลที่คุณกรอกจะถูกบันทึก"
          titleModalReset="คุณต้องการเคลียร์ข้อมูลองค์กร ใช่หรือไม่?"
          contentModalReset="ข้อมูลที่คุณกรอกจะถูกเคลียร์"
          titleModalDelete="คุณต้องการลบข้อมูลองค์กร ใช่หรือไม่?"
          contentModalDelete="ข้อมูลของคุณจะถูกลบหากกดยืนยัน"
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
            <Flex justify="end">
              <Button htmlType="submit" type="primary">
                บันทึกข้อมูลที่อยู่
              </Button>
            </Flex>
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
            <Flex justify="end">
              <Button htmlType="submit" type="primary">
                บันทึกการตั้งค่า
              </Button>
            </Flex>
          </Form>
        </Col>
      </Row>
      <Flex vertical gap={'small'} style={{ marginTop: '20px' }}>
        {/* Title section from title component */}
        <TitleBar
          title={'ตั้งค่าสาขา'}
          buttons={[
            <Link to={`branch/create`}>
              <CreateButton label={'เพิ่มข้อมูลสาขา'} />
            </Link>,
          ]}
        />

        {/* Filter section from search bar component */}
        <div style={{ height: '5px' }} />
        <SearchBar />

        {/* Index data from table component */}
        <TableComponent
          columns={branchColumns}
          dataSource={branches?.data?.items ? branches.data.items : []}
          loading={loading || state === 'loading' || state === 'submitting'}
          pagination={{
            current: param && param.page ? Number(param?.page) : 1,
            pageSize: param && param.limit ? Number(param?.limit) : 10,
            total: organize && organize.meta ? organize.meta.totalItems : 10,
            showTotal: (total: any, range: any) =>
              `${range[0]}-${range[1]} ของ ${total} สาขาทั้งหมด`,
          }}
          bordered
        />
      </Flex>
    </div>
  );
};
