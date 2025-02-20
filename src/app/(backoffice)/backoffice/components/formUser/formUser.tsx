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
} from '@nextui-org/react';
import React from 'react';
import { Upload } from '@/components/backoffice/upload';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';

interface FormProps {
  onSubmit: (e: React.FormEvent, formData: any, uploadImg: string) => void;
  role: { id: string; name: string }[];
  employeeRole: { id: string; name: string }[];
  error: {};
}

export const FormUser: React.FC<FormProps> = ({
  onSubmit,
  role,
  employeeRole,
  error,
}) => {
  const [formData, setFormData] = React.useState({}) as any;
  const [uploadImg, setUploadImg] = React.useState('') as any;

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

  const handleUpload = (url: string) => {
    setUploadImg(url);
  };

  const selectedRole = role.find((item) => item.id === formData.role);
  const selectedRoleName = selectedRole ? selectedRole.name : '';

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e, formData, uploadImg);
  };

  return (
    <Scaffold
      child={
        <div>
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
                            imageUrl={formData.photoUrl}
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
                            control="เปิดใช้งาน"
                            onChange={handleChange}
                            isSelected
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
                          name="userName"
                          placeholder="กรอกชื่อผู้ใช้"
                          onChange={handleChange}
                          isRequired
                          errorMessage={'กรุณากรอกชื่อผู้ใช้'}
                        />
                      </div>

                      <div className="flex gap-4 mt-7">
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
                              * ถ้าไม่ใส่รหัสผ่าน รหัสจะถูกสร้างจากชื่อและอีเมล
                            </span>
                          }
                        />
                      </div>

                      <div className="flex">
                        <Select
                          className="flex-1 text-headFont"
                          name="role"
                          placeholder="เลือกตำแหน่ง"
                          label="ตำแหน่ง"
                          labelPlacement={'outside'}
                          onChange={handleChange}
                          // onChange={(e) => handleRoleChange(e.target.value)}
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
                        <div className="flex mt-6">
                          <Select
                            className="flex-1 text-headFont"
                            name="employeeRole"
                            placeholder="เลือกตำแหน่งพนักงาน"
                            label="ตำแหน่งพนักงาน"
                            labelPlacement={'outside'}
                            // onChange={(e) =>
                            //   handleEmployeeRoleChange(e.target.value)
                            // }
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
};

const prefix = [
  { label: 'นาย', value: 'Mr.' },
  { label: 'นาง', value: 'Mrs.' },
  { label: 'นางสาว', value: 'Ms.' },
];
