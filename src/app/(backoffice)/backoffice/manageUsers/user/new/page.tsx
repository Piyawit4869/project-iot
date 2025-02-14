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
} from '@nextui-org/react';
import React from 'react';
import { createUser } from '@/pages/api/user/create';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import paginationRoles from '@/pages/api/role/pagination';
import paginationEmployeeRole from '@/pages/api/employeeRole/pagination';
import { useClientSession } from '@/libs/auth';
import { Upload } from '@/components/backoffice/upload';

export default function CreateUserPage() {
  const [page] = React.useState(1);
  const [rowsPerPage] = React.useState(10);
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;
  const [role, setRole] = React.useState([]) as any;
  const [EmployeeRole, setEmployeeRole] = React.useState([]) as any;
  const [roleSelect, setRoleSelect] = React.useState<string>('');
  const [employeeRoleSelect, setEmployeeRoleSelect] =
    React.useState<string>('');
  const [uploadImg, setUploadImg] = React.useState('') as any;
  const router = useRouter();

  const me = useClientSession();

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
      handleRoleChange,
      handleEmployeeRoleChange,
    }));
  };

  const handleRoleChange = (value: string) => {
    setRoleSelect(value);
    setEmployeeRoleSelect('');
  };

  const handleEmployeeRoleChange = (value: string) => {
    setEmployeeRoleSelect(value);
  };

  const handleUpload = (url: string) => {
    setUploadImg(url);
  };

  const selectedRole = role.find((item: any) => item.id === roleSelect);
  const selectedRoleName = selectedRole ? selectedRole.name : '';

  React.useEffect(() => {
    const fetchRole = async () => {
      const { items: fetchedItems } = await paginationRoles({
        page,
        limit: rowsPerPage,
      });
      setRole(fetchedItems.items);
    };

    const fetchEmployeeRole = async () => {
      const { items: fetchedItems } = await paginationEmployeeRole({
        page,
        limit: rowsPerPage,
      });
      setEmployeeRole(fetchedItems.items);
    };

    fetchRole();
    fetchEmployeeRole();
  }, [page, rowsPerPage]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const requiredFields = [
    //   'email',
    //   'userName',
    //   'prefix',
    //   'position',
    //   'firstNameEn',
    //   'firstName',
    //   'lastNameEn',
    //   'lastName',
    // ];
    // const newErrors: any = {};

    // requiredFields.forEach((field) => {
    //   if (!formData[field] || formData[field].trim() === '') {
    //     newErrors[field] = `Field ${field} is required.`;
    //   }
    // });

    // if (Object.keys(newErrors).length > 0) {
    //   setErrors(newErrors);
    //   return;
    // }

    try {
      const payload = {
        email: formData.email,
        userName: formData.userName,
        password: formData.password,
        active: formData.active,
        status: 'active',
        roleId: roleSelect,
        employeeRoleId: employeeRoleSelect,
        branchId: me?.branchId,
        profile: {
          prefix: formData.prefix,
          firstName: formData.firstName,
          lastName: formData.lastName,
          firstNameTh: formData.firstNameTh,
          lastNameTh: formData.lastNameTh,
          birthDate: formData.birthDate,
          phone: formData.phone,
          photoUrl: uploadImg,
        },
      };

      if (!payload.active) {
        payload.active = false;
      } else {
        payload.active = true;
      }

      const res = await createUser({}, payload);

      toast.success('📝 สร้างข้อมูลผู้ใช้งานสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      router.push(`/backoffice/user/${res.data.id}`);
    } catch (err: any) {
      toast.error('❌ ไม่สามารถสร้างข้อมูลผู้ใช้งานได้', {
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
                    onSubmit={onSubmit}
                    method="post"
                    validationErrors={errors}
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
                          // onChange={handleChange}
                          onChange={(e) => handleRoleChange(e.target.value)}
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
                            onChange={(e) =>
                              handleEmployeeRoleChange(e.target.value)
                            }
                            isRequired
                            errorMessage={'กรุณาเลือกตำแหน่งพนักงาน'}
                          >
                            {EmployeeRole.map((item: any) => (
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
}

const prefix = [
  { label: 'นาย', value: 'Mr.' },
  { label: 'นาง', value: 'Mrs.' },
  { label: 'นางสาว', value: 'Ms.' },
];
