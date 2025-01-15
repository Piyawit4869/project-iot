'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from '@nextui-org/react';
import createWorkInfos from '@/pages/api/workinfos/create'; //API
import CardComponent from '@/components/common/card';
import { useRouter } from 'next/navigation';
import * as Icon from '@ant-design/icons';
import React from 'react';
import { data } from 'framer-motion/client';

export default function WorkinfoCreatePage() {
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;
  const [, setLoading] = React.useState(false);
  // const router = useRouter();

  const priority = [
    { value: 'low', label: 'Low ' },
    { value: 'medium', label: 'Medium ' },
    { value: 'high', label: 'High ' },
  ]; // กำหนดค่าให้กับ priority

  const handleChange = (e: any) => {
    const { name, checked, type, value } = e.target;

    setFormData((prevData: any) => ({
      ...prevData,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'userIds'
          ? value.split(',').map((id: string) => id.trim()) // Ensure it's an array of strings
          : [
              'startCredit',
              'totalCredit',
              'totalWorkHours',
              'limitTimePerDay',
            ].includes(name)
          ? parseFloat(value) || 0
          : name === 'startDate' && value instanceof Date
          ? value.toISOString()
          : value,
    }));
  };

 const onSubmit = async (e: React.FormEvent) => {
  console.log('name');
  
  e.preventDefault();
  setLoading(true);

  const requiredFields = [
    'name',
    'prefix',
    'startDate',
    'dueDate',
    'limitTimePerDay',
    'inspector',
    'startCredit',
    'payDay',
  ];
  console.log('name2');
  
  const newErrors: any = {};

  requiredFields.forEach((field) => {
    const value = formData[field];
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      newErrors[field] = `Field ${field} is required.`;
    }
    if (
      ['limitTimePerDay', 'startCredit'].includes(field) &&
      isNaN(Number(value))
    ) {
      newErrors[field] = `Field ${field} must be a valid number.`;
    }
    if (
      ['startDate', 'dueDate', 'payDay'].includes(field) &&
      isNaN(Date.parse(value))
    ) {
      newErrors[field] = `Field ${field} must be a valid date.`;
    }
  });

  // if (Object.keys(newErrors).length > 0) {
  //   setErrors(newErrors);
  //   setLoading(false);
  //   return;
  // }

  try {
    const payload = {
      ...formData,
      active: !!formData.active,
      limitTimePerDay: Number(formData.limitTimePerDay) || 0,
      startCredit: Number(formData.startCredit) || 0,
      startDate: new Date(formData.startDate).toISOString(),
      dueDate: new Date(formData.dueDate).toISOString(),
      payDay: new Date(formData.payDay).toISOString(),
    };

    console.log('Payload:', payload);

    // const data = await createWorkInfos({},payload);
    // router.push(`/admin/attendance/work-infomation/${data.id}`);
  } catch (err: any) {
    console.error('API Error:', err);
    setErrors({ general: err.message });
  } finally {
    setLoading(false);
  }
  console.log({data});
  console.log({createWorkInfos})
  
};

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="การสร้างข้อมูลการทำงาน"
            backpath={'/admin/attendance/work-infomation'}
            buttons={[
              <div className="mx-2.5" key="save-button">
                <a className="p-2">
                  <Button
                    className="bg-accent1 text-white p-2 gap-2"
                    type="submit"
                    form="Workinfo"
                    onClick={() => {
                      // setCreateStatus('pending');
                    }}
                  >
                    <Icon.CheckOutlined />
                    บันทึการสร้าง
                  </Button>
                </a>

                <a
                  href={'/admin/attendance/work-infomation/'}
                  key={'cancel-Workinfo-button'}
                >
                  <Button
                    className="bg-accent2 text-white p-2 gap-2"
                    type="reset"
                    form="Workinfos"
                  >
                    <Icon.CloseOutlined />
                    ยกเลิกการสร้าง
                  </Button>
                </a>
              </div>,
            ]}
          />
          <div className="flex space-x-4 mt-6">
            <div className="flex-1">
              <CardComponent
                customCard
                custom={
                  <Form
                    id="Workinfo"
                    onSubmit={onSubmit}
                    method="post"
                    validationErrors={errors}
                  >
                    <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
                      {/* Content Section */}
                      <div className="mb-6">
                        {/* Detail Section */}
                        <div className="px-5 pt-5">
                          <h1 className="text-2xl font-bold text-headFont mb-10">
                            ข้อมูลการทำงาน
                          </h1>
                          {/* Workinfo Section */}
                          {/* GET API FOR SHOW DISPLAY */}
                          <div className="flex gap-4 mt-6">
                            <div className="flex-1 flex items-center gap-4 pt-6">
                              <span className="text-headFont text-xs">
                                สถานะ
                              </span>
                              <Switch
                                name="active"
                                color="secondary"
                                onChange={handleChange}
                                required
                                defaultChecked
                              />
                            </div>
                            <div className="flex-1 flex items-center gap-4 pt-6">
                              <span className="text-headFont text-xs">
                                เป็นปัจจุบัน
                              </span>
                              <Switch
                                name="isCurrent"
                                color="secondary"
                                onChange={handleChange}
                                required
                                defaultChecked
                              />
                            </div>
                          </div>
                          <div className="flex gap-4 mt-6">
                            <Input
                              className="flex-1"
                              size="lg"
                              label="prefix"
                              labelPlacement="outside"
                              name="prefix"
                              placeholder="ชื่อย่อของงาน"
                              onChange={handleChange}
                              required
                            />
                            <Input
                              className="flex-1"
                              size="lg"
                              label="name"
                              labelPlacement="outside"
                              name="name"
                              placeholder="ชื่อ"
                              onChange={handleChange}
                              required
                            />
                          </div>

                          <div className="flex-1 flex items-center gap-4 pt-6">
                            <Input
                              className="flex-1"
                              size="lg"
                              label="descriptions"
                              labelPlacement="outside"
                              name="descriptions"
                              placeholder="รายระเอียด"
                              onChange={handleChange}
                            />
                            <Select
                              size="sm"
                              className="flex-1"
                              name="priority"
                              label="priority"
                              onChange={handleChange}
                              isRequired
                              errorMessage={'priority'}
                            >
                              {priority.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>

                          <div className="flex-1 flex items-center gap-4 pt-6">
                            <DatePicker
                              size="sm"
                              className="flex-1"
                              name="startDate"
                              label="startDate"
                              disableAnimation
                              isRequired
                              errorMessage={'กรุณาเลือกวันที่สร้าง'}
                              onChange={(date: any) => {
                                if (date?.year && date?.month && date?.day) {
                                  // Convert the custom date object to a valid Date instance
                                  const parsedDate = new Date(
                                    date.year,
                                    date.month - 1,
                                    date.day,
                                  ); // month is 0-indexed
                                  const isoString = parsedDate.toISOString();

                                  // Update formData with the ISO string
                                  setFormData((prevData: any) => ({
                                    ...prevData,
                                    startDate: isoString,
                                  }));
                                } else {
                                  console.error('Invalid date object:', date);
                                }
                              }}
                            />
                            <DatePicker
                              size="sm"
                              className="flex-1"
                              name="dueDate"
                              label="dueDate"
                              disableAnimation
                              isRequired
                              errorMessage={'กรุณาเลือกวันที่สร้าง'}
                              onChange={(date: any) => {
                                if (date?.year && date?.month && date?.day) {
                                  // Convert the custom date object to a valid Date instance
                                  const parsedDate = new Date(
                                    date.year,
                                    date.month - 1,
                                    date.day,
                                  ); // month is 0-indexed
                                  const isoString = parsedDate.toISOString();

                                  // Update formData with the ISO string
                                  setFormData((prevData: any) => ({
                                    ...prevData,
                                    dueDate: isoString,
                                  }));
                                } else {
                                  console.error('Invalid date object:', date);
                                }
                              }}
                            />
                          </div>

                          <div className="flex-1 flex items-center gap-4 pt-6">
                            <Input
                              className="flex-1"
                              size="lg"
                              label="limitTimePerDay"
                              labelPlacement="outside"
                              name="limitTimePerDay"
                              type="number"
                              placeholder="เวลาที่กำหนดต่อวัน"
                              onChange={handleChange}
                            />
                            <Input
                              className="flex-1 "
                              size="lg"
                              label="inspector"
                              labelPlacement="outside"
                              name="inspector"
                              placeholder="ผู้ตรวจสอบ"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="flex-1 flex items-center gap-4 pt-6">
                            <Input
                              className="flex-1"
                              size="lg"
                              label="startCredit"
                              labelPlacement="outside"
                              name="startCredit"
                              type="number"
                              placeholder="เครดิตเริ่มต้น"
                              onChange={handleChange}
                            />
                            <Input
                              className="flex-1 "
                              size="lg"
                              label="totalCredit"
                              labelPlacement="outside"
                              name="totalCredit"
                              type="number"
                              placeholder="เครดิสรวม"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="flex-1 flex items-center gap-4 pt-6">
                            <Input
                              className="flex-1"
                              size="lg"
                              label="totalWorkHours"
                              labelPlacement="outside"
                              name="totalWorkHours"
                              type="number"
                              placeholder="รวมเวลาทำงาน"
                              onChange={handleChange}
                            />
                            <DatePicker
                              size="sm"
                              className="flex-1"
                              name="payDay"
                              label="payDay"
                              disableAnimation
                              isRequired
                              errorMessage={'กรุณาเลือกวันที่สร้าง'}
                              onChange={(date: any) => {
                                if (date?.year && date?.month && date?.day) {
                                  // Convert the custom date object to a valid Date instance
                                  const parsedDate = new Date(
                                    date.year,
                                    date.month - 1,
                                    date.day,
                                  ); // month is 0-indexed
                                  const isoString = parsedDate.toISOString();

                                  // Update formData with the ISO string
                                  setFormData((prevData: any) => ({
                                    ...prevData,
                                    payDay: isoString,
                                  }));
                                } else {
                                  console.error('Invalid date object:', date);
                                }
                              }}
                            />
                          </div>
                          <div className="flex-1 flex items-center gap-4 pt-6">
                            <Textarea
                              className="flex-1"
                              size="lg"
                              label="note"
                              labelPlacement="outside"
                              name="note"
                              placeholder="เหตุ"
                              onChange={handleChange}
                            />
                          </div>
                          <div className="flex-1 flex items-center gap-4 pt-6">
                            <Input
                              className="flex-1 "
                              size="lg"
                              label="userIds"
                              labelPlacement="outside"
                              name="userIds"
                              placeholder="userId"
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
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
