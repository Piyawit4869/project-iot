import { Layout } from "antd";
import { useNavigation } from "react-router-dom";
import { Contents, Headerbar, Sidebar } from ".";
import React from "react";

export const AppLayout = () => {
  const [loading, setLoading] = React.useState(true);
  const { state } = useNavigation();


  

  React.useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      <Layout
        style={{ height: "100vh", display: "flex", flexDirection: "row" }}
      >
        <Sidebar />
        <Layout>
          <Headerbar />

          <Contents loading={loading || state === "submitting"} />
        </Layout>
      </Layout>
    </>
  );
};
