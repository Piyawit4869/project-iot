import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import { Headerbar } from './Headerbar';
import { FooterNavigateBar } from '@src/components/modules/demo';

export const DemoLayout = () => {
  const { Content } = Layout;

  return (
    <Layout
      style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}
    >
      <Headerbar />

      <Content>
        <Outlet />
      </Content>

      <FooterNavigateBar />
    </Layout>
  );
};
