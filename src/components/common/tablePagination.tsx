'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
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
  columns,
}) => {
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= initialMeta.totalPages) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="w-full">
      {/* ✅ Force Horizontal Scroll */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[300px] bg-white shadow-md rounded-lg">
          <Table aria-label="Paginated Table" className="w-full mt-6">
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
            <TableBody>
              {initialRows.map((row, idx) => (
                <TableRow
                  key={idx}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  {columns.map((col, colIdx) => (
                    <TableCell
                      key={col.dataIndex}
                      className={`px-4 py-2 whitespace-nowrap ${
                        colIdx !== columns.length - 1
                          ? 'border-r border-gray-200'
                          : ''
                      }`}
                    >
                      {col.render ? (
                        col.render(row[col.dataIndex], row, idx)
                      ) : col.link ? (
                        <Link href={`${col.link}/${row.id}`}>
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

      {/* ✅ Pagination Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 p-4 bg-gray-100 rounded-lg shadow">
        <div className="text-gray-700 text-sm">
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
          <button
            onClick={() => handlePageChange(initialMeta.currentPage - 1)}
            disabled={initialMeta.currentPage === 1}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              initialMeta.currentPage === 1
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-400'
            }`}
          >
            ย้อนกลับ
          </button>
          <button
            onClick={() => handlePageChange(initialMeta.currentPage + 1)}
            disabled={initialMeta.currentPage === initialMeta.totalPages}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              initialMeta.currentPage === initialMeta.totalPages
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-accent1 text-white hover:bg-blue-600'
            }`}
          >
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
};
