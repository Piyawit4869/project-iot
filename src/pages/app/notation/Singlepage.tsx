import { Flex, Space } from 'antd';

export const NotationSingle = () => {
  return (
    <Flex vertical gap={'small'}>
      <Space
        direction="vertical"
        style={{
          width: '100%',
          backgroundColor: 'white',
          borderRadius: 5,
          padding: '20px 0px 0px 0px',
          position: 'sticky',
          zIndex: 10,
          borderImageSlice: 1,
          top: '-10px',
        }}
      >
        <div style={{ height: '1000px' }}></div>
      </Space>
    </Flex>
  );
};
