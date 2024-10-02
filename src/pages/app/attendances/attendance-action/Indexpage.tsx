import { TitleBar } from '@src/components/shared';
import { Button, Card, Col, Flex, List, Row, Typography } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

export const AttendanceAction = () => {
  const { data } = useLoaderData() as any;
  const [attendance, setAttendance] = React.useState(true);

  return (
    <>
      <TitleBar
        title={'การเข้างาน - ออกงาน'}
        subTitle={'วันนี้ฉันทำงานเป็นยังไงบ้างนะ'}
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
                style={styles.actionButton}
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
                  setAttendance(!attendance); // Toggle attendance state
                }}
              >
                <Typography
                  style={{
                    color: 'white',
                    fontSize: '24px',
                    fontWeight: 'bold',
                  }}
                >
                  {attendance ? 'เข้างาน' : 'พักเบรค'}
                </Typography>
              </Button>

              <Button
                style={{ width: '100px', height: '35px' }}
                onClick={() => {
                  setAttendance(true);
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
              <Typography.Title level={5} style={{ marginTop: '12px' }}>
                {'รายละเอียดเข้างาน - ออกงาน'}
              </Typography.Title>
              <Typography.Paragraph>
                {'ทำงานไป 5 ชั่วโมง 15 นาที'}
              </Typography.Paragraph>
              <Typography.Paragraph>
                {'พักเบรคไป  57 นาที'}
              </Typography.Paragraph>
              <Flex justify="end">
                <Button type="primary">ดูเพิ่มเติม</Button>
              </Flex>
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
            dataSource={data}
            renderItem={(item: any) => (
              <List.Item>
                <Flex gap={6}>
                  <Typography>{item.username} </Typography>
                  <Typography>{item.event} </Typography>
                  <Typography>
                    {dayjs(item.createdAt).format('M/D/YYYY h:mm A')}
                  </Typography>
                </Flex>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};

const styles: Record<string, React.CSSProperties> = {
  actionButton: {
    width: '250px',
    height: '250px',
    borderRadius: '50%', // Keep the button circular
    border: '2px solid transparent', // Remove solid borders
    backgroundImage: 'linear-gradient(145deg, #6E85B7, #ABC4FF)', // Cool gradient background
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
