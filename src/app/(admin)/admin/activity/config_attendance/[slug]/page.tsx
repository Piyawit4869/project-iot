'use client';

import CardComponent from '@/components/common/card';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import * as Icon from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
  Select,
  SelectItem,
  Textarea,
  TimeInput,
} from '@nextui-org/react';
import React, { useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';

export default function ConfigAttendanceDetailPage() {
  const [items, setItems] = React.useState([{ description: '', amount: '' }]);
  useState;
  const handleAddItem = () => {
    setItems([...items, { description: '', amount: '' }]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

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
            backpath={'/admin/activity/config_attendance'}
            title="การตั้งค่าการเข้าออกงาน"
            buttons={[
              <div key={'btnConfig'}>
                <Button
                  className="bg-accent2 text-white p-2 m-1"
                  key={'create button'}
                >
                  บันทึกการตั้งค่า
                </Button>
                <Button
                  className="bg-accent3 text-white p-2 m-1"
                  key={'create button'}
                >
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
                        <Tab key="setting" title="การตั้งค่าวันทำงาน">
                          <h1 className="text-2xl font-bold text-headFont">
                            เลือกวันทำงาน
                          </h1>
                          {items.map((_: any, index: any) => (
                            <div
                              key={index}
                              className="flex items-center gap-6 mt-6"
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
                                    key={item.value} // ใช้ item.value เพื่อให้เป็นเอกลักษณ์
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </Select>
                              <TimeInput
                                className="flex-1"
                                label={
                                  <span className="flex-1 text-headFont">
                                    เริ่มงาน
                                  </span>
                                }
                                labelPlacement="outside"
                                name="starttime"
                              />
                              <TimeInput
                                className="flex-1"
                                label={
                                  <span className="flex-1 text-headFont">
                                    พักเบรก
                                  </span>
                                }
                                labelPlacement="outside"
                                name="starttime"
                              />
                              <TimeInput
                                className="flex-1"
                                label={
                                  <span className="flex-1 text-headFont">
                                    เลิกงาน
                                  </span>
                                }
                                labelPlacement="outside"
                                name="outtime"
                              />
                              <a
                                className="text-red-500 cursor-pointer mt-6"
                                onClick={() => handleRemoveItem(index)}
                              >
                                ลบรายการ
                              </a>
                            </div>
                          ))}
                          <div className="flex  gap-4 mt-6">
                            <Button
                              type="button"
                              key={'buttonTitle'}
                              className="bg-secondary text-white w-full"
                              onClick={handleAddItem}
                            >
                              <Icon.PlusSquareOutlined className="text-xl" />
                              เพิ่มวันทำงาน
                            </Button>
                          </div>
                          <div className="flex gap-4 mt-6 justify-end"></div>
                        </Tab>
                        <Tab key="address" title="ไวท์ลิสต์">
                          <div>
                            <h1 className="text-2xl font-bold text-headFont">
                              ไวท์ลิสต์
                            </h1>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">
                                    ชื่อที่อยู่
                                  </span>
                                }
                                labelPlacement="outside"
                                name="AddressName"
                                placeholder="ชื่อที่อยู่"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">เมือง</span>
                                }
                                labelPlacement="outside"
                                name="city"
                                placeholder="ชื่อเมือง"
                              />
                            </div>

                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">จังหวัด</span>
                                }
                                labelPlacement="outside"
                                name="province"
                                placeholder="ชื่อจังหวัด"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">
                                    รหัสไปรษณีย์
                                  </span>
                                }
                                labelPlacement="outside"
                                name="zipcode"
                                placeholder="ชื่อรหัสไปรษณีย์"
                              />
                            </div>

                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">เลขห้อง</span>
                                }
                                labelPlacement="outside"
                                name="Roomnumber"
                                placeholder="เลขห้อง"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">
                                    ชั้นที่อยู่
                                  </span>
                                }
                                labelPlacement="outside"
                                name="floor"
                                placeholder="ชั้นที่อยู่"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">
                                    หมู่บ้าน
                                  </span>
                                }
                                labelPlacement="outside"
                                name="village"
                                placeholder="หมู่บ้าน"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">
                                    เลขหมู่บ้าน
                                  </span>
                                }
                                labelPlacement="outside"
                                name="Villagenumber"
                                placeholder="เลขหมู่บ้าน"
                              />
                            </div>

                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">
                                    บ้านเลขที่
                                  </span>
                                }
                                labelPlacement="outside"
                                name="housenumber"
                                placeholder="บ้านเลขที่"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">ตรอก</span>
                                }
                                labelPlacement="outside"
                                name="alley"
                                placeholder="ตรอก"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">ถนน</span>
                                }
                                labelPlacement="outside"
                                name="road"
                                placeholder="ถนน"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">อาคาร</span>
                                }
                                labelPlacement="outside"
                                name="building"
                                placeholder="อาคาร"
                              />
                            </div>

                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">ประเทศ</span>
                                }
                                labelPlacement="outside"
                                name="country"
                                placeholder="ประเทศ"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">
                                    เขต/อำเภอ
                                  </span>
                                }
                                labelPlacement="outside"
                                name="District"
                                placeholder="เขต/อำเภอ"
                              />
                            </div>
                            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                              <div className="flex gap-4 mt-6">
                                <Input
                                  className="flex-1"
                                  label={
                                    <span className="text-headFont">
                                      แขวง/ตำบล
                                    </span>
                                  }
                                  labelPlacement="outside"
                                  name="Subdistrict"
                                  placeholder="แขวง/ตำบล"
                                />
                              </div>
                              <div className="flex gap-4 mt-6">
                                <Textarea
                                  classNames={{
                                    base: '',
                                    input: 'resize-y min-h-[50px]',
                                  }}
                                  label="หมายเหตุ"
                                  labelPlacement="outside"
                                  placeholder="หมายเหตุ"
                                  variant="bordered"
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

const day  = [
  { label: 'Sunday', value: '1' },
  { label: 'Mondey', value: '2' },
  { label: 'Tuesday', value: '3' },
  { label: 'Wednesday', value: '4' },
  { label: 'Thursday', value: '5' },
  { label: 'Friday', value: '6' },
  { label: 'Saturday', value: '7' },
];
