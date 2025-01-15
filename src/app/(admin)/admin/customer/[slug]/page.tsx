'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Card, Form, Input } from '@nextui-org/react';
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import * as Icon from '@ant-design/icons';
import getCustomer from '@/pages/api/customer/get';
import { updateCustomer } from '@/pages/api/customer/update';
import { deleteCustomer } from '@/pages/api/customer/delete';

export default function CustomerUpdatePage() {
  const params = useParams<{ slug?: string }>();
  const [loading, setLoading] = React.useState(false);

  // 🔹 State for form data and errors
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({
    companyName: '',
    taxId: '',
    firstName: '',
    lastName: '',
    contactEmail: '',
    contactPhone: '',
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

  console.log({ formData });

  // 🔹 Fetch customer data on component mount
  React.useEffect(() => {
    if (!params || !params.slug) {
      console.error('No slug provided in the URL params.');
      return;
    }

    setLoading(true);

    const fetchData = async () => {
      try {
        const { data } = await getCustomer(params.slug as string);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

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
        ...prevData.addresses,
        {
          name: '',
          houseNo: '',
          village: '',
          subDistrict: '',
          city: '',
          province: '',
          postalCode: '',
          organizationId: '', // Leave empty initially
          isMain: prevData.addresses.length === 0, // First address is main
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

  // 🔹 Handles form submission (Updating Customer)
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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
      setLoading(false);
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
      };

      console.log({ payload });

      // 🔹 Send update request to API
      const { data } = await updateCustomer({}, payload, params?.slug);

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
      await deleteCustomer(params?.slug);

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
              backpath={'/admin/customer'}
              buttons={[
                <Button 
                key={'submit customer'}
                  className="bg-accent1 text-white text-xs"
                  size="sm"
                  type="submit"
                  form="customerForm"
                >
                  แก้ไข
                </Button>,
                <Button
                key={'edit customer'}
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
                    defaultValue={formData.companyName}
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
                    defaultValue={formData.taxId}
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
                    defaultValue={formData.firstName}
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
                    defaultValue={formData.lastName}
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
                    defaultValue={formData.contactEmail}
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
                    defaultValue={formData.contactPhone}
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
        )
      }
      backgroundColor={''}
    />
  );
}
