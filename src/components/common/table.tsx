'use client';

import Link from 'next/link';
import React from 'react';

export const Table = ({ data, columns }: any) => {
  const [sortColumn, setSortColumn] = React.useState(null);
  const [sortOrder, setSortOrder] = React.useState('asc'); // 'asc' or 'desc'

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortColumn) return data;
    return [...data].sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sortColumn, sortOrder]);

  const handleSort = (column: any) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  return (
    <table className="min-w-full border border-gray-200 divide-y divide-gray-200 shadow-sm">
      <thead className="bg-primary">
        <tr>
          {columns.map((column: any) => (
            <th
              key={column.accessor}
              onClick={() => handleSort(column.accessor)}
              className="px-6 py-3 text-left text-sm text-white uppercase tracking-wider cursor-pointer select-none hover:bg-gray-600"
            >
              {column.Header}
              {sortColumn === column.accessor ? (
                sortOrder === 'asc' ? (
                  <span> 🔼</span>
                ) : (
                  <span> 🔽</span>
                )
              ) : null}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {sortedData?.map((row: any, rowIndex: any) => (
          <Link href={`organization/${row.id}`} key={rowIndex} legacyBehavior>
            <tr className="hover:bg-gray-50 cursor-pointer">
              {columns?.map((column: any) => (
                <td
                  key={column.accessor}
                  className="px-6 py-4 text-sm text-gray-700"
                >
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          </Link>
        ))}
      </tbody>
    </table>
  );
};
