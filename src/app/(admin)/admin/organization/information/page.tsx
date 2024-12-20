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
    InputOtp
} from '@nextui-org/react';
import React, {useState} from 'react';

export default function InformationPage() {

  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    const onlyNums = e.target.value.replace(/[^0-9]/g, "");
    setValue(onlyNums);
  };

  // const handleItemChange = (index: number, value: string) => {
  //   const updatedItems = [...items];
  //   updatedItems[index].description = value;
  //   setItems(updatedItems);
  // };

  return (
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
            title="ปิดองค์กร"
            description="ใช้สำหรับการปิดหรือยุติการทำงานขององค์กรในระบบหรือเว็บไซต์<br>ซึ่งอาจรวมถึงการปิดการใช้งานบัญชีองค์กร"
            control="ปิดองค์กร"
          />
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <RadioGroup
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
          name="business-model"
          placeholder="รูปแบบธุรกิจ"
          label="รูปแบบธุรกิจ"
          labelPlacement={'outside'}
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
          label={<span className="text-headFont">ชื่อกิจการ (ภาษาไทย)</span>}
          labelPlacement="outside"
          name="business-name"
          placeholder="กรอกชื่อกิจการ"
        />
        <Input
          className="flex-1"
          label={<span className="text-headFont">ชื่อกิจการ (ภาษาอังกฤษ)</span>}
          labelPlacement="outside"
          name="business-nameEng"
          placeholder="Enter the business name"
        />
      </div>

      <div className="flex gap-4 mt-6">
        <div className="flex flex-col gap-4 w-full">
          <div>
            <p className="text-default-5 text-small mb-2 text-black">
              ลงทะเบียนเลข 13 หลัก
            </p>
            <div className="gap-16">
              <InputOtp name="register-number" length={13} />
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
          name="business-description"
          variant="bordered"
        />
        <Textarea
          classNames={{
            base: '',
            input: 'resize-y min-h-[50px]',
          }}
          label="คำอธิบายธุรกิจ (ภาษาอังกฤษ)"
          labelPlacement="outside"
          placeholder="Enter your Business Description"
          name="business-descriptionEng"
          variant="bordered"
        />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="flex gap-4 mt-6">
          <DatePicker
            className=" flex-1 text-headFont"
            name="date"
            label="วันที่จดทะเบียน"
            labelPlacement={'outside'}
          />
        </div>
        <div className="flex gap-4 mt-6">
          <div>
            <p>จดทะเบียนภาษีมูลค่าเพิ่ม</p>
            <Switch
              name="vat"
              className="mt-2"
              defaultSelected
              aria-label="Automatic updates"
              color="secondary"
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4 mt-6">
        <Input
          className="flex-1"
          label={<span className="text-headFont">เว็ปไซต์สำนักงาน</span>}
          labelPlacement="outside"
          name="officeWebsite"
          placeholder="www.three-chief.com"
        />
        <Input
          className="flex-1"
          label={<span className="text-headFont">ชื่อโดเมน</span>}
          labelPlacement="outside"
          name="domainName"
          placeholder="threechief.com"
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
          name="name-contact"
          placeholder="ภูวิศ วัฒนะ"
        />
        <Input
          className="flex-1"
          label={<span className="text-headFont">เบอร์โทรศัพท์ติดต่อ</span>}
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
          label={<span className="text-headFont">อีเมลติดต่อ</span>}
          labelPlacement="outside"
          name="emailcontact"
          placeholder="phuwis@threechief.com"
        />
        <Input
          className="flex-1"
          label={<span className="text-headFont">เว็บไซต์ติดต่อ</span>}
          labelPlacement="outside"
          name="websitecontact"
          placeholder="www.three-chief.com"
        />
      </div>
      <div className="flex gap-4 mt-6">
        <Input
          className="flex-1"
          label={<span className="text-headFont">Facebook</span>}
          labelPlacement="outside"
          name="facebook"
          placeholder="Phuwis Watthana"
        />
        <Input
          className="flex-1"
          label={<span className="text-headFont">Line ID</span>}
          labelPlacement="outside"
          name="lineid"
          placeholder="0888821480"
        />
      </div>
      <div className="flex gap-4 mt-6">
        <Input
          className="flex-1"
          label={<span className="text-headFont">WhatsApp</span>}
          labelPlacement="outside"
          name="Whatsapp"
          placeholder="0888821480"
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
