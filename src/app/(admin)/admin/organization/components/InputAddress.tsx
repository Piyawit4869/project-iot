'use client';

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Textarea,
} from '@nextui-org/react';
import React from 'react';
import Scaffold from '@/components/common/scaffold';
import Icon from '@ant-design/icons';

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
          {/* <Dropdown>
            <DropdownTrigger>
              <Icon.MoreOutlined className="text-xl ml-2" />
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem
                key="edit"
                description="กดแก้ไขเพื่อแก้ไขข้อมูล"
                startContent={<EditDocumentIcon className={iconClasses} />}
              >
                แก้ไข
              </DropdownItem>
            </DropdownMenu>
          </Dropdown> */}
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

export const EditDocumentIcon = (props: any) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M15.48 3H7.52C4.07 3 2 5.06 2 8.52v7.95C2 19.94 4.07 22 7.52 22h7.95c3.46 0 5.52-2.06 5.52-5.52V8.52C21 5.06 18.93 3 15.48 3Z"
        fill="currentColor"
        opacity={0.4}
      />
      <path
        d="M21.02 2.98c-1.79-1.8-3.54-1.84-5.38 0L14.51 4.1c-.1.1-.13.24-.09.37.7 2.45 2.66 4.41 5.11 5.11.03.01.08.01.11.01.1 0 .2-.04.27-.11l1.11-1.12c.91-.91 1.36-1.78 1.36-2.67 0-.9-.45-1.79-1.36-2.71ZM17.86 10.42c-.27-.13-.53-.26-.77-.41-.2-.12-.4-.25-.59-.39-.16-.1-.34-.25-.52-.4-.02-.01-.08-.06-.16-.14-.31-.25-.64-.59-.95-.96-.02-.02-.08-.08-.13-.17-.1-.11-.25-.3-.38-.51-.11-.14-.24-.34-.36-.55-.15-.25-.28-.5-.4-.76-.13-.28-.23-.54-.32-.79L7.9 10.72c-.35.35-.69 1.01-.76 1.5l-.43 2.98c-.09.63.08 1.22.47 1.61.33.33.78.5 1.28.5.11 0 .22-.01.33-.02l2.97-.42c.49-.07 1.15-.4 1.5-.76l5.38-5.38c-.25-.08-.5-.19-.78-.31Z"
        fill="currentColor"
      />
    </svg>
  );
};
