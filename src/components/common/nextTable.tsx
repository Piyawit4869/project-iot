'use client';

import PropTypes from 'prop-types';
import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Button,
} from '@nextui-org/react';
import Tabbar from './tabbar';

export default function NextTable({
  columns,
  rows,
  ariaLabel,
  title,
  rowClickHandler,
  tabs,
  tabFieldName,
}: any) {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedTab, setSelectedTab] = React.useState(
    tabs?.[0]?.value || 'all',
  );

  // Debugging Logs
  console.log('Selected Tab:', selectedTab);
  console.log('Tab Field Name:', tabFieldName);

  // Filter rows based on the selected tab
  const filteredRows = React.useMemo(() => {
    if (selectedTab === 'all') return rows;
    return rows.filter((row: any) => {
      console.log('Row:', row); // Log row data for debugging
      return row[tabFieldName] === selectedTab;
    });
  }, [rows, selectedTab, tabFieldName]);

  console.log('Filtered Rows:', filteredRows); // Log filtered rows for debugging

  const pages = Math.ceil(filteredRows.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const currentRows = filteredRows.slice(startIndex, startIndex + rowsPerPage);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const handleTabChange = (value: string) => {
    console.log('category changed : ', value);

    setSelectedTab(value);
    setPage(1); // Reset to the first page when changing tabs
  };

  return (
    <div className="w-full">
      {tabs && tabs.length ? (
        <div className="flex justify-between items-center mb-3">
          <Tabbar
            tabs={tabs}
            onTabChange={handleTabChange}
            selectedTab={selectedTab}
          />
          <label className="flex items-center text-default-400 text-small">
            รายการต่อหน้า :
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      ) : (
        <div className="flex justify-end items-center mb-3">
          <label className="flex items-center text-default-400 text-small">
            รายการต่อหน้า :
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      )}

      <Table title={title} aria-label={ariaLabel || 'Dynamic table'}>
        <TableHeader>
          {columns.map((column: any) => (
            <TableColumn
              key={column.dataIndex}
              className="bg-accent1 text-white"
              style={{ textAlign: column.align || 'left' }}
            >
              {column.title}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {currentRows.map((row: any, index: any) => (
            <TableRow
              className="cursor-pointer text-headFont hover:bg-accent1 hover:opacity-50 hover:text-white"
              key={index}
              onClick={() => rowClickHandler && rowClickHandler(row)}
            >
              {columns.map((column: any) => (
                <TableCell
                  key={column.dataIndex}
                  style={{ textAlign: column.align || 'left' }}
                >
                  {column.render
                    ? column.render(row[column.dataIndex], row)
                    : row[column.dataIndex]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          <span className="text-default-400 text-small">
            ทั้งหมด {filteredRows.length} รายการ
          </span>
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="secondary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={page === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            ย้อนกลับ
          </Button>
          <Button
            className="bg-secondary text-whiteFont"
            isDisabled={page === pages}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            ถัดไป
          </Button>
        </div>
      </div>
    </div>
  );
}

NextTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
      align: PropTypes.oneOf(['left', 'center', 'right']),
      render: PropTypes.func,
    }),
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  ariaLabel: PropTypes.string,
  title: PropTypes.string,
  rowClickHandler: PropTypes.func,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  tabFieldName: PropTypes.string,
};

NextTable.defaultProps = {
  ariaLabel: 'Dynamic table',
};
