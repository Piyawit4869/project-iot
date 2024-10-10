import { InfoCircleOutlined } from '@ant-design/icons';
import { TitleBar } from '@src/components/shared';
import { TableComponent } from '@src/components/shared/TableComponent';
import { Button, Card, Col, Flex, Row, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

type AttendanceLoaderData = {
  data: any;
};

export const AttendanceIndex = () => {
  const { data: myAttendance } = useLoaderData() as AttendanceLoaderData;
  const [attendance, setAttendance] = React.useState(true);
  const me = JSON.parse(localStorage.getItem('me') as any);

  console.log('data in index page', myAttendance);
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
      {(me.role.name === 'owner' || me.role.name === 'manager') && (
        <div style={{ marginBottom: '30px' }}>
          <TitleBar
            title={'ภาพรวมการทำงานในองค์กรวันนี้'}
            subTitle={'สวัสดีตอนเที่ยง!'}
          />
          <div style={{ margin: '5px 0px 5px 0px' }}>
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                    <Link style={{ width: '100%' }} to="#">
                      <Card>
                        <Flex vertical align="center">
                          <Typography style={{ color: 'white' }}>
                            ยังไม่เข้างาน 1 คน
                          </Typography>
                        </Flex>
                      </Card>
                    </Link>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <Link style={{ width: '100%' }} to="#">
                      <Card>
                        <Flex vertical align="center">
                          <Typography style={{ color: 'white' }}>
                            คนที่ขาด 1 คน
                          </Typography>
                        </Flex>
                      </Card>
                    </Link>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <Link style={{ width: '100%' }} to="#">
                      <Card>
                        <Flex vertical align="center">
                          <Typography style={{ color: 'white' }}>
                            คนที่ลา 1 คน
                          </Typography>
                        </Flex>
                      </Card>
                    </Link>
                  </Col>
                  <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                    <Link style={{ width: '100%' }} to="#">
                      <Card>
                        <Flex vertical align="center">
                          <Typography style={{ color: 'white' }}>
                            ออกงานก่อนเวลา 1 คน
                          </Typography>
                        </Flex>
                      </Card>
                    </Link>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <TableComponent
                columns={myAttendanceColumns}
                dataSource={myAttendance}
              />
            </Col>
          </Row>
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
