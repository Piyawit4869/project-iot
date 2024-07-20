import { SpinProps, Table, TablePaginationConfig } from "antd";
import { FC } from "react";

interface TableComponentProps {
  columns: any;
  dataSource: any;
  pagination: false | TablePaginationConfig | undefined;
  bordered: boolean;
  loading?: boolean | SpinProps | undefined;
}

export const TableComponent: FC<TableComponentProps> = (
  props: TableComponentProps
) => {
  const { columns, bordered, pagination, dataSource, loading } = props;
  return (
    <Table
      loading={loading}
      bordered={bordered}
      pagination={pagination}
      dataSource={dataSource}
      columns={columns}
      locale={{ emptyText: "ไม่พบข้อมูล" }}
      size="small"
    ></Table>
  );
};
