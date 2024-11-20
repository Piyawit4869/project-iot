import { FormButtonsEdit } from '@src/components/shared/FormButtons';
import { FormFields } from '@src/forms';
import {
  Button,
  Col,
  Flex,
  Form,
  notification,
  Row,
  Select,
  TimePicker,
} from 'antd';
import {
  renderSingleBranchAddressForm,
  renderSingleBranchForm,
  renderSingleBranchSystemForm,
} from './renderForm';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  useFetcher,
  useLoaderData,
  useLocation,
  useSubmit,
} from 'react-router-dom';
import React from 'react';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import vine, { errors } from '@vinejs/vine';
import { schemaUpdateBranch } from './schema';

interface TypeOfUniqError {
  name: string;
  status: string;
  uniqError: boolean;
  errorMessage: string;
}

export const BranchSingle = () => {
  const { branch } = useLoaderData() as any;
  const [form] = Form.useForm();
  const [addressForm] = Form.useForm();
  const [systemForm] = Form.useForm();
  const [type, setType] = React.useState('');
  const fetcher = useFetcher();
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);
  const modifiedPathnames =
    pathnames[0] === 'admin' ? pathnames.slice(1) : pathnames;
  const [uniqError, setUniqError] = React.useState<TypeOfUniqError[]>([]);

  console.log({ uniqError });
  console.log({ fetcher });

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

  const onFinish = async (values: any) => {
    try {
      const payload = { ...values };

      payload.organizationId = modifiedPathnames[1];
      payload.isMain = true;

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

      if (payload.openingDate) {
        payload.openingDate = dayjs(payload.openingDate).toISOString();
      }

      const validator = vine.compile(schemaUpdateBranch);

      await validator.validate(payload);

      await submit(
        { data: JSON.stringify(payload), action: 'edit' },
        { method: 'put' },
      );
    } catch (error) {
      if (error instanceof errors.E_VALIDATION_ERROR) {
        console.log({ error });

        notification.error({
          message: 'แก้ไขข้อมูลสาขาล้มเหลว',
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

  const onAddressFinish = async (values: any) => {
    console.log(values);
  };

  const onSystemFinish = async (values: any) => {
    console.log(values);
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
        // // Query parameters and API call
      }
    }, 300),
    [fetcher],
  );

  React.useEffect(() => {
    let businessRegister = null;
    if (branch && branch.openingDate) {
      businessRegister = dayjs(branch.openingDate);
    }

    setType(branch.type);

    const branchMainAddress =
      branch?.addresses?.find((item: any) => item?.isMain === true) || null;

    const branchMainSetting =
      branch?.settings?.find((item: any) => item?.active === true) || null;

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
      ...branchMainSetting,
      openDays: branchMainSetting?.openDays.map((item: any) => ({
        ...item,
        openTime: dayjs(item.open),
        closeTime: dayjs(item.close),
      })),
    });
  }, [form, branch]);

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
          titleModalSubmit="คุณต้องการแก้ไขข้อมูลสาขา ใช่หรือไม่?"
          contentModalSubmit="ข้อมูลที่คุณกรอกจะถูกบันทึก"
          titleModalReset="คุณต้องการเคลียร์ข้อมูลสาขา ใช่หรือไม่?"
          contentModalReset="ข้อมูลที่คุณกรอกจะถูกเคลียร์"
          titleModalDelete="คุณต้องการลบข้อมูลสาขา ใช่หรือไม่?"
          contentModalDelete="ข้อมูลของคุณจะถูกลบหากกดยืนยัน"
        />

        <Row gutter={[12, 12]}>
          <Col xs={24} sm={24} md={24} lg={12} xl={12}>
            <FormFields
              renderForm={renderSingleBranchForm}
              form={form}
              type={type}
              uniqError={uniqError}
            />
          </Col>
        </Row>
      </Form>
      <Row gutter={[12, 12]}>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form form={addressForm} layout="vertical" onFinish={onAddressFinish}>
            <FormFields
              renderForm={renderSingleBranchAddressForm}
              form={addressForm}
              type={type}
            />

            <Flex justify="end">
              <Button htmlType="submit" type="primary">
                บันทึกข้อมูลที่อยู่
              </Button>
            </Flex>
          </Form>
        </Col>
        <Col xs={24} sm={24} md={24} lg={12} xl={12}>
          <Form form={systemForm} layout="vertical" onFinish={onSystemFinish}>
            <FormFields
              renderForm={renderSingleBranchSystemForm}
              form={systemForm}
              type={type}
            />
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
    </div>
  );
};
