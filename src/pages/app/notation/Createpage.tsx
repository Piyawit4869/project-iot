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
          padding: '20px 0px 0px 0px',
          position: 'sticky',
          zIndex: 10,
          borderImageSlice: 1,
          top: '-10px',
        }}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Flex justify="space-between">
            <Typography.Title level={3}>เอกสาร</Typography.Title>
            <Flex gap={12}>
              <Button type="dashed" onClick={handleDraft}>
                Draft
              </Button>
              <Button type="primary" onClick={handlePending}>
                Pending
              </Button>
            </Flex>
          </Flex>
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
