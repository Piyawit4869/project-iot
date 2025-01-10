'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Card, Form, Input, Switch, Textarea } from '@nextui-org/react';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import * as Icon from '@ant-design/icons';
import { updateRole } from '@/pages/api/role/update';
import getRole from '@/pages/api/role/get';
import { deleteRole } from '@/pages/api/role/delete';

export default function RoleUpdatePage() {
  const params = useParams<{ slug?: string }>();
  const [loading, setLoading] = React.useState(false);

  // 🔹 State for form data and errors
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({
    active: false,
    name: '',
    description: '',
  }) as any;

  const router = useRouter();

  // 🔹 Handles input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 🔹 Fetch customer data on component mount
  React.useEffect(() => {
    if (!params || !params.slug) {
      console.error('No slug provided in the URL params.');
      return;
    }

    setLoading(true);

    const fetchData = async () => {
      try {
        const { data } = await getRole(params.slug as string);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  // 🔹 Handles form submission (Updating Customer)
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
      setLoading(false);
      return;
    }

    try {
      // 🔹 Prepare API payload
      const payload = {
        companyName: formData.companyName,
        taxId: formData.taxId,
      };

      // 🔹 Send update request to API
      const { data } = await updateRole({}, payload, params?.slug);

      toast.success('🎉 แก้ไขข้อมูลลูกค้าสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      // 🔹 Redirect after successful update
      router.push(`/admin/customer/${data.id}`);
    } catch (err: any) {
      toast.error('❌ ไม่สามารถแก้ไขข้อมูลลูกค้าได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      console.error('Update error:', err);
      setErrors({ general: err.message || 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handles customer deletion
  const onDelete = async () => {
    try {
      await deleteRole(params?.slug);

      toast.success('🗑️ ลบข้อมูลลูกค้าสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      router.push(`/admin/customer`);
    } catch (error) {
      toast.error('❌ ไม่สามารถลบข้อมูลลูกค้าได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      console.error('Delete error:', error);
    }
  };

  return (
    <Scaffold
      child={
        loading ? (
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative flex flex-col items-center space-y-4">
              {/* Spinner */}
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              {/* Loading Text */}
              <p className="text-gray-600 text-lg font-semibold animate-pulse">
                Loading, please wait...
              </p>
            </div>
          </div>
        ) : (
          <div>
            {/* 🔹 Page Header */}
            <TopSection
              title={
                formData?.companyName
                  ? formData.companyName
                  : 'แก้ไขข้อมูลลูกค้า'
              }
              backpath={'/admin/role'}
              buttons={[
                <Button
                  className="bg-accent1 text-white text-xs"
                  size="sm"
                  type="submit"
                  form="roleForm"
                >
                  แก้ไข
                </Button>,
                <Button
                  className="bg-accent2 text-white text-xs"
                  onClick={onDelete}
                  size="sm"
                >
                  <Icon.DeleteFilled />
                  ลบ
                </Button>,
              ]}
            />

            {/* 🔹 Form Section */}
            <Card className="p-6 mt-6">
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
                <div className="flex items-center gap-4">
                  <span className="text-headFont text-xs">สถานะการใช้งาน</span>
                  <Switch
                    name="active"
                    color="secondary"
                    onChange={handleChange}
                    required
                    defaultChecked
                  />
                </div>

                {/* 🔹 Company Name */}
                <div className="grid grid-cols-2 gap-4">
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
                <div className="grid grid-cols-2 gap-4">
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
        )
      }
      backgroundColor={''}
    />
  );
}
