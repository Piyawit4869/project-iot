import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import {
  Link,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import { TableComponent } from '@src/components/shared/TableComponent';
import { CreateButton } from '@src/components/shared/CreateButton';
import { EyeOutlined, TagOutlined } from '@ant-design/icons';
import { TitleBar } from '@src/components/shared';
import React from 'react';
import { debounce } from 'lodash';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';

export const NotationIndex = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const { notations, param } = useLoaderData() as any;
  const { state } = useNavigation();
  // const [form] = Form.useForm();
  const submit = useSubmit();

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = React.useMemo(() => {
    const fetchData = (pagination: any) => {
      const { current, pageSize } = pagination;

      let payload = {} as any;

      payload = {
        ...param,
        page: current,
        limit: pageSize,
      };

      Object.keys(payload).map((key) => {
        if (payload[key] === undefined || payload[key] === '') {
          delete payload[key];
        }

        return payload;
      });

      submit(payload, { method: 'get' });
    };
    return debounce(fetchData, 500);
  }, [param]);
  const columns: ColumnsType<any> = [
    {
      title: 'เลขที่เอกสาร',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'ประเภทเอกสาร',
      dataIndex: 'type',
      key: 'type',
      align: 'center',
      width: 150,
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: 150,
    },
    {
      title: 'วันที่สร้าง',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      width: 150,
      render: (value) => {
        return <>{dayjs(value).format('DD/MM/YYYY')}</>;
      },
    },
    {
      title: 'วันหมดอายุการใช้งาน',
      dataIndex: 'expiredAt',
      key: 'expiredAt',
      align: 'center',
      width: 150,
      render: (value) => {
        return <>{dayjs(value).format('DD/MM/YYYY')}</>;
      },
    },

    {
      title: 'รายละเอียด',
      key: 'details',
      dataIndex: 'id',
      align: 'center',
      render: (id: number) => (
        <Link to={`${id}`}>
          <Button type="primary" icon={<EyeOutlined />}>
            ดูข้อมูล
          </Button>
        </Link>
      ),
    },
  ];

  return (
    <Flex vertical gap={'small'}>
      {/* Title section from title component */}
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
        <TitleBar
          title={'เอกสารทั้งหมด'}
          subTitle={
            <Row gutter={6} align="middle">
              <Col>
                <TagOutlined />
              </Col>
              <Col>
                <Typography>ค้นหาเอกสาร</Typography>
              </Col>
            </Row>
          }
          buttons={[
            <Link to={'create'}>
              <CreateButton label={'สร้างเอกสาร'} />
            </Link>,
          ]}
        />

        {/* Filter section from search bar component */}
        <div style={{ height: '5px' }} />
        <Form layout="vertical">
          <Flex gap={12}>
            <Col xs={12} sm={12} md={8} lg={8} xl={6}>
              <Form.Item name={'number'}>
                <Input placeholder="เลขที่เอกสาร" />
              </Form.Item>
            </Col>
            <Col xs={12} sm={12} md={8} lg={8} xl={6}>
              <Form.Item name={'type'}>
                <Select
                  placeholder="ประเภทเอกสาร"
                  options={[{ value: 'quotation', label: 'ใบเสนอราคา' }]}
                />
              </Form.Item>
            </Col>
            <Col xs={12} sm={12} md={8} lg={8} xl={6}>
              <Form.Item name={'status'}>
                <Select
                  placeholder="สถานะ"
                  options={[
                    { value: 'draft', label: 'แบบร่าง' },
                    { value: 'waiting', label: 'รอการตรวจสอบ' },
                    { value: 'done', label: 'สำเร็จ' },
                    { value: 'active', label: 'พร้อมใช้งาน' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Flex>
        </Form>
      </Space>
      {/* Index data from table component */}
      <TableComponent
        columns={columns}
        dataSource={notations?.items ? notations.items : []}
        loading={loading || state === 'loading' || state === 'submitting'}
        pagination={{
          current: param && param?.page ? Number(param?.page) : 1,
          pageSize: param && param?.limit ? Number(param?.limit) : 10,
          total:
            notations && notations?.meta ? notations?.meta?.totalItems : 10,
          showTotal: (total: any, range: any) =>
            `${range[0]}-${range[1]} ของ ${total} เอกสารทั้งหมด`,
        }}
        bordered
        onChange={handleChange}
      />
    </Flex>
  );
};
