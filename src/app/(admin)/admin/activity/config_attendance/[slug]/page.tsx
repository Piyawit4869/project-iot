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
} from '@nextui-org/react';
import React, { useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';

export default function ConfigAttendanceDetailPage() {
  const [items, setItems] = React.useState([{ description: '', amount: '' }]);
  const [workHours, setWorkHours] = useState({
    clockIn: '',
    breakTime: '',
    clockOut: '',
  });
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);

  // ตัวอย่างข้อมูลพนักงาน (จำลอง)
  const employees = [
    { id: '1', name: 'พนักงาน 1', avatar: '/path-to-avatar1.jpg' },
    { id: '2', name: 'พนักงาน 2', avatar: '/path-to-avatar2.jpg' },
    { id: '3', name: 'พนักงาน 3', avatar: '/path-to-avatar3.jpg' },
    { id: '4', name: 'พนักงาน 3', avatar: '/path-to-avatar3.jpg' },
    { id: '5', name: 'พนักงาน 3', avatar: '/path-to-avatar3.jpg' },
  ];

  const handleAddItem = () => {
    setItems([...items, { description: '', amount: '' }]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  const handleAvatarClick = (employee: string) => {
    if (selectedEmployees.includes(employee)) {
      setSelectedEmployees(selectedEmployees.filter((e) => e !== employee)); // ลบออกถ้าคลิกซ้ำ
    } else {
      setSelectedEmployees([...selectedEmployees, employee]); // เพิ่มถ้ายังไม่มี
    }
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
            backpath={'/admin/activity/config_attendance'}
            title="การตั้งค่าการเข้าออกงาน"
            buttons={[
              <div key={'btnConfig'}>
                <Button className="bg-accent1 text-white p-2 m-1">
                  บันทึกการตั้งค่า
                </Button>
                <Button className="bg-accent2 text-white p-2 m-1">
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
                                  className="bg-secondary text-white w-50%"
                                  onClick={handleAddItem}
                                >
                                  <Icon.PlusSquareOutlined className="text-xl" />
                                  เพิ่มวันทำงาน
                                </Button>
                              </div>
                              {items.map((_: any, index: number) => (
                                <div
                                  key={index}
                                  className="flex w-[75%] gap-4 mt-6"
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
                              <h1 className="text-2xl font-bold text-headFont">
                                เพิ่มพนักงาน
                              </h1>
                              <div className="mt-6">
                                <Button
                                  type="button"
                                  className="bg-secondary text-white w-full"
                                  onClick={toggleEmployeeList}
                                >
                                  {showEmployeeList
                                    ? 'ซ่อนรายการพนักงาน'
                                    : 'เพิ่มพนักงาน'}
                                </Button>
                                {showEmployeeList && (
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                                    {employees.map((employee) => (
                                      <div
                                        key={employee.id}
                                        className={`flex items-center gap-4 cursor-pointer p-2 border ${
                                          selectedEmployees.includes(
                                            employee.id,
                                          )
                                            ? 'border-accent1'
                                            : 'border-gray-300'
                                        } rounded-md`}
                                        onClick={() =>
                                          handleAvatarClick(employee.id)
                                        }
                                      >
                                        <Avatar
                                          src={employee.avatar}
                                          size="lg"
                                          className="border border-gray-300"
                                        />
                                        <span className="text-headFont">
                                          {employee.name}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
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
