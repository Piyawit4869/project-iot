'use client';

import React from 'react';
import debounce from 'lodash/debounce';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Input, Link } from '@nextui-org/react';
import { TablePagination } from '@/components/common/tablePagination';
import pagination from '@/pages/api/templates/pagination';

export default function TemplatesPage() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filters, setFilters] = React.useState({ templateName: '', docNo: '' });
  const [items, setItems] = React.useState([]) as any;
  const [meta, setMeta] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });
  const [loading, setLoading] = React.useState(false);

  // Fetch data from the API
  const fetchNotations = async () => {
    setLoading(true);
    try {
      const { templateName, docNo } = filters;
      const { items: fetchedItems, meta: fetchedMeta } = await pagination({
        page,
        limit: rowsPerPage,
        ...(templateName && { templateName }),
        ...(docNo && { docNo }),
      });
      setItems(fetchedItems);
      setMeta(fetchedMeta);
    } catch (error) {
      console.error('Error fetching notations:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debounced function to handle filter changes
  const handleFilterChange = React.useCallback(
    debounce((updatedFilters) => {
      setPage(1); // Reset to the first page for new filters
      setFilters(updatedFilters);
    }),
    [],
  );

  // Handle input changes
  const onInputChange = (key: keyof typeof filters, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    handleFilterChange(updatedFilters);
  };

  // Fetch data whenever filters, page, or rowsPerPage change
  React.useEffect(() => {
    fetchNotations();
  }, [filters, page, rowsPerPage]);

  console.log({ items });

  return (
    <div>
      <Scaffold
        child={
          <div>
            <TopSection
              title="รูปแบบเอกสาร"
              buttons={[
                <Link href={'template/create'} key={'create button'}>
                  <Button
                    className="bg-accent1 text-white"
                    key={'create button'}
                  >
                    สร้างรูปแบบเอกสาร
                  </Button>
                </Link>,
              ]}
            />
            <div className="bg-white shadow rounded-lg mb-4 mt-4">
              <div className="flex flex-wrap gap-4">
                <Input
                  className="flex-1 p-2 text-headFont"
                  labelPlacement="outside"
                  size="lg"
                  name="templateName"
                  placeholder="ค้นหาชื่อรูปแบบเอกสาร"
                  value={filters.templateName}
                  onChange={(e) =>
                    onInputChange('templateName', e.target.value)
                  }
                />
                <Input
                  className="flex-1 p-2 text-headFont"
                  labelPlacement="outside"
                  size="lg"
                  name="docNo"
                  placeholder="ค้นหาหมายเลขเอกสาร"
                  value={filters.docNo}
                  onChange={(e) => onInputChange('docNo', e.target.value)}
                />
              </div>
            </div>
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="spinner"></div>
              </div>
            ) : (
              <TablePagination
                initialRows={items}
                initialMeta={meta}
                rowsPerPage={rowsPerPage}
                columns={columns}
                onPageChange={(newPage) => setPage(newPage)}
                onRowsPerPageChange={(newRowsPerPage) =>
                  setRowsPerPage(newRowsPerPage)
                }
              />
            )}
          </div>
        }
        backgroundColor={''}
      />
    </div>
  );
}

const columns = [
  {
    title: 'ชื่อรูปแบบเอกสาร',
    dataIndex: 'templateName',
    link: '/admin/notation/template',
  },
  // { title: 'ประเภทเอกสาร', dataIndex: 'type' },
  // { title: 'การดำเนินการ', dataIndex: 'status' },
  // { title: 'สถานะเอกสาร', dataIndex: 'docStatus' },
];
