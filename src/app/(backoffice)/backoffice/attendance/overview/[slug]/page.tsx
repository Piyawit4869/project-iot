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
import { TablePagination } from '@/components/common/tablePagination';
import { DatePicker, Input, Select, SelectItem } from '@nextui-org/react';
// API
import getSingleUser from '@/pages/api/attendances/get';
import getSingle from '@/pages/api/workinfos/getSingle';
//Helper function
import { formatDate } from '@/utils/enums/date';
// icon
import * as Icons from 'lucide-react';

interface FilterState {
  userName: string;
}

interface AttendanceDetail {
  stamp: string;
}
interface WorkinfoDetail {
  prefix?: string;
  statistics: {
    totalWorkDays?: number;
    lateArrivals?: number;
    leaveEarly?: number;
    absenteeism?: number;
  };
  dailyStreak: {
    dailyStreak?: number;
  };
  user: {
    userName?: string;
    emId?: string;
    email?: string;
    role?: string;
  };
}

export default function AttendanceDetailPage() {
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filters, setFilters] = React.useState<FilterState>({ userName: '' });
  const [items, setItems] = React.useState<AttendanceDetail[]>([]);
  const [userDetail, setUserDetail] = React.useState<WorkinfoDetail | null>(
    null,
  );
  const params = useParams<{ slug: string }>();
  const [meta, setMeta] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });

  React.useEffect(() => {
    const fetchAttendances = async () => {
      setLoading(true);
      try {
        const response = await getSingleUser('');

        if (response) {
          const { items: fetchedItems, meta: fetchedMeta } = response;

          if (Array.isArray(fetchedItems) && fetchedMeta) {
            setItems(
              fetchedItems.map((item: AttendanceDetail) => ({
                ...item,
                stampDate: formatDate(item.stamp).date,
                stampTime: formatDate(item.stamp).time,
              })),
            );
            setMeta(fetchedMeta);
          } else {
            console.error('Invalid response structure:', response);
          }
        } else {
          console.error('No data received:', response);
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendances();
  }, [page, rowsPerPage, filters]);

  React.useEffect(() => {
    if (!params?.slug) {
      console.warn('params.slug is missing');
      return;
    }

    const fetchWorkInfo = async () => {
      try {
        const response = await getSingle(params.slug);
        console.log('API Response (getSingle):', response);

        if (response?.items?.length > 0) {
          setUserDetail(response.items[0]);
        } else {
          console.error('Invalid API response structure:', response);
        }
      } catch (error) {
        console.error('Error fetching work info:', error);
      }
    };

    fetchWorkInfo();
  }, [params]);

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
      <Scaffold
        child={
          loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              <div className="space-y-8">
                <TopSection
                  title="ภาพรวมการเข้าทำงานทั้งหมด"
                  backpath="/backoffice/attendance/overview/"
                />
                <UserDashboardCard userData={userDetail} />

                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-white px-8 py-6 rounded-xl ">
                    <WorkingTimeSummary
                      totalWorkingTime={'200'}
                      workingTimeToday={'8'}
                    />
                  </div>
                  <div className="bg-white p-8 rounded-xl ">
                    <h1 className="pb-2 text-xl">การเข้าทำงานทั้งหมด</h1>

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
                        placeholder="ชื่อพนักงาน"
                        variant="bordered"
                        value={filters.userName}
                        onChange={(e) =>
                          onInputChange('userName', e.target.value)
                        }
                      />
                      <Select
                        className="w-[90%] p-2 text-headFont"
                        startContent={<Icons.UserRound className="p-1" />}
                        size="sm"
                        radius="sm"
                        name="userName"
                        placeholder="เลือกตำแหน่ง"
                        variant="bordered"
                        value={filters.userName}
                        onChange={(e) =>
                          onInputChange('userName', e.target.value)
                        }
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
            </>
          )
        }
      />
    </div>
  );
}
