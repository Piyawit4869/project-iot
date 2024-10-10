import { TitleBar, CalendarComponent } from '@src/components/shared';
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
  TimePicker,
  Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Dayjs } from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

export const AppointmentSingle = () => {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  console.log(selectedDate);

  const onDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    console.log('Selected date:', date.format('YYYY-MM-DD'));
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <TitleBar
        title={'Utotech Stand Up Meeting'}
        subTitle={'อัพเดทสถานะงาน และ ความเป็นอยู่ของพนักงานทุกแผนก'}
        buttons={[<Button type="primary">ยืนยัน</Button>]}
      />
      <Flex gap={8}>
        <Typography>ลิงค์ :</Typography>
        <Link
          to={'https://www.youtube.com/watch?v=dQw4w9WgXcQ'}
          target="_blank"
          style={{ color: '#2db7f5' }}
        >
          https://www.youtube.com/watch?v=dQw4w9WgXcQ
        </Link>
      </Flex>

      <Form layout="vertical">
        <div style={{ marginTop: '12px' }}>
          <Row gutter={[12, 12]}>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <CalendarComponent
                fullWidth={false}
                onSelect={onDateSelect}
                headerRender={({ value, onChange }: any) => {
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
                    <Row gutter={8} justify={'end'} style={{ margin: '8px' }}>
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
                  );
                }}
              />
            </Col>
            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
              <Row gutter={8}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  {' '}
                  <Form.Item
                    label="ชื่อการนัดหมาย"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: 'จำเป็นต้องกรอกชื่อการนัดหมาย',
                      },
                    ]}
                  >
                    <Input placeholder="กรอกชื่อการนัดหมาย" />
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    label="เวลานัดหมาย"
                    name="duedate"
                    rules={[
                      {
                        required: true,
                        message: 'จำเป็นต้องเลือกเวลานัดหมาย',
                      },
                    ]}
                  >
                    <TimePicker
                      use12Hours
                      format="h:mm a"
                      placeholder="กรุณาเลือกเวลานัดหมาย"
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="ผู้เข้าร่วมนัดหมาย"
                name="joiners"
                rules={[
                  {
                    required: true,
                    message: 'จำเป็นต้องเลือกผู้เข้าร่วมนัดหมาย',
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="เลือกผู้เข้าร่วมนัดหมาย"
                  defaultValue={['Phuwis Watthana']}
                  onChange={handleChange}
                  options={employeeOptions}
                />
              </Form.Item>
              <Form.Item label="สถานที่" name="location">
                <TextArea placeholder="กรอกสถานที่" />
              </Form.Item>
              <Form.Item label="รายละเอียด" name="descriptions">
                <TextArea placeholder="กรอกรายละเอียด" />
              </Form.Item>
            </Col>
          </Row>
        </div>
      </Form>
    </>
  );
};

const employeeOptions = [
  {
    label: 'Phuwis Watthana',
    value: 'Phuwis Watthana',
  },
  {
    label: 'Employee 01',
    value: 'Employee 01',
  },
  {
    label: 'Employee 02',
    value: 'Employee 02',
  },
  {
    label: 'Employee 03',
    value: 'Employee 03',
  },
  {
    label: 'Employee 04',
    value: 'Employee 04',
  },
];
