import { InfoCircleOutlined } from '@ant-design/icons';
import { TitleBar } from '@src/components/shared';
import { TableComponent } from '@src/components/shared/TableComponent';
import { Card, Col, Row, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { Link, useLoaderData } from 'react-router-dom';

type AttendanceLoaderData = {
  data: any;
};

export const AttendanceIndex = () => {
  const { data: myAttendance } = useLoaderData() as AttendanceLoaderData;
  const me = JSON.parse(localStorage.getItem('me') as any);

  const myAttendanceColumns: ColumnsType<any> | undefined = [
    {
      title: 'ลำดับ',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
    },
    {
      title: 'ชื่อ',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'กิจกรรม',
      dataIndex: 'event',
      key: 'event',
    },
    {
      title: 'เข้างาน',
      dataIndex: 'clockIn',
      key: 'clockIn',
    },
    {
      title: 'พักเบรก',
      dataIndex: 'breakTimes',
      key: 'breakTimes',
    },
    {
      title: 'ออกงาน',
      dataIndex: 'clockOut',
      key: 'clockIn',
    },
    {
      title: 'สรุปเวลาเข้างาน',
      dataIndex: 'eventTime',
      key: 'eventTime',
    },
    {
      title: 'หมายเหตุ',
      dataIndex: 'reMark',
      key: 'reMark',
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

  return (
    <>
      {me.role.name === 'owner' || me.role.name === 'manager' ? (
        <div style={{ marginBottom: '30px' }}>
          <TitleBar
            title={'ภาพรวมการทำงานในองค์กรวันนี้'}
            subTitle={'สวัสดีตอนเที่ยง!'}
          />
          <Row gutter={[12, 12]} style={{ marginTop: '12px' }}>
            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              <Card
                title={'ยังไม่เข้างาน'}
                style={{
                  background: 'white',
                  borderTop: '4px solid #19142A',
                  borderTopWidth: '5px',
                }}
                bodyStyle={{ padding: '0 22px' }}
              >
                <Typography.Title level={3}>0 คน</Typography.Title>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              <Card
                title={'ลากิจ / ลาป่วย'}
                style={{
                  background: 'white',
                  borderTop: '4px solid #19142A',
                  borderTopWidth: '5px',
                }}
                bodyStyle={{ padding: '0 22px' }}
              >
                <Typography.Title level={3}>1 คน</Typography.Title>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={12} lg={8} xl={8}>
              <Card
                title={'เข้างานแล้ว'}
                style={{
                  background: 'white',
                  borderTop: '4px solid #19142A',
                  borderTopWidth: '5px',
                }}
                bodyStyle={{ padding: '0 22px' }}
              >
                <Typography.Title level={3}>7 คน</Typography.Title>
              </Card>
            </Col>

            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              style={{ marginTop: '12px' }}
            >
              <TableComponent
                columns={myAttendanceColumns}
                dataSource={myAttendance}
              />
            </Col>
          </Row>
        </div>
      ) : (
        <div style={{ marginBottom: '30px' }}>
          <TitleBar
            title={'การทำงานของฉันวันนี้'}
            subTitle={'วันนี้ฉันทำงานเป็นยังไงบ้างนะ'}
          />
          <Row gutter={[12, 12]} style={{ marginTop: '12px' }}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Link to={'#'}>
                <Card
                  title={'เหลือวันลา'}
                  style={{
                    background: 'white',
                    borderTop: '4px solid #19142A',
                    borderTopWidth: '5px',
                  }}
                  bodyStyle={{ padding: '0 22px' }}
                >
                  <Typography.Title level={3}>2 วัน</Typography.Title>
                </Card>
              </Link>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Link to={'#'}>
                <Card
                  title={'นัดหมายในวันนี้'}
                  style={{
                    background: 'white',
                    borderTop: '4px solid #19142A',
                    borderTopWidth: '5px',
                  }}
                  bodyStyle={{ padding: '0 22px' }}
                >
                  <Typography.Title level={3}>2 นัดหมาย</Typography.Title>
                </Card>
              </Link>
            </Col>
            <Col
              xs={24}
              sm={24}
              md={24}
              lg={24}
              xl={24}
              style={{ marginTop: '12px' }}
            >
              <TableComponent
                columns={myAttendanceColumns}
                dataSource={myAttendance}
              />
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};
