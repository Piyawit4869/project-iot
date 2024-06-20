import { Table, TablePaginationConfig } from "antd";
import { FC } from "react";

interface TableComponentProps {
  columns: any;
  dataSource: any;
  pagination: false | TablePaginationConfig | undefined;
  bordered: boolean;
}

export const TableComponent: FC<TableComponentProps> = (
  props: TableComponentProps
) => {
  const { columns, bordered, pagination, dataSource } = props;
  return (
    <Table
      bordered={bordered}
      pagination={pagination}
      dataSource={dataSource}
      columns={columns}
    ></Table>
  );
};
