import { Card, Flex, Layout } from 'antd';
import { Outlet } from 'react-router-dom';

export const Contents = () => {
  const { Content } = Layout;
  return (
    <Content
      className="app-background"
      style={{
        overflow: 'auto',
        padding: '20px',
      }}
    >
      <Flex justify="center">
        <Card
          style={{
            backgroundColor: 'white',
            width: '100%',
            maxWidth: '1200px',
            minWidth: '320px',
          }}
        >
          <Outlet />
        </Card>
      </Flex>
    </Content>
  );
};
