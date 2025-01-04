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
import { parseDate } from '@internationalized/date';
import React from 'react';
import get from '@/pages/api/notations/get';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { updateNotation } from '@/pages/api/notations/update';
import { deleteNotation } from '@/pages/api/notations/delete';
import { changeStatusNotation } from '@/pages/api/notations/changeStatus';

export default function NotationSinglePage() {
  const [items, setItems] = React.useState([{ description: '', amount: '' }]);
  const [zoomLevel, setZoomLevel] = React.useState(100); // Default zoom level (100%)
  const [data, setData] = React.useState() as any;
  const params = useParams<{ slug?: string }>();
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;
  const router = useRouter();
  const [openEdit, setOpenEdit] = React.useState(false);

  React.useEffect(() => {
    if (!params || !params.slug) {
      console.error('No slug provided in the URL params.');
      return;
    }

    setLoading(true);

    const fetchData = async () => {
      const { data } = await get(params.slug as string);

      setData(data);
      setFormData(data);
      setLoading(false);
    };

    fetchData();
  }, [params]);

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

    try {
      const payload = {
        ...data,
        ...formData,
      };

      delete payload.data;

      if (!payload.active) {
        payload.active = false;
      } else {
        payload.active = true;
      }

      const res = await updateNotation({}, payload, params?.slug);

      setOpenEdit(false);

      router.push(`/admin/notation/${res.data.id}`);
    } catch (err: any) {
      console.error('Send FormData error:', err);
      setErrors({ general: err.message || 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const onCancel = async () => {
    try {
      await changeStatusNotation(params?.slug, 'canceled');

      router.push(`/admin/notation/${params?.slug}`);
    } catch (error) {
      console.error('Change status error:', error);
    }
  };

  const onDelete = async () => {
    try {
      await deleteNotation(params?.slug);

      router.push(`/admin/notation`);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const onPending = async () => {
    try {
      await changeStatusNotation(params?.slug, 'pending');

      router.push(`/admin/notation/${params?.slug}`);
    } catch (error) {
      console.error('Pending error:', error);
    }
  };

  const onWaiting = async () => {
    try {
      await changeStatusNotation(params?.slug, 'review');

      router.push(`/admin/notation/${params?.slug}`);
    } catch (error) {
      console.error('Waiting error:', error);
    }
  };

  const onRejected = async () => {
    try {
      await changeStatusNotation(params?.slug, 'rejected');

      router.push(`/admin/notation/${params?.slug}`);
    } catch (error) {
      console.error('Reject error:', error);
    }
  };

  const onApproved = async () => {
    try {
      await changeStatusNotation(params?.slug, 'approved');

      router.push(`/admin/notation/${params?.slug}`);
    } catch (error) {
      console.error('Approve error:', error);
    }
  };

  const handleEditButton = (openEdit: boolean) => {
    return openEdit ? (
      <Button
        className={`bg-${
          data?.docStatus === 'canceled'
            ? 'gray-400 cursor-not-allowed'
            : 'accent1'
        } text-white`}
        key={'submit edit button'}
        type="submit"
        form="notation"
        disabled={data?.docStatus === 'canceled'}
      >
        เสร็จสิ้น
      </Button>
    ) : (
      <Button
        className={`bg-${
          data?.docStatus === 'canceled'
            ? 'gray-400 cursor-not-allowed'
            : 'accent3'
        } text-white`}
        key={'edit button'}
        onClick={() => {
          setOpenEdit(true);
        }}
        disabled={data?.docStatus === 'canceled'}
      >
        แก้ไข
      </Button>
    );
  };

  return (
    <Scaffold
      child={
        loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative flex flex-col items-center space-y-4">
              {/* Spinner */}
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

              {/* Loading Text */}
              <p className="text-gray-600 text-lg font-semibold animate-pulse">
                Loading, please wait...
              </p>
            </div>
          </div>
        ) : (
          <div>
            <TopSection
              title={data?.docNo}
              backpath={'/admin/notation'}
              buttons={[
                data?.docStatus !== 'canceled' ? (
                  <Button
                    className=" text-white"
                    key={'cancel button'}
                    onClick={onCancel}
                  >
                    ยกเลิก
                  </Button>
                ) : (
                  <div key={'empty cancel'}></div>
                ),

                handleEditButton(openEdit),
                data?.docStatus === 'draft' ? (
                  <Button
                    className={`bg-sky-400 text-white`}
                    key={'pending button'}
                    onClick={onPending}
                  >
                    รอดำเนินการ
                  </Button>
                ) : (
                  <div key={'empty pendding'}></div>
                ),
                data?.docStatus === 'pending' ? (
                  <Button
                    className={`bg-sky-600 text-white`}
                    key={'waiting button'}
                    onClick={onWaiting}
                  >
                    รอตรวจสอบ
                  </Button>
                ) : (
                  <div key={'empty waiting'}></div>
                ),
                <Button
                  className={`bg-${
                    data?.docStatus !== 'waiting_for_review'
                      ? 'gray-400 cursor-not-allowed'
                      : 'accent2'
                  } text-white`}
                  key={'reject button'}
                  disabled={data?.docStatus !== 'waiting_for_review'}
                  onClick={onRejected}
                >
                  ปฏิเสธ
                </Button>,
                <Button
                  className={`bg-${
                    data?.docStatus !== 'waiting_for_review'
                      ? 'gray-400 cursor-not-allowed'
                      : 'accent1'
                  } text-white`}
                  key={'approve button'}
                  disabled={data?.docStatus !== 'waiting_for_review'}
                  onClick={onApproved}
                >
                  อนุมัติ
                </Button>,
                <Button
                  className={`bg-${
                    data?.docStatus === 'canceled'
                      ? 'gray-400 cursor-not-allowed'
                      : 'accent2'
                  } text-white`}
                  key={'delete button'}
                  onClick={onDelete}
                  disabled={data?.docStatus === 'canceled'}
                >
                  <Icon.DeleteFilled />
                  ลบ
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
                          isDisabled={!openEdit}
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
                        defaultValue={formData.refNo}
                        isRequired
                        errorMessage={'กรุณากรอกหมายเลขอ้างอิง'}
                        isDisabled={!openEdit}
                      />
                      {/* {formData.status} */}
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
                        defaultValue={
                          formData.startDate
                            ? parseDate(formData.startDate.split('T')[0])
                            : undefined
                        }
                        isDisabled={!openEdit}
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
                        defaultSelectedKeys={[formData.type]}
                        isDisabled={!openEdit}
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
                      isDisabled={!openEdit}
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
                        size="sm"
                        name="customer"
                        label="เลือกลูกค้า"
                        isDisabled={!openEdit}
                      >
                        {customer.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <Select
                        size="sm"
                        name="address"
                        label="เลือกที่อยู่บริษัท"
                        isDisabled={!openEdit}
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
                          isDisabled={!openEdit}
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
                            isDisabled={!openEdit}
                          />
                          {openEdit ? (
                            <a
                              className="text-red-500 cursor-pointer"
                              onClick={() => handleRemoveItem(index)}
                            >
                              ลบ
                            </a>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    ))}
                    {openEdit ? (
                      <Button
                        type="button"
                        className="px-4 py-2 bg-accent3 text-white"
                        onClick={handleAddItem}
                      >
                        <Icon.PlusSquareOutlined className="text-xl" />
                        เพิ่มรายการ
                      </Button>
                    ) : (
                      <></>
                    )}
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
                      {handleDocStatus(data?.docStatus)}
                      {/* <div
                        className={`px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 border border-gray`}
                      >
                        แบบร่าง
                      </div> */}
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
        )
      }
      backgroundColor={''}
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
];

const selectItem = [
  { label: 'รายการที่ 1', value: '1' },
  { label: 'รายการที่ 2', value: '2' },
];

const handleDocStatus = (docStatus: string) => {
  switch (docStatus) {
    case 'draft':
      return (
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 border border-gray`}
        >
          แบบร่าง
        </div>
      );
    case 'pending':
      return (
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 border border-gray`}
        >
          รอดำเนินการ
        </div>
      );
    case 'waiting_for_review':
      return (
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 border border-gray`}
        >
          รอตรวจสอบ
        </div>
      );
    case 'approved':
      return (
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 border border-gray`}
        >
          อนุมัติ
        </div>
      );
    case 'rejected':
      return (
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 border border-gray`}
        >
          ปฏิเสษ
        </div>
      );
    case 'canceled':
      return (
        <div
          className={`px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 border border-gray`}
        >
          ยกเลิก
        </div>
      );

    default:
      break;
  }
};
