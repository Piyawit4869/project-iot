import React from 'react';
import { Typography, Flex, Col, Row } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import { Link, redirect, useNavigation } from 'react-router-dom';
import { TableComponent } from '@src/components/shared/TableComponent';
import { CreateButton } from '@src/components/shared/CreateButton';
import { exployeeColumns } from './employeeData';
import { SearchBar } from '@src/components/shared/SearchBar';
import { TitleBar } from '@src/components/shared';

export const UsersIndex: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const { state } = useNavigation();

  React.useEffect(() => {
    const me = JSON.parse(localStorage.getItem('me') as any);
    if (me.role.name !== 'super_admin') {
      redirect('/');
    }
  }, []);

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Flex vertical gap={'small'}>
      <TitleBar
        title={'ข้อมูลพนักงาน'}
        subTitle={
          <Row gutter={6} align="middle">
            <Col>
              <TagOutlined />
            </Col>
            <Col>
              <Typography>ค้นหาพนักงาน</Typography>
            </Col>
          </Row>
        }
        buttons={[
          <Link to={'create'}>
            <CreateButton label={'เพิ่มข้อมูลพนักงาน'} disable />
          </Link>,
        ]}
      />
      <div style={{ height: '5px' }} />
      <SearchBar />
      <TableComponent
        columns={exployeeColumns}
        dataSource={[]} // Slice data for pagination
        loading={loading || state === 'loading' || state === 'submitting'}
        pagination={{
          showTotal: (total: any, range: any) =>
            `${range[0]}-${range[1]} ของ ${total} พนักงานทั้งหมด`,
        }}
        bordered
      />
    </Flex>
  );
};

export default UsersIndex;
