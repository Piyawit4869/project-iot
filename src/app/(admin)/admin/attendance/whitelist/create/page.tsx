'use client';

import CardComponent from '@/components/common/card';
import Scaffold from '@/components/common/scaffold';
import { TopSection } from '@/components/common/topSection';
import { Button, Form, Input, Textarea } from '@nextui-org/react';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, Tab } from '@nextui-org/react';
import createWhitelists from '@/pages/api/whitelists/create';

export default function CreateWhitelistsPage() {
  const [formData, setFormData] = useState({
    isp: '',
    ip: '',
    browser: '',
    os: '',
    addressName: '',
    addressHouseNo: '',
    addressRoad: '',
    addressProvince: '',
    addressSubdistrict: '',
    addressPostalCode: '',
    notes: '',
    building: '',
    roomNo: '',
    floorNo: '',
    village: '',
    villageNo: '',
    nation: '',
    city: '',
    regionName: '',
    regionCode: '',
    country: '',
    countryCode: '',
    organizationId: '',
    branchId: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);

    const payload = {
      isp: formData.isp,
      ip: formData.ip,
      browser: formData.browser,
      os: formData.os,
      notes: formData.notes,
      address: {
        name: formData.addressName,
        houseNo: formData.addressHouseNo,
        road: formData.addressRoad,
        province: formData.addressProvince,
        subDistrict: formData.addressSubdistrict,
        postalCode: formData.addressPostalCode,
        active: true,
        building: formData.building,
        roomNo: formData.roomNo,
        floorNo: formData.floorNo,
        village: formData.village,
        villageNo: formData.villageNo,
        nation: formData.nation,
        city: formData.city,
        regionName: formData.regionName,
        regionCode: formData.regionCode,
        country: formData.country,
        countryCode: formData.countryCode,
      },
      organizationId: formData.organizationId || 'defaultOrganizationId',
      branchId: formData.branchId || 'defaultBranchId',
    };

    try {
      const response = await createWhitelists(null, payload);
      if (response.success) {
        alert('บันทึกไวท์ลิสต์สำเร็จ!');
        router.push('/admin/attendance/whitelist');
      } else {
        alert(
          `เกิดข้อผิดพลาด: ${response.message?.join(', ') || 'ไม่ทราบสาเหตุ'}`,
        );
      }
    } catch (error) {
      console.error('Error:', error);
      alert('เกิดข้อผิดพลาดขณะบันทึกไวท์ลิสต์');
    } finally {
      setIsLoading(false);
    }
    console.log('Payload:', payload);
  };

  return (
    <Scaffold
      child={
        <div>
          <TopSection
            backpath={'/admin/attendance/whitelist'}
            title="หน้าสร้างไวท์ลิสต์"
            buttons={[
              <div key="action-buttons">
                <Button
                  className="bg-accent2 text-white p-2 m-1"
                  key="save-button"
                  onClick={handleSave}
                  isDisabled={isLoading}
                >
                  {isLoading ? 'กำลังบันทึก...' : 'บันทึกการสร้าง'}
                </Button>
                <Button
                  className="bg-accent3 text-white p-2 m-1"
                  key="cancel-button"
                  onClick={() => router.push('/admin/attendance/whitelist')}
                >
                  ยกเลิก
                </Button>
              </div>,
            ]}
          />
          <div className="flex space-x-4 mt-6">
            <div className="flex-1">
              <CardComponent
                customCard
                custom={
                  <Form>
                    <div className="w-full grid grid-cols-1 md:grid-cols-1 gap-4 items-center">
                      <Tabs variant="underlined">
                        <Tab key="whitelists" title="ไวท์ลิสต์">
                          <div className="mb-6">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h1 className="text-2xl font-bold text-headFont mb-10">
                                  Detail
                                </h1>
                                <div className="flex gap-4 mt-6">
                                  <Input
                                    className="flex-1"
                                    label="ไอเอสพี"
                                    name="isp"
                                    placeholder="ไอเอสพี"
                                    value={formData.isp}
                                    onChange={handleChange}
                                  />
                                  <Input
                                    className="flex-1"
                                    label="ไอพี"
                                    name="ip"
                                    placeholder="ที่อยู่ไอพี"
                                    value={formData.ip}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="flex gap-4 mt-6">
                                  <Input
                                    className="flex-1"
                                    label="บราวเซอร์"
                                    name="browser"
                                    placeholder="บราวเซอร์"
                                    value={formData.browser}
                                    onChange={handleChange}
                                  />
                                  <Input
                                    className="flex-1"
                                    label="ระบบปฏิบัติการ"
                                    name="os"
                                    placeholder="ระบบปฏิบัติการ"
                                    value={formData.os}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div>
                                <h1 className="text-2xl font-bold text-headFont">
                                  Map
                                </h1>
                                <iframe
                                  src="https://www.google.com/maps/embed?... (truncated for clarity)"
                                  width="90%"
                                  height="250"
                                  className="rounded-md border m-auto"
                                  allowFullScreen
                                  loading="lazy"
                                ></iframe>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h1 className="text-2xl font-bold text-headFont">
                              Address
                            </h1>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label="ชื่อที่อยู่"
                                name="addressName"
                                placeholder="ชื่อที่อยู่"
                                value={formData.addressName}
                                onChange={handleChange}
                              />
                              <Input
                                className="flex-1"
                                label="บ้านเลขที่"
                                name="addressHouseNo"
                                placeholder="บ้านเลขที่"
                                value={formData.addressHouseNo}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label="ถนน"
                                name="addressRoad"
                                placeholder="ถนน"
                                value={formData.addressRoad}
                                onChange={handleChange}
                              />
                              <Input
                                className="flex-1"
                                label="จังหวัด"
                                name="addressProvince"
                                placeholder="จังหวัด"
                                value={formData.addressProvince}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label="แขวง/ตำบล"
                                name="addressSubdistrict"
                                placeholder="แขวง/ตำบล"
                                value={formData.addressSubdistrict}
                                onChange={handleChange}
                              />
                              <Input
                                className="flex-1"
                                label="รหัสไปรษณีย์"
                                name="addressPostalCode"
                                placeholder="รหัสไปรษณีย์"
                                value={formData.addressPostalCode}
                                onChange={handleChange}
                              />
                            </div>

                            {/* Additional Address Fields */}
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label="อาคาร"
                                name="building"
                                placeholder="อาคาร"
                                value={formData.building}
                                onChange={handleChange}
                              />
                              <Input
                                className="flex-1"
                                label="ห้อง"
                                name="roomNo"
                                placeholder="ห้อง"
                                value={formData.roomNo}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label="ชั้น"
                                name="floorNo"
                                placeholder="ชั้น"
                                value={formData.floorNo}
                                onChange={handleChange}
                              />
                              <Input
                                className="flex-1"
                                label="หมู่บ้าน"
                                name="village"
                                placeholder="หมู่บ้าน"
                                value={formData.village}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label="หมู่บ้านเลขที่"
                                name="villageNo"
                                placeholder="หมู่บ้านเลขที่"
                                value={formData.villageNo}
                                onChange={handleChange}
                              />
                              <Input
                                className="flex-1"
                                label="ชาติ"
                                name="nation"
                                placeholder="ชาติ"
                                value={formData.nation}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label="เมือง"
                                name="city"
                                placeholder="เมือง"
                                value={formData.city}
                                onChange={handleChange}
                              />
                              <Input
                                className="flex-1"
                                label="ภูมิภาค"
                                name="regionName"
                                placeholder="ภูมิภาค"
                                value={formData.regionName}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label="รหัสภูมิภาค"
                                name="regionCode"
                                placeholder="รหัสภูมิภาค"
                                value={formData.regionCode}
                                onChange={handleChange}
                              />
                              <Input
                                className="flex-1"
                                label="ประเทศ (Code)"
                                name="countryCode"
                                placeholder="ประเทศ (Code)"
                                value={formData.countryCode}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex gap-4 mt-6">
                              <Input
                                className="flex-1"
                                label="ประเทศ"
                                name="country"
                                placeholder="ประเทศ"
                                value={formData.country}
                                onChange={handleChange}
                              />
                            </div>
                            <Textarea
                              className="resize-y min-h-[50px] mt-6"
                              label="หมายเหตุ"
                              name="notes"
                              placeholder="หมายเหตุ"
                              value={formData.notes}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="flex gap-4 mt-6">
                            <Input
                              className="flex-1"
                              label="ไอดีออแกไนซ์"
                              name="organizationId"
                              placeholder="ไอดีออแกไนซ์"
                              value={formData.organizationId}
                              onChange={handleChange}
                            />
                            <Input
                              className="flex-1"
                              label="ไอดีบรานซ์"
                              name="branchId"
                              placeholder="ไอดีบรานซ์"
                              value={formData.branchId}
                              onChange={handleChange}
                            />
                          </div>
                        </Tab>
                      </Tabs>
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
