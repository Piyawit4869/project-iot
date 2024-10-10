import {
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import { TableComponent, TitleBar } from '@src/components/shared';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Flex,
  Form,
  Modal,
  Row,
  Select,
  Tag,
  Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import React from 'react';
import * as API from '../../../apis';
import { useLoaderData } from 'react-router-dom';
dayjs.locale('th');

export async function approvalLoader() {
  try {
    const approvals = await API.approval.pagination({});

    return { approvals: approvals.data };
  } catch (error) {
    return { approvals: {} };
  }
}

export const ApprovalIndex = () => {
  const { approvals } = useLoaderData() as any;

  console.log({ approvals });

  const [open, setOpen] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [modalData, setModalData] = React.useState({}) as any;
  const me = JSON.parse(localStorage.getItem('me') as any);

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleCloseModalCrate = () => {
    setOpenCreate(false);
  };

  const CreateApprovalModal = () => {
    return (
      <Modal open={openCreate} onCancel={handleCloseModalCrate} footer={null}>
        <Form layout="vertical">
          <Card
            style={{
              background: 'white',
              borderRadius: '20px',
              marginTop: '22px',
            }}
            bodyStyle={{ padding: '20px' }}
          >
            <div>
              <Typography.Title
                level={5}
                style={{ margin: '0px 0px 20px 0px' }}
              >
                เขียนใบลางาน
              </Typography.Title>
              <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item
                    label="วันที่ขอลา"
                    name="duedate"
                    rules={[
                      { required: true, message: 'จำเป็นต้องเลือกวันที่ขอลา' },
                    ]}
                  >
                    <DatePicker
                      placeholder="กรุณาเลือกวันที่จะขอลา"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item
                    label="ประเภทของการลา"
                    name="type"
                    rules={[
                      {
                        required: true,
                        message: 'จำเป็นต้องเลือกประเภทของการลา',
                      },
                    ]}
                  >
                    <Select
                      placeholder="กรุณาเลือกประเภทของการลา"
                      value={[
                        { label: 'ลาป่วย', value: 'sick' },
                        { label: 'ลากิจ', value: 'business' },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="เหตุผลที่ขอลา"
                    name="remark"
                    rules={[
                      {
                        required: true,
                        message: 'จำเป็นต้องกรอกเหตุผลที่ขอลา',
                      },
                    ]}
                  >
                    <TextArea placeholder="กรุณากรอกเหตุผลที่จะขอลา" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Card>
          <Flex gap={6} justify="end" style={{ marginTop: '10px' }}>
            <Button
              type="primary"
              onClick={() => {
                setOpenCreate(false);
              }}
            >
              ส่งใบลา
            </Button>
          </Flex>
        </Form>
      </Modal>
    );
  };

  const ApprovalModal = () => {
    return (
      <Modal open={open} onCancel={handleCloseModal} footer={null}>
        <Card
          style={{
            background: 'white',
            borderRadius: '20px',
            marginTop: '22px',
          }}
          bodyStyle={{ padding: '20px' }}
        >
          <div>
            <Flex justify="space-between" align="center">
              <Typography.Title level={5} style={{ margin: '12px 0' }}>
                {modalData.name}
              </Typography.Title>
              <Flex>
                <Tag color={handleTypeColor(modalData.type)}>
                  {handleType(modalData.type)}
                </Tag>
                <Tag
                  icon={handleStatusIcon(modalData.status)}
                  color={handleStatusColor(modalData.status)}
                >
                  {handleStatus(modalData.status)}
                </Tag>
              </Flex>
            </Flex>

            <Typography.Paragraph>
              {'วันที่ขอลา : ' +
                dayjs(modalData.duedate).format('D dddd , MMMM , YYYY')}
            </Typography.Paragraph>
            <Typography.Paragraph>
              {'เหตุผลที่ขอลา  : ' + modalData.remark}
            </Typography.Paragraph>
          </div>
        </Card>
        {(me.role.name === 'owner' || me.role.name === 'manager') && (
          <Flex gap={6} justify="end" style={{ marginTop: '10px' }}>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              ปฏิเสธ
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setOpen(false);
              }}
            >
              อนุมัติ
            </Button>
          </Flex>
        )}
      </Modal>
    );
  };

  return me.role.name === 'owner' || me.role.name === 'manager' ? (
    <>
      <CreateApprovalModal />
      <ApprovalModal />
      <TitleBar
        title={'การลางานในวันนี้'}
        subTitle={'มีใครลางานในวันนี้บ้างนะ มาดูกัน'}
        buttons={[
          <Button
            type="primary"
            onClick={() => {
              setOpenCreate(true);
            }}
          >
            เขียนใบลา
          </Button>,
        ]}
      />
      <div style={{ marginTop: '12px' }}>
        <TableComponent
          columns={adminColumns}
          dataSource={data}
          onRowClick={(record) => {
            setOpen(true);
            setModalData(record);
          }}
        />
      </div>
    </>
  ) : (
    <>
      <CreateApprovalModal />
      <ApprovalModal />
      <TitleBar
        title={'การลางานของคุณในวันนี้'}
        subTitle={'ส่งเอกสารการลาได้ที่ปุ่มเขียนใบลา'}
        buttons={[
          <Button
            type="primary"
            onClick={() => {
              setOpenCreate(true);
            }}
          >
            เขียนใบลา
          </Button>,
        ]}
      />
      <div style={{ marginTop: '12px' }}>
        <TableComponent
          columns={columns}
          dataSource={data}
          onRowClick={(record) => {
            setOpen(true);
            setModalData(record);
          }}
        />
      </div>
    </>
  );
};

const columns: ColumnsType<any> | undefined = [
  { title: 'ลำดับ', dataIndex: 'id', key: 'id', align: 'center' },
  { title: 'ชื่อ - นามสกุล', dataIndex: 'name', key: 'name', width: 200 },
  {
    title: 'วันที่ขอลา',
    dataIndex: 'duedate',
    key: 'duedate',
    align: 'center',
    render: (value: string) => {
      return <>{dayjs(value).format('D dddd , MMMM , YYYY')}</>;
    },
  },
  {
    title: 'ประเภท',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    render: (value: string) => {
      return <Tag color={handleTypeColor(value)}>{handleType(value)}</Tag>;
    },
  },
  { title: 'เหตุผล', dataIndex: 'remark', key: 'remark' },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: (value: string) => {
      return (
        <Tag icon={handleStatusIcon(value)} color={handleStatusColor(value)}>
          {handleStatus(value)}
        </Tag>
      );
    },
  },
];

