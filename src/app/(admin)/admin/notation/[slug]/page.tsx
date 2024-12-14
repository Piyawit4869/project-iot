'use client';

import CardComponent from '@/components/common/card';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import * as Icon from '@ant-design/icons';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  SelectItem,
  Switch,
  Textarea,
} from '@nextui-org/react';
import React from 'react';

export default function NotationSinglePage() {
  const [items, setItems] = React.useState([{ description: '', amount: '' }]);

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

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="แก้ไขเอกสาร"
            backpath={'/admin/notation'}
            buttons={[
              <Button className="bg-accent1 text-white" key={'approve button'}>
                อนุมัติ
              </Button>,
              <Button className="bg-accent2 text-white" key={'reject button'}>
                ปฎิเสษ
              </Button>,
              <Button className="bg-accent3 text-white" key={'edit button'}>
                แก้ไข
              </Button>,
            ]}
          />
          <div className="flex gap-4 mt-6">
            <CardComponent
              className={'flex-1 z-0'}
              customCard
              custom={
                <Form
                  className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-1 gap-4 items-center"
                  id="notation"
                  onSubmit={onSubmit}
                  method="post"
                >
                  <h1 className="text-2xl font-bold text-headFont">
                    ข้อมูลเอกสาร
                  </h1>
                  {/* Notation section */}
                  <div className="flex gap-4">
                    <div className="flex-1 flex items-center gap-4 ">
                      <span className="text-headFont"> แสดงผล</span>
                      <Switch
                        defaultSelected
                        aria-label="Automatic updates"
                        name="active"
                      />
                    </div>
                    <Input
                      className="flex-1 text-headFont"
                      label={
                        <span className="text-headFont">หมายเลขอ้างอิง</span>
                      }
                      labelPlacement="outside"
                      name="refNo"
                      placeholder="กรอกหมายเลขอ้างอิง"
                    />
                  </div>
                  <div className="flex gap-4">
                    <DatePicker
                      className="flex-1  text-headFont"
                      name="startDate"
                      label="วันที่สร้าง"
                    />
                    <Select
                      className="flex-1  text-headFont"
                      name="type"
                      label="เลือกประเภทเอกสาร"
                    >
                      {types.map((item: any) => (
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
                  <div className="flex gap-4">
                    <div className="flex-1 flex items-center gap-4 ">
                      <span className="text-headFont">ลูกค้าในระบบ</span>
                      <Switch
                        defaultSelected
                        aria-label="Automatic updates"
                        name="isCustom"
                      />
                    </div>
                    <Input
                      className="flex-1 text-headFont"
                      label={<span className="text-headFont">ส่วนลด</span>}
                      labelPlacement="outside"
                      name="discount"
                      placeholder="กรอกส่วนลด"
                      type="number"
                    />
                  </div>
                  <div className="flex gap-4">
                    <Input
                      className="flex-1 text-headFont"
                      label={<span className="text-headFont">Vat</span>}
                      labelPlacement="outside"
                      name="vat"
                      placeholder="กรอกจำนวน Vat เป็นเปอร์เซ็น"
                      type="number"
                    />
                    <Input
                      className="flex-1 text-headFont"
                      label={
                        <span className="text-headFont">หัก ณ ที่จ่าย</span>
                      }
                      labelPlacement="outside"
                      name="wht"
                      placeholder="กรอกจำนวนของ หัก ณ ที่จ่าย เป็นเปอร์เซ็น"
                      type="number"
                    />
                  </div>
                  <Textarea
                    className="text-headFont"
                    label={<span className="text-headFont">หมายเหตุ</span>}
                    labelPlacement="outside"
                    name="note"
                    placeholder=""
                  />
                  {/* Address section and Customer section */}
                  <div className="flex gap-4 mt-6">
                    <h1 className="flex-1 text-2xl font-bold text-headFont">
                      ลูกค้า
                    </h1>
                    <h1 className="flex-1 text-2xl font-bold text-headFont">
                      ที่อยู่
                    </h1>
                  </div>
                  <div className="flex gap-4">
                    <Select
                      className="flex-1  text-headFont"
                      name="customer"
                      label="เลือกลูกค้า"
                    >
                      {customer.map((item: any) => (
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
                      name="address"
                      label="เลือกที่อยู่บริษัท"
                    >
                      {address.map((item: any) => (
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
                  {/* Items Section */}
                  <h1 className="text-2xl font-bold text-headFont mt-6">
                    รายการ
                  </h1>
                  {items.map((_: any, index: any) => (
                    <div key={index} className="flex items-center gap-2">
                      <Select
                        className="flex-1  text-headFont"
                        name="customer"
                        label="เลือกรายการ"
                        size="sm"
                      >
                        {selectItem.map((item: any) => (
                          <SelectItem
                            className="flex-1 text-headFont"
                            key={item.label}
                            value={item.value}
                          >
                            {item.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <Input
                        size="lg"
                        type="number"
                        className=" flex-1 text-headFont"
                        placeholder={`จำนวน`}
                      />
                      <a
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleRemoveItem(index)}
                      >
                        ลบรายการ
                      </a>
                    </div>
                  ))}

                  <Button
                    size="lg"
                    type="button"
                    className="px-4 py-2 bg-accent3 text-white"
                    onClick={handleAddItem}
                  >
                    <Icon.PlusSquareOutlined className="text-xl" />
                    เพิ่มรายการ
                  </Button>
                </Form>
              }
            />

            {/* PDF Preview */}

            {/* A4 Paper Styled Container */}
            <div className="bg-white w-[210mm] h-[297mm] shadow-lg overflow-hidden p-8">
              <div className="text-center text-xl font-bold mb-4 text-primary">
                Document Title
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Maecenas volutpat, velit eu tincidunt interdum, mauris libero
                consectetur ex, sed bibendum nulla lorem id eros. Duis
                efficitur, enim sit amet tristique tincidunt, arcu est vehicula
                metus, nec vehicula nisi lectus sit amet ex.
              </div>
              <div className="mt-4 text-sm text-primary">
                Sed egestas, quam at fringilla vulputate, ligula velit luctus
                elit, eget tempus tortor turpis ac dolor. Phasellus vel
                scelerisque arcu. Integer eget nisi arcu. Nullam vehicula auctor
                ex, ac interdum odio volutpat eget.
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

const types = [
  {
    label: 'Invoice',
    value: 'invoice',
  },
  {
    label: 'Quotation',
    value: 'quotation',
  },
  {
    label: 'DeliveryOrder',
    value: 'delivery_order',
  },
  {
    label: 'PurchaseOrder',
    value: 'purchase_order',
  },

  {
    label: 'Receipt',
    value: 'receipt',
  },
];

const address = [
  {
    label: 'ที่อยู่หลัก',
    value: '1',
  },
  {
    label: 'โกดัง',
    value: '2',
  },
];

const customer = [
  { label: 'ลูกค้าคนที่ 1', value: '1' },
  { label: 'ลูกค้าคนที่ 2', value: '2' },
  { label: 'ลูกค้าคนที่ 3', value: '3' },
  { label: 'ลูกค้าคนที่ 4', value: '4' },
];

const selectItem = [
  { label: 'รายการที่ 1', value: '1' },
  { label: 'รายการที่ 2', value: '2' },
  { label: 'รายการที่ 3', value: '3' },
  { label: 'รายการที่ 4', value: '4' },
];
