'use client';

//System
import React from 'react';
import debounce from 'lodash/debounce';

//API
import pagination from '@/pages/api/workinfos/pagination';
import { getAttendance } from '@/pages/api/attendances/get';
import { countWork } from '@/pages/api/workinfos/get';

//Component
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { TablePagination } from '@/components/common/tablePagination';
import {
  Button,
  DatePicker,
  Input,
  Link,
  Select,
  SelectItem,
} from '@nextui-org/react';
import TimelineComponent from '@/components/backoffice/timeline';
import ChartComponent from '@/components/backoffice/garphRateAll';
import WeeklyAttendanceChart from '@/components/backoffice/garphRateDepartment';
import EmAttendanceCard from '@/components/backoffice/cardAttedanceEm';

//Helper function
import { formatDate } from '@/utils/enums/date';

//Icon
import * as Icons from 'lucide-react';
import { Breadcrumb } from '@/components/common/breadcrumb';

interface FilterState {
  userName: string;
  status: string;
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
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filters, setFilters] = React.useState<FilterState>({
    userName: '',
    status: '',
  });
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
      try {
        const { userName, status } = filters;

        const response = await pagination({
          page,
          limit: rowsPerPage,
          ...(userName && { userName }),
          ...(status && { status }),
        });

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
                userName: item?.user?.userName,
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
      }
    };

    fetchAttendances();
  }, [page, rowsPerPage, filters]);

  React.useEffect(() => {
    const fetchWork = async () => {
      try {
        const response = await countWork();

        if (response && typeof response.data === 'object') {
          const formattedUsers = [
            ...Array(response.data.totalClockedIn).fill({
              status: 'totalClockedIn',
            }),
            ...Array(response.data.totalLateIn).fill({ status: 'totalLateIn' }),
            ...Array(response.data.totalNotClockedIn).fill({
              status: 'totalNotClockedIn',
            }),
            ...Array(response.data.totalClockedOut).fill({
              status: 'totalClockedOut',
            }),
          ];

          setUserList(formattedUsers);
        } else {
          console.error('❌ Unexpected work data format:', response);
          setUserList([]);
        }
      } catch (error) {
        console.error('⚠️ Error fetching work data:', error);
        setUserList([]);
      }
    };
    fetchWork();
  }, []);
  //END API EMPLOYEE CARD

  //API TIMELINE COMPONENT
  const fetchTimelineData = React.useCallback(async () => {
    try {
      const response = await getAttendance();

      if (response && Array.isArray(response.items)) {
        return response.items.map((item: any) => ({
          userName: item?.workInfo?.user?.userName || 'Undefind',
          action: item.action || 'Undefind',
          time: formatDate(item.stamp).time || 'Undefind',
          date: formatDate(item.stamp).date || 'Undefind',
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
    }, 300)();
  }, []);

  const onInputChange = (key: keyof typeof filters, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    handleFilterChange(updatedFilters);
  };

  return (
    <div>
      <div className="fixed mt-6 ml-12 top-0 z-10">
        <Breadcrumb />
      </div>
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
                <div className=" space-x-8 mt-8 bg-white rounded-xl shadow h-[90%] ">
                  <TimelineComponent fetchData={fetchTimelineData} />
                </div>
              </div>
            </div>

            <div className=" grid grid-cols-5 gap-8 flex justify-between">
              <div className="col-span-3">
                <div className=" space-x-8 mt-8 bg-white rounded-xl shadow ">
                  <ChartComponent />
                </div>
              </div>
              <div className="col-span-2">
                <div className=" space-x-8 mt-8 bg-white rounded-xl shadow ">
                  <WeeklyAttendanceChart />
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white shadow rounded-2xl mb-4 mt-4 ">
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 p-4 flex justify-between items-center">
                  <div className=" px-3 col-span-1">
                    <p className="xl:text-lg lg:text-sm md:text-xs">
                      ภาพรวมการเข้าทำงาน
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
                    name="status"
                    placeholder="เลือกสถานะ"
                    variant="bordered"
                    value={filters.status}
                    onChange={(e) => onInputChange('status', e.target.value)}
                  >
                    <SelectItem>
                      <div>active</div>
                    </SelectItem>
                    <SelectItem>
                      <div>-</div>
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
  },
  { title: 'ชื่อย่องาน', dataIndex: 'prefix', align: 'center' },
  { title: 'สถานะ', dataIndex: 'status', align: 'center' },
  { title: 'เวลาจำกัดต่อวัน', dataIndex: 'limitTimePerDay', align: 'center' },
  { title: 'ชั่วโมงทำงานรวม', dataIndex: 'totalWorkHours', align: 'center' },
  { title: 'หมายเหตุ', dataIndex: 'note' },
  {
    title: '',
    dataIndex: 'edit',
    align: 'center',
    render: (_: any, record: any) => (
      <Link href={`/backoffice/attendance/overview/${record.id}`}>
        <Button className="flex bg-accent3 text-white" size="sm">
          <Icons.PencilLine size={20} />
        </Button>
      </Link>
    ),
  },
];
