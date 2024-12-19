'use client';

import Scaffold from '@/components/common/scaffold';
import CardComponent from '@/components/common/card';
import { TopSection } from '@/components/common/topSection';
import {
  Button,
  Form,
  Card,
  CardHeader,
  CardBody,
  Switch,
  Select,
  SelectItem,
  Input,
  DatePicker,
} from '@nextui-org/react';
import React from 'react';

export default function CreateUserPage() {

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting to the URL
    const formData = new FormData(e.currentTarget);

    // Convert formData to an object
    const data = Object.fromEntries(formData.entries());
    console.log(data); // Log the form data for debugging
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <Scaffold
          child={
            <div>
              <TopSection
                title="ข้อมูลผู้ใช้"
                backpath={'/admin/user'}
                buttons={[
                  //submit form where out form
                  <Button
                    className="bg-accent3 text-white"
                    type="submit"
                    form="notation"
                    key={'cancel button'}
                  >
                    ยกเลิก
                  </Button>,
                  <Button
                    className="bg-accent2 text-white"
                    type="submit"
                    form="notation"
                    key={'create button'}
                  >
                    บันทึก
                  </Button>,
                ]}
              />
              <div className="flex space-x-4 mt-6">
                <div className='flex-1'>
                  <CardComponent
                    customCard
                    custom={
                      <Form
                        id="profile"
                        onSubmit={onSubmit}
                        method="post"
                      >
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                          <div >
                            <h1 className="text-2xl font-bold text-headFont">
                              ข้อมูลผู้ใข้
                            </h1>
                            <div className='font-bold text-headFon mt-10'>
                              <p>รูปภาพองค์กร</p>
                            </div>
                          </div>
                          <div className="flex gap-4 mt-6">
                            <div>
                              <Card className="py-4">
                                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                  <h4 className="font-bold text-large">เปิดใช้งาน</h4>
                                </CardHeader>
                                <CardBody className=" overflow-visible py-2">
                                  <p>ใช้สำหรับการปิดหรือยุติการทำงานของผู้ใช้งาน</p>
                                  <br />
                                  <p>เปิดใช้งาน</p>
                                  <Switch className='mt-3' defaultSelected color="danger">
                                  </Switch>
                                </CardBody>
                              </Card>
                            </div>
                          </div>

                          <div className="flex gap-4 mt-6">
                            <Select
                              className="flex-1  text-headFont"
                              name="prefix"
                              placeholder="เลือกคำนำหน้า"
                              label="คำนำหน้า"
                              labelPlacement={"outside"}
                            >
                              {prefix.map((item: any) => (
                                <SelectItem
                                  className="text-headFont"
                                  key={item.label}
                                  value={item.value}
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                          <div className="flex gap-4 mt-6">
                            <Input
                              className="flex-1"
                              label={
                                <span className="text-headFont">ชื่อ</span>
                              }
                              labelPlacement="outside"
                              name="name"
                              placeholder="กรอกรชื่อ"
                            />
                          </div>
                          <div className="flex gap-4 mt-6">
                            <Input
                              className="flex-1"
                              label={
                                <span className="text-headFont">นามสกุล</span>
                              }
                              labelPlacement="outside"
                              name="lastname"
                              placeholder="กรอกนามสกุล"
                            />
                          </div>
                          <div className="flex gap-4 mt-6">
                            <DatePicker
                              className="flex-1  text-headFont"
                              name="birthday"
                              label="วัน/เดือน/ปีเกิด"
                              labelPlacement="outside"
                            />
                          </div>
                          <div className="flex gap-4 mt-6">
                            <Input
                              className="flex-1"
                              label={
                                <span className="text-headFont">เบอร์โทรศัพท์</span>
                              }
                              labelPlacement="outside"
                              name="phone"
                              placeholder="กรอกเบอร์โทรศัพท์"
                            />
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
      </div>
    </div >
  );
}

const prefix = [
  { label: 'นาย', value: '1' },
  { label: 'นาง', value: '2' },
  { label: 'นางสาว', value: '3' },
];
