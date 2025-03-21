'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { createItem } from '@/pages/api/items/create';
import { Button, Card, Form, Input, Textarea } from '@nextui-org/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Breadcrumb } from '@/components/common/breadcrumb';

export default function ItemCreatePage() {
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
            : name === 'startDate' && value instanceof Date
            ? value.toISOString()
            : type === 'number'
            ? parseFloat(value) || 0 // Ensure number fields are parsed correctly
            : value,
      };

      // 🔹 Auto-calculate the total price (unitPrice * quantity - discount)
      newData.total =
        (newData.unitPrice || 0) * (newData.quantity || 0) -
        (newData.discount || 0);
      return newData;
    });
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
        active: !!formData.active, // Ensure active is always boolean
      };

      // 🔹 Send data to API
      const { data } = await createItem({}, payload);

      toast.success('🎉 สร้างสินค้าและบริการสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      // 🔹 Redirect after successful creation
      router.push(`/backoffice/item/${data.id}`);
    } catch (err: any) {
      toast.error('❌ ไม่สามารถสร้างสินค้าและบริการได้', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      console.error('Send FormData error:', err);
      setErrors({ general: err.message || 'An unexpected error occurred.' });
    }
  };

  return (
    <div>
      <div className="fixed mt-6 ml-12 top-0 z-10">
        <Breadcrumb />
      </div>
      <Scaffold
        child={
          <div>
            {/* 🔹 Page Header */}
            <TopSection
              title="สร้างเอกสาร"
              backpath={'/backoffice/item'}
              buttons={[
                <a key={'create button'}>
                  <Button
                    className="bg-accent1 text-white text-xs"
                    size="sm"
                    type="submit"
                    form="item"
                  >
                    สร้าง
                  </Button>
                </a>,
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
                  <h1 className="flex-1 text-xl font-bold text-headFont">
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
                    value={formData.quantity}
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
                    value={formData.unitPrice}
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
                    value={formData.discount}
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
                />
              </Form>
            </Card>
          </div>
        }
        backgroundColor={''}
      />
    </div>
  );
}
