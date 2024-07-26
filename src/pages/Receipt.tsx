import React from 'react';
import {
  Breadcrumb,
  Card,
  Col,
  Row,
  Form,
  Input,
  DatePicker,
  Select,
  Table,
} from 'antd';
import LogoImage from '../assets/images/stog.png';
import { Image } from 'antd';

const { Option } = Select;

export const Receipt: React.FC = () => {
  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div>
      <Breadcrumb
        style={{ marginBottom: 16 }}
        items={[
          {
            title: <a href="/">Home</a>,
          },
          {
            title: <a href="">Incomes</a>,
          },
          {
            title: 'Create Receipt',
          },
        ]}
      />
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card
            bordered={false}
            style={{
              backgroundColor: '#f0f2f5',
              boxShadow: '1px 1px 6px 3px #d2d0d0',
            }}
            cover={
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '20px',
                }}
              >
                <Image alt="Cover" src={LogoImage} width={400} />
              </div>
            }
            bodyStyle={{ textAlign: 'center' }}
          ></Card>
        </Col>
        <Col span={16}>
          <Card
            title={
              <span style={{ fontSize: '18px', fontWeight: 'normal' }}>
                Document Number that issued the receipt
              </span>
            }
            style={{
              backgroundColor: '#f0f2f5',
              boxShadow: '1px 1px 6px 3px #d2d0d0', // Increased shadow effect
            }}
            bordered={false}
          >
            <Form layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Document No."
                    name="documentNo"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your document number!',
                      },
                    ]}
                  >
                    <Input placeholder="RE2020010002" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Date"
                    name="date"
                    rules={[
                      { required: true, message: 'Please select the date!' },
                    ]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
      <Card
        title={
          <span style={{ fontSize: '18px', fontWeight: 'normal' }}>
            Company Information
          </span>
        }
        style={{
          width: '100%',
          backgroundColor: '#f0f2f5',
          boxShadow: '1px 1px 6px 3px #d2d0d0',
          marginTop: 32,
        }}
      >
        <Form layout="vertical">
          <Row gutter={24}>
            <Col span={8}>
              <Form.Item
                label="Company Name"
                name="companyName"
                rules={[
                  { required: true, message: 'Please input the company name!' },
                ]}
              >
                <Input placeholder="Apple Gump" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item label="Office" name="office">
                <Select defaultValue="Head Office">
                  <Option value="Head Office">Head Office</Option>
                  <Option value="Branch Office">Branch Office</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Tax ID"
                name="taxId"
                rules={[
                  { required: true, message: 'Please input the tax ID!' },
                ]}
              >
                <Input placeholder="1234567890123" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Seller"
                name="seller"
                rules={[
                  { required: true, message: 'Please input the seller name!' },
                ]}
              >
                <Input placeholder="Sarannat" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  { required: true, message: 'Please input the address!' },
                ]}
              >
                <Input placeholder="1795/1 Moo 9 Sukhumvit Rd. Maung Bangkok . 10250" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                label="Tel."
                name="tel"
                rules={[
                  {
                    required: true,
                    message: 'Please input the telephone number!',
                  },
                ]}
              >
                <Input placeholder="0987654321" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input the email!' }]}
              >
                <Input placeholder="samplecompany@email.com" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Form.Item label="Reference" name="reference">
                <Input placeholder="INV2020010002" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Table dataSource={dataSource} columns={columns} />;
    </div>
  );
};
