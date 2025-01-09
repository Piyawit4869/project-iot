'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Select,
  SelectItem,
} from '@nextui-org/react';
import Link from 'next/link';

interface Column {
  title: string;
  dataIndex: string;
  align?: 'left' | 'center' | 'right';
  link?: string;
  render?: (value: string, record: any, index: number) => React.ReactNode;
}

interface Meta {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

interface TablePaginationProps {
  initialRows: any[];
  initialMeta: Meta;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  columns: Column[];
}

export const TablePagination: React.FC<TablePaginationProps> = ({
  initialRows,
  initialMeta,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  columns,
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= initialMeta.totalPages) {
      onPageChange(newPage);
    }
  };

  const limits = [
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '20', value: '20' },
    { label: '50', value: '50' },
  ];

  return (
    <div>
      <div>
        <div className="w-full overflow-x-auto">
          <div className="w-full mx-auto">
            <Table
              aria-label="Paginated Table"
              className="w-full min-w-[300px]"
            >
              <TableHeader>
                {columns.map((col: any) => (
                  <TableColumn
                    key={col.dataIndex}
                    className="border-b-2 border-gray-300 px-4 py-2 text-left whitespace-nowrap"
                  >
                    {col.title}
                  </TableColumn>
                ))}
              </TableHeader>
              <TableBody emptyContent={'ไม่พบข้อมูล'}>
                {initialRows.map((row, idx) => (
                  <TableRow
                    key={idx}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    {columns.map((col, colIdx) => (
                      <TableCell
                        key={col.dataIndex}
                        className={`px-4 py-2 whitespace-nowrap text-xs ${
                          colIdx !== columns.length - 1
                            ? 'border-r border-gray-200'
                            : ''
                        }`}
                      >
                        {col.render ? (
                          col.render(row[col.dataIndex], row, idx)
                        ) : col.link ? (
                          <Link
                            href={`${col.link}/${row.id}`}
                            className="text-blue-500 hover:underline"
                          >
                            {row[col.dataIndex] || '-'}
                          </Link>
                        ) : (
                          row[col.dataIndex] || '-'
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* This wrapper forces horizontal scrolling */}
      </div>

      {/* ✅ Pagination Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 p-4 bg-gray-100 rounded-lg shadow">
        <div className="text-gray-700 text-xs">
          <strong>
            {Math.min(
              rowsPerPage * (initialMeta.currentPage - 1) + 1,
              initialMeta.totalItems,
            )}{' '}
            -{' '}
            {Math.min(
              rowsPerPage * initialMeta.currentPage,
              initialMeta.totalItems,
            )}
          </strong>{' '}
          จากทั้งหมด <strong>{initialMeta.totalItems}</strong> รายการ
          {/* ✅ Rows Per Page Selector */}
          {onRowsPerPageChange && (
            <div className="flex items-center gap-2">
              <span className="text-sm">แสดง:</span>
              <Select
                size="sm"
                className="w-[100px]"
                onChange={(e) => {
                  onRowsPerPageChange(Number(e.target.value));
                }}
              >
                {limits.map((item: any) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label} รายการ
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}
        </div>

        {/* ✅ Page Numbers */}
        <div className="flex items-center gap-2 my-2 md:my-0">
          {Array.from({ length: initialMeta.totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                initialMeta.currentPage === index + 1
                  ? 'bg-accent1 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-blue-300 hover:text-white'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* ✅ Navigation Buttons */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => handlePageChange(initialMeta.currentPage - 1)}
            disabled={initialMeta.currentPage === 1}
            className={`px-4 py-2 rounded-md text-xs font-medium transition ${
              initialMeta.currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-400'
            }`}
          >
            ย้อนกลับ
          </Button>
          <Button
            size="sm"
            onClick={() => handlePageChange(initialMeta.currentPage + 1)}
            disabled={initialMeta.currentPage === initialMeta.totalPages}
            className={`px-4 py-2 rounded-md text-xs font-medium transition ${
              initialMeta.currentPage === initialMeta.totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-accent1 text-white hover:bg-blue-600'
            }`}
          >
            ถัดไป
          </Button>
        </div>
      </div>
    </div>
  );
};
