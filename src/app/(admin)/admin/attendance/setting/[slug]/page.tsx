'use client';

import CardComponent from '@/components/common/card';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import * as Icon from '@ant-design/icons';
import {
  Button,
  Form,
  Select,
  SelectItem,
  Avatar,
  Input,
  Chip,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';

export default function ConfigAttendanceDetailPage() {
  const [items, setItems] = React.useState([{ description: '', amount: '' }]);
  const [selectedEmployees, setSelectedEmployees] = useState<number[]>([]); // Initialize state for selected employees
  const [workHours, setWorkHours] = useState({
    clockIn: '',
    breakTime: '',
    clockOut: '',
  });

  const handleAddItem = () => {
    setItems([...items, { description: '', amount: '' }]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleAvatarClick = (employeeId: number) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees(selectedEmployees.filter((id) => id !== employeeId));
    } else {
      setSelectedEmployees([...selectedEmployees, employeeId]);
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
  ) => {
    setWorkHours({ ...workHours, [field]: e.target.value });
  };

  const [showEmployeeList, setShowEmployeeList] = useState(false); // State to toggle employee list

  const toggleEmployeeList = () => {
    setShowEmployeeList(!showEmployeeList);
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            backpath={'/admin/attendance/setting'}
            title="การตั้งค่าการเข้าออกงาน"
            buttons={[
              <div key={'btnConfig'}>
                <Button className="bg-accent1 text-white p-2 m-1 " size="sm">
                  บันทึกการตั้งค่า
                </Button>
                <Button className="bg-accent2 text-white p-2 m-1 " size="sm">
                  ยกเลิก
                </Button>
              </div>,
            ]}
          />
          <div className="flex space-x-4 mt-6">
            <div className="flex-1">
              <CardComponent
                customCard
                custom={
                  <Form id="user" onSubmit={onSubmit} method="post">
                    <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
                      <Tabs variant="underlined">
                        <Tab key="setting" title="การตั้งค่าการทำงาน">
                          <div className="grid grid-cols-2 gap-4">
                            {/* เลือกวันทำงาน */}
                            <div>
                              <h1 className="text-2xl font-bold text-headFont">
                                เลือกวันทำงาน
                              </h1>
                              <div className="flex gap-4 mt-6">
                                <Button
                                  type="button"
                                  className="bg-accent1 text-white w-50%"
                                  onClick={handleAddItem}
                                >
                                  <Icon.PlusSquareOutlined className="text-xl" />
                                  เพิ่มวันทำงาน
                                </Button>
                              </div>
                              {items.map((_: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex w-[80%] gap-4 mt-6"
                                >
                                  <Select
                                    className="flex-1 text-headFont"
                                    name="day"
                                    label="วันทำงาน"
                                    labelPlacement={'outside'}
                                  >
                                    {day.map((item: any) => (
                                      <SelectItem
                                        className="flex-1 text-headFont"
                                        key={item.value}
                                        value={item.value}
                                      >
                                        {item.label}
                                      </SelectItem>
                                    ))}
                                  </Select>
                                  <Button
                                    className="bg-accent2 text-white mt-6"
                                    onClick={() => handleRemoveItem(index)}
                                  >
                                    ลบรายการ
                                  </Button>
                                </div>
                              ))}
                            </div>

                            {/* เพิ่มพนักงาน */}
                            <div>
                              {/* เวลาในการทำงาน */}
                              <div className="mt-6">
                                <h1 className="text-2xl font-bold text-headFont">
                                  เวลาในการทำงาน
                                </h1>
                                <Input
                                  label="เวลาเข้างาน"
                                  type="time"
                                  value={workHours.clockIn}
                                  onChange={(e) =>
                                    handleTimeChange(e, 'clockIn')
                                  }
                                />
                                <Input
                                  label="พักเบรก"
                                  type="time"
                                  value={workHours.breakTime}
                                  onChange={(e) =>
                                    handleTimeChange(e, 'breakTime')
                                  }
                                  className="mt-4"
                                />
                                <Input
                                  label="เวลาออกงาน"
                                  type="time"
                                  value={workHours.clockOut}
                                  onChange={(e) =>
                                    handleTimeChange(e, 'clockOut')
                                  }
                                  className="mt-4"
                                />
                              </div>
                              <h1 className="text-2xl font-bold text-headFont mt-5">
                                เพิ่มพนักงาน
                              </h1>
                              <div className="mt-6">
                                <Select
                                  classNames={{
                                    trigger: 'min-h-12 py-2',
                                  }}
                                  isMultiline={true}
                                  items={users}
                                  label="Assigned to"
                                  labelPlacement="outside"
                                  placeholder="Select a user"
                                  renderValue={(items) => {
                                    return (
                                      <div className="flex flex-wrap gap-2">
                                        {items.map((item) => (
                                          <Chip key={item.key}>
                                            {item.data?.name ?? 'Unknown'}
                                          </Chip>
                                        ))}
                                      </div>
                                    );
                                  }}
                                  selectionMode="multiple"
                                  variant="bordered"
                                >
                                  {(user) => (
                                    <SelectItem
                                      key={user.id}
                                      textValue={user.name}
                                    >
                                      <div className="flex gap-2 items-center">
                                        <Avatar
                                          alt={user.name}
                                          className="flex-shrink-0"
                                          size="sm"
                                          src={user.avatar}
                                        />
                                        <div className="flex flex-col">
                                          <span className="text-small">
                                            {user.name}
                                          </span>
                                          <span className="text-tiny text-default-400">
                                            {user.email}
                                          </span>
                                        </div>
                                      </div>
                                    </SelectItem>
                                  )}
                                </Select>
                              </div>
                              {/* แสดงพนักงานที่เลือกแล้ว */}
                              {selectedEmployees.length > 0 && (
                                <div className="mt-6">
                                  <h2 className="text-xl font-semibold text-headFont">
                                    พนักงานที่เลือกแล้ว
                                  </h2>
                                  <div className="flex flex-wrap gap-4 mt-4">
                                    {employees
                                      .filter((employee) =>
                                        selectedEmployees.includes(employee.id),
                                      )
                                      .map((employee) => (
                                        <div
                                          key={employee.id}
                                          className="flex items-center gap-4 p-2 border border-accent1 rounded-md"
                                        >
                                          <Avatar
                                            src={employee.avatar}
                                            size="md"
                                            className="border border-gray-300"
                                          />
                                          <span className="text-headFont">
                                            {employee.name}
                                          </span>
                                          <Button
                                            size="sm"
                                            className="bg-accent2 text-white"
                                            onClick={() =>
                                              handleAvatarClick(employee.id)
                                            }
                                          >
                                            ลบ
                                          </Button>
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </Form>
                }
              />
            </div>
          </div>
        </div>
      }
    />
  );
}

const day = [
  { label: 'Sunday', value: '1' },
  { label: 'Monday', value: '2' },
  { label: 'Tuesday', value: '3' },
  { label: 'Wednesday', value: '4' },
  { label: 'Thursday', value: '5' },
  { label: 'Friday', value: '6' },
  { label: 'Saturday', value: '7' },
];
const employees = [
  { id: 1, name: 'John Doe', avatar: '/path/to/avatar1.jpg' },
  { id: 2, name: 'Jane Smith', avatar: '/path/to/avatar2.jpg' },
  // Add more employees here
];

export const users = [
  {
    id: 1,
    name: 'Tony Reichert',
    role: 'CEO',
    team: 'Management',
    status: 'active',
    age: '29',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png',
    email: 'tony.reichert@example.com',
  },
  {
    id: 2,
    name: 'Zoey Lang',
    role: 'Tech Lead',
    team: 'Development',
    status: 'paused',
    age: '25',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png',
    email: 'zoey.lang@example.com',
  },
  {
    id: 3,
    name: 'Jane Fisher',
    role: 'Sr. Dev',
    team: 'Development',
    status: 'active',
    age: '22',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png',
    email: 'jane.fisher@example.com',
  },
  {
    id: 4,
    name: 'William Howard',
    role: 'C.M.',
    team: 'Marketing',
    status: 'vacation',
    age: '28',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png',
    email: 'william.howard@example.com',
  },
  {
    id: 5,
    name: 'Kristen Copper',
    role: 'S. Manager',
    team: 'Sales',
    status: 'active',
    age: '24',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/female/3.png',
    email: 'kristen.cooper@example.com',
  },
  {
    id: 6,
    name: 'Brian Kim',
    role: 'P. Manager',
    team: 'Management',
    age: '29',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/male/3.png',
    email: 'brian.kim@example.com',
    status: 'active',
  },
  {
    id: 7,
    name: 'Michael Hunt',
    role: 'Designer',
    team: 'Design',
    status: 'paused',
    age: '27',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/male/4.png',
    email: 'michael.hunt@example.com',
  },
  {
    id: 8,
    name: 'Samantha Brooks',
    role: 'HR Manager',
    team: 'HR',
    status: 'active',
    age: '31',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/female/4.png',
    email: 'samantha.brooks@example.com',
  },
  {
    id: 9,
    name: 'Frank Harrison',
    role: 'F. Manager',
    team: 'Finance',
    status: 'vacation',
    age: '33',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/male/5.png',
    email: 'frank.harrison@example.com',
  },
  {
    id: 10,
    name: 'Emma Adams',
    role: 'Ops Manager',
    team: 'Operations',
    status: 'active',
    age: '35',
    avatar: 'https://d2u8k2ocievbld.cloudfront.net/memojis/female/5.png',
    email: 'emma.adams@example.com',
  },
];
