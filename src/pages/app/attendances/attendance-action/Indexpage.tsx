import React from 'react';
import dayjs from 'dayjs';
import {
  Button,
  Card,
  Col,
  Divider,
  Flex,
  List,
  Row,
  Tag,
  Typography,
} from 'antd';
import { Link, useLoaderData, useSubmit } from 'react-router-dom';

import { TableComponent, TitleBar } from '@src/components/shared';
import { LeaveEarlyModal } from '@src/components/modules/app/attendance';
import { ColumnsType } from 'antd/es/table';
import { InfoCircleOutlined } from '@ant-design/icons';

import buddhistEra from 'dayjs/plugin/buddhistEra';

dayjs.extend(buddhistEra);

const dateFormat = 'DD/MM/BBBB';

const myAttendanceColumns: ColumnsType<any> | undefined = [
  {
    title: 'ชื่อ',
    dataIndex: 'name',
    key: 'name',
    render: (text, render) => (
      <Link to={`/attendance/${render.id}`}>{text}</Link>
    ),
    width: 200,
  },
  {
    title: 'สร้างเมื่อ',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: (date: string) => dayjs(date).format(dateFormat),
  },
  {
    title: 'แก้ไขเมื่อ',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: (date: string) => dayjs(date).format(dateFormat),
  },
  // {
  //   title: 'สถานะ',
  //   dataIndex: 'status',
  //   key: 'status',
  //   render: (status: string) => {
  //     const color = status === 'active' ? 'green' : 'red';
  //     return <Tag color={color}>{status?.toUpperCase()}</Tag>;
  //   },
  // },
  {
    title: 'ใช้งาน',
    dataIndex: 'active',
    key: 'active',
    render: (active: boolean) => (active ? 'ใช่' : 'ไม่ใช่'),
  },
  {
    title: 'ปัจจุบัน',
    dataIndex: 'isCurrent',
    key: 'isCurrent',
    render: (isCurrent: boolean) => (isCurrent ? 'ใช่' : 'ไม่ใช่'),
  },

  {
    title: 'คำอธิบาย',
    dataIndex: 'descriptions',
    key: 'descriptions',
  },
  {
    title: 'ความสำคัญ',
    dataIndex: 'priority',
    key: 'priority',
    render: (priority: string) => {
      let color = '';
      let text = '';
      if (priority === 'high') {
        color = 'volcano';
        text = 'สูง';
      } else if (priority === 'medium') {
        color = 'orange';
        text = 'ปานกลาง';
      } else {
        color = 'green';
        text = 'ต่ำ';
      }
      return <Tag color={color}>{text}</Tag>;
    },
  },
  {
    title: 'วันที่เริ่มต้น',
    dataIndex: 'startDate',
    key: 'startDate',
    render: (date: string) => dayjs(date).format(dateFormat),
  },
  {
    title: 'วันครบกำหนด',
    dataIndex: 'dueDate',
    key: 'dueDate',
    render: (date: string) => dayjs(date).format(dateFormat),
  },
  {
    title: 'จำกัดเวลา/วัน',
    dataIndex: 'limitTimePerDay',
    key: 'limitTimePerDay',
    render: (time: number) => `${time ? time : 0} ชั่วโมง`,
  },
  {
    title: 'เครดิตเริ่มต้น',
    dataIndex: 'startCredit',
    key: 'startCredit',
  },
  {
    title: 'เครดิตทั้งหมด',
    dataIndex: 'totalCredit',
    key: 'totalCredit',
  },
  {
    title: 'ชั่วโมงการทำงานทั้งหมด',
    dataIndex: 'totalWorkHours',
    key: 'totalWorkHours',
  },
  {
    title: 'วันจ่าย',
    dataIndex: 'payDay',
    key: 'payDay',
    render: (date: string) => dayjs(date).format(dateFormat),
  },
  {
    title: 'รหัสผู้ใช้',
    dataIndex: 'userId',
    key: 'userId',
  },
  {
    title: 'รหัสโปรเจกต์',
    dataIndex: 'projectId',
    key: 'projectId',
    render: (projectId: string | null) => (projectId ? projectId : 'ไม่มี'),
  },
  {
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: '60px',
    render: () => {
      return (
        <InfoCircleOutlined
          onClick={() => {
            console.log('info click');
          }}
        />
      );
    },
  },
];

