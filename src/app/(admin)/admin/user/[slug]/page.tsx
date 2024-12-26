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
} from '@nextui-org/react';
import { singleUserLoader } from '@/app/api/singleuser';
import React from 'react';
import { useParams } from 'next/navigation';

export default function UserSinglePage() {
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting to the URL
    const formData = new FormData(e.currentTarget);

    // Convert formData to an object]h
    const data = Object.fromEntries(formData.entries());
    console.log(data); // Log the form data for debugging
  };

  const params = useParams<{ slug: string }>();
  console.log(params);
  const [usersSingle, setUsersSingle] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (!params?.slug) {
      console.log('Waiting for params.id to be ready...');
      return;
    }
    const fetchUserSingle = async () => {
      try {
        const userSingle = await singleUserLoader(params.slug);
        setUsersSingle(userSingle);
        console.log('User data:', userSingle);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserSingle();
  }, [params?.slug]);

  console.log(usersSingle);

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
                    type="submit"
                    form="user"
                    key={'cancel button'}
                  >
                    ยกเลิก
                  </Button>,
                  <Button
                    className="bg-accent3 text-white"
                    type="submit"
                    form="user"
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
                                title="เปิดใช้งาน"
                                description="ใช้สำหรับการปิดหรือยุติการทำงานของผู้ใช้งาน"
                                control="เปิดใช้งาน"
                              />
                            </div>
                          </div>

                          <div className="flex gap-4 mt-6">
                            <Select
                              className="flex-1  text-headFont"
                              name="position"
                              placeholder="เลือกตำแหน่ง"
                              label="ตำแหน่ง"
                              labelPlacement={'outside'}
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
                              placeholder="กรอกชื่อ"
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
                                <span className="text-headFont">
                                  เบอร์โทรศัพท์
                                </span>
                              }
                              labelPlacement="outside"
                              name="phone"
                              placeholder="กรอกเบอร์โทรศัพท์"
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
  { label: 'Employee', value: '1' },
  { label: 'Owner', value: '2' },
];

const prefix = [
  { label: 'นาย', value: '1' },
  { label: 'นาง', value: '2' },
  { label: 'นางสาว', value: '3' },
];
