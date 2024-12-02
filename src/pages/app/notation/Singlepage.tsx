import {
  ClockCircleOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Flex,
  // Input,
  InputNumber,
  Row,
  Select,
  Space,
  Timeline,
  Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Form } from 'antd/lib';
import dayjs from 'dayjs';
import React from 'react';
import { useLoaderData, useSubmit } from 'react-router-dom';

export const NotationSingle = () => {
  const { notation } = useLoaderData() as any;
  const [form] = Form.useForm();
  const submit = useSubmit();
  const me = JSON.parse(localStorage.getItem('me') as any);
  const [disabledForm, setDisabledForm] = React.useState(true);

  const width = (210 / 25.4) * 50; // Width in pixels
  const height = (297 / 25.4) * 50; // Height in pixels

  const onFinish = async (values: any) => {
    const payload = Object.assign(values);

    payload.active = true;
    payload.code = 'code1234';
    payload.docNo = 'QU-24112200107';
    payload.status = 'draft';
    payload.docStatus = 'pending';

    submit(
      { data: JSON.stringify(payload), action: 'edit' },
      { method: 'put' },
    );
  };

  // const onDraft = async (values: any) => {
  //   console.log(values);
  // };

  // const onDelete = async () => {
  //   submit({ action: 'delete' }, { method: 'delete' });
  // };

  React.useEffect(() => {
    let startDate = null;
    if (notation.data && notation.data.startDate) {
      startDate = dayjs(notation.data.startDate);
    }

    form.setFieldsValue({
      ...notation.data,
      startDate: startDate,
    });
  }, []);

  return (
    <Flex vertical gap={'small'}>
      <Space
        direction="vertical"
        style={{
          width: '100%',
          backgroundColor: 'white',
          borderRadius: 5,
          position: 'sticky',
          zIndex: 10,
          borderImageSlice: 1,
        }}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Space
            direction="vertical"
            style={{
              width: '100%',
              backgroundColor: 'white',
              borderRadius: 5,
              position: 'sticky',
              padding: ' 20px 0px',
              zIndex: 10,
              borderBottom: '2px solid',
              borderImage:
                'linear-gradient(90deg, #19142a -38.4%, #A79DB4 129.4%)',
              borderImageSlice: 1,
              top: '-22px',
              marginBottom: '2rem',
            }}
          >
            <Flex justify="space-between">
              <Typography.Title level={3} style={{ marginTop: 0 }}>
                เอกสาร
              </Typography.Title>
              <Flex gap={12} align="center">
                <Button
                  type="primary"
                  onClick={() => {
                    //FIXME: handle editing notation
                    console.log('ready for editing');
                    setDisabledForm((prev: any) => !prev);
                  }}
                >
                  Edit
                </Button>
                {me?.role?.name === 'owner' && (
                  <Button style={{ background: '#87d068', color: 'white' }}>
                    Approved
                  </Button>
                )}
                {me?.role?.name === 'owner' && (
                  <Button danger type="primary">
                    Rejected
                  </Button>
                )}
                {me?.role?.name === 'owner' && (
                  <Button danger type="default">
                    Canceled
                  </Button>
                )}

                {/* <Button danger onClick={onDelete}>
                ลบ
              </Button> */}
              </Flex>
            </Flex>
          </Space>
          <Flex gap={12}>
            <Col span={12}>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item name={'startDate'} label={'startDate'}>
                    <DatePicker
                      style={{ width: '100%' }}
                      disabled={disabledForm}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item name={'type'} label={'type'}>
                    <Select
                      style={{ width: '100%' }}
                      options={[
                        { value: 'invoice', label: 'Invoice' },
                        { value: 'quotation', label: 'Quotation' },
                        { value: 'delivery_order', label: 'DeliveryOrder' },
                        { value: 'purchase_order', label: ' PurchaseOrder' },
                        { value: 'receipt', label: 'Receipt' },
                      ]}
                      disabled={disabledForm}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item name={'discount'} label={'discount'}>
                    <InputNumber
                      style={{ width: '100%' }}
                      disabled={disabledForm}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item name={'wht'} label={'wht'}>
                    <InputNumber
                      style={{ width: '100%' }}
                      disabled={disabledForm}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item name={'vat'} label={'vat'}>
                    <InputNumber
                      style={{ width: '100%' }}
                      disabled={disabledForm}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item name={'grandTotal'} label={'grandTotal'}>
                    <InputNumber
                      style={{ width: '100%' }}
                      disabled={disabledForm}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form.Item name={'note'} label={'note'}>
                    <TextArea rows={4} disabled={disabledForm} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Typography.Title level={3}>รายการ</Typography.Title>
                  <Form.List name={'items'}>
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field: any) => (
                          <Row key={field.key}>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                              <Form.Item
                                {...field}
                                name={[field.name, 'itemName']}
                                fieldKey={[field.fieldKey, 'itemName']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'กรุณาเลือกรายการ!',
                                  },
                                ]}
                                style={{ flex: 1, marginRight: 8 }}
                              >
                                <Select
                                  placeholder="เลือกรายการ"
                                  style={{ width: '100%' }}
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={10} sm={10} md={10} lg={10} xl={10}>
                              <Form.Item
                                {...field}
                                name={[field.name, 'quantity']}
                                fieldKey={[field.fieldKey, 'quantity']}
                                rules={[
                                  {
                                    required: true,
                                    message: 'กรุณาเลือกจำนวนรายการ!',
                                  },
                                ]}
                                style={{ flex: 1, marginRight: 8 }}
                              >
                                <InputNumber
                                  placeholder="เลือกจำนวน"
                                  style={{ width: '100%' }}
                                />
                              </Form.Item>
                            </Col>
                            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
                              <Button
                                danger
                                icon={
                                  <MinusCircleOutlined
                                    style={{ alignSelf: 'center' }}
                                  />
                                }
                                style={{ width: '100%' }}
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
                            เพิ่มรายการ
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
              {/* <Flex gap={12}>
                <Button htmlType="submit" type="primary">
                  แก้ไข
                </Button>
                <Button danger onClick={onDelete}>
                  ลบ
                </Button>
              </Flex> */}
            </Col>
            <Col span={12}>
              <div
                style={{
                  width: `${width}px`,
                  height: `${height}px`,
                  background: '#fff',
                  border: '1px solid #ddd',
                  margin: '0 auto',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography.Title level={4}>PDF</Typography.Title>
              </div>
              <div style={{ padding: 20 }}>
                <Typography.Title level={4}>ติดตามสถานะเอกสาร</Typography.Title>
                <Timeline
                  mode="left"
                  items={[
                    {
                      children: 'Create a services site 2015-09-01',
                    },
                    {
                      children: 'Solve initial network problems 2015-09-01',
                      color: 'green',
                    },
                    {
                      dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                      children: `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.`,
                    },
                    {
                      color: 'red',
                      children: 'Network problems being solved 2015-09-01',
                    },
                    {
                      children: 'Create a services site 2015-09-01',
                    },
                    {
                      dot: <ClockCircleOutlined style={{ fontSize: '16px' }} />,
                      children: 'Technical testing 2015-09-01',
                    },
                  ]}
                />
              </div>
            </Col>
          </Flex>
        </Form>
      </Space>
    </Flex>
  );
};
