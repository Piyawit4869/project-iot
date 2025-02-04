'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Card, Form, Input, Switch, Textarea } from '@nextui-org/react';
import React from 'react';
import { toast } from 'sonner';
import { createRole } from '@/pages/api/role/create';
import { useRouter } from 'next/navigation';

export default function RoleCreatePage() {
  // 🔹 State for form data and errors
  const router = useRouter();
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;

  // 🔹 Handles input changes
  const handleChange = (e: any) => {
    const { name, checked, type, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]:
        type === 'checkbox'
          ? checked
            ? 'active'
            : 'false'
          : name === 'birthDate' && value instanceof Date
          ? value.toISOString()
          : value,
    }));
  };

  // 🔹 Handles form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔹 Required fields validation
    const requiredFields = ['name'];
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
        ...formData,
      };

      // 🔹 Send data to API
      const data = await createRole({}, payload);
      console.log(data);

      toast.success('🎉 ตำแหน่งใหม่ถูกสร้าง!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      router.push(`/backoffice/role/${data.items.id}`);
    } catch (err: any) {
      toast.error('❌ ไม่สามารถสร้างตำแหน่งใหม่ได้ได้', {
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
          {/* 🔹 Page Header */}
          <TopSection
            title="สร้างตำแหน่ง"
            backpath={'/backoffice/role'}
            buttons={[
              <a key={'create button'}>
                <Button
                  className="bg-accent1 text-white text-xs"
                  size="sm"
                  type="submit"
                  form="roleForm"
                >
                  สร้าง
                </Button>
              </a>,
            ]}
          />

          {/* 🔹 Form Section */}
          <Card className="p-6 mt-8">
            <Form
              id="roleForm"
              onSubmit={onSubmit}
              method="post"
              className="grid grid-cols-1 gap-4"
              validationErrors={errors}
            >
              {/* 🔹 Section Header */}
              <div className="flex justify-between items-center">
                <h1 className="flex-1 text-xl font-bold text-headFont">
                  ข้อมูลตำแหน่งงาน
                </h1>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-headFont text-xs">สถานะการใช้งาน</span>
                <Switch
                  type="checkbox"
                  name="status"
                  color="secondary"
                  onChange={handleChange}
                  required
                  defaultChecked
                />
              </div>

              {/* 🔹 Company Name */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Input
                  className="w-full"
                  size="sm"
                  label="ชื่อตำแหน่งงาน"
                  labelPlacement="outside"
                  name="name"
                  placeholder="กรอกชื่อตำแหน่งงาน"
                  onChange={handleChange}
                  isRequired
                  errorMessage={'กรุณากรอกชื่อตำแหน่งงาน'}
                />
              </div>

              {/* 🔹 Tax ID */}
              <div className="grid grid-cols-2 gap-4 mt-5">
                <Textarea
                  className="w-full"
                  size="sm"
                  label="รายละเอียด"
                  labelPlacement="outside"
                  name="description"
                  placeholder="กรอกรายละเอียด"
                  onChange={handleChange}
                />
              </div>
            </Form>
          </Card>
        </div>
      }
      backgroundColor={''}
    />
  );
}
