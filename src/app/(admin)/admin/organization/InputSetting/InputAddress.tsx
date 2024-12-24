'use client';

import { Input, Textarea } from '@nextui-org/react';
import React from 'react';

export const InputAddress = () => {

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
      <div className="flex gap-4 mt-6">
        <Input
          className="flex-1"
          label={<span className="text-headFont">ชื่อที่อยู่</span>}
          labelPlacement="outside"
          name="AddressName"
          placeholder="ชื่อที่อยู่"
        />
        <Input
          className="flex-1"
          label={<span className="text-headFont">เมือง</span>}
          labelPlacement="outside"
          name="city"
          placeholder="ชื่อเมือง"
        />
      </div>

      <div className="flex gap-4 mt-6">
        <Input
          className="flex-1"
          label={<span className="text-headFont">จังหวัด</span>}
          labelPlacement="outside"
          name="province"
          placeholder="ชื่อจังหวัด"
        />
        <Input
          className="flex-1"
          label={<span className="text-headFont">รหัสไปรษณีย์</span>}
          labelPlacement="outside"
          name="zipcode"
          placeholder="ชื่อรหัสไปรษณีย์"
        />
      </div>

      <div className="flex gap-4 mt-6">
        <Input
          className="flex-1"
          label={<span className="text-headFont">เลขห้อง</span>}
          labelPlacement="outside"
          name="Roomnumber"
          placeholder="เลขห้อง"
        />
        <Input
          className="flex-1"
          label={<span className="text-headFont">ชั้นที่อยู่</span>}
          labelPlacement="outside"
          name="floor"
          placeholder="ชั้นที่อยู่"
        />
        <Input
          className="flex-1"
          label={<span className="text-headFont">หมู่บ้าน</span>}
          labelPlacement="outside"
          name="village"
          placeholder="หมู่บ้าน"
        />
        <Input
          className="flex-1"
          label={<span className="text-headFont">เลขหมู่บ้าน</span>}
          labelPlacement="outside"
          name="Villagenumber"
          placeholder="เลขหมู่บ้าน"
        />
      </div>

      <div className="flex gap-4 mt-6">
        <Input
          className="flex-1"
          label={<span className="text-headFont">บ้านเลขที่</span>}
          labelPlacement="outside"
          name="housenumber"
          placeholder="บ้านเลขที่"
        />
        <Input
          className="flex-1"
          label={<span className="text-headFont">ตรอก</span>}
          labelPlacement="outside"
          name="alley"
          placeholder="ตรอก"
        />
        <Input
          className="flex-1"
          label={<span className="text-headFont">ถนน</span>}
          labelPlacement="outside"
          name="road"
          placeholder="ถนน"
        />
        <Input
          className="flex-1"
          label={<span className="text-headFont">อาคาร</span>}
          labelPlacement="outside"
          name="building"
          placeholder="อาคาร"
        />
      </div>

      <div className="flex gap-4 mt-6">
        <Input
          className="flex-1"
          label={<span className="text-headFont">ประเทศ</span>}
          labelPlacement="outside"
          name="country"
          placeholder="ประเทศ"
        />
        <Input
          className="flex-1"
          label={<span className="text-headFont">เขต/อำเภอ</span>}
          labelPlacement="outside"
          name="district"
          placeholder="เขต/อำเภอ"
        />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        <div className="flex gap-4 mt-6">
          <Input
            className="flex-1"
            label={<span className="text-headFont">แขวง/ตำบล</span>}
            labelPlacement="outside"
            name="subdistrict"
            placeholder="แขวง/ตำบล"
          />
        </div>
        <div className="flex gap-4 mt-6">
          <Textarea
            classNames={{
              base: '',
              input: 'resize-y min-h-[50px]',
            }}
            name="note"
            label="หมายเหตุ"
            labelPlacement="outside"
            placeholder="หมายเหตุ"
            variant="bordered"
          />
        </div>
      </div>
    </div>
  );
}
