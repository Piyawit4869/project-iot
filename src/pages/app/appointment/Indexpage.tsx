import React, { useState, useRef } from 'react';
import {
  Calendar,
  Badge,
  Button,
  Tooltip,
  Typography,
  Flex,
  Col,
  Row,
  Select,
  Tag,
  Divider,
} from 'antd';

import { Link, useNavigate } from 'react-router-dom';
import { TitleBar, TableComponent } from '@src/components/shared';
import { ColumnsType } from 'antd/es/table';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/th';
import thTH from 'antd/es/locale/th_TH';
dayjs.locale('th');

export const AppointmentIndex = () => {
  const navigate = useNavigate();
  const today = dayjs();
  const currentMonth = today.month();
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const cellRefs = useRef({}) as any;

  console.log(selectedDate);

  const getEventsForDay = (day: any) => {
    return eventDays.filter((event) => event.day === day);
  };

  const onDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    console.log('Selected date:', date.format('YYYY-MM-DD'));
  };

  const thaiLocale = {
    lang: {
      ...thTH,
      locale: 'th',
    },
    timePickerLocale: {
      timePickerLocale: {
        placeholder: 'Select time',
        rangePlaceholder: ['Start time', 'End time'],
      },
    },
  };

  const customCellRender = (currentDate: any) => {
    if (currentDate.month() !== currentMonth) {
      return null;
    }

    const events = getEventsForDay(currentDate.date());

    if (!cellRefs.current[currentDate.date()]) {
      cellRefs.current[currentDate.date()] = React.createRef();
    }

    return (
      <Tooltip
        color="white"
        placement="left"
        overlayClassName="custom-tooltip"
        title={() => {
          return (
            <div style={{ padding: '12px' }}>
              {events.length > 0 ? (
                events.map((event, index) => {
                  return (
                    <div key={index} className="scale-up-on-hover">
                      <Link to={`${event.id}`}>
                        <Flex gap={4}>
                          <Badge status="success" />
                          <Typography style={{ fontSize: '16px' }}>
                            {event.title +
                              ' ' +
                              dayjs(event.duedate).format('h:mm A')}
                          </Typography>
                        </Flex>
                        <Typography className="limited-text">
                          {event.description}
                        </Typography>
                        <div style={{ padding: '10px 0px' }}>
                          {event.participants.map((text, idx) => (
                            <Tag key={idx}>{text}</Tag>
                          ))}
                        </div>
                      </Link>
                      {index < events.length - 1 && <Divider />}
                    </div>
                  );
                })
              ) : (
                <Typography style={{ textAlign: 'center' }}>
                  ไม่มีนัดหมาย
                </Typography>
              )}
            </div>
          );
        }}
        trigger={['click']}
      >
        <div
          ref={cellRefs.current[currentDate.date()]}
          style={{ position: 'relative', padding: '5px', height: '100%' }}
        >
          {events.length > 0 && (
            <ul style={{ margin: '0px', padding: '0px' }}>
              {events.map((event, index) => (
                <li key={index} style={{ listStyleType: 'none' }}>
                  <Badge status="success" />
                  <span style={{ marginLeft: '5px' }}>{event.title}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Tooltip>
    );
  };

  const headerRender = ({ value, onChange }: any) => {
    const start = 0;
    const end = 12;
    const monthOptions = [];

    let current = value.clone();
    const localeData = value.localeData();
    const months = [];
    for (let i = 0; i < 12; i++) {
      current = current.month(i);
      months.push(localeData.monthsShort(current));
    }

    for (let i = start; i < end; i++) {
      monthOptions.push(
        <Select.Option key={i} value={i} className="month-item">
          {months[i]}
        </Select.Option>,
      );
    }

    const year = value.year();
    const month = value.month();
    const options = [];
    for (let i = year - 10; i < year + 10; i += 1) {
      options.push(
        <Select.Option key={i} value={i} className="year-item">
          {i}
        </Select.Option>,
      );
    }
    return (
      <Col span={24} style={{ margin: '8px' }}>
        <Row gutter={8} justify={'end'}>
          <Col>
            <Select
              popupMatchSelectWidth={false}
              className="my-year-select"
              value={year}
              onChange={(newYear: any) => {
                const now = value.clone().year(newYear);
                onChange(now);
              }}
            >
              {options}
            </Select>
          </Col>
          <Col>
            <Select
              popupMatchSelectWidth={false}
              value={month}
              onChange={(newMonth: any) => {
                const now = value.clone().month(newMonth);
                onChange(now);
              }}
            >
              {monthOptions}
            </Select>
          </Col>
        </Row>
      </Col>
    );
  };

  return (
    <>
      <TitleBar
        title={'การนัดหมาย'}
        subTitle={'รวมการนัดหมายทั้งหมดอยู่ที่นี่แล้ว'}
        buttons={[
          <Link to={'create'}>
            <Button type="primary">สร้างนัดหมาย</Button>
          </Link>,
        ]}
      />

      <div style={{ marginTop: '12px' }}>
        <Calendar
          headerRender={headerRender}
          fullscreen={true}
          cellRender={customCellRender}
          onSelect={onDateSelect}
          locale={thaiLocale as any}
        />
      </div>
      <TitleBar
        title={'การนัดหมายที่มีคุณ'}
        subTitle={'รวมการนัดหมายทั้งหมดที่มีคุณเกี่ยวข้องอยู่ที่นี่แล้ว'}
      />

      <div style={{ marginTop: '22px' }}>
        <TableComponent
          columns={columns}
          dataSource={data}
          onRowClick={(record) => {
            navigate(`/appointment/${record.id}`);
          }}
        />
      </div>
    </>
  );
};

const columns: ColumnsType<any> | undefined = [
  { title: 'ลำดับ', dataIndex: 'id', key: 'id', align: 'center' },
  { title: 'ชื่อการนัดหมาย', dataIndex: 'name', key: 'name', width: 200 },
  {
    title: 'รายละเอียด',
    dataIndex: 'descriptions',
    key: 'descriptions',
    width: 200,
  },
  {
    title: 'เวลาที่นัดหมาย',
    dataIndex: 'duedate',
    key: 'duedate',
    align: 'center',
    render: (value: string) => {
      return <>{dayjs(value).format('M/D/YYYY h:mm A')}</>;
    },
  },
  { title: 'สร้างโดย', dataIndex: 'createdBy', key: 'createdBy' },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
    render: (value: string) => {
      return (
        <Link to={value} target="_blank" style={{ color: '#2db7f5' }}>
          {value}
        </Link>
      );
    },
  },
];

const data = [
  {
    id: 1,
    name: 'Utotech Stand Up Meeting',
    descriptions: 'อัพเดทสถานะงาน และ ความเป็นอยู่ของพนักงานทุกแผนก',
    duedate: '2024-10-02T04:40:24.863Z',
    createdBy: 'ภูวิศ วัฒนะ',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
];

const eventDays = [
  {
    id: 1,
    title: 'Stand-up meeting',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'",
    day: 12,
    duedate: '2024-10-02T04:40:24.863Z',
    participants: ['Employee 01', 'Employee 02'],
  },
  {
    id: 2,
    title: 'Project discussion',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'",
    day: 12,
    duedate: '2024-10-02T04:40:24.863Z',
    participants: ['Employee 01', 'Phuwis Watthana'],
  },
  {
    id: 3,
    title: 'Utotech meeting',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'",
    day: 17,
    duedate: '2024-10-02T04:40:24.863Z',
    participants: ['Employee 01', 'Phuwis Watthana', 'Employee 03'],
  },
  {
    id: 4,
    title: 'Team presentation',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'",
    day: 17,
    duedate: '2024-10-02T04:40:24.863Z',
    participants: ['Employee 01', 'Phuwis Watthana'],
  },
  {
    id: 5,
    title: 'Utotech meeting',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.'",
    day: 25,
    duedate: '2024-10-02T04:40:24.863Z',
    participants: ['Employee 01', 'Phuwis Watthana'],
  },
];
