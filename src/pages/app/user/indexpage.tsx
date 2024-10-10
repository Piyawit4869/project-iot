import React, { useEffect, useState } from 'react';
import { Typography, Flex, Row, Col } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import { Link, useLoaderData, useNavigation } from 'react-router-dom';
import { TableComponent } from '@src/components/shared/TableComponent';
import { CreateButton } from '@src/components/shared/CreateButton';
import { userColumns } from './userData';
import { TitleBar } from '@src/components/shared';

export const UsersIndex: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { user, param } = useLoaderData() as any;
  const { state } = useNavigation();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [user]);

  return (
    <Flex vertical gap={'small'}>
      <TitleBar
        title={'ข้อมูลผู้ใช้'}
        subTitle={
          <Row gutter={6} align="middle">
            <Col>
              <TagOutlined />
            </Col>
            <Col>
              <Typography>ข้อมูลผู้ใช้</Typography>
            </Col>
          </Row>
        }
        buttons={[
          <Link to={'create'}>
            <CreateButton label={'เพิ่มข้อมูลผู้ใช้'} />
          </Link>,
        ]}
      />

      <div style={{ height: '5px' }} />

      <TableComponent
        columns={userColumns}
        dataSource={user?.items ? user.items : []}
        loading={loading || state === 'loading' || state === 'submitting'}
        pagination={{
          current: param && param.page ? Number(param?.page) : 1,
          pageSize: param && param.limit ? Number(param?.limit) : 10,
          total: user && user.meta ? user.meta.totalItems : 10,
          showTotal: (total: any, range: any) =>
            `${range[0]}-${range[1]} ของ ${total} ผู้ใช้ทั้งหมด`,
        }}
        bordered
      />
    </Flex>
  );
};
