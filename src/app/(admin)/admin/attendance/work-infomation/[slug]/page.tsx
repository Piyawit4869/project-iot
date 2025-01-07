'use client';

import CardComponent from '@/components/common/card';
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
} from '@nextui-org/react';
import React from 'react';

export default function WorkInfonSinglePage() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting to the URL
    const formData = new FormData(e.currentTarget);

    // Convert formData to an object
    const data = Object.fromEntries(formData.entries());
    console.log(data); // Log the form data for debugging
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="ข้อมูลการทำงาน (WorkInfo)"
            backpath={'/admin/attendance/work-infomation'}
            buttons={[
              <Button className="bg-accent1 text-white" key={'approve button'}>
                อนุมัติ
              </Button>,
              <Button className="bg-accent2 text-white" key={'reject button'}>
                ปฏิเสธ
              </Button>,
              <Button className="bg-accent3 text-white" key={'edit button'}>
                แก้ไข
              </Button>,
            ]}
          />
          <div className="flex gap-4 mt-6">
            <CardComponent
              className={'flex-1 z-0'}
              customCard
              custom={
                <Form
                  className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-1 gap-4 items-center"
                  id="notation"
                  onSubmit={onSubmit}
                  method="post"
                >
                  <h1 className="text-2xl font-bold text-headFont">
                    ข้อมูลการทำงาน
                  </h1>

                  {/* สถานะ */}
                  <h5>สถานะ</h5>
                  <Select
                    className="flex-1 text-headFont"
                    name="status"
                    placeholder="สถานะ"
                  >
                    {types.map((item: any) => (
                      <SelectItem
                        className="text-headFont"
                        key={item.label}
                        value={item.value}
                      >
                        {item.label}
                      </SelectItem>
                    ))}
                  </Select>

                  {/* การใช้งาน */}
                  <h5>การใช้งาน</h5>
                  <Input
                    className="flex-1 text-headFont"
                    labelPlacement="outside"
                    name="active"
                    placeholder="การใช้งาน"
                  />

                  {/* เป็นปัจจุบัน */}
                  <span className="text-headFont"> เป็นปัจจุบัน</span>
                  <Switch className="flex-1" name="isCurrent" />

                  {/* คำนำหน้า */}
                  <h5>คำนำหน้า</h5>
                  <Input
                    className="flex-1 text-headFont"
                    labelPlacement="outside"
                    name="prefix"
                    placeholder="คำนำหน้า"
                  />

                  {/* ชื่อ */}
                  <h5>ชื่อ</h5>
                  <Input
                    className="flex-1 text-headFont"
                    labelPlacement="outside"
                    name="name"
                    placeholder="ชื่อ"
                  />

                  {/* วันเปิดทำการ */}
                  <h5>วันเปิดทำการ</h5>
                  <Input
                    className="flex-1 text-headFont"
                    labelPlacement="outside"
                    name="openDays"
                    placeholder="วันเปิดทำการ"
                  />

                  {/* รายละเอียด */}
                  <h5>รายละเอียด</h5>
                  <Input
                    className="flex-1 text-headFont"
                    labelPlacement="outside"
                    name="descriptions"
                    placeholder="รายละเอียด"
                  />

                  {/* วันที่เริ่มต้น */}
                  <h5>วันที่เริ่มต้น</h5>
                  <DatePicker
                    className="flex-1 text-headFont"
                    name="startDate"
                    label="วันที่เริ่มต้น"
                  />

                  {/* วันที่กำหนด */}
                  <h5>วันที่กำหนด</h5>
                  <DatePicker
                    className="flex-1 text-headFont"
                    name="dueDate"
                    label="วันที่กำหนด"
                  />

                  {/* เวลาที่จำกัดต่อวัน */}
                  <h5>เวลาที่จำกัดต่อวัน</h5>
                  <Input
                    className="flex-1 text-headFont"
                    labelPlacement="outside"
                    name="limitTimePerDay"
                    placeholder="เวลาที่จำกัดต่อวัน"
                    type="number"
                  />

                  {/* ผู้ตรวจสอบ */}
                  <h5>ผู้ตรวจสอบ</h5>
                  <Input
                    className="flex-1 text-headFont"
                    labelPlacement="outside"
                    name="inspector"
                    placeholder="ผู้ตรวจสอบ"
                  />

                  {/* เครดิตเริ่มต้น */}
                  <h5>เครดิตเริ่มต้น</h5>
                  <Input
                    className="flex-1 text-headFont"
                    labelPlacement="outside"
                    name="startCredit"
                    placeholder="เครดิตเริ่มต้น"
                    type="number"
                  />

                  {/* เครดิตรวม */}
                  <h5>เครดิตรวม</h5>
                  <Input
                    className="flex-1 text-headFont"
                    labelPlacement="outside"
                    name="totalCredit"
                    placeholder="เครดิตรวม"
                    type="number"
                  />

                  {/* จำนวนชั่วโมงการทำงานรวม */}
                  <h5>จำนวนชั่วโมงการทำงานรวม</h5>
                  <Input
                    className="flex-1 text-headFont"
                    labelPlacement="outside"
                    name="totalWorkHours"
                    placeholder="จำนวนชั่วโมงการทำงานรวม"
                    type="number"
                  />

                  {/* วันที่จ่ายเงิน */}
                  <h5>วันที่จ่ายเงิน</h5>
                  <DatePicker
                    className="flex-1 text-headFont"
                    name="payDay"
                    label="วันที่จ่ายเงิน"
                  />

                  {/* หมายเหตุ */}
                  <h5>หมายเหตุ</h5>
                  <Input
                    className="flex-1 text-headFont"
                    labelPlacement="outside"
                    name="note"
                    placeholder="หมายเหตุ"
                  />
                </Form>
              }
            />

          </div>
        </div>
      }
    />
  );
}

const types = [
  {
    label: 'Rome',
    value: 'rome',
  },
  {
    label: 'Isted',
    value: 'isted',
  },
  {
    label: 'Dev',
    value: 'dev',
  },
];
