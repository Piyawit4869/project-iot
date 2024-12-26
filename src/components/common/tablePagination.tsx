'use client';

import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from '@nextui-org/react';
import Link from 'next/link';

interface Column {
  title: string;
  dataIndex: string;
  align?: 'left' | 'center' | 'right';
  link?: string;
}

interface Meta {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

interface TablePaginationClientProps {
  initialRows: any[];
  initialMeta: Meta;
  rowsPerPage: number;
  // handleValueChange: any;
  columns: Column[];
}

export const TablePagination: React.FC<TablePaginationClientProps> = ({
  initialRows,
  initialMeta,
  // rowsPerPage,
  // handleValueChange,
  columns,
}) => {
  return (
    <div>
      <Table aria-label="Paginated Table">
        <TableHeader>
          {columns.map((col: any) => (
            <TableColumn key={col.dataIndex} align={col.align || 'left'}>
              {col.title}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody>
          {initialRows.map((row, idx) => (
            <TableRow key={idx}>
              {columns.map((col) =>
                col.link ? (
                  <TableCell key={col.dataIndex}>
                    <Link href={`${col.link}/${row.id}`}>
                      {row[col.dataIndex]}
                    </Link>
                  </TableCell>
                ) : (
                  <TableCell key={col.dataIndex}>
                    {row[col.dataIndex]}
                  </TableCell>
                ),
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        page={initialMeta.currentPage}
        total={initialMeta.totalPages}
        // onChange={handleValueChange}
      />
    </div>
  );
};
