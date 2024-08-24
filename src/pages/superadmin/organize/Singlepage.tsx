import { DynamicForm } from '@src/forms';

import {
  Link,
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
  Input,
  Button,
  Typography,
} from 'antd';
import { branchColumns } from './organizeData';
import { TableComponent } from '@src/components/shared/TableComponent';
import { FormButtonsEdit } from '@src/components/shared/FormButtons';
import dayjs from 'dayjs';
import React from 'react';
import { renderEditForm } from './renderForm';
import { TitleBar } from '@src/components/shared';
import { CreateButton } from '@src/components/shared/CreateButton';
import { SearchBar } from '@src/components/shared/SearchBar';
import vine, { errors } from '@vinejs/vine';
import { schemaUpdateOrg } from './schema';

export const OrganizeSingle: React.FC = () => {
  const { organize, param } = useLoaderData() as any;

  const [form] = Form.useForm();
  const submit = useSubmit();

  const [loading, setLoading] = React.useState<boolean>(true);
  const { state } = useNavigation();

  const [type, setType] = React.useState('');

  const onFinish = async (values: any) => {
    const validator = vine.compile(schemaUpdateOrg);
    try {
      const payload = { ...values };
      payload.setting.active = true;
      if (payload.file && payload.file.length > 0) {
        payload.logoUrl = payload.file[0].response?.url;
        delete payload.file;
      } else {
        payload.logoUrl = '';
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
          message: 'Update organization fail',
          placement: 'bottomRight',
          description: 'You have fail to update organization',
        });
      } else {
        notification.error({
          message: 'Submission fail',
          placement: 'bottomRight',
          description: `You have submission fail : ${error}`,
        });
      }
    }
  };

  const handleValuesChange = (changedValues: any) => {
    if (changedValues.type) {
      setType(changedValues.type);
    }
  };

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

    setType(organize.type);

    form.setFieldsValue({
      ...organize,
      openingDate: businessRegister,
    });
  }, [form, organize]);

  return (
    <div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={handleValuesChange}
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
        <div
          style={{
            maxHeight: '74vh',
            minHeight: '50vh',
            height: '100%',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          <Row gutter={[20, 24]} style={{ paddingTop: '20px' }}>
            {renderEditForm.map((item: any, index: number) => {
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
            <Form.List name="addresses">
              {(fields, { add, remove }) => (
                <div style={{ margin: '0px 24px' }}>
                  {fields.map(({ key, name, fieldKey, ...restField }: any) => (
                    <>
                      <Typography.Title
                        level={5}
                        style={{ margin: '20px 0px' }}
                      >
                        {'ที่อยู่ที่ ' + (key + 1)}
                      </Typography.Title>
                      <Row gutter={[24, 24]} justify="start">
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            fieldKey={[fieldKey, 'name']}
                            label={`ชื่อสถานที่ `}
                            rules={[
                              {
                                required: true,
                                message: 'กรุณากรอกชื่อสถานที่',
                              },
                            ]}
                          >
                            <Input placeholder="ชื่อสถานที่" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'city']}
                            fieldKey={[fieldKey, 'city']}
                            label="เมือง"
                            rules={[
                              {
                                required: true,
                                message: 'กรุณากรอกชื่อเมือง',
                              },
                            ]}
                          >
                            <Input placeholder="เมือง" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'province']}
                            fieldKey={[fieldKey, 'province']}
                            label="จังหวัด"
                            rules={[
                              {
                                required: true,
                                message: 'กรุณากรอกชื่อจังหวัด',
                              },
                            ]}
                          >
                            <Input placeholder="จังหวัด" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'postalCode']}
                            fieldKey={[fieldKey, 'postalCode']}
                            label="รหัสไปรษณีย์"
                            rules={[
                              {
                                required: true,
                                message: 'กรุณากรอกรหัสไปรษณีย์',
                              },
                            ]}
                          >
                            <Input placeholder="รหัสไปรษณีย์" />
                          </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Form.Item
                            {...restField}
                            name={[name, 'roomNo']}
                            fieldKey={[fieldKey, 'roomNo']}
                            label="หมายเลขห้อง"
                          >
                            <Input placeholder="หมายเลขห้อง" />
                          </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Form.Item
                            {...restField}
                            name={[name, 'floorNo']}
                            fieldKey={[fieldKey, 'floorNo']}
                            label="ชั้น"
                          >
                            <Input placeholder="ชั้น" />
                          </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Form.Item
                            {...restField}
                            name={[name, 'village']}
                            fieldKey={[fieldKey, 'village']}
                            label="หมู่บ้าน"
                          >
                            <Input placeholder="หมู่บ้าน" />
                          </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Form.Item
                            {...restField}
                            name={[name, 'villageNo']}
                            fieldKey={[fieldKey, 'villageNo']}
                            label="หมู่ที่"
                          >
                            <Input placeholder="หมู่ที่ (เช่นหมู่ 6)" />
                          </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Form.Item
                            {...restField}
                            name={[name, 'houseNo']}
                            fieldKey={[fieldKey, 'houseNo']}
                            label="บ้านเลขที่"
                          >
                            <Input placeholder="บ้านเลขที่" />
                          </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Form.Item
                            {...restField}
                            name={[name, 'alley']}
                            fieldKey={[fieldKey, 'alley']}
                            label="ซอย"
                          >
                            <Input placeholder="ซอย" />
                          </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Form.Item
                            {...restField}
                            name={[name, 'road']}
                            fieldKey={[fieldKey, 'road']}
                            label="ถนน"
                          >
                            <Input placeholder="ถนน" />
                          </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={6} lg={6} xl={6}>
                          <Form.Item
                            {...restField}
                            name={[name, 'building']}
                            fieldKey={[fieldKey, 'building']}
                            label="อาคาร"
                          >
                            <Input placeholder="อาคาร" />
                          </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'nation']}
                            fieldKey={[fieldKey, 'nation']}
                            label="ประเทศ"
                          >
                            <Input placeholder="ประเทศ" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'district']}
                            fieldKey={[fieldKey, 'district']}
                            label="เขต/อำเภอ"
                          >
                            <Input placeholder="เขต/อำเภอ" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'subDistrict']}
                            fieldKey={[fieldKey, 'subDistrict']}
                            label="แขวง/ตำบล"
                          >
                            <Input placeholder="แขวง/ตำบล" />
                          </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                          <Form.Item
                            {...restField}
                            name={[name, 'note']}
                            fieldKey={[fieldKey, 'note']}
                            label="หมายเหตุ"
                          >
                            <Input placeholder="หมายเหตุ" />
                          </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                          <Button
                            type="dashed"
                            style={{
                              width: '100%',
                              marginBottom: '20px',
                              color: 'red',
                              borderColor: 'red',
                            }}
                            onClick={() => remove(name)}
                          >
                            ลบที่อยู่
                          </Button>
                        </Col>
                      </Row>
                    </>
                  ))}

                  <Form.Item>
                    <Button type="dashed" onClick={() => add()} block>
                      เพิ่มที่อยู่
                    </Button>
                  </Form.Item>
                </div>
              )}
            </Form.List>
          </Row>

          <Flex vertical gap={'small'} style={{ marginTop: '20px' }}>
            {/* Title section from title component */}
            <TitleBar
              title={'ตั้งค่าสาขา'}
              buttons={[
                <Link to={'#'}>
                  <CreateButton disable label={'เพิ่มข้อมูลสาขา'} />
                </Link>,
              ]}
            />

            {/* Filter section from search bar component */}
            <div style={{ height: '5px' }} />
            <SearchBar />

            {/* Index data from table component */}
            <TableComponent
              columns={branchColumns}
              dataSource={organize.branches}
              loading={loading || state === 'loading' || state === 'submitting'}
              pagination={{
                current: param && param.page ? Number(param?.page) : 1,
                pageSize: param && param.limit ? Number(param?.limit) : 10,
                total:
                  organize && organize.meta ? organize.meta.totalItems : 10,
                showTotal: (total: any, range: any) =>
                  `${range[0]}-${range[1]} ของ ${total} สาขาทั้งหมด`,
              }}
              bordered
            />
          </Flex>
        </div>
      </Form>
    </div>
  );
};
