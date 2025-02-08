'use client';

import React from 'react';
import debounce from 'lodash/debounce';
import { TopSection } from '@/components/common/topSection';
import { DatePicker, Input, Select, SelectItem } from '@nextui-org/react';
import pagination from '@/pages/api/workinfos/pagination';
import { getAll } from '@/pages/api/user/getAll';
import { TablePagination } from '@/components/common/tablePagination';
import { formatDate } from '@/utils/enums/date';
import 'react-vertical-timeline-component/style.min.css';
import Scaffold from '@/components/common/scaffold';
import * as Icons from 'lucide-react';
import TimelineComponent from '@/components/backoffice/timeline';
import ChartComponent from '@/components/backoffice/garphRateAll';
import WeeklyAttendanceChart from '@/components/backoffice/garphRateDepartment';
import EmAttendanceCard from '@/components/backoffice/cardAttedanceEm';
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

export default function AttendancesPage() {
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filters, setFilters] = React.useState<FilterState>({
    userName: '',
  });
  const [items, setItems] = React.useState<AttendanceItem[]>([]);
  const [meta, setMeta] = React.useState<MetaData>({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });
  const [userList, setUserList] = React.useState<any[]>([]);

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
        console.log('API Response:', response); // ตรวจสอบข้อมูลที่ได้จาก API
        setUserList(response.data || []);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
    console.log('name', fetchUsers);
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
                  <TimelineComponent />
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
