'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
} from '@/components/ui/select';
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
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.dataIndex} align={col.align || 'left'}>
                {col.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {initialRows.length > 0 ? (
            initialRows.map((row, idx) => (
              <TableRow key={idx}>
                {columns.map((col) => (
                  <TableCell key={col.dataIndex}>
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                ไม่พบข้อมูล
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-4 md:space-y-0">
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

        {onRowsPerPageChange && (
          <div className="flex items-center space-x-2">
            <span>แสดง:</span>
            <Select
              onValueChange={(value) => onRowsPerPageChange(Number(value))}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {limits.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label} รายการ
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <Button
            size={'sm'}
            onClick={() => handlePageChange(initialMeta.currentPage - 1)}
            disabled={initialMeta.currentPage === 1}
            className="text-gray-700 hover:text-blue-500 disabled:text-gray-400"
          >
            ย้อนกลับ
          </Button>

          {initialMeta.currentPage > 2 && (
            <Button
              size={'sm'}
              onClick={() => handlePageChange(1)}
              className="text-gray-700 hover:text-blue-500"
            >
              1
            </Button>
          )}
          {initialMeta.currentPage > 3 && <span className="px-2">...</span>}

          {Array.from(
            { length: 3 },
            (_, index) => initialMeta.currentPage - 1 + index,
          )
            .filter(
              (pageNumber) =>
                pageNumber > 0 && pageNumber <= initialMeta.totalPages,
            )
            .map((pageNumber) => (
              <Button
                size={'sm'}
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                variant={
                  initialMeta.currentPage === pageNumber ? 'default' : 'outline'
                }
                className={`${
                  initialMeta.currentPage === pageNumber
                    ? 'text-white bg-blue-500'
                    : 'text-gray-700 hover:text-blue-500'
                }`}
              >
                {pageNumber}
              </Button>
            ))}

          {initialMeta.currentPage < initialMeta.totalPages - 2 && (
            <span className="px-2">...</span>
          )}
          {initialMeta.currentPage < initialMeta.totalPages - 1 && (
            <Button
              size={'sm'}
              onClick={() => handlePageChange(initialMeta.totalPages)}
              className="text-gray-700 hover:text-blue-500"
            >
              {initialMeta.totalPages}
            </Button>
          )}

          <Button
            size={'sm'}
            onClick={() => handlePageChange(initialMeta.currentPage + 1)}
            disabled={initialMeta.currentPage === initialMeta.totalPages}
            className="text-gray-700 hover:text-blue-500 disabled:text-gray-400"
          >
            ถัดไป
          </Button>
        </div>
      </div>
    </div>
  );
};
