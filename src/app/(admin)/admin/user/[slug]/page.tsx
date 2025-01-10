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
import { useParams, useRouter } from 'next/navigation';
import { setDefaultAutoSelectFamily } from 'net';
import { toast } from 'sonner';
import { updateUser } from '@/pages/api/user/update';
import { deleteUser } from '@/pages/api/user/delete';
import { changePassword } from '@/pages/api/user/change-password';

export default function UserSinglePage() {
  const [data, setData] = React.useState() as any;
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;
  const [password, setPassword] = React.useState({}) as any;
  const [roleData, setRoleData] = React.useState({}) as any;
  const router = useRouter();

  const params = useParams<{ slug: string }>();

  React.useEffect(() => {
    if (!params || !params.slug) {
      console.log('Waiting for params.id to be ready...');
      return;
    }

    setLoading(true);

    const fetchUserSingle = async () => {
      const { data } = await getUser(params.slug);

      setData(data);
      setFormData(data.profile);
      setRoleData(data.role);
      setLoading(data);
    };

    fetchUserSingle();
  }, [params]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // const requiredFields = ['refNo', 'startDate', 'type'];
    // const newErrors: any = {};

    // requiredFields.forEach((field) => {
    //   if (!formData[field] || formData[field].trim() === '') {
    //     newErrors[field] = `Field ${field} is required.`;
    //   }
    // });

    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   setLoading(false);
    //   return;
    // }

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
        role: {
          name: formData.position,
        },
        status: 'active',
      };

      delete payload.data;

      if (!payload.active) {
        payload.active = false;
      } else {
        payload.active = true;
      }

      const res = await updateUser({}, payload, params?.slug);

      toast.success('📝 แก้ไขข้อมูลผู้ใช้งานสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });
    } catch (err: any) {
      toast.error('❌ ไม่สามารถแก้ไขข้อมูลผู้ใช้งานได้', {
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

  const Change = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...password,
      };

      const res = await changePassword({}, payload, params?.slug);
      console.log(res);

      toast.success('📝 เปลี่ยนรหัสผ่านสำเร็จงานสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });
    } catch (err: any) {
      toast.error('❌ ไม่สามารถเปลี่ยนรหัสผ่านได้ได้', {
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

  const onDelete = async () => {
    try {
      await deleteUser(params?.slug);

      toast.success('ลบข้อมูลผู้ใช้งานสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      router.push(`/admin/user`);
    } catch (error) {
      toast.error('❌ ไม่สามารถลบข้อมูลผู้ใช้งานได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      console.error('Delete error:', error);
    }
  };

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

  const handleChangePass = (e: any) => {
    const { name, value } = e.target;
    setPassword((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <Scaffold
          child={
            // loading ? (
            //   <div className="flex items-center justify-center min-h-screen">
            //     <div className="relative flex flex-col items-center space-y-4">
            //       {/* Spinner */}
            //       <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

            //       {/* Loading Text */}
            //       <p className="text-gray-600 text-lg font-semibold animate-pulse">
            //         Loading, please wait...
            //       </p>
            //     </div>
            //   </div>
            // ) : (
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
                    onClick={onDelete}
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
                              selectedKeys={[roleData.name]}
                              labelPlacement={'outside'}
                              onChange={handleChange}
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
                              selectedKeys={[formData.prefix]}
                              labelPlacement={'outside'}
                              onChange={handleChange}
                            >
                              {prefix.map((item) => (
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
                                  ? parseDate(formData.birthDate.split('T')[0])
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

                          <div className="gap-4 mt-6 flex">
                            <Button onPress={onOpen}>เปลี่ยนรหัสผ่าน</Button>
                            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                              <Form
                                id="password"
                                onSubmit={Change}
                                method="post"
                              >
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
                                          onChange={handleChangePass}
                                        />
                                        <Input
                                          className=""
                                          label={
                                            <span className="text-headFont">
                                              รหัสผ่านใหม่
                                            </span>
                                          }
                                          labelPlacement="outside"
                                          name="newPassword"
                                          placeholder="กรอกรหัสผ่านใหม่"
                                          onChange={handleChangePass}
                                        />
                                      </ModalBody>
                                      <ModalFooter>
                                        <Button
                                          className="bg-accent1 text-white"
                                          color="success"
                                          variant="light"
                                          onClick={Change}
                                          form="password"
                                          type="submit"
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
                              </Form>
                            </Modal>
                          </div>
                        </div>
                      </Form>
                    }
                  />
                </div>
              </div>
            </div>
            // )
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
  { label: 'นาย', value: 'Mr.' },
  { label: 'นาง', value: 'Mrs.' },
  { label: 'นางสาว', value: 'Ms.' },
];
