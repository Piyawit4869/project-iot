import React, { useState } from 'react';
import { Typography, Flex, Row, Col } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import { Link, useLoaderData, useNavigation } from 'react-router-dom';
import { TableComponent } from '@src/components/shared/TableComponent';
import { CreateButton } from '@src/components/shared/CreateButton';
import { SearchBar } from '@src/components/shared/SearchBar';
import { branchColumn } from './branchData';
import { TitleBar } from '@src/components/shared';

export const BranchIndex: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { branch, param } = useLoaderData() as any;
  const { state } = useNavigation();

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Flex vertical gap={'small'}>
      <TitleBar
        title={'ข้อมูลสาขา'}
        subTitle={
          <Row gutter={6} align="middle">
            <Col>
              <TagOutlined />
            </Col>
            <Col>
              <Typography>ข้อมูลสาขา</Typography>
            </Col>
          </Row>
        }
        buttons={[
          <Link to={'create'}>
            <CreateButton label={'เพิ่มข้อมูลสาขา'} />
          </Link>,
        ]}
      />

      <div style={{ height: '25px' }} />
      <SearchBar />

      <TableComponent
        columns={branchColumn}
        dataSource={branch}
        loading={loading || state === 'loading' || state === 'submitting'}
        pagination={{
          current: param && param.page ? Number(param?.page) : 1,
          pageSize: param && param.limit ? Number(param?.limit) : 10,
          total: branch && branch.meta ? branch.meta.totalItems : 10,
          showTotal: (total: any, range: any) =>
            `${range[0]}-${range[1]} ของ ${total} องค์กรทั้งหมด`,
        }}
        bordered
      />
    </Flex>
  );
};

export default BranchIndex;
