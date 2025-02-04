'use client';

import React from 'react';
import debounce from 'lodash/debounce';
import { TopSection } from '@/components/common/topSection';
import { DatePicker, Input, Select, SelectItem } from '@nextui-org/react';
import pagination from '@/pages/api/attendances/pagination';
import { TablePagination } from '@/components/common/tablePagination';
import { formatDate } from '@/utils/enums/date';
import 'react-vertical-timeline-component/style.min.css';
import Scaffold from '@/components/common/scaffold';
import { handleAction } from '@/components/common/common';
import CardComponent from '@/components/common/card';
import * as Icons from 'lucide-react';
import TimelineComponent from '@/components/admin/adminTimeline';
import ChartComponent from '@/components/admin/garphRateAll';
import WeeklyAttendanceChart from '@/components/admin/garphRateDepartment';
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
    title: 'ชื่อ',
    dataIndex: 'userName',
    Link: '/admin/attendance/overview',
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
    Link: '/admin/attendance/overview',
    align: 'center',
  },
];

export default function AttendancesPage() {
  const [page, setPage] = React.useState(1);
  // const [loading, setLoading] = React.useState(false);
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

  React.useEffect(() => {
    fetchAttendances();
  }, [page, rowsPerPage, filters]);

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
      console.log('fetchedItems', fetchedItems);
    } catch (error) {
      console.log('catch');

      console.error('Error fetching attendance:', error);
    } finally {
      console.log('fimally');
      // setLoading(false);
    }
  };

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

  const renderCard = (
    title: string,
    count: number,
    colorClass: string,
    Icon: React.ReactNode,
  ) => (
    <div className="flex-1">
      <CardComponent
        className={colorClass}
        customCard
        custom={
          <div className="p-4 bg-white grid grid-cols-3 flex justify-between">
            <div className="col-span-2">
              <div className="text-4xl font-extrabold text-gray-900">
                {count}
              </div>
              <div className="text-sm font-extrabold text-gray-600 mt-2">
                {title}
              </div>
            </div>
            <div className="flex items-start justify-end">
              <div className="bg-gray-100 p-3 rounded-full">{Icon}</div>
            </div>
          </div>
        }
      />
    </div>
  );

  return (
    <div>
      <Scaffold
        child={
          <div>
            <TopSection title="ภาพรวมการเข้าทำงานทั้งหมด" />
            <div className=" grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <div className="flex space-x-4 mt-8  ">
                  {renderCard(
                    'พนักงานทั้งหมด',
                    10,
                    'bg-white text-blue-500',
                    <Icons.UsersRound />,
                  )}
                  {renderCard(
                    'เข้างานแล้ว',
                    0,
                    'bg-white text-accent1',
                    <Icons.UserRoundCheck />,
                  )}
                  {renderCard(
                    'ยังไม่เข้างาน',
                    10,
                    'bg-white text-red-500',
                    <Icons.UserRoundMinus />,
                  )}
                </div>
                <div className="flex space-x-4 mt-8">
                  {renderCard(
                    'เข้างาน',
                    10,
                    'bg-white text-orange-500',
                    <Icons.ClockAlert />,
                  )}
                  {renderCard(
                    'ลาป่วย/ลากิจ',
                    0,
                    'bg-white text-accent3',
                    <Icons.Moon />,
                  )}
                  {renderCard(
                    'มาสาย',
                    10,
                    'bg-white text-red-500',
                    <Icons.LogOut />,
                  )}
                </div>
              </div>
              <div className=" flex space-x-4 mt-8 bg-white rounded-xl ">
                <h3 className="flex items-center justify-items-center px-10">
                  <TimelineComponent />
                </h3>
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
                    <h6>ภาพรวม การเข้าทำงาน</h6>
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
                    <SelectItem></SelectItem>
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
