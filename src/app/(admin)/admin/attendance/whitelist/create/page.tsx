'use client';

import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Form, Input, Textarea } from '@nextui-org/react';
// import createWhitelists from '@/pages/api/whitelists/create'; //API
import CardComponent from '@/components/common/card';
// import { useRouter } from 'next/navigation';
import * as Icon from '@ant-design/icons';
import React from 'react';

export default function WhitelistCreatePage() {
  const [errors, setErrors] = React.useState({}) as any;
  const [formData, setFormData] = React.useState({}) as any;
  const [, setLoading] = React.useState(false);
  // const router = useRouter();

  const handleChange = (e: any) => {
    const { name, checked, type, value } = e.target;
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const requiredFields = [
      'name',
      'houseNo',
      'road',
      'province',
      'city',
      'subDistrict',
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

    // const handleCreateStatus = (status: string) => {
    //   switch (status) {
    //     case 'pending':
    //       return { whitelist: 'pending', status: '' };
    //     default:
    //       return {};
    //   }
    // };

    // const statusData = handleCreateStatus(createStatus);

    try {
      const payload = {
        address: {
          name: formData.name,
          houseNo: formData.houseNo,
          road: formData.road,
          province: formData.province,
          city: formData.city,
          subDistrict: formData.subdistrict,
          active: formData.active !== undefined ? formData.active : false,
          postalCode: formData.postalCode,
          organizationId: formData.organizationId,
          branchId: formData.branchId,
        },
        ...formData,
      };

      payload.active = !!payload.active; // Simplified active check

      // const { data } = await createWhitelists({}, payload);
      console.log(payload);
      // router.push(`/admin/attendance/whitelist/${data.id}`);
    } catch (err: any) {
      console.error('Send FormData error:', err);
      setErrors({ general: err.message || 'An unexpected error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            title="สร้างการเข้าใช้งาน"
            backpath={'/admin/attendance/whitelist'}
            buttons={[
              <div className="mx-2.5" key="save-button">
                <a className="p-2">
                  <Button
                    className="bg-accent1 text-white p-2 gap-2"
                    type="submit"
                    form="whitelist"
                    onClick={() => {
                      // setCreateStatus('pending');
                    }}
                  >
                    <Icon.CheckOutlined />
                    บันทึการสร้าง
                  </Button>
                </a>

                <a
                  href={'/admin/attendance/whitelist/'}
                  key={'cancel-whitelist-button'}
                >
                  <Button
                    className="bg-accent2 text-white p-2 gap-2"
                    type="reset"
                    form="whitelists"
                  >
                    <Icon.CloseOutlined />
                    ยกเลิกการสร้าง
                  </Button>
                </a>
              </div>,
            ]}
          />
          <div className="flex space-x-4 mt-6">
            <div className="flex-1">
              <CardComponent
                customCard
                custom={
                  <Form
                    id="whitelist"
                    onSubmit={onSubmit}
                    method="post"
                    validationErrors={errors}
                  >
                    <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
                      {/* Content Section */}
                      <div className="mb-6">
                        <div className="grid grid-cols-2 gap-6">
                          {/* Detail Section */}
                          <div>
                            <h1 className="text-2xl font-bold text-headFont mb-10">
                              Detail
                            </h1>
                            {/* Whitelist Section */}
                            {/* GET API FOR SHOW DISPLAY */}
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                size="lg"
                                label="IP"
                                labelPlacement="outside"
                                name="ip"
                                placeholder="Enter your IP Address"
                                onChange={handleChange}
                              />
                              <Input
                                className="flex-1"
                                size="lg"
                                label="ISP"
                                labelPlacement="outside"
                                name="isp"
                                placeholder="Enter your ISP "
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                size="lg"
                                label="Browser"
                                labelPlacement="outside"
                                name="browser"
                                placeholder="Enter your Browser "
                                onChange={handleChange}
                              />
                              <Input
                                className="flex-1"
                                size="lg"
                                label="OS"
                                labelPlacement="outside"
                                name="OS"
                                placeholder="Enter your OS "
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          {/* Map Section */}
                          <div className="px-2">
                            <h1 className="text-2xl font-bold text-headFont pl-10 ">
                              Map
                            </h1>
                            <div className="mt-4">
                              <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4596.320001693403!2d100.45844017573191!3d13.788879396432687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e29b1543350395%3A0x96f94cedda00d639!2sCK%20Service!5e1!3m2!1sth!2sth!4v1735121592706!5m2!1sth!2sth"
                                width="90%"
                                height="250"
                                className="rounded-md border m-auto"
                                allowFullScreen
                                loading="lazy"
                              ></iframe>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Address Section */}
                      <div>
                        <h1 className="text-2xl font-bold text-headFont">
                          Address
                        </h1>
                        <div className="flex gap-4 mt-6">
                          <Input
                            className="flex-1"
                            size="lg"
                            label="สถานที่"
                            labelPlacement="outside"
                            name="name"
                            placeholder="กรอก สถานที่"
                            onChange={handleChange}
                            isRequired
                            errorMessage={'กรุณากรอก สถานที่'}
                          />
                          <Input
                            className="flex-1"
                            size="lg"
                            label="บ้านเลขที่"
                            labelPlacement="outside"
                            name="houseNo"
                            placeholder="กรอก บ้านเลขที่"
                            onChange={handleChange}
                            isRequired
                            errorMessage={'กรุณากรอก บ้านเลขที่'}
                          />
                        </div>
                        {/* More Address Fields */}
                        <div className="flex gap-4 mt-6">
                          <Input
                            className="flex-1"
                            size="lg"
                            label="ถนน"
                            labelPlacement="outside"
                            name="road"
                            placeholder="กรอก ถนน"
                            onChange={handleChange}
                            isRequired
                            errorMessage={'กรุณากรอก ถนน'}
                          />
                          <Input
                            className="flex-1"
                            size="lg"
                            label="จังหวัด"
                            labelPlacement="outside"
                            name="province"
                            placeholder="กรอก จังหวัด"
                            onChange={handleChange}
                            isRequired
                            errorMessage={'กรุณากรอก จังหวัด'}
                          />
                        </div>
                        <div className="flex gap-4 mt-6">
                          <Input
                            className="flex-1"
                            size="lg"
                            label="เขต/อำเภอ"
                            labelPlacement="outside"
                            name="city"
                            placeholder="กรอก เขต/อำเภอ"
                            onChange={handleChange}
                            isRequired
                            errorMessage={'กรุณากรอก เขต/อำเภอ'}
                          />
                          <Input
                            className="flex-1"
                            size="lg"
                            label="แขวง/ตำบล"
                            labelPlacement="outside"
                            name="subDistrict"
                            placeholder="กรอก แขวง/ตำบล"
                            onChange={handleChange}
                            isRequired
                            errorMessage={'กรุณากรอก แขวง/ตำบล'}
                          />
                        </div>
                        <div className="flex gap-4 mt-6">
                          <Input
                            className="flex-1"
                            size="lg"
                            label="ชื่ออาคาร"
                            labelPlacement="outside"
                            name="building"
                            placeholder="กรอก ชื่ออาคาร"
                            onChange={handleChange}
                          />
                          <Input
                            className="flex-1"
                            size="lg"
                            label="postalcode"
                            labelPlacement="outside"
                            name="postalCode"
                            placeholder="กรอก postalcode"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex gap-4 mt-6">
                          <Input
                            className="flex-1"
                            size="lg"
                            label="เลขห้อง"
                            labelPlacement="outside"
                            name="roomNo"
                            placeholder="กรอก เลขห้อง"
                            onChange={handleChange}
                          />
                          <Input
                            className="flex-1"
                            size="lg"
                            label="เลขชั้น"
                            labelPlacement="outside"
                            name="floorNo"
                            placeholder="กรอก เลขชั้น"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex gap-4 mt-6">
                          <Input
                            className="flex-1"
                            size="lg"
                            label="ชื่อหมู่บ้าน"
                            labelPlacement="outside"
                            name="village"
                            placeholder="กรอก ชื่อหมู่บ้าน"
                            onChange={handleChange}
                          />
                          <Input
                            className="flex-1"
                            size="lg"
                            label="เลขที่หมู่บ้าน"
                            labelPlacement="outside"
                            name="villageNo"
                            placeholder="กรอก เลขที่หมู่บ้าน"
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex gap-4 mt-6">
                          <Input
                            className="flex-1"
                            size="lg"
                            label="organizationId"
                            labelPlacement="outside"
                            name="organizationId"
                            placeholder="กรอก organizationId "
                            onChange={handleChange}
                          />
                          <Input
                            className="flex-1"
                            size="lg"
                            label="branchId"
                            labelPlacement="outside"
                            name="branchId"
                            placeholder="กรอก branchId"
                            onChange={handleChange}
                          />
                        </div>
                        {/* Notes Section */}
                        <div className="flex gap-4 mt-6">
                          <Textarea
                            label="หมายเหตุ"
                            labelPlacement="outside"
                            name="note"
                            placeholder="หมายเหตุ"
                            onChange={handleChange}
                          />
                        </div>
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