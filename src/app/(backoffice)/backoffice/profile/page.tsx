'use client';

import Scaffold from '@/components/common/scaffold';
import CardComponent from '@/components/common/card';
import { TopSection } from '@/components/common/topSection';
import Image from 'next/image';
import {
  Button,
  Form,
  Select,
  SelectItem,
  Input,
  DatePicker,
} from '@nextui-org/react';
import React from 'react';
import get from '@/pages/api/profile/get';
import { parseDate } from '@internationalized/date';
import { updateProfile } from '@/pages/api/profile/updata';
import { toast } from 'sonner';

export default function CreateUserPage() {
  const [data, setData] = React.useState() as any;
  const [formData, setFormData] = React.useState({}) as any;
  const [loading, setLoading] = React.useState(false);
  const [, setErrors] = React.useState({}) as any;

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault(); // Prevent the form from submitting to the URL
  //   const formData = new FormData(e.currentTarget);
  //   // Convert formData to an object
  //   const data = Object.fromEntries(formData.entries());
  //   console.log(data); // Log the form data for debugging
  // };

  React.useEffect(() => {
    const getProfile = async () => {
      const profile = await get();

      setData(profile);
      setFormData(profile.profile);
      setLoading(false);
    };

    getProfile();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]:
        name === 'birthDate' && value instanceof Date
          ? value.toISOString()
          : value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(false);

    const requiredFields = ['firstName', 'lastName'];
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
        ...formData,
        ...data,
        profile: {
          prefix: formData.prefix,
          firstName: formData.firstName,
          lastName: formData.lastName,
          birthDate: formData.birthDate,
          phone: formData.phone,
        },
      };

      delete payload.data;

      // const res = await updateProfile({}, payload, payload.id);
      await updateProfile({}, payload, payload.id);

      toast.success('📝 แก้ไขเอกสารสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });
    } catch (err: any) {
      toast.error('❌ ไม่สามารถแก้ไขเอกสารได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      console.error('Send FormData error:', err);
      setErrors({ general: err.message || 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
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
                  title="ข้อมูลผู้ใช้"
                  backpath={'/backoffice/user'}
                  buttons={[
                    //submit form where out form
                    <Button
                      className="bg-accent1 text-white"
                      type="submit"
                      form="profile"
                      key={'create button'}
                    >
                      บันทึก
                    </Button>,

                    /* ปุ่มยกเลิก
                  <Button
                    className="bg-accent2 text-white"
                    type="submit"
                    form="notation"
                    key={'cancel button'}
                  >
                    ยกเลิก
              </Button>,
              */
                  ]}
                />
                <div className="flex space-x-4 mt-6">
                  <div className="flex-1">
                    <CardComponent
                      customCard
                      custom={
                        <Form id="profile" onSubmit={onSubmit} method="post">
                          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                            <div>
                              <div>
                                <h1 className="text-2xl font-bold text-headFont">
                                  ข้อมูลผู้ใช้
                                </h1>
                              </div>
                              <div className="font-bold text-headFon mt-10">
                                <p>รูปภาพผู้ใช้งาน</p>
                                <Image
                                  className="mt-3"
                                  src="/logo.png"
                                  alt="image organization"
                                  width={100}
                                  height={100}
                                ></Image>
                              </div>
                            </div>
                            <div className="flex gap-4 mt-6">
                              <div></div>
                            </div>

                            <div className="flex gap-4 mt-6">
                              <Select
                                className="flex-1  text-headFont"
                                name="prefix"
                                placeholder="เลือกคำนำหน้า"
                                label="คำนำหน้า"
                                labelPlacement={'outside'}
                                selectedKeys={[formData.prefix]}
                                onChange={handleChange}
                              >
                                {prefix.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">ชื่อ</span>
                                }
                                labelPlacement="outside"
                                name="firstName"
                                placeholder="กรอกชื่อ"
                                value={formData.firstName}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">นามสกุล</span>
                                }
                                labelPlacement="outside"
                                name="lastName"
                                placeholder="กรอกนามสกุล"
                                value={formData.lastName}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex gap-4 mt-6">
                              <DatePicker
                                className="flex-1  text-headFont"
                                name="birthDate"
                                label="วัน/เดือน/ปีเกิด"
                                labelPlacement="outside"
                                disableAnimation
                                value={
                                  formData.birthDate
                                    ? parseDate(
                                        formData.birthDate.split('T')[0],
                                      )
                                    : undefined
                                }
                                onChange={(date: any) => {
                                  if (date?.year && date?.month && date?.day) {
                                    // Convert the custom date object to a valid Date instance
                                    const parsedDate = new Date(
                                      date.year,
                                      date.month - 1,
                                      date.day,
                                    ); // month is 0-indexed
                                    parsedDate.setHours(12);
                                    const isoString = parsedDate.toISOString();

                                    // Update formData with the ISO string
                                    setFormData((prevData: any) => ({
                                      ...prevData,
                                      birthDate: isoString,
                                    }));
                                  } else {
                                    console.error('Invalid date object:', date);
                                  }
                                }}
                              />
                            </div>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">
                                    เบอร์โทรศัพท์
                                  </span>
                                }
                                labelPlacement="outside"
                                name="phone"
                                placeholder="กรอกเบอร์โทรศัพท์"
                                value={formData.phone}
                                onChange={handleChange}
                              />
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
      </div>
    </div>
  );
}

const prefix = [
  { label: 'นาย', value: 'Mr.' },
  { label: 'นาง', value: 'Mrs.' },
  { label: 'นางสาว', value: 'Ms.' },
];
