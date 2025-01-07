'use client';

import Scaffold from '@/components/common/scaffold';
import CardComponent from '@/components/common/card';
import { TopSection } from '@/components/common/topSection';
import { CardControl } from '@/components/setting/card-organization';
import Image from 'next/image';
import {
  Button,
  Form,
  Select,
  SelectItem,
  Input,
  DatePicker,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  DateValue,
} from '@nextui-org/react';
import { parseDate, parseAbsoluteToLocal } from '@internationalized/date';
import getUser from '@/pages/api/user/get';
import React from 'react';
import { useParams } from 'next/navigation';
import { setDefaultAutoSelectFamily } from 'net';

export default function UserSinglePage() {
  const [data, setData] = React.useState() as any;
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting to the URL
    const formData = new FormData(e.currentTarget);

    // Convert formData to an object]h
    const data = Object.fromEntries(formData.entries());
    console.log(data); // Log the form data for debugging
  };

  const params = useParams<{ slug: string }>();
  // const [birthDate, setBirthDate] = React.useState<DateValue | null>(
  //   parseAbsoluteToLocal(usersSingle?.profile?.birthDate),
  // );

  React.useEffect(() => {
    if (!params || !params.slug) {
      console.log('Waiting for params.id to be ready...');
      return;
    }

    setLoading(true);

    const fetchUserSingle = async () => {
      const { data } = await getUser(params.slug);

      setData(data);
      setFormData(data);
      setLoading(data);
    };

    fetchUserSingle();
  }, [params]);

  const handleChange = (e: any) => {
    const { name, checked, type, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'birthDate' && value instanceof Date
          ? value.toISOString()
          : value,
    }));
  };

  const fixDate = formData?.profile?.birthDate
    ? parseAbsoluteToLocal(formData.profile.birthDate)
    : undefined;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
                    form="user"
                    key={'create button'}
                  >
                    ยืนยัน
                  </Button>,
                  <Button
                    className="bg-accent2 text-white"
                    key={'delete button'}
                  >
                    ลบ
                  </Button>,
                ]}
              />
              <div className="flex space-x-4 mt-6">
                <div className="flex-1">
                  <CardComponent
                    customCard
                    custom={
                      <Form id="user" onSubmit={onSubmit} method="post">
                        <h1 className="text-2xl font-bold text-headFont">
                          ข้อมูลผู้ใช้
                        </h1>
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                          <div className="font-bold text-headFon mt-10">
                            <p>รูปภาพผู้ใช้งาน</p>
                            <Image
                              className="mt-3"
                              src="/logo.png"
                              alt="logo"
                              width={100}
                              height={100}
                            ></Image>
                          </div>
                          <div className="flex gap-4 mt-6">
                            <div>
                              <CardControl
                                name="active"
                                title="เปิดใช้งาน"
                                description="ใช้สำหรับการปิดหรือยุติการทำงานของผู้ใช้งาน"
                                control="เปิดใช้งาน"
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="flex gap-4 mt-6">
                            <Select
                              className="flex-1  text-headFont"
                              name="position"
                              placeholder="กรุณาเลือกตำแหน่ง"
                              label="ตำแหน่ง"
                              defaultSelectedKeys={[formData.role]}
                              labelPlacement={'outside'}
                            >
                              {position.map((item) => (
                                <SelectItem
                                  className="text-headFont"
                                  key={item.value}
                                  value={item.value}
                                >
                                  {item.label}
                                </SelectItem>
                              ))}
                            </Select>
                          </div>
                          <div className="flex gap-4 mt-6">
                            <Select
                              className="flex-1  text-headFont"
                              name="prefix"
                              placeholder="กรุณาเลือกคำนำหน้า"
                              label="คำนำหน้า"
                              labelPlacement={'outside'}
                            >
                              {prefix.map((item: any) => (
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
                          <div className="flex gap-4 mt-6">
                            <Input
                              className="flex-1"
                              label={
                                <span className="text-headFont">ชื่อ</span>
                              }
                              labelPlacement="outside"
                              name="userName"
                              placeholder="กรอกชื่อ"
                              defaultValue={formData.email}
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
                              name="lastname"
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
                              granularity="day"
                              value={fixDate}
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

                          <div className="gap-4 mt-6 flex">
                            <Button onPress={onOpen}>เปลี่ยนรหัสผ่าน</Button>
                            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                              <ModalContent>
                                {(onClose) => (
                                  <>
                                    <ModalHeader className="flex gap-1">
                                      เปลี่ยนรหัสผ่าน
                                    </ModalHeader>
                                    <ModalBody>
                                      <Input
                                        className=""
                                        label={
                                          <span className="text-headFont">
                                            รหัสผ่าน
                                          </span>
                                        }
                                        labelPlacement="outside"
                                        name="password"
                                        placeholder="กรอกรหัสผ่าน"
                                      />
                                      <Input
                                        className=""
                                        label={
                                          <span className="text-headFont">
                                            รหัสผ่านใหม่
                                          </span>
                                        }
                                        labelPlacement="outside"
                                        name="newpassword"
                                        placeholder="กรอกรหัสผ่านใหม่"
                                      />
                                    </ModalBody>
                                    <ModalFooter>
                                      <Button
                                        className="bg-accent1 text-white"
                                        color="success"
                                        variant="light"
                                        onPress={onClose}
                                      >
                                        ยืนยัน
                                      </Button>
                                      <Button
                                        className="bg-accent2 text-white"
                                        color="danger"
                                        variant="light"
                                        onPress={onClose}
                                      >
                                        ยกเลิก
                                      </Button>
                                    </ModalFooter>
                                  </>
                                )}
                              </ModalContent>
                            </Modal>
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
const position = [
  { label: 'Employee', value: 'employee' },
  { label: 'Owner', value: 'owner' },
];

const prefix = [
  { label: 'นาย', value: '1' },
  { label: 'นาง', value: '2' },
  { label: 'นางสาว', value: '3' },
];
