'use client';

import CardComponent from '@/components/common/card';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import InputSystem from './components/system/InputSystem';
import Inputorganization from './components/Inputorganization';
import InputAddressProps from './components/InputAddress';
import Link from 'next/link';
import * as Icon from '@ant-design/icons';
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
  useDisclosure,
  Select,
  SelectItem,
  TimeInput,
} from '@nextui-org/react';
import React from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import get from '@/pages/api/organization/get';
// import { updatedetails } from '@/pages/api/organization/update-details';
import { toast } from 'sonner';
import { TablePagination } from '@/components/common/tablePagination';
import InputBranch from './components/InputBranch';
import InputTime from './components/system/inputTime';
// import { updatesystem } from '@/pages/api/organization/updata';

export default function OraganizationPage() {
  const [, setLoading] = React.useState(false);
  const [, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;
  const [data, setData] = React.useState() as any;
  // const [dataorg, setDataorg] = React.useState() as any;
  const [organizationData, setOrganizationData] = React.useState() as any;
  const [, setSystemData] = React.useState() as any;
  const [, setOpenDayData] = React.useState<any[]>([]);
  const [, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [meta] = React.useState({
    totalItems: 0,
    itemsPerPage: 10,
    totalPages: 0,
    currentPage: 1,
  });
  const [openEdit, setOpenEdit] = React.useState(false);

  // const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault(); // Prevent the form from submitting to the URL

  //   const formData = new FormData(e.currentTarget);
  //   // Convert formData to an object
  //   const data = Object.fromEntries(formData.entries());
  //   console.log(data); // Log the form data for debugging
  // };

  React.useEffect(() => {
    const getAddress = async () => {
      const { data } = await get();

      setData(data);
      // setDataorg(data.organization);
      setLoading(false);
    };

    getAddress();
  }, []);

  const handleUpadteForm = (updateData: any) => {
    setFormData(updateData);
  };

  const handleOrganization = (updatedData: any) => {
    setOrganizationData(updatedData);
  };

  const handleSystem = (updatedData: any) => {
    setSystemData(updatedData);
  };

  const handleOpenDayChange = (updatedOpenDay: any) => {
    setOpenDayData(updatedOpenDay);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        ...data,
        organization: {
          ...organizationData,
        },
      };

      delete payload.data;

      // const res = await updatedetails({}, payload, dataorg.id);

      toast.success('📝 แก้ไขข้อมูลสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      // router.push(`/backoffice/notation/${res.data.id}`);
    } catch (err: any) {
      toast.error('❌ ไม่สามารถแก้ไขข้อมูลได้', {
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

  // const onSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     const payload = {
  //       ...formData,
  //       ...data,
  //       ...systemData,
  //       ...openDayData,
  //     };

  //     delete payload.data;

  //     const res = await updatesystem({}, payload);
  //     console.log('ข้อมูลที่จะส่ง', res);

  //     toast.success('📝 แก้ไขข้อมูลสำเร็จ!', {
  //       duration: 3000,
  //       position: 'bottom-left',
  //       style: { fontFamily: 'var(--font-ibm-sans)' },
  //     });

  //     // router.push(`/backoffice/notation/${res.data.id}`);
  //   } catch (err: any) {
  //     toast.error('❌ ไม่สามารถแก้ไขข้อมูลได้', {
  //       duration: 3000,
  //       position: 'bottom-left',
  //       style: { fontFamily: 'var(--font-ibm-sans)' },
  //     });

  //     console.error('Send FormData error:', err);
  //     setErrors({ general: err.message || 'An unexpected error occurred.' });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const [items, setItems] = React.useState([{ description: '', amount: '' }]);
  // Add Setting Time
  const handleAddItem = () => {
    setItems([...items, { description: '', amount: '' }]);
  };
  // Remove Setting Time
  const handleRemoveItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  // Modal View Address
  const {
    isOpen: isOpenAddress,
    onOpen: openAddress,
    onOpenChange: onChange1,
  } = useDisclosure();
  // Modal Create Address
  const {
    isOpen: isOpenAddress1,
    onOpen: openAddress1,
    onOpenChange: onChange2,
  } = useDisclosure();
  // Modal View Detail Address
  const {
    isOpen: isOpenAddress2,
    // onOpen: openAddress2,
    onOpenChange: onChange3,
  } = useDisclosure();

  // Modal View Setting
  const {
    isOpen: isOpenSetting,
    onOpen: openSetting1,
    onOpenChange: onChangeSetting1,
  } = useDisclosure();
  // Modal Create Setting
  const {
    isOpen: isOpenSetting1,
    onOpen: openSetting2,
    onOpenChange: onChangeSetting2,
  } = useDisclosure();
  // Modal View Detail Setting
  const { isOpen: isOpenSetting2, onOpenChange: onChangeSetting3 } =
    useDisclosure();

  const [selectedItem] = React.useState<any>(null);

  // const handleRowAddress = (row: any) => {
  //   setSelectedItem(row);
  //   openAddress2();
  // };

  // const handleRowSetting = (row: any) => {
  //   setSelectedItem(row);
  //   openSetting3();
  // };

  const toggleInput = () => {
    setOpenEdit((prev) => !prev);
  };

  // const handleEditButton = (openEdit: boolean) => {
  //   return openEdit ? (
  //     <Button
  //       className="bg-accent1 text-white text-xs"
  //       key={'submit edit button'}
  //       type="submit"
  //       form="notation"
  //       // disabled={formData?.docStatus === 'canceled'}
  //     >
  //       ยืนยันแก้ไขข้อมูล
  //     </Button>
  //   ) : (
  //     <Button
  //       className="bg-accent3 text-white text-xs"
  //       key={'edit button'}
  //       onClick={() => {
  //         setOpenEdit(true);
  //       }}
  //       // disabled={formData?.docStatus === 'canceled'}
  //     >
  //       แก้ไขข้อมูล
  //     </Button>
  //   );
  // };

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="ข้อมูลองค์กร"
            buttons={[
              <Link href={''} key={'organization'}>
                <Button
                  className="bg-accent1 text-white"
                  key={'Edit organization'}
                  type="submit"
                  form="organization"
                >
                  ยืนยันแก้ไขข้อมูล
                </Button>
              </Link>,
            ]}
          />
          <div className="flex space-x-4 mt-6">
            <div className="flex-1">
              <Form id="organization" onSubmit={onSubmit} method="post">
                <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
                  <Tabs variant="underlined">
                    <Tab key="setting" title="การตั้งค่าระบบ">
                      <div className="flex space-x-4">
                        <CardComponent
                          className={'basis-2/3'}
                          customCard
                          custom={
                            <div>
                              <div className="flex justify-between p-6">
                                <h1 className="text-2xl font-bold text-headFont">
                                  ตั้งค่าระบบ
                                </h1>
                                <div className="">
                                  <Button
                                    className="bg-accent3 text-white mr-3"
                                    onClick={toggleInput}
                                  >
                                    แก้ไข
                                  </Button>
                                  <Button
                                    className="bg-accent1 text-white"
                                    onPress={openSetting1}
                                  >
                                    ดูการตั้งค่าทั้งหมด
                                  </Button>
                                </div>
                              </div>
                              <Modal
                                size="5xl"
                                isOpen={isOpenSetting}
                                onOpenChange={onChangeSetting1}
                              >
                                <ModalContent>
                                  {() => (
                                    <>
                                      <ModalHeader className="flex flex-col-1 gap-1">
                                        การตั้งค่าทั้งหมด
                                      </ModalHeader>
                                      <ModalBody>
                                        <div>
                                          <Button
                                            className="bg-accent1 text-white"
                                            onPress={openSetting2}
                                          >
                                            สร้างการตั้งค่าใหม่
                                          </Button>
                                        </div>
                                        <div className="mb-4">
                                          <div className="mt-4">
                                            <TablePagination
                                              initialRows={dataSet}
                                              initialMeta={meta}
                                              rowsPerPage={rowsPerPage}
                                              columns={columnsSet}
                                              onPageChange={(newPage) =>
                                                setPage(newPage)
                                              }
                                              onRowsPerPageChange={(
                                                newRowsPerPage,
                                              ) =>
                                                setRowsPerPage(newRowsPerPage)
                                              }
                                            />
                                          </div>
                                        </div>
                                      </ModalBody>
                                    </>
                                  )}
                                </ModalContent>
                              </Modal>

                              <Modal
                                size="5xl"
                                className="height-500"
                                isOpen={isOpenSetting1}
                                onOpenChange={onChangeSetting2}
                              >
                                <ModalContent>
                                  {() => (
                                    <>
                                      <ModalHeader className="flex flex-col gap-1">
                                        สร้างการตั้งค่าใหม่
                                      </ModalHeader>
                                      <ModalBody>
                                        <Form
                                          id="create-setting"
                                          // onSubmit={onSubmit}
                                          // method="post"
                                        >
                                          <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
                                            <div className="flex gap-4 mt-6">
                                              <Select
                                                className="flex-1  text-headFont"
                                                name="language"
                                                placeholder="เลือกภาษา"
                                                label="ภาษา"
                                                labelPlacement={'outside'}
                                              >
                                                {language.map((item: any) => (
                                                  <SelectItem
                                                    className="text-headFont"
                                                    key={item.label}
                                                    value={item.value}
                                                  >
                                                    {item.label}
                                                  </SelectItem>
                                                ))}
                                              </Select>
                                              <Select
                                                className="flex-1  text-headFont"
                                                name="theme"
                                                placeholder="เลือกธีม"
                                                label="ธีมสี"
                                                labelPlacement={'outside'}
                                              >
                                                {theme.map((item: any) => (
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
                                                className="flex-1 text-headFont"
                                                name="fontsize"
                                                placeholder="เลือกขนาดตัวอักษร"
                                                label="ขนาดตัวอักษร"
                                                labelPlacement={'outside'}
                                              >
                                                {fontSize.map((item: any) => (
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
                                            {items.map((_: any, index: any) => (
                                              <div
                                                key={index}
                                                className="flex items-center gap-6 mt-6"
                                              >
                                                <Select
                                                  className="flex-1 text-headFont"
                                                  name="day"
                                                  placeholder="เลือกวันทำงาน"
                                                  label="วันทำงาน"
                                                  labelPlacement={'outside'}
                                                >
                                                  {day.map((item: any) => (
                                                    <SelectItem
                                                      className="flex-1 text-headFont"
                                                      key={item.label}
                                                      value={item.value}
                                                    >
                                                      {item.label}
                                                    </SelectItem>
                                                  ))}
                                                </Select>
                                                <TimeInput
                                                  className="flex-1"
                                                  label={
                                                    <span className="flex-1 text-headFont">
                                                      เริ่มงาน
                                                    </span>
                                                  }
                                                  labelPlacement="outside"
                                                  name="starttime"
                                                />
                                                <TimeInput
                                                  className="flex-1"
                                                  label={
                                                    <span className="flex-1 text-headFont">
                                                      เลิกงาน
                                                    </span>
                                                  }
                                                  labelPlacement="outside"
                                                  name="outtime"
                                                />
                                                <a
                                                  className="text-red-500 cursor-pointer mt-6"
                                                  onClick={() =>
                                                    handleRemoveItem(index)
                                                  }
                                                >
                                                  ลบรายการ
                                                </a>
                                              </div>
                                            ))}
                                            <div className="flex  gap-4 mt-6">
                                              <Button
                                                type="button"
                                                className="bg-accent3 text-white w-full"
                                                onClick={handleAddItem}
                                              >
                                                <Icon.PlusSquareOutlined className="text-xl" />
                                                เพิ่มวันทำงาน
                                              </Button>
                                            </div>
                                          </div>
                                        </Form>
                                      </ModalBody>
                                      <ModalFooter>
                                        <Button
                                          className="bg-accent1 text-white"
                                          // type="submit"
                                          form="create-setting"
                                          onClick={onChangeSetting2}
                                        >
                                          สร้าง
                                        </Button>
                                      </ModalFooter>
                                    </>
                                  )}
                                </ModalContent>
                              </Modal>

                              <Modal
                                size="5xl"
                                className="height-500"
                                isOpen={isOpenSetting2}
                                onOpenChange={onChangeSetting3}
                              >
                                <ModalContent>
                                  {() => (
                                    <>
                                      <ModalHeader className="flex flex-col gap-1">
                                        การตั้งค่าครั้งที่ {selectedItem?.id}
                                      </ModalHeader>
                                      <ModalBody>
                                        <Form
                                          id="edit-setting"
                                          onSubmit={onSubmit}
                                          method="post"
                                        >
                                          <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
                                            <div className="flex gap-4 mt-6">
                                              <Select
                                                className="flex-1  text-headFont"
                                                name="language"
                                                placeholder="เลือกภาษา"
                                                label="ภาษา"
                                                labelPlacement={'outside'}
                                              >
                                                {language.map((item: any) => (
                                                  <SelectItem
                                                    className="text-headFont"
                                                    key={item.label}
                                                    value={item.value}
                                                  >
                                                    {item.label}
                                                  </SelectItem>
                                                ))}
                                              </Select>
                                              <Select
                                                className="flex-1  text-headFont"
                                                name="theme"
                                                placeholder="เลือกธีม"
                                                label="ธีมสี"
                                                labelPlacement={'outside'}
                                              >
                                                {theme.map((item: any) => (
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
                                                className="flex-1 text-headFont"
                                                name="fontsize"
                                                placeholder="เลือกขนาดตัวอักษร"
                                                label="ขนาดตัวอักษร"
                                                labelPlacement={'outside'}
                                              >
                                                {fontSize.map((item: any) => (
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
                                            {items.map((_: any, index: any) => (
                                              <div
                                                key={index}
                                                className="flex items-center gap-6 mt-6"
                                              >
                                                <Select
                                                  className="flex-1 text-headFont"
                                                  name="day"
                                                  placeholder="เลือกวันทำงาน"
                                                  label="วันทำงาน"
                                                  labelPlacement={'outside'}
                                                >
                                                  {day.map((item: any) => (
                                                    <SelectItem
                                                      className="flex-1 text-headFont"
                                                      key={item.label}
                                                      value={item.value}
                                                    >
                                                      {item.label}
                                                    </SelectItem>
                                                  ))}
                                                </Select>
                                                <TimeInput
                                                  className="flex-1"
                                                  label={
                                                    <span className="flex-1 text-headFont">
                                                      เริ่มงาน
                                                    </span>
                                                  }
                                                  labelPlacement="outside"
                                                  name="starttime"
                                                />
                                                <TimeInput
                                                  className="flex-1"
                                                  label={
                                                    <span className="flex-1 text-headFont">
                                                      เลิกงาน
                                                    </span>
                                                  }
                                                  labelPlacement="outside"
                                                  name="outtime"
                                                />
                                                <a
                                                  className="text-red-500 cursor-pointer mt-6"
                                                  onClick={() =>
                                                    handleRemoveItem(index)
                                                  }
                                                >
                                                  ลบรายการ
                                                </a>
                                              </div>
                                            ))}
                                            <div className="flex  gap-4 mt-6">
                                              <Button
                                                type="button"
                                                className="bg-secondary text-white w-full"
                                                onClick={handleAddItem}
                                              >
                                                <Icon.PlusSquareOutlined className="text-xl" />
                                                เพิ่มวันทำงาน
                                              </Button>
                                            </div>
                                          </div>
                                        </Form>
                                      </ModalBody>
                                      <ModalFooter>
                                        <Button
                                          className="bg-accent1 text-white"
                                          type="submit"
                                          form="edit-setting"
                                        >
                                          แกไข
                                        </Button>
                                        <Button className="bg-accent2 text-white">
                                          ลบ
                                        </Button>
                                      </ModalFooter>
                                    </>
                                  )}
                                </ModalContent>
                              </Modal>
                              <InputSystem
                                data={data}
                                onChange={handleSystem}
                                onChangeTime={handleOpenDayChange}
                                openEdit={openEdit}
                              />
                            </div>
                          }
                        />
                        <CardComponent
                          className={'basis-2/3'}
                          customCard
                          custom={
                            <div>
                              <div className="p-6">
                                <h1 className="text-2xl font-bold text-headFont">
                                  ตั้งค่าเวลา
                                </h1>
                              </div>

                              <InputTime
                                data={data}
                                onChange={handleSystem}
                                onChangeTime={handleOpenDayChange}
                                openEdit={openEdit}
                              />
                            </div>
                          }
                        />
                      </div>
                    </Tab>

                    {/* Setting Address */}
                    <Tab key="address" title="ข้อมูลที่อยู่">
                      <div>
                        <div className="flex justify-between p-6">
                          <h1 className="text-2xl font-bold text-headFont">
                            ข้อมูลที่อยู่องค์กร
                          </h1>
                          <div className="mr-10">
                            <Button
                              className="bg-accent3 text-white mr-3"
                              onClick={toggleInput}
                            >
                              แก้ไข
                            </Button>
                            <Button
                              className="bg-accent1 text-white"
                              onPress={openAddress}
                            >
                              ดูที่อยู่ทั้งหมด
                            </Button>
                          </div>

                          <Modal
                            size="5xl"
                            isOpen={isOpenAddress}
                            onOpenChange={onChange1}
                          >
                            <ModalContent>
                              {() => (
                                <>
                                  <ModalHeader className="flex flex-col-1 gap-1">
                                    ที่อยู่ทั้งหมด
                                  </ModalHeader>
                                  <ModalBody>
                                    <div>
                                      <Button
                                        className="bg-accent1 text-white"
                                        onPress={openAddress1}
                                      >
                                        สร้างที่อยู่ใหม่
                                      </Button>
                                    </div>
                                    <div className="mb-4">
                                      <TablePagination
                                        initialRows={dataAddress}
                                        initialMeta={meta}
                                        rowsPerPage={rowsPerPage}
                                        columns={columns}
                                        onPageChange={(newPage) =>
                                          setPage(newPage)
                                        }
                                        onRowsPerPageChange={(newRowsPerPage) =>
                                          setRowsPerPage(newRowsPerPage)
                                        }
                                      />
                                    </div>
                                  </ModalBody>
                                </>
                              )}
                            </ModalContent>
                          </Modal>

                          <Modal
                            size="5xl"
                            className="height-500"
                            isOpen={isOpenAddress1}
                            onOpenChange={onChange2}
                          >
                            <ModalContent>
                              {() => (
                                <>
                                  <ModalHeader className="flex flex-col gap-1">
                                    สร้างที่อยู่ใหม่
                                  </ModalHeader>
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
                                              <span className="text-headFont">
                                                เมือง
                                              </span>
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
                                              <span className="text-headFont">
                                                จังหวัด
                                              </span>
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
                                            placeholder="ชื่อรหัสไปรษณีย์"
                                          />
                                        </div>

                                        <div className="flex gap-4 mt-6">
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                เลขห้อง
                                              </span>
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
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                หมู่บ้าน
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="village"
                                            placeholder="หมู่บ้าน"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                เลขหมู่บ้าน
                                              </span>
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
                                              <span className="text-headFont">
                                                บ้านเลขที่
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="housenumber"
                                            placeholder="บ้านเลขที่"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                ตรอก
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="alley"
                                            placeholder="ตรอก"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                ถนน
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="road"
                                            placeholder="ถนน"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                อาคาร
                                              </span>
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
                                              <span className="text-headFont">
                                                ประเทศ
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="country"
                                            placeholder="ประเทศ"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                เขต/อำเภอ
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="district"
                                            placeholder="เขต/อำเภอ"
                                          />
                                        </div>
                                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                          <div className="flex gap-4 mt-6">
                                            <Input
                                              className="flex-1"
                                              label={
                                                <span className="text-headFont">
                                                  แขวง/ตำบล
                                                </span>
                                              }
                                              labelPlacement="outside"
                                              name="subdistrict"
                                              placeholder="แขวง/ตำบล"
                                            />
                                          </div>
                                          <div className="flex gap-4 mt-6">
                                            <Textarea
                                              classNames={{
                                                base: '',
                                                input: 'resize-y min-h-[50px]',
                                              }}
                                              name="note"
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
                                    <Button
                                      className="bg-accent1 text-white"
                                      type="submit"
                                      form="create-address"
                                    >
                                      สร้าง
                                    </Button>
                                  </ModalFooter>
                                </>
                              )}
                            </ModalContent>
                          </Modal>

                          <Modal
                            size="5xl"
                            className="height-500"
                            isOpen={isOpenAddress2}
                            onOpenChange={onChange3}
                          >
                            <ModalContent>
                              {() => (
                                <>
                                  <ModalHeader className="flex flex-col gap-1">
                                    ที่อยู่ที่ {selectedItem?.id}
                                  </ModalHeader>
                                  <ModalBody>
                                    <Form
                                      id="edit-address"
                                      onSubmit={onSubmit}
                                      method="post"
                                    >
                                      <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
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
                                              <span className="text-headFont">
                                                เมือง
                                              </span>
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
                                              <span className="text-headFont">
                                                จังหวัด
                                              </span>
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
                                            placeholder="ชื่อรหัสไปรษณีย์"
                                          />
                                        </div>

                                        <div className="flex gap-4 mt-6">
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                เลขห้อง
                                              </span>
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
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                หมู่บ้าน
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="village"
                                            placeholder="หมู่บ้าน"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                เลขหมู่บ้าน
                                              </span>
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
                                              <span className="text-headFont">
                                                บ้านเลขที่
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="housenumber"
                                            placeholder="บ้านเลขที่"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                ตรอก
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="alley"
                                            placeholder="ตรอก"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                ถนน
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="road"
                                            placeholder="ถนน"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                อาคาร
                                              </span>
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
                                              <span className="text-headFont">
                                                ประเทศ
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="country"
                                            placeholder="ประเทศ"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                เขต/อำเภอ
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="district"
                                            placeholder="เขต/อำเภอ"
                                          />
                                        </div>
                                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                          <div className="flex gap-4 mt-6">
                                            <Input
                                              className="flex-1"
                                              label={
                                                <span className="text-headFont">
                                                  แขวง/ตำบล
                                                </span>
                                              }
                                              labelPlacement="outside"
                                              name="subdistrict"
                                              placeholder="แขวง/ตำบล"
                                            />
                                          </div>
                                          <div className="flex gap-4 mt-6">
                                            <Textarea
                                              classNames={{
                                                base: '',
                                                input: 'resize-y min-h-[50px]',
                                              }}
                                              name="note"
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
                                    <Button
                                      className="bg-accent1 text-white"
                                      type="submit"
                                      form="edit-address"
                                    >
                                      แก้ไข
                                    </Button>
                                    <Button className="bg-accent2 text-white">
                                      ลบ
                                    </Button>
                                  </ModalFooter>
                                </>
                              )}
                            </ModalContent>
                          </Modal>
                        </div>
                        <InputAddressProps
                          data={data}
                          onChange={handleUpadteForm}
                          openEdit={openEdit}
                        />
                      </div>
                    </Tab>

                    {/* setting Branch */}
                    <Tab key="branch" title="ข้อมูลสาขา">
                      <div>
                        <div className="flex justify-between p-6">
                          <h1 className="text-2xl font-bold text-headFont">
                            ข้อมูลสาขา
                          </h1>
                          <div className="mr-10">
                            <Button
                              className="bg-accent3 text-white mr-3"
                              onClick={toggleInput}
                            >
                              แก้ไข
                            </Button>
                          </div>

                          <Modal
                            size="5xl"
                            isOpen={isOpenAddress}
                            onOpenChange={onChange1}
                          >
                            <ModalContent>
                              {() => (
                                <>
                                  <ModalHeader className="flex flex-col-1 gap-1">
                                    ที่อยู่ทั้งหมด
                                  </ModalHeader>
                                  <ModalBody>
                                    <div>
                                      <Button
                                        className="bg-accent1 text-white"
                                        onPress={openAddress1}
                                      >
                                        สร้างที่อยู่ใหม่
                                      </Button>
                                    </div>
                                    <div className="mb-4">
                                      {/* <NextTable
                                            columns={columns}
                                            rows={dataAddress}
                                            rowClickHandler={handleRowAddress}
                                          /> */}
                                      <TablePagination
                                        initialRows={dataAddress}
                                        initialMeta={meta}
                                        rowsPerPage={rowsPerPage}
                                        columns={columns}
                                        onPageChange={(newPage) =>
                                          setPage(newPage)
                                        }
                                        onRowsPerPageChange={(newRowsPerPage) =>
                                          setRowsPerPage(newRowsPerPage)
                                        }
                                      />
                                    </div>
                                  </ModalBody>
                                </>
                              )}
                            </ModalContent>
                          </Modal>

                          <Modal
                            size="5xl"
                            className="height-500"
                            isOpen={isOpenAddress1}
                            onOpenChange={onChange2}
                          >
                            <ModalContent>
                              {() => (
                                <>
                                  <ModalHeader className="flex flex-col gap-1">
                                    สร้างที่อยู่ใหม่
                                  </ModalHeader>
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
                                              <span className="text-headFont">
                                                เมือง
                                              </span>
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
                                              <span className="text-headFont">
                                                จังหวัด
                                              </span>
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
                                            placeholder="ชื่อรหัสไปรษณีย์"
                                          />
                                        </div>

                                        <div className="flex gap-4 mt-6">
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                เลขห้อง
                                              </span>
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
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                หมู่บ้าน
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="village"
                                            placeholder="หมู่บ้าน"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                เลขหมู่บ้าน
                                              </span>
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
                                              <span className="text-headFont">
                                                บ้านเลขที่
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="housenumber"
                                            placeholder="บ้านเลขที่"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                ตรอก
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="alley"
                                            placeholder="ตรอก"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                ถนน
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="road"
                                            placeholder="ถนน"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                อาคาร
                                              </span>
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
                                              <span className="text-headFont">
                                                ประเทศ
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="country"
                                            placeholder="ประเทศ"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                เขต/อำเภอ
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="district"
                                            placeholder="เขต/อำเภอ"
                                          />
                                        </div>
                                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                          <div className="flex gap-4 mt-6">
                                            <Input
                                              className="flex-1"
                                              label={
                                                <span className="text-headFont">
                                                  แขวง/ตำบล
                                                </span>
                                              }
                                              labelPlacement="outside"
                                              name="subdistrict"
                                              placeholder="แขวง/ตำบล"
                                            />
                                          </div>
                                          <div className="flex gap-4 mt-6">
                                            <Textarea
                                              classNames={{
                                                base: '',
                                                input: 'resize-y min-h-[50px]',
                                              }}
                                              name="note"
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
                                    <Button
                                      className="bg-accent1 text-white"
                                      type="submit"
                                      form="create-address"
                                    >
                                      สร้าง
                                    </Button>
                                  </ModalFooter>
                                </>
                              )}
                            </ModalContent>
                          </Modal>

                          <Modal
                            size="5xl"
                            className="height-500"
                            isOpen={isOpenAddress2}
                            onOpenChange={onChange3}
                          >
                            <ModalContent>
                              {() => (
                                <>
                                  <ModalHeader className="flex flex-col gap-1">
                                    ที่อยู่ที่ {selectedItem?.id}
                                  </ModalHeader>
                                  <ModalBody>
                                    <Form
                                      id="edit-address"
                                      onSubmit={onSubmit}
                                      method="post"
                                    >
                                      <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
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
                                              <span className="text-headFont">
                                                เมือง
                                              </span>
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
                                              <span className="text-headFont">
                                                จังหวัด
                                              </span>
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
                                            placeholder="ชื่อรหัสไปรษณีย์"
                                          />
                                        </div>

                                        <div className="flex gap-4 mt-6">
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                เลขห้อง
                                              </span>
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
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                หมู่บ้าน
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="village"
                                            placeholder="หมู่บ้าน"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                เลขหมู่บ้าน
                                              </span>
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
                                              <span className="text-headFont">
                                                บ้านเลขที่
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="housenumber"
                                            placeholder="บ้านเลขที่"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                ตรอก
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="alley"
                                            placeholder="ตรอก"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                ถนน
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="road"
                                            placeholder="ถนน"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                อาคาร
                                              </span>
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
                                              <span className="text-headFont">
                                                ประเทศ
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="country"
                                            placeholder="ประเทศ"
                                          />
                                          <Input
                                            className="flex-1"
                                            label={
                                              <span className="text-headFont">
                                                เขต/อำเภอ
                                              </span>
                                            }
                                            labelPlacement="outside"
                                            name="district"
                                            placeholder="เขต/อำเภอ"
                                          />
                                        </div>
                                        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                                          <div className="flex gap-4 mt-6">
                                            <Input
                                              className="flex-1"
                                              label={
                                                <span className="text-headFont">
                                                  แขวง/ตำบล
                                                </span>
                                              }
                                              labelPlacement="outside"
                                              name="subdistrict"
                                              placeholder="แขวง/ตำบล"
                                            />
                                          </div>
                                          <div className="flex gap-4 mt-6">
                                            <Textarea
                                              classNames={{
                                                base: '',
                                                input: 'resize-y min-h-[50px]',
                                              }}
                                              name="note"
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
                                    <Button
                                      className="bg-accent1 text-white"
                                      type="submit"
                                      form="edit-address"
                                    >
                                      แก้ไข
                                    </Button>
                                    <Button className="bg-accent2 text-white">
                                      ลบ
                                    </Button>
                                  </ModalFooter>
                                </>
                              )}
                            </ModalContent>
                          </Modal>
                        </div>
                        <InputBranch
                          data={data}
                          onChange={handleUpadteForm}
                          openEdit={openEdit}
                        />
                      </div>
                    </Tab>

                    {/* Setting organization */}
                    <Tab key="organization" title="ข้อมูลองค์กร">
                      <div className="flex justify-between p-6">
                        <h1 className="text-2xl font-bold text-headFont">
                          ข้อมูลองค์กร
                        </h1>
                        <div className="">
                          <Button
                            className="bg-accent3 text-white mr-3"
                            onClick={toggleInput}
                          >
                            แก้ไข
                          </Button>
                        </div>
                      </div>
                      <Inputorganization
                        data={data}
                        onChange={handleOrganization}
                        openEdit={openEdit}
                      />
                    </Tab>
                  </Tabs>
                </div>
              </Form>
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
  {
    title: 'เปลี่ยนที่อยู่หลัก',
    dataIndex: 'isMain',
    render: () => (
      <Button className="bg-headFont text-white" size="sm">
        ตั้งเป็นที่อยู่หลัก
      </Button>
    ),
  },
  {
    title: 'ลบ',
    dataIndex: 'delete',
    render: () => <Icon.DeleteOutlined className="ml-0.5 text-red-500" />,
  },
];

const dataAddress = [
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
    setting: 'การตั้งค่าที่ 1',
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

const language = [
  { label: 'ภาษาไทย', value: '1' },
  { label: 'ภาษาอังกฤษ', value: '2' },
];

const theme = [
  { label: 'สว่าง', value: '1' },
  { label: 'มืด', value: '2' },
];

const fontSize = [
  { label: 'ขนาดใหญ่', value: '1' },
  { label: 'ปกติ', value: '2' },
  { label: 'ขนาดเล็ก', value: '3' },
];

const day = [
  { label: 'Sunday', value: '1' },
  { label: 'Mondey', value: '2' },
  { label: 'Tuesday', value: '3' },
  { label: 'Wednesday', value: '4' },
  { label: 'Thursday', value: '5' },
  { label: 'Friday', value: '6' },
  { label: 'Saturday', value: '7' },
];
