'use client';

import React from 'react';
import debounce from 'lodash/debounce';
import { TopSection } from '@/components/common/topSection';
import { Input, Tab, Tabs } from '@nextui-org/react';
import pagination from '@/pages/api/attendances/pagination';
import { TablePagination } from '@/components/common/tablePagination';
import { formatDate } from '@/utils/enums/date';
// import {
//   VerticalTimeline,
//   VerticalTimelineElement,
// } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { TimelineComponent } from '@/components/admin/adminTimeline';
import Scaffold from '@/components/common/scaffold';
interface FilterState {
  name: string;
  docNo: string;
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
    Link: '/admin/attendance/overview',
  },
  {
    title: 'กิจกรรม',
    dataIndex: 'action',
  },
  {
    title: 'บันทึกเมื่อวันที่',
    dataIndex: 'stampDate',
  },
  {
    title: 'วันล่าสุด',
    dataIndex: 'currentDate',
  },
];

export default function AttendancesPage() {
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filters, setFilters] = React.useState<FilterState>({
    name: '',
    docNo: '',
  });
  const [items, setItems] = React.useState<AttendanceItem[]>([]);
  const [meta, setMeta] = React.useState<MetaData>({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });

  const fetchAttendances = async () => {
    setLoading(true);
    try {
      console.log('try');

      const { name, docNo } = filters;

      const { data } = (await pagination({
        page,
        limit: rowsPerPage,
        ...(name && { name }),
        ...(docNo && { docNo }),
      })) as any;
      const { items: fetchedItems, meta: fetchedMeta } = data;

      console.log('items', items);
      console.log('meta', meta);
      console.log('Fetched Items:', fetchedItems);
      console.log('Fetched Meta:', fetchedMeta);

      setItems(
        fetchedItems.flatMap((item: AttendanceItem) =>
          item.records.map((record) => ({
            ...item,
            userName: record?.workInfo?.user?.userName || '',
            action: record?.action || '',
            stampDate: formatDate(record?.stamp).date || '',
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
      setLoading(false);
    }
  };

  // Debounced function to handle filter changes
  const handleFilterChange = React.useCallback(
    debounce((updatedFilters) => {
      setPage(1); // Reset to the first page for new filters
      setFilters(updatedFilters);
    }, 300),
    [filters],
  );

  // Handle input changes
  const onInputChange = (key: keyof typeof filters, value: string) => {
    const updatedFilters = { ...filters, [key]: value };
    handleFilterChange(updatedFilters);
  };

  React.useEffect(() => {
    fetchAttendances();
  }, [filters, page, rowsPerPage]);

  // console.log('Page:', page);
  // console.log('Filters:', filters);
  // console.log('Rows per page:', rowsPerPage);

  return (
    <div>
      <Scaffold
        child={
          <div>
            <TopSection
              title="ภาพรวมองค์กรทั้งหมด"
              // buttons={[
              //   <Link href={'overview/create'} key={'create button'}>
              //     <Button
              //       className="bg-accent1 text-white"
              //       size="sm"
              //       key={'create button'}
              //     >
              //       สร้างกิจกรรม
              //     </Button>
              //   </Link>,
              // ]}
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
                  <TimelineComponent />
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
