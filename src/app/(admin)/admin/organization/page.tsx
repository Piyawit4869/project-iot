'use client';

import CardComponent from '@/components/common/card';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import * as Icon from '@ant-design/icons';
import Link from 'next/link';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
  Card,
  CardHeader,
  CardBody,
  RadioGroup,
  Radio,
  InputOtp,
  TimeInput
} from '@nextui-org/react';
import React, { useState } from 'react';
import { Tabs, Tab } from "@nextui-org/react";

export default function OraganizationPage() {
  const [items, setItems] = React.useState([{ description: '', amount: '' }]);
  const [value, setValue] = useState("");

  const handleAddItem = () => {
    setItems([...items, { description: '', amount: '' }]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // const handleItemChange = (index: number, value: string) => {
  //   const updatedItems = [...items];
  //   updatedItems[index].description = value;
  //   setItems(updatedItems);
  // };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting to the URL
    const formData = new FormData(e.currentTarget);

    // Convert formData to an object
    const data = Object.fromEntries(formData.entries());
    console.log(data); // Log the form data for debugging
  };

  const handleChange = (e: any) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    setValue(onlyNums);
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="ข้อมูลองค์กร"
            buttons={[
              <Link href={""} key={'create button'}>
                <Button className="bg-accent1 text-white" key={'create button'}>
                  แก้ไขข้อมูลองค์กร
                </Button>
              </Link>,
            ]}
          />
          <div className="flex space-x-4 mt-6">
            <div className='flex-1'>
              <CardComponent
                customCard
                custom={
                  <Form
                    id="user"
                    onSubmit={onSubmit}
                    method="post"
                  >
                    <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
                      <Tabs variant='underlined'>
                        <Tab key="setting" title="การตั้งค่าระบบ">
                          <h1 className="text-2xl font-bold text-headFont">
                            ตั้งค่าระบบ
                          </h1>
                          <div className="flex gap-4 mt-6">
                            <Select
                              className="flex-1  text-headFont"
                              name="prefix"
                              placeholder="เลือกภาษา"
                              label="ภาษา"
                              labelPlacement={"outside"}
                            >
                              {language.map((item: any) => (
                                <SelectItem
                                  className="text-headFont"
                                  key={item.label}
                                  value={item.value}
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </Select>
                            <Select
                              className="flex-1  text-headFont"
                              name="prefix"
                              placeholder="เลือกธีม"
                              label="ธีมสี"
                              labelPlacement={"outside"}
                            >
                              {theme.map((item: any) => (
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
                            <Select
                              className="flex-1 text-headFont"
                              name="fontsize"
                              placeholder="เลือกขนาดตัวอักษร"
                              label="ขนาดตัวอักษร"
                              labelPlacement={"outside"}
                            >
                              {fontSize.map((item: any) => (
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
                          {items.map((_: any, index: any) => (
                            <div key={index} className="flex items-center gap-6 mt-6">
                              <Select
                                className="flex-1 text-headFont"
                                name="day"
                                placeholder="เลือกวันทำงาน"
                                label="วันทำงาน"
                                labelPlacement={"outside"}
                              >
                                {day.map((item: any) => (
                                  <SelectItem
                                    className="flex-1 text-headFont"
                                    key={item.label}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </Select>
                              <TimeInput
                                className="flex-1"
                                label={
                                  <span className="flex-1 text-headFont">เริ่มงาน</span>
                                }
                                labelPlacement="outside"
                                name="starttime"
                              />
                              <TimeInput
                                className="flex-1"
                                label={
                                  <span className="flex-1 text-headFont">เลิกงาน</span>
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
                              className="bg-secondary text-white w-full"
                              onClick={handleAddItem}
                            >
                              <Icon.PlusSquareOutlined className="text-xl" />
                              เพิ่มวันทำงาน
                            </Button>
                          </div>
                          <div className="flex gap-4 mt-6 justify-end">
                            <Button
                              type="button"
                              className="bg-accent1 text-white"
                            >
                              บันทึกการตั้งค่า
                            </Button>
                          </div>
                        </Tab>
                        <Tab key="address" title="ข้อมูลที่อยู่องค์กร">
                          <div>
                            <h1 className="text-2xl font-bold text-headFont">
                              ข้อมูลที่อยู่องค์กร
                            </h1>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">ชื่อที่อยู่</span>
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
                                  <span className="text-headFont">รหัสไปรษณีย์</span>
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
                                  <span className="text-headFont">ชั้นที่อยู่</span>
                                }
                                labelPlacement="outside"
                                name="floor"
                                placeholder="ชั้นที่อยู่"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">หมู่บ้าน</span>
                                }
                                labelPlacement="outside"
                                name="village"
                                placeholder="หมู่บ้าน"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">เลขหมู่บ้าน</span>
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
                                  <span className="text-headFont">บ้านเลขที่</span>
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
                                  <span className="text-headFont">เขต/อำเภอ</span>
                                }
                                labelPlacement="outside"
                                name="District"
                                placeholder="เขต/อำเภอ"
                              />
                            </div>
                            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
                              <div className="flex gap-4 mt-6">
                                <Input
                                  className="flex-1"
                                  label={
                                    <span className="text-headFont">แขวง/ตำบล</span>
                                  }
                                  labelPlacement="outside"
                                  name="Subdistrict"
                                  placeholder="แขวง/ตำบล"
                                />
                              </div>
                              <div className="flex gap-4 mt-6">
                                <Textarea
                                  classNames={{
                                    base: "",
                                    input: "resize-y min-h-[50px]",
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

                        {/* setting organization */}
                        <Tab key="organization" title="ข้อมูลองค์กร">
                          <div className='w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center'>
                            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
                              <div>
                                <h1 className="text-2xl font-bold text-headFont">
                                  ข้อมูลองค์กร
                                </h1>
                                <div className='font-bold text-headFon mt-10'>
                                  <p>รูปภาพองค์กร</p>
                                </div>
                              </div>
                              <div className="flex gap-4 mt-6 ">
                                <Card className="py-4">
                                  <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                    <h4 className="font-bold text-large">ปิดองค์กร</h4>
                                  </CardHeader>
                                  <CardBody className=" overflow-visible py-2">
                                    <p>ใช้สำหรับการปิดหรือยุติการทำงานขององค์กรในระบบหรือ<br />เว็บไซต์ซึ่งอาจรวมถึงการปิดการใช้งานบัญชีองค์กร</p>
                                    <br />
                                    <p>ปิดองค์กร</p>
                                    <Switch className='mt-3' defaultSelected color="danger">
                                    </Switch>
                                  </CardBody>
                                </Card>
                              </div>
                            </div>
                            <div className="flex gap-4 mt-6">
                              <RadioGroup label="ประเภทธุรกิจ" orientation="horizontal">
                                <Radio value="buenos-aires">บุคคลธรรมดา</Radio>
                                <Radio value="sydney">นิติบุคคล</Radio>
                              </RadioGroup>
                            </div>

                            <div className="flex gap-4 mt-6">
                              <Select
                                className="flex-1  text-headFont"
                                name="prefix"
                                placeholder="สถานะธุรกิจ"
                                label="สถานะธุรกิจ"
                                labelPlacement={"outside"}
                              >
                                {BusinessStatus.map((item: any) => (
                                  <SelectItem
                                    className="text-headFont"
                                    key={item.label}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </Select>
                              <Select
                                className="flex-1  text-headFont"
                                name="prefix"
                                placeholder="รูปแบบธุรกิจ"
                                label="รูปแบบธุรกิจ"
                                labelPlacement={"outside"}
                              >
                                {BusinessModel.map((item: any) => (
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
                                  <span className="text-headFont">ชื่อกิจการ (ภาษาไทย)</span>
                                }
                                labelPlacement="outside"
                                name="surname"
                                placeholder="กรอกชื่อกิจการ"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">ชื่อกิจการ (ภาษาอังกฤษ)</span>
                                }
                                labelPlacement="outside"
                                name="name"
                                placeholder="Enter the business name"
                              />
                            </div>

                            <div className="flex gap-4 mt-6">
                              <div className="flex flex-col gap-4 w-full">
                                <div >
                                  <p className="text-default-5 text-small mb-2 text-black">ลงทะเบียนเลข 13 หลัก</p>
                                  <div className='gap-16'>
                                    <InputOtp length={13} />
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="flex gap-4 mt-6">
                              <Textarea
                                classNames={{
                                  base: "",
                                  input: "resize-y min-h-[50px]",
                                }}
                                label="คำอธิบายธุรกิจ (ภาษาไทย)"
                                labelPlacement="outside"
                                placeholder="คำอธิบายธุรกิจ"
                                variant="bordered"
                              />
                              <Textarea
                                classNames={{
                                  base: "",
                                  input: "resize-y min-h-[50px]",
                                }}
                                label="คำอธิบายธุรกิจ (ภาษาอังกฤษ)"
                                labelPlacement="outside"
                                placeholder="Enter your Business Description"
                                variant="bordered"
                              />
                            </div>
                            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
                              <div className="flex gap-4 mt-6">
                                <DatePicker
                                  className=" flex-1 text-headFont"
                                  name="date"
                                  label="วันที่จดทะเบียน"
                                  labelPlacement={"outside"}
                                />
                              </div>
                              <div className="flex gap-4 mt-6">
                                <div>
                                  <p>จดทะเบียนภาษีมูลค่าเพิ่ม</p>
                                  <Switch className='mt-2' defaultSelected aria-label="Automatic updates" color='secondary' />
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">เว็ปไซต์สำนักงาน</span>
                                }
                                labelPlacement="outside"
                                name="officeWebsite"
                                placeholder="www.three-chief.com"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">ชื่อโดเมน</span>
                                }
                                labelPlacement="outside"
                                name="omainName"
                                placeholder="threechief.com"
                              />
                            </div>

                            <h1 className="text-2xl font-bold text-headFont mt-12">
                              ข้อมูลช่องทางการติดต่อ
                            </h1>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">รายชื่อผู้ติดต่อ</span>
                                }
                                labelPlacement="outside"
                                name="contact"
                                placeholder="ภูวิศ วัฒนะ"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">เบอร์โทรศัพท์ติดต่อ</span>
                                }
                                labelPlacement="outside"
                                name="phoneContact"
                                value={value}
                                onChange={handleChange}
                                placeholder="+66 888 821 480"
                              />
                            </div>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">อีเมลติดต่อ</span>
                                }
                                labelPlacement="outside"
                                name="emailcontact"
                                placeholder="phuwis@threechief.com"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">เว็บไซต์ติดต่อ</span>
                                }
                                labelPlacement="outside"
                                name="websitecontact"
                                placeholder="www.three-chief.com"
                              />
                            </div>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">Facebook</span>
                                }
                                labelPlacement="outside"
                                name="facebook"
                                placeholder="Phuwis Watthana"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">Line ID</span>
                                }
                                labelPlacement="outside"
                                name="lineid"
                                placeholder="0888821480"
                              />
                            </div>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">WhatsApp</span>
                                }
                                labelPlacement="outside"
                                name="Whatsapp"
                                placeholder="0888821480"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">ข้อมูลการติดต่อ</span>
                                }
                                labelPlacement="outside"
                                name="contactinfo"
                                placeholder="10 โมงถึง 6 โมงเย็น"
                              />
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

const BusinessStatus = [
  {
    label: 'ลูกค้าที่เพิ่งลงทะเบียนใหม่ในระบบ',
    value: '1',
  },
  {
    label: 'ลูกค้าที่ใช้งานอย่างต่อเนื่อง',
    value: '2',
  },
  {
    label: 'ลูกค้าที่มีความภักดีต่อระบบ',
    value: '3',
  },
  {
    label: 'ลูกค้าที่อาจจะเสี่ยงต่อการหยุดใช้งาน',
    value: '4',
  },
  {
    label: 'ลูกค้าที่ได้หยุดใช้บริการหรือยกเลิกบัญชี',
    value: '5',
  },
];

const BusinessModel = [
  { label: 'บุคคลธรรมดา', value: '1' },
  { label: 'ห้างหุ้นส่วนสามัญ', value: '2' },
  { label: 'ร้านค้า', value: '3' },
  { label: 'คณะบุคคล', value: '4' },
  { label: 'บริษัทจำกัด', value: '5' },
  { label: 'บริษัทมหาชนจำกัด', value: '6' },
  { label: 'ห้างหุ้นส่วนจำกัด', value: '7' },
  { label: 'มูลนิธิ', value: '8' },
  { label: 'สมาคม', value: '9' },
  { label: 'กิจกรรมร่วมค้า', value: '10' },
  { label: 'อื่นๆ', value: '11' },
];

const language = [
  {
    label: 'ภาษาไทย',
    value: '1',
  },
  {
    label: 'ภาษาอังกฤษ',
    value: '2',
  },
];

const theme = [
  {
    label: 'สว่าง',
    value: '1',
  },
  {
    label: 'มืด',
    value: '2',
  },
];

const fontSize = [
  {
    label: 'ขนาดใหญ่',
    value: '1',
  },
  {
    label: 'ปกติ',
    value: '2',
  },
  {
    label: 'ขนาดเล็ก',
    value: '3',
  },
];

const day = [
  { label: 'Sunday', value: '1' },
  { label: 'Mondey', value: '2' },
  { label: 'Tuesday', value: '3' },
  { label: 'Wednesday', value: '4' },
  { label: 'Thursday', value: '5' },
  { label: 'Friday', value: '6' },
  { label: 'Saturday', value: '7' },
];