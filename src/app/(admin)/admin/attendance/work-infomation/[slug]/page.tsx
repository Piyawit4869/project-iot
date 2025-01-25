'use client';

import Scaffold from '@/components/common/scaffold';
import CardComponent from '@/components/common/card';
import { update } from '@/pages/api/workinfos/update'; // API update
import getSingle from '@/pages/api/workinfos/get'; // API get
import { TopSection } from '@/components/common/topSection';
import { useRouter, useParams } from 'next/navigation';
import { parseDate } from '@internationalized/date';
import * as Icon from '@ant-design/icons';
import React from 'react';
import {
  Button,
  Form,
  Input,
  Textarea,
  Switch,
  Select,
  SelectItem,
  DatePicker,
} from '@nextui-org/react';

export default function WorkInfomationSinglePage() {
  const router = useRouter();
  const params = useParams<{ slug?: string }>();
  const [data, setData] = React.useState() as any;
  const [loading, setLoading] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;

  React.useEffect(() => {
    if (!params || !params.slug) {
      console.error('No slug provided in the URL parameters.');
      return;
    }

    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await getSingle(params.slug as string);
        console.log(response , 'response');
        if (!response?.data) {
          throw new Error('No data found for the given slug');
        }
        setData(response.data);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching work-infomation:', error);
      } finally {
        setLoading(false);
      }
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
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log('onSubmit');
    // Ensure address fields are validated as well
    const requiredFields = [
      // 'prefix',
      // 'name',
      // 'priority',
      // 'startDate',
      // 'payDay',
      '',
    ];
    const newErrors: any = {};

    requiredFields.forEach((field) => {
      const fieldParts = field.split('.');
      const fieldValue = formData[fieldParts[0]]?.[fieldParts[1]];
      if (!fieldValue || fieldValue.trim() === '') {
        newErrors[field] = `Field ${field} is required.`;
      }
    });

    try {
      console.log('try');
      const payload = {
        ...data,
        ...formData, // All data including the updated address fields
      };

      delete payload.attendances;
      delete payload.id;
      delete payload.user;
      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.deletedAt;
      delete payload.openDays;
      delete payload.userId;
      delete payload.projectId;

      console.log('Payload:', payload);

      const res = await update({}, payload, params?.slug);
      setOpenEdit(false);
      router.push(`/admin/attendance/work-infomation/${res.data.id}`);
    } catch (err: any) {
      console.error('Send FormData error:', err);
      setErrors({ general: err.message || 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditButton = (openEdit: boolean) => {
    return openEdit ? (
      <a className="px-2 py-1">
        <Button
          className={`bg-${
            data?.docStatus === 'rejected'
              ? 'gray-400 cursor-not-allowed'
              : 'accent1'
          } text-white p-2`}
          key={'submit edit button'}
          type="submit"
          form="work-infomation"
          disabled={data?.docStatus === 'rejected'}
        >
          <Icon.CheckOutlined />
          เสร็จสิ้น
        </Button>
      </a>
    ) : (
      <a className="px-2 py-1">
        <Button
          className={` bg-${
            data?.docStatus === 'rejected'
              ? 'gray-400 cursor-not-allowed'
              : 'accent3'
          } text-white p-31`}
          key={'edit button'}
          onClick={() => {
            setOpenEdit(true);
          }}
          disabled={data?.docStatus === 'rejected'}
        >
          <Icon.EditFilled />
          แก้ไข
        </Button>
      </a>
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
              title="แก้ไขการเข้าทำงาน"
              backpath={'/admin/attendance/work-infomation'}
              buttons={[
                <div className="mx-2.5 gap-2" key="edit-delete-buttons">
                  {handleEditButton(openEdit)}
                </div>,
              ]}
            />
            <div className="flex space-x-4 mt-6">
              <div className="flex-1">
                <CardComponent
                  customCard
                  custom={
                    <Form
                      id="work-infomation"
                      onSubmit={onSubmit}
                      method="post"
                      validationErrors={errors}
                    >
                      <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
                        {/* Content Section */}
                        <div className="mb-6">
                          {/* Detail Section */}
                          <div className="px-5 pt-5">
                            <h1 className="text-2xl font-bold text-headFont mb-10">
                              ข้อมูลการทำงาน
                            </h1>
                            {/* Workinfo Section */}
                            {/* GET API FOR SHOW DISPLAY */}
                            <div className="flex gap-4 mt-6">
                              <div className="flex-1 flex items-center gap-4 pt-6">
                                <span className="text-headFont text-xs">
                                  สถานะ
                                </span>
                                <Switch
                                  name="active"
                                  color="secondary"
                                  onChange={handleChange}
                                  required
                                  defaultChecked
                                />
                              </div>
                              <div className="flex-1 flex items-center gap-4 pt-6">
                                <span className="text-headFont text-xs">
                                  เป็นปัจจุบัน
                                </span>
                                <Switch
                                  name="isCurrent"
                                  color="secondary"
                                  onChange={handleChange}
                                  required
                                  defaultChecked
                                />
                              </div>
                            </div>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                size="lg"
                                label="ชื่อย่อ"
                                labelPlacement="outside"
                                name="prefix"
                                defaultValue={formData.prefix}
                                placeholder="กรอก ชื่อย่อ "
                                onChange={handleChange}
                                // required
                                isDisabled={!openEdit}
                                errorMessage={'กรุณากรอกชื่อย่อ'}
                              />
                              <Input
                                className="flex-1"
                                size="lg"
                                label="name"
                                labelPlacement="outside"
                                name="name"
                                defaultValue={formData.name}
                                placeholder="ชื่อ"
                                onChange={handleChange}
                                // required
                                isDisabled={!openEdit}
                                errorMessage={'กรุณากรอกชื่อ'}
                              />
                            </div>

                            <div className="flex-1 flex items-center gap-4 pt-6">
                              <Input
                                className="flex-1"
                                size="lg"
                                label="descriptions"
                                labelPlacement="outside"
                                name="descriptions"
                                defaultValue={formData.descriptions}
                                placeholder="รายระเอียด"
                                onChange={handleChange}
                                isDisabled={!openEdit}
                                errorMessage={'กรุณากรอกรายระเอียด'}
                              />
                              <Select
                                size="sm"
                                className="flex-1"
                                name="priority"
                                label="priority"
                                onChange={handleChange}
                                placeholder="ความสำคัญ"
                                isDisabled={!openEdit}
                                errorMessage={'กรุณาเลือกความสำคัญ'}
                              >
                                {priority.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>

                            <div className="flex-1 flex items-center gap-4 pt-6">
                              <DatePicker
                                size="sm"
                                className="flex-1"
                                name="startDate"
                                label="วันที่สร้าง"
                                disableAnimation
                                isRequired
                                isDisabled={!openEdit}
                                errorMessage={'กรุณาเลือกวันที่สร้าง'}
                                defaultValue={
                                  formData.startDate
                                    ? parseDate(formData.startDate.split('T')[0])
                                    : undefined
                                }
                                // isDisabled={!openEdit}
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
                              <DatePicker
                                size="sm"
                                className="flex-1"
                                name="dueDate"
                                label="วันที่สร้าง"
                                disableAnimation
                                isRequired
                                isDisabled={!openEdit}
                                errorMessage={'กรุณาเลือกวันที่สร้าง'}
                                defaultValue={
                                  formData.dueDate
                                    ? parseDate(formData.dueDate.split('T')[0])
                                    : undefined
                                }
                                // isDisabled={!openEdit}
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
                                      dueDate: isoString,
                                    }));
                                  } else {
                                    console.error('Invalid date object:', date);
                                  }
                                }}
                              />
                            </div>

                            <div className="flex-1 flex items-center gap-4 pt-6">
                              <Input
                                className="flex-1"
                                size="lg"
                                label="limitTimePerDay"
                                labelPlacement="outside"
                                name="limitTimePerDay"
                                type="number"
                                defaultValue={formData.limitTimePerDay}
                                placeholder="เวลาที่กำหนดต่อวัน"
                                onChange={handleChange}
                                isDisabled={!openEdit}
                                errorMessage={'กรุณากรอกเวลาที่กำหนดต่อวัน'}
                              />
                              <Input
                                className="flex-1 "
                                size="lg"
                                label="inspector"
                                labelPlacement="outside"
                                name="inspector"
                                defaultValue={formData.inspector}
                                placeholder="ผู้ตรวจสอบ"
                                onChange={handleChange}
                                isDisabled={!openEdit}
                                errorMessage={'กรุณากรอกผู้ตรวจสอบ'}
                              />
                            </div>
                            <div className="flex-1 flex items-center gap-4 pt-6">
                              <Input
                                className="flex-1"
                                size="lg"
                                label="startCredit"
                                labelPlacement="outside"
                                name="startCredit"
                                type="number"
                                defaultValue={formData.startCredit}
                                placeholder="เครดิตเริ่มต้น"
                                onChange={handleChange}
                                isDisabled={!openEdit}
                                errorMessage={'กรุณากรอกเครดิตเริ่มต้น'}
                              />
                              <Input
                                className="flex-1 "
                                size="lg"
                                label="totalCredit"
                                labelPlacement="outside"
                                name="totalCredit"
                                defaultValue={formData.totalCredit}
                                placeholder="เครดิตรวม"
                                onChange={handleChange}
                                isDisabled={!openEdit}
                                errorMessage={'กรุณากรอกเครดิตรวม'}
                              />
                            </div>

                            <div className="flex-1 flex items-center gap-4 pt-6">
                              <Input
                                className="flex-1"
                                size="lg"
                                label="totalWorkHours"
                                labelPlacement="outside"
                                name="totalWorkHours"
                                type="number"
                                defaultValue={formData.totalWorkHours}
                                placeholder="รวมเวลาทำงาน"
                                onChange={handleChange}
                                isDisabled={!openEdit}
                                errorMessage={'กรุณากรอกรวมเวลาทำงาน'}
                              />
                              <DatePicker
                                size="sm"
                                className="flex-1"
                                name="payDay"
                                label="วันที่จ่ายเงิน"
                                disableAnimation
                                isRequired
                                isDisabled={!openEdit}
                                errorMessage={'กรุณาเลือกวันที่จ่ายเงิน'}
                                defaultValue={
                                  formData.payDay
                                    ? parseDate(formData.payDay.split('T')[0])
                                    : undefined
                                }
                                // isDisabled={!openEdit}
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
                                      payDay: isoString,
                                    }));
                                  } else {
                                    console.error('Invalid date object:', date);
                                  }
                                }}
                              />
                            </div>
                            <div className="flex-1 flex items-center gap-4 pt-6">
                              <Textarea
                                className="flex-1"
                                size="lg"
                                label="note"
                                labelPlacement="outside"
                                name="note"
                                defaultValue={formData.note}
                                placeholder="สาเหตุ"
                                onChange={handleChange}
                                isDisabled={!openEdit}
                                errorMessage={'กรุณากรอกรวมเวลาทำงาน'}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Form>
                  }
                />
              </div>
            </div>
          </div>
        )
      }
    />
  );
}
const priority = [
  { value: 'low', label: 'Low ' },
  { value: 'medium', label: 'Medium ' },
  { value: 'high', label: 'High ' },
];
