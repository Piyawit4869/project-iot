'use client';

//System
import React from 'react';
import debounce from 'lodash/debounce';
//API
import pagination from '@/pages/api/workinfos/pagination';
import { getAttendance } from '@/pages/api/attendances/get';
import { getAll } from '@/pages/api/user/getAll';
//Helper function
import { formatDate } from '@/utils/enums/date';
//Component
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { TablePagination } from '@/components/common/tablePagination';
import { DatePicker, Input, Select, SelectItem } from '@nextui-org/react';
import TimelineComponent from '@/components/backoffice/timeline';
import ChartComponent from '@/components/backoffice/garphRateAll';
import WeeklyAttendanceChart from '@/components/backoffice/garphRateDepartment';
import EmAttendanceCard from '@/components/backoffice/cardAttedanceEm';
//Icon
import * as Icons from 'lucide-react';
interface FilterState {
  userName: string;
}

interface MetaData {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
interface AttendanceItem {
  id: string;
  prefix: string;
  name: string;
  status: string;
  active: boolean;
  isCurrent: boolean;
  descriptions: string;
  priority: string;
  startDate: string | null;
  dueDate: string | null;
  limitTimePerDay: number;
  inspector: string;
  startCredit: number;
  totalCredit: number;
  totalWorkHours: number;
  payDay: string | null;
  note: string;
  createdAt: string | null;
  user: {
    id: string;
    userName: string;
    emId: string;
  };
}

export default function AttendancesPage() {
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filters, setFilters] = React.useState<FilterState>({ userName: '' });
  const [items, setItems] = React.useState<AttendanceItem[]>([]);
  const [userList, setUserList] = React.useState<any[]>([]);
  const [meta, setMeta] = React.useState<MetaData>({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });

