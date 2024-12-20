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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react';
import React from 'react';

export default function CreateUserPage() {

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting to the URL
    const formData = new FormData(e.currentTarget);

    // Convert formData to an object
    const data = Object.fromEntries(formData.entries());
    console.log(data); // Log the form data for debugging
  };

  // const resetForm = (formId: string): void => {
  //   const form = document.getElementById(formId) as HTMLFormElement | null;
  //   if (form) {
  //     form.reset();
  //     console.log(`Form with ID "${formId}" has been cleared.`);
  //   }
  // };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <Scaffold
          child={
            <div>
              <TopSection
                title="สร้างข้อมูลผู้ใช้"
                backpath={'/admin/user'}
                buttons={[
                  //submit form where out form
                  <Button
                    className="bg-accent3 text-white"
                    type="submit"
                    form="user"
                    key={'cancel button'}
                    onPress={onOpen}
                  >
                    ยกเลิก
                  </Button>,
                  <Button
                    className="bg-accent2 text-white"
                    type="submit"
                    form="user"
                    key={'create button'}
                    onPress={onOpen}
                  >
                    บันทึก
                  </Button>,
                ]}
              />

              <Modal isOpen={isOpen} onOpenChange={onOpenChange} key={'create button'}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">คุณต้องการสร้างผู้ใช้งาน ใช่หรือไม่</ModalHeader>
                      <ModalBody>
                        <p>ข้อมูลที่คุณกรอกจะถูกบันทึก</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                          ยกเลิก
                        </Button>
                        <Button color="success" variant="light" type="submit" key={'create button'} form="user" onPress={onClose}>
                          ยืนยัน
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
              {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange} key={'cancel button'}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">คุณต้องการเคลียร์ผู้ใช้งาน ใช่หรือไม่</ModalHeader>
                      <ModalBody>
                        <p>ข้อมูลที่คุณกรอกจะถูกเคลียร์</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                          ยกเลิก
                        </Button>
                        <Button color="success" variant="light"
                        onPress={() => {
                          // resetForm("user");
                          onClose();
                        }}
                        >
                          ยืนยัน
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal> */}

              <div className="flex space-x-4 mt-6">
                <div className='flex-1'>
                  <CardComponent
                    customCard
                    custom={
                      <Form
                        id="user"
                        onSubmit={onSubmit}
                        method="post"
                      >
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                          <div >
                            <h1 className="text-2xl font-bold text-headFont">
                              ข้อมูลผู้ใข้
                            </h1>
                            <div className='font-bold text-headFon mt-10'>
                              <p>รูปภาพองค์กร</p>
                            </div>
                          </div>
                          <div className="flex gap-4 mt-6">
                            <div>
                              <CardControl
                                title="เปิดใช้งาน"
                                description="ใช้สำหรับการปิดหรือยุติการทำงานของผู้ใช้งาน"
                                control="เปิดใช้งาน"
                              />
                            </div>
                          </div>

                          <div className="flex gap-4 mt-6">
                            <Input
                              className="flex-1"
                              label={
                                <span className="text-headFont">อีเมล</span>
                              }
                              labelPlacement="outside"
                              name="gmail"
                              placeholder="กรอกอีเมล"
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
                            />
                          </div>
                          <div className="flex gap-4 mt-6">
                            <Select
                              className="flex-1  text-headFont"
                              name="position"
                              placeholder="เลือกตำแหน่ง"
                              label="ตำแหน่ง"
                              labelPlacement={"outside"}
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
                              labelPlacement={"outside"}
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
                              name="name"
                              placeholder="กรอกรชื่อ"
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
                            />
                          </div>
                          <div className="flex gap-4 mt-6">
                            <DatePicker
                              className="flex-1  text-headFont"
                              name="birthday"
                              label="วัน/เดือน/ปีเกิด"
                              labelPlacement="outside"
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
    </div >
  );
}

const position = [
  { label: 'Employee', value: '1' },
  { label: 'Owner', value: '2' },
];

const prefix = [
  { label: 'นาย', value: '1' },
  { label: 'นาง', value: '2' },
  { label: 'นางสาว', value: '3' },
];
