import { TableComponent, TitleBar } from '@src/components/shared';
import { Flex, Space } from 'antd';

export const NotificationIndex = () => {
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
        <TitleBar title={'การแจ้งเตือนทั้งหมดของคุณ'} />
        <TableComponent columns={[]} dataSource={[]} />
      </Space>
    </Flex>
  );
};
