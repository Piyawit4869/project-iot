import { SpinProps, Table, TablePaginationConfig, TableProps } from 'antd';
import { FC } from 'react';

interface TableComponentProps {
  columns: TableProps['columns'];
  dataSource: any;
  pagination?: false | TablePaginationConfig | undefined;
  bordered?: boolean;
  loading?: boolean | SpinProps | undefined;
  onRowClick?: (record: any) => void;
  onChange?: (
    pagination: TablePaginationConfig,
    filters: any,
    sorter: any,
  ) => void;
}

export const TableComponent: FC<TableComponentProps> = (
  props: TableComponentProps,
) => {
  const {
    columns,
    bordered,
    pagination,
    dataSource,
    loading,
    onChange,
    onRowClick,
  } = props;
  return (
    <Table
      loading={loading}
      bordered={bordered}
      pagination={pagination}
      dataSource={dataSource}
      scroll={{ x: 'max-content' }}
      columns={columns}
      locale={{ emptyText: 'ไม่พบข้อมูล' }}
      onChange={onChange}
      size="small"
      onRow={(record) => {
        return {
          onClick: () => {
            if (onRowClick) {
              onRowClick(record);
            }
          },
          style: { cursor: onRowClick ? 'pointer' : 'default' },
        };
      }}
    />
  );
};
