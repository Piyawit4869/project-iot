'use client';

import { Button, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import Scaffold from '@/components/common/scaffold';
import { TablePagination } from '@/components/common/tablePagination';
// import Icon from '@ant-design/icons';

interface InpuAddressProps {
  data: any;
  // onChange: (updatedData: any) => void;
  onChange: any;
  openEdit: boolean;
}

export default function Inputorganization({
  data,
  onChange,
  openEdit,
}: InpuAddressProps) {
  const [formData, setFormData] = React.useState<any>(data);
  const [address, setAddress] = React.useState<any[]>([]);
  const [tableAddress, setTableAddress] = React.useState<any[]>([]);
  const [, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [meta,] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });

  React.useEffect(() => {
    if (data) {
      const filtered = data.organization.addresses.filter(
        (address: any) => address.isMain === true,
      );
      setAddress(filtered);
      setTableAddress(data.organization.addresses);
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
              <div className="flex gap-4">
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">ชื่อที่อยู่</span>}
                  labelPlacement="outside"
                  name="name"
                  placeholder="ชื่อที่อยู่"
                  value={address.name}
                  onChange={handleChange}
                  isDisabled={!openEdit}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">เมือง</span>}
                  labelPlacement="outside"
                  name="city"
                  placeholder="ชื่อเมือง"
                  value={address.city}
                  onChange={handleChange}
                  isDisabled={!openEdit}
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
                  isDisabled={!openEdit}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">รหัสไปรษณีย์</span>}
                  labelPlacement="outside"
                  name="postalCode"
                  placeholder="ชื่อรหัสไปรษณีย์"
                  value={address.postalCode}
                  onChange={handleChange}
                  isDisabled={!openEdit}
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
                  isDisabled={!openEdit}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">ชั้นที่อยู่</span>}
                  labelPlacement="outside"
                  name="floorNo"
                  placeholder="ชั้นที่อยู่"
                  // value={address.floorNo}
                  onChange={handleChange}
                  isDisabled={!openEdit}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">หมู่บ้าน</span>}
                  labelPlacement="outside"
                  name="village"
                  placeholder="หมู่บ้าน"
                  value={address.village}
                  onChange={handleChange}
                  isDisabled={!openEdit}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">เลขหมู่บ้าน</span>}
                  labelPlacement="outside"
                  name="villageNo"
                  placeholder="เลขหมู่บ้าน"
                  // value={address.villageNo}
                  onChange={handleChange}
                  isDisabled={!openEdit}
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
                  isDisabled={!openEdit}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">ตรอก</span>}
                  labelPlacement="outside"
                  name="alley"
                  placeholder="ตรอก"
                  // value={address.alley}
                  onChange={handleChange}
                  isDisabled={!openEdit}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">ถนน</span>}
                  labelPlacement="outside"
                  name="road"
                  placeholder="ถนน"
                  // value={address.road}
                  onChange={handleChange}
                  isDisabled={!openEdit}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">อาคาร</span>}
                  labelPlacement="outside"
                  name="building"
                  placeholder="อาคาร"
                  // value={address.building}
                  onChange={handleChange}
                  isDisabled={!openEdit}
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
                  isDisabled={!openEdit}
                />
                <Input
                  className="flex-1"
                  label={<span className="text-headFont">เขต/อำเภอ</span>}
                  labelPlacement="outside"
                  name="district"
                  placeholder="เขต/อำเภอ"
                  // value={address.district}
                  onChange={handleChange}
                  isDisabled={!openEdit}
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
                    isDisabled={!openEdit}
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
                    isDisabled={!openEdit}
                  />
                </div>
              </div>
            </div>
          ))}
          <h1 className="text-2xl font-bold text-headFont mt-12">
            ข้อมูลช่องทางการติดต่อ
          </h1>
          <TablePagination
            initialRows={tableAddress}
            initialMeta={meta}
            rowsPerPage={rowsPerPage}
            columns={columns}
            onPageChange={(newPage) => setPage(newPage)}
            onRowsPerPageChange={(newRowsPerPage) =>
              setRowsPerPage(newRowsPerPage)
            }
          />
        </div>
      }
    />
  );
}

const columns: any = [
  { title: 'ชื่อที่อยู่', dataIndex: 'name' },
  { title: 'บ้านเลขที่', dataIndex: 'houseNo' },
  { title: 'จังหวัด', dataIndex: 'province' },
  { title: 'อำเภอ/เขต', dataIndex: 'subDistrict' },
  {
    title: 'เปลี่ยนที่อยู่หลัก',
    dataIndex: 'isMain',
    render: () => (
      <Button className="bg-headFont text-white" size="sm">
        ตั้งเป็นที่อยู่หลัก
      </Button>
    ),
  },
  {
    title: 'ลบ',
    dataIndex: 'delete',
    // render: () => <Icon.DeleteOutlined className="ml-0.5 text-red-500" />,
    render: () => (
      <Button className="bg-accent2 text-white" size="sm">
        ลบที่อยู่
      </Button>
    ),
  },
];
