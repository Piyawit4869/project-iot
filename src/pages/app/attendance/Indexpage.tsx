import { InfoCircleOutlined } from '@ant-design/icons';
import { TitleBar } from '@src/components/shared';
import { TableComponent } from '@src/components/shared/TableComponent';
import { Button, Card, Col, Flex, Row, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { Link } from 'react-router-dom';

const AttendanceIndex = () => {
  const [attendance, setAttendance] = React.useState(true);
  const me = JSON.parse(localStorage.getItem('me') as any);
  console.log({ me });

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
      title: 'เวลา',
      dataIndex: 'eventTime',
      key: 'eventTime',
    },
    {
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: '60px',
      render: () => <InfoCircleOutlined onClick={() => {}} />,
    },
  ];

  const myAttendance = [
    {
      id: '1',
      username: 'Pho0m',
      event: 'เข้างาน',
      eventTime: '10:03 นาฬิกา',
    },
    {
      id: '2',
      username: 'Pho0m',
      event: 'พักเบรค',
      eventTime: '11:47 นาฬิกา',
    },
    {
      id: '3',
      username: 'Pho0m',
      event: 'เข้างาน',
      eventTime: '13:05 นาฬิกา',
    },
    {
      id: '4',
      username: 'Pho0m',
      event: 'พักเบรค',
      eventTime: '16:54 นาฬิกา',
    },
    {
      id: '5',
      username: 'Pho0m',
      event: 'ออกงาน',
      eventTime: '17:00 นาฬิกา',
    },
  ];

  return (
    <>
      {(me.role.name === 'owner' || me.role.name === 'manager') && (
        <div style={{ marginBottom: '30px' }}>
          <TitleBar
            title={'ภาพรวมการทำงานในองค์กรวันนี้'}
            subTitle={'สวัสดีตอนเที่ยง!'}
          />
          <Card style={{ backgroundColor: '#f8f9fa' }}>
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                <TableComponent
                  columns={myAttendanceColumns}
                  dataSource={myAttendance}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Flex vertical gap={6}>
                  <Link to="#">
                    <Card>
                      <Flex vertical align="center">
                        <Typography style={{ color: 'white' }}>
                          {me.role.name === 'owner' ||
                          me.role.name === 'manager'
                            ? 'ยังไม่ได้เข้างาน 1 คน'
                            : 'เหลือวันลา 2 วัน'}
                        </Typography>
                      </Flex>
                    </Card>
                  </Link>
                  <Link to="#">
                    <Card>
                      <Flex vertical align="center">
                        <Typography style={{ color: 'white' }}>
                          {me.role.name === 'owner' ||
                          me.role.name === 'manager'
                            ? 'ไม่มีคนลา'
                            : 'มี 3 นัดหมายในวันนี้'}
                        </Typography>
                      </Flex>
                    </Card>
                  </Link>
                </Flex>
              </Col>
            </Row>
          </Card>
        </div>
      )}
      <TitleBar
        title={
          me.role.name === 'owner' || me.role.name === 'manager'
            ? 'การทำงานของฉันวันนี้'
            : 'การทำงานวันนี้'
        }
        subTitle={'วันนี้ฉันทำงานเป็นยังไงบ้างนะ'}
      />
      <Row gutter={[12, 12]}>
        {me.role.name === 'owner' || me.role.name === 'manager' ? (
          <></>
        ) : (
          <Col xs={24} sm={24} md={24} lg={8} xl={8}>
            <Card style={{ backgroundColor: '#f8f9fa', height: '100%' }}>
              <Flex vertical justify="center" align="center" gap={10}>
                <Button
                  shape="circle"
                  style={{ width: '200px', height: '200px' }}
                  onClick={() => {
                    setAttendance(!attendance);
                  }}
                >
                  <Typography>{attendance ? 'เข้างาน' : 'พักเบรค'}</Typography>
                </Button>

                <Button
                  onClick={() => {
                    setAttendance(true);
                  }}
                >
                  ออกงาน
                </Button>
              </Flex>
            </Card>
          </Col>
        )}
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={me.role.name === 'owner' || me.role.name === 'manager' ? 24 : 16}
          xl={me.role.name === 'owner' || me.role.name === 'manager' ? 24 : 16}
        >
          <Card style={{ backgroundColor: '#f8f9fa' }}>
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                <TableComponent
                  columns={myAttendanceColumns}
                  dataSource={myAttendance}
                />
              </Col>
              <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                <Flex vertical gap={6}>
                  <Link to="#">
                    <Card>
                      <Flex vertical align="center">
                        <Typography style={{ color: 'white' }}>
                          เหลือวันลา 2 วัน
                        </Typography>
                      </Flex>
                    </Card>
                  </Link>
                  <Link to="#">
                    <Card>
                      <Flex vertical align="center">
                        <Typography style={{ color: 'white' }}>
                          มี 3 นัดหมายในวันนี้
                        </Typography>
                      </Flex>
                    </Card>
                  </Link>
                </Flex>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AttendanceIndex;
