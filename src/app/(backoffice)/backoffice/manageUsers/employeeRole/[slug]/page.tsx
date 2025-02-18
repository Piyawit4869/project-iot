'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Card, Form, Input, Switch, Textarea } from '@nextui-org/react';
import React from 'react';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';
import { deleteemployeeRole } from '@/pages/api/employeeRole/delete';
import { updateemployeeRole } from '@/pages/api/employeeRole/update';
import getemployeeRole from '@/pages/api/employeeRole/get';
import { Breadcrumb } from '@/components/common/breadcrumb';

export default function RoleCreatePage() {
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;
  const router = useRouter();

  const params = useParams<{ slug: string }>();

  // 🔹 Handles input changes
  const handleChange = (e: any) => {
    const { name, checked, type, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: type === 'checkbox' ? (checked ? 'active' : 'false') : value,
    }));
  };

  React.useEffect(() => {
    if (!params || !params.slug) {
      return;
    }

    const fetchRoleSingle = async () => {
      const data = await getemployeeRole(params.slug);

      setFormData(data.items.data);
    };

    fetchRoleSingle();
  }, [params]);

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
      await updateemployeeRole({}, payload, params?.slug);

      toast.success('🎉 แก้ไขตำแหน่งเรียบร้อย!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });
    } catch (err: any) {
      toast.error('❌ ไม่สามารถแก้ไขตำแหน่งได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      console.error('Send FormData error:', err);
      setErrors({ general: err.message || 'An unexpected error occurred.' });
    }
  };

  const onDelete = async () => {
    try {
      await deleteemployeeRole(params?.slug);

      toast.success('ลบข้อมูลตำแหน่งสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      router.push(`/backoffice/employeeRole`);
    } catch (error) {
      toast.error('❌ ไม่สามารถลบข้อมูลตำแหน่งได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      console.error('Delete error:', error);
    }
  };

  return (
    <div>
      <div className="fixed mt-6 ml-12 top-0 z-10">
        <Breadcrumb title={formData?.name} />
      </div>
      <Scaffold
        child={
          <div>
            {/* 🔹 Page Header */}
            <TopSection
              title="ข้อมูลตำแหน่ง"
              backpath={'/backoffice/manageUsers/employeeRole'}
              buttons={[
                <a key={'create button'}>
                  <Button
                    className="bg-accent1 text-white text-xs"
                    size="sm"
                    type="submit"
                    form="employeeroleForm"
                  >
                    ยืนยัน
                  </Button>
                </a>,
                <a key={'delete button'}>
                  <Button
                    className="bg-accent2 text-white text-xs"
                    size="sm"
                    onClick={onDelete}
                  >
                    ลบ
                  </Button>
                </a>,
              ]}
            />

            {/* 🔹 Form Section */}
            <Card className="p-6 mt-8">
              <Form
                id="employeeroleForm"
                onSubmit={onSubmit}
                method="post"
                className="grid grid-cols-1 gap-4"
                validationErrors={errors}
              >
                {/* 🔹 Section Header */}
                <div className="flex justify-between items-center">
                  <h1 className="flex-1 text-xl font-bold text-headFont">
                    ข้อมูลตำแหน่งพนักงาน
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
                    isSelected={formData.status === 'active'}
                  />
                </div>

                {/* 🔹 Company Name */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Input
                    className="w-full"
                    size="sm"
                    label="ชื่อตำแหน่งพนักงาน"
                    labelPlacement="outside"
                    name="name"
                    placeholder="กรอกชื่อตำแหน่งงาน"
                    value={formData.name}
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
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
              </Form>
            </Card>
          </div>
        }
        backgroundColor={''}
      />
    </div>
  );
}
