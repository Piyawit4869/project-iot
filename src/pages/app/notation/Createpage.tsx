import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';

import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import { useSubmit } from 'react-router-dom';

export const NotationCreate = () => {
  const [form] = Form.useForm();
  const submit = useSubmit();

  const width = (210 / 25.4) * 50; // Width in pixels
  const height = (297 / 25.4) * 50; // Height in pixels

  const onFinish = async (values: any) => {
    const payload = Object.assign(values);

    payload.active = true;
    payload.startDate = dayjs(payload.startDate).toISOString();
    payload.code = 'code1234';
    payload.docNo = 'QU-24112200107';
    payload.docStatus = 'pending';

    submit(
      { data: JSON.stringify(payload), action: 'create' },
      { method: 'post' },
    );
  };

  const handleDraft = () => {
    //FIXME: change this status to pending when API supported
    onFinish({ ...form.getFieldsValue(), status: 'draft' });
  };

  const handlePending = () => {
    //FIXME: change this status to pending when API supported
    onFinish({ ...form.getFieldsValue(), status: 'draft' });
  };

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
              <Typography.Title level={3}>เอกสาร</Typography.Title>
              <Flex gap={12} align="center">
                <Button type="dashed" onClick={handleDraft}>
                  Draft
                </Button>
                <Button type="primary" onClick={handlePending}>
                  Pending
                </Button>
              </Flex>
            </Flex>
          </Space>
          <Flex gap={12}>
            <Col span={12}>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item name={'name'} label={'name'}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item name={'startDate'} label={'startDate'}>
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item name={'type'} label={'type'}>
                    <Select
                      options={[
                        { value: 'invoice', label: 'Invoice' },
                        { value: 'quotation', label: 'Quotation' },
                        { value: 'delivery_order', label: 'DeliveryOrder' },
                        { value: 'purchase_order', label: ' PurchaseOrder' },
                        { value: 'receipt', label: 'Receipt' },
                      ]}
                    />
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item name={'discount'} label={'discount'}>
                    <InputNumber style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item name={'excludingVat'} label={'excludingVat'}>
                    <InputNumber style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item name={'taxValue'} label={'taxValue'}>
                    <InputNumber style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item name={'grandTotal'} label={'grandTotal'}>
                    <InputNumber style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Form.Item name={'note'} label={'note'}>
                    <TextArea rows={4} />
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
                                fieldKey={[field.fieldKey, 'openTime']}
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
            </Col>
          </Flex>
        </Form>
      </Space>
    </Flex>
  );
};
