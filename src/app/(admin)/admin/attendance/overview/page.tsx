'use client';

import React from 'react';
import debounce from 'lodash/debounce';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Input, Link, Tab, Tabs } from '@nextui-org/react';
import pagination from '@/pages/api/attendances/pagination';
import getAttendances, { getAttendance } from '@/pages/api/attendances/get';
import { TablePagination } from '@/components/common/tablePagination';
import { formatDate } from '@/utils/enums/date';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

interface AttendanceItem {
  records: {
    status: string;
    stamp: string;
    action: string;
    currentDate: string;
    user: {
      userName: string;
    };
  };
}

export default function AttendancesPage() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filters, setFilters] = React.useState({ name: '', docNo: '' });
  const [, setAttendances] = React.useState<AttendanceItem[]>([]);
  const [items, setItems] = React.useState<AttendanceItem[]>([]);
  const [meta, setMeta] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });
  const [loading, setLoading] = React.useState(false);

const columns = [
  {
    title: 'ชื่อ',
    dataIndex: 'userName',
    Link: '/admin/attendance/overview',
  },
  {
    title: 'กิจกรรม',
    dataIndex: 'action',
  },
  {
    title: 'บันทึกเมื่อเวลา',
    dataIndex: 'stampTime',
  },
  {
    title: 'บันทึกเมื่อวันที่',
    dataIndex: 'stampDate',
  },
];

  // Fetch data from the API
  const fetchAttendances = async () => {
    setLoading(true);
    try {
      const result = await getAttendance();
      if (result?.items) {
        setAttendances(result.items);
      } else {
        setAttendances([]); // Fallback to an empty array if result.items is undefined
      }

      const { name, docNo } = filters;
      const { items: fetchedItems = [], meta: fetchedMeta = {} } =
        await pagination({
          page,
          limit: rowsPerPage,
          ...(name && { name }),
          ...(docNo && { docNo }),
        });

      setItems(
        fetchedItems.map((item: AttendanceItem) => ({
          ...item,
          stampDate: formatDate(item.records.stamp).date,
          stampTime: formatDate(item.records.stamp).time,
          userName: item.records.user?.userName || '', 
          status: item.records.user?.userName || '', 
          stamp: item.records?.currentDate || '', 
          action: item.records?.currentDate || '', 
          currentDate: item.records?.currentDate || '', 
        })),
      );

      setMeta({
        ...meta,
        ...fetchedMeta,
      });
    } catch (error) {
      console.error('Error fetching attendances:', error);
      setItems([]); // Set to an empty array on error to prevent further issues
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
    [],
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

  return (
    <div>
      <Scaffold
        child={
          <div>
            <TopSection
              title="ภาพรวมองค์กรทั้งหมด"
              buttons={[
                <Link href={'overview/create'} key={'create button'}>
                  <Button
                    className="bg-accent1 text-white"
                    size="sm"
                    key={'create button'}
                  >
                    สร้างกิจกรรม
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
              <Tabs variant="underlined">
                <Tab key="table" title="ตาราง">
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
                </Tab>
                <Tab
                  key="timeline"
                  title="ไทม์ไลน์"
                  className="grid grid-cols-1 sm:grid-cols-2"
                >
                  <VerticalTimeline layout="1-column">
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
                  </VerticalTimeline>
                </Tab>
              </Tabs>
            </div>
          </div>
        }
        backgroundColor={''}
      />
    </div>
  );
}


