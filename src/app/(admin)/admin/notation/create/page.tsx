'use client';

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

export default function NotationCreatePage() {
  const [items, setItems] = React.useState([{ description: '', amount: '' }]);
  const [zoomLevel, setZoomLevel] = React.useState(100); // Default zoom level (100%)

  const handleZoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom + 10, 200)); // Max zoom 200%
  };

  const handleZoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom - 10, 50)); // Min zoom 50%
  };

  const handleAddItem = () => {
    setItems([...items, { description: '', amount: '' }]);
  };

  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="สร้างเอกสาร"
            backpath={'/admin/notation'}
            buttons={[
              <Button
                className="bg-accent3 text-white"
                type="submit"
                form="notation"
                key={'draft button'}
              >
                แบบร่าง
              </Button>,
              <Button
                className="bg-accent1 text-white"
                type="submit"
                form="notation"
                key={'create button'}
              >
                สร้าง
              </Button>,
            ]}
          />
          <div className="bg-gray-100  flex justify-center items-center pt-6">
            {/* A4 Paper Styled Container */}
            <div className="bg-white w-full border-gray-300 rounded overflow-hidden flex flex-row">
              {/* Input Form Section */}
              <div className="w-1/2 p-6 border-r border-gray-200 overflow-y-auto">
                <Form
                  id="notation"
                  onSubmit={onSubmit}
                  method="post"
                  className="grid grid-cols-1 gap-4"
                >
                  <h1 className="text-2xl font-bold text-headFont">
                    ข้อมูลเอกสาร
                  </h1>
                  {/* Notation Section */}
                  <div className="flex gap-4">
                    <div className="flex-1 flex items-center gap-4">
                      <span className="text-headFont">แสดงผล</span>
                      <Switch defaultSelected name="active" />
                    </div>
                    <Input
                      className="flex-1"
                      label="หมายเลขอ้างอิง"
                      labelPlacement="outside"
                      name="refNo"
                      placeholder="กรอกหมายเลขอ้างอิง"
                    />
                  </div>
                  <div className="flex gap-4">
                    <DatePicker
                      className="flex-1"
                      name="startDate"
                      label="วันที่สร้าง"
                    />
                    <Select
                      className="flex-1"
                      name="type"
                      label="เลือกประเภทเอกสาร"
                    >
                      {types.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <Textarea
                    label="หมายเหตุ"
                    labelPlacement="outside"
                    name="note"
                    placeholder=""
                  />
                  <div className="flex gap-4 mt-6">
                    <h1 className="text-2xl font-bold text-headFont flex-1">
                      ลูกค้า
                    </h1>
                    <h1 className="text-2xl font-bold text-headFont flex-1">
                      ที่อยู่
                    </h1>
                  </div>
                  <div className="flex gap-4">
                    <Select name="customer" label="เลือกลูกค้า">
                      {customer.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select name="address" label="เลือกที่อยู่บริษัท">
                      {address.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <h1 className="text-2xl font-bold text-headFont mt-6">
                    รายการ
                  </h1>
                  {items.map((_, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Select
                        name={`item_${index}`}
                        label="เลือกรายการ"
                        size="sm"
                        className="flex-1"
                      >
                        {selectItem.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <Input
                        type="number"
                        placeholder="จำนวน"
                        className="flex-1"
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
                    type="button"
                    className="px-4 py-2 bg-accent3 text-white"
                    onClick={handleAddItem}
                  >
                    <Icon.PlusSquareOutlined className="text-xl" />
                    เพิ่มรายการ
                  </Button>
                </Form>
              </div>

              {/* PDF Preview Section */}
              <div className="w-1/2 p-6 bg-gray-100 flex justify-center">
                <div>
                  <div className="w-[170mm] w-full flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-headFont">
                      ข้อมูลเอกสาร
                    </h1>
                    {/* Dynamic Status Tag */}
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 border border-gray`}
                    >
                      แบบร่าง
                    </div>
                  </div>

                  <div className="bg-white w-[170mm] h-[240mm] shadow-lg border border-gray-300 rounded overflow-hidden">
                    <div className="p-6 border-b">
                      <h1 className="text-center text-2xl font-bold text-primary">
                        Document Title
                      </h1>
                      <p className="text-center text-sm text-gray-500">
                        Subtitle or additional details
                      </p>
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-gray-600">
                        Preview content will appear here.
                      </p>
                    </div>
                    <div className="p-6 border-t">
                      <p className="text-center text-sm text-gray-500">
                        Footer text or signature placeholder
                      </p>
                    </div>
                  </div>
                  <div className="w-[170mm] w-full flex justify-center items-center mt-4">
                    <div className="flex items-center gap-2">
                      {/* Zoom Out Button */}
                      <Button
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow transition"
                        aria-label="Zoom Out"
                        onClick={handleZoomOut}
                      >
                        <Icon.MinusOutlined className="text-lg text-gray-700" />
                      </Button>

                      {/* Zoom Level Display */}
                      <span className="text-sm font-medium text-gray-700">
                        {zoomLevel}%
                      </span>

                      {/* Zoom In Button */}
                      <Button
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 shadow transition"
                        aria-label="Zoom In"
                        onClick={handleZoomIn}
                      >
                        <Icon.PlusOutlined className="text-lg text-gray-700" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}

const types = [
  { label: 'Invoice', value: 'invoice' },
  { label: 'Quotation', value: 'quotation' },
  { label: 'DeliveryOrder', value: 'delivery_order' },
  { label: 'PurchaseOrder', value: 'purchase_order' },
  { label: 'Receipt', value: 'receipt' },
];

const address = [
  { label: 'ที่อยู่หลัก', value: '1' },
  { label: 'โกดัง', value: '2' },
];

const customer = [
  { label: 'ลูกค้าคนที่ 1', value: '1' },
  { label: 'ลูกค้าคนที่ 2', value: '2' },
];

const selectItem = [
  { label: 'รายการที่ 1', value: '1' },
  { label: 'รายการที่ 2', value: '2' },
];
