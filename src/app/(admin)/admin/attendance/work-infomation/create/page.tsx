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

export default function WorkinfoCreatePage() {
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;
  const [, setLoading] = React.useState(false);
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, checked, type, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'startDate' && value instanceof Date
          ? value.toISOString()
          : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
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
    const newErrors: any = {};

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = `Field ${field} is required.`;
      }
    });

    // ตรวจสอบว่า startCredit, totalCredit, totalWorkHours เป็นตัวเลข
    ['startCredit', 'totalCredit', 'totalWorkHours'].forEach((field) => {
      if (isNaN(formData[field])) {
        newErrors[field] = `${field} must be a valid number.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const payload = {
        active: formData.active,
        isCurrent: formData.isCurrent,
        prefix: formData.prefix,
        name: formData.name,
        descriptions: formData.descriptions,
        priority: formData.priority,
        startDate: formData.startDate,
        dueDate: formData.dueDate,
        limitTimePerDay: formData.limitTimePerDay.toNumber(),
        inspector: formData.inspector,
        startCredit: formData.startCredit.toNumber(),
        totalCredit: formData.totalCredit.toNumber(),
        totalWorkHours: formData.totalWorkHours.toNumber(),
        payDay: formData.payDay,
        note: formData.note,

        ...formData,
      };

      payload.active = !!payload.active; // Simplified active check

      const { data } = await createWorkInfos({}, payload);
      console.log(payload);
      router.push(`/admin/attendance/workinfomation/${data.id}`);
    } catch (err: any) {
      console.error('Send FormData error:', err);
      setErrors({ general: err.message || 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="การสร้างข้อมูลการทำงาน"
            backpath={'/admin/attendance/Workinfo'}
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
                  href={'/admin/attendance/Workinfo/'}
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
                            <div className="flex-1 flex items-center gap-4">
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
                            <div className="flex-1 flex items-center gap-4">
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

                          <div className="flex-1 flex items-center gap-4">
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
                              name="type"
                              label="priority"
                              onChange={handleChange}
                              isRequired
                              errorMessage={'priority'}
                            >
                              {types.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>

                          <div className="flex-1 flex items-center gap-4">
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

                          <div className="flex-1 flex items-center gap-4">
                            <Input
                              className="flex-1"
                              size="lg"
                              label="limitTimePerDay"
                              labelPlacement="outside"
                              name="limitTimePerDay"
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
                          <div className="flex-1 flex items-center gap-4">
                            <Input
                              className="flex-1"
                              size="lg"
                              label="startCredit"
                              labelPlacement="outside"
                              name="startCredit"
                              placeholder="เครดิตเริ่มต้น"
                              onChange={handleChange}
                            />
                            <Input
                              className="flex-1 "
                              size="lg"
                              label="totalCredit"
                              labelPlacement="outside"
                              name="totalCredit"
                              placeholder="เครดิสรวม"
                              onChange={handleChange}
                            />
                          </div>

                          <div className="flex-1 flex items-center gap-4">
                            <Input
                              className="flex-1"
                              size="lg"
                              label="totalWorkHours"
                              labelPlacement="outside"
                              name="totalWorkHours"
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
                          <div className="flex-1 flex items-center gap-4">
                            <Textarea
                              className="flex-1 pt-6"
                              size="lg"
                              label="note"
                              labelPlacement="outside"
                              name="note"
                              placeholder="เหตุ"
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

const types = [
  { label: 'ใบแจ้งหนี้', value: 'invoice' },
  { label: 'ใบเสนอราคา', value: 'quotation' },
  { label: 'ใบการจัดส่งคำสั่งซื้อ', value: 'delivery_order' },
  { label: 'ใบสั่งซื้อ', value: 'purchase_order' },
  { label: 'ใบเสร็จรับเงิน', value: 'receipt' },
];

const address = [
  { label: 'ที่อยู่หลัก', value: '1' },
  { label: 'โกดัง', value: '2' },
];

const customer = [
  { label: 'ลูกค้าคนที่ 1', value: '1' },
  { label: 'ลูกค้าคนที่ 2', value: '2' },
];

const selectItem = [
  { label: 'รายการที่ 1', value: '1' },
  { label: 'รายการที่ 2', value: '2' },
];
