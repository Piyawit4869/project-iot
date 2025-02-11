'use client';
// import * as Icons from 'lucide-react';
import React, { useState } from 'react';
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
// import { Input } from '@nextui-org/react';

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
  const [
    currentRowsPerPage,
    // setCurrentRowsPerPage
  ] = useState(rowsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= initialMeta.totalPages) {
      onPageChange(newPage);
    }
  };

  // const handleRowsPerPageChange = (value: number) => {
  //   setCurrentRowsPerPage(value); // อัปเดต state
  //   if (onRowsPerPageChange) {
  //     onRowsPerPageChange(value); // เรียก callback ที่ส่งมาจาก props
  //   }
  // };

  const limits = [
    { label: '5', value: '5' },
    { label: '10', value: '10' },
    { label: '15', value: '15' },
    { label: '20', value: '20' },
    { label: '25', value: '25' },
    { label: '50', value: '50' },
  ];

  return (
    <div className="bg-white px-5 py-4 rounded-xl ">
      <div className="overflow-x-auto rounded-xl ">
        <Table className="border bg-white rounded-xl">
          <TableHeader className="rounded-t-xl">
            <TableRow className=" text-sm hover:bg-gray-50 divide-x">
              {columns.map((col) => (
                <TableCell
                  key={col.dataIndex}
                  className="py-2.5 px-4 font-semibold text-left whitespace-nowrap"
                  align={col.align || 'left'}
                >
                  {col.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialRows.length > 0 ? (
              initialRows.map((row, idx) => (
                <TableRow key={idx} className="hover:bg-gray-50">
                  {columns.map((col) => (
                    <TableCell
                      key={col.dataIndex}
                      className="p-3 border border-gray-200 text-sm"
                      align={col.align || 'left'}
                    >
                      {col.render ? (
                        col.render(row[col.dataIndex], row, idx)
                      ) : col.link ? (
                        <Link
                          href={`${col.link}/${row.id}`}
                          className="text-accent1 hover:underline"
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
                <TableCell
                  colSpan={columns.length + 1}
                  className="text-center text-gray-500 p-4"
                >
                  ไม่พบข้อมูล
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col md:flex-row gap-5 justify-end items-center mt-4 space-y-4 md:space-y-0">
        <div className="text-gray-700 text-sm">
          <strong>
            {Math.min(
              currentRowsPerPage * (initialMeta.currentPage - 1) + 1,
              initialMeta.totalItems,
            )}{' '}
            -{' '}
            {Math.min(
              currentRowsPerPage * initialMeta.currentPage,
              initialMeta.totalItems,
            )}
          </strong>{' '}
          จากทั้งหมด <strong>{initialMeta.totalItems}</strong> รายการ
        </div>

        {onRowsPerPageChange && (
          <div className="flex items-center space-x-2">
            <span className="text-sm">แสดง:</span>
            <Select
              onValueChange={(value) => onRowsPerPageChange(Number(value))}
            >
              <SelectTrigger className="w-[110px] h-[30px] p-1 text-sm">
                <SelectValue
                  placeholder={`${currentRowsPerPage} รายการ`}
                  className="text-sm"
                />
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
            className="text-gray-700 hover:text-accent1 disabled:text-gray-400"
          >
            ย้อนกลับ
          </Button>

          {initialMeta.currentPage > 2 && (
            <Button
              size={'sm'}
              onClick={() => handlePageChange(1)}
              className="text-gray-700 hover:text-accent1"
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
                    ? 'text-white bg-accent1'
                    : 'text-gray-700 hover:text-accent1'
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
              className="text-gray-700 hover:text-accent1"
            >
              {initialMeta.totalPages}
            </Button>
          )}

          <Button
            size={'sm'}
            onClick={() => handlePageChange(initialMeta.currentPage + 1)}
            disabled={initialMeta.currentPage === initialMeta.totalPages}
            className="text-gray-700 hover:text-accent1 disabled:text-gray-400"
          >
            ถัดไป
          </Button>
        </div>
      </div>
    </div>
  );
};
