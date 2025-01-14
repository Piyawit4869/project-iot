'use client';

import React from 'react';
import debounce from 'lodash/debounce';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Input, Link, Tab, Tabs } from '@nextui-org/react';
import pagination from '@/pages/api/attendances/pagination';
import { TablePagination } from '@/components/common/tablePagination';
import { formatDate } from '@/utils/enums/date';
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { RadiusSettingOutlined } from '@ant-design/icons';

interface AttendanceItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  status: string;
  action: string;
  active: boolean;
  currentDate: string;
  stamp: string;
  reasons: string;
  note: string;
  workInfoId: string;
}

export default function NotationsPage() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filters, setFilters] = React.useState({ name: '', docNo: '' });
  const [items, setItems] = React.useState([]) as any;
  const [meta, setMeta] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });
  const [loading, setLoading] = React.useState(false);

  // Fetch data from the API
  const fetchNotations = async () => {
    setLoading(true);
    try {
      const { name, docNo } = filters;
      const { items: fetchedItems, meta: fetchedMeta } = await pagination({
        page,
        limit: rowsPerPage,
        ...(name && { name }),
        ...(docNo && { docNo }),
      });
      setItems(
        fetchedItems.map((item: AttendanceItem) => ({
          ...item,
          stampDate: formatDate(item.stamp).date,
          stampTime: formatDate(item.stamp).time,
        })),
      );
      setMeta(fetchedMeta);
    } catch (error) {
      console.error('Error fetching notations:', error);
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
    fetchNotations();
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
            <div className="bg-white shadow rounded-lg mb-4 mt-4 ">
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <Input
                  className="w-full p-2 text-headFont"
                  labelPlacement="outside"
                  size="sm"
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
                <Tab key="timeline" title="ไทม์ไลน์">
                  <VerticalTimeline layout="1-column">
                  <VerticalTimelineElement
                      className="rounded-xl"
                      contentStyle={{
                        background: '#00a57c',
                        color: '#fff',
                        borderBottomLeftRadius: '25px', 
                        borderBottomRightRadius: '25px', 
                        borderTopRightRadius: '25px',
                      }}
                      contentArrowStyle={{
                        borderRight: '7px solid  #00a57c',
                      }}
                      date="2011 - present"
                      iconStyle={{
                        background: '#00a57c',
                        color: '#fff',
                      }}
                    >
                      <h3 className="vertical-timeline-element-title">
                        Creative Director
                      </h3>
                      <h4 className="vertical-timeline-element-subtitle">
                        Miami, FL
                      </h4>
                      <p>
                        Creative Direction, User Experience, Visual Design,
                        Project Management, Team Leading
                      </p>
                    </VerticalTimelineElement>
                  <VerticalTimelineElement
                      className="rounded-xl"
                      contentStyle={{
                        background: '#00a57c',
                        color: '#fff',
                        borderBottomLeftRadius: '25px', 
                        borderBottomRightRadius: '25px', 
                        borderTopRightRadius: '25px',
                      }}
                      contentArrowStyle={{
                        borderRight: '7px solid  #00a57c',
                      }}
                      date="2011 - present"
                      iconStyle={{
                        background: '#00a57c',
                        color: '#fff',
                      }}
                    >
                      <h3 className="vertical-timeline-element-title">
                        Creative Director
                      </h3>
                      <h4 className="vertical-timeline-element-subtitle">
                        Miami, FL
                      </h4>
                      <p>
                        Creative Direction, User Experience, Visual Design,
                        Project Management, Team Leading
                      </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                      className="rounded-xl"
                      contentStyle={{
                        background: '#00a57c',
                        color: '#fff',
                        borderBottomLeftRadius: '25px', 
                        borderBottomRightRadius: '25px', 
                        borderTopRightRadius: '25px',
                      }}
                      contentArrowStyle={{
                        borderRight: '7px solid  #00a57c',
                      }}
                      date="2011 - present"
                      iconStyle={{
                        background: '#00a57c',
                        color: '#fff',
                      }}
                    >
                      <h3 className="vertical-timeline-element-title">
                        Creative Director
                      </h3>
                      <h4 className="vertical-timeline-element-subtitle">
                        Miami, FL
                      </h4>
                      <p>
                        Creative Direction, User Experience, Visual Design,
                        Project Management, Team Leading
                      </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                      className="rounded-xl"
                      contentStyle={{
                        background: '#ffbe3d',
                        color: '#fff',
                        borderBottomLeftRadius: '25px', 
                        borderBottomRightRadius: '25px', 
                        borderTopRightRadius: '25px',
                      }}
                      contentArrowStyle={{
                        borderRight: '7px solid  #ffbe3d',
                      }}
                      date="2011 - present"
                      iconStyle={{
                        background: '#ffbe3d',
                        color: '#fff',
                      }}
                    >
                      <h3 className="vertical-timeline-element-title">
                        Art Director
                      </h3>
                      <h4 className="vertical-timeline-element-subtitle">
                        San Francisco, CA
                      </h4>
                      <p>
                        Creative Direction, User Experience, Visual Design, SEO,
                        Online Marketing
                      </p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                      className="rounded-xl"
                      contentStyle={{
                        background: '#ffbe3d',
                        color: '#fff',
                        borderBottomLeftRadius: '25px', 
                        borderBottomRightRadius: '25px', 
                        borderTopRightRadius: '25px',
                      }}
                      contentArrowStyle={{
                        borderRight: '7px solid  #ffbe3d',
                      }}
                      date="2011 - present"
                      iconStyle={{
                        background: '#ffbe3d',
                        color: '#fff',
                      }}
                    >
                      <h3 className="vertical-timeline-element-title">
                        Web Designer
                      </h3>
                      <h4 className="vertical-timeline-element-subtitle">
                        Los Angeles, CA
                      </h4>
                      <p>User Experience, Visual Design</p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                      className="rounded-xl"
                      contentStyle={{
                        background: '#ffbe3d',
                        color: '#fff',
                        borderBottomLeftRadius: '25px', 
                        borderBottomRightRadius: '25px', 
                        borderTopRightRadius: '25px',
                      }}
                      contentArrowStyle={{
                        borderRight: '7px solid  #ffbe3d',
                      }}
                      date="2011 - present"
                      iconStyle={{
                        background: '#ffbe3d',
                        color: '#fff',
                      }}
                    >
                      <h3 className="vertical-timeline-element-title">
                        Web Designer
                      </h3>
                      <h4 className="vertical-timeline-element-subtitle">
                        San Francisco, CA
                      </h4>
                      <p>User Experience, Visual Design</p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                      className="rounded-xl"
                      contentStyle={{
                        background: '#c41e1e',
                        color: '#fff',
                        borderBottomLeftRadius: '25px', 
                        borderBottomRightRadius: '25px', 
                        borderTopRightRadius: '25px',
                      }}
                      contentArrowStyle={{
                        borderRight: '7px solid  rgb(223, 25, 91)',
                      }}
                      date="2011 - present"
                      iconStyle={{
                        background: '#c41e1e',
                        color: '#fff',
                      }}
                    >
                      <h3 className="vertical-timeline-element-title">
                        Content Marketing for Web, Mobile and Social Media
                      </h3>
                      <h4 className="vertical-timeline-element-subtitle">
                        Online Course
                      </h4>
                      <p>Strategy, Social Media</p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                      className="rounded-xl"
                      contentStyle={{
                        background: '#c41e1e',
                        color: '#fff',
                        borderBottomLeftRadius: '25px', 
                        borderBottomRightRadius: '25px', 
                        borderTopRightRadius: '25px',
                      }}
                      contentArrowStyle={{
                        borderRight: '7px solid  rgb(223, 25, 91)',
                      }}
                      date="2011 - present"
                      iconStyle={{
                        background: '#c41e1e',
                        color: '#fff',
                      }}
                    >
                      <h3 className="vertical-timeline-element-title">
                        Agile Development Scrum Master
                      </h3>
                      <h4 className="vertical-timeline-element-subtitle">
                        Certification
                      </h4>
                      <p>Creative Direction, User Experience, Visual Design</p>
                    </VerticalTimelineElement>
                    <VerticalTimelineElement
                      className="rounded-xl"
                      contentStyle={{
                        background: '#c41e1e',
                        color: '#fff',
                        borderBottomLeftRadius: '25px', 
                        borderBottomRightRadius: '25px', 
                        borderTopRightRadius: '25px',
                      }}
                      contentArrowStyle={{
                        borderRight: '7px solid  rgb(223, 25, 91)',
                      }}
                      date="2011 - present"
                      iconStyle={{
                        background: '#c41e1e',
                        color: '#fff',
                      }}
                    >
                      <h3 className="vertical-timeline-element-title">
                        Bachelor of Science in Interactive Digital Media Visual
                        Imaging
                      </h3>
                      <h4 className="vertical-timeline-element-subtitle">
                        Bachelor Degree
                      </h4>
                      <p>Creative Direction, Visual Design</p>
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

const columns = [
  {
    title: 'สถานะ',
    dataIndex: 'status',
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
