'use client';

import React from 'react';
import { debounce } from 'lodash';
import { useParams } from 'next/navigation';
//component
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import WorkingTimeSummary from '@/components/backoffice/timeWork';
import AttendanceSummaryCard from '@/components/backoffice/sumAtDetail';
import UserDashboardCard from '@/components/backoffice/detailCardEm';
import TablePagination from '@/components/common/tablePagination';
import { DatePicker, Input, Select, SelectItem } from '@nextui-org/react';
// API
import getSingleUser from '@/pages/api/attendances/get';
import getSingle from '@/pages/api/workinfos/getSingle';
//Helper function
import { formatDate } from '@/utils/enums/date';
// icon
import * as Icons from 'lucide-react';
// import { Breadcrumb } from '@/components/common/breadcrumb';

interface FilterState {
  userName: string;
}

interface AttendanceDetail {
  stamp: string;
}

export default function AttendanceDetailPage() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filters, setFilters] = React.useState<FilterState>({ userName: '' });
  const [items, setItems] = React.useState<AttendanceDetail[]>([]);
  const [details, setDetail] = React.useState() as any;
  const params = useParams<{ slug: string }>();
  const [meta, setMeta] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });

  React.useEffect(() => {
    if (!params?.slug) {
      console.warn('params.slug is missing');
      return;
    }
    const fetchAttendances = async () => {
      try {
        const response = await getSingleUser('');

        if (response && Array.isArray(response.items) && response.meta) {
          setItems(
            response.items.map((item: AttendanceDetail) => ({
              ...item,
              stampDate: formatDate(item.stamp).date,
              stampTime: formatDate(item.stamp).time,
            })),
          );
          setMeta(response.meta);
        } else {
          console.error('Invalid API response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    const fetchDetail = async () => {
      try {
        const response = await getSingle(params.slug);
        setDetail(response.data);
      } catch (error) {
        console.error('Error fetching work info:', error);
      }
    };

    fetchAttendances();
    fetchDetail();
  }, [page, rowsPerPage, filters, params]);

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
  const columns = [
    { title: 'ชื่อ', dataIndex: 'userName' },
    { title: 'กิจกรรม', dataIndex: 'action' },
    { title: 'สถานะ', dataIndex: 'status' },
    { title: 'เวลาที่บันทึก', dataIndex: 'stampTime' },
    { title: 'บันทึกวันที่', dataIndex: 'stampDate' },
    { title: 'สาเหตุ', dataIndex: 'note' },
  ];

  return (
    <div>
      <div className="fixed mt-6 ml-12 top-0 z-10">
        {/* <Breadcrumb title={items?.dailyStreak?.user?.userName} /> */}
      </div>
      <Scaffold
        child={
          <div className="space-y-8">
            <TopSection
              title="ภาพรวมการเข้าทำงานทั้งหมด"
              backpath="/backoffice/attendance/overview/"
            />
            {details && <UserDashboardCard detail={details} />}

            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white px-8 py-6 rounded-xl ">
                {details && <WorkingTimeSummary time={details} />}
              </div>
              <div className="bg-white p-8 rounded-xl ">
                <h1 className="pb-2 text-xl">การเข้าทำงานทั้งหมด</h1>

                <div>
                  {details && <AttendanceSummaryCard detail={details} />}
                </div>
              </div>
            </div>
            <div>
              <div className="bg-white shadow rounded-2xl mb-4 mt-4 ">
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 p-4 flex justify-between items-center">
                  <div className=" px-3 col-span-1">
                    <p className="xl:text-lg lg:text-sm md:text-xs">
                      รายละเอียดการเข้าทำงาน
                    </p>
                  </div>
                  <Input
                    className="w-[90%] p-2 text-headFont col-span-2"
                    startContent={<Icons.Search className="p-1" />}
                    size="sm"
                    radius="sm"
                    name="userName"
                    placeholder="ชื่อพนักงาน"
                    variant="bordered"
                    value={filters.userName}
                    onChange={(e) => onInputChange('userName', e.target.value)}
                  />
                  <Select
                    className="w-[90%] p-2 text-headFont col-span-1"
                    startContent={<Icons.UserRound className="p-1" />}
                    size="sm"
                    radius="sm"
                    name="userName"
                    placeholder="เลือกกิจกรรม"
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
            </div>
          </div>
        }
      />
    </div>
  );
}
