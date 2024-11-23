import { TableComponent, TitleBar } from '@src/components/shared';
import { CreateButton } from '@src/components/shared/CreateButton';
import { Flex, Space } from 'antd';
import { debounce } from 'lodash';
import React from 'react';
import { Link, useNavigation, useSubmit } from 'react-router-dom';
import { mockupSettings, systemColumns } from './SettingData';

export const SystemIndex = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const submit = useSubmit();
  const { state } = useNavigation();

  const handleChange = React.useMemo(() => {
    const fetchData = (pagination: any) => {
      const { current, pageSize } = pagination;

      let payload = {} as any;

      payload = {
        ...{},
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
  }, []);

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <Flex vertical gap={'small'}>
      <Space
        direction="vertical"
        style={{
          width: '100%',
          backgroundColor: 'white',
          borderRadius: 5,
          padding: '20px 0px',
          position: 'sticky',
          zIndex: 10,
          borderImageSlice: 1,
          top: '-10px',
        }}
      >
        <TitleBar
          title={'การตั้งค่าทั้งหมดในองค์กร'}
          buttons={[
            <Link to={'create'}>
              <CreateButton label={'เพิ่มข้อมูลการตั้งค่า'} />
            </Link>,
          ]}
        />
        <div style={{ height: '10px' }} />
        <TableComponent
          columns={systemColumns}
          dataSource={mockupSettings}
          loading={loading || state === 'loading' || state === 'submitting'}
          pagination={false}
          // pagination={
          //   {
          //     current: param && param?.page ? Number(param?.page) : 1,
          //     pageSize: param && param?.limit ? Number(param?.limit) : 10,
          //     total: organize && organize?.meta ? organize?.meta?.totalItems : 10,
          //     showTotal: (total: any, range: any) =>
          //       `${range[0]}-${range[1]} ของ ${total} ที่อยู่ทั้งหมด`,
          //   }
          // }
          bordered
          onChange={handleChange}
        />
      </Space>
    </Flex>
  );
};
