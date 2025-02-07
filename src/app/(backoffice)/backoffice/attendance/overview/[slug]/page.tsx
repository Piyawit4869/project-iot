'use client';

import React from 'react';
import * as Icons from 'lucide-react';
//component start //
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import WorkingTimeSummary from '@/components/backoffice/timeWork';
import AttendanceSummaryCard from '@/components/backoffice/sumAtDetail';
import UserDashboardCard from '@/components/backoffice/detailCardEm';
import { TablePagination } from '@/components/common/tablePagination';
import AttendanceRateChart from '@/components/backoffice/persentAttendance';
import { DatePicker, Input, Select, SelectItem } from '@nextui-org/react';
import { debounce } from 'lodash';
// component end //

interface FilterState {
  userName: string;
}
export default function AttendanceDetailPage() {
  const [
    items,
    // setItems
  ] = React.useState(mockItems);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [
    ,
    // page
    setPage,
  ] = React.useState(0);
  const [filters, setFilters] = React.useState<FilterState>({
    userName: '',
  });
  const [
    meta,
    // setMeta
  ] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 0,
  });

  const handleFilterChange = React.useCallback((updatedFilters: any) => {
    debounce(() => {
      setPage(1); // Reset to the first page for new filters
      setFilters(updatedFilters);
    }, 1)();
  }, []);
  const onInputChange = (key: keyof typeof filters, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    handleFilterChange(updatedFilters);
  };
  return (
    <div>
      <Scaffold
        child={
          <div className="space-y-8">
            <TopSection
              title="ภาพรวมการเข้าทำงานทั้งหมด"
              backpath="/backoffice/attendance/overview/"
            />
            <UserDashboardCard />

            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white px-8 py-6 rounded-xl ">
                <WorkingTimeSummary
                  totalWorkingTime={'200'}
                  workingTimeToday={'8'}
                />
              </div>
              <div className="bg-white p-8 rounded-xl ">
                <h2 className="pb-2">การเข้าทำงาน</h2>

                <div className="grid grid-cols-4 gap-4">
                  <AttendanceSummaryCard
                    value={'10'}
                    label={'เข้างานแล้ว'}
                    backgroundColor={'#22c55e'}
                    icon={<Icons.CheckCircle />}
                  />
                  <AttendanceSummaryCard
                    value={'7'}
                    label={'สาย'}
                    backgroundColor={'#ffce54'}
                    icon={<Icons.CheckCircle />}
                  />
                  <AttendanceSummaryCard
                    value={'3'}
                    label={'ออกก่อนเวลา'}
                    backgroundColor={'#ff7700'}
                    icon={<Icons.CheckCircle />}
                  />
                  <AttendanceSummaryCard
                    value={'5'}
                    label={'ขาด'}
                    backgroundColor={'#ff1000'}
                    icon={<Icons.CheckCircle />}
                  />
                </div>
              </div>
            </div>
            <div>
              <AttendanceRateChart yearRate={87} monthlyRates={monthlyRates} />
            </div>
            <div>
              {/* {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="spinner"></div>
                </div>
              ) : (
                <> */}
              <div className="bg-white shadow rounded-2xl mb-4 mt-4 ">
                <div className="grid grid-cols-1 sm:grid-cols-5 p-4 flex justify-between items-center">
                  <div className=" px-3">
                    <h6>ภาพรวมการเข้าทำงาน</h6>
                  </div>
                  <Input
                    className="w-[90%] p-2 text-headFont col-span-2"
                    startContent={<Icons.Search className="p-1" />}
                    size="sm"
                    radius="sm"
                    name="userName"
                    // label="ค้นหาด้วยชื่อพนักงาน"
                    // labelPlacement="outside"
                    placeholder="ชื่อพนักงาน"
                    variant="bordered"
                    value={filters.userName}
                    onChange={(e) => onInputChange('userName', e.target.value)}
                  />
                  <Select
                    className="w-[90%] p-2 text-headFont"
                    startContent={<Icons.UserRound className="p-1" />}
                    size="sm"
                    radius="sm"
                    name="userName"
                    // label="ค้นหาด้วยตำแหน่งพนักงาน"
                    // labelPlacement="outside"
                    placeholder="เลือกตำแหน่ง"
                    variant="bordered"
                    value={filters.userName}
                    onChange={(e) => onInputChange('userName', e.target.value)}
                  >
                    <SelectItem>
                      <div>1</div>
                    </SelectItem>
                  </Select>
                  <DatePicker
                    className="w-[90%] p-2 text-headFont"
                    size="sm"
                    radius="sm"
                    name=""
                    variant="bordered"
                    selectorButtonPlacement="start"
                    // label="ค้นหาด้วยวันที่"
                    // labelPlacement="outside"
                  />
                </div>
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
              </div>
              {/* </>
              )} */}
            </div>
          </div>
        }
        backgroundColor={''}
      />
    </div>
  );
}

const monthlyRates = [
  { month: 'Jan', rate: 50 },
  { month: 'Feb', rate: 60 },
  { month: 'Mar', rate: 45 },
  { month: 'Apr', rate: 70 },
  { month: 'May', rate: 80 },
  { month: 'Jun', rate: 75 },
];

const columns = [
  {
    title: 'ชื่อพนักงาน',
    dataIndex: 'userName',
    align: 'left',
  },
  {
    title: 'ข้อมูลการทำงาน',
    dataIndex: 'prefix',
    align: 'left',
  },
  {
    title: 'สถานะ',
    dataIndex: 'status',
    align: 'center',
  },
  {
    title: 'วันที่',
    dataIndex: 'date',
    align: 'left',
  },
];

const mockItems = [
  {
    id: 1,
    userName: 'สมชาย ใจดี',
    prefix: 'rome',
    status: 'เข้างาน',
    date: '2025-02-01',
  },
  {
    id: 2,
    userName: 'สมชาย ใจดี',
    prefix: 'rome',
    status: 'สาย',
    date: '2025-02-02',
  },
  {
    id: 3,
    userName: 'สมชาย ใจดี',
    prefix: 'rome',
    status: 'ออกก่อนเวลา',
    date: '2025-02-03',
  },
  {
    id: 4,
    userName: 'สมชาย ใจดี',
    prefix: 'rome',
    status: 'เข้างาน',
    date: '2025-02-04',
  },
  {
    id: 5,
    userName: 'สมชาย ใจดี',
    prefix: 'rome',
    status: 'ขาดงาน',
    date: '2025-02-05',
  },
];
