'use client';

import { Input, Textarea } from '@nextui-org/react';
import React from 'react';
import Scaffold from '@/components/common/scaffold';
<<<<<<< HEAD
// import { update } from 'lodash';
=======
import { update } from 'lodash';
import { address } from 'framer-motion/client';
>>>>>>> 5dd16d6198a20eef23d9566ed75d7c39f72256b4

// interface InputAddressProps {
//   data: any;
// }

export const InputAddress = ({
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
      setFormData(data.organization.addresses);
      const filtered = data.organization.addresses.filter(
        (address: any) => address.branchId !== undefined,
      );
      setAddress(filtered);
    }
  }, [data]);

  console.log('formData', formData);
  console.log('address', address);

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
                  value={formData.city}
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
                  value={formData.province}
                  onChange={handleChange}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">รหัสไปรษณีย์</span>}
                  labelPlacement="outside"
                  name="postalCode"
                  placeholder="ชื่อรหัสไปรษณีย์"
                  value={formData.postalCode}
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
                  value={formData.roomNonvm}
                  onChange={handleChange}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">ชั้นที่อยู่</span>}
                  labelPlacement="outside"
                  name="floorNo"
                  placeholder="ชั้นที่อยู่"
                  onChange={handleChange}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">หมู่บ้าน</span>}
                  labelPlacement="outside"
                  name="village"
                  placeholder="หมู่บ้าน"
                  onChange={handleChange}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">เลขหมู่บ้าน</span>}
                  labelPlacement="outside"
                  name="villageNo"
                  placeholder="เลขหมู่บ้าน"
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
                  onChange={handleChange}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">ตรอก</span>}
                  labelPlacement="outside"
                  name="alley"
                  placeholder="ตรอก"
                  onChange={handleChange}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">ถนน</span>}
                  labelPlacement="outside"
                  name="road"
                  placeholder="ถนน"
                  onChange={handleChange}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">อาคาร</span>}
                  labelPlacement="outside"
                  name="building"
                  placeholder="อาคาร"
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
                  onChange={handleChange}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">เขต/อำเภอ</span>}
                  labelPlacement="outside"
                  name="district"
                  placeholder="เขต/อำเภอ"
                  // value={formData.subDistrict}
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
                    // value={formData.note}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <hr className="mt-10 border-t-4 border-gray-500" />
              </div>
            </div>
          ))}
        </div>
      }
    />
  );
};
