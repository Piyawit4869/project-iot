'use client';

// import Image from 'next/image';
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
  Image,
} from '@nextui-org/react';
import React from 'react';
import Scaffold from '@/components/common/scaffold';
import { parseDate } from '@internationalized/date';
import Image from 'next/image';

interface InputorBranchProps {
  data: any;
  onChange: (updatedData: any) => void;
  openEdit: boolean;
}

export default function InputBranch({
  data,
  onChange,
  openEdit,
}: InputorBranchProps) {
  const [formData, setFormData] = React.useState<any>(data);
  const [branch, setBranch] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (data) {
      setFormData(data);
      setBranch(data.organization.branches);
    }
  }, [data]);

  const handleChange = (e: any) => {
    const { name, checked, type, value } = e.target;
    const updatedData =
      type === 'checkbox'
        ? checked
        : name === 'openingDate' && value instanceof Date
        ? value.toISOString()
        : value;

    setFormData((prevData: any) => ({
      ...prevData,
      [name]: updatedData,
    }));

    onChange({ ...formData, updatedData });
  };

  // const handleItemChange = (index: number, value: string) => {
  //   const updatedItems = [...items];
  //   updatedItems[index].description = value;
  //   setItems(updatedItems);
  // };

  return (
    <Scaffold
      child={
        // loading ? (
        //   // <div className="flex items-center justify-center min-h-screen">
        //   //   <div className="relative flex flex-col items-center space-y-4">
        //   //     {/* Spinner */}
        //   //     <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        //   //     {/* Loading Text */}
        //   //     <p className="text-gray-600 text-lg font-semibold animate-pulse">
        //   //       Loading, please wait...
        //   //     </p>
        //   //   </div>
        //   // </div>
        //   <div className="flex items-center space-x-4">
        //     <Skeleton className="h-12 w-12 rounded-full" />
        //     <div className="space-y-2">
        //       <Skeleton className="h-4 w-[250px]" />
        //       <Skeleton className="h-4 w-[200px]" />
        //     </div>
        //   </div>
        // ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
          {branch.map((branch: any, index: any) => (
            <div key={index}>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div>
                  <p>รูปภาพสาขา</p>
                  <Image
                    className="mt-3"
                    src={'/logo.png'}
                    alt="image organization"
                    width={100}
                    height={100}
                  ></Image>
                </div>
                <div className="flex gap-4 ">
                  <CardControl
                    name="active"
                    title="ปิดสาขา"
                    description="ใช้สำหรับการปิดหรือยุติการทำงานของสาขาในระบบหรือเว็บไซต์<br>ซึ่งอาจรวมถึงการปิดการใช้งานบัญชีสาขา"
                    control="ปิดสาขา"
                    checked={data?.active}
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
                  value={branch?.fromType}
                  onChange={handleChange}
                  isDisabled={!openEdit}
                >
                  {FormType.map((item) => (
                    <Radio key={item.value} value={item.value}>
                      {item.label}
                    </Radio>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex gap-4 mt-6">
                <Select
                  className="flex-1  text-headFont"
                  name="status"
                  placeholder="สถานะธุรกิจ"
                  label="สถานะธุรกิจ"
                  labelPlacement={'outside'}
                  selectedKeys={[branch?.status]}
                  onChange={handleChange}
                  isDisabled={!openEdit}
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
                  selectedKeys={[branch?.type]}
                  onChange={handleChange}
                  isDisabled={!openEdit}
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
                  value={branch?.nameTh}
                  onChange={handleChange}
                  isDisabled={!openEdit}
                />
                <Input
                  className="flex-1"
                  label={
                    <span className="text-headFont">
                      ชื่อกิจการ (ภาษาอังกฤษ)
                    </span>
                  }
                  labelPlacement="outside"
                  name="nameEn"
                  placeholder="Enter the business name"
                  value={branch?.nameEn}
                  onChange={handleChange}
                  isDisabled={!openEdit}
                />
              </div>

              <div className="flex gap-4 mt-6">
                <div className="flex flex-col gap-4 w-full">
                  <div>
                    <p className="text-default-5 text-small mb-2 text-black">
                      ลงทะเบียนเลข 13 หลัก
                    </p>
                    <div className="gap-16">
                      <InputOtp
                        name="taxId"
                        length={13}
                        onChange={handleChange}
                        value={branch?.taxId}
                        isDisabled={!openEdit}
                      />
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
                  // value={branch.descriptionsTh}
                  onChange={handleChange}
                  isDisabled={!openEdit}
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
                  // value={branch.descriptionsEn}
                  onChange={handleChange}
                  isDisabled={!openEdit}
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
                    isDisabled={!openEdit}
                    value={
                      branch?.openingDate
                        ? parseDate(branch?.openingDate.split('T')[0])
                        : undefined
                    }
                    onChange={(date: any) => {
                      if (date?.year && date?.month && date?.day) {
                        // Convert the custom date object to a valid Date instance
                        const parsedDate = new Date(
                          date.year,
                          date.month,
                          date.day,
                        ); // month is 0-indexed
                        parsedDate.setHours(12);
                        const isoString = parsedDate.toISOString();

                        // Update formData with the ISO string
                        setFormData((prevData: any) => ({
                          ...prevData,
                          openingDate: isoString,
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
                      checked={branch?.registerVat}
                      onChange={handleChange}
                      isDisabled={!openEdit}
                    />
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
                  name="websiteUrl"
                  placeholder="www.three-chief.com"
                  value={branch?.websiteUrl}
                  onChange={handleChange}
                  isDisabled={!openEdit}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">ชื่อโดเมน</span>}
                  labelPlacement="outside"
                  name="domainName"
                  placeholder="threechief.com"
                  value={branch?.domainName}
                  onChange={handleChange}
                  isDisabled={!openEdit}
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
                  name="contactName"
                  placeholder="ภูวิศ วัฒนะ"
                  // value={formData.contactName}
                  onChange={handleChange}
                  isDisabled={!openEdit}
                />
                <Input
                  className="flex-1"
                  label={
                    <span className="text-headFont">เบอร์โทรศัพท์ติดต่อ</span>
                  }
                  labelPlacement="outside"
                  name="contactPhone"
                  placeholder="+66 888 821 480"
                  value={branch?.contactPhone}
                  onChange={handleChange}
                  isDisabled={!openEdit}
                />
              </div>
              <div className="flex gap-4 mt-6">
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">อีเมลติดต่อ</span>}
                  labelPlacement="outside"
                  name="contactEmail"
                  placeholder="phuwis@threechief.com"
                  value={branch?.contactEmail}
                  onChange={handleChange}
                  isDisabled={!openEdit}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">เว็บไซต์ติดต่อ</span>}
                  labelPlacement="outside"
                  name="contactWebsite"
                  placeholder="www.three-chief.com"
                  // value={branch.contactWebsite}
                  onChange={handleChange}
                  isDisabled={!openEdit}
                />
              </div>
              <div className="flex gap-4 mt-6">
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">Facebook</span>}
                  labelPlacement="outside"
                  name="contactFacebook"
                  placeholder="Phuwis Watthana"
                  // value={branch.contactFacebook}
                  onChange={handleChange}
                  isDisabled={!openEdit}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">Line ID</span>}
                  labelPlacement="outside"
                  name="contactLine"
                  placeholder="0888821480"
                  // value={branch.contactLine}
                  onChange={handleChange}
                  isDisabled={!openEdit}
                />
              </div>
              <div className="flex gap-4 mt-6">
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">WhatsApp</span>}
                  labelPlacement="outside"
                  name="contactWhatsapp"
                  placeholder="0888821480"
                  // value={branch.contactWhatsapp}
                  onChange={handleChange}
                  isDisabled={!openEdit}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">ข้อมูลการติดต่อ</span>}
                  labelPlacement="outside"
                  name="contactinfo"
                  placeholder="10 โมงถึง 6 โมงเย็น"
                  // value={branch.contactWebsite}
                  onChange={handleChange}
                  isDisabled={!openEdit}
                />
              </div>
            </div>
          ))}
        </div>
        // )
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

const FormType = [
  { label: 'นิติบุคคล', value: 'juristic_person' },
  { label: 'บุคคลธรรมดา', value: 'individual' },
];
