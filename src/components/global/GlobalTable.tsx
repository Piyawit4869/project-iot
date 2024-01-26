import { Table } from "antd";

export const GlobalTable = (props: any) => {
  return (
    <>
      <Table
        style={{ marginTop: "15px" }}
        dataSource={props.dataSource}
        columns={props.columns}
      />
    </>
  );
};
