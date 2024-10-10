import { Layout } from 'antd';
import { Contents, Headerbar, Sidebar } from '.';

export const AdminLayout = () => {
  return (
    <>
      <Layout
        style={{ height: '100vh', display: 'flex', flexDirection: 'row' }}
      >
        <Sidebar setting={{}} />
        <Layout>
          <Headerbar />
          <Contents />
        </Layout>
      </Layout>
    </>
  );
};
