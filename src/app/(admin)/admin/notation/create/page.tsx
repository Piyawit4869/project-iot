'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import * as Icon from '@ant-design/icons';
import { createNotation } from '@/pages/api/notations/create';
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
import { useRouter } from 'next/navigation';

export default function NotationCreatePage() {
  const [items, setItems] = React.useState([{ description: '', amount: '' }]);
  const [zoomLevel, setZoomLevel] = React.useState(100); // Default zoom level (100%)
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;
  const [createStatus, setCreateStatus] = React.useState('');
  const router = useRouter();

  const handleChange = (e: any) => {
    const { name, checked, type, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'startDate' && value instanceof Date
          ? value.toISOString()
          : value,
    }));
  };

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = ['refNo', 'startDate', 'type'];
    const newErrors: any = {};

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = `Field ${field} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const handleCreateStatus = (status: string) => {
      switch (status) {
        case 'draft':
          return { docStatus: 'draft', status: 'draft' };
        case 'pending':
          return { docStatus: 'pending', status: '' };
        default:
          return {};
      }
    };

    const statusData = handleCreateStatus(createStatus);

    try {
      const payload = {
        ...formData,
        ...statusData,
      };

      if (!payload.active) {
        payload.active = false;
      } else {
        payload.active = true;
      }

      const { data } = await createNotation({}, payload);

      router.push(`/admin/notation/${data.id}`);
    } catch (err: any) {
      console.error('Send FormData error:', err);
      setErrors({ general: err.message || 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="สร้างเอกสาร"
            backpath={'/admin/notation'}
            buttons={[
              <a href={'/admin/notation'} key={'draft button'}>
                <Button
                  className="bg-accent3 text-white"
                  type="submit"
                  form="notation"
                  onClick={() => {
                    setCreateStatus('draft');
                  }}
                >
                  แบบร่าง
                </Button>
              </a>,
              <a key={'create button'}>
                <Button
                  className="bg-accent1 text-white"
                  type="submit"
                  form="notation"
                  onClick={() => {
                    setCreateStatus('pending');
                  }}
                >
                  สร้าง
                </Button>
              </a>,
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
                  validationErrors={errors}
                >
                  <h1 className="text-2xl font-bold text-headFont">
                    ข้อมูลเอกสาร
                  </h1>
                  {/* Notation Section */}
                  <div className="flex gap-4">
                    <div className="flex-1 flex items-center gap-4">
                      <span className="text-headFont">แสดงผล</span>
                      <Switch
                        name="active"
                        color="secondary"
                        onChange={handleChange}
                        required
                        defaultChecked
                      />
                    </div>
                    <Input
                      className="flex-1"
                      size="lg"
                      label="หมายเลขอ้างอิง"
                      labelPlacement="outside"
                      name="refNo"
                      placeholder="กรอกหมายเลขอ้างอิง"
                      onChange={handleChange}
                      isRequired
                      errorMessage={'กรุณากรอกหมายเลขอ้างอิง'}
                    />
                  </div>
                  <div className="flex gap-4">
                    <DatePicker
                      size="sm"
                      className="flex-1"
                      name="startDate"
                      label="วันที่สร้าง"
                      disableAnimation
                      isRequired
                      errorMessage={'กรุณาเลือกวันที่สร้าง'}
                      onChange={(date: any) => {
                        if (date?.year && date?.month && date?.day) {
                          // Convert the custom date object to a valid Date instance
                          const parsedDate = new Date(
                            date.year,
                            date.month - 1,
                            date.day,
                          ); // month is 0-indexed
                          const isoString = parsedDate.toISOString();

                          // Update formData with the ISO string
                          setFormData((prevData: any) => ({
                            ...prevData,
                            startDate: isoString,
                          }));
                        } else {
                          console.error('Invalid date object:', date);
                        }
                      }}
                    />
                    <Select
                      size="sm"
                      className="flex-1"
                      name="type"
                      label="เลือกประเภทเอกสาร"
                      onChange={handleChange}
                      isRequired
                      errorMessage={'กรุณาเลือกประเภทเอกสาร'}
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
                    onChange={handleChange}
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
                    <Select
                      name="customer"
                      size="sm"
                      label="เลือกลูกค้า"
                      onChange={handleChange}
                    >
                      {customer.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      name="address"
                      size="sm"
                      label="เลือกที่อยู่บริษัท"
                      onChange={handleChange}
                    >
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
                    <div key={index} className="flex items-center gap-4">
                      <Select
                        size="sm"
                        name={`item_${index}`}
                        label="เลือกรายการ"
                        className="flex-1"
                        onChange={handleChange}
                      >
                        {selectItem.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <div className="flex-1 flex gap-2 items-center ">
                        <Input
                          size="lg"
                          type="number"
                          placeholder="จำนวน"
                          onChange={handleChange}
                        />
                        <a
                          className="text-red-500 cursor-pointer"
                          onClick={() => handleRemoveItem(index)}
                        >
                          ลบ
                        </a>
                      </div>
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
      backgroundColor={''}
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
