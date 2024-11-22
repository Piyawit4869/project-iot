import {
  Button,
  Col,
  DatePicker,
  Flex,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
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
    payload.Status = 'draft';
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
          <Flex gap={12}>
            <Col span={12}>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item name={'name'} label={'name'}>
                    <Input disabled={disabledForm} />
                  </Form.Item>
                </Col>
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
                  <Form.Item name={'excludingVat'} label={'excludingVat'}>
                    <InputNumber
                      style={{ width: '100%' }}
                      disabled={disabledForm}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item name={'taxValue'} label={'taxValue'}>
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
            </Col>
          </Flex>
        </Form>
      </Space>
    </Flex>
  );
};
