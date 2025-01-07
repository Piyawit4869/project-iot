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
import { profile } from 'console';
import { parseDate } from '@internationalized/date';

export default function CreateUserPage() {
  const [data, setData] = React.useState() as any;
  const [formData, setFormData] = React.useState({}) as any;
  const [loading, setLoading] = React.useState(false);
  const [honorific, setHonorific] = React.useState<string>();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting to the URL
    const formData = new FormData(e.currentTarget);
    // Convert formData to an object
    const data = Object.fromEntries(formData.entries());
    console.log(data); // Log the form data for debugging
  };

  // const apiprefix: Record<string, string> = {
  //   'Mr.': 'นาย',
  //   'Ms.': 'นางสาว',
  //   'Mrs.': 'นาง',
  // };

  React.useEffect(() => {
    const getProfile = async () => {
      const profile = await get();

      setData(profile);
      setFormData(profile);
      setLoading(false);
    };

    getProfile();

    // const fixprefix =
    //   apiprefix[formData.profile?.prefix] || formData.profile?.prefix;
    // setHonorific(fixprefix);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <Scaffold
          child={
            <div>
              <TopSection
                title="ข้อมูลผู้ใช้"
                backpath={'/admin/user'}
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
                  <Button
                    className="bg-accent2 text-white"
                    type="submit"
                    form="notation"
                    key={'cancel button'}
                  >
                    ยกเลิก
                  </Button>,
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
                              placeholder={formData.profile?.prefix}
                              label="คำนำหน้า"
                              labelPlacement={'outside'}
                              // defaultSelectedKeys={[formData.profile?.prefix]}
                            >
                              {prefix.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
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
                              value={formData.profile?.firstName}
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
                              value={formData.profile?.lastName}
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
                                formData.profile?.birthDate
                                  ? parseDate(
                                      formData.profile.birthDate.split('T')[0],
                                    )
                                  : undefined
                              }
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
                              value={formData.profile?.phone}
                            />
                          </div>
                        </div>
                      </Form>
                    }
                  />
                </div>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
}

const prefix = [
  { label: 'นาย', value: 'นาย' },
  { label: 'นาง', value: 'นาง' },
  { label: 'นางสาว', value: 'นางสาว' },
];
