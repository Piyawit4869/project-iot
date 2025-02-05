'use client';

import React from 'react';
import debounce from 'lodash/debounce';
import { TopSection } from '@/components/common/topSection';
import { DatePicker, Input, Select, SelectItem } from '@nextui-org/react';
import pagination from '@/pages/api/attendances/pagination';
import { getAll } from '@/pages/api/user/getAll';
import { TablePagination } from '@/components/common/tablePagination';
import { formatDate } from '@/utils/enums/date';
import 'react-vertical-timeline-component/style.min.css';
import Scaffold from '@/components/common/scaffold';
import { handleAction } from '@/components/common/common';
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
  currentDate: string;
  records: [
    {
      status: string;
      stamp: string;
      action: string;
      workInfo: {
        prefix: string;
        totalWorkHours: number;
        user: {
          userName: string;
          employeeRoleId: string;
        };
      };
    },
  ];
}

const columns = [
  {
    title: 'ชื่อพนักงาน',
    dataIndex: 'userName',
    Link: '/backoffice/attendance/overview',
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
    title: 'กิจกรรม',
    dataIndex: 'action',
    align: 'center',
    render: (value: string) => {
      return handleAction(value);
    },
  },
  {
    title: 'บันทึกเมื่อวันที่',
    dataIndex: 'stampDate',
    align: 'center',
  },
  {
    title: 'เวลาที่บันทึก',
    dataIndex: 'stampTime',
    align: 'center',
  },
  {
    title: 'รวมเวลาการเข้าทำงาน',
    dataIndex: 'totalWorkHours',
    align: 'center',
  },
];

export default function AttendancesPage() {
  const [page, setPage] = React.useState(1);
  const [, setLoading] = React.useState(false);
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
      // setLoading(true);
      try {
        const { userName } = filters;

        const { data } = (await pagination({
          page,
          limit: rowsPerPage,
          ...(userName && { userName }),
        })) as any;
        const { items: fetchedItems, meta: fetchedMeta } = data;

        setItems(
          fetchedItems.flatMap((item: AttendanceItem) =>
            item.records.map((record) => ({
              ...item,
              status: record?.status || '',
              action: record?.action || '',
              prefix: record?.workInfo?.prefix || '',
              totalWorkHours: record?.workInfo?.totalWorkHours || '',
              userName: record?.workInfo?.user?.userName || '',
              stampDate: formatDate(record?.stamp).date || '',
              stampTime: formatDate(record?.stamp).time || '',
              currentDate: formatDate(item.currentDate).date || '',
            })),
          ),
        );

        // Set the meta state, ensuring it has default values
        setMeta(fetchedMeta);
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

  // Debounced function to handle filter changes
  const handleFilterChange = React.useCallback((updatedFilters: any) => {
    debounce(() => {
      setPage(1); // Reset to the first page for new filters
      setFilters(updatedFilters);
    }, 1)();
  }, []);

  // Handle input changes
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

            <div className=" grid grid-cols-4 gap-5 flex justify-between">
              <div className="col-span-3">
                <div>
                  <EmAttendanceCard users={userList || []} />
                </div>
              </div>
              <div className="col-span-1">
                <div className=" flex space-x-4 mt-8 bg-white rounded-xl  h-[90%]">
                  <TimelineComponent />
                </div>
              </div>
            </div>

            <div className=" grid grid-cols-5 gap-4">
              <div className="col-span-3 mt-8">
                <div className="bg-white rounded-xl p-5 ">
                  <ChartComponent />
                </div>
              </div>
              <div className="col-span-2 mt-8">
                <div className="bg-white rounded-xl p-5">
                  <WeeklyAttendanceChart />
                </div>
              </div>
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
