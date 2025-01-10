'use client';

import Image from 'next/image';
import { CardControl } from '@/components/setting/card-organization';
import {
  Select,
  SelectItem,
  Input,
  Switch,
  Radio,
  RadioGroup,
  DatePicker,
  Textarea,
  InputOtp,
} from '@nextui-org/react';
import React from 'react';
import Scaffold from '@/components/common/scaffold';
import { parseAbsoluteToLocal, parseDate } from '@internationalized/date';

interface Inputorganization {
  data: any;
}

export const Inputorganization = ({
  data,
  onChange,
}: {
  data: any;
  onChange: (updatedData: any) => void;
}) => {
  const [formData, setFormData] = React.useState<any>(data);

  React.useEffect(() => {
    if (data) {
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e: any) => {
    const { name, checked, type, value } = e.target;
    const upadteData =
      type === 'checkbox'
        ? checked
        : name === 'birthDate' && value instanceof Date
        ? value.toISOString()
        : value;

    setFormData((prevData: any) => ({
      ...prevData,
      [name]: upadteData,
    }));

    onChange({ ...formData, [name]: upadteData });
  };

  // const handleItemChange = (index: number, value: string) => {
  //   const updatedItems = [...items];
  //   updatedItems[index].description = value;
  //   setItems(updatedItems);
  // };

  return (
    <Scaffold
      child={
        <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
              <p>รูปภาพองค์กร</p>
              <Image
                className="mt-3"
                src={'/logo.png'}
                alt="image organization"
                width={100}
                height={100}
              ></Image>
            </div>
            <div className="flex gap-4 mt-6 ">
              <CardControl
                name="active"
                title="ปิดองค์กร"
                description="ใช้สำหรับการปิดหรือยุติการทำงานขององค์กรในระบบหรือเว็บไซต์<br>ซึ่งอาจรวมถึงการปิดการใช้งานบัญชีองค์กร"
                control="ปิดองค์กร"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <RadioGroup
              name="fromType"
              color="secondary"
              label="ประเภทธุรกิจ"
              orientation="horizontal"
              onChange={handleChange}
            >
              <Radio name="Individual" value="buenos-aires">
                บุคคลธรรมดา
              </Radio>
              <Radio name="Legal-entity" value="sydney">
                นิติบุคคล
              </Radio>
            </RadioGroup>
          </div>

          <div className="flex gap-4 mt-6">
            <Select
              className="flex-1  text-headFont"
              name="status"
              placeholder="สถานะธุรกิจ"
              label="สถานะธุรกิจ"
              labelPlacement={'outside'}
              onChange={handleChange}
            >
              {BusinessStatus.map((item: any) => (
                <SelectItem
                  className="text-headFont"
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              className="flex-1  text-headFont"
              name="type"
              placeholder="รูปแบบธุรกิจ"
              label="รูปแบบธุรกิจ"
              labelPlacement={'outside'}
              onChange={handleChange}
            >
              {BusinessModel.map((item) => (
                <SelectItem
                  className="text-headFont"
                  key={item.value}
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
              name="nameTh"
              placeholder="กรอกชื่อกิจการ"
              onChange={handleChange}
            />
            <Input
              className="flex-1"
              label={
                <span className="text-headFont">ชื่อกิจการ (ภาษาอังกฤษ)</span>
              }
              labelPlacement="outside"
              name="nameEn"
              placeholder="Enter the business name"
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4 mt-6">
            <div className="flex flex-col gap-4 w-full">
              <div>
                <p className="text-default-5 text-small mb-2 text-black">
                  ลงทะเบียนเลข 13 หลัก
                </p>
                <div className="gap-16">
                  <InputOtp name="taxId" length={13} onChange={handleChange} />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-6">
            <Textarea
              classNames={{
                base: '',
                input: 'resize-y min-h-[50px]',
              }}
              label="คำอธิบายธุรกิจ (ภาษาไทย)"
              labelPlacement="outside"
              placeholder="คำอธิบายธุรกิจ"
              name="descriptionsTh"
              variant="bordered"
              onChange={handleChange}
            />
            <Textarea
              classNames={{
                base: '',
                input: 'resize-y min-h-[50px]',
              }}
              label="คำอธิบายธุรกิจ (ภาษาอังกฤษ)"
              labelPlacement="outside"
              placeholder="Enter your Business Description"
              name="descriptionsEn"
              variant="bordered"
              onChange={handleChange}
            />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div className="flex gap-4 mt-6">
              <DatePicker
                className=" flex-1 text-headFont"
                name="openingDate"
                label="วันที่จดทะเบียน"
                labelPlacement={'outside'}
                disableAnimation
                onChange={(date: any) => {
                  if (date?.year && date?.month && date?.day) {
                    // Convert the custom date object to a valid Date instance
                    const parsedDate = new Date(
                      date.year,
                      date.month - 1,
                      date.day,
                    ); // month is 0-indexed
                    parsedDate.setHours(12);
                    const isoString = parsedDate.toISOString();

                    // Update formData with the ISO string
                    setFormData((prevData: any) => ({
                      ...prevData,
                      birthDate: isoString,
                    }));
                  } else {
                    console.error('Invalid date object:', date);
                  }
                }}
              />
            </div>
            <div className="flex gap-4 mt-6">
              <div>
                <p>จดทะเบียนภาษีมูลค่าเพิ่ม</p>
                <Switch
                  name="registerVat"
                  className="mt-2"
                  defaultSelected
                  aria-label="Automatic updates"
                  color="secondary"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <Input
              className="flex-1"
              label={<span className="text-headFont">เว็ปไซต์สำนักงาน</span>}
              labelPlacement="outside"
              name="websiteUrl"
              placeholder="www.three-chief.com"
              onChange={handleChange}
            />
            <Input
              className="flex-1"
              label={<span className="text-headFont">ชื่อโดเมน</span>}
              labelPlacement="outside"
              name="domainName"
              placeholder="threechief.com"
              onChange={handleChange}
            />
          </div>

          <h1 className="text-2xl font-bold text-headFont mt-12">
            ข้อมูลช่องทางการติดต่อ
          </h1>
          <div className="flex gap-4 mt-6">
            <Input
              className="flex-1"
              label={<span className="text-headFont">รายชื่อผู้ติดต่อ</span>}
              labelPlacement="outside"
              name="contactName"
              placeholder="ภูวิศ วัฒนะ"
              onChange={handleChange}
            />
            <Input
              className="flex-1"
              label={<span className="text-headFont">เบอร์โทรศัพท์ติดต่อ</span>}
              labelPlacement="outside"
              name="contactPhone"
              placeholder="+66 888 821 480"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 mt-6">
            <Input
              className="flex-1"
              label={<span className="text-headFont">อีเมลติดต่อ</span>}
              labelPlacement="outside"
              name="contactEmail"
              placeholder="phuwis@threechief.com"
              onChange={handleChange}
            />
            <Input
              className="flex-1"
              label={<span className="text-headFont">เว็บไซต์ติดต่อ</span>}
              labelPlacement="outside"
              name="contactWebsite"
              placeholder="www.three-chief.com"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 mt-6">
            <Input
              className="flex-1"
              label={<span className="text-headFont">Facebook</span>}
              labelPlacement="outside"
              name="contactFacebook"
              placeholder="Phuwis Watthana"
              onChange={handleChange}
            />
            <Input
              className="flex-1"
              label={<span className="text-headFont">Line ID</span>}
              labelPlacement="outside"
              name="contactLine"
              placeholder="0888821480"
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-4 mt-6">
            <Input
              className="flex-1"
              label={<span className="text-headFont">WhatsApp</span>}
              labelPlacement="outside"
              name="contactWhatsapp"
              placeholder="0888821480"
              onChange={handleChange}
            />
            <Input
              className="flex-1"
              label={<span className="text-headFont">ข้อมูลการติดต่อ</span>}
              labelPlacement="outside"
              name="contactinfo"
              placeholder="10 โมงถึง 6 โมงเย็น"
              onChange={handleChange}
            />
          </div>
        </div>
      }
    />
  );
};

const BusinessStatus = [
  {
    label: 'ลูกค้าที่เพิ่งลงทะเบียนใหม่ในระบบ',
    value: '1',
  },
  {
    label: 'ลูกค้าที่ใช้งานอย่างต่อเนื่อง',
    value: 'active',
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
  { label: 'บริษัทจำกัด', value: 'company_limited' },
  { label: 'บริษัทมหาชนจำกัด', value: '6' },
  { label: 'ห้างหุ้นส่วนจำกัด', value: '7' },
  { label: 'มูลนิธิ', value: '8' },
  { label: 'สมาคม', value: '9' },
  { label: 'กิจกรรมร่วมค้า', value: '10' },
  { label: 'อื่นๆ', value: '11' },
];
