import React, { useState } from 'react';
import {
  Calendar,
  Col,
  Flex,
  Radio,
  Row,
  Select,
  theme,
  Form,
  TimePicker,
  Input,
} from 'antd';
import type { Dayjs } from 'dayjs';
import TextArea from 'antd/es/input/TextArea';

export const CalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
  };

  console.log(selectedDate);

  const onDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    console.log('Selected date:', date.format('YYYY-MM-DD'));
  };

  return (
    <div style={wrapperStyle}>
      {/* Apply the small-calendar class */}
      <Calendar
        fullscreen={false}
        headerRender={({ value, type, onChange, onTypeChange }: any) => {
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
            <Flex
              justify="space-between"
              align="center"
              style={{ padding: '8px' }}
            >
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
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
                <Row gutter={8} justify={'end'}>
                  <Col>
                    <Radio.Group
                      onChange={(e) => onTypeChange(e.target.value)}
                      value={type}
                    >
                      <Radio.Button value="month">Month</Radio.Button>
                      <Radio.Button value="year">Year</Radio.Button>
                    </Radio.Group>
                  </Col>
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
            </Flex>
          );
        }}
        onSelect={onDateSelect}
      />
      <Flex gap={8} style={{ padding: '8px' }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Row gutter={8}>
            <Col span={12}>
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
            <Col span={12}>
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
            </Col>
          </Row>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item label="รายละเอียด" name="descriptions">
            <TextArea placeholder="กรอกรายละเอียด" />
          </Form.Item>
        </Col>
      </Flex>
    </div>
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
