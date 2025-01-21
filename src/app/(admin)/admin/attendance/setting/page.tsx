'use client';

import React from 'react';
import debounce from 'lodash/debounce';
import { TopSection } from '@/components/common/topSection';
import { Button, Input, Link } from '@nextui-org/react';
import pagination from '@/pages/api/attendances/pagination';
import { TablePagination } from '@/components/common/tablePagination';
import { formatDate } from '@/utils/enums/date';
interface FilterState {
  name: string;
  docNo: string;
}
interface AttendanceItem {
  records: {
    status: string;
    stamp: string;
    action: string;
    currentDate: string;
    workInfo: {
      user: {
        userName: string;
      };
    };
  };
}

interface MetaData {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export default function SettingAttendancePage() {
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filters, setFilters] = React.useState<FilterState>({
    name: '',
    docNo: '',
  });
  const [items, setItems] = React.useState<AttendanceItem[]>([]) as any;
  const [meta, setMeta] = React.useState<MetaData>({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });

  // Fetch data from the API
  const fetchAttendances = async () => {
    setLoading(true);
    try {
      const { name, docNo } = filters;
      const { items: fetchedItems, meta: fetchedMeta } = await pagination({
        page,
        limit: rowsPerPage,
        ...(name && { name }),
        ...(docNo && { docNo }),
      });

      // Ensure fetchedMeta is not undefined or null, and set default values if needed
      const metaData = fetchedMeta || {
        totalItems: 0,
        itemsPerPage: 10,
        totalPages: 0,
        currentPage: 1, // Default currentPage value
      };

      // Update items if fetchedItems is an array
      if (Array.isArray(fetchedItems)) {
        setItems(
          fetchedItems.map((item: AttendanceItem) => ({
            ...item,
            userName: item.records.workInfo.user.userName || '',
            action: item.records.action || '',
            currentDate: item.records.currentDate || '',
            stampDate: formatDate(item.records.stamp).date || '',
            stampTime: formatDate(item.records.stamp).time || '',
          })),
        );
      } else {
        setItems([]); // If fetchedItems is not an array, set items to an empty array
      }
      console.log(fetchedItems);
      console.log(fetchedMeta);
      console.log(fetchedItems);
      console.log(items); // Log transformed items before setItems

      // Set the meta state, ensuring it has default values
      setMeta(metaData);
    } catch (error) {
      console.error('Error fetching attendance:', error);
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
    [filters],
  );

  // Handle input changes
  const onInputChange = (key: keyof typeof filters, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    handleFilterChange(updatedFilters);
  };

  // Fetch data whenever filters, page, or rowsPerPage change
  React.useEffect(() => {
    fetchAttendances();
  }, [filters, page, rowsPerPage]);

  console.log('Page:', page);
  console.log('Filters:', filters);
  console.log('Rows per page:', rowsPerPage);

  return (
    <div>
      {/* Page Header */}
      <div>
        <TopSection
          title="การตั้งค่าการเข้าออกงาน"
          buttons={[
            <Link href={'setting/create'} key={'create-set-button'}>
              <Button className="bg-accent1 text-white" size="sm">
                สร้างการตั้งค่า
              </Button>
            </Link>,
          ]}
        />
        <div className="bg-white shadow rounded-2xl mb-4 mt-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            <Input
              className="w-full p-2 text-headFont"
              labelPlacement="outside"
              size="sm"
              radius="sm"
              name="name"
              placeholder="ค้นหาชื่อ"
              value={filters.name}
              onChange={(e) => onInputChange('name', e.target.value)}
            />
            <Input
              className="w-full p-2 text-headFont"
              labelPlacement="outside"
              size="sm"
              name="docNo"
              placeholder="ค้นหาหมายเลขเอกสาร"
              value={filters.docNo}
              onChange={(e) => onInputChange('docNo', e.target.value)}
            />
          </div>
        </div>

        <div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="spinner"></div>
            </div>
          ) : (
            <TablePagination
              initialRows={items}
              initialMeta={meta}
              rowsPerPage={rowsPerPage}
              columns={columns as any}
              onPageChange={(newPage) => setPage(newPage)}
              onRowsPerPageChange={(newRowsPerPage) =>
                setRowsPerPage(newRowsPerPage)
              }
              
            />
          )}
        </div>
      </div>
    </div>
  );
}

const columns = [
  {
    title: 'ชื่อสาขา',
    dataIndex: 'userName',
    Link: '/admin/attendance/setting',
  },
  {
    title: 'เข้างาน',
    dataIndex: '',
  },
  {
    title: 'พักเบรก',
    dataIndex: '',
  },
  {
    title: 'ออกงาน',
    dataIndex: '',
  },
];
