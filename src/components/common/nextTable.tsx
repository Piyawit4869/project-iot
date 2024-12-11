'use client';

import PropTypes from 'prop-types';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from '@nextui-org/react';

export default function NextTable({ columns, rows, ariaLabel, title }: any) {
  return (
    <Table title={title} aria-label={ariaLabel || 'Dynamic table'}>
      <TableHeader>
        {columns.map((column: any) => (
          <TableColumn key={column.dataIndex}>{column.title}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map((row: any) => (
          <TableRow key={row.id}>
            {columns.map((column: any) => (
              <TableCell key={column.dataIndex}>
                {row[column.dataIndex]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

NextTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
    }),
  ).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  ariaLabel: PropTypes.string,
  title: PropTypes.string,
};

NextTable.defaultProps = {
  ariaLabel: 'Dynamic table',
};
