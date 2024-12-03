import { SpinProps, Table, TablePaginationConfig } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { FC } from 'react';

interface TableComponentProps {
  columns: ColumnsType<any>;
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

  const paginate = {
    ...pagination,
    showSizeChanger: true,
    locale: { items_per_page: 'รายการ / หน้า' },
  };
  return (
    <Table
      loading={loading}
      bordered={bordered}
      pagination={paginate}
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
