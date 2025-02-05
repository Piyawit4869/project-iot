'use client';

import React from 'react';
import debounce from 'lodash/debounce';
import { TopSection } from '@/components/common/topSection';
import { Input } from '@nextui-org/react';
import pagination from '@/pages/api/attendances/pagination';
import { TablePagination } from '@/components/common/tablePagination';
import { formatDate } from '@/utils/enums/date';
import 'react-vertical-timeline-component/style.min.css';
import Scaffold from '@/components/common/scaffold';
import { handleAction } from '@/components/common/common';
import CardComponent from '@/components/common/card';
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
  currentDate: string;
  records: [
    {
      stamp: string;
      action: string;
      workInfo: {
        user: {
          userName: string;
        };
      };
    },
  ];
}

const columns = [
  {
    title: 'ชื่อ',
    dataIndex: 'userName',
    Link: '/backoffice/attendance/overview',
    align: 'left',
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
  },
  {
    title: 'เวลาที่บันทึก',
    dataIndex: 'stampTime',
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
            userName: record?.workInfo?.user?.userName || '',
            action: record?.action || '',
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

  // Debounced function to handle filter changes
  const handleFilterChange = React.useCallback((updatedFilters: any) => {
    debounce(() => {
      setPage(1); // Reset to the first page for new filters
      setFilters(updatedFilters);
    }, 300)();
  }, []);

  // Handle input changes
  const onInputChange = (key: keyof typeof filters, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    handleFilterChange(updatedFilters);
  };

  React.useEffect(() => {
    fetchAttendances();
  });

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
            <TopSection title="ภาพรวมองค์กรทั้งหมด" />
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
            </div>
            <div className="bg-white shadow rounded-2xl mb-4 mt-4 ">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <Input
                  className="w-full p-2 text-headFont"
                  labelPlacement="outside"
                  size="sm"
                  radius="sm"
                  name="userName"
                  placeholder="ค้นหาชื่อพนักงาน"
                  value={filters.userName}
                  onChange={(e) => onInputChange('userName', e.target.value)}
                />
              </div>
            </div>

            <div>
              {/* <Tabs variant="underlined">
                <Tab key="table" title="ตาราง"> */}
              {/* {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="spinner"></div>
                </div>
              ) : ( */}
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
              {/* )} */}
              {/* </Tab> */}
              {/* <Tab
                  key="timeline"
                  title="ไทม์ไลน์"
                  className="grid grid-cols-1 sm:grid-cols-2"
                >
                  <TimelineComponent /> */}
              {/* <VerticalTimeline layout="1-column">
                <VerticalTimelineElement
                  className=" min-w-80 w-max-120 "
                  contentStyle={{
                    background: '#fff',
                    borderRight: '3px solid #00a57c',
                    borderTop: '2px solid #00a57c',
                    color: '#000',
                    borderBottomLeftRadius: '15px',
                    borderBottomRightRadius: '15px',
                    borderTopRightRadius: '15px',
                  }}
                  contentArrowStyle={{
                    borderRight: '8px solid  #00a57c',
                  }}
                  iconStyle={{
                    background: '#00a57c',
                    color: '#fff',
                  }}
                >
                  <h3
                    className="vertical-timeline-element-title"
                    style={{
                      wordBreak: 'break-word', // ตัดคำที่เกินขอบ
                      whiteSpace: 'normal', // ให้ข้อความแสดงหลายบรรทัด
                      overflowWrap: 'break-word',
                    }}
                  >
                    Name :
                  </h3>
                  <span>Time : 11:16</span>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                  iconStyle={{
                    background: 'rgb(0, 0, 0)',
                    color: '#fff',
                    borderBottomLeftRadius: '25px',
                    borderBottomRightRadius: '25px',
                    borderTopRightRadius: '25px',
                  }}
                />
              </VerticalTimeline> */}
              {/* </Tab>
              </Tabs> */}
            </div>
          </div>
        }
        backgroundColor={''}
      />
    </div>
  );
}
