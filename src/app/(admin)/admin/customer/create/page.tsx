'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Card, Form, Input } from '@nextui-org/react';
import React from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { createCustomer } from '@/pages/api/customer/create';

export default function CustomerCreatePage() {
  // 🔹 State for form data and errors
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({
    companyName: '',
    taxId: '',
    firstName: '',
    lastName: '',
    contactEmail: '',
    contactPhone: '',
    // addresses: [], // Uncomment if needed later
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

  // 🔹 Handles address input changes
  const handleAddressChange = (index: number, e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => {
      const updatedAddresses = [...prevData.addresses];
      updatedAddresses[index] = { ...updatedAddresses[index], [name]: value };
      return { ...prevData, addresses: updatedAddresses };
    });
  };

  // 🔹 Adds a new address input field
  const addAddress = () => {
    setFormData((prevData: any) => ({
      ...prevData,
      addresses: [
        ...(Array.isArray(prevData.addresses) ? prevData.addresses : []), // Ensure addresses is always an array
        {
          name: '',
          houseNo: '',
          village: '',
          subDistrict: '',
          city: '',
          province: '',
          postalCode: '',
          organizationId: '', // Leave empty initially
          isMain: prevData.addresses?.length === 0, // First address is main
        },
      ],
    }));
  };

  // 🔹 Removes an address input field
  const removeAddress = (index: number) => {
    setFormData((prevData: any) => {
      const updatedAddresses = prevData.addresses.filter(
        (_: any, i: any) => i !== index,
      );
      return { ...prevData, addresses: updatedAddresses };
    });
  };

  // 🔹 Handles form submission
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 🔹 Required fields validation
    const requiredFields = [
      'companyName',
      'taxId',
      'firstName',
      'contactEmail',
    ];
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
      // 🔹 Prepare API payload
      const payload = {
        companyName: formData.companyName,
        taxId: formData.taxId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        // Uncomment below if you need addresses later
        // addresses: formData.addresses.length > 0 ? formData.addresses : undefined,
      };

      console.log({ payload });

      // 🔹 Send data to API
      const { data } = await createCustomer({}, payload);

      toast.success('🎉 ลูกค้าถูกสร้างสำเร็จ!', {
        duration: 3000,
        position: 'bottom-left',
        style: { fontFamily: 'var(--font-ibm-sans)' },
      });

      // 🔹 Redirect after successful creation
      router.push(`/admin/customer/${data.id}`);
    } catch (err: any) {
      toast.error('❌ ไม่สามารถสร้างลูกค้าได้', {
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
            title="สร้างลูกค้า"
            backpath={'/admin/customer'}
            buttons={[
              <a key={'create button'}>
                <Button
                  className="bg-accent1 text-white text-xs"
                  size="sm"
                  type="submit"
                  form="customerForm"
                >
                  สร้าง
                </Button>
              </a>,
            ]}
          />

          {/* 🔹 Form Section */}
          <Card className="p-6 mt-6">
            <Form
              id="customerForm"
              onSubmit={onSubmit}
              method="post"
              className="grid grid-cols-1 gap-4"
              validationErrors={errors}
            >
              {/* 🔹 Section Header */}
              <div className="flex justify-between items-center">
                <h1 className="flex-1 text-xl font-bold text-headFont">
                  ข้อมูลลูกค้า
                </h1>
              </div>

              {/* 🔹 Company Name */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  className="w-full"
                  size="sm"
                  label="ชื่อบริษัท"
                  labelPlacement="outside"
                  name="companyName"
                  placeholder="กรอกชื่อบริษัท"
                  onChange={handleChange}
                  isRequired
                  errorMessage={'กรุณากรอกชื่อบริษัท'}
                />

                {/* 🔹 Tax ID */}
                <Input
                  className="w-full"
                  size="sm"
                  label="หมายเลขประจำตัวผู้เสียภาษี"
                  labelPlacement="outside"
                  name="taxId"
                  placeholder="กรอกหมายเลขประจำตัวผู้เสียภาษี"
                  onChange={handleChange}
                  isRequired
                  errorMessage={'กรุณากรอกหมายเลขประจำตัวผู้เสียภาษี'}
                />
              </div>

              {/* 🔹 First Name & Last Name */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  className="w-full"
                  size="sm"
                  label="ชื่อ"
                  labelPlacement="outside"
                  name="firstName"
                  placeholder="กรอกชื่อ"
                  onChange={handleChange}
                  isRequired
                  errorMessage={'กรุณากรอกชื่อ'}
                />
                <Input
                  className="w-full"
                  size="sm"
                  label="นามสกุล"
                  labelPlacement="outside"
                  name="lastName"
                  placeholder="กรอกนามสกุล"
                  onChange={handleChange}
                  // errorMessage={'กรุณากรอกชื่อ'}
                  // isRequired
                  // errorMessage={errors.lastName}
                />
              </div>

              {/* 🔹 Contact Email & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <Input
                  className="w-full"
                  size="sm"
                  type="email"
                  label="อีเมลติดต่อ"
                  labelPlacement="outside"
                  name="contactEmail"
                  placeholder="กรอกอีเมล"
                  onChange={handleChange}
                  isRequired
                  errorMessage={'กรุณากรออีเมลติดต่อ'}
                />
                <Input
                  className="w-full"
                  size="sm"
                  type="tel"
                  label="เบอร์โทรติดต่อ"
                  labelPlacement="outside"
                  name="contactPhone"
                  placeholder="กรอกเบอร์โทรศัพท์"
                  onChange={handleChange}
                  // isRequired
                  // errorMessage={errors.contactPhone}
                />
              </div>

              <div className="flex justify-between items-center">
                <h1 className="flex-1 text-xl font-bold text-headFont">
                  ที่อยู่
                </h1>
              </div>
              {formData?.addresses?.map((address: any, index: number) => (
                <div key={index} className="grid grid-cols-3 gap-4">
                  {[
                    'name',
                    'houseNo',
                    'village',
                    'subDistrict',
                    'city',
                    'province',
                    'postalCode',
                  ].map((field) => (
                    <Input
                      key={field}
                      className="w-full"
                      size="sm"
                      labelPlacement="outside"
                      label={field}
                      name={field}
                      placeholder={field}
                      value={address[field]}
                      onChange={(e) => handleAddressChange(index, e)}
                    />
                  ))}
                  <Button
                    className="bg-accent2 text-white text-xs mt-2"
                    onClick={() => removeAddress(index)}
                  >
                    ลบที่อยู่
                  </Button>
                </div>
              ))}
              <Button
                className="bg-accent1 text-white text-xs mt-2"
                onClick={addAddress}
              >
                เพิ่มที่อยู่
              </Button>
            </Form>
          </Card>
        </div>
      }
      backgroundColor={''}
    />
  );
}
