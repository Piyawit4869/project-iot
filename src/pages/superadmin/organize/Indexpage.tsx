import { TagOutlined } from '@ant-design/icons';
import { Col, Flex, Row, Typography } from 'antd';
import { Link, redirect, useLoaderData, useNavigation } from 'react-router-dom';
import { TableComponent } from '@src/components/shared/TableComponent';
import { CreateButton } from '@src/components/shared/CreateButton';
import { SearchBar } from '@src/components/shared/SearchBar';
import React from 'react';
import { organizeColumns } from './organizeData';
import { TitleBar } from '@src/components/shared';

export const OrganizeIndex: React.FC = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const { organize, param } = useLoaderData() as any;
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
      {/* Title section from title component */}
      <TitleBar
        title={'ตั้งค่าองค์กร'}
        subTitle={
          <Row gutter={6} align="middle">
            <Col>
              <TagOutlined />
            </Col>
            <Col>
              <Typography>ค้นหาองค์กร</Typography>
            </Col>
          </Row>
        }
        buttons={[
          <Link to={'create'}>
            <CreateButton label={'เพิ่มข้อมูลองค์กร'} />
          </Link>,
        ]}
      />

      {/* Filter section from search bar component */}
      <div style={{ height: '5px' }} />
      <SearchBar />

      {/* Index data from table component */}
      <TableComponent
        columns={organizeColumns}
        dataSource={organize}
        loading={loading || state === 'loading' || state === 'submitting'}
        pagination={{
          current: param && param.page ? Number(param?.page) : 1,
          pageSize: param && param.limit ? Number(param?.limit) : 10,
          total: organize && organize.meta ? organize.meta.totalItems : 10,
          showTotal: (total: any, range: any) =>
            `${range[0]}-${range[1]} ของ ${total} องค์กรทั้งหมด`,
        }}
        bordered
      />
    </Flex>
  );
};
