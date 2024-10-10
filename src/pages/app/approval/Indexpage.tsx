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
  Tabs,
  TabsProps,
  Tag,
  Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import React from 'react';
import * as API from '../../../apis';
import { redirect, useLoaderData, useSubmit } from 'react-router-dom';
import { notification } from 'antd/lib';
dayjs.locale('th');

export async function approvalLoader() {
  try {
    const approvals = await API.approval.pagination({});

    return { approvals: approvals.data };
  } catch (error) {
    return { approvals: {} };
  }
}

export async function approvalAction({ request }: any) {
  const formData = await request.formData();
  const submitData = Object.fromEntries(formData);

  switch (submitData.action) {
    case 'create':
      try {
        await API.approval.create(JSON.parse(submitData.data));
        notification['success']({
          message: 'ส่งใบลางานสำเร็จ',
          placement: 'bottomRight',
          duration: 3,
        });
        return redirect(`/approval`);
      } catch (error) {
        notification['error']({
          message: 'ส่งใบลางานล้มเหลว',
          placement: 'bottomRight',
          duration: 3,
        });
        return {};
      }
    case 'update':
      try {
        await API.approval.updateStatus(
          submitData.id,
          JSON.parse(submitData.data),
        );
        notification['success']({
          message: 'ส่งใบลางานสำเร็จ',
          placement: 'bottomRight',
          duration: 3,
        });
        return redirect(`/approval`);
      } catch (error) {
        notification['error']({
          message: 'ส่งใบลางานล้มเหลว',
          placement: 'bottomRight',
          duration: 3,
        });
        return {};
      }
    case 'resend':
      try {
        await API.approval.resend(submitData.id, JSON.parse(submitData.data));
        notification['success']({
          message: 'ส่งใบลางานสำเร็จ',
          placement: 'bottomRight',
          duration: 3,
        });
        return redirect(`/approval`);
      } catch (error) {
        notification['error']({
          message: 'ส่งใบลางานล้มเหลว',
          placement: 'bottomRight',
          duration: 3,
        });
        return {};
      }

    default:
      break;
  }
  try {
  } catch (error) {}
}

