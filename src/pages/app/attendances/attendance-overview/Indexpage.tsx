import { TitleBar } from '@src/components/shared';
import { Card, Col, Flex, Row, Typography } from 'antd';
import { Link } from 'react-router-dom';

export const AttendanceOverview = () => {
  const me = JSON.parse(localStorage.getItem('me') as any);

  return (
    <>
      {(me.role.name === 'owner' || me.role.name === 'manager') && (
        <div style={{ marginBottom: '30px' }}>
          <TitleBar
            title={'ข้อมูลเชิงลึก'}
            subTitle={'การทำงานในองค์กรวันนี้'}
          />
          <div style={{ margin: '5px 0px 5px 0px' }}>
            <Row gutter={[8, 8]}>
              <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                <Row>
                  <Col xs={24} sm={24} md={24} lg={24} xl={6}>
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
                  <Col xs={24} sm={24} md={24} lg={8} xl={6}>
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
                  <Col xs={24} sm={24} md={24} lg={8} xl={6}>
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
                  <Col xs={24} sm={24} md={24} lg={8} xl={6}>
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
        </div>
      )}
    </>
  );
};