  React.useEffect(() => {
    const fetchAttendances = async () => {
      setLoading(true);
      try {
        const { userName } = filters;

        const response = await pagination({
          page,
          limit: rowsPerPage,
          ...(userName && { userName }),
        });

        // Check if 'data' exists and has 'items' and 'meta' properties
        if (response) {
          const { items: fetchedItems, meta: fetchedMeta } = response;

          if (Array.isArray(fetchedItems) && fetchedMeta) {
            setItems(
              fetchedItems.map((item: AttendanceItem) => ({
                ...item,
                createdAtDate: formatDate(item.createdAt).date,
                createdAtTime: formatDate(item.createdAt).time,
                dueDate: formatDate(item.dueDate).date,
                startDate: formatDate(item.startDate).date,
                payDayDate: formatDate(item.payDay).date,
                payDayTime: formatDate(item.payDay).time,
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
    const fetchUsers = async () => {
      try {
        const response = await getAll();
        console.log('API Response:', response);
        setUserList(response.data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const fetchTimelineData = React.useCallback(async () => {
    try {
      const response = await getAttendance();

      console.log('Raw API Response:', response);

      if (response && Array.isArray(timeline)) {
        return response.items.map((item: any) => ({
          recorderName: item.note || 'Undefind',
          action: item.action || 'N/A',
          time: formatDate(item.stamp).time || 'N/A',
          date: formatDate(item.stamp).date || '',
        }));
      } else {
        console.error('Invalid response structure:', response);
        return [];
      }
    } catch (error) {
      console.error('Error fetching timeline data:', error);
      return [];
    }
  }, []);

  const handleFilterChange = React.useCallback((updatedFilters: any) => {
    debounce(() => {
      setPage(1);
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
          <div>
            <TopSection title="ภาพรวมการเข้าทำงานทั้งหมด" />

            <div className=" grid grid-cols-5 gap-8 flex justify-between">
              <div className="col-span-3">
                <div>
                  <EmAttendanceCard users={userList || []} />
                </div>
              </div>
              <div className="col-span-2">
                <div className=" flex space-x-8 mt-8 bg-white rounded-xl  h-[90%] shadow">
                  <TimelineComponent fetchData={fetchTimelineData} />
                </div>
              </div>
            </div>

            <div className=" grid grid-cols-5 gap-8">
              <div className="col-span-3 mt-8">
                <div className="bg-white rounded-xl shadow">
                  <ChartComponent />
                </div>
              </div>
              <div className="col-span-2 mt-8">
                <div className="bg-white rounded-xl shadow">
                  <WeeklyAttendanceChart />
                </div>
              </div>
            </div>

            <div>
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="spinner"></div>
                </div>
              ) : (
                <>
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
                </>
              )}
            </div>
          </div>
        }
        backgroundColor={''}
      />
    </div>
  );
}

const columns = [
  {
    title: 'ชื่อพนักงาน',
    dataIndex: 'userName',
    link: '/backoffice/attendance/overview',
    align: 'left',
    render: (_: any, record: any) => {
      return <span>{record?.user?.userName}</span>;
    },
  },
  { title: 'คำนำหน้า', dataIndex: 'prefix' },
  { title: 'สถานะ', dataIndex: 'status' },
  { title: 'คำอธิบายงาน', dataIndex: 'descriptions' },
  { title: 'ความสำคัญ', dataIndex: 'priority' },
  { title: 'วันที่เริ่มต้น', dataIndex: 'startDate' },
  { title: 'วันสิ้นสุด', dataIndex: 'dueDate' },
  { title: 'เวลาจำกัดต่อวัน', dataIndex: 'limitTimePerDay' },
  { title: 'ผู้ตรวจสอบ', dataIndex: 'inspector' },
  { title: 'เครดิตเริ่มต้น', dataIndex: 'startCredit' },
  { title: 'เครดิตรวม', dataIndex: 'totalCredit' },
  { title: 'ชั่วโมงทำงานรวม', dataIndex: 'totalWorkHours' },
  { title: 'วันที่จ่ายเงิน', dataIndex: 'payDayDate' },
  { title: 'เวลาที่จ่ายเงิน', dataIndex: 'payDayTime' },
  { title: 'หมายเหตุ', dataIndex: 'note' },
  { title: 'สร้างวันที่', dataIndex: 'createdAtDate' },
  { title: 'เวลาที่สร้าง', dataIndex: 'createdAtTime' },
];

const timeline = [
  {
    success: true,
    items: [
      {
        id: '1d7a16e5-1bea-407c-aaa2-38faf28fc7ef',
        createdAt: '2025-02-11T05:58:45.171Z',
        updatedAt: '2025-02-11T05:58:45.171Z',
        deletedAt: null,
        status: 'On time',
        action: 'in',
        active: true,
        currentDate: '2025-02-10T17:00:00.000Z',
        stamp: '2025-02-11T05:58:45.060Z',
        reasons: null,
        note: null,
        workInfoId: '594de15f-74ad-4fb6-96ad-96fe0c234c14',
      },
      {
        id: '5376e1e5-df30-43f9-a894-f9038b1560d2',
        createdAt: '2025-02-11T05:40:17.997Z',
        updatedAt: '2025-02-11T05:58:45.136Z',
        deletedAt: null,
        status: 'Out break',
        action: 'break',
        active: false,
        currentDate: '2025-02-10T17:00:00.000Z',
        stamp: '2025-02-11T05:40:17.886Z',
        reasons: null,
        note: null,
        workInfoId: '594de15f-74ad-4fb6-96ad-96fe0c234c14',
      },
      {
        id: '91e7094a-96bc-4f6e-bf64-1af7ee986de1',
        createdAt: '2025-02-11T05:40:13.226Z',
        updatedAt: '2025-02-11T05:58:45.136Z',
        deletedAt: null,
        status: 'On time',
        action: 'in',
        active: false,
        currentDate: '2025-02-10T17:00:00.000Z',
        stamp: '2025-02-11T05:40:13.112Z',
        reasons: null,
        note: null,
        workInfoId: '594de15f-74ad-4fb6-96ad-96fe0c234c14',
      },
      {
        id: '7d521484-f0fc-444a-9834-869477f71e0b',
        createdAt: '2025-02-11T05:34:48.949Z',
        updatedAt: '2025-02-11T05:58:45.136Z',
        deletedAt: null,
        status: 'Out break',
        action: 'break',
        active: false,
        currentDate: '2025-02-10T17:00:00.000Z',
        stamp: '2025-02-11T05:34:48.837Z',
        reasons: null,
        note: null,
        workInfoId: '594de15f-74ad-4fb6-96ad-96fe0c234c14',
      },
      {
        id: 'ee757ed0-3422-4372-bc45-c9fc0e28721c',
        createdAt: '2025-02-11T05:34:43.911Z',
        updatedAt: '2025-02-11T05:58:45.136Z',
        deletedAt: null,
        status: 'On time',
        action: 'in',
        active: false,
        currentDate: '2025-02-10T17:00:00.000Z',
        stamp: '2025-02-11T05:34:43.793Z',
        reasons: null,
        note: null,
        workInfoId: '594de15f-74ad-4fb6-96ad-96fe0c234c14',
      },
      {
        id: 'c10ea0e5-6aed-498d-bd51-5acea38d289d',
        createdAt: '2025-02-11T05:13:25.006Z',
        updatedAt: '2025-02-11T05:58:45.136Z',
        deletedAt: null,
        status: 'Out break',
        action: 'break',
        active: false,
        currentDate: '2025-02-10T17:00:00.000Z',
        stamp: '2025-02-11T05:13:24.889Z',
        reasons: null,
        note: null,
        workInfoId: '594de15f-74ad-4fb6-96ad-96fe0c234c14',
      },
      {
        id: '3d0a7457-39d0-4d3a-b91d-3dbce323ad73',
        createdAt: '2025-02-11T04:12:09.975Z',
        updatedAt: '2025-02-11T05:58:45.136Z',
        deletedAt: null,
        status: 'On time',
        action: 'in',
        active: false,
        currentDate: '2025-02-10T17:00:00.000Z',
        stamp: '2025-02-11T04:12:09.862Z',
        reasons: null,
        note: null,
        workInfoId: '594de15f-74ad-4fb6-96ad-96fe0c234c14',
      },
      {
        id: 'b7b46de8-97cd-4449-b2cb-c69ec8a3060f',
        createdAt: '2025-02-11T04:12:07.095Z',
        updatedAt: '2025-02-11T05:58:45.136Z',
        deletedAt: null,
        status: 'Out break',
        action: 'break',
        active: false,
        currentDate: '2025-02-10T17:00:00.000Z',
        stamp: '2025-02-11T04:12:06.982Z',
        reasons: null,
        note: null,
        workInfoId: '594de15f-74ad-4fb6-96ad-96fe0c234c14',
      },
      {
        id: '8c85afca-71c4-4b6c-bdec-f83ec2679581',
        createdAt: '2025-02-11T04:11:46.141Z',
        updatedAt: '2025-02-11T05:58:45.136Z',
        deletedAt: null,
        status: 'On time',
        action: 'in',
        active: false,
        currentDate: '2025-02-10T17:00:00.000Z',
        stamp: '2025-02-11T04:11:46.007Z',
        reasons: null,
        note: null,
        workInfoId: '594de15f-74ad-4fb6-96ad-96fe0c234c14',
      },
      {
        id: '9acd9501-e7e2-4c01-817a-ee2650082891',
        createdAt: '2025-02-11T04:11:44.248Z',
        updatedAt: '2025-02-11T05:58:45.136Z',
        deletedAt: null,
        status: 'Out break',
        action: 'break',
        active: false,
        currentDate: '2025-02-10T17:00:00.000Z',
        stamp: '2025-02-11T04:11:44.135Z',
        reasons: null,
        note: null,
        workInfoId: '594de15f-74ad-4fb6-96ad-96fe0c234c14',
      },
    ],
    meta: {
      totalItems: 1015,
      itemCount: 10,
      itemsPerPage: 10,
      totalPages: 102,
      currentPage: 1,
    },
  },
];