const adminColumns: ColumnsType<any> | undefined = [
  { title: 'ลำดับ', dataIndex: 'id', key: 'id', align: 'center' },
  { title: 'ชื่อ - นามสกุล', dataIndex: 'name', key: 'name', width: 200 },
  {
    title: 'วันที่ขอลา',
    dataIndex: 'duedate',
    key: 'duedate',
    align: 'center',
    render: (value: string) => {
      return <>{dayjs(value).format('D dddd , MMMM , YYYY')}</>;
    },
  },
  {
    title: 'ประเภท',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    render: (value: string) => {
      return <Tag color={handleTypeColor(value)}>{handleType(value)}</Tag>;
    },
  },
  { title: 'เหตุผล', dataIndex: 'remark', key: 'remark' },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    key: 'status',
    align: 'center',
    render: (value: string) => {
      return (
        <Tag icon={handleStatusIcon(value)} color={handleStatusColor(value)}>
          {handleStatus(value)}
        </Tag>
      );
    },
  },
  {
    title: 'วันที่และเวลาที่ยื่นลา',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (value: any) => {
      return <>{dayjs(value).format('M/D/YYYY h:mm A')}</>;
    },
  },
];

const data = [
  {
    id: 1,
    name: 'ภูวิศ วัฒนะ',
    duedate: '2024-10-03T04:40:24.863Z',
    type: 'sick',
    remark: 'ท้องเสีย อาหารเป็นพิษ ตั้งแต่เมื่อวันที่ 09/31/24 ช่วงเย็น',
    status: 'approved',
    createdAt: '2024-10-02T04:40:24.863Z',
  },
  {
    id: 2,
    name: 'ภูวิศ วัฒนะ',
    duedate: '2024-10-03T04:40:24.863Z',
    type: 'business',
    remark: 'ไปงานบวชญาติที่จังหวัดนครศรีธรรมราช',
    status: 'pendding',
    createdAt: '2024-10-02T04:40:24.863Z',
  },
  {
    id: 3,
    name: 'ภูวิศ วัฒนะ',
    duedate: '2024-10-03T04:40:24.863Z',
    type: 'business',
    remark: 'ไปปาร์ตี้วันเกิดเพื่อน',
    status: 'rejected',
    createdAt: '2024-10-02T04:40:24.863Z',
  },
];

const handleType = (type: string) => {
  switch (type) {
    case 'sick':
      return 'ลาป่วย';
    case 'business':
      return 'ลากิจ';

    default:
      return '-';
  }
};

const handleTypeColor = (color: string) => {
  switch (color) {
    case 'sick':
      return '#2db7f5';
    case 'business':
      return '#87d068';

    default:
      return 'default';
  }
};

const handleStatus = (status: string) => {
  switch (status) {
    case 'pendding':
      return 'รออนุมัติ';
    case 'approved':
      return 'อนุมัติแล้ว';
    case 'rejected':
      return 'ปฏิเสธ';

    default:
      return '-';
  }
};

const handleStatusIcon = (color: string) => {
  switch (color) {
    case 'pendding':
      return <SyncOutlined spin />;
    case 'approved':
      return <CheckCircleOutlined />;
    case 'rejected':
      return <CloseCircleOutlined />;

    default:
      return <MinusCircleOutlined />;
  }
};

const handleStatusColor = (color: string) => {
  switch (color) {
    case 'pendding':
      return 'blue';
    case 'approved':
      return 'success';
    case 'rejected':
      return 'error';

    default:
      return 'default';
  }
};