export const AttendanceAction = () => {
  const { workInfos, data, wf } = useLoaderData() as any;

  const [currentTime, setCurrentTime] = React.useState(
    dayjs().format('HH:mm:ss'),
  );

  const submit = useSubmit();

  const [open, setOpen] = React.useState(false);

  const me = JSON.parse(localStorage.getItem('me') || '');

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleSubmitLeave = () => {
    submit(
      {
        data: JSON.stringify({
          status: 'Active',
          action: 'Out',
        }),
        action: 'leave-ealry',
      },
      { method: 'post' },
    );
    setOpen(false);
  };

  const handleChangeState = () => {
    submit(
      {
        data: JSON.stringify({
          status: 'Active',
          action:
            data && data?.length
              ? data[0].action === 'Out'
                ? 'In'
                : data[0].action === 'Break'
                ? 'In'
                : 'Break'
              : 'In',
        }),
        action: 'attendance',
      },
      { method: 'post' },
    );
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs().format('HH:mm:ss'));
    }, 1000); // Update every second

    // Cleanup the timer on component unmount
    return () => clearInterval(timer);
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'In':
        return 'linear-gradient(145deg, #FFA726, #FFCC80)';
      case 'Break':
        return 'linear-gradient(145deg, #6E85B7, #ABC4FF)';
      default:
        return 'linear-gradient(145deg, #EF5350, #FFCDD2)';
    }
  };

  return (
    <>
      <LeaveEarlyModal
        open={open}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleSubmitLeave}
      />

      {me?.role?.name === 'owner' ? (
        <>
          <TitleBar
            title={'การเข้างาน - ออกงาน'}
            buttons={[
              <Link to="/attendance/create">
                <Button type="primary">สร้าง</Button>
              </Link>,
            ]}
          />
          <Divider />
          <TableComponent
            columns={myAttendanceColumns}
            dataSource={workInfos.items}
          />
        </>
      ) : (
        <>
          <TitleBar
            title={'การเข้างาน - ออกงาน'}
            subTitle={`วันนี้คุณทำงานเป็นยังไงบ้างครับ :)`}
            buttons={[
              <Typography.Title level={4}>
                วัน{dayjs().format('dddd ที่ DD เดือน MMMM พ.ศ. BBBB')} เวลา{' '}
                {currentTime}
              </Typography.Title>,
            ]}
          />
          <Row gutter={[12, 12]} style={{ marginTop: '12px' }}>
            <Col xs={24} sm={24} md={24} lg={10} xl={10}>
              <Card
                style={{
                  backgroundColor: '#f8f9fa',
                  height: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Flex vertical justify="center" align="center" gap={10}>
                  <Button
                    shape="circle"
                    style={{
                      ...styles.actionButton,
                      backgroundImage:
                        data && data.length
                          ? getStatusStyle(data[0].action)
                          : 'linear-gradient(145deg, #6E85B7, #ABC4FF)',
                      // 'linear-gradient(145deg, #6E85B7, #ABC4FF)', // Cool gradient background

                      cursor:
                        data && data.length
                          ? data[0].action === 'Out'
                            ? 'not-allowed'
                            : 'pointer'
                          : 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow =
                        '0 6px 20px rgba(0, 0, 0, 0.2)'; // Elevate shadow on hover
                      e.currentTarget.style.transform = 'scale(1.05)'; // Slightly increase size on hover
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow =
                        '0 4px 15px rgba(0, 0, 0, 0.1)'; // Restore shadow on leave
                      e.currentTarget.style.transform = 'scale(1)'; // Restore size
                    }}
                    onMouseDown={(e) => {
                      e.currentTarget.style.boxShadow =
                        'inset 0 3px 10px rgba(0, 0, 0, 0.2)'; // Inner shadow on click
                    }}
                    onMouseUp={(e) => {
                      e.currentTarget.style.boxShadow =
                        '0 6px 20px rgba(0, 0, 0, 0.2)'; // Restore shadow after click
                    }}
                    onClick={() => {
                      if (data[0]?.action !== 'Out') {
                        handleChangeState();
                      }
                    }}
                  >
                    <Typography
                      style={{
                        color: 'white',
                        fontSize: '24px',
                        fontWeight: 'bold',
                      }}
                    >
                      {data && data.length
                        ? data[0].action === 'In'
                          ? 'พักเบรค'
                          : data[0].action === 'Out'
                          ? 'เลิกงาน'
                          : 'เข้างาน'
                        : 'เริ่มงานครั้งแรก'}
                    </Typography>
                  </Button>

                  <Button
                    disabled={data && data.length && data[0].action === 'Out'}
                    style={{ width: '100px', height: '35px', marginTop: 12 }}
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    ออกงาน
                  </Button>
                </Flex>
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={14} xl={14}>
              <Card
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  marginBottom: '12px',
                }}
                bodyStyle={{ padding: '20px' }}
              >
                <div>
                  <Typography.Title level={3} style={{ marginTop: '12px' }}>
                    {wf?.name}
                  </Typography.Title>
                  <Typography.Title level={5} style={{ marginTop: '12px' }}>
                    รายละเอียดงาน : {wf.descriptions}
                  </Typography.Title>

                  <Typography.Paragraph>
                    {'ทำงานไป 12 ชม และ พักเบรคไป  57 นาที'}
                  </Typography.Paragraph>
                </div>
              </Card>
              <List
                size="small"
                header={
                  <Typography.Title
                    level={5}
                    style={{ textAlign: 'center', marginTop: '12px' }}
                  >
                    ประวัติการเข้างาน - ออกงาน
                  </Typography.Title>
                }
                pagination={{ pageSize: 5 }}
                bordered
                dataSource={
                  data && data.length
                    ? data.sort(
                        (a: any, b: any) =>
                          dayjs(b.createdAt).valueOf() -
                          dayjs(a.createdAt).valueOf(),
                      )
                    : []
                }
                renderItem={(item: any) => (
                  <List.Item>
                    <Flex gap={20}>
                      <Typography>
                        เวลา {dayjs(item?.createdAt).format('hh:mm:ss')}
                      </Typography>

                      <Typography>
                        {item?.action === 'In'
                          ? 'เข้างาน'
                          : item?.action === 'Break'
                          ? 'พักเบรค'
                          : 'ออกงาน'}
                      </Typography>
                    </Flex>
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  actionButton: {
    width: '250px',
    height: '250px',
    borderRadius: '50%', // Keep the button circular
    border: '2px solid transparent', // Remove solid borders

    color: '#fff', // Text color for better contrast
    fontSize: '20px', // Increase font size for better visibility
    display: 'flex', // Center content
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer', // Ensure cursor is pointer on hover
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
    transition: 'all 0.3s ease', // Smooth transition for hover/click effects
    overflow: 'hidden',
  },
};
