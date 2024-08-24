import React, { useState } from 'react';
import { Typography, Flex, Row, Col } from 'antd';
import { TagOutlined } from '@ant-design/icons';
import {
  Link,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import { TableComponent } from '@src/components/shared/TableComponent';
import { CreateButton } from '@src/components/shared/CreateButton';
import { SearchBar } from '@src/components/shared/SearchBar';
import { branchColumn } from './branchData';
import { TitleBar } from '@src/components/shared';
import { debounce } from 'lodash';

export const BranchIndex: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { branch, param } = useLoaderData() as any;
  const { state } = useNavigation();
  const submit = useSubmit();

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleChange = React.useMemo(() => {
    const fetchData = (pagination: any) => {
      const { current, pageSize } = pagination;

      let payload = {} as any;

      payload = {
        ...param,
        page: current,
        limit: pageSize,
      };

      Object.keys(payload).map((key) => {
        if (payload[key] === undefined || payload[key] === '') {
          delete payload[key];
        }

        return payload;
      });

      submit(payload, { method: 'get' });
    };
    return debounce(fetchData, 500);
  }, [param]);

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

      <div style={{ height: '5px' }} />
      <SearchBar />

      <TableComponent
        columns={branchColumn}
        dataSource={branch.items}
        loading={loading || state === 'loading' || state === 'submitting'}
        pagination={{
          current: param && param.page ? Number(param?.page) : 1,
          pageSize: param && param.limit ? Number(param?.limit) : 10,
          total: branch && branch.meta ? branch.meta.totalItems : 10,
          showTotal: (total: any, range: any) =>
            `${range[0]}-${range[1]} ของ ${total} สาขาทั้งหมด`,
        }}
        onChange={handleChange}
        bordered
      />
    </Flex>
  );
};

export default BranchIndex;
