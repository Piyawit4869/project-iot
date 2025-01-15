'use client';

import { Input, Textarea } from '@nextui-org/react';
import React from 'react';
import Scaffold from '@/components/common/scaffold';
<<<<<<< HEAD:src/app/(admin)/admin/organization/components/InputAddress.tsx
=======
<<<<<<< HEAD
// import { update } from 'lodash';
=======
import { update } from 'lodash';
import { address } from 'framer-motion/client';
>>>>>>> 5dd16d6198a20eef23d9566ed75d7c39f72256b4
>>>>>>> 608563772733e04f9a7062147aebebad71e517cb:src/app/(admin)/admin/organization/InputSetting/InputAddress.tsx

// interface InputAddressProps {
//   data: any;
// }

export const InputAddressProps = ({
  data,
  onChange,
}: {
  data: any;
  onChange: (updatedData: any) => void;
}) => {
  const [formData, setFormData] = React.useState<any>(data);
  const [address, setAddress] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (data) {
      const filtered = data.organization.addresses.filter(
        (address: any) => address.branchId === null,
      );
      setAddress(filtered);
    }
  }, [data]);

  const handleChange = (e: any) => {
    const { name, checked, type, value } = e.target;
    const updatedData =
      type === 'checkbox'
        ? checked
        : name === 'birthDate' && value instanceof Date
        ? value.toISOString()
        : value;

    setFormData((prevData: any) => ({
      ...prevData,
      [name]: updatedData,
    }));

    onChange({ ...formData, [name]: updatedData });
  };

  return (
    <Scaffold
      child={
        <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
          {address.map((address: any, index: any) => (
            <div key={index}>
              <div className="flex gap-4 mt-6">
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">ชื่อที่อยู่</span>}
                  labelPlacement="outside"
                  name="name"
                  placeholder="ชื่อที่อยู่"
                  value={address.name}
                  onChange={handleChange}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">เมือง</span>}
                  labelPlacement="outside"
                  name="city"
                  placeholder="ชื่อเมือง"
                  value={address.city}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-4 mt-6">
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">จังหวัด</span>}
                  labelPlacement="outside"
                  name="province"
                  placeholder="ชื่อจังหวัด"
                  value={address.province}
                  onChange={handleChange}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">รหัสไปรษณีย์</span>}
                  labelPlacement="outside"
                  name="postalCode"
                  placeholder="ชื่อรหัสไปรษณีย์"
                  value={address.postalCode}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-4 mt-6">
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">เลขห้อง</span>}
                  labelPlacement="outside"
                  name="roomNo"
                  placeholder="เลขห้อง"
                  value={address.roomNonvm}
                  onChange={handleChange}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">ชั้นที่อยู่</span>}
                  labelPlacement="outside"
                  name="floorNo"
                  placeholder="ชั้นที่อยู่"
                  // value={address.floorNo}
                  onChange={handleChange}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">หมู่บ้าน</span>}
                  labelPlacement="outside"
                  name="village"
                  placeholder="หมู่บ้าน"
                  value={address.village}
                  onChange={handleChange}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">เลขหมู่บ้าน</span>}
                  labelPlacement="outside"
                  name="villageNo"
                  placeholder="เลขหมู่บ้าน"
                  // value={address.villageNo}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-4 mt-6">
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">บ้านเลขที่</span>}
                  labelPlacement="outside"
                  name="houseNo"
                  placeholder="บ้านเลขที่"
                  value={address.houseNo}
                  onChange={handleChange}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">ตรอก</span>}
                  labelPlacement="outside"
                  name="alley"
                  placeholder="ตรอก"
                  // value={address.alley}
                  onChange={handleChange}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">ถนน</span>}
                  labelPlacement="outside"
                  name="road"
                  placeholder="ถนน"
                  // value={address.road}
                  onChange={handleChange}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">อาคาร</span>}
                  labelPlacement="outside"
                  name="building"
                  placeholder="อาคาร"
                  // value={address.building}
                  onChange={handleChange}
                />
              </div>
              <div className="flex gap-4 mt-6">
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">ประเทศ</span>}
                  labelPlacement="outside"
                  name="country"
                  placeholder="ประเทศ"
                  // value={address.country}
                  value={address.nation}
                  onChange={handleChange}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">เขต/อำเภอ</span>}
                  labelPlacement="outside"
                  name="district"
                  placeholder="เขต/อำเภอ"
                  // value={address.district}
                  onChange={handleChange}
                />
              </div>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="flex gap-4 mt-6">
                  <Input
                    className="flex-1"
                    label={<span className="text-headFont">แขวง/ตำบล</span>}
                    labelPlacement="outside"
                    name="subDistrict"
                    placeholder="แขวง/ตำบล"
                    value={address.subDistrict}
                    onChange={handleChange}
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
                    // value={address.note}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
};
