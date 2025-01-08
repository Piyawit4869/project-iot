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
import get from '@/pages/api/setting/system/get';
import Scaffold from '@/components/common/scaffold';
import { parseAbsoluteToLocal, parseDate } from '@internationalized/date';

export const Inputorganization = () => {
  const [value, setValue] = React.useState('');
  const [formData, setFormData] = React.useState({}) as any;
  const [data, setData] = React.useState() as any;
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e: any) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
    setValue(onlyNums);
  };

  // const handleItemChange = (index: number, value: string) => {
  //   const updatedItems = [...items];
  //   updatedItems[index].description = value;
  //   setItems(updatedItems);
  // };

  React.useEffect(() => {
    const getSetting = async () => {
      const { data } = await get();

      setData(data);
      setFormData(data.organization);
      setLoading(false);
    };

    getSetting();
  }, []);

  const fixDate = formData.openingDate
    ? parseAbsoluteToLocal(formData.openingDate)
    : undefined;

  return (
    <Scaffold
      child={
        loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative flex flex-col items-center space-y-4">
              {/* Spinner */}
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

              {/* Loading Text */}
              <p className="text-gray-600 text-lg font-semibold animate-pulse">
                Loading, please wait...
              </p>
            </div>
          </div>
        ) : (
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
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <RadioGroup
                name="fromType"
                color="secondary"
                label="ประเภทธุรกิจ"
                orientation="horizontal"
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
                selectedKeys={[formData.status]}
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
                selectedKeys={[formData.type]}
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
                value={formData.nameTh}
              />
              <Input
                className="flex-1"
                label={
                  <span className="text-headFont">ชื่อกิจการ (ภาษาอังกฤษ)</span>
                }
                labelPlacement="outside"
                name="nameEn"
                placeholder="Enter the business name"
                value={formData.nameEn}
              />
            </div>

            <div className="flex gap-4 mt-6">
              <div className="flex flex-col gap-4 w-full">
                <div>
                  <p className="text-default-5 text-small mb-2 text-black">
                    ลงทะเบียนเลข 13 หลัก
                  </p>
                  <div className="gap-16">
                    <InputOtp name="taxId" length={13} value={formData.taxId} />
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
                // value={formData.descriptionsTh}
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
                // value={formData.descriptionsEn}
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
                  granularity="day"
                  value={fixDate}
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
                    // value={formData.registerVat}
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
                value={formData.websiteUrl}
              />
              <Input
                className="flex-1"
                label={<span className="text-headFont">ชื่อโดเมน</span>}
                labelPlacement="outside"
                name="domainName"
                placeholder="threechief.com"
                value={formData.domainName}
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
                // value={formData.contactName}
              />
              <Input
                className="flex-1"
                label={
                  <span className="text-headFont">เบอร์โทรศัพท์ติดต่อ</span>
                }
                labelPlacement="outside"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                placeholder="+66 888 821 480"
              />
            </div>
            <div className="flex gap-4 mt-6">
              <Input
                className="flex-1"
                label={<span className="text-headFont">อีเมลติดต่อ</span>}
                labelPlacement="outside"
                name="contactEmail"
                placeholder="phuwis@threechief.com"
                value={formData.contactEmail}
              />
              <Input
                className="flex-1"
                label={<span className="text-headFont">เว็บไซต์ติดต่อ</span>}
                labelPlacement="outside"
                name="contactWebsite"
                placeholder="www.three-chief.com"
                // value={formData.contactWebsite}
              />
            </div>
            <div className="flex gap-4 mt-6">
              <Input
                className="flex-1"
                label={<span className="text-headFont">Facebook</span>}
                labelPlacement="outside"
                name="contactFacebook"
                placeholder="Phuwis Watthana"
                // value={formData.contactFacebook}
              />
              <Input
                className="flex-1"
                label={<span className="text-headFont">Line ID</span>}
                labelPlacement="outside"
                name="contactLine"
                placeholder="0888821480"
                // value={formData.contactLine}
              />
            </div>
            <div className="flex gap-4 mt-6">
              <Input
                className="flex-1"
                label={<span className="text-headFont">WhatsApp</span>}
                labelPlacement="outside"
                name="contactWhatsapp"
                placeholder="0888821480"
                // value={formData.contactWhatsapp}
              />
              <Input
                className="flex-1"
                label={<span className="text-headFont">ข้อมูลการติดต่อ</span>}
                labelPlacement="outside"
                name="contactinfo"
                placeholder="10 โมงถึง 6 โมงเย็น"
              />
            </div>
          </div>
        )
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
