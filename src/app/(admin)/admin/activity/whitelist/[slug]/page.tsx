'use client';

import CardComponent from '@/components/common/card';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Form, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { Tabs, Tab } from '@nextui-org/react';

export default function ConfigAttendancesPage() {

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting to the URL
    const formData = new FormData(e.currentTarget);

    // Convert formData to an object
    const data = Object.fromEntries(formData.entries());
    console.log(data); // Log the form data for debugging
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            backpath={'/admin/activity/whitelist'}
            title="การตั้งค่าการเข้าออกงาน"
            buttons={[
              <div key="action-buttons">
                <Button
                  className="bg-accent2 text-white p-2 m-1"
                  key={'save button'}
                >
                  บันทึกการตั้งค่า
                </Button>
                <Button
                  className="bg-accent3 text-white p-2 m-1"
                  key={'cancel button'}
                >
                  ยกเลิก
                </Button>
              </div>,
            ]}
          />
          <div className="flex space-x-4 mt-6">
            <div className="flex-1">
              <CardComponent
                customCard
                custom={
                  <Form id="user" onSubmit={onSubmit} method="post">
                    <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
                      <Tabs variant="underlined">
                        <Tab key="address" title="ไวท์ลิสต์">
                          {/* Content Section */}
                          <div className="mb-6">
                            <div className="grid grid-cols-2 gap-4">
                              {/* Detail Section */}
                              <div>
                                <h1 className="text-2xl font-bold text-headFont mb-10">
                                  Detail
                                </h1>
                                <div className="flex gap-4 mt-6">
                                  <Input
                                    className="flex-1 "
                                    label={
                                      <span className="text-headFont">
                                        สถานที่
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    name="AddressName"
                                    placeholder="สถานที่"
                                  />
                                  <Input
                                    className="flex-1 pt-2"
                                    label={
                                      <span className="text-headFont">
                                        ไอพี
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    name="AddressName"
                                    placeholder="ที่อยู่ไอพี"
                                  />
                                </div>
                                <div className="flex gap-4 mt-6">
                                  <Input
                                    className="flex-1 pt-2"
                                    label={
                                      <span className="text-headFont">
                                        บราวเซอร์
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    name="AddressName"
                                    placeholder="บราวเซอร์"
                                  />
                                  <Input
                                    className="flex-1 pt-2"
                                    label={
                                      <span className="text-headFont">
                                        ระบบปฏิบัติการ
                                      </span>
                                    }
                                    labelPlacement="outside"
                                    name="AddressName"
                                    placeholder="ระบบปฏิบัติการ"
                                  />
                                </div>
                              </div>

                              {/* Map Section */}
                              <div>
                                <h1 className="text-2xl font-bold text-headFont">
                                  Map
                                </h1>
                                <div className="mt-4">
                                  <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4596.320001693403!2d100.45844017573191!3d13.788879396432687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29b1543350395%3A0x96f94cedda00d639!2sCK%20Service!5e1!3m2!1sth!2sth!4v1735121592706!5m2!1sth!2sth"
                                    width="90%"
                                    height="250"
                                    className="rounded-md border m-auto"
                                    allowFullScreen
                                    loading="lazy"
                                  ></iframe>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Address Section */}
                          <div>
                            <h1 className="text-2xl font-bold text-headFont">
                              Address
                            </h1>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">
                                    ชื่อที่อยู่
                                  </span>
                                }
                                labelPlacement="outside"
                                name="AddressName"
                                placeholder="ชื่อที่อยู่"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">เมือง</span>
                                }
                                labelPlacement="outside"
                                name="city"
                                placeholder="ชื่อเมือง"
                              />
                            </div>
                            {/* More Address Fields */}
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">จังหวัด</span>
                                }
                                labelPlacement="outside"
                                name="province"
                                placeholder="ชื่อจังหวัด"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">
                                    รหัสไปรษณีย์
                                  </span>
                                }
                                labelPlacement="outside"
                                name="zipcode"
                                placeholder="รหัสไปรษณีย์"
                              />
                            </div>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">เลขห้อง</span>
                                }
                                labelPlacement="outside"
                                name="Roomnumber"
                                placeholder="เลขห้อง"
                              />
                              <Input
                                className="flex-1"
                                label={
                                  <span className="text-headFont">
                                    ชั้นที่อยู่
                                  </span>
                                }
                                labelPlacement="outside"
                                name="floor"
                                placeholder="ชั้นที่อยู่"
                              />
                            </div>
                            {/* Notes Section */}
                            <div className="flex gap-4 mt-6">
                              <Textarea
                                classNames={{
                                  base: '',
                                  input: 'resize-y min-h-[50px]',
                                }}
                                label="หมายเหตุ"
                                labelPlacement="outside"
                                placeholder="หมายเหตุ"
                                variant="bordered"
                              />
                            </div>
                          </div>
                        </Tab>
                      </Tabs>
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

// const day = [
//   { label: 'Sunday', value: '1' },
//   { label: 'Monday', value: '2' },
//   { label: 'Tuesday', value: '3' },
//   { label: 'Wednesday', value: '4' },
//   { label: 'Thursday', value: '5' },
//   { label: 'Friday', value: '6' },
//   { label: 'Saturday', value: '7' },
// ];
