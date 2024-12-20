'use client';

import CardComponent from '@/components/common/card';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import SystemPage from './system/page';
import NextTable from '@/components/common/nextTable';
import Link from 'next/link';
import {
  Button,
  Form,
  Input,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, Tab } from "@nextui-org/react";
import AddressPage from './address/page';
import InformationPage from './information/page';

export default function OraganizationPage() {

  // const handleItemChange = (index: number, value: string) => {
  //   const updatedItems = [...items];
  //   updatedItems[index].description = value;
  //   setItems(updatedItems);
  // };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from submitting to the URL
    const formData = new FormData(e.currentTarget);

    // Convert formData to an object
    const data = Object.fromEntries(formData.entries());
    console.log(data); // Log the form data for debugging
  };

  const { isOpen, onOpen, onOpenChange} = useDisclosure(); // Basic Modal 

  // Modal in Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // end

  // Modal in Modal
  const [ModalOpen, setModalOpen] = useState(false);
  const Modalseting = () => {
    setModalOpen(true);
  };
  // end

  const router = useRouter();
  const handleRowClick = (row: any) => {
    router.push(`organization/address/${row.id}`); // Redirect to a dynamic route
    setIsModalOpen(true);
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="ข้อมูลองค์กร"
            buttons={[
              <Link href={""} key={"organization"}>
                <Button className="bg-accent1 text-white" key={"organization"} type='submit' form='organization'>
                  แก้ไขข้อมูลองค์กร
                </Button>
              </Link>,
            ]}
          />
          <div className="flex space-x-4 mt-6">
            <div className='flex-1'>
              <CardComponent
                customCard
                custom={
                  <Form
                    id="organization"
                    onSubmit={onSubmit}
                    method="post"
                  >
                    <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
                      <Tabs variant='underlined'>
                        <Tab key="setting" title="การตั้งค่าระบบ">
                          <div className='flex justify-between'>
                            <h1 className="text-2xl font-bold text-headFont">
                              ตั้งค่าระบบ
                            </h1>
                            <div className=''>
                              <Button className='bg-accent1 text-white' onClick={Modalseting}>ดูการตั้งค่าทั้งหมด</Button>
                            </div>
                          </div>
                          <Modal size='5xl' isOpen={ModalOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                              {() => (
                                <>
                                  <ModalHeader className="flex flex-col-1 gap-1">การตั้งค่าทั้งหมด</ModalHeader>
                                  <ModalBody>
                                    <div>
                                      <Button className='bg-accent1 text-white' onClick={showModal}>สร้างการตั้งค่าใหม่</Button>
                                    </div>
                                    <div className='mb-4'>
                                      <NextTable
                                        columns={columnsSet}
                                        rows={dataSet}
                                        rowClickHandler={handleRowClick}
                                      />
                                    </div>
                                  </ModalBody>
                                </>
                              )}
                            </ModalContent>
                          </Modal>

                          <Modal size='5xl' isOpen={ModalOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                              {() => (
                                <>
                                  <ModalHeader className="flex flex-col-1 gap-1">การตั้งค่าทั้งหมด</ModalHeader>
                                  <ModalBody>
                                    <div>
                                      <Button className='bg-accent1 text-white' onClick={showModal}>สร้างการตั้งค่าใหม่</Button>
                                    </div>
                                    <div className='mb-4'>
                                      <NextTable
                                        columns={columnsSet}
                                        rows={dataSet}
                                        rowClickHandler={handleRowClick}
                                      />
                                    </div>
                                  </ModalBody>
                                </>
                              )}
                            </ModalContent>
                          </Modal>
                          <SystemPage />
                        </Tab>

                        {/* Setting Address */}
                        <Tab key="address" title="ข้อมูลที่อยู่องค์กร">
                          <div>
                            <div className='flex justify-between'>
                              <h1 className="text-2xl font-bold text-headFont">
                                ข้อมูลที่อยู่องค์กร
                              </h1>
                              <div className=''>
                                <Button className='bg-accent1 text-white' onPress={onOpen}>ดูที่อยู่ทั้งหมด</Button>
                              </div>
                              <Modal size='5xl' isOpen={isOpen} onOpenChange={onOpenChange} key={'create button'}>
                                <ModalContent>
                                  {() => (
                                    <>
                                      <ModalHeader className="flex flex-col-1 gap-1">ที่อยู่ทั้งหมด</ModalHeader>
                                      <ModalBody>
                                        <div>
                                          <Button className='bg-accent1 text-white' onClick={showModal}>สร้างที่อยู่ใหม่</Button>
                                        </div>
                                        <div className='mb-4'>
                                          <NextTable
                                            columns={columns}
                                            rows={data}
                                            rowClickHandler={handleRowClick}
                                          />
                                        </div>
                                      </ModalBody>
                                    </>
                                  )}
                                </ModalContent>
                              </Modal>

                              <Modal size='5xl' className='height-500' isOpen={isModalOpen}>
                                <ModalContent>
                                  {() => (
                                    <>
                                      <ModalHeader className="flex flex-col gap-1">สร้างที่อยู่ใหม่</ModalHeader>
                                      <ModalBody>
                                        <Form
                                          id="create-address"
                                          onSubmit={onSubmit}
                                          method="post"
                                        >
                                          <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
                                            <div className="flex gap-4 mt-6">
                                              <Input
                                                className="flex-1"
                                                label={
                                                  <span className="text-headFont">ชื่อที่อยู่</span>
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
                                                  <span className="text-headFont">รหัสไปรษณีย์</span>
                                                }
                                                labelPlacement="outside"
                                                name="zipcode"
                                                placeholder="ชื่อรหัสไปรษณีย์"
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
                                                  <span className="text-headFont">ชั้นที่อยู่</span>
                                                }
                                                labelPlacement="outside"
                                                name="floor"
                                                placeholder="ชั้นที่อยู่"
                                              />
                                              <Input
                                                className="flex-1"
                                                label={
                                                  <span className="text-headFont">หมู่บ้าน</span>
                                                }
                                                labelPlacement="outside"
                                                name="village"
                                                placeholder="หมู่บ้าน"
                                              />
                                              <Input
                                                className="flex-1"
                                                label={
                                                  <span className="text-headFont">เลขหมู่บ้าน</span>
                                                }
                                                labelPlacement="outside"
                                                name="Villagenumber"
                                                placeholder="เลขหมู่บ้าน"
                                              />
                                            </div>

                                            <div className="flex gap-4 mt-6">
                                              <Input
                                                className="flex-1"
                                                label={
                                                  <span className="text-headFont">บ้านเลขที่</span>
                                                }
                                                labelPlacement="outside"
                                                name="housenumber"
                                                placeholder="บ้านเลขที่"
                                              />
                                              <Input
                                                className="flex-1"
                                                label={
                                                  <span className="text-headFont">ตรอก</span>
                                                }
                                                labelPlacement="outside"
                                                name="alley"
                                                placeholder="ตรอก"
                                              />
                                              <Input
                                                className="flex-1"
                                                label={
                                                  <span className="text-headFont">ถนน</span>
                                                }
                                                labelPlacement="outside"
                                                name="road"
                                                placeholder="ถนน"
                                              />
                                              <Input
                                                className="flex-1"
                                                label={
                                                  <span className="text-headFont">อาคาร</span>
                                                }
                                                labelPlacement="outside"
                                                name="building"
                                                placeholder="อาคาร"
                                              />
                                            </div>

                                            <div className="flex gap-4 mt-6">
                                              <Input
                                                className="flex-1"
                                                label={
                                                  <span className="text-headFont">ประเทศ</span>
                                                }
                                                labelPlacement="outside"
                                                name="country"
                                                placeholder="ประเทศ"
                                              />
                                              <Input
                                                className="flex-1"
                                                label={
                                                  <span className="text-headFont">เขต/อำเภอ</span>
                                                }
                                                labelPlacement="outside"
                                                name="district"
                                                placeholder="เขต/อำเภอ"
                                              />
                                            </div>
                                            <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center'>
                                              <div className="flex gap-4 mt-6">
                                                <Input
                                                  className="flex-1"
                                                  label={
                                                    <span className="text-headFont">แขวง/ตำบล</span>
                                                  }
                                                  labelPlacement="outside"
                                                  name="subdistrict"
                                                  placeholder="แขวง/ตำบล"
                                                />
                                              </div>
                                              <div className="flex gap-4 mt-6">
                                                <Textarea
                                                  classNames={{
                                                    base: "",
                                                    input: "resize-y min-h-[50px]",
                                                  }}
                                                  name='note'
                                                  label="หมายเหตุ"
                                                  labelPlacement="outside"
                                                  placeholder="หมายเหตุ"
                                                  variant="bordered"
                                                />
                                              </div>
                                            </div>
                                          </div>
                                        </Form>
                                      </ModalBody>
                                      <ModalFooter>
                                        <Button color="danger" variant="light" onClick={handleCancel}>
                                          Close
                                        </Button>
                                      </ModalFooter>
                                    </>
                                  )}
                                </ModalContent>
                              </Modal>
                            </div>
                            <AddressPage />
                          </div>
                        </Tab>

                        {/* setting organization */}
                        <Tab key="organization" title="ข้อมูลองค์กร">
                          <h1 className="text-2xl font-bold text-headFont">
                            ข้อมูลองค์กร
                          </h1>
                          <InformationPage />
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

// Table Address
const columns: any = [
  { title: 'ชื่อที่อยู่', dataIndex: 'address' },
  { title: 'บ้านเลขที่', dataIndex: 'housenumber' },
  { title: 'จังหวัด', dataIndex: 'province' },
  { title: 'อำเภอ/เขต', dataIndex: 'district' },
];

const data = [
  {
    id: 1,
    address: 'สำนักงานใหญ่',
    housenumber: '99/6',
    province: 'กรุงเทพมหานคร',
    district: 'จรัญสนิทวงศ์',
  },
  {
    id: 2,
    address: 'สาขา2',
    housenumber: '123/9	',
    province: 'กรุงเทพมหานคร',
    district: 'บางกอกน้อย',
  },
  {
    id: 3,
    address: 'สาขา3',
    housenumber: '867',
    province: 'กรุงเทพมหานคร',
    district: 'บางนา',
  },

];

// Table Setting
const columnsSet: any = [
  { title: 'ชื่อการตั้งค่า', dataIndex: 'setting' },
  { title: 'ภาษา', dataIndex: 'language' },
  { title: 'ธีมสี', dataIndex: 'theme' },
  { title: 'ขนาดตัวอักษร', dataIndex: 'fontsize' },
];

const dataSet = [
  {
    id: 1,
    setting: 'การตั้งค่าที่ 3',
    language: 'th',
    theme: 'light',
    fontsize: 'normal',
  },
  {
    id: 2,
    setting: 'การตั้งค่าที่ 2',
    language: 'en',
    theme: 'light',
    fontsize: 'small',
  },
  {
    id: 3,
    setting: 'การตั้งค่าที่ 3',
    language: 'th',
    theme: 'dark',
    fontsize: 'larg',
  },

];