export const ApprovalIndex = () => {
  const { approvals } = useLoaderData() as any;
  const [form] = Form.useForm();
  const submit = useSubmit();
  const [open, setOpen] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [modalData, setModalData] = React.useState({}) as any;
  const me = JSON.parse(localStorage.getItem('me') as any);
  const [action, setAction] = React.useState('');
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [openResend, setOpenResend] = React.useState(false);

  const approve = approvals?.items?.filter(
    (item: any) => item.status === 'Approved',
  );
  const reject = approvals?.items?.filter(
    (item: any) => item.status === 'Rejected',
  );
  const cancal = approvals?.items?.filter(
    (item: any) => item.status === 'Cancelled',
  );
  const inProgress = approvals?.items?.filter(
    (item: any) => item.status === 'InProgress',
  );
  const pending = approvals?.items?.filter(
    (item: any) => item.status === 'Pending',
  );

  const onFinish = async (values: any) => {
    const payload = { ...values };
    if (!payload.note) {
      payload.note = '';
    }

    submit(
      { data: JSON.stringify(payload), action: 'create' },
      { method: 'POST' },
    );

    setOpenCreate(false);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleCloseModalCrate = () => {
    setOpenCreate(false);
  };

  const handleConfirm = () => {
    setOpenConfirm(false);
  };

  const handleResend = () => {
    setOpenResend(false);
  };

  const handleAction = (active: string) => {
    switch (active) {
      case 'approve':
        return async (values: any) => {
          const payload = { ...values };

          payload.action = 'Approve';
          submit(
            {
              data: JSON.stringify(payload),
              action: 'update',
              id: modalData.id,
            },
            { method: 'PUT' },
          );

          setOpenConfirm(false);
        };
      case 'reject':
        return async (values: any) => {
          const payload = { ...values };

          payload.action = 'Reject';
          submit(
            {
              data: JSON.stringify(payload),
              action: 'update',
              id: modalData.id,
            },
            { method: 'PUT' },
          );
          setOpenConfirm(false);
        };
      case 'cancel':
        return async (values: any) => {
          const payload = { ...values };

          payload.action = 'Cancel';
          submit(
            {
              data: JSON.stringify(payload),
              action: 'update',
              id: modalData.id,
            },
            { method: 'PUT' },
          );
          setOpenConfirm(false);
        };
      case 'resend':
        return async (values: any) => {
          const payload = { ...values };

          payload.action = 'RequestChange';
          submit(
            {
              data: JSON.stringify(payload),
              action: 'update',
              id: modalData.id,
            },
            { method: 'PUT' },
          );
          setOpenConfirm(false);
        };

      default:
        break;
    }
  };

  const ConfirmActionModal = () => {
    return (
      <Modal open={openConfirm} onCancel={handleConfirm} footer={null}>
        <Form onFinish={handleAction(action)} layout="vertical">
          <Form.Item
            name="reasons"
            label="เหตุผล"
            rules={[{ required: true, message: 'กรุณากรอกเหตุผล' }]}
          >
            <TextArea placeholder="กรอกเหตุผล" />
          </Form.Item>
          <Flex justify="end">
            <Button type="primary" htmlType="submit">
              ยืนยัน
            </Button>
          </Flex>
        </Form>
      </Modal>
    );
  };

  const onResend = async (values: any) => {
    const payload = { ...values };
    if (!payload.note) {
      payload.note = '';
    }

    payload.action = 'Pending';

    submit(
      { data: JSON.stringify(payload), action: 'resend', id: modalData.id },
      { method: 'PUT' },
    );

    setOpenResend(false);
  };

  const ResendApprovalModal = () => {
    return (
      <Modal open={openResend} onCancel={handleResend} footer={null}>
        <Form form={form} layout="vertical" onFinish={onResend}>
          <Card
            style={{
              background: 'white',
              borderRadius: '20px',
              marginTop: '22px',
            }}
            bodyStyle={{ padding: '20px' }}
          >
            <div>
              <Flex gap={12}>
                <Typography.Title
                  level={4}
                  style={{ margin: '0px 0px 20px 0px' }}
                >
                  เขียนใบลางาน
                </Typography.Title>
                <Typography style={{ color: 'red' }}>
                  * ส่งแล้วจะแก้ไขไม่ได้จนกว่าสถานะกำลังดำเนินการ
                </Typography>
              </Flex>

              <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item
                    label="วันที่เริ่มลา"
                    name="startDate"
                    rules={[
                      {
                        required: true,
                        message: 'จำเป็นต้องเลือกวันที่เริ่มลา',
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="กรุณาเลือกวันที่เริ่มลา"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item
                    label="ลาถึงวันที่"
                    name="endDate"
                    rules={[
                      {
                        required: true,
                        message: 'จำเป็นต้องเลือกว่าลาถึงวันไหน',
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="กรุณาเลือกวันที่สิ้นสุด"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
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
                      options={[
                        { label: 'ลาป่วย', value: 'Sickleave' },
                        { label: 'ลากิจ', value: 'LeaveOfAbsence' },
                        { label: 'ลาพักร้อน', value: 'LeaveRequest' },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="เหตุผลที่ขอลา"
                    name="reasons"
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
                <Col span={24}>
                  <Form.Item label="หมายเหตุ" name="note">
                    <TextArea placeholder="หมายเหตุ" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Card>
          <Flex gap={6} justify="end" style={{ marginTop: '10px' }}>
            <Button type="primary" htmlType="submit">
              ส่งใบลา
            </Button>
          </Flex>
        </Form>
      </Modal>
    );
  };

  const CreateApprovalModal = () => {
    return (
      <Modal open={openCreate} onCancel={handleCloseModalCrate} footer={null}>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Card
            style={{
              background: 'white',
              borderRadius: '20px',
              marginTop: '22px',
            }}
            bodyStyle={{ padding: '20px' }}
          >
            <div>
              <Flex gap={12}>
                <Typography.Title
                  level={4}
                  style={{ margin: '0px 0px 20px 0px' }}
                >
                  เขียนใบลางาน
                </Typography.Title>
                <Typography style={{ color: 'red' }}>
                  * ส่งแล้วจะแก้ไขไม่ได้จนกว่าสถานะกำลังดำเนินการ
                </Typography>
              </Flex>

              <Row gutter={[12, 12]}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item
                    label="วันที่เริ่มลา"
                    name="startDate"
                    rules={[
                      {
                        required: true,
                        message: 'จำเป็นต้องเลือกวันที่เริ่มลา',
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="กรุณาเลือกวันที่เริ่มลา"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                  <Form.Item
                    label="ลาถึงวันที่"
                    name="endDate"
                    rules={[
                      {
                        required: true,
                        message: 'จำเป็นต้องเลือกว่าลาถึงวันไหน',
                      },
                    ]}
                  >
                    <DatePicker
                      placeholder="กรุณาเลือกวันที่สิ้นสุด"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
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
                      options={[
                        { label: 'ลาป่วย', value: 'Sickleave' },
                        { label: 'ลากิจ', value: 'LeaveOfAbsence' },
                        { label: 'ลาพักร้อน', value: 'LeaveRequest' },
                      ]}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="เหตุผลที่ขอลา"
                    name="reasons"
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
                <Col span={24}>
                  <Form.Item label="หมายเหตุ" name="note">
                    <TextArea placeholder="หมายเหตุ" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
          </Card>
          <Flex gap={6} justify="end" style={{ marginTop: '10px' }}>
            <Button type="primary" htmlType="submit">
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
                {modalData?.createdBy ? modalData.createdBy : '-'}
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
              {'วันที่ขอลา : '}{' '}
              {dayjs(modalData.startDate).format('D dddd MMMM YYYY')}
              {' ถึง '} {dayjs(modalData.endDate).format('D dddd MMMM YYYY')}
            </Typography.Paragraph>
            <Typography.Paragraph>
              {'เหตุผลที่ขอลา  : '}{' '}
              {modalData?.reasons ? modalData.reasons : '-'}
            </Typography.Paragraph>
          </div>
        </Card>
        {(me.role.name === 'owner' || me.role.name === 'manager') &&
        (modalData.status === 'Pending' ||
          modalData.status === 'InProgress') ? (
          <Flex gap={6} justify="end" style={{ marginTop: '10px' }}>
            <Button
              onClick={() => {
                setAction('resend');
                setOpen(false);
                setOpenConfirm(true);
              }}
            >
              ยื่นเรื่องใหม่อีกครั้ง
            </Button>
            <Button
              onClick={() => {
                setAction('cancel');
                setOpen(false);
                setOpenConfirm(true);
              }}
            >
              ยกเลิก
            </Button>
            <Button
              onClick={() => {
                setAction('reject');
                setOpen(false);
                setOpenConfirm(true);
              }}
            >
              ไม่อนุญาติ
            </Button>
            <Button
              type="primary"
              onClick={() => {
                setAction('approve');
                setOpen(false);
                setOpenConfirm(true);
              }}
            >
              อนุญาติ
            </Button>
          </Flex>
        ) : (
          <></>
        )}
      </Modal>
    );
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'อนุญาติ',
      children: (
        <TableComponent
          columns={
            me.role.name === 'owner' || me.role.name === 'manager'
              ? adminColumns
              : columns
          }
          dataSource={approve}
          onRowClick={(record) => {
            setOpen(true);
            setModalData(record);
          }}
        />
      ),
    },
    {
      key: '2',
      label: 'ไม่อนุญาติ',
      children: (
        <TableComponent
          columns={
            me.role.name === 'owner' || me.role.name === 'manager'
              ? adminColumns
              : columns
          }
          dataSource={reject}
          onRowClick={(record) => {
            setOpen(true);
            setModalData(record);
          }}
        />
      ),
    },
    {
      key: '3',
      label: 'ยกเลิก',
      children: (
        <TableComponent
          columns={
            me.role.name === 'owner' || me.role.name === 'manager'
              ? adminColumns
              : columns
          }
          dataSource={cancal}
          onRowClick={(record) => {
            setOpen(true);
            setModalData(record);
          }}
        />
      ),
    },
    {
      key: '4',
      label: 'กำลังดำเนินการ',
      children: (
        <TableComponent
          columns={
            me.role.name === 'owner' || me.role.name === 'manager'
              ? adminColumns
              : columns
          }
          dataSource={inProgress}
          onRowClick={(record) => {
            record.action === 'RequestChange'
              ? setOpenResend(true)
              : setOpen(true);
            setModalData(record);
          }}
        />
      ),
    },
    {
      key: '5',
      label: 'กำลังพิจารณา',
      children: (
        <TableComponent
          columns={
            me.role.name === 'owner' || me.role.name === 'manager'
              ? adminColumns
              : columns
          }
          dataSource={pending}
          onRowClick={(record) => {
            record.action === 'RequestChange'
              ? setOpenResend(true)
              : setOpen(true);
            setModalData(record);
          }}
        />
      ),
    },
  ];

  return me.role.name === 'owner' || me.role.name === 'manager' ? (
    <>
      <ResendApprovalModal />
      <ConfirmActionModal />
      <CreateApprovalModal />
      <ApprovalModal />
      <TitleBar
        title={'การลางาน'}
        subTitle={'เร็วๆนี้มีใครลางานบ้างนะ มาดูกัน'}
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
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </>
  ) : (
    <>
      <ResendApprovalModal />
      <ConfirmActionModal />
      <CreateApprovalModal />
      <ApprovalModal />
      <TitleBar
        title={'การลางานของคุณ'}
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
        <Tabs defaultActiveKey="1" items={items} />
      </div>
    </>
  );
};

const columns: ColumnsType<any> | undefined = [
  {
    title: 'ชื่อ - นามสกุล',
    dataIndex: 'createdBy',
    key: 'createdBy',
    width: 200,
  },
  {
    title: 'วันที่ขอลา',
    dataIndex: 'duedate',
    key: 'duedate',
    align: 'center',
    render: (_: string, record: any) => {
      return (
        <>
          {dayjs(record.startDate).format('D dddd , MMMM , YYYY')} ถึง{' '}
          {dayjs(record.endDate).format('D dddd , MMMM , YYYY')}
        </>
      );
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
  { title: 'เหตุผล', dataIndex: 'reasons', key: 'reasons' },
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
  {
    title: 'ชื่อ - นามสกุล',
    dataIndex: 'createdBy',
    key: 'createdBy',
    width: 200,
  },
  {
    title: 'วันที่ขอลา',
    dataIndex: 'duedate',
    key: 'duedate',
    align: 'center',
    render: (_: string, record: any) => {
      return (
        <>
          {dayjs(record.startDate).format('D dddd , MMMM , YYYY')} ถึง{' '}
          {dayjs(record.endDate).format('D dddd , MMMM , YYYY')}
        </>
      );
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
  { title: 'เหตุผล', dataIndex: 'reasons', key: 'reasons' },
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

const handleType = (type: string) => {
  switch (type) {
    case 'Sickleave':
      return 'ลาป่วย';
    case 'LeaveOfAbsence':
      return 'ลากิจ';
    case 'LeaveRequest':
      return 'ลาพักร้อน';

    default:
      return '-';
  }
};

const handleTypeColor = (color: string) => {
  switch (color) {
    case 'Sickleave':
      return '#2db7f5';
    case 'LeaveOfAbsence':
      return '#87d068';
    case 'LeaveRequest':
      return '#f50';

    default:
      return 'default';
  }
};

const handleStatus = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'กำลังพิจารณา';
    case 'Approved':
      return 'อนุญาติ';
    case 'Rejected':
      return 'ไม่อนุญาติ';
    case 'InProgress':
      return 'กำลังดำเนินการ';
    case 'Cancelled':
      return 'ยกเลิก';
    default:
      return '-';
  }
};

const handleStatusIcon = (color: string) => {
  switch (color) {
    case 'Pending':
      return <SyncOutlined spin />;
    case 'Approved':
      return <CheckCircleOutlined />;
    case 'Rejected':
      return <CloseCircleOutlined />;
    case 'InProgress':
      return <SyncOutlined spin />;
    case 'Cancelled':
      return <CloseCircleOutlined />;
    default:
      return <MinusCircleOutlined />;
  }
};

const handleStatusColor = (color: string) => {
  switch (color) {
    case 'Pending':
      return 'blue';
    case 'Approved':
      return 'success';
    case 'Rejected':
      return 'volcano';
    case 'InProgress':
      return 'cyan';
    case 'Cancelled':
      return 'error';

    default:
      return 'default';
  }
};
