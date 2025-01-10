'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Card, Form, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import getItem from '@/pages/api/items/get';
import * as Icon from '@ant-design/icons';
import { deleteItem } from '@/pages/api/items/delete';
import { updateItem } from '@/pages/api/items/update';

export default function ItemUpdatePage() {
  const params = useParams<{ slug?: string }>();
  const [loading, setLoading] = React.useState(false);

  // 🔹 State for form data and errors
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({
    quantity: 1, // Default value
    unitPrice: 0,
    discount: 0,
    total: 0, // Auto-calculated field
  }) as any;

  const router = useRouter();

  // 🔹 Handles input changes for text, number, checkbox, and date fields
  const handleChange = (e: any) => {
    const { name, checked, type, value } = e.target;
    setFormData((prevData: any) => {
      const newData = {
        ...prevData,
        [name]:
          type === 'checkbox'
            ? checked
            : type === 'number'
            ? parseFloat(value) || 0 // Ensure number fields are parsed correctly
            : value,
      };

      // 🔹 Ensure all required values exist before calculating the total
      const quantity = newData.quantity || 0;
      const unitPrice = newData.unitPrice || 0;
      const discount = newData.discount || 0;

      newData.total = Math.max(0, quantity * unitPrice - discount); // Ensure total is never negative
      return newData;
    });
  };

  const onDelete = async () => {
    try {
      await deleteItem(params?.slug);

      toast.success('ลบสินค้าและบริการสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      router.push(`/admin/item`);
    } catch (error) {
      toast.error('❌ ไม่สามารถลบสินค้าและบริการได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      console.error('Delete error:', error);
    }
  };

  // 🔹 Handles form submission
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
      const payload = {
        ...formData,
        active: !!formData.active, // Ensure active is always boolean
      };

      // 🔹 Send data to API
      const { data } = await updateItem({}, payload, params?.slug);

      toast.success('🎉 แก้ไขสินค้าและบริการสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      // 🔹 Redirect after successful creation
      router.push(`/admin/item/${data.id}`);
    } catch (err: any) {
      toast.error('❌ ไม่สามารถแก้ไขสินค้าและบริการได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      console.error('Send FormData error:', err);
      setErrors({ general: err.message || 'An unexpected error occurred.' });
    }
  };

  React.useEffect(() => {
    if (!params || !params.slug) {
      console.error('No slug provided in the URL params.');
      return;
    }

    setLoading(true);

    const fetchData = async () => {
      const { data } = await getItem(params.slug as string);

      setFormData(data);
      setLoading(false);
    };

    fetchData();
  }, [params]);

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
                formData?.name ? formData.name : 'แก้ไขข้อมูลสินค้าและบริการ'
              }
              backpath={'/admin/item'}
              buttons={[
                <a key={'create button'}>
                  <Button
                    className="bg-accent1 text-white text-xs"
                    size="sm"
                    type="submit"
                    form="item"
                  >
                    แก้ไข
                  </Button>
                </a>,
                <Button
                  className={`bg-accent2 text-white text-xs`}
                  key={'delete button'}
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
                id="item"
                onSubmit={onSubmit}
                method="post"
                className="grid grid-cols-1 gap-4"
                validationErrors={errors}
              >
                {/* 🔹 Section Header */}
                <div className="flex justify-between items-center">
                  <h1 className="flex-1 text-md font-bold text-headFont">
                    ข้อมูลสินค้าและบริการ
                  </h1>
                </div>

                {/* 🔹 Name Input */}
                <Input
                  className="w-full"
                  size="sm"
                  label="ชื่อสินค้าและบริการ"
                  labelPlacement="outside"
                  name="name"
                  placeholder="กรอกชื่อสินค้าและบริการ"
                  onChange={handleChange}
                  defaultValue={formData.name}
                  isRequired
                  errorMessage={'กรุณากรอกชื่อสินค้าและบริการ'}
                />

                {/* 🔹 Quantity, Unit Price, and Discount Inputs */}
                <div className="grid grid-cols-3 gap-4">
                  <Input
                    className="w-full"
                    size="sm"
                    type="number"
                    label="จำนวน"
                    labelPlacement="outside"
                    name="quantity"
                    defaultValue={formData.quantity}
                    placeholder="จำนวน"
                    onChange={handleChange}
                    isRequired
                    errorMessage={errors.quantity}
                  />
                  <Input
                    className="w-full"
                    size="sm"
                    type="number"
                    label="ราคาต่อหน่วย"
                    labelPlacement="outside"
                    name="unitPrice"
                    defaultValue={formData.unitPrice}
                    placeholder="ราคาต่อหน่วย"
                    onChange={handleChange}
                    isRequired
                    errorMessage={errors.unitPrice}
                  />
                  <Input
                    className="w-full"
                    size="sm"
                    type="number"
                    label="ส่วนลด"
                    labelPlacement="outside"
                    name="discount"
                    defaultValue={formData.discount}
                    placeholder="ส่วนลด"
                    onChange={handleChange}
                  />
                </div>

                {/* 🔹 Display Total Price */}
                <div className="text-lg font-bold">
                  ราคารวม:{' '}
                  {formData.total ? formData.total.toLocaleString() : '0'} บาท
                </div>
                {/* 🔹 Description */}
                <Textarea
                  label="รายละเอียด"
                  labelPlacement="outside"
                  name="description"
                  placeholder="เพิ่มรายละเอียดเกี่ยวกับสินค้า"
                  onChange={handleChange}
                  defaultValue={formData.description}
                />
              </Form>
            </Card>
          </div>
        )
      }
      backgroundColor={''}
    />
  );
}
