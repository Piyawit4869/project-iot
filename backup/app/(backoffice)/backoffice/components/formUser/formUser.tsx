'use client';

import CardComponent from '@/components/common/card';
import { CardControl } from '@/components/setting/card-organization';
import {
  Form,
  Select,
  SelectItem,
  Input,
  DatePicker,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import React from 'react';
import { Upload } from '@/components/backoffice/upload';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { parseDate } from '@internationalized/date';

interface FormProps {
  data?: any;
  onSubmit: (e: React.FormEvent, formData: any, uploadImg: string) => void;
  role?: { id: string; name: string }[];
  employeeRole?: { id: string; name: string }[];
  error?: {};
  isCreate?: boolean;
  onDelete?: () => Promise<void>;
  changePass?: (e: React.FormEvent, password: string) => void;
}

const FormUser: React.FC<FormProps> = ({
  data,
  onSubmit,
  role = [],
  employeeRole = [],
  error,
  isCreate,
  onDelete,
  changePass,
}) => {
  const [formData, setFormData] = React.useState({}) as any;
  const [uploadImg, setUploadImg] = React.useState('') as any;
  const [password, setPassword] = React.useState({}) as any;
  const [profile, setProfile] = React.useState({}) as any;

  React.useEffect(() => {
    setProfile(data?.profile);
  }, [data]);

  const handleChange = (e: any) => {
    const { name, type, value, checked } = e.target;

    setFormData((prevData: any) => ({
      ...prevData,
      [name]:
        type === 'checkbox'
          ? checked
          : name === 'startDate' && value instanceof Date
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

  const handleUpload = (url: string) => {
    setUploadImg(url);
  };

  const selectedRole = role.find((item) => item.id === formData.role);
  const selectedRoleName = selectedRole ? selectedRole.name : '';

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e, formData, uploadImg);
  };

  const submitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    changePass?.(e, password);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Scaffold
      child={
        <div>
          {isCreate ? (
            <TopSection
              title="สร้างข้อมูลผู้ใช้"
              backpath={'/backoffice/manageUsers/user'}
              buttons={[
                //submit form where out form
                <Button
                  className="bg-accent1 text-white"
                  type="submit"
                  form="user"
                  key={'create button'}
                >
                  สร้าง
                </Button>,
              ]}
            />
          ) : (
            <TopSection
              title="ข้อมูลผู้ใช้"
              backpath={'/backoffice/manageUsers/user'}
              buttons={[
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
          )}

          <div className="flex space-x-4 mt-6">
            <div className="flex-1">
              <CardComponent
                customCard
                custom={
                  <Form
                    id="user"
                    onSubmit={submitForm}
                    method="post"
                    validationErrors={error}
                  >
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 items-center p-6">
                      <div>
                        <h1 className="text-2xl font-bold text-headFont">
                          ข้อมูลผู้ใช้
                        </h1>
                        <div className="font-bold text-headFon mt-10">
                          <span>รูปภาพผู้ใช้งาน</span>
                          <Upload
                            className="mt-4"
                            imageUrl={profile?.photoUrl}
                            onUpload={handleUpload}
                          />
                        </div>
                      </div>
                      <div className="flex gap-4 mt-6">
                        <div>
                          <CardControl
                            name="active"
                            title="เปิดใช้งาน"
                            description="ใช้สำหรับการปิดหรือยุติการทำงานของผู้ใช้งาน"
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
                          value={data?.email}
                        />
                      </div>
                      <div className="flex gap-4 mt-6">
                        <Input
                          className="flex-1"
                          label={
                            <span className="text-headFont">ชื่อผู้ใช้</span>
                          }
                          labelPlacement="outside"
                          name="userName"
                          placeholder="กรอกชื่อผู้ใช้"
                          onChange={handleChange}
                          isRequired
                          errorMessage={'กรุณากรอกชื่อผู้ใช้'}
                          value={data?.userName}
                        />
                      </div>

                      {isCreate && (
                        <div className="flex gap-4 mt-11 pt-2">
                          <Input
                            className=""
                            label={
                              <span className="text-headFont">รหัสผ่าน</span>
                            }
                            labelPlacement="outside"
                            name="password"
                            placeholder="กรอกรหัสผ่าน"
                            onChange={handleChange}
                            errorMessage={'กรุณากรอกรหัสผ่าน'}
                            description={
                              <span className="text-red-500 ml-2 text-sm">
                                * ถ้าไม่ใส่รหัสผ่าน
                                รหัสจะถูกสร้างจากชื่อและอีเมล
                              </span>
                            }
                          />
                        </div>
                      )}

                      <div className="flex mt-6">
                        <Select
                          className="flex-1 text-headFont"
                          name="role"
                          placeholder="เลือกตำแหน่ง"
                          label="ตำแหน่ง"
                          labelPlacement={'outside'}
                          onChange={handleChange}
                          selectedKeys={[data?.roleId]}
                          isRequired
                          errorMessage={'กรุณาเลือกตำแหน่ง'}
                        >
                          {role.map((item: any) => (
                            <SelectItem
                              className="text-headFont"
                              key={item.id}
                              value={item.id}
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </Select>
                      </div>

                      {(selectedRoleName === 'employee' ||
                        selectedRoleName === 'Internship') && (
                        <div className="flex gap-4 mt-6">
                          <Select
                            className="flex-1 text-headFont"
                            name="employeeRole"
                            placeholder="เลือกตำแหน่งพนักงาน"
                            label="ตำแหน่งพนักงาน"
                            labelPlacement={'outside'}
                            selectedKeys={[data?.employeeRoleId]}
                            onChange={handleChange}
                            isRequired
                            errorMessage={'กรุณาเลือกตำแหน่งพนักงาน'}
                          >
                            {employeeRole.map((item: any) => (
                              <SelectItem
                                className="text-headFont"
                                key={item.id}
                                value={item.id}
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      )}

                      {!isCreate && data?.employeeRoleId !== null && (
                        <div className="flex gap-4 mt-6">
                          <Select
                            className="flex-1  text-headFont"
                            name="position"
                            placeholder="กรุณาเลือกตำแหน่ง"
                            label="ตำแหน่งพนักงาน"
                            selectedKeys={[data?.employeeRoleId]}
                            labelPlacement={'outside'}
                            onChange={handleChange}
                          >
                            {employeeRole.map((item: any) => (
                              <SelectItem
                                className="text-headFont"
                                key={item.id}
                                value={item.id}
                              >
                                {item.name}
                              </SelectItem>
                            ))}
                          </Select>
                        </div>
                      )}

                      <div className="flex gap-4 mt-6">
                        <Select
                          className="flex-1  text-headFont"
                          name="prefix"
                          placeholder="เลือกคำนำหน้า"
                          label="คำนำหน้า"
                          labelPlacement={'outside'}
                          onChange={handleChange}
                          isRequired
                          errorMessage={'กรุณาเลือกคำนำหน้า'}
                          selectedKeys={[profile?.prefix]}
                        >
                          {prefix.map((item: any) => (
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
                          label={<span className="text-headFont">ชื่อ</span>}
                          labelPlacement="outside"
                          name="firstNameTh"
                          placeholder="กรอกชื่อ"
                          onChange={handleChange}
                          isRequired
                          errorMessage={'กรุณากรอกชื่อ'}
                          value={profile?.firstNameTh}
                        />
                      </div>
                      <div className="flex gap-4 mt-6">
                        <Input
                          className="flex-1"
                          label={<span className="text-headFont">นามสกุล</span>}
                          labelPlacement="outside"
                          name="lastNameTh"
                          placeholder="กรอกชื่อ"
                          onChange={handleChange}
                          isRequired
                          errorMessage={'กรุณากรอกชื่อ'}
                          value={profile?.lastNameTh}
                        />
                      </div>
                      <div className="flex gap-4 mt-6">
                        <Input
                          className="flex-1"
                          label={
                            <span className="text-headFont">
                              ชื่อภาษาอังกฤษ
                            </span>
                          }
                          labelPlacement="outside"
                          name="firstName"
                          placeholder="กรอกชื่อภาษาอังกฤษ"
                          onChange={handleChange}
                          isRequired
                          value={profile?.firstName}
                        />
                      </div>
                      <div className="flex gap-4 mt-6">
                        <Input
                          className="flex-1"
                          label={
                            <span className="text-headFont">
                              นามสกุลภาษาอังกฤษ
                            </span>
                          }
                          labelPlacement="outside"
                          name="lastName"
                          placeholder="กรอกนามสกุลภาษาอังกฤษ"
                          onChange={handleChange}
                          isRequired
                          value={profile?.lastName}
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
                            profile?.birthDate
                              ? parseDate(profile.birthDate.split('T')[0])
                              : undefined
                          }
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
                          value={profile?.phone}
                        />
                      </div>

                      {!isCreate && (
                        <div className="gap-4 mt-12 flex">
                          <Button onPress={onOpen}>เปลี่ยนรหัสผ่าน</Button>
                          <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                            <Form
                              id="password"
                              onSubmit={submitPassword}
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
                                        onClick={submitPassword}
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
                      )}
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
};

const prefix = [
  { label: 'นาย', value: 'Mr.' },
  { label: 'นาง', value: 'Mrs.' },
  { label: 'นางสาว', value: 'Ms.' },
];

export default FormUser;
