'use client';

import Scaffold from '@/components/common/scaffold';
import CardComponent from '@/components/common/card';
import { TopSection } from '@/components/common/topSection';
import { CardControl } from '@/components/setting/card-organization';
import {
  Button,
  Form,
  Select,
  SelectItem,
  Input,
  DatePicker,
  // Modal,
  // ModalContent,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  // useDisclosure,
} from '@nextui-org/react';
import React from 'react';
import { createUser } from '@/pages/api/user/create';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { profile } from 'console';

export default function CreateUserPage() {
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;
  const router = useRouter();

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault(); // Prevent the form from submitting to the URL
  //   const formData = new FormData(e.currentTarget);

  //   // Convert formData to an object
  //   const data = Object.fromEntries(formData.entries());
  //   console.log(data); // Log the form data for debugging
  // };

  // const resetForm = (formId: string): void => {
  //   const form = document.getElementById(formId) as HTMLFormElement | null;
  //   if (form) {
  //     form.reset();
  //     console.log(`Form with ID "${formId}" has been cleared.`);
  //   }
  // };

  // const {
  //   isOpen: isCreate,
  //   onOpen: openCreate,
  //   onOpenChange: changeCreate,
  // } = useDisclosure();

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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requiredFields = [
      'email',
      'username',
      'password',
      'position',
      'firstName',
    ];
    const newErrors: any = {};

    requiredFields.forEach((field) => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = `Field ${field} is required.`;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const payload = {
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
        ...formData,
        status: 'active',
      };

      if (!payload.active) {
        payload.active = false;
      } else {
        payload.active = true;
      }

      const data = await createUser({}, payload);
      console.log(payload);

      if (data.success) {
        toast.success('🎉 สร้างผู้ใช้งานสำเร็จ!', {
          duration: 3000,
          position: 'bottom-left',
          style: { fontFamily: 'var(--font-ibm-sans)' },
        });
      }

      // router.push(`/admin/user/${data.data.id}`);
    } catch (err: any) {
      toast.error('❌ ไม่สามารถสร้างผู้ใช้งานได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      console.error('Send FormData error:', err);
      setErrors({ general: err.message || 'An unexpected error occurred.' });
    }
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="สร้างข้อมูลผู้ใช้"
            backpath={'/admin/user'}
            buttons={[
              //submit form where out form
              <Button
                className="bg-accent1 text-white"
                type="submit"
                form="user"
                key={'create button'}
                // onPress={openCreate}
              >
                สร้าง
              </Button>,
            ]}
          />

          {/* <Modal
                isOpen={isCreate}
                onOpenChange={changeCreate}
                key={'create button'}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        คุณต้องการสร้างผู้ใช้งาน ใช่หรือไม่
                      </ModalHeader>
                      <ModalBody>
                        <p>ข้อมูลที่คุณกรอกจะถูกบันทึก</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          className="bg-accent2 text-white"
                          variant="light"
                          onPress={onClose}
                        >
                          ยกเลิก
                        </Button>
                        <Button
                          className="bg-accent1 text-white"
                          variant="light"
                          type="submit"
                          key={'create button'}
                          form="user"
                        >
                          ยืนยัน
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal> */}

          <div className="flex space-x-4 mt-6">
            <div className="flex-1">
              <CardComponent
                customCard
                custom={
                  <Form
                    id="user"
                    onSubmit={onSubmit}
                    method="post"
                    validationErrors={errors}
                  >
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      <div>
                        <h1 className="text-2xl font-bold text-headFont">
                          ข้อมูลผู้ใข้
                        </h1>
                        <div className="font-bold text-headFon mt-10">
                          <p>รูปภาพผู้ใช้</p>
                        </div>
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
                        <Input
                          className="flex-1"
                          label={<span className="text-headFont">อีเมล</span>}
                          labelPlacement="outside"
                          name="email"
                          placeholder="กรอกอีเมล"
                          onChange={handleChange}
                          isRequired
                          errorMessage={'กรุณากรอกอีเมล'}
                        />
                      </div>
                      <div className="flex gap-4 mt-6">
                        <Input
                          className="flex-1"
                          label={
                            <span className="text-headFont">ชื่อผู้ใช้</span>
                          }
                          labelPlacement="outside"
                          name="username"
                          placeholder="กรอกชื่อผู้ใช้"
                          onChange={handleChange}
                          isRequired
                          errorMessage={'กรุณากรอกชื่อผู้ใช้'}
                        />
                      </div>
                      <div className="flex gap-4 mt-6">
                        <Input
                          className="flex-1"
                          label={
                            <span className="text-headFont">รหัสผ่าน</span>
                          }
                          labelPlacement="outside"
                          name="password"
                          placeholder="กรอกรหัสผ่าน"
                          onChange={handleChange}
                          isRequired
                          errorMessage={'กรุณากรอกรหัสผ่าน'}
                        />
                      </div>
                      <div className="flex gap-4 mt-6">
                        <Select
                          className="flex-1  text-headFont"
                          name="position"
                          placeholder="เลือกตำแหน่ง"
                          label="ตำแหน่ง"
                          labelPlacement={'outside'}
                          onChange={handleChange}
                          isRequired
                          errorMessage={'กรุณาเลือกตำแหน่ง'}
                        >
                          {position.map((item: any) => (
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
                        <Select
                          className="flex-1  text-headFont"
                          name="prefix"
                          placeholder="เลือกคำนำหน้า"
                          label="คำนำหน้า"
                          labelPlacement={'outside'}
                          onChange={handleChange}
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
                          label={<span className="text-headFont">ชื่อ</span>}
                          labelPlacement="outside"
                          name="firstName"
                          placeholder="กรอกชื่อ"
                          onChange={handleChange}
                          isRequired
                          errorMessage={'กรุณากรอกชื่อ'}
                        />
                      </div>
                      <div className="flex gap-4 mt-6">
                        <Input
                          className="flex-1"
                          label={<span className="text-headFont">นามสกุล</span>}
                          labelPlacement="outside"
                          name="lastName"
                          placeholder="กรอกนามสกุล"
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
                          onChange={(date: any) => {
                            if (date?.year && date?.month && date?.day) {
                              // Convert the custom date object to a valid Date instance
                              const parsedDate = new Date(
                                date.year,
                                date.month,
                                date.day,
                              ); // month is 0-indexed
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
                            <span className="text-headFont">เบอร์โทรศัพท์</span>
                          }
                          labelPlacement="outside"
                          name="phone"
                          placeholder="กรอกเบอร์โทรศัพท์"
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
      }
    />
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
